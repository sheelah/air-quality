import React from 'react';

export const LocationContext = React.createContext({
  locationCoords: {},
  setLocationCoords: () => {},
  zipcode: {},
  setZipcode: () => {},
  hasUserLocation: false,
  setHasUserLocation: () => {},
});

export const useLocationContext = () => {
  return React.useContext(LocationContext);
};
