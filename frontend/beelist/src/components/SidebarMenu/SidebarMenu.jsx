import React from "react";
import "./SidebarMenu.css";

export default function SidebarMenu({ open, onClose, nome }) {
  return (
    <div className={`sidebar-menu ${open ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="profile-mini">
        <img src="/src/assets/images/perfil.png" alt="Perfil" className="profile-img" />
        <span className="profile-name">{nome}</span>
      </div>
      {/* Adicione outros itens do menu aqui */}
    </div>
  );
}