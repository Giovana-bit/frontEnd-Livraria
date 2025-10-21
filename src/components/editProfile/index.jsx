
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./editProfile.css";
import { toast } from "react-toastify";

export default function UserUpdateForm() {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoUser: "funcao",
  });

  const userId = localStorage.getItem("userId");

  // Instância da API
  const api = axios.create({
    baseURL: "http://localhost:3333",
  });

  // Carrega os dados do usuário
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3333/user/${userId}`)
        .then((response) => setUser(response.data))
        .catch(() => toast.error("Erro ao carregar dados do perfil."));
    }
  }, [userId]);

  // Função para salvar a imagem (com JWT)
  async function saveImage(selectedImage) {
    if (!selectedImage) {
      alert("Selecione uma imagem antes de enviar.");
      return;
    }

    try {
      const tokenJWT = sessionStorage.getItem("tokenJwt");
      if (!tokenJWT) {
        alert("Token JWT não encontrado. Faça login novamente.");
        return;
      }

      const formData = new FormData();
      formData.append("uploads", selectedImage);

      await api.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${tokenJWT}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Imagem enviada com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.log("Erro ao enviar a imagem:", error);
      toast.error("Erro ao enviar a imagem. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }

  // Ao clicar na foto
  function handlePhotoClick() {
    document.getElementById("fileInput").click();
  }

  // Ao escolher a imagem
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagemPreview(URL.createObjectURL(file));
      saveImage(file); // envia automaticamente
    }
  }

  // Atualiza campos
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Envia alterações do perfil
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

        {/* Foto de perfil */}
        <div
          className="profile-pic-container"
          onClick={handlePhotoClick}
          title="Clique para alterar a foto"
        >
          <img
            src={
              imagemPreview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Foto de perfil"
            className="profile-pic"
          />
        </div>

        {/* Input escondido */}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: "none" }}
        />

        {/* Formulário */}
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
            required
          >
            <option value="funcao">Selecione...</option>
            <option value="comum">Comum</option>
            <option value="admin">Administrador</option>
          </select>

          <button type="submit">Salvar Alterações</button>
        </form>

        <p
          className="back-text"
          onClick={() => (window.location.href = "/home")}
        >
          ← Voltar para Home
        </p>
      </div>
    </div>
  );
}