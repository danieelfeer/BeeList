import { useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";
import "./Tarefa.css";

export function Tarefa({ tarefa, atualizarTarefa, removerTarefa, autoFocus }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: tarefa.id });
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="tarefa">
      <span className="drag-handle" {...listeners} {...attributes}>
        <RiDraggable color="#ffc400" size={40} />
      </span>

      <div className="tarefa-header">
        <input
          type="checkbox"
          checked={tarefa.concluida || false}
          onChange={() => atualizarTarefa(tarefa.id, { concluida: !tarefa.concluida })}
          className="checkbox-tarefa"
        />

        <input
          type="text"
          ref={inputRef}
          value={tarefa.titulo || ""}
          placeholder="Nova Tarefa"
          onChange={(e) => atualizarTarefa(tarefa.id, { titulo: e.target.value })}
          className={`tarefa-input ${tarefa.concluida ? "concluida" : ""}`}
        />

        <button className="tarefa-button" onClick={() => removerTarefa(tarefa.id)}>
          <FaTrashAlt size={24} className="icone-lixeira" />
        </button>
      </div>
    </div>
  );
}
