import { useLocationContext } from './LocationContext';

const LocationForm = () => {
  const {
    setLocationCoords,
    zipcode,
    setZipcode,
    setHasUserLocation,
  } = useLocationContext();

  const getUserGeolocation = () => {
    if (typeof window === 'undefined' || !'geolocation' in window.navigator) {
      return null;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocationCoords({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      setHasUserLocation(true);
    });
  };

  const handleZipChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHasUserLocation(true);
  };

  return (
    <section className="location-input-section">
      <form className="location-form" onSubmit={handleFormSubmit}>
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          value={zipcode}
          placeholder="Zipcode"
          onChange={handleZipChange}
        />
      </form>
      <span>
        OR <button onClick={getUserGeolocation}>Use Current Location</button>
      </span>
    </section>
  );
};

export default LocationForm;
