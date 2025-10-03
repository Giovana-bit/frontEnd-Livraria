import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/users";
import Home from "./components/home";
import Admin from "./components/admin";
import List from "./components/list";
import NotFound from "./components/notFound"
import CreateBooks from "./components/createBooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRouter from "./helpers/protectedRouter";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão -> Login */}
        <Route path="/" 
        element={
        <ProtectedRouter>
        <Login />
        </ProtectedRouter>
        } />

        {/* Cadastro deve estar liberado */}
        <Route path="/register"
        element={
        <ProtectedRouter>
        <Register />
        </ProtectedRouter>
        } />

        {/* Rotas protegidas */}
        <Route
          path="/home"
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRouter>
              <Admin />
            </ProtectedRouter>
          }
        />

        <Route
          path="/createBooks"
          element={
            <ProtectedRouter>
              <CreateBooks />
            </ProtectedRouter>
          }
        />

        <Route
          path="/list"
          element={
            <ProtectedRouter>
              <List />
            </ProtectedRouter>
          }
        />

        <Route
          path="/notFound"
          element={
            <ProtectedRouter>
              < NotFound />
            </ProtectedRouter>
          }
        />
      </Routes>

      {/* ToastContainer deve ficar fora das rotas */}
      <ToastContainer />
    </Router>
  );
}

export default App;