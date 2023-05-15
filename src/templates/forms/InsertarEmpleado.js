import React, { useState } from "react";

import "../forms/InsertarRamo.css";
import SendDataService from "../../services/GetDataService";
import TopAlerts from "../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarEmpleado = ({ isActiveEmpleado, cambiarEstado, empleado }) => {
  // ----------------------CONSTANTES----------------------------
  const [nombreEmpleado, setNombreEmpleado] = useState("");
  const [correo, setCorreo] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [area, setArea] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUser, setTipoUser] = useState("");
  const [rolUser, setRolUser] = useState("");
  const [telefono, setTelefono] = useState("");

  const listEmpleado = empleado;

  const show = isActiveEmpleado;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "TASKS/coe-insertarEmpleados.php";
    const operationUrl = "insertarEmpleado";
    var data = {
      nombreEmpleado: nombreEmpleado,
        correo: correo,
        pais:pais,
        cargo: cargo,
        area: area,
        usuario: usuario,
        password: password,
        tipoUser: tipoUser,
        rolUser: rolUser,
        telefono: telefono,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...empleado } = response[0];
      TopAlerts(successCreated);
      actualizarEmpleados(empleado);
    });
  }

  function actualizarEmpleados(response) {
    listEmpleado.push(response);
  }

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Insertar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>

          <div>
              <label htmlFor="input_nombreDelEmpleado">Nombre del empleado:</label>
              <input
                placeholder="Escriba nombre completo del empleado"
                type="text"
                className="form-control"
                name="input_nombreEmpleado"
                id="input_nombreEmpleado"
                onChange={({ target }) => setNombreEmpleado(target.value)}
                required
              />
            </div>


            
          <div>
              <label htmlFor="input_Correo">Correo:</label>
              <input
                placeholder="Escriba el correo del empleado"
                type="text"
                className="form-control"
                name="input_correo"
                id="input_correo"
                onChange={({ target }) => setCorreo(target.value)}
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
              <label htmlFor="input_contraceña">Contraceña:</label>
              <input
                placeholder="Escriba la contraceña"
                type="text"
                className="form-control"
                name="input_contraceña"
                id="input_contraceña"
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_telefono">Teléfono (opcional): </label>
              
              <input
                placeholder="Escriba el teléfono"
                type="password"
                className="form-control"
                name="input_telefono"
                id="input_telefono"
                onChange={({ target }) => setTelefono(target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_pais">Pais: </label>
              <select
                required
                className="form-control"
                name="input_pais"
                id="input_pais"
                placeholder="Seleccione el pais"
                onChange={({ target }) => setPais(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
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
                onChange={({ target }) => setCargo(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
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
                onChange={({ target }) => setArea(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
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
                onChange={({ target }) => setTipoUser(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
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
                onChange={({ target }) => setRolUser(target.value)}
              >
                <option hidden value="">Desplegar lista</option>
                <option value="interno">Interno</option>
                <option value="externo">Externo</option>
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
