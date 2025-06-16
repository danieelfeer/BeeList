import HamburguerMenu from "../../components/HamburguerMenu/HamburguerMenu";
import { IoIosArrowBack } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Tarefa } from "../../components/Tarefa/Tarefa"; // Componente atualizado para suportar arrastar
import "./CriarLista.css";
import api from "../../api/axios";

export default function CriarLista() {
  const navigate = useNavigate();
  const { id } = useParams();

  // O backend espera "titulo" para a lista
  const [titulo, setTitulo] = useState("");
  const [sessoes, setSessoes] = useState([]);

  useEffect(() => {
    if (id) {
      api.get(`/listas/${id}`)
        .then((response) => {
          const lista = response.data;
          console.log("Lista carregada:", lista); 
          console.log("Sessoes:", lista.sessoes); // Verificar se sessoes existem
          lista.sessoes.forEach((sessao) =>
            console.log(`Tarefas da sessão "${sessao.titulo}":`, sessao.tarefas)
          );
  
          // Use o campo "titulo" conforme definido no backend, e não "nome"
          setTitulo(lista.titulo);
          setSessoes(lista.sessoes || []);
        })
        .catch((error) => {
          console.error("Erro ao carregar lista:", error);
        });
    }
  }, [id]);
  
  const adicionarSessao = () => {
    // Cada sessão terá um título vazio e um array de tarefas vazio
    setSessoes([...sessoes, { titulo: "", tarefas: [] }]);
  };

  const adicionarTarefa = (index) => {
    const novasSessoes = [...sessoes];
    novasSessoes[index].tarefas.push({
      id: Date.now().toString(),
      titulo: "",
      isOpen: false,
      autoFocus: true, // A tarefa recém-adicionada recebe foco
      // O backend espera "concluida", inicializando como false se não definido:
      concluida: false,
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
      // Mapeia os dados de acordo com o modelo backend: título e sessões com título e tarefas
      const dados = {
        titulo: titulo, // Use "titulo" em vez de "nome"
        sessoes: sessoes.map((sessao) => ({
          titulo: sessao.titulo,
          tarefas: sessao.tarefas.map((tarefa) => ({
            titulo: tarefa.titulo,
            concluida: tarefa.concluida || false,
          })),
        })),
      };
  
      if (id) {
        // Atualiza a lista existente
        await api.put(`/listas/${id}`, dados);
        console.log("ID da lista:", id);
        console.log("Dados enviados para atualização:", dados);
  
        const listaAtualizada = await api.get(`/listas/${id}`);
        console.log("Lista atualizada:", listaAtualizada.data);
  
        setTitulo(listaAtualizada.data.titulo);
        setSessoes(listaAtualizada.data.sessoes);
  
        alert("Lista atualizada com sucesso!");
      } else {
        // Cria uma nova lista
        await api.post("/listas", dados);
        alert("Lista criada com sucesso!");
      }
  
      navigate("/inicio"); // Redireciona para a página inicial após salvar
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
                value={sessao.titulo}
                onChange={(e) => {
                  const novaSessao = [...sessoes];
                  novaSessao[index].titulo = e.target.value;
                  setSessoes(novaSessao);
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
                        titulo={tarefa.titulo}
                        tarefa={tarefa}
                        atualizarTarefa={(id, updates) => atualizarTarefa(index, id, updates)}
                        removerTarefa={(id) => removerTarefa(index, id)}
                        autoFocus={tarefa.autoFocus || false}
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
