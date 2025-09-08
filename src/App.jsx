import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
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
      </Routes>

      {/* ToastContainer deve ficar fora das rotas */}
      <ToastContainer />
    </Router>
  );
}

export default App;
