import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: senha }),
    });

    const data = await response.json();

    if (response.status === 200) {
      navigate('/menu');
    } else {
      setMessage(data.message || 'Erro desconhecido');
    }
  };

  return (
    <div className="login-container">
      <img src="/src/img/BeeListLogoAmarelo.png" alt="Logo BeeList" className="BeeListLogoAmarelo" />
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
  );
};

export default Login;
