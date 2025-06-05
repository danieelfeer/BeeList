import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import './SortableList.css'

export function SortableList({ list, isOpen, toggleList }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: list.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="list">
      <span className="drag-handle" {...listeners} {...attributes}>
          <RiDraggable color="#ffc400" size={40} />
      </span>
      <div className="list-header">

        <button className="list-button" onClick={() => toggleList(list.id)}>
          <div className="list-title">
            {list.title}
            {isOpen ? <IoIosArrowUp size={30} color="#ffc400" /> : <IoIosArrowDown size={30} color="#ffc400" />}
          </div>
          
          {/* Movendo a list-content para dentro do botão */}
          {isOpen && (
            <div className="list-content">
              <p className="section-title">Itens</p>
              <ul>
                {list.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}


