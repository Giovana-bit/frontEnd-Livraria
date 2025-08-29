import React, { useState } from "react";
import "./Login.css";

function Login() {
  // estado para armazenar o valor digitado
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // função para capturar alterações no input
  const handleChange = (e) => {
    // e.target.value -> valor digitado no input
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "senha") {
      setSenha(e.target.value);
    }
  };

  // só para testar
  const handleSubmit = (e) => {
    e.preventDefault();
        
    alert(`OK`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://github.com/Giovana-bit/Biblioteca-da-meia-noite-/blob/main/images/logo.png?raw=true"
          alt="Logo"
          className="login-logo"
        />
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Informe seu email"
            value={email}
            onChange={handleChange} // evento
          />

          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            placeholder="Informe sua senha"
            value={senha}
            onChange={handleChange} // evento
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