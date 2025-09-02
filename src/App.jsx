import React, { useState } from "react";
import "./App.css";
import api from "./services/api";

function Login() {
  // estados para armazenar os valores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // função para capturar alterações no input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "senha") {
      setPassword(value);
    }
  };

  // função de login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };

      const { data } = await api.post("/login", payload);

      alert(data.response);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.response);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://github.com/Giovana-bit/Biblioteca-da-meia-noite-/blob/main/images/logo.png?raw=true"
          alt="Logo"
          className="login-logo"
        />
        <form onSubmit={handleLogin}>
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
            placeholder="Informe sua senha"
            value={password}
            onChange={handleChange}
          />

          <button type="submit">Acessar</button>
        </form>
        <p className="signup-text">
          Não tem conta? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

export default Login;