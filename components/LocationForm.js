import { useEffect } from 'react';
import { useLocationContext } from './LocationContext';

const LocationForm = () => {
  const { location, setLocation } = useLocationContext();

  useEffect(() => {
    if (typeof window === 'undefined' || !'geolocation' in window.navigator) {
      return null;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  return <pre>location: {JSON.stringify(location)}</pre>;
};

export default LocationForm;
