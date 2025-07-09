
import { useParams, useNavigate } from 'react-router-dom';
import { mockProdutos } from '../data';
import React, { useState, useEffect } from 'react';
// src/pages/DetalhesProduto.jsx
function DetalhesProduto({ onAdicionarAoCarrinho }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'https://4gqf3khn5m.execute-api.us-east-1.amazonaws.com/v1'; // URL real da API

  // --- CHAMADA REAL À API GATEWAY PARA OBTER DETALHES DO PRODUTO ---
 useEffect(() => {
    const fetchProdutoDetalhes = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- CHAMADA REAL À API GATEWAY PARA OBTER DETALHES DO PRODUTO ---
        // Esta chamada tentará buscar um produto específico do seu API Gateway.
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Produto não encontrado na API: ${response.statusText}`);
        }
        const data = await response.json();
        setProduto(data);

      } catch (err) {
        console.error("Erro ao carregar detalhes do produto:", err);
        setError("Não foi possível carregar os detalhes do produto do servidor.");
        // Fallback para dados mockados/localStorage em caso de erro
        const savedProducts = localStorage.getItem('adminProdutos');
        const currentProducts = savedProducts ? JSON.parse(savedProducts) : mockProdutos;
        const produtoEncontrado = currentProducts.find(p => p.id === id);
        if (produtoEncontrado) {
          setProduto(produtoEncontrado);
        } else {
          navigate('/'); // Redireciona se o produto não for encontrado nem localmente
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProdutoDetalhes();
  }, [id, navigate]);

  if (loading) return <div className="container">Carregando detalhes do produto...</div>;
  if (error) return <div className="container" style={{ color: 'red' }}>{error}</div>;
  if (!produto) return null; // Não renderiza nada se não há produto (e não está carregando/erro)

  return (
    <div className="container">
      <div className="detalhes-produto">
        <img src={produto.imageUrl} alt={produto.nome} />
        <div className="detalhes-produto-info">
          <h2>{produto.nome}</h2>
          <p className="price">R$ {produto.preco.toFixed(2)}</p>
          <p><strong>Categoria:</strong> {produto.categoria}</p>
          <p><strong>Estoque:</strong> {produto.estoque} unidades</p>
          <p>{produto.descricao}</p>
          <button onClick={() => onAdicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
          <button onClick={() => navigate(-1)} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Voltar</button>
        </div>
      </div>
    </div>
  );
}


export default DetalhesProduto;