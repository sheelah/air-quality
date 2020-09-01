import { useState } from 'react';
import Head from 'next/head';
import AirQuality from '../components/AirQuality';
import Footer from '../components/Footer';
import LocationForm from '../components/LocationForm';
import { LocationContext } from '../components/LocationContext';
import ResultsWrapper from '../components/ResultsWrapper';
import styles from '../styles/Home.module.css';

const renderAirQuality = (hasUserLocation) => {
  if (hasUserLocation) {
    return <AirQuality />;
  } else {
    return <LocationForm />;
  }
};

const Home = () => {
  const [locationCoords, setLocationCoords] = useState({
    lat: null,
    lng: null,
  });
  const [zipcode, setZipcode] = useState(null);
  const [hasUserLocation, setHasUserLocation] = useState(null);
  const [ratingClass, setRatingClass] = useState(1);

  return (
    <div className={styles.container} data-rating-class={ratingClass}>
      <Head>
        <title>Air Quality Now</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Get the current air quality for your location"
        />
        <meta property="og:title" content="Air Quality Now" />
        <meta property="og:type" content="website" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Air Quality Now</h1>

        <LocationContext.Provider
          value={{
            locationCoords,
            setLocationCoords,
            zipcode,
            setZipcode,
            hasUserLocation,
            setHasUserLocation,
            ratingClass,
            setRatingClass,
          }}
        >
          <ResultsWrapper>{renderAirQuality(hasUserLocation)}</ResultsWrapper>
        </LocationContext.Provider>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
