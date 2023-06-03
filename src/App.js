import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthState from "./context/AuthContext";
import { PrivateRoute } from "../src/hooks/PrivateRoute";

import HomePage from "./pages/home/Homepage";
import Login from "./pages/login/login";

/*LISTADOS*/
import ListadoEmpleados from "./pages/Listados/ListadoEmpleados/ListadoEmpleados";
import ListadoRamos from "./pages/Listados/ListadoRamos/ListadoRamos";
import ListadoClientes from "./pages/Listados/ListadoClientes/ListadoClientes";
import ListadoSesiones from "./pages/Listados/ListadoSesiones/ListadoSesiones.js";
import ListadoServicios from "./pages/Listados/ListadoServicios/ListadoServicios";
import ListadoAlumnos from "./pages/Listados/ListadoAlumnos/ListadoAlumnos";
import ListadoCursos from "./pages/Listados/ListadoCursos/ListadoCursos";
import ListadoContacto from "./pages/Listados/ListadoContacto/ListadoContacto";
import ListadoCursoAlumnos from "./pages/Listados/ListadoCursoAlumno/ListadoCursoAlumno";
import ListadoCursoAlumnoSesion from "./pages/Listados/ListadoCursoAlumnoSesion/ListadoCursoAlumnoSesion";
import ListadoNotaExamen from "./pages/Listados/ListadoNotaExamen/ListadoNotaExamen";
import ListadoRamoExamen from "./pages/Listados/ListadoRamoExamen/ListadoRamoExamen";
import ListadoRelatorRamo from "./pages/Listados/ListadoRelatorRamo/ListadoRelatorRamo";
import ListadoReqCurso from "./pages/Listados/ListadoReqCurso/ListadoReqCurso";

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

            <Route element={<ListadoRamos />} path="/listadoRamos"></Route>

            <Route element={<ListadoCursos />} path="/listadoCursos"></Route>

            <Route
              element={<ListadoClientes />}
              path="/listadoClientes"
            ></Route>

            <Route
              element={<ListadoSesiones />}
              path="/listadoSesiones"
            ></Route>

            <Route
              element={<ListadoServicios />}
              path="/listadoServicios"
            ></Route>
            <Route element={<ListadoAlumnos />} path="/listadoAlumnos"></Route>

            <Route element={<ListadoContacto />} path="/listadoContacto"></Route>

            <Route element={<ListadoCursoAlumnos />} path="/listadoCursoAlumnos"></Route>

            <Route element={<ListadoCursoAlumnoSesion />} path="/listadoCursoAlumnoSesion"></Route>

            <Route element={<ListadoNotaExamen />} path="/listadoNotaExamen"></Route>

            <Route element={<ListadoRamoExamen />} path="/listadoRamoExamen"></Route>

            <Route element={<ListadoRelatorRamo />} path="/listadoRelatorRamo"></Route>

            <Route element={<ListadoReqCurso />} path="/listadoReqCurso"></Route>


          </Route>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
