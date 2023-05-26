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
// import InsertarAlumnos from "../../../templates/forms/Insertar/InsertarAlumnos";
// import EditarAlumnos from "../../../templates/forms/Editar/EditarAlumnos";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoAlumnos() {
  const [alumnos, setAlumnos] = useState([""]);
  // const [paginador, setPaginadorAlumnos] = useState([""]);
  // const urlPaginador = "paginador/botones_Alumnos.php";
  const [isActiveInsertAlumnos, setIsActiveInsertAlumnos] = useState(false);
  const [idAlumnos, setidAlumnos] = useState(null);
  const [isActiveEditAlumnos, setIsActiveEditAlumnos] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorAlumnos(paginador)
//     );
//   }

  function insertarAlumnos() {
    setIsActiveInsertAlumnos(!isActiveInsertAlumnos);
  }
  function editarAlumnos(ID) {
    setIsActiveEditAlumnos(!isActiveEditAlumnos);
    setidAlumnos(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateAlumnos.php";
        var operationUrl = "updateStateAlumnos";
        var data = { idAlumnos: ID, usuario: userData.username  };
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
    var url = "pages/listados/listadoAlumnos.php";
    var operationUrl = "listadoAlumnos";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      setAlumnos(data);});
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de alumnos</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarAlumnos}>
            Crear Alumnos
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
          {/* <InsertarAlumnos
            isActiveAlumnos={isActiveInsertAlumnos}
            cambiarEstado={setIsActiveInsertAlumnos}
          ></InsertarAlumnos>

          <EditarAlumnos
            isActiveEditAlumnos={isActiveEditAlumnos}
            cambiarEstado={setIsActiveEditAlumnos}
            idAlumnos={idAlumnos}
          ></EditarAlumnos> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre alumno</th>
                <th>Correo alumno</th>
                <th>Teléfono alumno</th>
                <th>Nombre servicio</th>
                <th>Nombre area</th>
                <th>Nombre pais</th>
                <th>Nombre cargo</th>

                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumnos) => (
                <tr key={alumnos.idAlumnos}>
                  <td>{alumnos.idAlumno}</td>
                  <td>{alumnos.nomAlumno}</td>
                  <td>{alumnos.correoAlumno}</td>
                  <td>{alumnos.telefonoAlumno}</td>
                  <td>{alumnos.nomServicio}</td>
                  <td>{alumnos.nomArea}</td>
                  <td>{alumnos.nomPais}</td>
                  <td>{alumnos.nomCargo}</td>

                  <td>
                    <button
                      title="Editar alumnos"
                      id="OperationBtns"
                      onClick={() => editarAlumnos(alumnos.idAlumnos)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar alumnos" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Eliminar alumnos"
                      onClick={() => eliminar(alumnos.idAlumnos)}
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
