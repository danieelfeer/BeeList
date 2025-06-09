import HamburguerMenu from "../../components/HamburguerMenu/HamburguerMenu";
import { IoIosArrowBack } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Tarefa } from "../../components/Tarefa/Tarefa"; // Componente atualizado para suportar arrastar
import "./CriarLista.css";
import api from "../../api/axios";

export default function CriarLista() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [sessoes, setSessoes] = useState([]);

  const adicionarSessao = () => {
    setSessoes([...sessoes, { nome: "", tarefas: [] }]);
  };

  const adicionarTarefa = (index) => {
    const novasSessoes = [...sessoes];
    novasSessoes[index].tarefas.push({
      id: Date.now().toString(),
      title: "",
      isOpen: false,
      autoFocus: true, // Aqui passamos que a tarefa recém-adicionada deve receber foco
    });
    setSessoes(novasSessoes);
  };


  const atualizarTarefa = (sessaoIndex, tarefaId, updates) => {
    setSessoes((prevSessoes) =>
      prevSessoes.map((sessao, sIndex) =>
        sIndex === sessaoIndex
          ? {
            ...sessao,
            tarefas: sessao.tarefas.map((tarefa) =>
              tarefa.id === tarefaId ? { ...tarefa, ...updates } : tarefa
            ),
          }
          : sessao
      )
    );
  };

  const removerTarefa = (sessaoIndex, tarefaId) => {
    setSessoes((prevSessoes) =>
      prevSessoes.map((sessao, sIndex) =>
        sIndex === sessaoIndex
          ? { ...sessao, tarefas: sessao.tarefas.filter((tarefa) => tarefa.id !== tarefaId) }
          : sessao
      )
    );
  };



  const toggleTarefa = (sessaoIndex, tarefaId) => {
    setSessoes((prevSessoes) =>
      prevSessoes.map((sessao, sIndex) =>
        sIndex === sessaoIndex
          ? {
            ...sessao,
            tarefas: sessao.tarefas.map((tarefa) =>
              tarefa.id === tarefaId ? { ...tarefa, isOpen: !tarefa.isOpen } : tarefa
            ),
          }
          : sessao
      )
    );
  };

  const handleDragEnd = (sessaoIndex, event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSessoes((prevSessoes) =>
      prevSessoes.map((sessao, sIndex) =>
        sIndex === sessaoIndex
          ? {
            ...sessao,
            tarefas: arrayMove(
              sessao.tarefas,
              sessao.tarefas.findIndex((t) => t.id === active.id),
              sessao.tarefas.findIndex((t) => t.id === over.id)
            ),
          }
          : sessao
      )
    );
  };

  const salvarLista = async () => {
    try {
      // Prepara os dados para enviar ao backend
      const dados = {
        nome: titulo,
        sessoes: sessoes.map(sessao => ({
          titulo: sessao.titulo,  // Certifique-se de que esse valor não seja null ou undefined
          tarefas: sessao.tarefas.map(tarefa => ({
            titulo: tarefa.title,
            concluida: tarefa.concluida || false,
          })),
        })),
      };


      const response = await api.post("/listas", dados);
      alert("Lista salva com sucesso!");
      navigate("/inicio"); // Navega para a página inicial após o salvamento bem-sucedido
      // Limpar ou navegar após o salvamento
    } catch (error) {
      alert("Erro ao salvar lista");
      console.error(error);
    }
  };

  return (
    <div className="criar-lista">
      <div className="topo">
        <button className="botao-voltar" onClick={() => navigate("/inicio")}>
          <IoIosArrowBack size={60} color="#ffc400" />
        </button>
      </div>

      <main className="main-criar-lista">
        <div className="titulo-container">
          <input
            type="text"
            placeholder="Título Lista"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="titulo-input"
          />
          <LuPencilLine size={24} className="lapis-icone" />
        </div>

        <button className="botao-criar-sessao" onClick={adicionarSessao}>
          <IoAddOutline size={40} className="icone-botao" /> Criar nova Sessão
        </button>
        <button className="botao-salvar" onClick={salvarLista}>
          Salvar Lista
        </button>

        <div className="sessoes">
          {sessoes.map((sessao, index) => (
            <div key={index} className="sessao">
              <input
                type="text"
                placeholder="Nome da Sessão"
                className="sessao-input"
                value={sessao.titulo} // Vincule ao estado correto
                onChange={(e) => {
                  const novaSessao = [...sessoes];
                  novaSessao[index].titulo = e.target.value; // Atualiza o título da sessão
                  setSessoes(novaSessao); // Atualiza o estado
                }}
              />


              <button className="botao-adicionar-tarefa" onClick={() => adicionarTarefa(index)}>
                <IoAddOutline size={24} color="#ffc400" /> Adicionar Tarefa
              </button>

              <DndContext onDragEnd={(event) => handleDragEnd(index, event)}>
                <SortableContext items={sessao.tarefas.map((tarefa) => tarefa.id)}>
                  <div className="tarefas">
                    {sessao.tarefas.map((tarefa) => (
                      <Tarefa
                        key={tarefa.id}
                        tarefa={tarefa}
                        atualizarTarefa={(id, updates) => atualizarTarefa(index, id, updates)}
                        removerTarefa={(id) => removerTarefa(index, id)}
                        autoFocus={tarefa.autoFocus || false} // Passamos o autoFocus para o componente
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
