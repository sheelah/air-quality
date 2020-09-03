export const handleApiResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(response);
  }
};
