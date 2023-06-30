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
  const [idEDDProyecto, setidEDDProyecto] = useState("");

  const [listEDDEvaluacion, setlistEDDEvaluacion] = useState([""]);
  const [listEDDProyecto, setlistEDDProyecto] = useState([""]);

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const listEDDEvalProyEmp = EDDEvalProyEmp;

  const show = isActiveEditEDDEvalProyEmp;

  const handleClose = () => {
    cambiarEstado(false);
    setevalRespondida(responseID[0].evalRespondida);
    setfechaIni(responseID[0].fechaIni);
    setfechaFin(responseID[0].fechaFin);
    setidEDDEvaluacion(responseID[0].idEDDEvaluacion);
    setidEDDProyecto(responseID[0].idEDDProyecto);
  };

  // ----------------------FUNCIONES----------------------------
  function obtenerProyecto() {
    const url = "pages/auxiliares/listadoServicioForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistEDDProyecto(response)
    );
  }
  function obtenerEvaluacion() {
    const url = "pages/auxiliares/listadoServicioForms.php";
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
      setevalRespondida(response[0].evalRespondida);
      setfechaIni(response[0].fechaIni);
      setfechaFin(response[0].fechaFin);
      setidEDDEvaluacion(response[0].idEDDEvaluacion);
      setidEDDProyecto(response[0].idEDDProyecto);
    });
  }, [idEDDEvalProyEmp]);

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarEDDEvalProyEmp.php";
    var operationUrl = "editarEDDEvalProyEmp";
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
      idEDDProyecto:
        idEDDProyecto === "" ? responseID[0].idEDDProyecto : idEDDProyecto,

      isActive: true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      TopAlerts("successEdited");
      actualizarEDDEvalProyEmp(EDDEvalProyEmp);
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
        obtenerProyecto();
      }
    },
    [idEDDEvalProyEmp]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            {/* <div>
              <label htmlFor="input_nombreDelEDDEvalProyEmp">Nombre:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre Proyecto"
                type="text"
                className="form-control"
                name="input_nombreDelEDDEvalProyEmp"
                id="input_nombreDelEDDEvalProyEmp"
                value={nomProyecto || ""}
                maxLength="50"
                onChange={({ target }) => setnomProyecto(target.value)}
                required
              />
            </div> */}

            {/* <div>
              <label htmlFor="input_fechaI">Fecha inicio:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                type="date"
                className="form-control"
                name="input_fechaI"
                id="input_fechaI"
                value={fechaIni || ""}
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_fechaF">Fecha Fin:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                type="date"
                className="form-control"
                name="input_fechaF"
                id="input_fechaF"
                value={fechaFin || ""}
                onChange={({ target }) => setfechaFin(target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_serv">Servicio: </label>
              <select
                required
                className="form-control"
                name="input_serv"
                id="input_serv"
                placeholder="Seleccione el servicio"
                onChange={({ target }) => setidServicio(target.value)}
              >
                {listServicio.map((valor) => (
                  <option
                    selected={valor.idServicio === idServicio ? "selected" : ""}
                    value={valor.idServicio}
                  >
                    {valor.nomServicio}
                  </option>
                ))}
              </select>
            </div> */}

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
