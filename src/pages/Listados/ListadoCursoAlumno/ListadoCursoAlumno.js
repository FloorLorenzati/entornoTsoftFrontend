import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useRoute } from "wouter";

import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Header from "../../../templates/Header/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../TablasStyles.css";
import InsertarCursoAlumno from "../../../templates/forms/Insertar/InsertarCursoAlumno";
import EditarCursoAlumno from "../../../templates/forms/Editar/EditarCursoAlumno";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoCursoAlumno() {
  const [, params] = useRoute("/listadoCursoAlumnos/:params");

  const [CursoAlumno, setCursoAlumno] = useState([""]);
  const [isActiveInsertCursoAlumno, setIsActiveInsertCursoAlumno] = useState(false);
  const [idCursoAlumno, setidCursoAlumno] = useState(null);
  const [isActiveEditCursoAlumno, setIsActiveEditCursoAlumno] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);

  const nombreTabla= "cursoalumno"

  const [idAlumno, setidAlumno] = useState(params.params);
  const [idCurso, setidCurso] = useState(params.params);

  const [listAlumno, setlistAlumno] = useState([""]);
  const [listCurso, setlistCurso] = useState([""]);


  function obtenerAlumno() {
    const url = "pages/auxiliares/listadoAlumnoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistAlumno(response)
    );
  }

  function obtenerCurso() {
    const url = "pages/auxiliares/listadoCursoForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
      setlistCurso(response)
    );
  }

  function insertarCursoAlumno() {
    setIsActiveInsertCursoAlumno(!isActiveInsertCursoAlumno);
  }
  function editarCursoAlumno(ID) {
    setIsActiveEditCursoAlumno(!isActiveEditCursoAlumno);
    setidCursoAlumno(ID);
  }

  function desactivar(ID) {
    ConfirmAlert().then((response) => {
      if (response === true) {
        var url = "pages/cambiarEstado/cambiarEstado.php";
        var operationUrl = "cambiarEstado";
        var data = { 
          idRegistro: ID, 
          usuarioModificacion: userData.usuario,
          nombreTabla : nombreTabla,
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
      obtenerCurso();
      obtenerAlumno()
    },
    [num_boton,cantidadPorPagina, idAlumno, idCurso]
  );

  //PAGINADOR ---------------------
  function handleChangePaginador() {
    var url = "pages/listados/listadoCursoAlumno.php";
    var operationUrl = "listadoCursoAlumno";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
      idAlumno:idAlumno,
      idCurso:idCurso
    };console.log(data);
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setCursoAlumno(datos.datos);
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
          <h1 id="TitlesPages">Listado de Cursos Alumnos</h1>
          <h6 style={{color:'gray'}}>Factory Devops {'->'} Listado de Cursos Alumnos</h6>
          <br></br>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarCursoAlumno}>
            Crear Curso Alumno
          </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_CantidadR">Cantidad registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_CantidadR"
                id="input_CantidadR"
                onChange={({ target }) => {setcantidadPorPagina(target.value);setNumBoton(1);
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
                onChange={({ target }) => {setidCurso(target.value);setNumBoton(1);}}
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
              <label htmlFor="input_CantidadR">Alumnos: </label>
              <select
                required
                type="text"
                className="form-control"
                onChange={({ target }) => {setidAlumno(target.value);setNumBoton(1);}}
              >
                <option hidden value="" selected>
                  Desplegar lista
                </option>
                <option value="">Todos</option>
                {listAlumno.map((valor) => (
                  <option value={valor.idAlumno}>{valor.nomAlumno}</option>
                ))}
              </select>
            </div>
          </div>

          <InsertarCursoAlumno
            isActiveCursoAlumno={isActiveInsertCursoAlumno}
            cambiarEstado={setIsActiveInsertCursoAlumno}
            CursoAlumno={CursoAlumno}
          ></InsertarCursoAlumno>

          <EditarCursoAlumno
            isActiveEditCursoAlumno={isActiveEditCursoAlumno}
            cambiarEstado={setIsActiveEditCursoAlumno}
            idCursoAlumno={idCursoAlumno}
            setCursoAlumno={setCursoAlumno}
            CursoAlumno={CursoAlumno} 
            nombreTabla={nombreTabla}
          ></EditarCursoAlumno> 

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Alumno</th>
                <th>Curso</th>
                <th>Fecha incio</th>
                <th>Fecha fin</th>
                <th>Hora inicio</th>
                <th>Hora fin</th>
                <th>Porc asistencia</th>
                <th>Porc participación</th>
                <th>Porc aprobación</th>
                <th>Clase aprobada</th>
                <th>Estado curso</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {CursoAlumno.map((CursoAlumno) => (
                <tr key={CursoAlumno.idCursoAlumno}>
                  <td>{CursoAlumno.idCursoAlumno}</td>
                  <td>{CursoAlumno.nomAlumno}</td>
                  <td>{CursoAlumno.nomCurso}</td>
                  <td>{CursoAlumno.fechaIni}</td>
                  <td>{CursoAlumno.fechaFin}</td>
                  <td>{CursoAlumno.horaIni}</td>
                  <td>{CursoAlumno.horaFin}</td>
                  <td align="right" width={90}>{CursoAlumno.porcAsistencia}</td>
                  <td align="right" width={90}>{CursoAlumno.porcParticipacion}</td>
                  <td align="right" width={90}>{CursoAlumno.porcAprobacion}</td>
                  <td>{CursoAlumno.claseAprobada}</td>
                  <td>{CursoAlumno.estadoCurso}</td>
                  <td>
                    <button
                      title="Editar CursoAlumno"
                      id="OperationBtns"
                      onClick={() => editarCursoAlumno(CursoAlumno.idCursoAlumno)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar CursoAlumno" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar CursoAlumno"
                      onClick={() => desactivar(CursoAlumno.idCursoAlumno)}
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
