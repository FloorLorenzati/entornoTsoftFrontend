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
import InsertarEDDEvaluacion from "../../templates/form/Insertar/InsertarEddEvaluacion";
import EditarEDDEvaluacion from "../../templates/form/Editar/EditarEddEvaluacion";
import ConfirmAlert from "../../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../../templates/alerts/TopAlerts";
import Paginador from "../../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoEDDEvaluacion() {
  const [EDDEvaluacion, setEDDEvaluacion] = useState([""]);
  const [isActiveInsertEDDEvaluacion, setIsActiveInsertEDDEvaluacion] =
    useState(false);
  const [isActiveEditEDDEvaluacion, setIsActiveEditEDDEvaluacion] =
    useState(false);
  const [idEDDEvaluacion, setidEDDEvaluacion] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);
  const nombreTabla = "eddevaluacion";

  function insertarEDDEvaluacion() {
    setIsActiveInsertEDDEvaluacion(!isActiveInsertEDDEvaluacion);
  }
  function editarEDDEvaluacion(ID) {
    setIsActiveEditEDDEvaluacion(!isActiveEditEDDEvaluacion);
    setidEDDEvaluacion(ID);
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
    },
    [num_boton, cantidadPorPagina]
  );

  //PAGINADOR ---------------------

  function handleChangePaginador() {
    var url = "pages/listados/listadoEddEvaluacion.php";
    var operationUrl = "listadoEddEvaluacion";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setEDDEvaluacion(datos.datos);
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
          <h1 id="TitlesPages">Listado de EDD Evaluación</h1>
          <h6 style={{ color: "gray" }}>
            EDD {"->"} Listado de EDD Evaluación
          </h6>
          <br></br>

          <div id="selectPaginador">
            <Button id="btn" onClick={insertarEDDEvaluacion}>
              Crear Evaluacion
            </Button>
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
          </div>

          <InsertarEDDEvaluacion
            isActiveEDDEvaluacion={isActiveInsertEDDEvaluacion}
            cambiarEstado={setIsActiveInsertEDDEvaluacion}
            EDDEvaluacion={EDDEvaluacion}
          ></InsertarEDDEvaluacion>

          <EditarEDDEvaluacion
            isActiveEditEDDEvaluacion={isActiveEditEDDEvaluacion}
            cambiarEstado={setIsActiveEditEDDEvaluacion}
            idEDDEvaluacion={idEDDEvaluacion}
            setEDDEvaluacion={setEDDEvaluacion}
            EDDEvaluacion={EDDEvaluacion}
            nombreTabla={nombreTabla}
          ></EditarEDDEvaluacion>

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Evaluación</th>
                <th>Tipo</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {EDDEvaluacion.map((EDDEvaluacion) => (
                <tr key={EDDEvaluacion.idEDDEvaluacion}>
                  <td>{EDDEvaluacion.idEDDEvaluacion}</td>
                  <td>{EDDEvaluacion.nomEvaluacion}</td>
                  <td>{EDDEvaluacion.tipoEvaluacion}</td>
                  <td>{EDDEvaluacion.fechaIni}</td>
                  <td>{EDDEvaluacion.fechaFin}</td>
                  <td>
                    <button
                      title="Editar Evaluacion"
                      id="OperationBtns"
                      onClick={() =>
                        editarEDDEvaluacion(EDDEvaluacion.idEDDEvaluacion)
                      }
                    >
                      <RiEditBoxFill id="icons" />
                    </button>

                    <button
                      title="Desactivar Evaluacion"
                      onClick={() => desactivar(EDDEvaluacion.idEDDEvaluacion)}
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
