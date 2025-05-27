import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
import './TelaCadastro.css';


const TelaCadastro = () => (
  <div className="containerCadastro">
    <div className="left-sideCadastro">
      <img src="/src/img/BeeListLogoAmarelo.png" alt="Logo Beelist" className="BeeListLogoCadastro" />
      <h1 className="sloganCadastro">
        <span>Cadastrar<img className="Logo"/></span><br />
      
      </h1>
      <p className="descricaoCadastro">
        Já possui uma conta? <Link to="/">Faça login</Link>
      </p>
    </div>
    <div className="right-sideCadastro">
   
    </div>
  </div>
);

export default TelaCadastro;