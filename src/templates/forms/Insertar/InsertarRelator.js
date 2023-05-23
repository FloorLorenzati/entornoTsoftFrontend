import React, { useEffect, useState } from "react";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getDataService from "../../../services/GetDataService";

const InsertarRelator = ({ isActiveRelator, cambiarEstado }) => {
  const [empleado, setEmpleado] = useState("");
  const [ramo, setRamo] = useState("");
  const [listEmpleado, setlistEmpleado] = useState([]);
  const [listRamos, setlistRamos] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const show = isActiveRelator;

  const handleClose = () => cambiarEstado(false);

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


  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarRelator.php";
    const operationUrl = "insertarRelator";
    var data = {
      empleado: empleado,
      ramo: ramo,
    };
    SendDataService(url, operationUrl, data).then((response) =>
      TopAlerts(response)
    );
  }
  useEffect(function () {
    obtenerRamos();
    obtenerEmpleados();
}, []);
  // ----------------------MAPEADOS----------------------------

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Relator</Modal.Title>
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
                  Desplegar lista
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
                  Desplegar lista
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
export default InsertarRelator;
