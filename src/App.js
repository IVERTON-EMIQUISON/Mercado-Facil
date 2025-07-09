// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import DetalhesProduto from './pages/DetalhesProduto';
import Carrinho from './pages/Carrinho';
import AdminProdutos from './pages/AdminProdutos';
import Login from './pages/login';
import Dashboard from './pages/Dashboard'; 
import Register from './pages/Register';
import './index.css'; // Importe seu arquivo CSS
import './dashboard.css'; // Importe o CSS do Dashboard

// src/App.jsx
function App() {
  const [carrinho, setCarrinho] = useState(() => {
    // Carrega o carrinho do localStorage ao iniciar
    const savedCart = localStorage.getItem('carrinho');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Verifica o status de login ao iniciar
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Salva o carrinho no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const handleAdicionarAoCarrinho = (produto) => {
    setCarrinho(prevCarrinho => {
      const itemExistente = prevCarrinho.find(item => item.id === produto.id);
      if (itemExistente) {
        return prevCarrinho.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
    
  };

  const handleRemoverDoCarrinho = (id) => {
    setCarrinho(prevCarrinho => prevCarrinho.filter(item => item.id !== id));
  };

  const handleLimparCarrinho = () => {
    setCarrinho([]);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    // Redireciona para a página inicial ou de login após o logout
    window.location.href = '/login'; // Força um refresh para limpar o estado
  };

  return (
    <Router>
      
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home onAdicionarAoCarrinho={handleAdicionarAoCarrinho} />} />
        <Route path="/produto/:id" element={<DetalhesProduto onAdicionarAoCarrinho={handleAdicionarAoCarrinho} />} />
        <Route path="/carrinho" element={<Carrinho carrinho={carrinho} onRemoverDoCarrinho={handleRemoverDoCarrinho} onLimparCarrinho={handleLimparCarrinho} />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} /> {/* Nova rota para Registro */}
        
        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} /> {/* Nova rota para o Dashboard */}
          <Route path="/admin" element={<AdminProdutos />} />
          {/* Rotas placeholder para Compras e Fornecedores */}
          <Route path="/compras" element={<div className="container"><h2>Página de Compras (Em Breve)</h2><p>Esta área será desenvolvida para gerenciar suas compras.</p></div>} />
          <Route path="/fornecedores" element={<div className="container"><h2>Página de Fornecedores (Em Breve)</h2><p>Esta área será desenvolvida para gerenciar seus fornecedores.</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

