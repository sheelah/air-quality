import PropTypes from 'prop-types';
import styles from '../styles/ErrorMessage.module.css';

const ErrorMessage = ({ error }) => {
  let errorMessage = null;
  const apiDowntimeErrorStatuses = [404, 503];

  if (apiDowntimeErrorStatuses.includes(error.status)) {
    errorMessage = 'Air quality data is temporarily unavailable';
  }

  return (
    <div className={styles.error_status}>
      <p>Ooops - an error occurred! {errorMessage}</p>
      <p>Please try again later.</p>
    </div>
  );
};

ErrorMessage.PropTypes = {
  error: PropTypes.object.isRequired,
};

export default ErrorMessage;
