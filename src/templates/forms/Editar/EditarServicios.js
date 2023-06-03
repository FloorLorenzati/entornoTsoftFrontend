import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarServicio = ({
  isActiveEditServicio,
  cambiarEstado,
  idServicio,
  servicio,
  setServicio,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nomServicio, setnomServicio] = useState("");
  const [idCliente, setidCliente] = useState("");

  
  const [listCliente, setlistCliente] = useState([""]);


  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [responseID, setResponseID] = useState([""]);
  const listServicio = servicio;

  const show = isActiveEditServicio;

  const handleClose = () => {
    cambiarEstado(false);
    setnomServicio(responseID[0].nomServicio);
    setidCliente(responseID[0].idCliente);
  };
  // ----------------------FUNCIONES----------------------------
  function obtenerCliente() {
    const url = "pages/auxiliares/listadoClienteForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistCliente(response));
  }

  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idServicio, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setnomServicio(response[0].nomServicio);
      setidCliente(response[0].idCliente);
    });
  }, [idServicio]);

  function SendData(e) {
    e.preventDefault();
    const url = "pages/editar/editarServicio.php";
    const operationUrl = "editarServicio";

    var data = {
      usuarioModificacion: userData.usuario,
      idServicio: idServicio,
      nomServicio: nomServicio === "" ? responseID[0].nomServicio : nomServicio,
      idCliente: idCliente === "" ? responseID[0].idCliente : idCliente,

    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...servicio } = response[0];
      TopAlerts(successEdited);
      {actualizarServicio(servicio);console.log(data);};
    });

    function actualizarServicio(servicio) {
      const nuevosServicio = listServicio.map((c) =>
        c.idServicio === servicio.idServicio ? servicio : c
      );
      setServicio(nuevosServicio);
    }
  }

  useEffect(
    function () {
      if (idServicio !== null) {
        getData();
        obtenerCliente();
      }
    },
    [idServicio]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_nombreDelservicio">Servicio:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre del servicio"
                type="text"
                className="form-control"
                name="input_nombreDelServicio"
                id="input_nombreDelServicio"
                maxLength="50"
                onChange={({ target }) => setnomServicio(target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="input_Pais">Cliente:</label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidCliente(target.value)}
              >
                {listCliente.map((valor) => (
                  <option
                    selected={valor.idCliente === idCliente ? "selected" : ""}
                    value={valor.idCliente}
                  >
                    {valor.nomCliente}
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

export default EditarServicio;
