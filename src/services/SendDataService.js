export default function SendDataService(url, operationUrl, data) {
  const baseURL = `http://localhost/entornoTsoft/${url}?${operationUrl}`;

  return fetch(baseURL, {
    method: "post",
    body: JSON.stringify(data),

  })
    .then((res) => res.json())
    .then((response) => {
      const data = response;

      return data;
    });
}
