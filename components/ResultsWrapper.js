import PropTypes from 'prop-types';
import { useIsFetching } from 'react-query';
import styles from '../styles/ResultsWrapper.module.css';

// Taken from: https://codepen.io/bernethe/pen/dorozd
// And: https://dockyard.com/blog/2020/03/02/accessible-loading-indicatorswith-no-extra-elements
const ResultsWrapper = ({ children }) => {
  const isFetching = useIsFetching();

  return (
    <div
      class={styles.results_wrapper}
      aria-live="polite"
      aria-busy={isFetching === 1}
    >
      {children}
    </div>
  );
};

ResultsWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ResultsWrapper;
