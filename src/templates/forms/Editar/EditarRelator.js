import React, { useState, useEffect } from "react";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";
import "../../../templates/forms/Insertar.css";


const EditarRelator = ({ isActiveEditRelator, cambiarEstado, idRelator }) => {
  const [responseID, setResponseID] = useState([""]);
  const [empleado, setEmpleado] = useState("");
  const [ramo, setRamo] = useState("");
  const [listEmpleado, setlistEmpleado] = useState([]);
  const [listRamos, setlistRamos] = useState([]);

  const show = isActiveEditRelator;

  
  const handleClose = () => {
    cambiarEstado(false);
    setEmpleado(responseID[0].empleado);
    setRamo(responseID[0].ramo);
  };


  function obtenerRamos() {
    const url = "pages/auxiliares/listadoRamosForms.php";
    const operationUrl = "listados";
    getDataService(url).then((response) => setlistRamos(response));
  }
  
  function obtenerEmpleados() {
    const url = "pages/auxiliares/listadoEmpleadosForms.php";
    const operationUrl = "listados";
    getDataService(url).then((response) => setlistEmpleado(response));
  }


  function getData() {
    const url = "TASKS/coe-selectRelatores.php";
    const operationUrl = "ID";
    const data = { idRelator: idRelator };
    SendDataService(url, operationUrl, data).then((response) => {
      setResponseID(response);
      setEmpleado(response[0].empleado);
      setRamo(response[0].ramo);
    });
  }

  function SendData(e) {
    // e.preventDefault();
    const url = "TASKS/coe-editRelatores.php";
    const operationUrl = "editarRelatores";
    var data = {
      ID: idRelator,
      empleado: empleado === "" ? responseID[0].empleado : empleado,
      ramo: ramo === "" ? responseID[0].ramo : ramo,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(
    function () {
      if (idRelator !== null) {
        getData();
        obtenerRamos();
        obtenerEmpleados();
      }
    },
    [idRelator]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Relator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            
          <div className="form-group">
              <label htmlFor="input_pais">Empleado: </label>
              <select
                value={empleado || ""}
                required
                className="form-control"
                name="input_pais"
                id="input_pais"
                placeholder="Seleccione el empleado"
                onChange={({ target }) => setEmpleado(target.value)}
              >
                <option hidden value="">
                  {empleado}
                </option>
                {listEmpleado.map((valor) => (
                  <option value={valor.empleado}>{valor.empleado}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="input_pais">Ramo: </label>
              <select
                value={ramo || ""}
                required
                className="form-control"
                name="input_pais"
                id="input_pais"
                placeholder="Seleccione el ramo"
                onChange={({ target }) => setidPais(target.value)}
              >
                <option hidden value="">
                  {ramo}
                </option>
                {listRamos.map((valor) => (
                  <option value={valor.ramo}>{valor.ramo}</option>
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
export default EditarRelator;