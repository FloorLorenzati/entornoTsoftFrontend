import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarCursoAlumno = ({
  isActiveEditCursoAlumno,
  cambiarEstado,
  idCursoAlumno,
  cursoAlumno,
  setCursoAlumno,
  nombreTabla,
}) => {
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

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const listCursoAlumno = cursoAlumno;

  const show = isActiveEditCursoAlumno;

  const handleClose = () => {
    cambiarEstado(false);
    setnomAlumno(responseID[0].nomAlumno);
    setnomCurso(responseID[0].nomCurso);
    setfechaIni(responseID[0].fechaIni);
    setfechaFin(responseID[0].fechaFin);
    sethoraIni(responseID[0].horaIni);
    sethoraFin(responseID[0].horaFin);
    setporcAsistencia(responseID[0].porcAsistencia);
    setporcParticipacion(responseID[0].porcParticipacion);
    setclaseAprobada(responseID[0].claseAprobada);
    setporcAprobacion(responseID[0].porcAprobacion);
    setestadoCurso(responseID[0].estadoCurso);
  };

  // ----------------------FUNCIONES----------------------------
  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idCursoAlumno, nombreTabla: nombreTabla };
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setnomAlumno(response[0].nomAlumno);
      setnomCurso(response[0].nomCurso);
      setfechaIni(response[0].fechaIni);
      setfechaFin(response[0].fechaFin);
      sethoraIni(response[0].horaIni);
      sethoraFin(response[0].horaFin);
      setporcAsistencia(response[0].porcAsistencia);
      setporcParticipacion(response[0].porcParticipacion);
      setclaseAprobada(response[0].claseAprobada);
      setporcAprobacion(response[0].porcAprobacion);
      setestadoCurso(response[0].estadoCurso);
    });
  }, [idCursoAlumno]);

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarCursoAlumno.php";
    var operationUrl = "editarCursoAlumno";
    var data = {
      usuarioModificacion: userData.usuario,
      idCursoAlumno: idCursoAlumno,
      nomAlumno: nomAlumno === "" ? responseID[0].nomAlumno : nomAlumno,
      nomCurso: nomCurso === "" ? responseID[0].nomCurso : nomCurso,
      fechaIni: fechaIni === "" ? responseID[0].fechaIni : fechaIni,
      fechaFin: fechaFin === "" ? responseID[0].fechaFin : fechaFin,
      horaIni: horaIni === "" ? responseID[0].horaIni : horaIni,
      horaFin: horaFin === "" ? responseID[0].horaFin : horaFin,
      porcAsistencia: porcAsistencia === "" ? responseID[0].porcAsistencia : porcAsistencia,
      porcParticipacion: porcParticipacion === "" ? responseID[0].porcParticipacion : porcParticipacion,
      claseAprobada: claseAprobada === "" ? responseID[0].claseAprobada : claseAprobada,
      porcAprobacion: porcAprobacion === "" ? responseID[0].porcAprobacion : porcAprobacion,
      estadoCurso: estadoCurso === "" ? responseID[0].estadoCurso : estadoCurso,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...cursoAlumno } = response[0];
      TopAlerts(successEdited);
      actualizarCursoAlumno(cursoAlumno);
    });

    function actualizarCursoAlumno(cursoAlumno) {
      const nuevosCursoAlumno = listCursoAlumno.map((c) =>
        c.idCursoAlumno === cursoAlumno.idCursoAlumno ? cursoAlumno : c
      );
      setCursoAlumno(nuevosCursoAlumno);
    }
  }

  useEffect(
    function () {
      if (idCursoAlumno !== null) {
        getData();
      }
    },
    [idCursoAlumno]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_NomA">Nombre alumno:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Estado curso"
                value={nomAlumno || ""}
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
                value={nomCurso || ""}
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
                value={fechaIni || ""}
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
                value={fechaFin || ""}
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
                value={horaIni || ""}
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
                value={horaFin || ""}
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
                value={porcAsistencia || ""}
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
                value={porcParticipacion || ""}
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
                value={claseAprobada || ""}
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
                value={porcAprobacion || ""}
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
                value={estadoCurso || ""}
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

export default EditarCursoAlumno;
