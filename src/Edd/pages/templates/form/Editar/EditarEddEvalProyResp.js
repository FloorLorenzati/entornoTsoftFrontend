// import React, { useState, useEffect } from "react";
// import "../Insertar/Insertar.css";
// import SendDataService from "../../../../../services/SendDataService";
// import getDataService from "../../../../../services/GetDataService";
// import TopAlerts from "../../../../../templates/alerts/TopAlerts";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useCallback } from "react";

// const EditarEDDEvalProyResp = ({
//   isActiveEditEDDEvalProyResp,
//   cambiarEstado,
//   idEDDEvalProyResp,
//   EDDEvalProyResp,
//   setEDDEvalProyResp,
//   nombreTabla,
// }) => {
//   // ----------------------CONSTANTES----------------------------
//   const [respuesta, setrespuesta] = useState("");

//   const [idEDDEvalPregunta, setidEDDEvalPregunta] = useState("");
//   const [idEDDEvalRespPreg, setidEDDEvalRespPreg] = useState("");
//   const [idEDDEvalProyEmp, setidEDDEvalProyEmp] = useState("");
//   const [idEDDEvaluacion, setidEDDEvaluacion] = useState("");
//   const [idEDDProyEmp, setidEDDProyEmp] = useState("");

//   const [listEDDEvaluacion, setlistEDDEvaluacion] = useState([""]);
//   const [listEDDProyEmp, setlistEDDProyEmp] = useState([""]);

//   const [listEDDEvalPregunta, setlistEDDEvalPregunta] = useState([""]);
//   const [listEDDEvalRespPreg, setlistEDDEvalRespPreg] = useState([""]);
//   const [listEDDEvalProyEmpleado, setlistEDDEvalProyEmpleado] = useState([""]);

//   const [responseID, setResponseID] = useState([""]);
//   const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
//   const listEDDEvalProyResp = EDDEvalProyResp;

//   const show = isActiveEditEDDEvalProyResp;

//   const handleClose = () => {
//     cambiarEstado(false);
//     setrespuesta(responseID[0].respuesta);

//     setidEDDEvalPregunta(responseID[0].idEDDEvalPregunta);
//     setidEDDEvalRespPreg(responseID[0].idEDDEvalRespPreg);
//     setidEDDEvalProyEmp(responseID[0].idEDDEvalProyEmp);
//     setidEDDEvaluacion(responseID[0].idEDDEvaluacion);
//     setidEDDProyEmp(responseID[0].idEDDProyEmp);
//   };

//   // ----------------------FUNCIONES----------------------------
//   function obtenerEvaluacion() {
//     const url = "pages/auxiliares/listadoEddEvaluacion.php";
//     const operationUrl = "listados";
//     getDataService(url, operationUrl).then((response) =>
//       setlistEDDEvaluacion(response)
//     );
//   }
//   function obtenerEDDProyEmp() {
//     const url = "pages/auxiliares/listadoEddProyEmp.php";
//     const operationUrl = "listados";
//     getDataService(url, operationUrl).then((response) =>
//       setlistEDDProyEmp(response)
//     );
//   }
//   function obtenerEvalProyectoEmpleado() {
//     const url = "pages/auxiliares/listadoEddEvalProyEmp.php";
//     const operationUrl = "listados";
//     getDataService(url, operationUrl).then((response) =>
//       setlistEDDEvalProyEmpleado(response)
//     );
//   }

//   function obtenerEvalRespPreg() {
//     const url = "pages/auxiliares/listadoEddEvalRespPreg.php";
//     const operationUrl = "listados";
//     getDataService(url, operationUrl).then((response) =>
//       setlistEDDEvalRespPreg(response)
//     );
//   }
//   function obtenerEvalPregunta() {
//     const url = "pages/auxiliares/listadoEddEvalPregunta.php";
//     const operationUrl = "listados";
//     getDataService(url, operationUrl).then((response) =>
//       setlistEDDEvalPregunta(response)
//     );
//   }

//   const getData = useCallback(() => {
//     const url = "pages/seleccionar/seleccionarDatos.php";
//     const operationUrl = "seleccionarDatos";
//     var data = { idRegistro: idEDDEvalProyResp, nombreTabla: nombreTabla };
//     SendDataService(url, operationUrl, data).then((response) => {
//       console.log(response);
//       setResponseID(response);
//       setrespuesta(response[0].respuesta);
//       setidEDDEvalPregunta(response[0].idEDDEvalPregunta);
//       setidEDDEvalRespPreg(response[0].idEDDEvalRespPreg);
//       setidEDDEvalProyEmp(response[0].idEDDEvalProyEmp);
//       setidEDDEvaluacion(response[0].idEDDEvaluacion);
//       setidEDDProyEmp(response[0].idEDDProyEmp);
//     });
//   }, [idEDDEvalProyResp]);

//   function SendData(e) {
//     e.preventDefault();
//     var url = "pages/editar/editarEddEvalProyResp.php";
//     var operationUrl = "editarEddEvalProyResp";
//     var data = {
//       usuarioModificacion: userData.usuario,
//       idEDDEvalProyResp: idEDDEvalProyResp,
//       respuesta: respuesta === "" ? responseID[0].respuesta : respuesta,
//       idEDDEvalPregunta:
//         idEDDEvalPregunta === ""
//           ? responseID[0].idEDDEvalPregunta
//           : idEDDEvalPregunta,
//       idEDDEvalRespPreg:
//         idEDDEvalRespPreg === ""
//           ? responseID[0].idEDDEvalRespPreg
//           : idEDDEvalRespPreg,
//       idEDDEvalProyEmp:
//       idEDDEvalProyEmp === ""
//           ? responseID[0].idEDDEvalProyEmp
//           : idEDDEvalProyEmp,
//       idEDDEvaluacion:
//         idEDDEvaluacion === ""
//           ? responseID[0].idEDDEvaluacion
//           : idEDDEvaluacion,
//       idEDDProyEmp:
//         idEDDProyEmp === "" ? responseID[0].idEDDProyEmp : idEDDProyEmp,

//       isActive: true,
//     };

//     SendDataService(url, operationUrl, data).then((response) => {
//       TopAlerts("successEdited");
//       actualizarEDDEvalProyResp(EDDEvalProyResp);

//     });

//     function actualizarEDDEvalProyResp(EDDEvalProyResp) {
//       const nuevosEDDEvalProyResp = listEDDEvalProyResp.map((c) =>
//         c.idEDDEvalProyResp === EDDEvalProyResp.idEDDEvalProyResp
//           ? EDDEvalProyResp
//           : c
//       );
//       setEDDEvalProyResp(nuevosEDDEvalProyResp);
//     }
//   }

//   useEffect(
//     function () {
//       if (idEDDEvalProyResp !== null) {
//         getData();
//         obtenerEvalProyectoEmpleado();
//         obtenerEvalRespPreg();
//         obtenerEvalPregunta();
//         obtenerEDDProyEmp();
//         obtenerEvaluacion();
//       }
//     },
//     [idEDDEvalProyResp]
//   );

//   // ----------------------RENDER----------------------------
//   return (
//     <>
//       <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
//         <Modal.Header closeButton>
//           <Modal.Title>Editar Eval proy resp</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={SendData}>
//             <div className="form-group">
//               <label htmlFor="input_Evaluacion">Evaluación:</label>
//               <select
//                 required
//                 className="form-control"
//                 name="input_Evaluacion"
//                 id="input_Evaluacion"
//                 placeholder="Seleccione la Evaluación"
//                 onChange={({ target }) => setidEDDEvaluacion(target.value)}
//               >
//                 {listEDDEvaluacion.map((valor) => (
//                   <option
//                     selected={
//                       valor.idEDDEvaluacion === idEDDEvaluacion
//                         ? "selected"
//                         : ""
//                     }
//                     value={valor.idEDDEvaluacion}
//                   >
//                     {valor.nomEvaluacion}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="input_Evaluacion">Proyecto Empleado:</label>
//               <select
//                 required
//                 className="form-control"
//                 name="input_Evaluacion"
//                 id="input_Evaluacion"
//                 placeholder="Seleccione el Proyecto + Empleado"
//                 onChange={({ target }) => setidEDDProyEmp(target.value)}
//               >
//                 {listEDDProyEmp.map((valor) => (
//                   <option
//                     selected={
//                       valor.idEDDProyEmp === idEDDProyEmp ? "selected" : ""
//                     }
//                     value={valor.idEDDProyEmp}
//                   >
//                     {valor.nomProyEmp}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label htmlFor="input_nombreDelEDDEvalPregunta">Respuesta:</label>
//               <input
//                 style={{ textTransform: "uppercase" }}
//                 placeholder="Escriba respuesta"
//                 type="text"
//                 className="form-control"
//                 name="input_nombreDelEDDEvalPregunta"
//                 id="input_nombreDelEDDEvalPregunta"
//                 value={respuesta || ""}
//                 maxLength="500"
//                 onChange={({ target }) => setrespuesta(target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="input_Evaluacion">
//                 Evaluación Proyectyo Empleado:{" "}
//               </label>
//               <select
//                 required
//                 className="form-control"
//                 name="input_Evaluacion"
//                 id="input_Evaluacion"
//                 placeholder="Seleccione la Evaluación + Proyectyo + Empleado"
//                 onChange={({ target }) => setidEDDEvalProyEmp(target.value)}
//               >
//                 {listEDDEvalProyEmpleado.map((valor) => (
//                   <option
//                     selected={
//                       valor.idEDDEvalProyEmp === idEDDEvalProyEmp
//                         ? "selected"
//                         : ""
//                     }
//                     value={valor.idEDDEvalProyEmp}
//                   >
//                     {valor.nomEvalProyEmp}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="input_proyemp">Pregunta: </label>
//               <select
//                 required
//                 className="form-control"
//                 name="input_proyemp"
//                 id="input_proyemp"
//                 placeholder="Seleccione la Pregunta"
//                 onChange={({ target }) => setidEDDEvalPregunta(target.value)}
//               >
//                 {listEDDEvalPregunta.map((valor) => (
//                   <option
//                     selected={
//                       valor.idEDDEvalPregunta === idEDDEvalPregunta
//                         ? "selected"
//                         : ""
//                     }
//                     value={valor.idEDDEvalPregunta}
//                   >
//                     {valor.nomPregunta}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="input_proyemp">RespPregunta: </label>
//               <select
//                 required
//                 className="form-control"
//                 name="input_proyemp"
//                 id="input_proyemp"
//                 placeholder="Seleccione la RespPregunta"
//                 onChange={({ target }) => setidEDDEvalRespPreg(target.value)}
//               >
//                 {listEDDEvalRespPreg.map((valor) => (
//                   <option
//                     selected={
//                       valor.idEDDEvalRespPreg === idEDDEvalRespPreg
//                         ? "selected"
//                         : ""
//                     }
//                     value={valor.idEDDEvalRespPreg}
//                   >
//                     {valor.nomRespPreg}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <Button
//               variant="secondary"
//               type="submit"
//               id="btn_registrar"
//               value="Registrar"
//             >
//               Registrar
//             </Button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default EditarEDDEvalProyResp;
