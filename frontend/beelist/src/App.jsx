import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TelaCadastro from './TelaCadastro';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="left-side">
              <img src="/src/img/BeeListLogo.png" alt="Logo Beelist" className="BeeListLogo" />
              <h1 className="slogan">
                <span>Organize seu <img className="Logo" src="/src/img/globo-emoji.png" alt="emoji globo terrestre" /></span><br />
                como uma <br />
                <span>Colmeia <img src="/src/img/abelha.png" alt="Logo Beelist" className="Logo" /></span>
              </h1>
              <p className="descricao">
                BeeList, seu app de gerenciamento<br />
                de tarefas eficiente e organizado,<br />
                assim como as abelhas.
              </p>
            </div>

            <div className="right-side">
              <Login />
            </div>
          </div>
        } />
        <Route path="/cadastro" element={<TelaCadastro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;