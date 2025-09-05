import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import api from "../../services/api";

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

      const { data } = await api.post("/register", payload);

      alert(data.response);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.response);
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
    </div>
  );
}

export default Register;
