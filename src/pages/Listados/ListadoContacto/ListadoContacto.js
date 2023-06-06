import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Header from "../../../templates/Header/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../TablasStyles.css";
import InsertarContacto from "../../../templates/forms/Insertar/InsertarContacto";
import EditarContacto from "../../../templates/forms/Editar/EditarContacto";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoContacto() {
  const [contacto, setContacto] = useState([""]);
  const [isActiveInsertContacto, setIsActiveInsertContacto] = useState(false);
  const [idContacto, setidContacto] = useState(null);
  const [isActiveEditContacto, setIsActiveEditContacto] = useState(false);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);
  const nombreTabla= "contacto"

  function insertarContacto() {
    setIsActiveInsertContacto(!isActiveInsertContacto);
  }
  function editarContacto(ID) {
    setIsActiveEditContacto(!isActiveEditContacto);
    setidContacto(ID);
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
          const { paginador, ...datos } = data;
          setCantidadPaginas(paginador.cantPaginas);
          setContacto(datos.datos);
          console.log(data);
            });
      }
    });
  }
  useEffect(
    function () {
      handleChangePaginador();
    },
    [num_boton,cantidadPorPagina]
  );

  //PAGINADOR ---------------------
  function handleChangePaginador() {
    var url = "pages/listados/listadoContactos.php";
    var operationUrl = "listadoContactos";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setContacto(datos.datos);
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
          <h1 id="TitlesPages">Listado de contactos</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarContacto}>
            Crear Contacto
          </Button>

            <div className="form-group" id="btn2">
              <label htmlFor="input_MostrarR">Mostrar registros: </label>
              <select
                value={cantidadPorPagina || ""}
                className="form-control"
                name="input_MostrarR"
                id="input_MostrarR"
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
          </div>

          <InsertarContacto
            isActiveContacto={isActiveInsertContacto}
            cambiarEstado={setIsActiveInsertContacto}
            contacto={contacto}
          ></InsertarContacto>

          <EditarContacto
            isActiveEditContacto={isActiveEditContacto}
            cambiarEstado={setIsActiveEditContacto}
            idContacto={idContacto}
            setContacto={setContacto}
            contacto={contacto} 
            nombreTabla={nombreTabla}
          ></EditarContacto> 

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Fecha inico</th>
                <th>Fecha fin</th>
                <th>Nombre del servicio</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {contacto.map((contacto) => (
                <tr key={contacto.idContacto}>
                  <td>{contacto.idContacto}</td>
                  <td>{contacto.nomContacto}</td>
                  <td>{contacto.correoContacto}</td>
                  <td>{contacto.telefonoContacto}</td>
                  <td>{contacto.fechaIni}</td>
                  <td>{contacto.fechaFin}</td>
                  <td>{contacto.nomServicio}</td>
                  <td>
                    <button
                      title="Editar contacto"
                      id="OperationBtns"
                      onClick={() => editarContacto(contacto.idContacto)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>
                    {/* <button title="Examinar contacto" id="OperationBtns">
                      <HiEye id="icons" />
                    </button> */}
                    <button
                      title="Desactivar contacto"
                      onClick={() => desactivar(contacto.idContacto)}
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
