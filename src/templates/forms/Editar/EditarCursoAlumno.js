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
  CursoAlumno,
  setCursoAlumno,
  nombreTabla,
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

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const listCursoAlumno = CursoAlumno;
  const [listAlumnos, setlistAlumnos] = useState([]);
  const [listCursos, setlistCursos] = useState([]);
  const show = isActiveEditCursoAlumno;

  const handleClose = () => {
    cambiarEstado(false);
    setidAlumno(responseID[0].idAlumno);
    setidCurso(responseID[0].idCurso);
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
      setidAlumno(response[0].idAlumno);
      setidCurso(response[0].idCurso);
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

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarCursoAlumno.php";
    var operationUrl = "editarCursoAlumno";
    var data = {
      usuarioModificacion: userData.usuario,
      idCursoAlumno: idCursoAlumno,
      idAlumno: idAlumno === "" ? responseID[0].idAlumno : idAlumno,
      idCurso: idCurso === "" ? responseID[0].idCurso : idCurso,
      fechaIni: fechaIni === "" ? responseID[0].fechaIni : fechaIni,
      fechaFin: fechaFin === "" ? responseID[0].fechaFin : fechaFin,
      horaIni: horaIni === "" ? responseID[0].horaIni : horaIni,
      horaFin: horaFin === "" ? responseID[0].horaFin : horaFin,
      porcAsistencia:
        porcAsistencia === "" ? responseID[0].porcAsistencia : porcAsistencia,
      porcParticipacion:
        porcParticipacion === ""
          ? responseID[0].porcParticipacion
          : porcParticipacion,
      claseAprobada:
        claseAprobada === "" ? responseID[0].claseAprobada : claseAprobada,
      porcAprobacion:
        porcAprobacion === "" ? responseID[0].porcAprobacion : porcAprobacion,
      estadoCurso: estadoCurso === "" ? responseID[0].estadoCurso : estadoCurso,
      isActive: true,
    };

    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...cursoAlumno } = response[0];
      console.log(response)
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
        obtenerAlumnos();
        obtenerCursos();
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
              <label htmlFor="input_NomA">Nombre alumno:</label>

              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidAlumno(target.value)}
              >
                {listAlumnos.map((valor) => (
                  <option
                    selected={
                      valor.idAlumno === idAlumno ? "selected" : ""
                    }
                    value={valor.idAlumno}
                  >
                    {valor.nomAlumno}
                  </option>
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
                {listCursos.map((valor) => (
                  <option
                  selected={
                      valor.idCurso === idCurso ? "selected" : ""
                    }
                    value={valor.idCurso}
                  >
                    {valor.nomCurso}
                  </option>
                ))}
              </select>
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
                value={horaFin || ""}
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
                value={porcAsistencia || ""}
                type="int"
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
                value={porcParticipacion || ""}
                type="int"
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
                value={porcAprobacion || ""}
                type="int"
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
            <div>
              <label htmlFor="input_ClaseA">Clase Aprobada:</label>
              <select
                style={{ textTransform: "uppercase" }}
                placeholder="Clase aprobada "
                value={claseAprobada || ""}
                type="text"
                className="form-control"
                name="input_ClaseA"
                id="input_ClaseA"
                maxLength="1"
                onChange={({ target }) => setclaseAprobada(target.value)}
                required
              >
                <option hidden value="">
                  {claseAprobada}
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

export default EditarCursoAlumno;
