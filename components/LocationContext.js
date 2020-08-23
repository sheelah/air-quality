import React from 'react';

export const LocationContext = React.createContext({
  locationCoords: {},
  setLocationCoords: () => {},
});

export const useLocationContext = () => {
  return React.useContext(LocationContext);
};
