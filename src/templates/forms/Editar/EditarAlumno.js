import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarAlumno = ({
  isActiveEditAlumno,
  cambiarEstado,
  idAlumno,
  alumno,
  setAlumno,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, settipoUsuario] = useState("");
  const [nomRol, setnomRol] = useState("");
  const [nomAlumno, setnomAlumno] = useState("");
  const [correoAlumno, setcorreoAlumno] = useState("");
  const [telefonoAlumno, settelefonoAlumno] = useState("");

  const [idServicio, setidServicio] = useState("");
  const [idPais, setidPais] = useState("");
  const [idArea, setidArea] = useState("");
  const [idCargo, setidCargo] = useState("");

  const [listPais, setlistPais] = useState([""]);
  const [listCargo, setlistCargo] = useState([""]);
  const [listArea, setlistArea] = useState([""]);
  const [listServicio, setlistServicio] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [responseID, setResponseID] = useState([""]);
  const listAlumno = alumno;

  const show = isActiveEditAlumno;

  const handleClose = () => {
    cambiarEstado(false);
    setnomAlumno(responseID[0].nomAlumno);
    setcorreoAlumno(responseID[0].correoAlumno);
    settelefonoAlumno(responseID[0].telefonoAlumno);
    setidServicio(responseID[0].idServicio);
    setidPais(responseID[0].idPais);
    setidArea(responseID[0].idArea);
    setidCargo(responseID[0].idCargo);
  };

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
    getDataService(url, operationUrl).then((response) =>
      setlistServicio(response)
    );
  }

  // ----------------------FUNCIONES----------------------------

  const getData = () => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idAlumno, nombreTabla: nombreTabla };
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setnomAlumno(response[0].nomAlumno);
      setcorreoAlumno(response[0].correoAlumno);
      settelefonoAlumno(response[0].telefonoAlumno);

      setidServicio(response[0].nomServicio);
      setidArea(response[0].nomArea);
      setidPais(response[0].nomPais);
      setidCargo(response[0].nomCargo);
    });
  };

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarAlumno.php";
    var operationUrl = "editarAlumno";
    var data = {
      usuarioModificacion: userData.usuario,
      idAlumno: idAlumno,
      nomAlumno: nomAlumno === "" ? responseID[0].nomAlumno : nomAlumno,
      correoAlumno:
        correoAlumno === "" ? responseID[0].correoAlumno : correoAlumno,
      telefonoAlumno:
        telefonoAlumno === "" ? responseID[0].telefonoAlumno : telefonoAlumno,
      usuario: usuario === "" ? responseID[0].usuario : usuario,
      password: password === "" ? responseID[0].password : password,
      tipoUsuario: tipoUsuario === "" ? responseID[0].tipoUsuario : tipoUsuario,
      nomRol: nomRol === "" ? responseID[0].nomRol : nomRol,

      idServicio: idServicio === "" ? responseID[0].idServicio : idServicio,
      idPais: idPais === "" ? responseID[0].idPais : idPais,
      idArea: idArea === "" ? responseID[0].idArea : idArea,
      idCargo: idCargo === "" ? responseID[0].idCargo : idCargo,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...alumno } = response[0];
      TopAlerts(successEdited);
      actualizarAlumno(alumno);
    });

    function actualizarAlumno(alumno) {
      const nuevosAlumno = listAlumno.map((a) =>
        a.idAlumno === alumno.idAlumno ? alumno : a
      );
      setAlumno(nuevosAlumno);
    }
  }

  useEffect(
    function () {
      if (idAlumno !== null) {
        getData();
        obtenerPais();
        obtenerArea();
        obtenerCargo();
        obtenerServicio();
      }
    },
    [idAlumno]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreDelAlumno">Nombre:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del alumno"
                value={nomAlumno || ""}
                type="text"
                className="form-control"
                name="input_nombreDelAlumno"
                id="input_nombreDelAlumno"
                onChange={({ target }) => setnomAlumno(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_Correo">Correo:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba el correo del alumno"
                value={correoAlumno || ""}
                type="email"
                className="form-control"
                name="input_correo"
                id="input_correo"
                onChange={({ target }) => setcorreoAlumno(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_telefono">Teléfono (opcional): </label>

              <input
                placeholder="Escriba el teléfono"
                value={telefonoAlumno || ""}
                type="tel"
                className="form-control"
                name="input_telefono"
                id="input_telefono"
                onChange={({ target }) => settelefonoAlumno(target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="input_Servicio">Servicio: </label>
              <select
                required
                value={idServicio || ""}
                className="form-control"
                name="input_Servicio"
                id="input_Servicio"
                placeholder="Seleccione el ervicio"
                onChange={({ target }) => setidServicio(target.value)}
              >
                <option selected hidden value="">
                  {idServicio}
                </option>
                {listServicio.map((valor) => (
                  <option value={valor.idServicio}>{valor.nomServicio}</option>
                ))}
              </select>
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
                value={idCargo || ""}
                className="form-control"
                name="input_Cargo"
                id="input_Cargo"
                placeholder="Seleccione el cargo"
                onChange={({ target }) => setidCargo(target.value)}
              >
                <option selected hidden value="">
                  {idCargo}
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
                value={idArea || ""}
                className="form-control"
                name="input_Area"
                id="input_Area"
                placeholder="Seleccione el área"
                onChange={({ target }) => setidArea(target.value)}
              >
                <option selected hidden value="">
                  {idArea}
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

export default EditarAlumno;
