import React, { useState, useEffect } from "react";

import "../Insertar/Insertar.css";
import SendDataService from "../../../../../services/SendDataService";
import getDataService from "../../../../../services/GetDataService";

import TopAlerts from "../../../../../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarEDDEvalProyEmp = ({
  isActiveEDDEvalProyEmp,
  cambiarEstado,
  EDDEvalProyEmp,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [evalRespondida, setevalRespondida] = useState("");
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");

  const [idEDDEvaluacion, setidEDDEvaluacion] = useState("");
  const [idEDDProyEmp, setidEDDProyEmp] = useState("");

  const [listEDDEvaluacion, setlistEDDEvaluacion] = useState([""]);
  const [listEDDProyectoEmpleado, setlistEDDProyectoEmpleado] = useState([""]);

  const listEDDEvalProyEmp = EDDEvalProyEmp;

  const show = isActiveEDDEvalProyEmp;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function obtenerProyectoEmpleado() {
    const url = "pages/auxiliares/listadoEddProyEmp.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistEDDProyectoEmpleado(response)
    );
  }
  function obtenerEvaluacion() {
    const url = "pages/auxiliares/listadoEddEvaluacion.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistEDDEvaluacion(response)
    );
  }

  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarEddEvalProyEmp.php";
    const operationUrl = "insertarEddEvalProyEmp";
    var data = {
      usuarioCreacion: userData.usuario,
      evalRespondida: evalRespondida,
      fechaIni: fechaIni,
      fechaFin: fechaFin,
      idEDDEvaluacion: idEDDEvaluacion,
      idEDDProyEmp: idEDDProyEmp,
      isActive: true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
    //   TopAlerts("successCreated");
      actualizarEDDEvalProyEmp(EDDEvalProyEmp);
      console.log(response);
    });
  }

  function actualizarEDDEvalProyEmp(response) {
    listEDDEvalProyEmp.push(response);
  }

  useEffect(function () {
    obtenerProyectoEmpleado();
    obtenerEvaluacion();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Eval proy emp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div className="form-group">
              <label htmlFor="input_Evaluacion">Evaluación: </label>
              <select
                required
                className="form-control"
                name="input_Evaluacion"
                id="input_Evaluacion"
                placeholder="Seleccione la evaluación"
                onChange={({ target }) => setidEDDEvaluacion(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listEDDEvaluacion.map((valor) => (
                  <option value={valor.idEDDEvaluacion}>
                    {valor.nomEvaluacion}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="input_proyemp">Proyecto Empleado: </label>
              <select
                required
                className="form-control"
                name="input_proyemp"
                id="input_proyemp"
                placeholder="Seleccione la Proyecto + Empleado"
                onChange={({ target }) => setidEDDProyEmp(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listEDDProyectoEmpleado.map((valor) => (
                  <option value={valor.idEDDProyEmp}>{valor.nomProyEmp}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="input_nombreDelEDDEvalPregunta">
                Respondida:
              </label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre Proyecto"
                type="number"
                className="form-control"
                name="input_nombreDelEDDEvalPregunta"
                id="input_nombreDelEDDEvalPregunta"
                maxLength="4"
                onChange={({ target }) => setevalRespondida(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_fechaI">Fecha inicio:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                type="datetime-local"
                className="form-control"
                name="input_fechaI"
                id="input_fechaI"
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_fechaf">Fecha fin:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                type="datetime-local"
                className="form-control"
                name="input_fechaf"
                id="input_fechaf"
                onChange={({ target }) => setfechaFin(target.value)}
                required
              />
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
