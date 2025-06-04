import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

export function SortableList({ list, isOpen, toggleList }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: list.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="list">
      <div className="list-header">
        {/* Ícone de arraste */}
        <span className="drag-handle" {...listeners} {...attributes}>
          <MdDragIndicator size={28}/>
        </span>
        <button className="list-button" onClick={() => toggleList(list.id)}>
          {list.title} {isOpen ? "▴" : "▾"}
        </button>
      </div>
      {isOpen && (
        <div className="list-content">
          <p className="section-title">Itens</p>
          <ul>{list.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
