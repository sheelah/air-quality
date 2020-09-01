import React from 'react';

export const LocationContext = React.createContext({
  locationCoords: {},
  setLocationCoords: () => {},
  zipcode: {},
  setZipcode: () => {},
  hasUserLocation: false,
  setHasUserLocation: () => {},
  ratingClass: 1,
  setRatingClass: () => {},
});

export const useLocationContext = () => {
  return React.useContext(LocationContext);
};
