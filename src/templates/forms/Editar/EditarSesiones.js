import React, { useState, useEffect } from "react";
import "../../../templates/forms/Insertar.css";
import SendDataService from "../../../services/SendDataService";
import getDataService from "../../../services/GetDataService";
import TopAlerts from "../../alerts/TopAlerts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback } from "react";

const EditarSesion = ({
  isActiveEditSesion,
  cambiarEstado,
  idSesion,
  sesion,
  setSesion,
  nombreTabla,
}) => {
  // ----------------------CONSTANTES----------------------------
  const [nroSesion, setnroSesion] = useState("");
  const [nomSesion, setnomSesion] = useState("");
  const [tipoSesion, settipoSesion] = useState("");
  const [tipoSesionHH, settipoSesionHH] = useState("");
  const [duracionSesionHH, setduracionSesionHH] = useState("");

  const [idRamo, setidRamo] = useState("");
  
  const [listRamo, setlistRamo] = useState([""]);

  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [responseID, setResponseID] = useState([""]);
  const listSesion = sesion;

  const show = isActiveEditSesion;

  const handleClose = () => {
    cambiarEstado(false);
    setnroSesion(responseID[0].nroSesion);
    setnomSesion(responseID[0].nomSesion);
    settipoSesion(responseID[0].tipoSesion);
    settipoSesionHH(responseID[0].tipoSesionHH);
    setduracionSesionHH(responseID[0].duracionSesionHH);
    setidRamo(responseID[0].idRamo);

  };
  // ----------------------FUNCIONES----------------------------
  function obtenerRamo() {
    const url = "pages/auxiliares/listadoRamoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistRamo(response));
  }
  const getData = useCallback(() => {
    const url = "pages/seleccionar/seleccionarDatos.php";
    const operationUrl = "seleccionarDatos";
    var data = { idRegistro: idSesion, nombreTabla: nombreTabla};
    SendDataService(url, operationUrl, data).then((response) => {
      console.log(response);
      setResponseID(response);
      setnroSesion(response[0].nroSesion);
      setnomSesion(response[0].nomSesion);
      settipoSesion(response[0].tipoSesion);
      settipoSesionHH(response[0].tipoSesionHH);
      setduracionSesionHH(response[0].duracionSesionHH);
      setidRamo(response[0].nomRamo);
    });
  }, [idSesion]);

  function SendData(e) {
    e.preventDefault();
    const url = "pages/editar/editarSesion.php";
    const operationUrl = "editarSesion";

    var data = {
      usuarioModificacion: userData.usuario,
      idSesion: idSesion,

      nroSesion: nroSesion === "" ? responseID[0].nroSesion : nroSesion,
      nomSesion: nomSesion === "" ? responseID[0].nomSesion : nomSesion,
      tipoSesion: tipoSesion === "" ? responseID[0].tipoSesion : tipoSesion,
      tipoSesionHH: tipoSesionHH === "" ? responseID[0].tipoSesionHH : tipoSesionHH,
      duracionSesionHH: duracionSesionHH === "" ? responseID[0].duracionSesionHH : duracionSesionHH,
      idRamo: idRamo === "" ? responseID[0].idRamo : idRamo,


    };
    console.log(data);
    SendDataService(url, operationUrl, data).then((response) => {
      const { successEdited, ...sesion } = response[0];
      TopAlerts(successEdited);
      {actualizarSesion(sesion);console.log(data);};
    });

    function actualizarSesion(sesion) {
      const nuevosSesion = listSesion.map((c) =>
        c.idSesion === sesion.idSesion ? sesion : c
      );
      setSesion(nuevosSesion);
    }
  }

  useEffect(
    function () {
      if (idSesion !== null) {
        getData();
        obtenerRamo();
      }
    },
    [idSesion]
  );

  // ----------------------RENDER----------------------------
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={SendData}>
            <div>
              <label htmlFor="input_NotaExamen">Número de sesion:</label>
              <input
                style={{ textTransform: "uppercase" }}
                placeholder="Número de la sesion"
                value={nroSesion || ""}
                type="int"
                className="form-control"
                name="input_NotaExamen"
                id="input_NotaExamen"
                maxLength="11"
                onChange={({ target }) => setnroSesion(target.value)}
                required
              />
            </div>


            <div>
              <label htmlFor="input_nombreDelSesion">Nombre de la sesion:</label>
              <input
               style={{ textTransform: "uppercase" }}
               placeholder="Escriba el nombre de la Sesion"
               value={nomSesion || ""}
                type="text"
                className="form-control"
                name="input_nombreDelSesion"
                id="input_nombreDelSesion"
                maxLength="50"
                onChange={({ target }) => setnomSesion(target.value)}
                required
              />
            </div>


            <div>
              <label htmlFor="input_nombreDelSesion">Tipo de sesion:</label>
              <input
               style={{ textTransform: "uppercase" }}
               placeholder="Escriba el tipo de Sesion"
               value={tipoSesion || ""}
                type="text"
                className="form-control"
                name="input_nombreDelSesion"
                id="input_nombreDelSesion"
                maxLength="10"
                onChange={({ target }) => settipoSesion(target.value)}
                required
              />
            </div>        
            <div>
              <label htmlFor="input_nombreDelSesion">Tipo de sesion HH:</label>
              <input
               style={{ textTransform: "uppercase" }}
               placeholder="Escriba tipo HH de Sesion"
               value={tipoSesionHH || ""}
                type="text"
                className="form-control"
                name="input_nombreDelSesion"
                id="input_nombreDelSesion"
                maxLength="12"
                onChange={({ target }) => settipoSesionHH(target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="input_nombreDelSesion">Duracion de la sesion:</label>
              <input
               style={{ textTransform: "uppercase" }}
               placeholder="Escriba la duración de la Sesion"
               value={duracionSesionHH || ""}
                type="double"
                className="form-control"
                name="input_nombreDelSesion"
                id="input_nombreDelSesion"
                onChange={({ target }) => setduracionSesionHH(target.value)}
                required
              />
            </div>        

            <div>
              <label htmlFor="input_Pais">Ramo:</label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => setidServicio(target.value)}
              >
                {listRamo.map((valor) => (
                  <option
                    selected={valor.idRamo === idRamo ? "selected" : ""}
                    value={valor.idRamo}
                  >
                    {valor.nomRamo}
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

export default EditarSesion;
