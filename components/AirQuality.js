import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocationContext } from './LocationContext';
import ErrorMessage from './ErrorMessage';
import { useWeatherByCoords, useWeatherByZip } from '../hooks/useWeatherData';
import { getMaxAirQualityIndex } from '../utils/dataFilters';
import styles from '../styles/AirQuality.module.css';

const calculateRating = (rating) => {
  const ratings = {
    good: {
      index: 1,
      text: 'All good! Get the heck outside.',
    },
    moderate: {
      index: 2,
      text: "It's not perfect but decent! Get outside.",
    },
    'unhealthy for sensitive groups': {
      index: 3,
      text: "Meh - it's OK but maybe avoid heavy exersion outside.",
    },
    unhealthy: {
      index: 4,
      text: "It's more of an inside day.",
    },
    'very unhealthy': {
      index: 5,
      text: "No joke - it's an inside day.",
    },
    hazardous: {
      index: 6,
      text: 'Be careful, for reals! Stay inside.',
    },
  };

  return ratings[rating.toLowerCase()];
};

const Results = ({ isFetching, data }) => {
  const { rating, setRating } = useLocationContext();
  if (isFetching || !data) {
    return null;
  }

  // Filter air quality for small particulate matter levels
  const aq = getMaxAirQualityIndex(data);

  const {
    AQI: airQualityIndex,
    ReportingArea: reportingLocation,
    Category: { Name: description },
    ParameterName,
  } = aq;

  useEffect(() => {
    const { index: ratingIndex, text: ratingText } = calculateRating(
      description
    );

    setRating({ ratingIndex, ratingText });
  }, [description]);

  return (
    <div className={styles.air_quality_details}>
      <h2 className={styles.rating_text}>{rating.ratingText}</h2>
      <div className={styles.details}>
        <p className={styles.index_label}>
          Air Quality Index:
          <span className={styles.index}>{airQualityIndex}</span>
        </p>
        <span className={styles.info}>Reporting Area: {reportingLocation}</span>
        <span className={styles.info}>EPA Classification: {description}</span>
        <span className={styles.info}>
          Highest Pollutant Category: {ParameterName}
        </span>
      </div>
    </div>
  );
};

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

const AirQuality = () => {
  const { locationCoords, zipcode } = useLocationContext();
  let fetchStatus = {};

  if (locationCoords.lat && locationCoords.lng) {
    fetchStatus = useWeatherByCoords(locationCoords.lat, locationCoords.lng);
  } else {
    fetchStatus = useWeatherByZip(zipcode);
  }

  const { isLoading, isError, data, error } = fetchStatus;

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (!isLoading && !data.length) {
    return <p>Sorry - No data was found for your location!</p>;
  }

  return <Results data={data} isFetching={isLoading} />;
};

export default AirQuality;
