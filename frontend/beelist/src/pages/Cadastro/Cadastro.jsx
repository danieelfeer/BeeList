import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [telefone, setTelefone] = useState('');
  return (
    <div className="cadastro-wrapper">
      <img src="/src/assets/images/BeeListLogo.png" alt="Logo BeeList" className="BeeListLogoCadastro1" />
      <div className="cadastro-container">
        <h2>Cadastro</h2>
        <form className="formCadastro">
          <label className="labelCadastro" htmlFor="nome">Nome Completo</label>
          <input className="inputCadastro" type="text" id="nome" name="nome" required />

          <label className="labelCadastro" htmlFor="email">E-mail</label>
          <input className="inputCadastro" type="email" id="email" name="email" required />

          <label className="labelCadastro" htmlFor="data-nascimento">Data de Nascimento</label>
          <input className="inputCadastro" type="date" id="data" name="data-nascimento" required />

          <label className="labelCadastro" htmlFor="senha">Senha</label>
          <input className="inputCadastro" type="password" id="senha" name="senha" required />

          <button className="buttonCadastro" type="submit">Cadastre-se</button>

          <Link to="/" className="TelaInicialCadastro">Tela inicial</Link>  
        </form>
      </div>
    </div>
  );
};

export default Cadastro;