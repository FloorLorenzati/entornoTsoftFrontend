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
import InsertarClientes from "../../../templates/forms/Insertar/InsertarClientes";
import EditarClientes from "../../../templates/forms/Editar/EditarCliente";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../../../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoClientes() {
  const [cliente, setCliente] = useState([""]);
  // const [paginador, setPaginadorRelator] = useState([""]);
  // const urlPaginador = "paginador/botones_Clientes.php";
  // const operationUrl = "pagina";
  const [isActiveInsertCliente, setIsActiveInsertCliente] = useState(false);
  const [isActiveEditCliente, setIsActiveEditCliente] = useState(false);
  const [idCliente, setidCliente] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);


  function insertarCliente() {
    setIsActiveInsertCliente(!isActiveInsertCliente);
  }
  function editarCliente(ID) {
    setIsActiveEditCliente(!isActiveEditCliente);
    setidCliente(ID);
  }
  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateClientes.php";
        var operationUrl = "updateStateClientes";
        var data = { ID: ID, usuario: userData.username };
        SendDataService(url, operationUrl, data).then((response) => {
          const { successEdited } = response[0];
          TopAlerts(successEdited);
        });
      }
    });
  }

  // function obtenerDatosPaginador() {
  //   getDataService(urlPaginador).then((paginador) =>
  //     setPaginadorRelator(paginador)
  //   );
  // }

  useEffect(
    function () {
      // obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton, cantidadPorPagina]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    var url = "pages/listados/listadoClientes.php";
    var operationUrl = "listadoClientes";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => setCliente(data));
  }

  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de clientes</h1>

          <div id="selectPaginador">

          <Button id="btn" onClick={insertarCliente}>
            Crear Cliente
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

          {/* <InsertarClientes
            isActiveCliente={isActiveInsertCliente}
            cambiarEstado={setIsActiveInsertCliente}
            cliente={cliente}
          ></InsertarClientes>

          <EditarClientes
            isActiveEditCliente={isActiveEditCliente}
            cambiarEstado={setIsActiveEditCliente}
            idCliente={idCliente}
            setCliente={setCliente}
            cliente={cliente}
          ></EditarClientes> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del cliente</th>
                <th>Dirección</th>
                <th>Pais</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {cliente.map((cliente) => (
                <tr key={cliente.idCliente}>
                  <td>{cliente.idCliente}</td>
                  <td>{cliente.nomCliente}</td>
                  <td>{cliente.direccionCliente}</td>
                  <td>{cliente.nomPais}</td>
                  <td>
                    <button
                      title="Editar cliente"
                      id="OperationBtns"
                      onClick={() => editarCliente(cliente.idCliente)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar curso" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Eliminar cliente"
                      onClick={() => eliminar(cliente.idCliente)}
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
