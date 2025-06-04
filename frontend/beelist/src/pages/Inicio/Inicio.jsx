import React, { useState } from "react";
import "./Inicio.css";

const Inicio = () => {
  const [openList, setOpenList] = useState(null);

  const toggleList = (listName) => {
    setOpenList(openList === listName ? null : listName);
  };

  return (
    <div className="container-inicio">
      <img src="/src/assets/images/abelha.png" alt="Logo Beelist" className="Logo" />
      <header>
        <div className="logo">
          <span>≣</span>
          <span>List</span>
        </div>
        <div className="profile-icon">👤</div>
      </header>

      <main>
        {/* Lista de compras */}
        <div className="list">
          <div className="list-header" onClick={() => toggleList("compras")}>
            <span className="drag-icon">⋮⋮⋮</span>
            <button className="list-button">
              Lista de compras {openList === "compras" ? "▴" : "▾"}
            </button>
          </div>
          {openList === "compras" && (
            <div className="list-content">
              <p className="section-title">Itens</p>
              <ul>
                <li>Arroz</li>
                <li>Feijão</li>
                <li>Macarrão</li>
              </ul>
            </div>
          )}
        </div>

        {/* Lista de presentes */}
        <div className="list">
          <div className="list-header" onClick={() => toggleList("presentes")}>
            <span className="drag-icon">⋮⋮⋮</span>
            <button className="list-button">
              Lista de presentes {openList === "presentes" ? "▴" : "▾"}
            </button>
          </div>
          {openList === "presentes" && (
            <div className="list-content">
              <p className="section-title">Presentes</p>
              <ul>
                <li>Camisa</li>
                <li>Perfume</li>
                <li>Relógio</li>
              </ul>
            </div>
          )}
        </div>

        {/* Lista de farmácia */}
        <div className="list">
          <div className="list-header" onClick={() => toggleList("farmacia")}>
            <span className="drag-icon">⋮⋮⋮</span>
            <button className="list-button">
              Farmácia {openList === "farmacia" ? "▴" : "▾"}
            </button>
          </div>
          {openList === "farmacia" && (
            <div className="list-content">
              <p className="section-title">Remédios</p>
              <ul>
                <li>Paracetamol</li>
                <li>Ibuprofeno</li>
                <li>Loratadina</li>
                <li>Dipirona</li>
              </ul>
            </div>
          )}
        </div>

        {/* Botão de adicionar */}
        <div className="add-button">+</div>
      </main>
    </div>
  );
};

export default Inicio;
