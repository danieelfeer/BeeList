import { TiPlus } from "react-icons/ti";

export default function BotaoAdicionar({ onClick, width = "80px", height = "70px" }) {
  return (
    <div className="button-container">
      <div
        className="add-button"
        onClick={onClick}
        style={{ width, height }}
      >
        <TiPlus color="black" size={50} />
      </div>
    </div>
  );
}
