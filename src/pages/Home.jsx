
// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { mockProdutos } from '../data';
import ProdutoCard from '../components/ProdutoCard';


// src/pages/Home.jsx
function Home({ onAdicionarAoCarrinho }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'https://4gqf3khn5m.execute-api.us-east-1.amazonaws.com/v1/products'; // URL real da API
  
  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- CHAMADA REAL À API GATEWAY PARA LISTAR PRODUTOS ---
        // Esta chamada tentará buscar os produtos do seu API Gateway.
        const response = await fetch(`${API_BASE_URL}`); // Não é necessário /products aqui, pois a URL já termina em /products
        if (!response.ok) {
          throw new Error(`Erro ao buscar produtos da API: ${response.statusText}`);
        }
        const data = await response.json();
        setProdutos(data);

      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError("Não foi possível carregar os produtos do servidor. Usando dados de demonstração.");
        // Fallback para dados mockados em caso de erro na API
        const savedProducts = localStorage.getItem('adminProdutos');
        setProdutos(savedProducts ? JSON.parse(savedProducts) : mockProdutos);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <div className="container">Carregando produtos...</div>;
  if (error) return <div className="container" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container">
      <h2>Produtos Disponíveis</h2>
      <div className="grid-produtos">
        {produtos.map(produto => (
          <ProdutoCard key={produto.id} produto={produto} onAdicionarAoCarrinho={onAdicionarAoCarrinho} />
        ))}
      </div>
    </div>
  );
}


export default Home;