import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function EditarPerfil({ perfil, setPerfil }) {
  const navigate = useNavigate();
  const [nome, setNome] = useState(perfil.nome);
  const [email, setEmail] = useState(perfil.email);

  const handleSalvar = () => {
    setPerfil({ nome, email });
    navigate("/perfil");
  };

  const handleCancelar = () => {
    navigate(-1);
  };

  return (
    <div className="screen-wrapper">
      <div className="profile-container">
        <button className="back-button" onClick={handleCancelar}>
          ← Cancelar
        </button>

        <div className="profile-header">
          <h1 className="profile-name">Editar Perfil</h1>
        </div>

        <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
          <label className="edit-label">Nome</label>
          <input
            className="edit-input"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className="edit-label">Email</label>
          <input
            className="edit-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="edit-button" onClick={handleSalvar}>
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
