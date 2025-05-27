import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
import './TelaCadastro.css';


const TelaCadastro = () => (
  <div className="container">
    <div className="left-side">
      <img src="/src/img/BeeListLogoAmarelo.png" alt="Logo Beelist" className="BeeListLogo" />
      <h1 className="slogan">
        <span>Cadastrar<img className="Logo"/></span><br />
      
      </h1>
      <p className="descricao">
        Já possui uma conta? <Link to="/">Faça login</Link>
      </p>
    </div>
    <div className="right-side">
   
    </div>
  </div>
);

export default TelaCadastro;