import React from 'react';

export const LocationContext = React.createContext({
  locationCoords: {},
  setLocationCoords: () => {},
  zipcode: {},
  setZipcode: () => {},
  hasUserLocation: false,
  setHasUserLocation: () => {},
  rating: {
    ratingIndex: 1,
    ratingText: '',
  },
  setRating: () => {},
});

export const useLocationContext = () => {
  return React.useContext(LocationContext);
};
