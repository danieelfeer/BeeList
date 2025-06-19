import React from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function ProfileScreen({ perfil }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/conta");
  };

  const handleEdit = () => {
    navigate("/editar-perfil");
  };

  return (
    <div className="screen-wrapper">
      <div className="profile-container">
        <button className="back-button" onClick={handleBack}>
          ← Voltar
        </button>

        <div className="profile-header">
          <img
            className="profile-avatar"
            src="/src/assets/images/mat.png"
            alt="Foto do usuário"
          />
          <h1 className="profile-name">{perfil.nome}</h1>
          <p className="profile-email">{perfil.email}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">Listas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">139</span>
            <span className="stat-label">Itens</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10%</span>
            <span className="stat-label">Completos</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-button" onClick={handleEdit}>
            Editar Perfil
          </button>
          <button className="edit-button" onClick={() => navigate("/inicio")}>
            Minhas Listas
          </button>
          <button className="logout-button" onClick={() => navigate("/login")}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
