import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import '../../index.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Conexão com Back
    // const response = await fetch('http://localhost:5000/api/usuarios/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password: senha }),
    // });
    

    // const data = await response.json();

    // if (response.status === 200) {
    //   navigate('/inicio');
    // } else {
    //   setMessage(data.message || 'Erro desconhecido');
    // }

    navigate('/inicio');
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/src/assets/images/BeeListLogo.png" alt="Logo Beelist" className="BeeListLogo" />
        <h1 className="slogan">
          <span>Organize seu <img className="Logo" src="/src/assets/images/globo-emoji.png" alt="emoji globo terrestre" /></span><br />
          como uma <br />
          <span>Colmeia <img src="/src/assets/images/abelha.png" alt="abelha" className="Logo" /></span>
        </h1>
        <p className="descricao">
          BeeList, seu app de gerenciamento<br />
          de tarefas eficiente e organizado,<br />
          assim como as abelhas.
        </p>
      </div>

      <div className="right-side">
        <div className="login-container">
          <img src="/src/assets/images/BeeListLogoAmarelo.png" alt="Logo BeeList" className="BeeListLogoAmarelo" />
          <div className="login-box">
            <h2 className="login-title">Login</h2>

            <form onSubmit={handleSubmit}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <a href="#" className="forgot">Esqueceu a senha?</a>

              <button type="submit" className="login-btn">Entrar</button>
            </form>

            {message && <p className="login-message">{message}</p>}
          </div>
          <button
            className="register-btn"
            onClick={() => navigate('/cadastro')}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
