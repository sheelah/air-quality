import { useQuery } from 'react-query';

const URL_PREFIX = 'https://cors-anywhere.herokuapp.com/';
const API_BASE_URL = 'http://www.airnowapi.org/aq/observation/latLong/current/';
const API_FIELDS = 'format=application/json';
const QUERY_BASE = `${URL_PREFIX}${API_BASE_URL}?${API_FIELDS}`;
const API_KEY = process.env.NEXT_PUBLIC_AQ_API_KEY;

export const getWeatherByCoordinates = async (_, lat, long) => {
  if (lat && long) {
    const response = await fetch(
      `${QUERY_BASE}&latitude=${lat}&longitude=${long}&api_key=${API_KEY}`
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  }
};

export const useWeatherByCoords = (lat, long) => {
  return useQuery(['weatherByCoords', lat, long], getWeatherByCoordinates);
};
