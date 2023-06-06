import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarNotaExamen = ({
  isActiveEditNotaExamen,
  cambiarEstado,
  idNotaExamen,
  notaDeExamen,
  setNotaExamen,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [notaExamen, setnotaExamen] = useState("");
  const [apruebaExamen, setapruebaExamen] = useState("");

  const [idCursoAlumno, setidCursoAlumno] = useState("");
  const [idRamoExamen, setidRamoExamen] = useState("");

  const [listRamoExamen, setlistRamoExamen] = useState([""]);
  const [listCursoAlumno, setlistCursoAlumno] = useState([""]);


  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [responseID, setResponseID] = useState([""]);

  const listNotaExamen = notaDeExamen;

  const show = isActiveEditNotaExamen;

  const handleClose = () => {
    cambiarEstado(false);
    setnotaExamen(responseID[0].notaExamen);
    setapruebaExamen(responseID[0].apruebaExamen);
    setidRamoExamen(responseID[0].idRamoExamen);
    setidCursoAlumno(responseID[0].idCursoAlumno);
  };
  // ----------------------FUNCIONES----------------------------
  function obtenerRamoExamen() {
    const url = "pages/auxiliares/listadoRamoExamenForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistRamoExamen(response)
    );
  }
  function obtenerCursoAlumno() {
    const url = "pages/auxiliares/listadoCursoAlumnoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistCursoAlumno(response)
    );
  }


  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idNotaExamen, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setnotaExamen(response[0].notaExamen);
      setapruebaExamen(response[0].apruebaExamen);
      setidRamoExamen(response[0].idRamoExamen);
      setidCursoAlumno(response[0].idCursoAlumno);
    });
  }, [idNotaExamen]);

  function SendData(e) {
    e.preventDefault();
    const url = "pages/editar/editarNotaExamen.php";
    const operationUrl = "editarNotaExamen";

    var data = {
      usuarioModificacion: userData.usuario,
      idNotaExamen: idNotaExamen,
      notaExamen: notaExamen === "" ? responseID[0].notaExamen : notaExamen,
      apruebaExamen: apruebaExamen === "" ? responseID[0].apruebaExamen : apruebaExamen,
      idRamoExamen: idRamoExamen === "" ? responseID[0].idRamoExamen : idRamoExamen,
      idCursoAlumno: idCursoAlumno === "" ? responseID[0].idCursoAlumno : idCursoAlumno,
      isActive:true,

    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...notaDeExamen } = response[0];
      TopAlerts(successEdited);
      {actualizarNotaExamen(notaDeExamen);console.log(data);};
    });

    function actualizarNotaExamen(notaDeExamen) {
      const nuevosNotaExamen = listNotaExamen.map((c) =>
        c.idNotaExamen === notaDeExamen.idNotaExamen ? notaDeExamen : c
      );
      setNotaExamen(nuevosNotaExamen);
    }
  }

  useEffect(
    function () {
      if (idNotaExamen !== null) {
        getData();
        obtenerRamoExamen();
        obtenerCursoAlumno();
    }
    },
    [idNotaExamen]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Nota Examen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
          <div>
              <label htmlFor="input_NotaExamen">Nota examen:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Nota examen"
                value={notaExamen || ""}
                type="number"
                className="form-control"
                name="input_NotaExamen"
                id="input_NotaExamen"
                maxLength="11"
                onChange={({ target }) => setnotaExamen(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_ApruebaExamen">Aprueba examen:</label>
              <select
                style={{ textTransform: "uppercase" }}
                placeholder="Aprueba examen"
                value={apruebaExamen || ""}
                type="text"
                className="form-control"
                name="input_ApruebaExamen"
                id="input_ApruebaExamen"
                maxLength="2"
                onChange={({ target }) => setapruebaExamen(target.value)}
                required
              >
                <option hidden value="">
                  {apruebaExamen}
                </option>
                <option value="S">Si (Aprobado)</option>
                <option value="N">No (Reprobado)</option>
              </select>
            </div>

            <div>
              <label htmlFor="input_Servicio">Examen:</label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidRamoExamen(target.value)}
              >
                {listRamoExamen.map((valor) => (
                  <option
                    selected={valor.idRamoExamen === idRamoExamen ? "selected" : ""}
                    value={valor.idRamoExamen}
                  >
                    {valor.nomExamen}
                  </option>
                ))}
              </select>
            </div>

            
           <div>
            <label htmlFor="input_CursoA">Curso Alumno :</label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidCursoAlumno(target.value)}
              >
                {listCursoAlumno.map((valor) => (
                  <option
                    selected={valor.idCursoAlumno === idCursoAlumno ? "selected" : ""}
                    value={valor.idCursoAlumno}
                  >
                    {valor.idCursoAlumno}
                  </option>
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

export default EditarNotaExamen;
