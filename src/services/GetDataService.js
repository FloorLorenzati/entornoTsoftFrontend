export default function getDataService(url, operationUrl) {
  const baseURL = `http://localhost/entornoTsoft/${url}?${operationUrl}`;

  return fetch(baseURL)
    .then((res) => res.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
