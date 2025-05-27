import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Cadastro = () => {
  const [telefone, setTelefone] = useState('');
  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
        <img src="/src/img/BeeListLogoAmarelo.png" alt="Logo BeeList" className="BeeListLogoAmarelo" />
      <form>
        <label htmlFor="nome">Nome Completo</label>
        <input type="text" id="nome" name="nome" required />

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" required />

         <label htmlFor="data-nascimento">Data de Nascimento</label>
        <input type="date" id="data" name="data-nascimento" required />

        <label htmlFor="telefone">Telefone</label>
        <PhoneInput
          country={'br'}
          value={telefone}
          onChange={setTelefone}
          inputProps={{
            name: 'telefone',
            required: true,
            autoFocus: false
          }}
        />

        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" name="senha" required />

      <Link to="/" className="">Tela inicial</Link>  

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;