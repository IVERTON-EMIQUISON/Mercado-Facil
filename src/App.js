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

import './index.css'; // Importe seu arquivo CSS
import './dashboard.css'; // Importe o CSS do Dashboard
import Pagamento from './pages/Pagamento';
import { useLocation } from 'react-router-dom';

// src/App.jsx
function AppContent() {
  const location = useLocation();
  const esconderHeader = location.pathname === '/dashboard';

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
  const [mensagemSucesso, setMensagemSucesso] = useState('');

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
    // Mostra mensagem de sucesso temporária
    setMensagemSucesso(`✅ ${produto.nome} adicionado com sucesso!`);
    setTimeout(() => setMensagemSucesso(''), 3000);
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
      <>
        {!esconderHeader && (
          <>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            {mensagemSucesso && (
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#d1e7dd',
                color: '#0f5132',
                padding: '20px 30px',
                borderRadius: '10px',
                border: '1px solid #badbcc',
                zIndex: 9999,
                fontSize: '18px',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                textAlign: 'center'
              }}>
                {mensagemSucesso}
              </div>
            )}
          </>
        )}

        <Routes>
          <Route path="/" element={<Home onAdicionarAoCarrinho={handleAdicionarAoCarrinho} />} />
          <Route path="/produto/:id" element={<DetalhesProduto onAdicionarAoCarrinho={handleAdicionarAoCarrinho} />} />
          <Route path="/carrinho" element={<Carrinho carrinho={carrinho} onRemoverDoCarrinho={handleRemoverDoCarrinho} onLimparCarrinho={handleLimparCarrinho} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/pagamento" element={<Pagamento/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminProdutos />} />
            <Route path="/compras" element={<div className="container"><h2>Página de Compras (Em Breve)</h2></div>} />
            <Route path="/fornecedores" element={<div className="container"><h2>Página de Fornecedores (Em Breve)</h2></div>} />
          </Route>
        </Routes>
      </>
    );
  }


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

