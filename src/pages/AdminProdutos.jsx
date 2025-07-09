
// src/pages/AdminProdutos.jsx
import React, { useState, useEffect } from 'react';
import { mockProdutos } from '../data'; // Usaremos para inicializar e simular operações
import Swal from 'sweetalert2'; // Importa SweetAlert2 para diálogos de confirmação
import '../index.css'; // Importa o CSS específico para a página de administração


function AdminProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    id: '', nome: '', descricao: '', preco: 0, categoria: '', estoque: 0, imageUrl: ''
  });
  const [editandoProduto, setEditandoProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const API_BASE_URL = 'https://4gqf3khn5m.execute-api.us-east-1.amazonaws.com/v1'; //URL real da API

  // Função para buscar produtos da "API"
  const fetchProdutos = async () => {
    setLoading(true);
    setError(null);
    try {
      // --- CHAMADA REAL À API GATEWAY PARA LISTAR PRODUTOS ---
      // que buscaria os produtos no DynamoDB.
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos da API.');
      }
      const data = await response.json();
      setProdutos(data);

    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setError("Não foi possível carregar os produtos. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto(prev => ({
      ...prev,
      [name]: name === 'preco' ? (isNaN(parseFloat(value)) ? 0 : parseFloat(value)) 
      : name === 'estoque' ? (isNaN(parseInt(value)) ? 0 : parseInt(value)) 
      : value
    }));
  };
    
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      let response;
      let url = `${API_BASE_URL}/products`;
      let method = 'POST';
      let successMessage = 'Produto adicionado com sucesso!';

      if (editandoProduto) {
        url = `${API_BASE_URL}/products/${editandoProduto.id}`;
        method = 'PUT';
        successMessage = 'Produto atualizado com sucesso!';
      }

      // Garantir que valores numéricos estejam corretos
      const produtoPayload = {
        ...novoProduto,
        preco: isNaN(parseFloat(novoProduto.preco)) ? 0 : parseFloat(novoProduto.preco),
        estoque: isNaN(parseInt(novoProduto.estoque)) ? 0 : parseInt(novoProduto.estoque),
      };

      response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoPayload)
      });

      if (!response.ok) {
        let errorMessage = `Erro HTTP: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (_) { /* erro ao parsear json */ }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (editandoProduto) {
        // Atualiza produto no estado
        setProdutos(produtos.map(p =>
          p.id === editandoProduto.id ? { ...produtoPayload, id: editandoProduto.id } : p
        ));
        setEditandoProduto(null);
      } else {
        // Usa o ID retornado pela API (assumindo que vem como result.productId ou produto completo)
        const novo = {
          ...produtoPayload,
          id: result.productId || result.id || result.idProduto || crypto.randomUUID() // fallback seguro
        };
        setProdutos([...produtos, novo]);
      }

      setMessage(successMessage);
      setNovoProduto({ id: '', nome: '', descricao: '', preco: 0, categoria: '', estoque: 0, imageUrl: '' });

    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      setError(`Erro ao salvar produto: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (produto) => {
    setEditandoProduto(produto);
    setNovoProduto(produto);
    setMessage(''); // Limpa mensagens anteriores
  };

  const handleDelete = async (id) => {
    // Substitua window.confirm por um modal customizado em um ambiente de produção
   const resultado = await Swal.fire({
    title: 'Tem certeza?',
    text: 'Você não poderá desfazer isso!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  });
    if (!resultado.isConfirmed) {
      return; // Se o usuário cancelar, não faz nada
    }
    
    setLoading(true);
    setError(null);
    setMessage('');
  
    try {
      // --- CHAMADA REAL À API GATEWAY PARA EXCLUIR PRODUTO ---
      // Em um cenário real, você faria uma requisição DELETE para o seu Lambda
      // que removeria o produto do DynamoDB.
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }
      console.log("Produto excluído com sucesso!");

      // SIMULAÇÃO: Remove do estado local e localStorage
      setProdutos(produtos.filter(p => p.id !== id));
      setMessage('Produto excluído com sucesso!');
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      setError(`Erro ao excluir produto: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Gerenciamento de Produtos</h2>

      {loading && <p style={{ color: 'blue' }}>Processando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <div className="admin-form">
        <h3>{editandoProduto ? 'Editar Produto' : 'Adicionar Novo Produto'}</h3>
        <form onSubmit={handleAddOrUpdate}>
          <label>Nome:</label>
          <input type="text" name="nome" value={novoProduto.nome} onChange={handleChange} required />
          <label>Descrição:</label>
          <textarea name="descricao" value={novoProduto.descricao} onChange={handleChange} required></textarea>
          <label>Preço:</label>
          <input type="number" name="preco" value={novoProduto.preco} onChange={handleChange} step="0.01" required />
          <label>Categoria:</label>
          <input type="text" name="categoria" value={novoProduto.categoria} onChange={handleChange} required />
          <label>Estoque:</label>
          <input type="number" name="estoque" value={novoProduto.estoque} onChange={handleChange} required />
          <label>URL da Imagem:</label>
          <input type="text" name="imageUrl" value={novoProduto.imageUrl} onChange={handleChange} />
          <button type="submit" disabled={loading}>{editandoProduto ? 'Atualizar Produto' : 'Adicionar Produto'}</button>
          {editandoProduto && (
            <button type="button" onClick={() => { setEditandoProduto(null); setNovoProduto({ id: '', nome: '', descricao: '', preco: 0, categoria: '', estoque: 0, imageUrl: '' }); setMessage(''); }} style={{backgroundColor: '#6c757d', marginLeft: '10px'}} disabled={loading}>Cancelar Edição</button>
          )}
        </form>
      </div>

      <div className="admin-table">
        <h3>Lista de Produtos</h3>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>R${Number(produto.preco || 0).toFixed(2)}</td>
                <td>{produto.estoque}</td>
                <td>
                  <button onClick={() => handleEdit(produto)} disabled={loading}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(produto.id)} disabled={loading}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProdutos;