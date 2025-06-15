import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import api from "../../api/axios"; // Certifique-se que seu endpoint está certo
import "./Perfil.css";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    telefone: ""
  });

  useEffect(() => {
    // Substitua por um endpoint real que busque o usuário logado
    api.get("/usuarios/me")
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do usuário", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = () => {
    // Atualize o usuário com PUT ou PATCH
    api.put("/usuarios/me", usuario)
      .then(() => {
        alert("Dados atualizados com sucesso!");
        navigate("/inicio");
      })
      .catch((err) => {
        console.error("Erro ao atualizar dados", err);
        alert("Erro ao atualizar dados.");
      });
  };

  const handleSair = () => {
    // Remover token, limpar sessão, etc.
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="perfil-container">
      <div className="topo">
        <button className="botao-voltar" onClick={() => navigate("/Conta")}>
          <IoIosArrowBack size={60} color="#ffc400" />
        </button>
      </div>

      <div className="perfil-form">
        <h2>Perfil do Usuário</h2>

        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
        />

        <label>Telefone:</label>
        <input
          type="text"
          name="telefone"
          value={usuario.telefone}
          onChange={handleChange}
        />

        <button className="botao-salvar" onClick={handleSalvar}>
          <LuPencilLine size={20} /> Salvar alterações
        </button>

        <button className="botao-sair" onClick={handleSair}>
          Sair da conta
        </button>
      </div>
    </div>
  );
}
