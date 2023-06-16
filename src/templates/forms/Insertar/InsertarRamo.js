import React, { useState, useEffect } from "react";

import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";

import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const InsertarRamo = ({ isActiveRamo, cambiarEstado, ramos }) => {
  // ----------------------CONSTANTES----------------------------
  const [codRamo, setcodRamo] = useState("");
  const [nomRamo, setnomRamo] = useState("");
  const [tipoRamo, settipoRamo] = useState("");
  const [tipoRamoHH, settipoRamoHH] = useState("");
  const [duracionRamoHH, setduracionRamoHH] = useState("");
  const [cantSesionesRamo, setcantSesionesRamo] = useState("");

  const [idCurso, setidCurso] = useState("");

  const [listCurso, setlistCurso] = useState([""]);

  const listRamos = ramos;

  const show = isActiveRamo;

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const handleClose = () => cambiarEstado(false);

  // ----------------------FUNCIONES----------------------------

  function obtenerCurso() {
    const url = "pages/auxiliares/listadoCursoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistCurso(response)
    );
  }

  function SendData(e) {
    e.preventDefault();
    const url = "pages/insertar/insertarRamo.php";
    const operationUrl = "insertarRamo";
    var data = {
      usuarioCreacion: userData.usuario,
      codRamo: codRamo,
      nomRamo: nomRamo,
      tipoRamo: tipoRamo,
      tipoRamoHH: tipoRamoHH,
      duracionRamoHH: duracionRamoHH,
      cantSesionesRamo: cantSesionesRamo,
      idCurso:idCurso,
      isActive: true,
    };

    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successCreated, ...ramos } = response[0];
      console.log(response);
      TopAlerts(successCreated);
      actualizarRamo(ramos);
    });
  }

  function actualizarRamo(response) {
    listRamos.push(response);
  }

  useEffect(function () {
    obtenerCurso();
  }, []);

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Ramo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_codigoDelRamo">Código:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba código del Ramo"
                type="text"
                className="form-control"
                name="input_codigoDelRamo"
                id="input_codigoDelRamo"
                maxLength="20"
                onChange={({ target }) => setcodRamo(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_nombreDelRamo">Nombre ramo:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre del Ramo"
                type="text"
                className="form-control"
                name="input_nombreDelRamo"
                id="input_nombreDelRamo"
                maxLength="50"
                onChange={({ target }) => setnomRamo(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_tipoDelRamo">Tipo ramo:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba tipo del Ramo"
                type="text"
                className="form-control"
                name="input_tipoDelRamo"
                id="input_tipoDelRamo"
                maxLength="10"
                onChange={({ target }) => settipoRamo(target.value)}
                required
              />
            </div>

            <div>
            <label htmlFor="input_tipoDelRamohh">Tipo ramo HH:</label>
              <select
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba tipo del ramo HH"
                className="form-control"
                name="input_tipoDelRamohh"
                id="input_tipoDelRamohh"
                onChange={({ target }) => settipoRamoHH(target.value)}
                required
              >
                <option hidden value="">
                  Desplegar lista
                </option>
                <option value="ACADEMICAS">ACADEMICAS</option>
                <option value="CRONOLOGICAS">CRONOLOGICAS</option>
                <option value="MIXTO">MIXTO</option>
              </select>
            </div>

            <div>
              <label htmlFor="input_duracionDelRamohh">Duración ramo HH:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba duración del ramo HH"
                type="double"
                className="form-control"
                name="input_duracionDelRamohh"
                id="input_duracionDelRamohh"
                onChange={({ target }) => setduracionRamoHH(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_cantSesionesDelRamo">
                Cantidad sesiones ramo:
              </label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba cantidad de sesiones del Ramo"
                type="int"
                className="form-control"
                name="input_cantSesionesDelRamo"
                id="input_cantSesionesDelRamo"
                maxLength="11"
                onChange={({ target }) => setcantSesionesRamo(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_NombreCurso">Nombre del curso:</label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidCurso(target.value)}
              >
                <option hidden value="">
                  Desplegar lista
                </option>
                {listCurso.map((valor) => (
                  <option value={valor.idCurso}>{valor.nomCurso}</option>
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
export default InsertarRamo;
