import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";

import getDataService from "../../../services/GetDataService";
import SendDataService from "../../../services/SendDataService";
import Header from "../../../templates/Header/Header";
import { BsFillTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import "../TablasStyles.css";
import InsertarServicio from "../../../templates/forms/Insertar/InsertarServicios";
import EditarServicio from "../../../templates/forms/Editar/EditarServicios";
import ConfirmAlert from "../../../templates/alerts/ConfirmAlert";
import TopAlerts from "../../../templates/alerts/TopAlerts";
import Paginador from "../../../templates/Paginador/Paginador";
import Button from "react-bootstrap/Button";
import "../BtnInsertar.css";

export default function ListadoServicio() {
  const [servicio, setServicio] = useState([""]);
  const [isActiveInsertServicio, setIsActiveInsertServicio] = useState(false);
  const [isActiveEditServicio, setIsActiveEditServicio] = useState(false);
  const [idServicio, setidServicio] = useState(null);
  const [num_boton, setNumBoton] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [cantidadPorPagina, setcantidadPorPagina] = useState(10);
  const [cantidadPaginas, setCantidadPaginas] = useState([]);
  // const [idCliente, setidCliente] = useState("");

  const [listCliente, setlistCliente] = useState([""]);

  const nombreTabla= "servicio"

  function obtenerCliente() {
    const url = "pages/auxiliares/listadoClienteForms.php";
    const operationUrl = "listados";
    getDataService(url, operationUrl).then((response) =>
    setlistCliente(response)
    );
  }

  function insertarServicio() {
    setIsActiveInsertServicio(!isActiveInsertServicio);
  }
  function editarServicio(ID) {
    setIsActiveEditServicio(!isActiveEditServicio);
    setidServicio(ID);
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
      obtenerCliente();
    },
    [num_boton,cantidadPorPagina]
  );

  //PAGINADOR ---------------------
  function handleChangePaginador() {
    var url = "pages/listados/listadoServicios.php";
    var operationUrl = "listadoServicios";
    var data = {
      num_boton: num_boton,
      cantidadPorPagina: cantidadPorPagina,
    };
    SendDataService(url, operationUrl, data).then((data) => {
      const { paginador, ...datos } = data;
      setCantidadPaginas(paginador.cantPaginas);
      setServicio(datos.datos);
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
          <h1 id="TitlesPages">Listado de Servicios</h1>

          <div id="selectPaginador">
          <Button id="btn" onClick={insertarServicio}>
            Crear servicio
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
              <label htmlFor="input_CantidadR">Clientes: </label>
              <select
                required
                type="text"
                className="form-control"
                // onChange={({ target }) => setidCurso(target.value)}
              >
                <option hidden value="" selected>
                  Desplegar lista
                </option>
                <option value="">Todos</option>
                {listCliente.map((valor) => (
                  <option value={valor.idCliente}>{valor.nomCliente}</option>
                ))}
              </select>
            </div>
          </div>
          <InsertarServicio
            isActiveServicio={isActiveInsertServicio}
            cambiarEstado={setIsActiveInsertServicio}
            servicio={servicio}
          ></InsertarServicio>

          <EditarServicio
            isActiveEditServicio={isActiveEditServicio}
            cambiarEstado={setIsActiveEditServicio}
            idServicio={idServicio}
            setServicio={setServicio}
            servicio={servicio}
            nombreTabla={nombreTabla}
          ></EditarServicio> 

          <Table id="mainTable" hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del servicio</th>
                <th>Nombre del cliente</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {servicio.map((Servicio) => (
                <tr key={Servicio.idServicio}>
                  <td>{Servicio.idServicio}</td>
                  <td>{Servicio.nomServicio}</td>
                  <td>{Servicio.nomCliente}</td>
                  <td>
                    <button
                      title="Editar Servicio"
                      id="OperationBtns"
                      onClick={() => editarServicio(Servicio.idServicio)}
                    >
                      <RiEditBoxFill id="icons" />
                    </button>

                    <Link to="/listadoContacto">
                      <button title="Contactos relacionados" id="OperationBtns">
                        <HiEye id="icons" />
                      </button>
                    </Link>
                    <button
                      title="Desactivar Servicio"
                      onClick={() => desactivar(Servicio.idServicio)}
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
