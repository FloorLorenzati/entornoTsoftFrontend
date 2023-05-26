import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";


export const PrivateRoute = ({
  children,
  redirectTo = "/homeColaboradores",
}) => {
  const { isLoading, isLogged } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  if (isLogged) {
    if (
      userData.nomRol === "administrador" ||
      userData.nomRol === "capital_humano"
    ) {
      return children ? children : <Outlet></Outlet>;
    } else if (
      userData.nomRol === null ||
      userData.nomRol === "" ||
      userData.nomRol === "colaborador"
    ) {
      return <Navigate to={redirectTo}></Navigate>;
    }
  } else if (isLoading) {
    return (
      <h1>ERROR</h1>
    );
  } else if (!userData) {
    return <Navigate to={"/login"}></Navigate>;
  }
};
