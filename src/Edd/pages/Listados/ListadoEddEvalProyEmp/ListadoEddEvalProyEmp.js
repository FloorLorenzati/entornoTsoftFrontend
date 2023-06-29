import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate,Link } from "react-router-dom";
import { useRoute } from "wouter";

import getDataService from "../../../../services/GetDataService";
import SendDataService from "../../../../services/SendDataService";
import Header from "../../../../templates/Header/Header";
import { RiEditBoxFill } from "react-icons/ri";
import { BsFillKeyFill,BsFillTrashFill } from "react-icons/bs";

import "../TablasStyles.css";
// import InsertarEddEvalProyEmp from "../../../templates/forms/Insertar/InsertarEddEvalProyEmp";
// import EditarEddEvalProyEmp from "../../../templates/forms/Editar/EditarEddEvalProyEmp";
import ConfirmAlert from "../../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../../templates/alerts/TopAlerts";
import Paginador from "../../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoEddEvalProyEmp() {
  const [, params] = useRoute("/listadoEddEvalProyEmp/:params");

  const [EddEvalProyEmp, setEddEvalProyEmp] = useState([""]);
  const [isActiveInsertEddEvalProyEmp, setIsActiveInsertEddEvalProyEmp] = useState(false);
  const [isActiveEditEddEvalProyEmp, setIsActiveEditEddEvalProyEmp] = useState(false);
  const [idEddEvalProyEmp, setidEddEvalProyEmp] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);
  const nombreTabla = "EddEvalProyEmp";

  const [idEDDEvaluacion, setidEDDEvaluacion] = useState(params.params);
  const [idEDDProyecto, setidEDDProyecto] = useState(params.params);

  const [listEDDEvaluacion, setlistEDDEvaluacion] = useState([""]);



  function obtenerEvaluacion() {
    const url = "pages/auxiliares/listadoEddEvaluacion.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistEDDEvaluacion(response)
    );
  }

//   function insertarEddEvalProyEmp() {
//     setIsActiveInsertEddEvalProyEmp(!isActiveInsertEddEvalProyEmp);
//   }
//   function editarEddEvalProyEmp(ID) {
//     setIsActiveEditEddEvalProyEmp(!isActiveEditEddEvalProyEmp);
//     setidEddEvalProyEmp(ID);
//   }

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
          TopAlerts('successEdited');
        });
      }
    });
  }

  useEffect(
    function () {
      handleChangePaginador();
      obtenerEvaluacion();
    },
    [num_boton, cantidadPorPagina,idEDDProyecto,idEDDEvaluacion]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    var url = "pages/listados/listadoEddEvalProyEmp.php";
    var operationUrl = "listadoEddEvalProyEmp";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
      idEDDProyEmp:idEDDProyecto,
      idEDDEvaluacion:idEDDEvaluacion
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setEddEvalProyEmp(datos.datos);
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
          <h1 id="TitlesPages">Listado de EDD Eval Proy Emp</h1>
          <h6 style={{color:'gray'}}>EDD {'->'} Listado de EDD Eval Proy Emp</h6>
          <br></br>

          <div id="selectPaginador">
            {/* <Button id="btn" onClick={insertarEddEvalProyEmp}>
              Crear Proyecto
            </Button> */}

            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadRegistros">
                Cantidad registros:{" "}
              </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_CantidadRegistros"
                id="input_CantidadRegistros"
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
            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadR">Evaluación: </label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => {
                  setidEDDEvaluacion(target.value);
                  setNumBoton(1);
                }}
              >
                <option value="">Todos</option>
                {listEDDEvaluacion.map((valor) => (
                  <option
                    selected={valor.idEDDEvaluacion === idEDDEvaluacion ? "selected" : ""}
                    value={valor.idEDDEvaluacion}
                  >
                    {valor.nomEvaluacion}
                  </option>
                ))}
              </select>
            </div>
            </div>
        
          {/* <InsertarEddEvalProyEmp
            isActiveEddEvalProyEmp={isActiveInsertEddEvalProyEmp}
            cambiarEstado={setIsActiveInsertEddEvalProyEmp}
            EddEvalProyEmp={EddEvalProyEmp}
          ></InsertarEddEvalProyEmp>

          <EditarEddEvalProyEmp
            isActiveEditEddEvalProyEmp={isActiveEditEddEvalProyEmp}
            cambiarEstado={setIsActiveEditEddEvalProyEmp}
            idEddEvalProyEmp={idEddEvalProyEmp}
            setEddEvalProyEmp={setEddEvalProyEmp}
            EddEvalProyEmp={EddEvalProyEmp}
            nombreTabla={nombreTabla}
          ></EditarEddEvalProyEmp> */}

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Evaluación</th>
                <th>ID proyEmp</th>
                <th>Respondida</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {EddEvalProyEmp.map((EddEvalProyEmp) => (
                <tr key={EddEvalProyEmp.idEDDEvalProyEmp}>
                  <td>{EddEvalProyEmp.idEddEvalProyEmp}</td>
                  <td>{EddEvalProyEmp.nomEvaluacion}</td>
                  <td>{EddEvalProyEmp.idEDDProyEmp}</td>
                  <td>{EddEvalProyEmp.evalRespondida}</td>
                  <td>{EddEvalProyEmp.fechaIni}</td>
                  <td>{EddEvalProyEmp.fechaFin}</td>

                  <td>
                    <button
                      title="Editar proyecto"
                      id="OperationBtns"
                      onClick={() => editarEddEvalProyEmp(EddEvalProyEmp.idEddEvalProyEmp)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>


                    <button
                      title="Desactivar proyecto"
                      onClick={() => desactivar(EddEvalProyEmp.idEddEvalProyEmp)}
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
