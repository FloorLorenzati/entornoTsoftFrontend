import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarRamo = ({
  isActiveEditRamo,
  cambiarEstado,
  idRamo,
  ramo,
  setRamo,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [codRamo, setcodRamo] = useState("");
  const [nomRamo, setnomRamo] = useState("");
  const [tipoRamo, settipoRamo] = useState("");
  const [tipoRamoHH, settipoRamoHH] = useState("");
  const [duracionRamoHH, setduracionRamoHH] = useState("");
  const [cantSesionesRamo, setcantSesionesRamo] = useState("");

  const [idCurso, setidCurso] = useState("");

  const [listCurso, setlistCurso] = useState([""]);

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [responseID, setResponseID] = useState([""]);

  const listRamo = ramo;

  const show = isActiveEditRamo;

  const handleClose = () => {
    cambiarEstado(false);
    setcodRamo(responseID[0].codRamo);
    setnomRamo(responseID[0].nomRamo);
    settipoRamo(responseID[0].tipoRamo);
    settipoRamoHH(responseID[0].tipoRamoHH);
    setduracionRamoHH(responseID[0].duracionRamoHH);
    setcantSesionesRamo(responseID[0].cantSesionesRamo);
    setidCurso(responseID[0].idCurso);
  };
  // ----------------------FUNCIONES----------------------------
  function obtenerCurso() {
    const url = "pages/auxiliares/listadoCursoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistCurso(response));
  }

  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idRamo, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setcodRamo(response[0].codRamo);
      setnomRamo(response[0].nomRamo);
      settipoRamo(response[0].tipoRamo);
      settipoRamoHH(response[0].tipoRamoHH);
      setduracionRamoHH(response[0].duracionRamoHH);
      setcantSesionesRamo(response[0].cantSesionesRamo);
      setidCurso(response[0].nomCurso);
    });
  }, [idRamo]);

  function SendData(e) {
    e.preventDefault();
    const url = "pages/editar/editarRamo.php";
    const operationUrl = "editarRamo";

    var data = {
      usuarioModificacion: userData.usuario,
      idRamo: idRamo,
      codRamo: codRamo === "" ? responseID[0].codRamo : codRamo,
      nomRamo: nomRamo === "" ? responseID[0].nomRamo : nomRamo,
      tipoRamo: tipoRamo === "" ? responseID[0].tipoRamo : tipoRamo,
      tipoRamoHH: tipoRamoHH === "" ? responseID[0].tipoRamoHH : tipoRamoHH,
      duracionRamoHH: duracionRamoHH === "" ? responseID[0].duracionRamoHH : duracionRamoHH,
      cantSesionesRamo: cantSesionesRamo === "" ? responseID[0].cantSesionesRamo : cantSesionesRamo,
      idCurso: idCurso === "" ? responseID[0].idCurso : idCurso,
      isActive:true,
    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...ramo } = response[0];
      TopAlerts(successEdited);
      {actualizarRamo(ramo);console.log(data);};
    });

    function actualizarRamo(ramo) {
      const nuevosRamo = listRamo.map((c) =>
        c.idRamo === ramo.idRamo ? ramo : c
      );
      setRamo(nuevosRamo);
    }
  }

  useEffect(
    function () {
      if (idRamo !== null) {
        getData();
        obtenerCurso();
      }
    },
    [idRamo]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ramo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_tipoDelRamo">Código:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del Ramo"
                value={codRamo || ""}
                type="text"
                className="form-control"
                name="input_tipoDelRamo"
                id="input_tipoDelRamo"
                maxLength="20"
                onChange={({ target }) => setcodRamo(target.value)}
                required
              />
            </div>


            <div>
              <label htmlFor="input_nombreDelRamo">Nombre ramo:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del Ramo"
                value={nomRamo || ""}
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
              <label htmlFor="input_tipoDelRamohh">Tipo ramo:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba tipo del Ramo"
                value={tipoRamo || ""}
                type="text"
                className="form-control"
                name="input_tipoDelRamohh"
                id="input_tipoDelRamohh"
                maxLength="10"
                onChange={({ target }) => settipoRamo(target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="input_nombreDelRamo">Tipo ramo HH:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del Ramo"
                value={tipoRamoHH || ""}
                type="text"
                className="form-control"
                name="input_nombreDelRamo"
                id="input_nombreDelRamo"
                maxLength="12"
                onChange={({ target }) => settipoRamoHH(target.value)}
                required
              />
            </div>



            <div>
              <label htmlFor="input_duracionDelRamohh">Duración ramo HH:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del Ramo"
                value={duracionRamoHH || ""}
                type="double"
                className="form-control"
                name="input_duracionDelRamohh"
                id="input_duracionDelRamohh"
                onChange={({ target }) => setduracionRamoHH(target.value)}
                required
              />
            </div>



            <div>
              <label htmlFor="input_cantSesionesDelRamo">Cantidad sesiones ramo:</label>
              <input
               style={{ textTransform: "uppercase" }}
                placeholder="Escriba nombre completo del Ramo"
                value={cantSesionesRamo || ""}
                type="number"
                className="form-control"
                name="input_cantSesionesDelRamo"
                id="input_cantSesionesDelRamo"
                maxLength="11"
                onChange={({ target }) => setcantSesionesRamo(target.value)}
                required
              />
            </div>


            <div>
              <label htmlFor="input_Curso">Nombre del curso:</label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidCurso(target.value)}
              >
                {listCurso.map((valor) => (
                  <option
                    selected={valor.idCurso === idCurso ? "selected" : ""}
                    value={valor.idCurso}
                  >
                    {valor.nomCurso}
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

export default EditarRamo;
