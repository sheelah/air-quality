export const getMaxAirQualityIndex = (data) => {
  // Sort the various AQI indexes & get the highest value
  // https://ww2.arb.ca.gov/resources/inhalable-particulate-matter-and-health
  const sortedAqi = data
    .map((aqiData) => aqiData.AQI) // Just get the AQI indexes
    .sort((a, b) => b - a);

  console.log(
    'greates aqi: ',
    data.findIndex((el) => el.AQI === sortedAqi[0])
  );
  const index = data.findIndex((el) => el.AQI === sortedAqi[0]);
  return data[index];
};
