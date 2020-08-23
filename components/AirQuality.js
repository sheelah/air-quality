import { useLocationContext } from './LocationContext';
import { useWeatherByCoords } from '../hooks/useWeatherData';
import { getPm25Levels } from '../utils/dataFilters';

const AirQuality = () => {
  const { locationCoords } = useLocationContext();
  const { isLoading, isError, data, error } = useWeatherByCoords(
    locationCoords.lat,
    locationCoords.lng
  );

  if (!data || isLoading) {
    return 'Loading...';
  }

  if (isError) {
    console.log('Oops - an error occurred:', error);
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
