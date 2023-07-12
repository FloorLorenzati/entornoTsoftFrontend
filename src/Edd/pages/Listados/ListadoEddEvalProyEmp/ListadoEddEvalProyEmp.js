import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { useRoute } from "wouter";

import getDataService from "../../../../services/GetDataService";
import SendDataService from "../../../../services/SendDataService";
import Header from "../../../../templates/Header/Header";
import { RiEditBoxFill } from "react-icons/ri";
import { BsFillKeyFill, BsFillTrashFill } from "react-icons/bs";

import "../TablasStyles.css";
import InsertarEDDEvalProyEmp from "../../templates/form/Insertar/InsertarEddEvalProyEmp";
import EditarEddEvalProyEmp from "../../templates/form/Editar/EditarEddEvalProyEmp";
import ConfirmAlert from "../../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../../templates/alerts/TopAlerts";
import Paginador from "../../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoEDDEvalProyEmp() {
  const [, params] = useRoute("/listadoEDDEvalProyEmp/:params");

  const [EDDEvalProyEmp, setEDDEvalProyEmp] = useState([""]);
  const [isActiveInsertEDDEvalProyEmp, setIsActiveInsertEDDEvalProyEmp] =
    useState(false);
  const [isActiveEditEDDEvalProyEmp, setIsActiveEditEDDEvalProyEmp] =
    useState(false);
  const [idEDDEvalProyEmp, setidEDDEvalProyEmp] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);
  const nombreTabla = "eddevalproyemp";

  const [idEDDEvaluacion, setidEDDEvaluacion] = useState(params.params);
  const [idEDDProyEmp, setidEDDProyEmp] = useState(params.params);

  const [listEDDEvaluacion, setlistEDDEvaluacion] = useState([""]);
  const [listEDDProyEmp, setlistEDDProyEmp] = useState([""]);

  function obtenerEvaluacion() {
    const url = "pages/auxiliares/listadoEddEvaluacion.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistEDDEvaluacion(response)
    );
  }
  function obtenerProyEmp() {
    const url = "pages/auxiliares/listadoEddProyEmp.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistEDDProyEmp(response)
    );
  }

    function insertarEDDEvalProyEmp() {
      setIsActiveInsertEDDEvalProyEmp(!isActiveInsertEDDEvalProyEmp);
    }
  function editarEDDEvalProyEmp(ID) {
    setIsActiveEditEDDEvalProyEmp(!isActiveEditEDDEvalProyEmp);
    setidEDDEvalProyEmp(ID);
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
          TopAlerts("successEdited");
        });
      }
    });
  }

  useEffect(
    function () {
      handleChangePaginador();
      obtenerEvaluacion();
      obtenerProyEmp()
    },
    [num_boton, cantidadPorPagina, idEDDEvaluacion,idEDDProyEmp]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    var url = "pages/listados/listadoEddEvalProyEmp.php";
    var operationUrl = "listadoEddEvalProyEmp";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
      idEDDProyEmp: idEDDProyEmp,
      idEDDEvaluacion: idEDDEvaluacion,
    };console.log(data);
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setEDDEvalProyEmp(datos.datos);console.log(data);
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
          <h1 id="TitlesPages">Listado de evaluaciones asociadas al proyecto-empleado</h1>
          <h6 style={{ color: "gray" }}>
            EDD {"->"} Listado de evaluaciones asociadas al proyecto-empleado
          </h6>
          <br></br>

          <div id="selectPaginador">
            <Button id="btn" onClick={insertarEDDEvalProyEmp}>
            Asociar evaluación al proyecto - empleado
            </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadRegistros">
                Cantidad registros:
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
                    selected={
                      valor.idEDDEvaluacion === idEDDEvaluacion
                        ? "selected"
                        : ""
                    }
                    value={valor.idEDDEvaluacion}
                  >
                    {valor.nomEvaluacion}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadR">Proyecto-Empleado: </label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => {
                  setidEDDProyEmp(target.value);
                  setNumBoton(1);
                }}
              >
                <option value="">Todos</option>
                {listEDDProyEmp.map((valor) => (
                  <option
                    selected={
                      valor.idEDDProyEmp === idEDDProyEmp
                        ? "selected"
                        : ""
                    }
                    value={valor.idEDDProyEmp}
                  >
                    {valor.nomProyEmp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <InsertarEDDEvalProyEmp
            isActiveEDDEvalProyEmp={isActiveInsertEDDEvalProyEmp}
            cambiarEstado={setIsActiveInsertEDDEvalProyEmp}
            EDDEvalProyEmp={EDDEvalProyEmp}
          ></InsertarEDDEvalProyEmp>

          <EditarEddEvalProyEmp
            isActiveEditEDDEvalProyEmp={isActiveEditEDDEvalProyEmp}
            cambiarEstado={setIsActiveEditEDDEvalProyEmp}
            idEDDEvalProyEmp={idEDDEvalProyEmp}
            setEDDEvalProyEmp={setEDDEvalProyEmp}
            EDDEvalProyEmp={EDDEvalProyEmp}
            nombreTabla={nombreTabla}
          ></EditarEddEvalProyEmp>

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Evaluación</th>
                <th>Proyecto</th> 
                <th>Empleado</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {EDDEvalProyEmp.map((EDDEvalProyEmp) => (
                <tr key={EDDEvalProyEmp.idEDDEvalProyEmp}>
                  <td>{EDDEvalProyEmp.idEDDEvalProyEmp}</td>
                  <td>{EDDEvalProyEmp.nomEvaluacion}</td>
                  <td>{EDDEvalProyEmp.nomProyecto}</td>
                  <td>{EDDEvalProyEmp.nomEmpleado}</td>

                  <td>
                  <button
                        data-title="Editar evaluación de proyecto - empleado"
                        id="OperationBtns"
                        onClick={() =>
                          editarEDDEvalProyEmp(
                            EDDEvalProyEmp.idEDDEvalProyEmp
                          )
                        }
                      >
                        <RiEditBoxFill id="icons" />
                      </button>

                    <button
                      data-title="Desactivar evaluación de proyecto - empleado"
                      onClick={() =>
                        desactivar(EDDEvalProyEmp.idEDDEvalProyEmp)
                      }
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
