import React, { useState,useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";

import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarCursoAlumnoSesion = ({ isActiveCursoAlumnoSesion, cambiarEstado, cursoAlumnoSesion }) => {
  // ----------------------CONSTANTES----------------------------
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");
  const [asistencia, setasistencia] = useState("");
  const [participacion, setparticipacion] = useState("");
  const [nomSesion, setnomSesion] = useState("");
  const [idCursoAlumno, setidCursoAlumno] = useState("");

  const listCursoAlumnoSesion = cursoAlumnoSesion;

  const show = isActiveCursoAlumnoSesion;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------
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
      nomSesion: nomSesion,
      idCursoAlumno: idCursoAlumno,
      isActive:true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...cursoAlumnoSesion } = response[0];
      TopAlerts(successCreated);
      actualizarCursoAlumnoSesion(cursoAlumnoSesion);
    });
  }

  function actualizarCursoAlumnoSesion(response) {
    listCursoAlumnoSesion.push(response);
  }



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
                placeholder="Asistencia"
                type="int"
                className="form-control"
                name="input_PorcA"
                id="input_PorcA"
                maxLength="11"
                onChange={({ target }) => setasistencia(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcP">Participación :</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje participación"
                type="int"
                className="form-control"
                name="input_PorcP"
                id="input_PorcP"
                maxLength="11"
                onChange={({ target }) => setparticipacion(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcP">Sesion :</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje participación"
                type="int"
                className="form-control"
                name="input_PorcP"
                id="input_PorcP"
                maxLength="11"
                onChange={({ target }) => setnomSesion(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcP">Curso Alumno :</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje participación"
                type="int"
                className="form-control"
                name="input_PorcP"
                id="input_PorcP"
                maxLength="11"
                onChange={({ target }) => setidCursoAlumno(target.value)}
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
export default InsertarCursoAlumnoSesion;


