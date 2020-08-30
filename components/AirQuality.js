import { useLocationContext } from './LocationContext';
import { useWeatherByCoords, useWeatherByZip } from '../hooks/useWeatherData';
import { getMaxAirQualityIndex } from '../utils/dataFilters';
import styles from '../styles/AirQuality.module.css';

const AirQuality = () => {
  const { locationCoords, zipcode } = useLocationContext();
  let fetchStatus = {};

  if (locationCoords.lat && locationCoords.lng) {
    fetchStatus = useWeatherByCoords(locationCoords.lat, locationCoords.lng);
  } else {
    fetchStatus = useWeatherByZip(zipcode);
  }

  const { isLoading, isError, data, error } = fetchStatus;
  if (!data || isLoading) {
    return 'Loading...';
  }

  if (isError) {
    return <p>Ooops - an error occurred! {error}</p>;
  }

  if (!isLoading && !data.length) {
    return <p>Sorry - No data was found for your location!</p>;
  }

  // Filter air quality for small particulate matter levels
  const aq = getMaxAirQualityIndex(data);

  const {
    AQI: airQualityIndex,
    ReportingArea: reportingLocation,
    Category: { Name: description },
    ParameterName,
  } = aq;

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

export default AirQuality;
