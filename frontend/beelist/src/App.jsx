import React from 'react';
import Login from './components/Login';

const App = () => {
  return (
    <center>
    <div id="bemvindo">
    <img src="/src/img/abelha.png" alt="Logo Beelist" width="300" />
      <h1 id="BIENVENIDO"><span id="abe">Bem-</span>vindo <span id="abe">a</span>o <span id="abe">Bee</span>list!</h1>
      <Login />
    </div>
    </center>
  );
};

export default App;
