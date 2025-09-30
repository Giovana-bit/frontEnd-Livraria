import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/users";
import Home from "./components/home";
import Admin from "./components/admin";
import List from "./components/list";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão -> Login */}
        <Route path="/" element={<Login />} />

        {/* Rota do cadastro */}
        <Route path="/register" element={<Register />} />

        {/* Rota do home */}
        <Route path="/home" element={<Home />} />

        {/* Rota do admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Rota do listar */}
        <Route path="/list" element={<List />} />
      </Routes>

      {/* ToastContainer deve ficar fora das rotas */}
      <ToastContainer />
    </Router>
  );
}

export default App;