import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import TelaCadastro from './pages/Cadastro/TelaCadastro';
import Inicio from './pages/Inicio/Inicio';
import CriarLista from './pages/CriarLista/CriarLista';
import Conta from './pages/conta/Conta';
import Perfil from './pages/conta/Perfil';
import BeelistPro from './pages/conta/BeelistPro';
import Onboarding from './pages/Onboarding/Onboarding';
import UpgradePro from './pages/UpgradePro/UpgradePro'; // Certifique-se de que este caminho está correto


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/beelist-pro" element={<BeelistPro />} />
        <Route path="/criar-lista" element={<CriarLista />} />
        <Route path="/criar-lista/:id" element={<CriarLista />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/UpgradePro" element={<UpgradePro />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
