import React, { useState, useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";

import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarCursoAlumno = ({
  isActiveCursoAlumno,
  cambiarEstado,
  CursoAlumno,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [idAlumno, setidAlumno] = useState("");
  const [idCurso, setidCurso] = useState("");
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");
  const [horaIni, sethoraIni] = useState("");
  const [horaFin, sethoraFin] = useState("");
  const [porcAsistencia, setporcAsistencia] = useState("");
  const [porcParticipacion, setporcParticipacion] = useState("");
  const [claseAprobada, setclaseAprobada] = useState("");
  const [porcAprobacion, setporcAprobacion] = useState("");
  const [estadoCurso, setestadoCurso] = useState("");

  const listCursoAlumno = CursoAlumno;

  const show = isActiveCursoAlumno;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [listAlumnos, setlistAlumnos] = useState([]);
  const [listCursos, setlistCursos] = useState([]);

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarCursoAlumno.php";
    const operationUrl = "insertarCursoAlumno";
    var data = {
      usuarioCreacion: userData.usuario,
      idAlumno: idAlumno,
      idCurso: idCurso,
      fechaIni: fechaIni,
      fechaFin: fechaFin,
      horaIni: horaIni,
      horaFin: horaFin,
      porcAsistencia: porcAsistencia,
      claseAprobada: claseAprobada,
      porcParticipacion: porcParticipacion,
      porcAprobacion: porcAprobacion,
      estadoCurso: estadoCurso,
      isActive: true,
    };
    
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...cursoAlumno } = response[0];
      TopAlerts(successCreated);
      actualizarCursoAlumno(cursoAlumno);console.log(data);;
    });
  }

  function actualizarCursoAlumno(response) {
    listCursoAlumno.push(response);
  }
  
  function obtenerAlumnos() {
    const url = "pages/auxiliares/listadoAlumnoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistAlumnos(response)
    );
  }
  function obtenerCursos() {
    const url = "pages/auxiliares/listadoCursoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistCursos(response)
    );
  }

  useEffect(function () {
    obtenerAlumnos();
    obtenerCursos();
  }, []);
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
              <label htmlFor="input_NomA">Nombre alumno:</label>

              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidAlumno(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listAlumnos.map((valor) => (
                  <option value={valor.idAlumno}>{valor.nomAlumno}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="input_idCurso">Nombre curso:</label>

              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidCurso(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>

                {listCursos.map((valor) => (
                  <option value={valor.idCurso}>{valor.nomCurso}</option>
                ))}
              </select>
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
                type="time"
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
                type="time"
                className="form-control"
                name="input_HoraF"
                id="input_HoraF"
                onChange={({ target }) => sethoraFin(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcA">Porc Asistencia (Maxímo 100):</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje Asistencia"
                type="number"
                className="form-control"
                name="input_PorcA"
                id="input_PorcA"
                maxLength="3"
                onChange={({ target }) => setporcAsistencia(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcP">Porc Participación (Maxímo 100):</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje participación"
                type="number"
                className="form-control"
                name="input_PorcP"
                id="input_PorcP"
                maxLength="3"
                onChange={({ target }) => setporcParticipacion(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcAP">Porc Aprobación (Maxímo 100):</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje aprobación"
                type="number"
                className="form-control"
                name="input_PorcAP"
                id="input_PorcAP"
                maxLength="3"
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
            <div>
              <label htmlFor="input_ClaseA">Clase Aprobada:</label>
              <select
                style={{ textTransform: "uppercase" }}
                placeholder="Clase aprobada "
                type="text"
                className="form-control"
                name="input_ClaseA"
                id="input_ClaseA"
                maxLength="1"
                onChange={({ target }) => setclaseAprobada(target.value)}
                required
              >
                <option hidden value="">
                  Desplegar lista
                </option>
                <option value="S">S (Aprobado)</option>
                <option value="N">N (Reprobado)</option>
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
export default InsertarCursoAlumno;
