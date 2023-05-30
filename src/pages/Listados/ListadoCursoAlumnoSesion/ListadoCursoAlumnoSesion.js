import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Header from "../../../templates/Header/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../TablasStyles.css";
// import InsertarCursoAlumnoSesion from "../../../templates/forms/Insertar/InsertarCursoAlumnoSesionesion";
// import EditarCursoAlumnoSesion from "../../../templates/forms/Editar/EditarCursoAlumnoSesion";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoCursoAlumnoSesion() {
  const [cursoAlumnoSesion, setCursoAlumnoSesion] = useState([""]);
  const [isActiveInsertCursoAlumnoSesion, setIsActiveInsertCursoAlumnoSesion] = useState(false);
  const [idCursoAlumnoSesion, setidCursoAlumnoSesion] = useState(null);
  const [isActiveEditCursoAlumnoSesion, setIsActiveEditCursoAlumnoSesion] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);
  
  const nombreTabla= "cursoalumno_sesion"



  function insertarCursoAlumnoSesion() {
    setIsActiveInsertCursoAlumnoSesion(!isActiveInsertCursoAlumnoSesion);
  }
  function editarCursoAlumnoSesion(ID) {
    setIsActiveEditCursoAlumnoSesion(!isActiveEditCursoAlumnoSesion);
    setidCursoAlumnoSesion(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "pages/cambiarEstado/cambiarEstado.php";
        var operationUrl = "cambiarEstado";
        var data = { 
          idRegistro: ID, 
          usuarioModificacion: userData.usuario,
          nombreTabla : nombreTabla,
         };
        SendDataService(url, operationUrl, data).then((response) => {
          const { successEdited } = response[0];
          TopAlerts(successEdited);
        });
      }
    });
  }
  useEffect(
    function () {
      // obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton,cantidadPorPagina]
  );

  //PAGINADOR ---------------------
  function handleChangePaginador() {
    var url = "pages/listados/listadoCursoAlumnoSesion.php";
    var operationUrl = "listadoCursoAlumnoSesion";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setidCursoAlumnoSesion(datos.datos);
});
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de Curso Alumnos Sesion</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarCursoAlumnoSesion}>
            Crear Curso Alumnos Sesion
          </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_tipoCliente">Mostrar registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_tipoCliente"
                id="input_tipoCliente"
                onChange={({ target }) => setcantidadPorPagina(target.value)}
                required
              >
                <option hidden value="">
                  {cantidadPorPagina}
                </option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          {/* <InsertarCursoCursoAlumnoSesionesion
            isActiveCursoAlumnoSesion={isActiveInsertCursoAlumnoSesion}
            cambiarEstado={setIsActiveInsertCursoAlumnoSesion}
          ></InsertarCursoCursoAlumnoSesionesion>

          <EditarCursoCursoAlumnoSesionesion
            isActiveEditCursoAlumnoSesion={isActiveEditCursoAlumnoSesion}
            cambiarEstado={setIsActiveEditCursoAlumnoSesion}
            idCursoAlumnoSesion={idCursoAlumnoSesion}
          ></EditarCursoCursoAlumnoSesionesion> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Asistencia</th>
                <th>Participación</th>
                <th>Nombre Sesion</th>
                <th>ID Curso Alumno</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {cursoAlumnoSesion.map((cursoAlumnoSesion) => (
                <tr key={cursoAlumnoSesion.idCursoAlumnoSesion}>
                  <td>{cursoAlumnoSesion.idCursoAlumnoSesion}</td>
                  <td>{cursoAlumnoSesion.fechaIni}</td>
                  <td>{cursoAlumnoSesion.fechaFin}</td>
                  <td>{cursoAlumnoSesion.asistencia}</td>
                  <td>{cursoAlumnoSesion.participacion}</td>
                  <td>{cursoAlumnoSesion.nomSesion}</td>
                  <td>{cursoAlumnoSesion.idCursoAlumno}</td>

                  {/* <td align="right" width={90}>{cursoAlumnoSesion.porcAprobacion}</td> */}

                  <td>
                    <button
                      title="Editar cursoAlumnoSesion"
                      id="OperationBtns"
                      onClick={() => editarCursoAlumnoSesion(cursoAlumnoSesion.idCursoAlumnoSesion)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar cursoAlumnoSesion" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar cursoAlumnoSesion"
                      onClick={() => desactivar(cursoAlumnoSesion.idCursoAlumnoSesion)}
                      id="OperationBtns"
                    >
                      <BsFillTrashFill id="icons" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginador
            paginas={paginador}
            cambiarNumero={setNumBoton}
            num_boton={num_boton}
          ></Paginador> */}
        </div>
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
