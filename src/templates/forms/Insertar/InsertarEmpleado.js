import React, { useState, useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarEmpleado = ({ isActiveEmpleado, cambiarEstado, empleado }) => {
  // ----------------------CONSTANTES----------------------------
  const [nomEmpleado, setNomEmpleado] = useState("");
  const [correoEmpleado, setcorreoEmpleado] = useState("");
  const [idPais, setidPais] = useState("");
  const [idCargo, setidCargo] = useState("");
  const [idArea, setidArea] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, settipoUsuario] = useState("");
  const [nomRol, setnomRol] = useState("");
  const [telefonoEmpleado, settelefonoEmpleado] = useState("");

  const [listPais, setlistPais] = useState([""]);
  const [listCargo, setlistCargo] = useState([""]);
  const [listArea, setlistArea] = useState([""]);
  const [listNomRol, setlistNomRol] = useState([""]);

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const listEmpleado = empleado;

  const show = isActiveEmpleado;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function obtenerPais() {
    const url = "pages/auxiliares/listadoPaisForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistPais(response)
    );
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
    getDataService(url, operationUrl).then((response) =>
    setlistArea(response)
    );
  }
  function obtenerNomRol() {
    const url = "pages/auxiliares/listadoRolForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistNomRol(response)
    );
  }

  function SendData(e) {
    // e.preventDefault();
    const url = "pages/insertar/insertarEmpleado.php";
    const operationUrl = "insertarEmpleado";
    var data = {
      usuarioAdmin: userData.usuario,
      nomEmpleado: nomEmpleado,
      correoEmpleado: correoEmpleado,
      idPais: idPais,
      idCargo: idCargo,
      idArea: idArea,
      usuario: usuario,
      password: password,
      tipoUsuario: tipoUsuario,
      nomRol: nomRol,
      telefonoEmpleado: telefonoEmpleado,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...empleado } = response[0];
      TopAlerts(successCreated);
      actualizarEmpleados(empleado);

    });
  }

  function actualizarEmpleados(response) {
    listEmpleado.push(response);
  }

  useEffect(function () {
    obtenerPais();
    obtenerCargo();
    obtenerArea();
    obtenerNomRol();

  }, []);
 
  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreDelEmpleado">
                Nombre:
              </label>
              <input
                style={{textTransform:"uppercase"}}
                placeholder="Escriba nombre completo del empleado"
                type="text"
                className="form-control"
                name="input_nombreEmpleado"
                id="input_nombreEmpleado"
                maxLength='50'
                // size='5'
                onChange={({ target }) => setNomEmpleado(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_Correo">Correo:</label>
              <input
                placeholder="Escriba el correo del empleado"
                type="email"
                className="form-control"
                name="input_correo"
                id="input_correo"
                onChange={({ target }) => setcorreoEmpleado(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_Usuario">Usuario:</label>
              <input
                placeholder="Escriba el correo del usuario a loguear"
                type="text"
                className="form-control"
                name="input_Usuario"
                id="input_Usuario"
                onChange={({ target }) => setUsuario(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_contraseña">Contraseña:</label>
              <input
                placeholder="Escriba la contraseña"
                type="password"
                className="form-control"
                name="input_contraseña"
                id="input_contraseña"
                onChange={({ target }) => setPassword(target.value)}
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
                onChange={({ target }) => settelefonoEmpleado(target.value)}
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
                <option hidden value="">
                  Desplegar lista
                </option>
                {listCargo.map((valor) => (
                  <option value={valor.idCargo}>{valor.nomCargo}</option>
                ))}
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
                <option hidden value="">
                  Desplegar lista
                </option>
                {listArea.map((valor) => (
                  <option value={valor.idArea}>{valor.nomArea}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_TipoDeUsuario">Tipo de usuario: </label>
              <select
                required
                className="form-control"
                name="input_TipoDeUsuario"
                id="input_TipoDeUsuario"
                placeholder="Seleccione el tipo de usuario"
                onChange={({ target }) => settipoUsuario(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>
                <option value="empleado">Empleado</option>
                <option value="alumno">Alumno</option>
                <option value="people">People</option>
                <option value="adminstrador">Adminstrador</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input_RolUsuario">Rol de usuario: </label>
              <select
                required
                className="form-control"
                name="input_RolUsuario"
                id="input_RolUsuario"
                placeholder="Seleccione el rol de usuario"
                onChange={({ target }) => setnomRol(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listNomRol.map((valor) => (
                  <option value={valor.idRolUsuario}>{valor.nomRol}</option>
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
export default InsertarEmpleado;
