import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import GetDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Header from "../../../templates/Header/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../TablasStyles.css";
import InsertarCurso from "../../../templates/forms/Insertar/InsertarCurso"
import EditarCurso from "../../../templates/forms/Editar/EditarCurso";
// import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
// import Paginador from "../templates/Paginador";
import Button from "react-bootstrap/Button";
import "../../Listados/BtnInsertar.css";

export default function ListadoCursos() {
  const [curso, setCurso] = useState([""]);
  //   const [paginador, setPaginadorRelator] = useState([""]);
  //   const urlPaginador = "paginador/botones_Curso.php";
  const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
  const [isActiveEditCurso, setIsActiveEditCurso] = useState(false);
  const [idCurso, setIDCurso] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const nombreTabla= "curso"


  function insertarCurso() {
    setIsActiveInsertCurso(!isActiveInsertCurso);
  }

  function editarCurso(ID) {
    setIsActiveEditCurso(!isActiveEditCurso);
    setIDCurso(ID);
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

    function obtenerDatosPaginador() {
      getDataService(urlPaginador).then((paginador) =>
        setPaginadorRelator(paginador)
      );
    }

  useEffect(
    function () {
      //   obtenerDatosPaginador();
      handleChangePaginador();
    },
    [num_boton,cantidadPorPagina]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    var url = "pages/listados/listadoCursos.php";
    var operationUrl = "listadoCursos";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => setCurso(data));
  }

  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de cursos</h1>



          <div id="selectPaginador">
          <Button id="btn" onClick={insertarCurso}>
            Crear Curso
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
{/* 
          <InsertarCurso
            isActiveCurso={isActiveInsertCurso}
            cambiarEstado={setIsActiveInsertCurso}
            curso={curso}
          ></InsertarCurso>*/}

          <EditarCurso
            isActiveEditCurso={isActiveEditCurso}
            cambiarEstado={setIsActiveEditCurso}
            idCurso={idCurso}
            setCurso={setCurso}
            curso={curso}
            nombreTabla={nombreTabla}
          ></EditarCurso>
 
          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Tipo Horas</th>
                <th>Duración curso (horas)</th>
                <th>Cant sesiones</th>
                <th>Operaciones</th>

              </tr>
            </thead>
            <tbody>
              {curso.map((curso) => (
                <tr key={curso.idCurso}>
                  <td>{curso.idCurso}</td>
                  <td>{curso.codCurso}</td>
                  <td>{curso.nomCurso}</td>
                  <td>{curso.tipoHH}</td>
                  <td align="right" width={188}>{curso.duracionCursoHH}</td>
                  <td align="right" width={120}>{curso.cantSesionesCurso}</td>
                  <td>
                    <button
                      title="Editar curso"
                      id="OperationBtns"
                      onClick={() => editarCurso(curso.idCurso)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    <button
                      title="Desactivar curso"
                      onClick={() => desactivar(curso.idCurso)}
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