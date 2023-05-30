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
// import InsertarSesiones from "../../../templates/forms/Insertar/InsertarSesiones";
// import EditarSesiones from "../../../templates/forms/Editar/EditarSesiones";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoSesiones() {
  const [sesiones, setSesiones] = useState([""]);
  //   const [isActiveInsertSesiones, setIsActiveInsertSesiones] = useState(false);
  //   const [isActiveEditSesiones, setIsActiveEditSesiones] = useState(false);
  const [idSesiones, setidSesiones] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);

  const nombreTabla = "sesion";

  function insertarSesiones() {
    setIsActiveInsertSesiones(!isActiveInsertSesiones);
  }
  function editarSesiones(ID) {
    setIsActiveEditSesiones(!isActiveEditSesiones);
    setidSesiones(ID);
  }

  function desactivar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "pages/cambiarEstado/cambiarEstado.php";
        var operationUrl = "cambiarEstado";
        var data = {
          idRegistro: ID,
          usuarioModificacion: userData.usuario,
          nombreTabla: nombreTabla,
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
      handleChangePaginador();
    },
    [num_boton, cantidadPorPagina]
  );

  //PAGINADOR ---------------------
  function handleChangePaginador() {
    var url = "pages/listados/listadoSesiones.php";
    var operationUrl = "listadoSesiones";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };

    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setSesiones(datos.datos);
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
          <h1 id="TitlesPages">Listado de sesiones</h1>

          <div id="selectPaginador">
            <Button id="btn" onClick={insertarSesiones}>
              Crear Sesion
            </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_tipoCliente">Mostrar registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_tipoCliente"
                id="input_tipoCliente"
                onChange={({ target }) => {
                  setcantidadPorPagina(target.value);
                  setNumBoton(1);
                }}
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
          {/* <InsertarSesiones
            isActiveSesiones={isActiveInsertSesiones}
            cambiarEstado={setIsActiveInsertSesiones}
          ></InsertarSesiones>

          <EditarSesiones
            isActiveEditSesiones={isActiveEditSesiones}
            cambiarEstado={setIsActiveEditSesiones}
            idSesiones={idSesiones}
          ></EditarSesiones> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Número de sesion</th>
                <th>Nombre de sesion</th>
                <th>Tipo de sesion</th>
                <th>Tipo de sesion HH</th>
                <th>Duración de sesion HH</th>
                <th>Nombre del ramo</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {sesiones.map((sesiones) => (
                <tr key={sesiones.idSesiones}>
                  <td>{sesiones.idSesion}</td>
                  <td>{sesiones.nroSesion}</td>
                  <td>{sesiones.nomSesion}</td>
                  <td>{sesiones.tipoSesion}</td>
                  <td>{sesiones.tipoSesionHH}</td>
                  <td align="right" width={188}>
                    {sesiones.duracionSesionHH}
                  </td>
                  <td>{sesiones.nomRamo}</td>

                  <td>
                    <button
                      title="Editar sesiones"
                      id="OperationBtns"
                      onClick={() => editarSesiones(sesiones.idSesiones)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar sesiones" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar sesiones"
                      onClick={() => desactivar(sesiones.idSesiones)}
                      id="OperationBtns"
                    >
                      <BsFillTrashFill id="icons" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginador
            paginas={cantidadPaginas}
            cambiarNumero={setNumBoton}
            num_boton={num_boton}
          ></Paginador>
        </div>
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
