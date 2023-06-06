import React, { useState,useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";

import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarCurso = ({ isActiveCurso, cambiarEstado, curso }) => {
  // ----------------------CONSTANTES----------------------------
  const [codCurso, setcodCurso] = useState([""]);
  const [nomCurso, setnomCurso] = useState([""]);
  const [tipoHH, settipoHH] = useState([""]);
  const [duracionCursoHH, setduracionCursoHH] = useState([""]);
  const [cantSesionesCurso, setcantSesionesCurso] = useState([""]);

  const listCurso = curso;

  const show = isActiveCurso;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarCurso.php";
    const operationUrl = "insertarCurso";
    var data = {
      usuarioCreacion: userData.usuario,
      codCurso: codCurso,
      nomCurso: nomCurso,
      tipoHH: tipoHH,
      duracionCursoHH: duracionCursoHH,
      cantSesionesCurso: cantSesionesCurso,
      isActive:true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...curso } = response[0];
      TopAlerts(successCreated);
      actualizarCurso(curso);
    });
  }

  function actualizarCurso(response) {
    listCurso.push(response);
  }


  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_nombreDelCodigo">Código:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba el código"
                type="text"
                className="form-control"
                name="input_nombreDelCodigo"
                id="input_nombreDelCodigo"
                maxLength="20"
                onChange={({ target }) => setcodCurso(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_nombreDelCurso">Nombre:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre del curso"
                type="text"
                className="form-control"
                name="input_nombreDelCurso"
                id="input_nombreDelCurso"
                maxLength="50"
                onChange={({ target }) => setnomCurso(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_TipoHH">Tipo HH:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba tipo HH"
                type="text"
                className="form-control"
                name="input_TipoHH"
                id="input_TipoHH"
                maxLength="12"
                onChange={({ target }) => settipoHH(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_DuracionHH">Duración curso HH: (double)</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba duración del curso HH"
                type="number"
                className="form-control"
                name="input_DuracionHH"
                id="input_DuracionHH"
                onChange={({ target }) => setduracionCursoHH(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_cantSesionesCurso">Cant sesiones:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba la cantidad de sesiones"
                type="number"
                className="form-control"
                name="input_cantSesionesCurso"
                id="input_cantSesionesCurso"
                maxLength="11"
                onChange={({ target }) => setcantSesionesCurso(target.value)}
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
export default InsertarCurso;
