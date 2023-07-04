import React, { useState, useEffect } from "react";
import "../Insertar/Insertar.css";
import SendDataService from "../../../../../services/SendDataService";
import getDataService from "../../../../../services/GetDataService";
import TopAlerts from "../../../../../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarEDDEvalProyEmp = ({
  isActiveEditEDDEvalProyResp,
  cambiarEstado,
  idEDDEvalProyResp,
  EDDEvalProyResp,
  setEDDEvalProyResp,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [respuesta, setrespuesta] = useState("");

  const [idEDDEvalPregunta, setidEDDEvalPregunta] = useState("");
  const [idEDDEvalRespPreg, setidEDDEvalRespPreg] = useState("");
  const [idEDDEvalProyEmpleado, setidEDDEvalProyEmp] = useState("");

  const [listEDDEvalPregunta, setlistEDDEvalPregunta] = useState([""]);
  const [listEDDEvalRespPreg, setlistEDDEvalRespPreg] = useState([""]);
  const [listEDDEvalProyEmpleado, setlistEDDEvalProyEmpleado] = useState([""]);

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const listEDDEvalProyResp = EDDEvalProyResp;

  const show = isActiveEditEDDEvalProyResp;

  const handleClose = () => {
    cambiarEstado(false);
    setrespuesta(responseID[0].respuesta);

    setidEDDEvalPregunta(responseID[0].idEDDEvalPregunta);
    setidEDDEvalRespPreg(responseID[0].idEDDEvalRespPreg);
    setidEDDEvalProyEmp(responseID[0].idEDDEvalProyEmpleado);
  };

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

  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro:idEDDEvalProyResp, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setrespuesta(response[0].respuesta);
      setidEDDEvalPregunta(response[0].idEDDEvalPregunta);
      setidEDDEvalRespPreg(response[0].idEDDEvalRespPreg);
      setidEDDEvalProyEmp(response[0].idEDDEvalProyEmpleado);

    });
  }, [idEDDEvalProyResp]);

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarEDDEvalProyEmp.php";
    var operationUrl = "editarEDDEvalProyEmp";
    var data = {
      usuarioModificacion: userData.usuario,
      idEDDEvalProyResp: idEDDEvalProyResp,
      respuesta:respuesta === "" ? responseID[0].respuesta : respuesta,
      idEDDEvalPregunta:idEDDEvalPregunta === "" ? responseID[0].idEDDEvalPregunta : idEDDEvalPregunta,
      idEDDEvalRespPreg:idEDDEvalRespPreg === "" ? responseID[0].idEDDEvalRespPreg : idEDDEvalRespPreg,
      idEDDEvalProyEmpleado:idEDDEvalProyEmpleado === "" ? responseID[0].idEDDEvalProyEmpleado : idEDDEvalProyEmpleado,
      isActive:true,
    };
console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      TopAlerts('successEdited');
      actualizarEDDEvalProyResp(EDDEvalProyResp);console.log(response);
    });

    function actualizarEDDEvalProyResp(EDDEvalProyResp) {
      const nuevosEDDEvalProyResp = listEDDEvalProyResp.map((c) =>
        c.idEDDEvalProyResp === EDDEvalProyResp.idEDDEvalProyResp ? EDDEvalProyResp : c
      );
      setEDDEvalProyResp(nuevosEDDEvalProyResp);
    }
  }

  useEffect(
    function () {
      if (idEDDEvalProyResp !== null) {
        getData();
        obtenerEvalProyectoEmpleado();
        obtenerEvalRespPreg();
        obtenerEvalPregunta();

      }
    },
    [idEDDEvalProyResp]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Eval proy emp</Modal.Title>
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
              <label htmlFor="input_Evaluacion">Evaluación Proyectyo Empleado: </label>
              <select
                required
                className="form-control"
                name="input_Evaluacion"
                id="input_Evaluacion"
                placeholder="Seleccione la Evaluación + Proyectyo + Empleado"
                onChange={({ target }) => setidEDDEvalProyEmp(target.value)}
              >
                {listEDDEvalProyEmpleado.map((valor) => (
                  <option
                    selected={valor.idEDDEvalProyEmpleado === idEDDEvalProyEmpleado ? "selected" : ""}
                    value={valor.idEDDEvalProyEmpleado}
                  >
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
                {listEDDEvalPregunta.map((valor) => (
                  <option
                    selected={valor.idEDDEvalPregunta === idEDDEvalPregunta ? "selected" : ""}
                    value={valor.idEDDEvalPregunta}
                  >
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
                {listEDDEvalRespPreg.map((valor) => (
                  <option
                    selected={valor.idEDDEvalRespPreg === idEDDEvalRespPreg ? "selected" : ""}
                    value={valor.idEDDEvalRespPreg}
                  >
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

export default EditarEDDEvalProyEmp;
