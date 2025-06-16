import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nome = e.target.nome.value;
    const email = e.target.email.value;
    const dataNascimento = e.target['data-nascimento'].value;
    const senha = e.target.senha.value;

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, dataNascimento, senha }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage('Usuário cadastrado com sucesso!');
        setTimeout(() => navigate('/'), 1500); // Redireciona para login após 1,5s
      } else {
        setMessage(data.error || data.message || 'Erro ao cadastrar.');
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="cadastro-wrapper">
      <div className="logo-cadastro">
        <img src="/src/assets/images/BeeListLogo.png" alt="Logo BeeList" className="BeeListLogoCadastro1" />
      </div>
      <div className="cadastro-container">
        <h2>Cadastro</h2>
        <form className="formCadastro" onSubmit={handleSubmit}>
          <label className="labelCadastro" htmlFor="nome">Nome Completo</label>
          <input className="inputCadastro" type="text" id="nome" name="nome" required />

          <label className="labelCadastro" htmlFor="email">E-mail</label>
          <input className="inputCadastro" type="email" id="email" name="email" required />

          <label className="labelCadastro" htmlFor="data-nascimento">Data de Nascimento</label>
          <input className="inputCadastro" type="date" id="data" name="data-nascimento" required />

          <label className="labelCadastro" htmlFor="senha">Senha</label>
          <input className="inputCadastro" type="password" id="senha" name="senha" required />

          <button className="buttonCadastro" type="submit">Cadastre-se</button>
          {message && <p className="cadastro-message">{message}</p>}

          <Link to="/Login" className="TelaInicialCadastro">Tela inicial</Link>  
        </form>
      </div>
    </div>
  );
};

export default Cadastro;