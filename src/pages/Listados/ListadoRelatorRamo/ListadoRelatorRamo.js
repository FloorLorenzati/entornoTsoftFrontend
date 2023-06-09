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
import InsertarRelatorRamo from "../../../templates/forms/Insertar/InsertarRelatorRamo";
import EditarRelatorRamo from "../../../templates/forms/Editar/EditarRelatorRamo";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoRelatorRamo() {
  const [relatorRamo, setRelatorRamo] = useState([""]);
  const [isActiveInsertRelatorRamo, setIsActiveInsertRelatorRamo] =
    useState(false);
  const [idRelatorRamo, setidRelatorRamo] = useState(null);
  const [isActiveEditRelatorRamo, setIsActiveEditRelatorRamo] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);

  const nombreTabla = "relatorramo";

  function insertarRelatorRamo() {
    setIsActiveInsertRelatorRamo(!isActiveInsertRelatorRamo);
  }
  function editarRelatorRamo(ID) {
    setIsActiveEditRelatorRamo(!isActiveEditRelatorRamo);
    setidRelatorRamo(ID);
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
    var url = "pages/listados/listadoRelatorRamo.php";
    var operationUrl = "listadoRelatorRamo";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setRelatorRamo(datos.datos);
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
          <h1 id="TitlesPages">Listado de relatores ramos</h1>

          <div id="selectPaginador">
            <Button id="btn" onClick={insertarRelatorRamo}>
              Crear Relator Ramo
            </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadR">Cantidad registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_CantidadR"
                id="input_CantidadR"
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
          <InsertarRelatorRamo
            isActiveRelatorRamo={isActiveInsertRelatorRamo}
            cambiarEstado={setIsActiveInsertRelatorRamo}
            relatorRamo={relatorRamo}
          ></InsertarRelatorRamo>

          <EditarRelatorRamo
            isActiveEditRelatorRamo={isActiveEditRelatorRamo}
            cambiarEstado={setIsActiveEditRelatorRamo}
            idRelatorRamo={idRelatorRamo}
            setRelatorRamo={setRelatorRamo}
            relatorRamo={relatorRamo}
            nombreTabla={nombreTabla}
          ></EditarRelatorRamo>

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>Ramo</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {relatorRamo.map((relatorRamo) => (
                <tr key={relatorRamo.idRelator}>
                  <td>{relatorRamo.idRelatorRamo}</td>
                  <td>{relatorRamo.nomEmpleado}</td>
                  <td>{relatorRamo.nomRamo}</td>
                  <td>{relatorRamo.fechaIni}</td>
                  <td>{relatorRamo.fechaFin}</td>
                  <td>
                    <button
                      title="Editar relatorRamo"
                      id="OperationBtns"
                      onClick={() =>
                        editarRelatorRamo(relatorRamo.idRelatorRamo)
                      }
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar relatorRamo" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar relatorRamo"
                      onClick={() => desactivar(relatorRamo.idRelatorRamo)}
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
   