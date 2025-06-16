import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./SortableList.css";

export function SortableList({ list, isOpen, toggleList }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: list.id });
  const navigate = useNavigate();

  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleTitleClick = () => {
    // Navega para a página de edição, passando o ID da lista
    navigate(`/criar-lista/${list.id}`);
  };

  return (
    <div ref={setNodeRef} style={style} className="list">
      <span className="drag-handle" {...listeners} {...attributes}>
        <RiDraggable color="#ffc400" size={40} />
      </span>
      <div className="list-header">
        <div className="list-container">
          <div className="list-title">
            <button onClick={handleTitleClick}>{list.titulo}</button>
            <button onClick={() => toggleList(list.id)}>
              {isOpen ? (
                <IoIosArrowUp size={30} color="#ffc400" />
              ) : (
                <IoIosArrowDown size={30} color="#ffc400" />
              )}
            </button>
          </div>

          {isOpen && (
            <div className="list-content">
              <p className="section-title">Sessão</p>
              <ul>
                {list.sessoes.map((sessao) => (
                  <li key={sessao.id || sessao.titulo}>
                    <strong>{sessao.titulo}</strong>
                    <ul>
                      {sessao.tarefas.map((tarefa) => (
                        <li
                          key={tarefa.id}
                          className={tarefa.concluida ? "riscar" : ""}
                        >
                          {tarefa.titulo}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
