# 📚 Front-end Livraria

Aplicação **Front-end** desenvolvida em **React com Vite**, que implementa telas de **Login**, **Cadastro de Usuário** e **Catálogo de Livros**, realizando integração com APIs através do **Axios**.  
O projeto segue **boas práticas de componentização**, **organização de código**, **consumo de dados externos** e **navegação com React Router**.

---

## 🚀 Tecnologias

- ⚛️ [React](https://reactjs.org/) — Biblioteca para criação de interfaces
- ⚡ [Vite](https://vitejs.dev/) — Ferramenta de build e desenvolvimento rápido
- 🌐 [Axios](https://axios-http.com/) — Cliente HTTP para consumo de APIs
- 🧭 [React Router DOM](https://reactrouter.com/en/main) — Gerenciamento de rotas e navegação
- 💻 [JavaScript / JSX](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- 🔔 [React Toastify](https://fkhadra.github.io/react-toastify/introduction) — Notificações de sucesso/erro

---

## 📌 Funcionalidades

✅ Tela de **Login** com autenticação via **e-mail e senha**  
✅ Tela de **Cadastro** com campos: **nome, e-mail, senha e tipo de usuário**  
✅ Página principal com **Navbar** para navegação entre rotas  
✅ Listagem de **livros cadastrados** vinda diretamente do **Back-end**  
✅ Exibição de **notificações amigáveis** (sucesso/erro) com React Toastify  
✅ Estrutura de **componentes reutilizáveis** para melhor organização do projeto  
✅ Integração com o Back-End [📦 Projeto Livraria](https://github.com/Giovana-bit/projetoLivraria)

---

## 🖼️ Telas do sistema

### 🔑 Login
- Autenticação do usuário com **e-mail e senha**
- Exibição de mensagens de sucesso ou erro
- Redirecionamento para o catálogo após login bem-sucedido

### 📝 Cadastro
- Formulário de criação de usuário
- Campos obrigatórios: **nome**, **e-mail**, **senha** e **tipo de usuário**
- Feedback visual via notificações de sucesso ou erro

### 📚 Catálogo
- Página principal exibindo **todos os autores cadastrados** no sistema
- Dados carregados do **back-end** via Axios
- Layout responsivo e organizado
- Exibição apenas dos dados do banco, sem necessidade de recarregar a página

### 📚 Catálogo de Livros

- Exibe todos os livros cadastrados no back-end
- Layout responsivo
- Atualização automática sem recarregar a página

### ✨ **📌 NOVAS FUNCIONALIDADES**

#### ➕ **Adicionar Livro**

- Nova tela/formulário para cadastrar livros no sistema
- Integração via Axios com o endpoint de criação
- Notificações de sucesso/erro
- Atualização automática da lista após adicionar

#### ⭐ **Explorar → Livros em Destaque**

- Botão **Explorar** agora redireciona para uma página contendo **livros destacados**
- Exibição de cards com livros recomendados/destaques
- Dados carregados da API
- Página totalmente integrada ao fluxo de navegação

### 🧭 Navbar
- Componente fixo de navegação entre as páginas **Login**, **Cadastro** e **Catálogo**
- Implementado com **React Router DOM**
- Design simples e funcional

---