import React from 'react';

export const LocationContext = React.createContext({
  location: {},
  setLocation: () => {},
  isFetching: false,
  setIsFetching: () => {},
  airQualityIndex: null,
  setAirQualityIndex: () => {},
});

export const useLocationContext = () => {
  return React.useContext(LocationContext);
};
