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
  const [nomCursoAlumno, setNomCursoAlumno] = useState("");
  const [direccionCursoAlumno, setDireccionCursoAlumno] = useState("");
  const [idPais, setidPais] = useState("");

  const [listPais, setlistPais] = useState([""]);

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const listCursoAlumno = cursoAlumno;

  const show = isActiveEditCursoAlumno;

  const handleClose = () => {
    cambiarEstado(false);
    setNomCursoAlumno(responseID[0].cargoReferente);
    setDireccionCursoAlumno(responseID[0].tipo_cursoAlumno);
    setidPais(responseID[0].nombreCursoAlumno);
  };

  // ----------------------FUNCIONES----------------------------
  function obtenerPais() {
    const url = "pages/auxiliares/listadoPaisForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistPais(response));
  }

  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idCursoAlumno, nombreTabla: nombreTabla };
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setNomCursoAlumno(response[0].nomCursoAlumno);
      setDireccionCursoAlumno(response[0].direccionCursoAlumno);
      setidPais(response[0].nomPais);
    });
  }, [idCursoAlumno]);

  function SendData(e) {
    e.preventDefault();
    var url = "pages/editar/editarCursoAlumno.php";
    var operationUrl = "editarCursoAlumno";
    var data = {
      usuarioModificacion: userData.usuario,
      idCursoAlumno: idCursoAlumno,

      idPais: idPais === "" ? responseID[0].idPais : idPais,
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
        obtenerPais();
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
              <label htmlFor="input_HoraI">Hora inicio:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Hora inicio"
                value={fechaIni || ""}
                type="number"
                className="form-control"
                name="input_HoraI"
                id="input_HoraI"
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_HoraF">Hora fin:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Hora fin"
                value={fechaFin || ""}
                type="number"
                className="form-control"
                name="input_HoraF"
                id="input_HoraF"
                onChange={({ target }) => setfechaFin(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcA">Porc Asistencia:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje Asistencia"
                value={fechaIni || ""}
                type="number"
                className="form-control"
                name="input_PorcA"
                id="input_PorcA"
                maxLength="11"
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcP">Porc Participación:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje participación"
                value={fechaIni || ""}
                type="date"
                className="form-control"
                name="input_PorcP"
                id="input_PorcP"
                maxLength="11"
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_ClaseA">Clase Aprob:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Fecha inicio"
                value={fechaIni || ""}
                type="text"
                className="form-control"
                name="input_ClaseA"
                id="input_ClaseA"
                maxLength="1"
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_PorcAP">Porc Aprobación:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Porcentaje aprobación"
                value={fechaIni || ""}
                type="date"
                className="form-control"
                name="input_PorcAP"
                id="input_PorcAP"
                maxLength="11"
                onChange={({ target }) => setfechaIni(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_EstC">Estado Curso:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Estado curso"
                value={fechaIni || ""}
                type="text"
                className="form-control"
                name="input_EstC"
                id="input_EstC"
                maxLength="15"
                onChange={({ target }) => setfechaIni(target.value)}
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
