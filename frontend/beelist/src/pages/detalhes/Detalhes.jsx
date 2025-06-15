import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import api from "../../api/axios";
import "./DetalhesTarefa.css";

export default function DetalhesTarefa() {
  const { idLista, idTarefa } = useParams();
  const navigate = useNavigate();

  const [tarefa, setTarefa] = useState({ titulo: "", descricao: "", concluida: false });

  useEffect(() => {
    api.get(`/listas/${idLista}`)
      .then((res) => {
        const lista = res.data;
        let tarefaEncontrada = null;

        lista.sessoes.forEach((sessao) => {
          const encontrada = sessao.tarefas.find((t) => t.id === idTarefa);
          if (encontrada) tarefaEncontrada = encontrada;
        });

        if (tarefaEncontrada) {
          setTarefa(tarefaEncontrada);
        } else {
          alert("Tarefa não encontrada");
          navigate("/inicio");
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar tarefa:", err);
        alert("Erro ao buscar tarefa");
      });
  }, [idLista, idTarefa, navigate]);

  const atualizarTarefa = () => {
    api.put(`/tarefas/${idTarefa}`, tarefa)
      .then(() => {
        alert("Tarefa atualizada com sucesso!");
        navigate(-1); // volta para a tela anterior
      })
      .catch((err) => {
        console.error("Erro ao atualizar tarefa:", err);
        alert("Erro ao atualizar tarefa");
      });
  };

  return (
    <div className="detalhes-tarefa">
      <div className="topo">
        <button className="botao-voltar" onClick={() => navigate(-1)}>
          <IoIosArrowBack size={60} color="#ffc400" />
        </button>
      </div>

      <main className="main-detalhes">
        <div className="titulo-container">
          <input
            type="text"
            value={tarefa.titulo}
            onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })}
            className="titulo-input"
          />
          <LuPencilLine size={24} className="lapis-icone" />
        </div>

        <textarea
          className="descricao-textarea"
          placeholder="Adicione uma descrição..."
          value={tarefa.descricao || ""}
          onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={tarefa.concluida}
            onChange={(e) => setTarefa({ ...tarefa, concluida: e.target.checked })}
          />
          Marcar como concluída
        </label>

        <button className="botao-salvar" onClick={atualizarTarefa}>
          Salvar Alterações
        </button>
      </main>
    </div>
  );
}
