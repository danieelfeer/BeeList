import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

const slides = [
  {
    titulo: "Organize sua vida 🌍",
    subtitulo: "Com a eficiência de uma Colmeia 🐝",
    descricao: "A BeeList ajuda você a organizar tarefas, metas e prioridades de forma simples e intuitiva.",
    imagem: "/src/assets/images/slade1.png",
  },
  {
    titulo: "Crie listas personalizadas ✅",
    subtitulo: "Planeje tudo, do trabalho ao mercado",
    descricao: "Separe tarefas por categoria, adicione prazos e receba lembretes. Sua rotina no controle!",
    imagem: "/src/assets/images/slade2.png",
  },
  {
    titulo: "Acompanhe seu progresso 📊",
    subtitulo: "Visualize conquistas e conclua metas",
    descricao: "Com gráficos e indicadores, você monitora seu desempenho e se mantém motivado todos os dias.",
    imagem: "/src/assets/images/slade3.png",
  },
];

export default function Onboarding() {
  const [slideAtual, setSlideAtual] = useState(0);
  const navigate = useNavigate();

  const proximoSlide = () => {
    if (slideAtual < slides.length - 1) {
      setSlideAtual(slideAtual + 1);
    } else {
      navigate("/Login");
    }
  };

  return (
    <div className="onboarding-main">
      <div className="onboarding-left">
        <img
          src="/src/assets/images/BeeListLogo.png"
          alt="Logo BeeList"
          className="logo"
        />
        <h1 className="main-title">{slides[slideAtual].titulo}</h1>
        <h2 className="main-subtitle">{slides[slideAtual].subtitulo}</h2>
        <p className="main-description">{slides[slideAtual].descricao}</p>
        <div className="onboarding-indicators">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === slideAtual ? "active" : ""}`}
            ></span>
          ))}
        </div>
        <button className="onboarding-button" onClick={proximoSlide}>
          {slideAtual === slides.length - 1 ? "Começar agora 🚀" : "Próximo"}
        </button>
        <p className="skip-text" onClick={() => navigate("/Login")}>
          Pular introdução
        </p>
      </div>

      <div className="onboarding-right">
        <img
          src={slides[slideAtual].imagem}
          alt="Slide visual"
          className="onboarding-image"
        />
      </div>
    </div>
  );
}
