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
// import InsertarRamoExamen from "../../../templates/forms/Insertar/InsertarRamoExamen";
// import EditarRamoExamen from "../../../templates/forms/Editar/EditarRamoExamen";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoRamoExamen() {
  const [ramoExamen, setRamoExamen] = useState([""]);
  // const [paginador, setPaginadorRamoExamen] = useState([""]);
  // const urlPaginador = "paginador/botones_RamoExamen.php";
  const [isActiveInsertRamoExamen, setIsActiveInsertRamoExamen] = useState(false);
  const [idRamoExamen, setidRamoExamen] = useState(null);
  const [isActiveEditRamoExamen, setIsActiveEditRamoExamen] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const nombreTabla= "ramoexamen"

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorRamoExamen(paginador)
//     );
//   }

  function insertarRamoExamen() {
    setIsActiveInsertRamoExamen(!isActiveInsertRamoExamen);
  }
  function editarRamoExamen(ID) {
    setIsActiveEditRamoExamen(!isActiveEditRamoExamen);
    setidRamoExamen(ID);
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
    var url = "pages/listados/listadoRamoExamen.php";
    var operationUrl = "listadoRamoExamen";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      {setRamoExamen(data);console.log(data);};});
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de Ramo Examen</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarRamoExamen}>
            Crear Ramo Examen
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
          {/* <InsertarRamoExamen
            isActiveRamoExamen={isActiveInsertRamoExamen}
            cambiarEstado={setIsActiveInsertRamoExamen}
          ></InsertarRamoExamen>

          <EditarRamoExamen
            isActiveEditRamoExamen={isActiveEditRamoExamen}
            cambiarEstado={setIsActiveEditRamoExamen}
            idRamoExamen={idRamoExamen}
          ></EditarRamoExamen> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre examen</th>
                <th>Fecha examen</th>
                <th>Nombre Ramo</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {ramoExamen.map((ramoExamen) => (
                <tr key={ramoExamen.idRamoExamen}>
                  <td>{ramoExamen.idRamoExamen}</td>
                  <td>{ramoExamen.nomExamen}</td>
                  <td>{ramoExamen.fechaExamen}</td>
                  <td>{ramoExamen.nomRamo}</td>
                  <td>
                    <button
                      title="Editar ramoExamen"
                      id="OperationBtns"
                      onClick={() => editarRamoExamen(ramoExamen.idRamoExamen)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar ramoExamen" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar ramoExamen"
                      onClick={() => desactivar(ramoExamen.idRamoExamen)}
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
