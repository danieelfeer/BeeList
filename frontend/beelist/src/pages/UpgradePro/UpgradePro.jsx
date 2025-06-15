import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import './UpgradePro.css';

export default function UpgradePro() {
  const navigate = useNavigate();

  const beneficios = [
    {
      titulo: "Backup na Nuvem",
      descricao: "Nunca perca suas listas. Tudo salvo automaticamente e disponível em qualquer dispositivo.",
      icone: "☁️",
    },
    {
      titulo: "Temas Personalizados",
      descricao: "Personalize a interface com cores, fontes e estilos únicos que combinam com você.",
      icone: "🎨",
    },
    {
      titulo: "Colaboração em Tempo Real",
      descricao: "Convide amigos ou colegas para editar listas com você simultaneamente.",
      icone: "🤝",
    },
    {
      titulo: "Suporte Prioritário",
      descricao: "Atendimento rápido e exclusivo para usuários Pro.",
      icone: "⚡",
    },
    {
    titulo: "Criação Ilimitada de Listas",
    descricao: "Crie quantas listas quiser sem limites ou restrições.",
    icone: "📝",
  },
  {
    titulo: "Pastas de Organização",
    descricao: "Agrupe suas listas por categorias ou projetos para manter tudo organizado.",
    icone: "📁",
  },
  {
    titulo: "Lembretes Inteligentes",
    descricao: "Receba notificações com base em horário ou localização.",
    icone: "🔔",
  },
  {
    titulo: "Relatórios de Produtividade",
    descricao: "Veja seu desempenho em gráficos claros e semanais.",
    icone: "📈",
  },
  {
    titulo: "Sugestões com IA",
    descricao: "Deixe a IA te ajudar a lembrar o que importa.",
    icone: "🤖",
  },
  {
    titulo: "Integração com Calendário",
    descricao: "Sincronize com Google Calendar ou Outlook.",
    icone: "📆",
  },
  {
    titulo: "Segurança Avançada",
    descricao: "Tenha mais privacidade e proteção nos seus dados.",
    icone: "🔐",
  },
  {
    titulo: "Anexar Imagens nas Tarefas",
    descricao: "Inclua imagens diretamente em suas tarefas.",
    icone: "🖼️",
  }
  ];

  return (
    <div className="upgrade-container">
      <button className="back-button" onClick={() => navigate("/conta")}>
        <MdArrowBack size={30} />
      </button>

      <h1 className="upgrade-title">BeeList Pro 🐝</h1>
      <p className="upgrade-subtitle">Desbloqueie o máximo da sua produtividade</p>

      <div className="benefits-list">
        {beneficios.map((beneficio, index) => (
          <div className="benefit-item" key={index}>
            <span className="benefit-icon">{beneficio.icone}</span>
            <div>
              <h2>{beneficio.titulo}</h2>
              <p>{beneficio.descricao}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="upgrade-button" onClick={() => alert("Função de upgrade em breve!")}>
        Adquirir BeeList Pro 🚀
      </button>
    </div>
  );
}
