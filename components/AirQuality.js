import { useState, useEffect } from 'react';
import { useLocationContext } from './LocationContext';

const AirQuality = () => {
  const { location } = useLocationContext();

  return (
    <h1>
      Air Quality for <pre>{JSON.stringify(location)}</pre>:
    </h1>
  );
};

export default AirQuality;
