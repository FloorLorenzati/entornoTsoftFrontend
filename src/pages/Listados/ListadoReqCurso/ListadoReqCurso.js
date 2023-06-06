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
import InsertarReqCurso from "../../../templates/forms/Insertar/InsertarReqCurso";
import EditarReqCurso from "../../../templates/forms/Editar/EditarReqCurso";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoReqCurso() {
  const [reqCurso, setReqCurso] = useState([""]);
  const [isActiveInsertReqCurso, setIsActiveInsertReqCurso] = useState(false);
  const [idReqCurso, setidReqCurso] = useState(null);
  const [isActiveEditReqCurso, setIsActiveEditReqCurso] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);
  const nombreTabla= "reqcurso"

  function insertarReqCurso() {
    setIsActiveInsertReqCurso(!isActiveInsertReqCurso);
  }
  function editarReqCurso(ID) {
    setIsActiveEditReqCurso(!isActiveEditReqCurso);
    setidReqCurso(ID);
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
          const { paginador, ...datos } = data;
          setCantidadPaginas(paginador.cantPaginas);
          setReqCurso(datos.datos);
          console.log(data);
            });
      }
    });
  }
  useEffect(
    function () {
      handleChangePaginador();
    },
    [num_boton,cantidadPorPagina]
  );

  //PAGINADOR ---------------------
  function handleChangePaginador() {
    var url = "pages/listados/listadoReqCurso.php";
    var operationUrl = "listadoReqCurso";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setReqCurso(datos.datos);
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
          <h1 id="TitlesPages">Listado de requisito cursos</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarReqCurso}>
            Crear Req Curso
          </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_MostrarR">Mostrar registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_MostrarR"
                id="input_MostrarR"
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

          <InsertarReqCurso
            isActiveReqCurso={isActiveInsertReqCurso}
            cambiarEstado={setIsActiveInsertReqCurso}
            reqCurso={reqCurso}
          ></InsertarReqCurso>

          <EditarReqCurso
            isActiveEditReqCurso={isActiveEditReqCurso}
            cambiarEstado={setIsActiveEditReqCurso}
            idReqCurso={idReqCurso}
            setReqCurso={setReqCurso}
            reqCurso={reqCurso} 
            nombreTabla={nombreTabla}
          ></EditarReqCurso> 

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre curso</th>
                <th>Requisito curso</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {reqCurso.map((reqCurso) => (
                <tr key={reqCurso.idReqCurso}>
                  <td>{reqCurso.idReqCurso}</td>
                  <td>{reqCurso.nomCurso}</td>
                  <td>{reqCurso.requisitoCurso}</td>
                  <td>
                    <button
                      title="Editar ReqCurso"
                      id="OperationBtns"
                      onClick={() => editarReqCurso(reqCurso.idReqCurso)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar ReqCurso" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar ReqCurso"
                      onClick={() => desactivar(reqCurso.idReqCurso)}
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
