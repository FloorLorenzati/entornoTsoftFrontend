export default function LoginService({ username, password }) {
  const baseURL =
    "http://localhost/entornoTsoft/model/login.php?login";

  return fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response) throw new Error("Fallo en la conexion");
      return response.json();
    })
    .then((response) => {
      const data = response;
      return data;
    });
}
