import React, { useState, useEffect } from "react";
import "./editProfile.css";
import { toast } from "react-toastify";
import api from "../../services/api";
import { jwtDecode } from "jwt-decode";

export default function UserUpdateForm() {
  // Estados do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("funcao");
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // ========== Buscar dados do usuário logado ==========
  useEffect(() => {
    async function getUserProfile() {
      try {
        const token = sessionStorage.getItem("tokenJWT");
        if (!token) {
          toast.error("Token JWT não encontrado. Faça login novamente.");
          return;
        }

        // Faz a requisição sem precisar do ID, já que o back usa o e-mail do token
        const { data } = await api.get(`/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Dados do perfil do usuário:", data);
        setEmail(data.users.email || "");
        setUsername(data.users.name || "");
        setPassword(data.users.password || "");
        setRole(data.users.typeUser || "");
        setProfilePhoto(data.profilePhoto?.url_photo_profile || null); 
       } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao buscar perfil do usuário.");
      }
    }

    getUserProfile();
  }, []);

  // ========== Manipula imagem ==========
  function handlePhoto(e) {
    const { files } = e.target;
    if (files && files[0]) {
      const selectedImage = files[0];
      setImagePreview(URL.createObjectURL(selectedImage));
      saveImage(selectedImage);
    }
  }

  // ========== Envia imagem ao servidor ==========
  async function saveImage(selectedImage) {
    try {
      const tokenJWT = sessionStorage.getItem("tokenJWT");
      if (!tokenJWT) {
        toast.error("Token JWT não encontrado. Faça login novamente.");
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
        autoClose: 120,
        theme: "light",
      });
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      toast.error("Erro ao enviar a imagem. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  }

  // ========== Atualiza dados do perfil ==========
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "funcao") {
      toast.warn("Selecione uma função válida!");
      return;
    }

    try {
      const tokenJWT = sessionStorage.getItem("tokenJWT");
      if (!tokenJWT) {
        toast.error("Token JWT não encontrado. Faça login novamente.");
        return;
      }

      const decoded = jwtDecode(tokenJWT);
      const userId = decoded.id || decoded.userId; // caso o nome varie no token

      await api.put(
        `/users`,
        { id: userId, name: username, email, password, typeUser: role },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil.");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2>Editar Perfil</h2>

        {/* Foto de perfil */}
        <div className="profile-pic-container" title="Clique para alterar a foto">
          <label htmlFor="image" className="button-cursor">
            <img
              src={
                imagePreview ||
                profilePhoto ||
                "https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small/simple-user-default-icon-free-png.png"
              }
              alt="Foto de Perfil"
              className="profile-photo"
            />
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handlePhoto}
            />
          </label>
        </div>

        {/* Campos de texto */}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Nome:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Função:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
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