
// src/components/ProdutoCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ProdutoCard({ produto, onAdicionarAoCarrinho }) {
  if (!produto) return null; // Proteção contra produto undefined

  return (
    <div className="produto-card">
      <Link to={`/produto/${produto.id}`}>
        <img src={produto.imageUrl} alt={produto.nome} />
        <h3>{produto.nome}</h3>
      </Link>
      <p>{(produto.descricao || '').toString().substring(0, 70)}...</p>
      <p className="price">R$ {produto.preco?.toFixed(2)}</p>
      <button onClick={() => onAdicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProdutoCard;