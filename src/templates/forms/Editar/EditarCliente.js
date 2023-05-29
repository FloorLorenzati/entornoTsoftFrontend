import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarClientes = ({
  isActiveEditCliente,
  cambiarEstado,
  idCliente,
  cliente,
  setCliente,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nomCliente, setNomCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [idPais, setidPais] = useState("");

  const [listPais, setlistPais] = useState([""]);

  const [responseID, setResponseID] = useState([""]);
  const listClientes = cliente;

  const show = isActiveEditCliente;

  const handleClose = () => {
    cambiarEstado(false);
    setNomCliente(responseID[0].cargoReferente);
    setDireccionCliente(responseID[0].tipo_cliente);
    setidPais(responseID[0].nombreCliente);
  };

  // ----------------------FUNCIONES----------------------------
  function obtenerPais() {
    const url = "pages/auxiliares/listadoPaisForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistPais(response));
  }

  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idCliente, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setNomCliente(response[0].nomCliente);
      setDireccionCliente(response[0].direccionCliente);
      setidPais(response[0].nomPais);
    });
  }, [idCliente]);

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarCliente.php";
    var operationUrl = "editarCliente";
    var data = {
      usuarioModificacion: userData.usuario,
      idCliente: idCliente,
      nomCliente: nomCliente === "" ? responseID[0].nomCliente : nomCliente,

      direccionCliente: direccionCliente === "" ? responseID[0].direccionCliente : direccionCliente,

      idPais: idPais === "" ? responseID[0].idPais : idPais,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...cliente } = response[0];
      TopAlerts(successEdited);
      actualizarCliente(cliente);
    });

    function actualizarCliente(cliente) {
      const nuevosClientes = listClientes.map((c) =>
        c.idCliente === cliente.idCliente ? cliente : c
      );
      setCliente(nuevosClientes);
    }
  }

  useEffect(
    function () {
      if (idCliente !== null) {
        getData();
        obtenerPais();
      }
    },
    [idCliente]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_nombreDelCliente">Nombre:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del cliente"
                value={nomCliente || ""}
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
                value={direccionCliente || ""}
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
                value={idPais || ""}
                required
                className="form-control"
                name="input_pais"
                id="input_pais"
                placeholder="Seleccione el pais"
                onChange={({ target }) => setidPais(target.value)}
              >
                <option selected hidden value="">
                  {idPais}
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

export default EditarClientes;
