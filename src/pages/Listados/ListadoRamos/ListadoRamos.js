import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import { BsFillTrashFill } from "react-icons/bs";

import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Header from "../../../templates/Header/Header";
import "../TablasStyles.css";

import InsertarRamo from "../../../templates/forms/Insertar/InsertarRamo";
import EditarRamo from "../../../templates/forms/Editar/EditarRamo";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import "../InsertarCursoListadoCursosYRamos.css";
import Button from "react-bootstrap/Button";
// import Paginador from "../templates/Paginador";

export default function ListadoRamos() {
  const [ramos, setRamos] = useState([""]);
  // const [paginador, setPaginadorRamos] = useState([""]);
  // const urlPaginador = "paginador/botones_Cursos.php";
  // const operationUrl = "pagina";

  const [isActiveInsertRamo, setIsActiveInsertRamo] = useState(false);
  const [isActiveEditRamo, setIsActiveEditRamo] = useState(false);
  const [idRamo, setidRamo] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [num_boton, setNumBoton] = useState(1);
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const nombreTabla= "ramo"

  function editarRamo(ID) {
    setIsActiveEditRamo(!isActiveEditRamo);
    setidRamo(ID);
  }
  function insertarRamo() {
    setIsActiveInsertRamo(!isActiveInsertRamo);
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
    [num_boton, cantidadPorPagina]
  );
  //  PAGINADOR ---------------------
  // function obtenerDatosPaginador() {
  //   getDataService(urlPaginador).then((paginador) =>
  //     setPaginadorRamos(paginador)
  //   );
  // }
  function handleChangePaginador() {
    var url = "pages/listados/listadoRamos.php";
    var operationUrl = "listadoRamos";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => setRamos(data));
  }

  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de ramos</h1>

          <div id="selectPaginador">
            <Button id="btn1" onClick={insertarRamo}>
              Crear Ramo
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
          {/* <InsertarRamo
            isActiveRamo={isActiveInsertRamo}
            cambiarEstado={setIsActiveInsertRamo}
            ramos={ramos}
          ></InsertarRamo>
          <EditarRamo
            isActiveEditRamo={isActiveEditRamo}
            cambiarEstado={setIsActiveEditRamo}
            idRamo={idRamo}
            setRamos={setRamos}
            ramos={ramos}
          ></EditarRamo> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Tipo de horario</th>
                <th>Duración</th>
                <th>Cant de sesiones</th>
                <th>Curso</th>
                {/* <th>Fecha de creación</th> */}
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {ramos.map((ramos) => (
                <tr key={ramos.idRamo}>
                  <td align="right" width={1}>{ramos.idRamo}</td>
                  <td>{ramos.codRamo}</td>
                  <td>{ramos.nomRamo}</td>
                  <td>{ramos.tipoRamo}</td>
                  <td>{ramos.tipoRamoHH}</td>
                  <td align="right" width={1}>{ramos.duracionRamoHH}</td>
                  <td align="right" width={141}>{ramos.cantSesionesRamo}</td>
                  <td>{ramos.nomCurso}</td>
                  {/* <td>{ramo.fechaCreacion}</td> */}
                  <td>
                    <button
                      title="Editar ramo"
                      id="OperationBtns"
                      onClick={() => editarRamo(ramos.idRamo)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    <button title="Examinar curso" id="OperationBtns">
                      <HiEye id="icons" />
                    </button>
                    <button
                      title="Desactivar curso"
                      id="OperationBtns"
                      onClick={() => desactivar(ramos.idRamo)}
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
