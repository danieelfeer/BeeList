import HamburguerMenu from "../../components/HamburguerMenu/HamburguerMenu";
import { IoIosArrowBack } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa"; // Adicione este import
import { useState, useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Tarefa } from "../../components/Tarefa/Tarefa"; // Componente atualizado para suportar arrastar
import "./CriarLista.css";
import api from "../../api/axios";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu"; 

export default function CriarLista() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState("");
  const [sessoes, setSessoes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const nomeUsuario = localStorage.getItem("nomeUsuario") || "Usuário";

  useEffect(() => {
    if (id) {
      api.get(`/listas/${id}`)
        .then((response) => {
          const lista = response.data;
          console.log('Lista carregada:', lista); 
          console.log('Sessoes:', lista.sessoes); // Verificar se sessoes existem
          lista.sessoes.forEach(sessao => console.log(`Tarefas da sessão "${sessao.titulo}":`, sessao.tarefas));
  
          setTitulo(lista.nome);
          setSessoes(lista.sessoes || []);
        })
        .catch((error) => {
          console.error("Erro ao carregar lista:", error);
        });
    }
  }, [id]);
  

  const adicionarSessao = () => {
    setSessoes([...sessoes, { nome: "", tarefas: [] }]);
  };

  const adicionarTarefa = (index) => {
    const novasSessoes = [...sessoes];
    novasSessoes[index].tarefas.push({
      id: Date.now().toString(),
      titulo: "",
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
      const dados = {
        nome: titulo,
        sessoes: sessoes.map((sessao) => ({
          titulo: sessao.titulo,
          tarefas: sessao.tarefas.map((tarefa) => ({
            titulo: tarefa.titulo,
            concluida: tarefa.concluida || false,
          })),
        })),
      };

      if (id) {
        // Se estamos editando, fazemos um PUT para atualizar
        await api.put(`/listas/${id}`, dados);
        console.log("ID da lista:", id);
        console.log("Dados enviados para atualização:", dados);

        alert("Lista atualizada com sucesso!");
      } else {
        // Se estamos criando uma nova lista, fazemos um POST
        await api.post("/listas", dados);
        alert("Lista criada com sucesso!");
      } 
      
      navigate("/inicio"); // Navega para a página inicial após o salvamento

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
        {/* Botão hambúrguer no topo direito */}
        <button
          className="hamburguer-btn"
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            marginRight: "3rem",
            marginTop: "5rem",
            cursor: "pointer"
          }}
        >
          <FaBars size={40} color="#ffc400" />
        </button>
        {/* Menu lateral */}
        <SidebarMenu open={menuOpen} onClose={() => setMenuOpen(false)} nome={nomeUsuario} />
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
                        titulo={tarefa.titulo}
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
