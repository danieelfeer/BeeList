import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import TelaCadastro from './pages/Cadastro/TelaCadastro';
import Inicio from './pages/Inicio/Inicio';
import CriarLista from './pages/CriarLista/CriarLista';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/criar-lista" element={<CriarLista />} />
        <Route path="/criar-lista/:id" element={<CriarLista />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
