import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarCursoAlumnoSesion = ({
  isActiveEditCursoAlumnoSesion,
  cambiarEstado,
  idCursoAlumnoSesion,
  cursoAlumnoSesion,
  setCursoAlumnoSesion,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [fechaIni, setfechaIni] = useState("");
  const [fechaFin, setfechaFin] = useState("");
  const [asistencia, setasistencia] = useState("");
  const [participacion, setparticipacion] = useState("");
  const [nomSesion, setnomSesion] = useState("");
  const [idCursoAlumno, setidCursoAlumno] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [responseID, setResponseID] = useState([""]);
  const listCursoAlumnoSesion = cursoAlumnoSesion;

  const show = isActiveEditCursoAlumnoSesion;

  const handleClose = () => {
    cambiarEstado(false);
    setfechaIni(responseID[0].fechaIni);
    setfechaFin(responseID[0].fechaFin);
    setasistencia(responseID[0].asistencia);
    setparticipacion(responseID[0].participacion);
    setnomSesion(responseID[0].nomSesion);
    setidCursoAlumno(responseID[0].idCursoAlumno);
  };
  // ----------------------FUNCIONES----------------------------
  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idCursoAlumnoSesion, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setfechaIni(response[0].fechaIni);
      setfechaFin(response[0].fechaFin);
      setasistencia(response[0].asistencia);
      setparticipacion(response[0].participacion);
      setnomSesion(response[0].nomSesion);
      setidCursoAlumno(response[0].idCursoAlumno);

    });
  }, [idCursoAlumnoSesion]);

  function SendData(e) {
    e.preventDefault();
    const url = "pages/editar/editarCursoAlumnoSesion.php";
    const operationUrl = "editarCursoAlumnoSesion";

    var data = {
      usuarioModificacion: userData.usuario,
      idCursoAlumnoSesion: idCursoAlumnoSesion,

      fechaIni: fechaIni === "" ? responseID[0].fechaIni : fechaIni,
      fechaFin: fechaFin === "" ? responseID[0].fechaFin : fechaFin,
      asistencia: asistencia === "" ? responseID[0].asistencia : asistencia,
      participacion: participacion === "" ? responseID[0].participacion : participacion,
      nomSesion: nomSesion === "" ? responseID[0].nomSesion : nomSesion,
      idCursoAlumno: idCursoAlumno === "" ? responseID[0].idCursoAlumno : idCursoAlumno,
      isActive:true,

    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...cursoAlumnoSesion } = response[0];
      TopAlerts(successEdited);
      {actualizarCursoAlumnoSesion(cursoAlumnoSesion);console.log(data);};
    });

    function actualizarCursoAlumnoSesion(cursoAlumnoSesion) {
      const nuevosCursoAlumnoSesion = listCursoAlumnoSesion.map((c) =>
        c.idCursoAlumnoSesion === cursoAlumnoSesion.idCursoAlumnoSesion ? cursoAlumnoSesion : c
      );
      setCursoAlumnoSesion(nuevosCursoAlumnoSesion);
    }
  }

  useEffect(
    function () {
      if (idCursoAlumnoSesion !== null) {
        getData();
      }
    },
    [idCursoAlumnoSesion]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso Alumno Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
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
                placeholder="Fecha fin"
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
              <label htmlFor="input_PorcA">Asistencia :</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Asistencia"
                value={asistencia || ""}
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
                value={participacion || ""}
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
                value={nomSesion || ""}
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
                placeholder="Curso alumno"
                value={idCursoAlumno || ""}
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

export default EditarCursoAlumnoSesion;
