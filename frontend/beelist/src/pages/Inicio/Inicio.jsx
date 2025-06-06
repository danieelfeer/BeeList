import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { defaultLists } from "./data";
import { SortableList } from "./SortableList";
import BotaoAdicionar from "../../components/BotaoAdicionar/BotaoAdicionar";
import { MdAccountCircle } from "react-icons/md";
import "./Inicio.css";

export default function Inicio() {
  const navigate = useNavigate(); // Criando função de navegação
  const [lists, setLists] = useState(defaultLists);
  const [openLists, setOpenLists] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));

  const toggleList = (listId) => {
    setOpenLists((prev) => prev.includes(listId) ? prev.filter((id) => id !== listId) : [...prev, listId]);
  };

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = lists.findIndex((list) => list.id === active.id);
      const newIndex = lists.findIndex((list) => list.id === over.id);
      setLists((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <div className="container-inicio">
      <header className="header-inicio">
        <img src="/src/assets/images/BeeList-Logo.svg" alt="Logo BeeList" className="beelist-logo" />

        <MdAccountCircle
          className="account-icon"
          size={55}
          onClick={() => navigate("/conta")}
        />
      </header>
      <main>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={lists.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            {lists.map((list) => (
              <SortableList key={list.id} list={list} isOpen={openLists.includes(list.id)} toggleList={toggleList} />
            ))}
          </SortableContext>
        </DndContext>
        <BotaoAdicionar onClick={() => navigate("/criar-lista")} />
      </main>
    </div>
  );
}
