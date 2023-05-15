import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthState from "./context/AuthContext";
import { PrivateRoute } from "../src/hooks/PrivateRoute";

import HomePage from "./pages/home/Homepage";
import Login from "./pages/login/login";

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<Login />} path="/Login"></Route>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />}></Route>
          </Route> 

        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
