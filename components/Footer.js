import styles from '../styles/Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {year}
        <a className={styles.link} href="https://www.sheelahb.com">
          Sheelah Brennan.
        </a>
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
