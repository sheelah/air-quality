import { useState } from 'react';
import Head from 'next/head';
import AirQuality from '../components/AirQuality';
import Footer from '../components/Footer';
import LocationForm from '../components/LocationForm';
import { LocationContext } from '../components/LocationContext';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [airQualityIndex, setAirQualityIndex] = useState({});
  const [isFetching, setIsFetching] = useState(false);

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
            location,
            setLocation,
            airQualityIndex,
            setAirQualityIndex,
            isFetching,
            setIsFetching,
          }}
        >
          <LocationForm />

          <AirQuality />
        </LocationContext.Provider>
      </main>

      <Footer />
    </div>
  );
}
