import React, { useState,useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";

import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarClientes = ({ isActiveCliente, cambiarEstado, cliente }) => {
  // ----------------------CONSTANTES----------------------------
  const [nomCliente, setNomCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [idPais, setidPais] = useState("");

  const [listPais, setlistPais] = useState([""]);

  const listClientes = cliente;

  const show = isActiveCliente;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function obtenerPais() {
    const url = "pages/auxiliares/listadoPaisForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistPais(response));
  }

  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarCliente.php";
    const operationUrl = "insertarCliente";
    var data = {
      usuarioAdmin: userData.usuario,
      nomCliente: nomCliente,
      direccionCliente: direccionCliente,
      idPais: idPais,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...cliente } = response[0];
      TopAlerts(successCreated);
      actualizarCliente(cliente);
    });
  }

  function actualizarCliente(response) {
    listClientes.push(response);
  }

  useEffect(function () {
    obtenerPais();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_nombreDelCliente">Nombre:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del cliente"
                type="text"
                className="form-control"
                name="input_nombreDelCliente"
                id="input_nombreDelCliente"
                onChange={({ target }) => setNomCliente(target.value)}
                required
              />
            </div>

            <div>
            <label htmlFor="input_DirecciónDelCliente">Dirección:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del cliente"
                type="text"
                className="form-control"
                name="input_DirecciónDelCliente"
                id="input_DirecciónDelCliente"
                onChange={({ target }) => setDireccionCliente(target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_pais">País: </label>
              <select
                required
                className="form-control"
                name="input_pais"
                id="input_pais"
                placeholder="Seleccione el pais"
                onChange={({ target }) => setidPais(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listPais.map((valor) => (
                  <option value={valor.idPais}>{valor.nomPais}</option>
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
export default InsertarClientes;
