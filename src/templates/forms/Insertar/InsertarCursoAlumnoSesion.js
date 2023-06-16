import React, { useState, useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";

import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarCursoAlumnoSesion = ({
  isActiveCursoAlumnoSesion,
  cambiarEstado,
  cursoAlumnoSesion,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");
  const [asistencia, setasistencia] = useState("");
  const [participacion, setparticipacion] = useState("");

  const [idSesion, setidSesion] = useState("");
  const [idCursoAlumno, setidCursoAlumno] = useState("");

  const [listSesion, setlistSesion] = useState([""]);
  const [listCursoAlumno, setlistCursoAlumno] = useState([""]);

  const listCursoAlumnoSesion = cursoAlumnoSesion;

  const show = isActiveCursoAlumnoSesion;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------
  function obtenerSesion() {
    const url = "pages/auxiliares/listadoSesionForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>{
      setlistSesion(response)
      console.log(response);}
    );
  }
  function obtenerCursoAlumno() {
    const url = "pages/auxiliares/listadoCursoAlumnoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistCursoAlumno(response)
    );
  }
  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarCursoAlumnoSesion.php";
    const operationUrl = "insertarCursoAlumnoSesion";
    var data = {
      usuarioCreacion: userData.usuario,
      fechaIni: fechaIni,
      fechaFin: fechaFin,
      asistencia: asistencia,
      participacion: participacion,
      idSesion: idSesion,
      idCursoAlumno: idCursoAlumno,
      isActive: true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...cursoAlumnoSesion } = response[0];
      TopAlerts(successCreated);
      actualizarCursoAlumnoSesion(cursoAlumnoSesion);console.log(response);
    });
  }

  function actualizarCursoAlumnoSesion(response) {
    listCursoAlumnoSesion.push(response);
  }
  useEffect(function () {
    obtenerCursoAlumno();
    obtenerSesion();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Curso Alumno Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_fechaI">Fecha inicio:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                type="date"
                className="form-control"
                name="input_fechaI"
                id="input_fechaI"
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_fechaI">Fecha Fin:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                type="date"
                className="form-control"
                name="input_fechaI"
                id="input_fechaI"
                onChange={({ target }) => setfechaFin(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcA">Asistencia :</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje asistencia"
                type="number"
                className="form-control"
                name="input_PorcA"
                id="input_PorcA"
                maxLength="11"
                onChange={({ target }) => setasistencia(target.value)}
                
              />
            </div>
            <div>
              <label htmlFor="input_PorcP">Participación :</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje participación"
                type="number"
                className="form-control"
                name="input_PorcP"
                id="input_PorcP"
                maxLength="11"
                onChange={({ target }) => setparticipacion(target.value)}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="input_sesion">Sesión: </label>
              <select
                required
                className="form-control"
                name="input_sesion"
                id="input_sesion"
                placeholder="Seleccione la sesion"
                onChange={({ target }) => setidSesion(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>
                {listSesion.map((valor) => (
                  <option value={valor.idSesion}>{valor.nomSesion}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="input_alumno">Curso Alumno: </label>
              <select
                required
                className="form-control"
                name="input_alumno"
                id="input_alumno"
                placeholder="Seleccione el ervicio"
                onChange={({ target }) => setidCursoAlumno(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>
                {listCursoAlumno.map((valor) => (
                  <option value={valor.idCursoAlumno}>{valor.idCursoAlumno}</option>
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
export default InsertarCursoAlumnoSesion;
