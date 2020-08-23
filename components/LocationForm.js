import { useEffect } from 'react';
import { useLocationContext } from './LocationContext';

const LocationForm = () => {
  const { locationCoords, setLocationCoords } = useLocationContext();

  useEffect(() => {
    if (typeof window === 'undefined' || !'geolocation' in window.navigator) {
      return null;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocationCoords({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  return <pre>location: {JSON.stringify(locationCoords)}</pre>;
};

export default LocationForm;
