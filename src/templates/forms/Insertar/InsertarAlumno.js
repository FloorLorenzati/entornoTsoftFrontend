import React, { useState, useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarAlumno = ({ isActiveAlumno, cambiarEstado, alumno }) => {
  // ----------------------CONSTANTES----------------------------
  const [nomAlumno, setnomAlumno] = useState("");
  const [correoAlumno, setcorreoAlumno] = useState("");
  const [telefonoAlumno, settelefonoAlumno] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, settipoUsuario] = useState("");
  const [nomRol, setnomRol] = useState("");


  const [idServicio, setidServicio] = useState("");
  const [idPais, setidPais] = useState("");
  const [idArea, setidArea] = useState("");
  const [idCargo, setidCargo] = useState("");

  const [listServicio, setlistServicio] = useState([""]);
  const [listPais, setlistPais] = useState([""]);
  const [listCargo, setlistCargo] = useState([""]);
  const [listArea, setlistArea] = useState([""]);

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const listAlumno = alumno;

  const show = isActiveAlumno;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function obtenerPais() {
    const url = "pages/auxiliares/listadoPaisForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistPais(response));
  }
  function obtenerCargo() {
    const url = "pages/auxiliares/listadoCargoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistCargo(response)
    );
  }
  function obtenerArea() {
    const url = "pages/auxiliares/listadoAreaForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistArea(response));
  }

  function obtenerServicio() {
    const url = "pages/auxiliares/listadoServicioForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistServicio(response));
  }

  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarAlumno.php";
    const operationUrl = "insertarAlumno";
    var data = {
      usuarioCreacion: userData.usuario,
      nomAlumno: nomAlumno,
      correoAlumno: correoAlumno,
      telefonoAlumno: telefonoAlumno,
      usuario: usuario,
      password: password,
      tipoUsuario: tipoUsuario,
      nomRol: nomRol,

      idServicio:idServicio,
      idPais: idPais,
      idCargo: idCargo,
      idArea: idArea,

    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...alumno } = response[0];
      TopAlerts(successCreated);
      actualizarAlumno(alumno);
    });
  }

  function actualizarAlumno(response) {
    listAlumno.push(response);
  }

  useEffect(function () {
    obtenerPais();
    obtenerCargo();
    obtenerArea();
    obtenerServicio();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_nombreDelAlumno">Nombre:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del alumno"
                type="text"
                className="form-control"
                name="input_nombreDelAlumno"
                id="input_nombreDelAlumno"
                maxLength="50"
                onChange={({ target }) => setnomAlumno(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_Correo">Correo:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba el correo del alumno"
                type="email"
                className="form-control"
                name="input_correo"
                id="input_correo"
                maxLength="100"
                onChange={({ target }) => setcorreoAlumno(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_telefono">Teléfono (opcional): </label>

              <input
                placeholder="Escriba el teléfono"
                type="tel"
                className="form-control"
                name="input_telefono"
                id="input_telefono"
                maxLength="15"
                onChange={({ target }) => settelefonoAlumno(target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_Servicio">Servicio: </label>
              <select
                required
                className="form-control"
                name="input_Servicio"
                id="input_Servicio"
                placeholder="Seleccione el ervicio"
                onChange={({ target }) => setidServicio(target.value)}
              >
                <option selected hidden value="">
                Desplegar lista

                </option>
                {listServicio.map((valor) => (
                  <option value={valor.idServicio}>{valor.nomServicio}</option>
                ))}
              </select>
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
                <option selected hidden value="">
                Desplegar lista

                </option>
                {listPais.map((valor) => (
                  <option value={valor.idPais}>{valor.nomPais}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_Cargo">Cargo: </label>
              <select
                required
                className="form-control"
                name="input_Cargo"
                id="input_Cargo"
                placeholder="Seleccione el cargo"
                onChange={({ target }) => setidCargo(target.value)}
              >
                <option selected hidden value="">
                  Desplegar lista
                </option>
                {listCargo.map((valor) => (
                  <option value={valor.idCargo}>{valor.nomCargo}</option>
                ))}
                idArea
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_Area">Área: </label>
              <select
                required
                className="form-control"
                name="input_Area"
                id="input_Area"
                placeholder="Seleccione el área"
                onChange={({ target }) => setidArea(target.value)}
              >
                <option selected hidden value="">
                Desplegar lista

                </option>
                {listArea.map((valor) => (
                  <option value={valor.idArea}>{valor.nomArea}</option>
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
export default InsertarAlumno;
