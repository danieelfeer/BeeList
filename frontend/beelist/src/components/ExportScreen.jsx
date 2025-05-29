import React from "react";
import "./ExportScreen.css";

const ExportScreen = () => {
  return (
    <div className="export-container">
      <div className="export-options">
        <button className="export-button">
        <img src="/src/img/PDF.png" alt="Logo Beelist" className="Logo" /> Exportar como .pdf <img src="/src/img/Queen.png" alt="Logo Beelist" className="Logo" />
        </button>
        <button className="export-button">
        <img src="/src/img/Excel.png" alt="Logo Beelist" className="Logo" /> Exportar como .xls <img src="/src/img/Queen.png" alt="Logo Beelist" className="Logo" />
        </button>
        <button className="export-button">
        <img src="/src/img/Print.png" alt="Logo Beelist" className="Logo" /> Imprimir lista <img src="/src/img/Queen.png" alt="Logo Beelist" className="Logo" />
        </button>
      </div>

      <div className="export-pro">
      <img src="/src/img/Queen.png" alt="Logo Beelist" className="Logo" /> Obter BeeList Pro
      </div>

      <hr className="export-divider" />

      <button className="delete-button">
      <img src="/src/img/Trash.png" alt="Logo Beelist" className="Logo" /> Deletar lista
      </button>
    </div>
  );
};

export default ExportScreen;