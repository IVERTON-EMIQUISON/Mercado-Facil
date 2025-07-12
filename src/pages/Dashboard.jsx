import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../dashboard.css';
// src/pages/Dashboard.jsx
function Dashboard() {
  const navigate = useNavigate();

  const handleGerenciarProdutosClick = () => {
    navigate('/admin');
  };

  return (
    
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          {/* Ícone de perfil */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span style={{ marginLeft: '10px' }}>Usuário Logado</span>
        </div>
        <nav className="sidebar-nav">
      
          <Link to="/" className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.14"/><path d="M2.86 9.29 12 14.6l9.14-5.32"/><path d="M12 22V14.6"/><path d="M2.86 14.6V8.6L7.5 11.3"/><path d="M21.14 14.6V8.6L16.5 11.3"/></svg>
            Produtos
          </Link>
          <Link to="/carrinho" className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Compras
          </Link>
          <Link to="/admin" className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .6-1.3v-2a1.65 1.65 0 0 0-.6-1.3l-1.5-1.3a1.65 1.65 0 0 1-.6-1.3V7a1.65 1.65 0 0 0-.6-1.3l-2-2A1.65 1.65 0 0 0 13.4 3h-2a1.65 1.65 0 0 0-1.3.6l-2 2A1.65 1.65 0 0 0 7 7v2a1.65 1.65 0 0 1-.6 1.3L5.9 11a1.65 1.65 0 0 0-.6 1.3v2a1.65 1.65 0 0 0 .6 1.3l2.5 2A1.65 1.65 0 0 0 11.4,21h2a1.65,1.65,0,0,0,1,.6l2,2A1.65,1.65,0,0,0,17,24h2a1.65,1.65,0,0,0,1-.6l2-2A1.65,1.65,0,0,0,21,20v-2A1.65,1.65,0,0,0,19.4,15Z"/></svg>
            Gerenciar Produtos
          </Link>
          <Link to={'/login'} className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17v-4a4 4 0 0 1 4-4h1"/><path d="M16.5 12h6.5"/></svg>
            Sair
          </Link>
        </nav>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-welcome-box">
          <h2>Bem-vindo ao Mercado Fácil</h2>
          <p>Gerencie seu estoque e compras de forma eficiente</p>
          <button onClick={handleGerenciarProdutosClick}>Gerenciar Produtos</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;