import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // <- importar useNavigate
import "./login.css";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <- inicializa o hook

  // capturar alterações
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

      sessionStorage.setItem("tokenJWT", data.token) // Validação do Token

      toast.success("Login efetuado com sucesso!", {
        position: "top-right",
        autoClose: 1500, // reduzido para não demorar muito
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      sessionStorage.setItem("tokenJWT", data.token); // salva token

      console.log("Resposta do backend:", data);

      // redireciona para home após 1,5s (tempo do toast)
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    
    return navigate("/home");

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
        toast.error("Erro ao tentar fazer login. Tente novamente!", {
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
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>

      {/* Container para exibir os toasts */}
      <ToastContainer />
    </div>
  );
}

export default Login;