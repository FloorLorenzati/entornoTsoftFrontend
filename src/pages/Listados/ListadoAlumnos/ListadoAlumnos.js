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
import InsertarAlumno from "../../../templates/forms/Insertar/InsertarAlumno"
import EditarAlumno from "../../../templates/forms/Editar/EditarAlumno";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoAlumno() {
  const [alumno, setAlumno] = useState([""]);
  // const [paginador, setPaginadorAlumno] = useState([""]);
  // const urlPaginador = "paginador/botones_Alumno.php";
  const [isActiveInsertAlumno, setIsActiveInsertAlumno] = useState(false);
  const [idAlumno, setidAlumno] = useState(null);
  const [isActiveEditAlumno, setIsActiveEditAlumno] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const nombreTabla= "alumno"

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorAlumno(paginador)
//     );
//   }

  function insertarAlumno() {
    setIsActiveInsertAlumno(!isActiveInsertAlumno);
  }
  function editarAlumno(ID) {
    setIsActiveEditAlumno(!isActiveEditAlumno);
    setidAlumno(ID);
  }

  function desactivar(ID) {
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
    var url = "pages/listados/listadoAlumnos.php";
    var operationUrl = "listadoAlumnos";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      setAlumno(data);});
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de alumno</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarAlumno}>
            Crear Alumno
          </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_mostrarRegistros">Mostrar registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_mostrarRegistros"
                id="input_mostrarRegistros"
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
          <InsertarAlumno
            isActiveAlumno={isActiveInsertAlumno}
            cambiarEstado={setIsActiveInsertAlumno}
            alumno={alumno}
          ></InsertarAlumno>

          <EditarAlumno
            isActiveEditAlumno={isActiveEditAlumno}
            cambiarEstado={setIsActiveEditAlumno}
            idAlumno={idAlumno}
            nombreTabla={nombreTabla}
            setAlumno={setAlumno}
            alumno={alumno}
          ></EditarAlumno> 

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
              {alumno.map((alumno) => (
                <tr key={alumno.idAlumno}>
                  <td>{alumno.idAlumno}</td>
                  <td>{alumno.nomAlumno}</td>
                  <td>{alumno.correoAlumno}</td>
                  <td>{alumno.telefonoAlumno}</td>
                  <td>{alumno.nomServicio}</td>
                  <td>{alumno.nomArea}</td>
                  <td>{alumno.nomPais}</td>
                  <td>{alumno.nomCargo}</td>

                  <td>
                    <button
                      title="Editar alumno"
                      id="OperationBtns"
                      onClick={() => editarAlumno(alumno.idAlumno)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar alumno" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar alumno"
                      onClick={() => desactivar(alumno.idAlumno)}
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
