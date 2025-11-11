import React from "react";
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <h1>Biblioteca Online</h1>
            <ul>
                <li><a href="/">Início</a></li>
                <li><a href="/authors">Autores</a></li>
                <li><a href="/books">Livros</a></li>
            </ul>
        </nav>
    );
}

export default NavBar;