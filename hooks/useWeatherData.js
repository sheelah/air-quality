import { useQuery } from 'react-query';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const GEO_API_ENDPOINT =
  'https://www.airnowapi.org/aq/observation/latLong/current/';
const ZIP_API_ENDPOINT =
  'https://www.airnowapi.org/aq/observation/zipCode/current/';
const API_FIELDS = 'format=application/json';
const API_KEY = process.env.NEXT_PUBLIC_AQ_API_KEY;

export const getWeatherByCoordinates = async (_, lat, long) => {
  const response = await fetch(
    `${CORS_PROXY}${GEO_API_ENDPOINT}?${API_FIELDS}&latitude=${lat}&longitude=${long}&api_key=${API_KEY}`
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const getWeatherByZip = async (_, zip) => {
  const response = await fetch(
    `${CORS_PROXY}${ZIP_API_ENDPOINT}?${API_FIELDS}&zipCode=${zip}&api_key=${API_KEY}`
  );

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const useWeatherByCoords = (lat, long) => {
  return useQuery(['weatherByCoords', lat, long], getWeatherByCoordinates);
};

export const useWeatherByZip = (zip) => {
  return useQuery(['weatherByZip', zip], getWeatherByZip);
};