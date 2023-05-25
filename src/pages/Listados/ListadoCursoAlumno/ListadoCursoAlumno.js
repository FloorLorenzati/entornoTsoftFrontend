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
// import InsertarCursoAlumnos from "../../../templates/forms/Insertar/InsertarCursoAlumnos";
// import EditarCursoAlumnos from "../../../templates/forms/Editar/EditarCursoAlumnos";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoCursoAlumnos() {
  const [cursoAlumnos, setCursoAlumnos] = useState([""]);
  // const [paginador, setPaginadorCursoAlumnos] = useState([""]);
  // const urlPaginador = "paginador/botones_CursoAlumnos.php";
  const [isActiveInsertCursoAlumnos, setIsActiveInsertCursoAlumnos] = useState(false);
  const [idCursoAlumnos, setidCursoAlumnos] = useState(null);
  const [isActiveEditCursoAlumnos, setIsActiveEditCursoAlumnos] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorCursoAlumnos(paginador)
//     );
//   }

  function insertarCursoAlumnos() {
    setIsActiveInsertCursoAlumnos(!isActiveInsertCursoAlumnos);
  }
  function editarCursoAlumnos(ID) {
    setIsActiveEditCursoAlumnos(!isActiveEditCursoAlumnos);
    setidCursoAlumnos(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateCursoAlumnos.php";
        var operationUrl = "updateStateCursoAlumnos";
        var data = { idCursoAlumnos: ID, usuario: userData.username  };
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
    var url = "pages/listados/listadoCursoAlumno.php";
    var operationUrl = "listadoCursoAlumno";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      setCursoAlumnos(data);
      console.log(data);});
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de Curso Alumnos</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarCursoAlumnos}>
            Crear Curso Alumnos
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
          {/* <InsertarCursoCursoAlumnos
            isActiveCursoAlumnos={isActiveInsertCursoAlumnos}
            cambiarEstado={setIsActiveInsertCursoAlumnos}
          ></InsertarCursoCursoAlumnos>

          <EditarCursoCursoAlumnos
            isActiveEditCursoAlumnos={isActiveEditCursoAlumnos}
            cambiarEstado={setIsActiveEditCursoAlumnos}
            idCursoAlumnos={idCursoAlumnos}
          ></EditarCursoCursoAlumnos> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha incio</th>
                <th>Fecha fin</th>
                <th>Hora inicio</th>
                <th>Hora fin</th>
                <th>Porc asistencia</th>
                <th>Porc participación</th>
                <th>Clase aprobada</th>
                <th>Porc aprobación</th>
                <th>Estado curso</th>
                <th>Nombre alumno</th>
                <th>Nombre Curso</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {cursoAlumnos.map((cursoAlumnos) => (
                <tr key={cursoAlumnos.idcursoAlumnos}>
                  <td>{cursoAlumnos.idCursoAlumno}</td>
                  <td>{cursoAlumnos.fechaIni}</td>
                  <td>{cursoAlumnos.fechaFin}</td>
                  <td>{cursoAlumnos.horaIni}</td>
                  <td>{cursoAlumnos.horaFin}</td>
                  <td align="right" width={90}>{cursoAlumnos.porcAsistencia}</td>
                  <td align="right" width={90}>{cursoAlumnos.porcParticipacion}</td>
                  <td>{cursoAlumnos.claseAprobada}</td>
                  <td align="right" width={90}>{cursoAlumnos.porcAprobacion}</td>
                  <td>{cursoAlumnos.estadoCurso}</td>
                  <td>{cursoAlumnos.nomAlumno}</td>
                  <td>{cursoAlumnos.nomCurso}</td>
                  <td>
                    <button
                      title="Editar CursoAlumnos"
                      id="OperationBtns"
                      onClick={() => editarCursoAlumnos(cursoAlumnos.idCursoAlumnos)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar cursoAlumnos" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Eliminar cursoAlumnos"
                      onClick={() => eliminar(cursoAlumnos.idCursoAlumnos)}
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
