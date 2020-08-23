import { useLocationContext } from './LocationContext';
import { useWeatherByCoords, useWeatherByZip } from '../hooks/useWeatherData';
import { getPm25Levels } from '../utils/dataFilters';

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
  const aq = getPm25Levels(data);

  const {
    AQI: airQualityIndex,
    ReportingArea: reportingLocation,
    Category: { Name: description },
  } = aq;

  return (
    <div className="air-quality-status">
      <span className="air-quality-index">{airQualityIndex}</span>
      <span className="reporting-location">{reportingLocation}</span>
      <span className="description">{description}</span>
    </div>
  );
};

export default AirQuality;
