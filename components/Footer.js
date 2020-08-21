import styles from '../styles/Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>&copy; {year} Sheelah Brennan</footer>
  );
};

export default Footer;
