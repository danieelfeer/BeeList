import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook de navegação
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableList } from "./SortableList";
import BotaoAdicionar from "../../components/BotaoAdicionar/BotaoAdicionar";
import { MdAccountCircle } from "react-icons/md";
import api from "../../api/axios"; // Axios configurado para se comunicar com o backend
import "./Inicio.css";

export default function Inicio() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [openLists, setOpenLists] = useState([]);
  
  // Configurar sensor de arrastar
  const sensors = useSensors(useSensor(PointerSensor));

  // Função para buscar as listas do backend
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await api.get("/listas");
        // A resposta deve ser um array de listas
        setLists(response.data);
        console.log("Listas recebidas:", response.data);
      } catch (error) {
        console.error("Erro ao buscar listas:", error);
      }
    };
    fetchLists();
  }, []); // Executa apenas na montagem do componente

  // Alterna (toggle) a abertura/fechamento de uma lista específica
  const toggleList = (listId) => {
    setOpenLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  // Atualiza a posição das listas utilizando o dnd-kit
  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = lists.findIndex((list) => list.id === active.id);
      const newIndex = lists.findIndex((list) => list.id === over.id);
      setLists((prev) => arrayMove(prev, oldIndex, newIndex));
      // Se necessário, atualize a ordem no backend
    }
  };

  return (
    <div className="container-inicio">
      <header className="header-inicio">
        <img
          src="/src/assets/images/BeeList-Logo.svg"
          alt="Logo BeeList"
          className="beelist-logo"
        />
        <MdAccountCircle
          className="account-icon"
          size={55}
          onClick={() => navigate("/conta")}
        />
      </header>
      <main>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lists.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {lists.map((list) => (
              <SortableList
                key={list.id}
                list={list}
                isOpen={openLists.includes(list.id)}
                toggleList={toggleList}
              />
            ))}
          </SortableContext>
        </DndContext>
        <BotaoAdicionar onClick={() => navigate("/criar-lista")} />
      </main>
    </div>
  );
}
