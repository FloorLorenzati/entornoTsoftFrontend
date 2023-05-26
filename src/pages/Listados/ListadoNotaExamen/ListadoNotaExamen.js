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
// import InsertarNotaExamen from "../../../templates/forms/Insertar/InsertarNotaExamen";
// import EditarNotaExamen from "../../../templates/forms/Editar/EditarNotaExamen";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoNotaExamen() {
  const [notaExamen, setNotaExamen] = useState([""]);
  // const [paginador, setPaginadorNotaExamen] = useState([""]);
  // const urlPaginador = "paginador/botones_NotaExamen.php";
  const [isActiveInsertNotaExamen, setIsActiveInsertNotaExamen] = useState(false);
  const [idNotaExamen, setidNotaExamen] = useState(null);
  const [isActiveEditNotaExamen, setIsActiveEditNotaExamen] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const nombreTabla= "notaexamen"

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorNotaExamen(paginador)
//     );
//   }

  function insertarNotaExamen() {
    setIsActiveInsertNotaExamen(!isActiveInsertNotaExamen);
  }
  function editarNotaExamen(ID) {
    setIsActiveEditNotaExamen(!isActiveEditNotaExamen);
    setidNotaExamen(ID);
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
    var url = "pages/listados/listadoNotaExamen.php";
    var operationUrl = "listadoNotaExamen";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      {setNotaExamen(data);console.log(data);};});
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de Nota Examen</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarNotaExamen}>
            Crear Nota Examen
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
          {/* <InsertarNotaExamen
            isActiveNotaExamen={isActiveInsertNotaExamen}
            cambiarEstado={setIsActiveInsertNotaExamen}
          ></InsertarNotaExamen>

          <EditarNotaExamen
            isActiveEditNotaExamen={isActiveEditNotaExamen}
            cambiarEstado={setIsActiveEditNotaExamen}
            idNotaExamen={idNotaExamen}
          ></EditarNotaExamen> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nota examen</th>
                <th>Aprueba examen</th>
                <th>Nombre examen</th>
                <th>Id curso alumno</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {notaExamen.map((notaExamen) => (
                <tr key={notaExamen.idNotaExamen}>
                  <td>{notaExamen.idNotaExamen}</td>
                  <td>{notaExamen.notaExamen}</td>
                  <td>{notaExamen.apruebaExamen}</td>
                  <td>{notaExamen.nomExamen}</td>
                  <td>{notaExamen.idCursoAlumno}</td>

                  <td>
                    <button
                      title="Editar notaExamen"
                      id="OperationBtns"
                      onClick={() => editarNotaExamen(notaExamen.idNotaExamen)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar notaExamen" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar notaExamen"
                      onClick={() => desactivar(notaExamen.idNotaExamen)}
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
