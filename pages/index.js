import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Air Quality Today</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Air Quality Today</h1>
      </main>

      <Footer />
    </div>
  );
}
