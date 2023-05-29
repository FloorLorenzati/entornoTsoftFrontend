import React, { useState, useEffect } from "react";
// import "../../css/InsertarCursoCalendario.css";
import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditarCurso = ({
  isActiveEditCurso,
  cambiarEstado,
  idCurso,
  nombreTabla,
  setCurso,
  curso,
}) => {
  // ----------------------CONSTANTES----------------------------

  const [codCurso, setcodCurso] = useState([""]);
  const [nomCurso, setnomCurso] = useState([""]);
  const [tipoHH, settipoHH] = useState([""]);
  const [duracionCursoHH, setduracionCursoHH] = useState([""]);
  const [cantSesionesCurso, setcantSesionesCurso] = useState([""]);

  const [responseID, setResponseID] = useState([""]);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const listCurso = curso;

  const show = isActiveEditCurso;

  const handleClose = () => {
    cambiarEstado(false);
    setcodCurso(responseID[0].codCurso);
    setnomCurso(responseID[0].nomCurso);
    settipoHH(responseID[0].tipoHH);
    setduracionCursoHH(responseID[0].duracionCursoHH);
    setcantSesionesCurso(responseID[0].cantSesionesCurso);
  };

  // ----------------------FUNCIONES----------------------------

  function getData() {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idCurso, nombreTabla: nombreTabla };
    SendDataService(url, operationUrl, data).then((response) => {
      response;
      setResponseID(response);
      setcodCurso(response[0].codCurso);
      setnomCurso(response[0].nomCurso);
      settipoHH(response[0].tipoHH);
      setduracionCursoHH(response[0].duracionCursoHH);
      setcantSesionesCurso(response[0].cantSesionesCurso);
    });
  }
  function SendData(e) {
    e.preventDefault();
    const url = "pages/editar/editarCurso.php";
    const operationUrl = "editarCurso";
    const data = {
      usuarioModificacion: userData.usuario,

      idCurso: idCurso,
      codCurso: codCurso === "" ? responseID[0].codCurso : codCurso,
      nomCurso: nomCurso === "" ? responseID[0].nomCurso : nomCurso,
      tipoHH: tipoHH === "" ? responseID[0].tipoHH : tipoHH,
      duracionCursoHH:
        duracionCursoHH === ""
          ? responseID[0].duracionCursoHH
          : duracionCursoHH,
      cantSesionesCurso:
        cantSesionesCurso === ""
          ? responseID[0].cantSesionesCurso
          : cantSesionesCurso,
    };
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...curso } = response[0];
      TopAlerts(successEdited);
      {actualizarCurso(curso);console.log(data);};
    });
    function actualizarCurso (curso) {
      const nuevosCursos = listCurso.map((c) =>
        c.idCurso === curso.idCurso ? curso : c
      );
      setEmpleado(nuevosCursos);
    }
  }

  useEffect(
    function () {
      if (idCurso !== null) {
        getData();
      }
    },
    [idCurso]
  );

  // ----------------------RENDER----------------------------

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_nombreDelCodigo">Código:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba el código"
                value={codCurso || ""}
                type="text"
                className="form-control"
                name="input_nombreDelCodigo"
                id="input_nombreDelCodigo"
                onChange={({ target }) => setcodCurso(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_nombreDelCurso">Nombre:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre del curso"
                value={nomCurso || ""}
                type="text"
                className="form-control"
                name="input_nombreDelCurso"
                id="input_nombreDelCurso"
                onChange={({ target }) => setCurso(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_TipoHH">Tipo HH:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba tipo HH"
                value={tipoHH || ""}
                type="double"
                className="form-control"
                name="input_TipoHH"
                id="input_TipoHH"
                onChange={({ target }) => settipoHH(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_DuracionHH">Duración curso HH:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Escriba tipo HH"
                value={duracionCursoHH || ""}
                type="double"
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
                placeholder="Escriba tipo HH"
                value={cantSesionesCurso || ""}
                type="text"
                className="form-control"
                name="input_cantSesionesCurso"
                id="input_cantSesionesCurso"
                onChange={({ target }) => setcantSesionesCurso(target.value)}
                required
              />
            </div>

            <Button
              variant="secondary"
              type="submit"
              id="btn_registrar"
              value="Registrar"
              onClick={SendData}
            >
              Registrar
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditarCurso;
