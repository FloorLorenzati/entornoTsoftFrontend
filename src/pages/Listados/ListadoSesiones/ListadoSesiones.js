import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { useRoute } from "wouter";

import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Header from "../../../templates/Header/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../TablasStyles.css";
import InsertarSesion from "../../../templates/forms/Insertar/InsertarSesiones";
import EditarSesion from "../../../templates/forms/Editar/EditarSesiones";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoSesion() {
  const [, params] = useRoute("/listadoSesiones/:params");
  const [Sesion, setSesion] = useState([""]);
  const [isActiveInsertSesion, setIsActiveInsertSesion] = useState(false);
  const [isActiveEditSesion, setIsActiveEditSesion] = useState(false);
  const [idSesion, setidSesion] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);

  const [idCurso, setidCurso] = useState("");
  const [idRamo, setidRamo] = useState(params.params);

  const [listCurso, setlistCurso] = useState([""]);
  const [listRamo, setlistRamo] = useState([""]);

  const nombreTabla = "sesion";
  function obtenerCurso() {
    const url = "pages/auxiliares/listadoCursoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistCurso(response)
    );
  }
  function obtenerRamo() {
    const url = "pages/auxiliares/listadoRamoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) => setlistRamo(response));
  }
  function insertarSesion() {
    setIsActiveInsertSesion(!isActiveInsertSesion);
  }
  function editarSesion(ID) {
    setIsActiveEditSesion(!isActiveEditSesion);
    setidSesion(ID);
  }

  function desactivar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "pages/cambiarEstado/cambiarEstado.php";
        var operationUrl = "cambiarEstado";
        var data = {
          idRegistro: ID,
          usuarioModificacion: userData.usuario,
          nombreTabla: nombreTabla,
        };
        SendDataService(url, operationUrl, data).then((response) => {
          const { successEdited } = response[0];
          TopAlerts(successEdited);
        });
      }
    });
  }
  useEffect(
    function () {
      handleChangePaginador();
      obtenerRamo();
      obtenerCurso();
    },
    [num_boton, cantidadPorPagina,idRamo,idCurso]
  );

  //PAGINADOR ---------------------
  function handleChangePaginador() {
    var url = "pages/listados/listadoSesiones.php";
    var operationUrl = "listadoSesiones";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
      idRamo:idRamo,
      idCurso,idCurso
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setSesion(datos.datos);
    });
  }
  //PAGINADOR ---------------------

  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Listado de Sesiones</h1>
          <h6 style={{color:'gray'}}>Factory Devops {'->'} Listado de Sesiones</h6>
          <br></br>

          <div id="selectPaginador">
            <Button id="btn" onClick={insertarSesion}>
              Crear Sesión
            </Button>
            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadR">Cantidad registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_CantidadR"
                id="input_CantidadR"
                onChange={({ target }) => {
                  setcantidadPorPagina(target.value);
                  setNumBoton(1);
                }}
                required
              >
                <option hidden value="">
                  {cantidadPorPagina}
                </option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadR">Cursos: </label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => {setidCurso(target.value);setNumBoton(1); }}
              >
                <option hidden value="" selected>
                  Desplegar lista
                </option>
                <option value="">Todos</option>
                {listCurso.map((valor) => (
                  <option value={valor.idCurso}>{valor.nomCurso}</option>
                ))}
              </select>
            </div>
            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadR">Ramos: </label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => {setidRamo(target.value);setNumBoton(1); }}
              >
                <option hidden value="" selected>
                  Desplegar lista
                </option>
                <option value="">Todos</option>
                {listRamo.map((valor) => (
                  <option value={valor.idRamo}>{valor.nomRamo}</option>
                ))}
              </select>
            </div>
          </div>
          <InsertarSesion
            isActiveSesion={isActiveInsertSesion}
            cambiarEstado={setIsActiveInsertSesion}
            sesion={Sesion}
          ></InsertarSesion>

          <EditarSesion
            isActiveEditSesion={isActiveEditSesion}
            cambiarEstado={setIsActiveEditSesion}
            idSesion={idSesion}
            setSesion={setSesion}
            Sesion={Sesion}
            nombreTabla={nombreTabla}
          ></EditarSesion>

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>N° Sesión</th>
                <th>Sesión</th>
                <th>Tipo</th>
                <th>Tipo HH</th>
                <th>Duración HH</th>
                <th>Ramo</th>
                <th>Curso</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {Sesion.map((Sesion) => (
                <tr key={Sesion.idSesion}>
                  <td align="right" width={1}>
                    {Sesion.idSesion}</td>
                    <td align="right" width={100}>
                    {Sesion.nroSesion}</td>
                  <td>{Sesion.nomSesion}</td>
                  <td>{Sesion.tipoSesion}</td>
                  <td>{Sesion.tipoSesionHH}</td>
                  <td align="right" width={120}>
                    {Sesion.duracionSesionHH}
                  </td>
                  <td>{Sesion.nomRamo}</td>
                  <td>{Sesion.nomCurso}</td>


                  <td>
                    <button
                      title="Editar Sesion"
                      id="OperationBtns"
                      onClick={() => editarSesion(Sesion.idSesion)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    <Link to={`/listadoCursoAlumnoSesion/${Sesion.idSesion}`} >
                      <button title="Asistencia relacionadas" id="OperationBtns">
                        <HiEye id="icons" />
                      </button>
                    </Link>
                    <button
                      title="Desactivar Sesion"
                      onClick={() => desactivar(Sesion.idSesion)}
                      id="OperationBtns"
                    >
                      <BsFillTrashFill id="icons" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginador
            paginas={cantidadPaginas}
            cambiarNumero={setNumBoton}
            num_boton={num_boton}
          ></Paginador>
        </div>
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
