import React, { useState, useEffect } from "react";

import "../Insertar/Insertar.css";
import SendDataService from "../../../../../services/SendDataService";
import getDataService from "../../../../../services/GetDataService";

import TopAlerts from "../../../../../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarEDDEvalProyEmp = ({
  isActiveInsertEDDEvalProyResp,
  cambiarEstado,
  EDDEvalProyEmp,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [respuesta, setrespuesta] = useState("");

  const [idEDDEvalPregunta, setidEDDEvalPregunta] = useState("");
  const [idEDDEvalRespPreg, setidEDDEvalRespPreg] = useState("");
  const [idEDDEvalProyEmpleado, setidEDDEvalProyEmp] = useState("");

  const [listEDDEvalPregunta, setlistEDDEvalPregunta] = useState([""]);
  const [listEDDEvalRespPreg, setlistEDDEvalRespPreg] = useState([""]);
  const [listEDDEvalProyEmpleado, setlistEDDEvalProyEmpleado] = useState([""]);

  const listEDDEvalProyEmp = EDDEvalProyEmp;

  const show = isActiveInsertEDDEvalProyResp;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function obtenerEvalProyectoEmpleado() {
    const url = "pages/auxiliares/listadoEddEvalProyEmp.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistEDDEvalProyEmpleado(response)
    );
  }

  function obtenerEvalRespPreg() {
    const url = "pages/auxiliares/listadoEddEvalRespPreg.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistEDDEvalRespPreg(response)
    );
  }
  function obtenerEvalPregunta() {
    const url = "pages/auxiliares/listadoEddEvalPregunta.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistEDDEvalPregunta(response)
    );
  }

  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarEDDEvalProyEmp.php";
    const operationUrl = "insertarEDDEvalProyEmp";
    var data = {
      usuarioCreacion: userData.usuario,
      respuesta: respuesta,
      idEDDEvalPregunta: idEDDEvalPregunta,
      idEDDEvalRespPreg: idEDDEvalRespPreg,
      idEDDEvalProyEmpleado: idEDDEvalProyEmpleado,
      isActive: true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      TopAlerts("successCreated");
      actualizarEDDEvalProyEmp(EDDEvalProyEmp);
      console.log(response);
    });
  }

  function actualizarEDDEvalProyEmp(response) {
    listEDDEvalProyEmp.push(response);
  }

  useEffect(function () {
    obtenerEvalProyectoEmpleado();
    obtenerEvalRespPreg();
    obtenerEvalPregunta();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreDelEDDEvalPregunta">Respuesta:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre Proyecto"
                type="text"
                className="form-control"
                name="input_nombreDelEDDEvalPregunta"
                id="input_nombreDelEDDEvalPregunta"
                value={respuesta || ""}
                maxLength="500"
                onChange={({ target }) => setrespuesta(target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_Evaluacion">
                Evaluación Proyectyo Empleado:{" "}
              </label>
              <select
                required
                className="form-control"
                name="input_Evaluacion"
                id="input_Evaluacion"
                placeholder="Seleccione la Evaluación + Proyectyo + Empleado"
                onChange={({ target }) => setidEDDEvalProyEmp(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listEDDEvalProyEmpleado.map((valor) => (
                  <option value={valor.idEDDEvalProyEmpleado}>
                    {valor.nomEvalProyEmp}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="input_proyemp">Pregunta: </label>
              <select
                required
                className="form-control"
                name="input_proyemp"
                id="input_proyemp"
                placeholder="Seleccione la Pregunta"
                onChange={({ target }) => setidEDDEvalPregunta(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listEDDEvalPregunta.map((valor) => (
                  <option value={valor.idEDDEvalPregunta}>
                    {valor.nomPregunta}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_proyemp">RespPregunta: </label>
              <select
                required
                className="form-control"
                name="input_proyemp"
                id="input_proyemp"
                placeholder="Seleccione la RespPregunta"
                onChange={({ target }) => setidEDDEvalRespPreg(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listEDDEvalRespPreg.map((valor) => (
                  <option value={valor.idEDDEvalRespPreg}>
                    {valor.nomRespPreg}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="secondary"
              type="submit"
              id="btn_registrar"
              value="Registrar"
            >
              Registrar
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default InsertarEDDEvalProyEmp;
