import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthState from "./context/AuthContext";
import { PrivateRoute } from "../src/hooks/PrivateRoute";

import HomePage from "./pages/home/Homepage";
import Login from "./pages/login/login";

/*LISTADOS*/
import ListadoEmpleados from "./pages/Listados/ListadoEmpleados/ListadoEmpleados";
import ListadoRelator from "./pages/Listados/ListadoRelator/ListadoRelator";
import ListadoRamos from "./pages/Listados/ListadoRamos/ListadoRamos";
import ListadoClientes from "./pages/Listados/ListadoClientes/ListadoClientes";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<Login />} path="/Login"></Route>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />}></Route>
            <Route
              element={<ListadoEmpleados />}
              path="/listadoEmpleados"
            ></Route>
            
            <Route
              element={<ListadoRelator />}
              path="/listadoRelator"
            ></Route>

            <Route element={<ListadoRamos />} path="/listadoRamos"></Route>

            <Route element={<ListadoClientes />} path="/listadoClientes"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
