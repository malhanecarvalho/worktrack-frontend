import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../images/logo.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" />
        <span className="header-title">WorkTrack</span>
      </div>
      <FiMenu className="menu-icon" onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}

      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <FiX className="close-btn" onClick={() => setIsOpen(false)} />
        <ul>
          <li>
            <a href="#">Início</a>
          </li>
          <li>
            <a href="#">Calendário</a>
          </li>
          <li>
            <a href="#">Configurações</a>
          </li>
          <li>
            <a href="#">Sair</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
