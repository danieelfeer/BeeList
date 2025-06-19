import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import TelaCadastro from "./pages/Cadastro/TelaCadastro";
import Inicio from "./pages/Inicio/Inicio";
import CriarLista from "./pages/CriarLista/CriarLista";
import Conta from "./pages/conta/Conta";
import Perfil from "./pages/conta/Perfil";
import BeelistPro from "./pages/conta/BeelistPro";
import Onboarding from "./pages/Onboarding/Onboarding";
import UpgradePro from "./pages/UpgradePro/UpgradePro";
import EditarPerfil from "./pages/conta/EditarPerfil";

const App = () => {
  // Estado global simples para o perfil
  const [perfil, setPerfil] = useState({
    nome: "Abelha",
    email: "abelha@gmail.com",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/conta" element={<Conta />} />

        {/* Passa perfil e setPerfil para as telas Perfil e EditarPerfil */}
        <Route path="/perfil" element={<Perfil perfil={perfil} />} />
        <Route
          path="/editar-perfil"
          element={<EditarPerfil perfil={perfil} setPerfil={setPerfil} />}
        />

        <Route path="/beelist-pro" element={<BeelistPro />} />
        <Route path="/criar-lista" element={<CriarLista />} />
        <Route path="/criar-lista/:id" element={<CriarLista />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/UpgradePro" element={<UpgradePro />} />

        {/* Outras rotas */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;