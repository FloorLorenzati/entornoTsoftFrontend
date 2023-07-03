import React, { useState, useEffect } from "react";
import "../Insertar/Insertar.css";
import SendDataService from "../../../../../services/SendDataService";
import getDataService from "../../../../../services/GetDataService";
import TopAlerts from "../../../../../templates/alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarEDDEvaluacion = ({
  isActiveEditEDDEvaluacion,
  cambiarEstado,
  idEDDEvaluacion,
  EDDEvaluacion,
  setEDDEvaluacion,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nomEvaluacion, setnomEvaluacion] = useState("");
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");
  const [tipoEvaluacion, settipoEvaluacion] = useState("");

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const listEDDEvaluacion = EDDEvaluacion;

  const show = isActiveEditEDDEvaluacion;

  const handleClose = () => {
    cambiarEstado(false);
    setfechaIni(responseID[0].fechaIni);
    setfechaFin(responseID[0].fechaFin);
    settipoEvaluacion(responseID[0].tipoEvaluacion);
    setnomEvaluacion(responseID[0].nomEvaluacion);

  };

  // ----------------------FUNCIONES----------------------------
  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idEDDEvaluacion, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);

      settipoEvaluacion(response[0].tipoEvaluacion);
      setfechaIni(response[0].fechaIni);
      setfechaFin(response[0].fechaFin);
      setnomEvaluacion(response[0].nomEvaluacion);



    });
  }, [idEDDEvaluacion]);

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarEddEvaluacion.php";
    var operationUrl = "editarEddEvaluacion";
    var data = {
      usuarioModificacion: userData.usuario,
      idEDDEvaluacion: idEDDEvaluacion,
      nomEvaluacion: nomEvaluacion === "" ? responseID[0].nomEvaluacion : nomEvaluacion,
      tipoEvaluacion: tipoEvaluacion === "" ? responseID[0].tipoEvaluacion : tipoEvaluacion,
      fechaIni: fechaIni === "" ? responseID[0].fechaIni : fechaIni,
      fechaFin: fechaFin === "" ? responseID[0].fechaFin : fechaFin,
      isActive:true,
    };
console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      // TopAlerts('successEdited');
      actualizarEDDEvaluacion(EDDEvaluacion);console.log(response);
    });

    function actualizarEDDEvaluacion(EDDEvaluacion) {
      const nuevosEDDEvaluacion = listEDDEvaluacion.map((c) =>
        c.idEDDEvaluacion === EDDEvaluacion.idEDDEvaluacion ? EDDEvaluacion : c
      );
      setEDDEvaluacion(nuevosEDDEvaluacion);
    }
  }

  useEffect(
    function () {
      if (idEDDEvaluacion !== null) {
        getData();
      }
    },
    [idEDDEvaluacion]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Evaluación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_nombreDelEDDEvaluacion">Nombre:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre Proyecto"
                type="text"
                className="form-control"
                name="input_nombreDelEDDEvaluacion"
                id="input_nombreDelEDDEvaluacion"
                value={nomEvaluacion || ""}
                maxLength="50"
                onChange={({ target }) => setnomEvaluacion(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_nombreDelEDDEvaluacion">TipEval:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre Proyecto"
                type="text"
                className="form-control"
                name="input_nombreDelEDDEvaluacion"
                id="input_nombreDelEDDEvaluacion"
                value={tipoEvaluacion || ""}
                maxLength="15"
                onChange={({ target }) => settipoEvaluacion(target.value)}
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
                type="datetime-local"
                className="form-control"
                name="input_fechaF"
                id="input_fechaF"
                value={fechaFin || ""}
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

export default EditarEDDEvaluacion;
