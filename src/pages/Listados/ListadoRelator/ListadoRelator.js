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
import InsertarRelator from "../../../templates/forms/Insertar/InsertarRelator";
import EditarRelator from "../../../templates/forms/Editar/EditarRelator";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoRelator() {
  const [relator, setRelator] = useState([""]);
  // const [paginador, setPaginadorRelator] = useState([""]);
  // const urlPaginador = "paginador/botones_Relator.php";
  const [isActiveInsertRelator, setIsActiveInsertRelator] = useState(false);
  const [idRelator, setidRelator] = useState(null);
  const [isActiveEditRelator, setIsActiveEditRelator] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorRelator(paginador)
//     );
//   }

  function insertarRelator() {
    setIsActiveInsertRelator(!isActiveInsertRelator);
  }
  function editarRelator(ID) {
    setIsActiveEditRelator(!isActiveEditRelator);
    setidRelator(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateRelator.php";
        var operationUrl = "updateStateRelator";
        var data = { idRelator: ID, usuario: userData.username  };
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
    var url = "pages/listados/listadoRelatorRamo.php";
    var operationUrl = "listadoRelatorRamo";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      setRelator(data);
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
          <h1 id="TitlesPages">Listado de relatores</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarRelator}>
            Crear Relator
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
          {/* <InsertarRelator
            isActiveRelator={isActiveInsertRelator}
            cambiarEstado={setIsActiveInsertRelator}
          ></InsertarRelator>

          <EditarRelator
            isActiveEditRelator={isActiveEditRelator}
            cambiarEstado={setIsActiveEditRelator}
            idRelator={idRelator}
          ></EditarRelator> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre empleado</th>
                <th>Nombre ramo</th>
                <th>Fecha inicio de actividades</th>
                <th>Fecha fin de actividades</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {relator.map((relator) => (
                <tr key={relator.idRelator}>
                  <td>{relator.idRelatorRamo}</td>
                  <td>{relator.nomEmpleado}</td>
                  <td>{relator.nomRamo}</td>
                  <td>{relator.fechaIni}</td>
                  <td>{relator.fechaFin}</td>
                  <td>
                    <button
                      title="Editar relator"
                      id="OperationBtns"
                      onClick={() => editarRelator(relator.idRelator)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar relator" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Eliminar relator"
                      onClick={() => eliminar(relator.idRelator)}
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
