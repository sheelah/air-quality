import { useLocationContext } from './LocationContext';
import GpsIcon from '../assets/svg/gps-icon.svg';
import styles from '../styles/LocationForm.module.css';

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
    <section className={styles.container}>
      <div className={styles.form_wrapper}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="zipcode" className={styles.label}>
            US Zipcode
          </label>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            placeholder="14220"
            className={styles.zipcode_input}
            onChange={handleZipChange}
          />
        </form>

        <button
          onClick={getUserGeolocation}
          aria-label="Use Current Location"
          className={styles.button}
        >
          <GpsIcon />
        </button>
      </div>
    </section>
  );
};

export default LocationForm;
