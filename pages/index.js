import { useState } from 'react';
import Head from 'next/head';
import AirQuality from '../components/AirQuality';
import Footer from '../components/Footer';
import LocationForm from '../components/LocationForm';
import { LocationContext } from '../components/LocationContext';
import styles from '../styles/Home.module.css';

const renderAirQuality = (hasUserLocation) => {
  if (hasUserLocation) {
    return <AirQuality />;
  } else {
    return <LocationForm />;
  }
};

export default function Home() {
  const [locationCoords, setLocationCoords] = useState({
    lat: null,
    lng: null,
  });
  const [zipcode, setZipcode] = useState(null);
  const [hasUserLocation, setHasUserLocation] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>Air Quality Today</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Air Quality Today</h1>

        <LocationContext.Provider
          value={{
            locationCoords,
            setLocationCoords,
            zipcode,
            setZipcode,
            hasUserLocation,
            setHasUserLocation,
          }}
        >
          {renderAirQuality(hasUserLocation)}
        </LocationContext.Provider>
      </main>

      <Footer />
    </div>
  );
}
