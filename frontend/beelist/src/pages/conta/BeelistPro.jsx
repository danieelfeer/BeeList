import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import "./BeelistPro.css";

const BeelistPro = () => {
  const navigate = useNavigate();

  const handleAssinar = () => {
    alert("Assinatura Pro ativada com sucesso!");
    // Aqui você pode integrar com backend, Stripe, etc.
    navigate("/inicio");
  };

  return (
    <div className="pro-container">
      <div className="top-bar">
        <button onClick={() => navigate("/conta")} className="back-buttonLogo">
          <MdArrowBack size={36} className="Logo" />
        </button>
      </div>

      <h1 className="pro-title">BeeList Pro</h1>

      <div className="pro-benefits">
        <h2>🌟 Benefícios da versão Pro:</h2>
        <ul>
          <li>✅ Crie listas ilimitadas</li>
          <li>✅ Temas personalizados</li>
          <li>✅ Backup automático</li>
          <li>✅ Suporte prioritário</li>
          <li>✅ Widgets na tela inicial</li>
        </ul>
      </div>

      <button className="assinar-button" onClick={handleAssinar}>
        Assinar por R$ 9,90/mês
      </button>
    </div>
  );
};

export default BeelistPro;
