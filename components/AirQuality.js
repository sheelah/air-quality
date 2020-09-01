import PropTypes from 'prop-types';
import { useLocationContext } from './LocationContext';
import { useWeatherByCoords, useWeatherByZip } from '../hooks/useWeatherData';
import { getMaxAirQualityIndex } from '../utils/dataFilters';
import styles from '../styles/AirQuality.module.css';

const calculateRatingClass = (rating) => {
  let result = 1;

  switch (rating.toLowerCase()) {
    case 'good':
      result = 1;
      break;
    case 'moderate':
      result = 2;
      break;
    case 'unhealthy for sensitive groups':
      result = 3;
      break;
    case 'unhealthy':
      result = 4;
      break;
    case 'very unhealthy':
      result = 5;
      break;
    case 'hazardous':
      result = 6;
      break;
    default:
      result = 1;
      break;
  }

  return result;
};

const Results = ({ isFetching, data }) => {
  const { setRatingClass } = useLocationContext();
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

  const ratingClass = calculateRatingClass(description);
  console.log('got rating class:', ratingClass);
  setRatingClass(ratingClass);

  return (
    <div className={styles.details}>
      <h2 className={styles.index_label}>
        Air Quality Index:
        <span className={styles.index}>{airQualityIndex}</span>
      </h2>
      <span className={styles.info}>Reporting Area: {reportingLocation}</span>
      <span className={styles.info}>EPA Classification: {description}</span>
      <span className={styles.info}>
        Highest Pollutant Category: {ParameterName}
      </span>
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
    return <p>Ooops - an error occurred! {error}</p>;
  }

  if (!isLoading && !data.length) {
    return <p>Sorry - No data was found for your location!</p>;
  }

  return <Results data={data} isFetching={isLoading} />;
};

export default AirQuality;
