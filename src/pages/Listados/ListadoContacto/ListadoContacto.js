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
import InsertarContacto from "../../../templates/forms/Insertar/InsertarContacto";
import EditarContacto from "../../../templates/forms/Editar/EditarContacto";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoContacto() {
  const [contacto, setContacto] = useState([""]);
  // const [paginador, setPaginadorContacto] = useState([""]);
  // const urlPaginador = "paginador/botones_Contacto.php";
  const [isActiveInsertContacto, setIsActiveInsertContacto] = useState(false);
  const [idContacto, setidContacto] = useState(null);
  const [isActiveEditContacto, setIsActiveEditContacto] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorContacto(paginador)
//     );
//   }

  function insertarContacto() {
    setIsActiveInsertContacto(!isActiveInsertContacto);
  }
  function editarContacto(ID) {
    setIsActiveEditContacto(!isActiveEditContacto);
    setidContacto(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateContacto.php";
        var operationUrl = "updateStateContacto";
        var data = { idContacto: ID, usuario: userData.username  };
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
    var url = "pages/listados/listadoContactos.php";
    var operationUrl = "listadoContactos";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      setContacto(data);
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
          <h1 id="TitlesPages">Listado de contactos</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarContacto}>
            Crear Contacto
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
          {/* <InsertarContacto
            isActiveContacto={isActiveInsertContacto}
            cambiarEstado={setIsActiveInsertContacto}
          ></InsertarContacto>

          <EditarContacto
            isActiveEditContacto={isActiveEditContacto}
            cambiarEstado={setIsActiveEditContacto}
            idContacto={idContacto}
          ></EditarContacto> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Fecha inico</th>
                <th>Fecha fin</th>
                <th>Nombre del servicio</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {contacto.map((contacto) => (
                <tr key={contacto.idContacto}>
                  <td>{contacto.idContacto}</td>
                  <td>{contacto.nomContacto}</td>
                  <td>{contacto.correoContacto}</td>
                  <td>{contacto.telefonoContacto}</td>
                  <td>{contacto.fechaIni}</td>
                  <td>{contacto.fechaFin}</td>
                  <td>{contacto.nomServicio}</td>
                  <td>
                    <button
                      title="Editar contacto"
                      id="OperationBtns"
                      onClick={() => editarContacto(contacto.idContacto)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar contacto" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Eliminar contacto"
                      onClick={() => eliminar(contacto.idContacto)}
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
