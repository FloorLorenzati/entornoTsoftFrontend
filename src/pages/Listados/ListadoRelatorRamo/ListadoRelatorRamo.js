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
// import InsertarRelatorRamo from "../../../templates/forms/Insertar/InsertarRelatorRamo";
// import EditarRelatorRamo from "../../../templates/forms/Editar/EditarRelatorRamo";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoRelatorRamo() {
  const [relatorRamo, setRelatorRamo] = useState([""]);
  // const [paginador, setPaginadorRelatorRamo] = useState([""]);
  // const urlPaginador = "paginador/botones_RelatorRamo.php";
  const [isActiveInsertRelatorRamo, setIsActiveInsertRelatorRamo] = useState(false);
  const [idRelatorRamo, setidRelatorRamo] = useState(null);
  const [isActiveEditRelatorRamo, setIsActiveEditRelatorRamo] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorRelatorRamo(paginador)
//     );
//   }

  function insertarRelatorRamo() {
    setIsActiveInsertRelatorRamo(!isActiveInsertRelatorRamo);
  }
  function editarRelatorRamo(ID) {
    setIsActiveEditRelatorRamo(!isActiveEditRelatorRamo);
    setidRelatorRamo(ID);
  }

  function eliminar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "TASKS/coe-updateStateRelatorRamo.php";
        var operationUrl = "updateStateRelatorRamo";
        var data = { idRelatorRamo: ID, usuario: userData.username  };
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
      {setRelatorRamo(data);console.log(data);};});
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de Relator Ramo</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarRelatorRamo}>
            Crear Relator Ramo
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
          {/* <InsertarRelatorRamo
            isActiveRelatorRamo={isActiveInsertRelatorRamo}
            cambiarEstado={setIsActiveInsertRelatorRamo}
          ></InsertarRelatorRamo>

          <EditarRelatorRamo
            isActiveEditRelatorRamo={isActiveEditRelatorRamo}
            cambiarEstado={setIsActiveEditRelatorRamo}
            idRelatorRamo={idRelatorRamo}
          ></EditarRelatorRamo> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha Inicio</th>
                <th>Fecha Inicio</th>
                <th>Nombre Empleado</th>
                <th>Nombre Ramo</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {relatorRamo.map((relatorRamo) => (
                <tr key={relatorRamo.idRelatorRamo}>
                  <td>{relatorRamo.idRelatorRamo}</td>
                  <td>{relatorRamo.fechaIni}</td>
                  <td>{relatorRamo.fechaFin}</td>
                  <td>{relatorRamo.nomEmpleado}</td>
                  <td>{relatorRamo.nomRamo}</td>
                  <td>
                    <button
                      title="Editar relatorRamo"
                      id="OperationBtns"
                      onClick={() => editarRelatorRamo(relatorRamo.idRelatorRamo)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar relatorRamo" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Eliminar relatorRamo"
                      onClick={() => eliminar(relatorRamo.idRelatorRamo)}
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
