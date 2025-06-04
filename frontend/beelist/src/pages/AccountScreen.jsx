import React from "react";
import "./AccountScreen.css";

const AccountScreen = () => {
  return (
    <div className="account-container">
      <div className="back-button"><img src="/src/assets/images/Return.png" alt="Logo Beelist" className="Logo" /></div>

      <h1 className="account-title">Conta</h1>

      <div className="account-options">
        <button className="account-button">
        <img src="/src/assets/images/Queen.png" alt="Logo Beelist" className="Logo" /> Obter BeeList Pro
        </button>
        <button className="account-button">
        <img src="/src/assets/images/Logout.png" alt="Logo Beelist" className="Logo" /> Sair da conta
        </button>
        <button className="account-button">
        <img src="/src/assets/images/Email.png" alt="Logo Beelist" className="Logo" /> Nos contate
        </button>
      </div>
    </div>
  );
};

export default AccountScreen;
