import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarRamoExamen = ({
  isActiveEditRamoExamen,
  cambiarEstado,
  idRamoExamen,
  ramoExamen,
  setRamoExamen,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nomExamen, setnomExamen] = useState("");
  const [fechaExamen, setfechaExamen] = useState("");
  const [idRamo, setidRamo] = useState("");

  const [listRamo, setlistRamo] = useState([""]);

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [responseID, setResponseID] = useState([""]);
  const listRamoExamen = ramoExamen;

  const show = isActiveEditRamoExamen;

  const handleClose = () => {
    cambiarEstado(false);
    setnomExamen(responseID[0].nomExamen);
    setfechaExamen(responseID[0].fechaExamen);
    setidRamo(responseID[0].idRamo);
  };

  function obtenerRamo() {
    const url = "pages/auxiliares/listadoRamoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistRamo(response));
  }

  // ----------------------FUNCIONES----------------------------
  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idRamoExamen, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setnomExamen(response[0].nomExamen);
      setfechaExamen(response[0].fechaExamen);
      setidRamo(response[0].nomRamo);
    });
  }, [idRamoExamen]);

  function SendData(e) {
    e.preventDefault();
    const url = "pages/editar/editarRamoExamen.php";
    const operationUrl = "editarRamoExamen";

    var data = {
      usuarioModificacion: userData.usuario,
      idRamoExamen: idRamoExamen,
      nomExamen: nomExamen === "" ? responseID[0].nomExamen : nomExamen,
      fechaExamen: fechaExamen === "" ? responseID[0].fechaExamen : fechaExamen,
      idRamo: idRamo === "" ? responseID[0].idRamo : idRamo,

    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...ramoExamen } = response[0];
      TopAlerts(successEdited);
      {actualizarRamoExamen(ramoExamen);console.log(data);};
    });

    function actualizarRamoExamen(ramoExamen) {
      const nuevosRamoExamen = listRamoExamen.map((c) =>
        c.idRamoExamen === ramoExamen.idRamoExamen ? ramoExamen : c
      );
      setRamoExamen(nuevosRamoExamen);
    }
  }

  useEffect(
    function () {
      if (idRamoExamen !== null) {
        getData();
        obtenerRamo();
      }
    },
    [idRamoExamen]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ramo Examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreDelRamoExamen">Nombre examen:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre del examen"
                value={nomExamen || ""}
                type="text"
                className="form-control"
                name="input_nombreDelRamoExamen"
                id="input_nombreDelRamoExamen"
                onChange={({ target }) => setnomExamen(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_fechaI">Fecha examen:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                value={fechaExamen || ""}
                type="date"
                className="form-control"
                name="input_fechaI"
                id="input_fechaI"
                onChange={({ target }) => setfechaExamen(target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="input_Pais">Nombre del ramo:</label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidServicio(target.value)}
              >
                {listRamo.map((valor) => (
                  <option
                    selected={valor.idRamo === idRamo ? "selected" : ""}
                    value={valor.idRamo}
                  >
                    {valor.nomRamo}
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

export default EditarRamoExamen;
