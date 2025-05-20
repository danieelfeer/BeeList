import React from 'react';
import Login from './components/Login';
import './index.css';

const App = () => {
  return (
    
    
    <div className="container">
      <div className="left-side">
        <img src="/src/img/BeeListLogo.png" alt="Logo Beelist" className="BeeListLogo" />
        <h1 className="slogan">
          Organize seu 🌍<br />
          <h1 className="slogan1">
          como uma <br />
          <strong>Colmeia <img src="/src/img/abelha.png" alt="Logo Beelist" className="Logo" /></strong>
          </h1>
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
  );
};

export default App;
