import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AccountScreen.css";
import { MdArrowBack } from "react-icons/md";

// Remova ou comente esta linha:
// const { user, logout } = useAuth();

const Conta = () => {
  const navigate = useNavigate();

  // Se não tem autenticação, remova também o useEffect relacionado ao user
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  return (
    <div className="account-container">
    <div className="back-button">
      <button onClick={() => navigate('/inicio')} className="back-buttonLogo">
        <MdArrowBack size={36} className="Logo" />
      </button>
    </div>

      <h1 className="account-title">Conta</h1>

      <div className="account-options">
        <button className="account-button" onClick={() => navigate('/perfil')}>
          <img src="/src/assets/images/Email.png" alt="Logo Beelist" className="Logo" /> Meu Perfil
        </button>
        <button className="account-button" onClick={() => navigate('/UpgradePro')}>
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

export default Conta;