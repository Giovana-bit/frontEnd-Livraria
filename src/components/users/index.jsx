import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("comum");

  // capturar alterações
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nome") {
      setNome(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "senha") {
      setPassword(value);
    } else if (name === "tipo") {
      setTypeUser(value);
    }
  };

  // função de cadastro
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, email, password, typeUser };

      const { data } = await api.post("/user", payload);

      toast.success("Cadastro realizado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log("Resposta do backend:", data);

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.response, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Erro ao tentar cadastrar. Tente novamente!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img
          src="https://github.com/Giovana-bit/Biblioteca-da-meia-noite-/blob/main/images/logo.png?raw=true"
          alt="Logo"
          className="register-logo"
        />
        <form onSubmit={handleRegister}>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            placeholder="Informe seu nome"
            value={name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Informe seu email"
            value={email}
            onChange={handleChange}
          />

          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            placeholder="Crie sua senha"
            value={password}
            onChange={handleChange}
          />

          <label>Tipo de Usuário:</label>
          <select name="tipo" value={typeUser} onChange={handleChange}>
            <option value="comum">Comum</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Cadastrar</button>
        </form>
        <p className="login-text">
          Já tem conta? <Link to="/">Fazer login</Link>
        </p>
      </div>

      {/* Container para exibir os toasts */}
      <ToastContainer />
    </div>
  );
}

export default Register;