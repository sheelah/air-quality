export const getPm25Levels = (data) =>
  // Filter air quality for fine particulate matter levels
  // https://ww2.arb.ca.gov/resources/inhalable-particulate-matter-and-health

  data.find((data) => data.ParameterName === 'PM2.5');
