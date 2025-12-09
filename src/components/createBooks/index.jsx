import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import "./createBooks.css";

// ======= Funções de conversão =======
function toUSDate(brDate) {
  if (!brDate) return null;
  const [day, month, year] = brDate.split("/");
  return `${year}-${month}-${day}`;
}

function toUSPrice(brPrice) {
  if (!brPrice) return null;

  // remove pontos de milhar e troca vírgula por ponto
  return brPrice.replace(/\./g, "").replace(",", ".");
}

function CreateBooks() {
  const [book_name, setBookName] = useState("");
  const [publication, setPublication] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editorId, setEditorId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "book_name") setBookName(value);

    if (name === "publication") {
      // formata automaticamente dd/mm/aaaa
      let input = value.replace(/\D/g, "");
      if (input.length >= 3 && input.length <= 4)
        input = input.replace(/(\d{2})(\d)/, "$1/$2");
      if (input.length >= 5)
        input = input.replace(/(\d{2})(\d{2})(\d)/, "$1/$2/$3");

      setPublication(input);
    }

    if (name === "pages") setPages(value);

    if (name === "price") {
      // aceita 29,90 / 29.90 / 2990
      let formatted = value.replace(/[^0-9.,]/g, "");
      setPrice(formatted);
    }

    if (name === "categoryId") setCategoryId(value);
    if (name === "editorId") setEditorId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        book_name,
        publication: toUSDate(publication), // 🔥 conversão automática
        pages: Number(pages),
        price: Number(toUSPrice(price)), // 🔥 converte vírgula pra ponto
        categoryId: Number(categoryId),
        editorId: Number(editorId),
      };

      const { data } = await api.post("/book", payload);

      toast.success("Livro cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
      });

      // limpa formulário
      setBookName("");
      setPublication("");
      setPages("");
      setPrice("");
      setCategoryId("");
      setEditorId("");

      console.log("Backend response:", data);

    } catch (error) {
      toast.error("Erro ao cadastrar o livro!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">

        <img 
          src="https://github.com/Giovana-bit/Biblioteca-da-meia-noite-/blob/main/images/logo.png?raw=true"
          alt="Logo Biblioteca da Meia-Noite"
          className="logo-register"
        />

        <h2>Cadastrar Livro</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome do Livro:</label>
          <input
            type="text"
            name="book_name"
            placeholder="Informe o título"
            value={book_name}
            onChange={handleChange}
            required
          />

          <label>Data de Publicação:</label>
          <input
            type="text"
            name="publication"
            placeholder="dd/mm/aaaa"
            maxLength="10"
            value={publication}
            onChange={handleChange}
            required
          />

          <label>Número de páginas:</label>
          <input
            type="number"
            name="pages"
            placeholder="Total de páginas"
            value={pages}
            onChange={handleChange}
            required
          />

          <label>Preço:</label>
          <input
            type="text"
            name="price"
            placeholder="Ex: 29,90"
            value={price}
            onChange={handleChange}
            required
          />

          <label>Categoria:</label>
          <select
            name="categoryId"
            value={categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="1">Romance</option>
            <option value="2">Terror</option>
            <option value="3">Fantasia</option>
            <option value="4">Tecnologia</option>
            <option value="5">Culinária</option>
            <option value="6">História</option>
            <option value="7">Ficção Científica</option>
          </select>

          <label>Editora:</label>
          <select
            name="editorId"
            value={editorId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="1">Editora Rocco</option>
            <option value="2">Editora Globo</option>
            <option value="3">Intrínseca</option>
            <option value="4">Editora Darkside</option>
          </select>

          <button type="submit">Cadastrar Livro</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CreateBooks;