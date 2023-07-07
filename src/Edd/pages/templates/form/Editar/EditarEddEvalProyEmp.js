import React, { useState, useEffect } from "react";
import "../Insertar/Insertar.css";
import SendDataService from "../../../../../services/SendDataService";
import getDataService from "../../../../../services/GetDataService";
import TopAlerts from "../../../../../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarEddEvalProyEmp = ({
  isActiveEditEDDEvalProyEmp,
  cambiarEstado,
  idEDDEvalProyEmp,
  EDDEvalProyEmp,
  setEDDEvalProyEmp,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  
  const [evalRespondida, setevalRespondida] = useState("");
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");

  const [idEDDEvaluacion, setidEDDEvaluacion] = useState("");
  const [idEDDProyEmp, setidEDDProyEmp] = useState("");

  const [listEDDEvaluacion, setlistEDDEvaluacion] = useState([""]);
  const [listEDDProyectoEmpleado, setlistEDDProyectoEmpleado] = useState([""]);

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const listEDDEvalProyEmp = EDDEvalProyEmp;

  const show = isActiveEditEDDEvalProyEmp;

  const handleClose = () => {
    cambiarEstado(false);
    setfechaIni(responseID[0].fechaIni);
    setfechaFin(responseID[0].fechaFin);
    setidEDDEvaluacion(responseID[0].idEDDEvaluacion);
    setidEDDProyEmp(responseID[0].idEDDProyEmp);
    setevalRespondida(responseID[0].evalRespondida);

  };

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

  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idEDDEvalProyEmp, nombreTabla: nombreTabla };
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);

      setfechaIni(response[0].fechaIni);
      setfechaFin(response[0].fechaFin);
      setidEDDEvaluacion(response[0].idEDDEvaluacion);
      setidEDDProyEmp(response[0].idEDDProyEmp);
      setevalRespondida(response[0].evalRespondida);
    });
  }, [idEDDEvalProyEmp]);

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarEddEvalProyEmp.php";
    var operationUrl = "editarEddEvalProyEmp";
    var data = {
      usuarioModificacion: userData.usuario,
      idEDDEvalProyEmp: idEDDEvalProyEmp,
      evalRespondida:
        evalRespondida === "" ? responseID[0].evalRespondida : evalRespondida,
      fechaIni: fechaIni === "" ? responseID[0].fechaIni : fechaIni,
      fechaFin: fechaFin === "" ? responseID[0].fechaFin : fechaFin,
      idEDDEvaluacion:
        idEDDEvaluacion === ""
          ? responseID[0].idEDDEvaluacion
          : idEDDEvaluacion,
          idEDDProyEmp:
          idEDDProyEmp === "" ? responseID[0].idEDDProyEmp : idEDDProyEmp,

      isActive: true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      // TopAlerts("successEdited");
      actualizarEDDEvalProyEmp(EDDEvalProyEmp);console.log(response);
    });

    function actualizarEDDEvalProyEmp(EDDEvalProyEmp) {
      const nuevosEDDEvalProyEmp = listEDDEvalProyEmp.map((c) =>
        c.idEDDEvalProyEmp === EDDEvalProyEmp.idEDDEvalProyEmp
          ? EDDEvalProyEmp
          : c
      );
      setEDDEvalProyEmp(nuevosEDDEvalProyEmp);
    }
  }

  useEffect(
    function () {
      if (idEDDEvalProyEmp !== null) {
        getData();
        obtenerEvaluacion();
        obtenerProyectoEmpleado();
      }
    },
    [idEDDEvalProyEmp]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
        <Modal.Title>Editar evaluación al <br></br>proyecto - empleado</Modal.Title>
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
            <div className="form-group">
              <label htmlFor="input_proyemp">Proyecto - Empleado: </label>
              <select
                required
                className="form-control"
                name="input_proyemp"
                id="input_proyemp"
                placeholder="Seleccione la Proyecto + Empleado"
                onChange={({ target }) => setidEDDProyEmp(target.value)}
              >
                {listEDDProyectoEmpleado.map((valor) => (
                  <option
                    selected={valor.idEDDProyEmp === idEDDProyEmp ? "selected" : ""}
                    value={valor.idEDDProyEmp}
                  >
                    {valor.nomProyEmp}
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

export default EditarEddEvalProyEmp;
