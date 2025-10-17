import React, { useState, useEffect } from "react";
import axios from "axios";
import "./editProfile.css";
import { toast } from "react-toastify";

function EditProfile() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoUser: "funcao",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3333/users/${userId}`)
        .then((response) => setUser(response.data))
        .catch(() => toast.error("Erro ao carregar dados do perfil."));
    }
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.tipoUser === "funcao") {
      toast.warn("Selecione uma função válida!");
      return;
    }

    try {
      await axios.put(`http://localhost:3333/users/${userId}`, user);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2>Editar Perfil</h2>
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/account-white-icon.png"
          alt="Editar Perfil"
          className="edit-logo"
        />

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome de Usuário</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={user.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={user.senha}
            onChange={handleChange}
            required
          />

          <label htmlFor="tipoUser">Função</label>
          <select
            id="tipoUser"
            name="tipoUser"
            value={user.tipoUser}
            onChange={handleChange}
          >
            <option value="comum">Comum</option>
            <option value="admin">Administrador</option>
          </select>

          <button type="submit">Salvar Alterações</button>
        </form>

        <p className="back-text" onClick={() => (window.location.href = "/home")}>
          ← Voltar para Home
        </p>
      </div>
    </div>
  );
}

export default EditProfile;