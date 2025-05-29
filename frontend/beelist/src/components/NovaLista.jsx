import React, { useState } from 'react';
import './NovaLista.css';

const NovaLista = () => {
  const [listas, setListas] = useState([{ nome: '', itens: [''] }]);

  const handleNomeChange = (index, value) => {
    const novasListas = [...listas];
    novasListas[index].nome = value;
    setListas(novasListas);
  };

  const handleItemChange = (listaIndex, itemIndex, value) => {
    const novasListas = [...listas];
    novasListas[listaIndex].itens[itemIndex] = value;
    setListas(novasListas);
  };

  const adicionarItem = (index) => {
    const novasListas = [...listas];
    novasListas[index].itens.push('');
    setListas(novasListas);
  };

  const adicionarLista = () => {
    setListas([...listas, { nome: '', itens: [''] }]);
  };

  return (
    <div className="nova-lista-container">
      <img src="/src/img/abelha.png" alt="Logo Beelist" className="Logo" />

      <h2>Nova Lista</h2>

      {listas.map((lista, listaIndex) => (
        <div key={listaIndex} className="lista-box">
          <input
            type="text"
            placeholder="Nome da lista"
            value={lista.nome}
            onChange={(e) => handleNomeChange(listaIndex, e.target.value)}
            className="nome-lista-input"
          />

          {lista.itens.map((item, itemIndex) => (
            <input
              key={itemIndex}
              type="text"
              placeholder={`Item ${itemIndex + 1}`}
              value={item}
              onChange={(e) =>
                handleItemChange(listaIndex, itemIndex, e.target.value)
              }
              className="item-input"
            />
          ))}

          <button
            onClick={() => adicionarItem(listaIndex)}
            className="btn-adicionar-item"
          >
            +
          </button>
        </div>
      ))}

      <div className="botoes-acao">
        <button onClick={adicionarLista} className="btn-adicionar-lista">
          + Nova Lista
        </button>
        <button className="btn-salvar">Salvar</button>
      </div>
    </div>
  );
};

export default NovaLista;