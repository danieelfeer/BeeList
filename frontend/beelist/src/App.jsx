import React from 'react';
import Login from './components/Login';
import './index.css';

const App = () => {
  return (
    
    
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
  );
};

export default App;
