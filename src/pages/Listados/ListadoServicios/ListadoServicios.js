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
// import InsertarServicios from "../../../templates/forms/Insertar/InsertarServicios";
// import EditarServicios from "../../../templates/forms/Editar/EditarServicios";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoServicios() {
  const [servicios, setServicios] = useState([""]);
//   const [isActiveInsertServicios, setIsActiveInsertServicios] = useState(false);
//   const [isActiveEditServicios, setIsActiveEditServicios] = useState(false);
  const [idServicios, setidServicios] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);

  const nombreTabla= "servicio"

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorServicios(paginador)
//     );
//   }

  function insertarServicios() {
    setIsActiveInsertServicios(!isActiveInsertServicios);
  }
  function editarServicios(ID) {
    setIsActiveEditServicios(!isActiveEditServicios);
    setidServicios(ID);
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
    var url = "pages/listados/listadoServicios.php";
    var operationUrl = "listadoServicios";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setServicios(datos.datos);
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
          <Button id="btn" onClick={insertarServicios}>
            Crear Sesion
          </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_tipoCliente">Mostrar registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_tipoCliente"
                id="input_tipoCliente"
                onChange={({ target }) => {setcantidadPorPagina(target.value);setNumBoton(1);
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
          {/* <InsertarServicios
            isActiveServicios={isActiveInsertServicios}
            cambiarEstado={setIsActiveInsertServicios}
          ></InsertarServicios>

          <EditarServicios
            isActiveEditServicios={isActiveEditServicios}
            cambiarEstado={setIsActiveEditServicios}
            idServicios={idServicios}
          ></EditarServicios> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del servicio</th>
                <th>Nombre del cliente</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicios) => (
                <tr key={servicios.idServicios}>
                  <td>{servicios.idServicio}</td>
                  <td>{servicios.nomServicio}</td>
                  <td>{servicios.nomCliente}</td>
                  <td>
                    <button
                      title="Editar servicios"
                      id="OperationBtns"
                      onClick={() => editarServicios(servicios.idServicios)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar servicios" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar servicios"
                      onClick={() => desactivar(servicios.idServicios)}
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
