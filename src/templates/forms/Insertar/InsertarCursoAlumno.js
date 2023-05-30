import React, { useState,useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";

import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarCursoAlumno = ({ isActiveCursoAlumno, cambiarEstado, cursoAlumno }) => {
  // ----------------------CONSTANTES----------------------------
  const [nomAlumno, setnomAlumno] = useState("");
  const [nomCurso, setnomCurso] = useState("");
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");
  const [horaIni, sethoraIni] = useState("");
  const [horaFin, sethoraFin] = useState("");
  const [porcAsistencia, setporcAsistencia] = useState("");
  const [porcParticipacion, setporcParticipacion] = useState("");
  const [claseAprobada, setclaseAprobada] = useState("");
  const [porcAprobacion, setporcAprobacion] = useState("");
  const [estadoCurso, setestadoCurso] = useState("");

  const listCursoAlumno = cursoAlumno;

  const show = isActiveCursoAlumno;

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
      nomAlumno: nomAlumno,
      nomCurso: nomCurso,
      fechaIni: fechaIni,
      fechaFin: fechaFin,
      horaIni: horaIni,
      horaFin: horaFin,
      porcAsistencia: porcAsistencia,
      claseAprobada: claseAprobada,
      porcParticipacion: porcParticipacion,
      porcAprobacion: porcAprobacion,
      estadoCurso: estadoCurso,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...cursoAlumno } = response[0];
      TopAlerts(successCreated);
      actualizarCursoAlumno(cursoAlumno);
    });
  }

  function actualizarCursoAlumno(response) {
    actualizarCursoAlumno.push(response);
  }

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Curso Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_NomA">Nombre alumno:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Estado curso"
                type="text"
                className="form-control"
                name="input_NomA"
                id="input_NomA"
                maxLength="50"
                onChange={({ target }) => setnomAlumno(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_NomCurso">Nombre curso:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Estado curso"
                type="text"
                className="form-control"
                name="input_NomCurso"
                id="input_NomCurso"
                maxLength="50"
                onChange={({ target }) => setnomCurso(target.value)}
                required
              />
            </div>
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
              <label htmlFor="input_HoraI">Hora inicio:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Hora inicio"
                type="double"
                className="form-control"
                name="input_HoraI"
                id="input_HoraI"
                onChange={({ target }) => sethoraIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_HoraF">Hora fin:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Hora fin"
                type="double"
                className="form-control"
                name="input_HoraF"
                id="input_HoraF"
                onChange={({ target }) => sethoraFin(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcA">Porc Asistencia:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje Asistencia"
                type="number"
                className="form-control"
                name="input_PorcA"
                id="input_PorcA"
                maxLength="11"
                onChange={({ target }) => setporcAsistencia(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcP">Porc Participación:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje participación"
                type="number"
                className="form-control"
                name="input_PorcP"
                id="input_PorcP"
                maxLength="11"
                onChange={({ target }) => setporcParticipacion(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_ClaseA">Clase Aprob:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                type="text"
                className="form-control"
                name="input_ClaseA"
                id="input_ClaseA"
                maxLength="1"
                onChange={({ target }) => setclaseAprobada(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcAP">Porc Aprobación:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje aprobación"
                type="number"
                className="form-control"
                name="input_PorcAP"
                id="input_PorcAP"
                maxLength="11"
                onChange={({ target }) => setporcAprobacion(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_EstC">Estado Curso:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Estado curso"
                type="text"
                className="form-control"
                name="input_EstC"
                id="input_EstC"
                maxLength="15"
                onChange={({ target }) => setestadoCurso(target.value)}
                required
              />
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
export default InsertarCursoAlumno;
