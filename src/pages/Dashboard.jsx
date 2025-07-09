import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
          <Link to="/dashboard" className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            Dashboard
          </Link>
          <Link to="/" className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.14"/><path d="M2.86 9.29 12 14.6l9.14-5.32"/><path d="M12 22V14.6"/><path d="M2.86 14.6V8.6L7.5 11.3"/><path d="M21.14 14.6V8.6L16.5 11.3"/></svg>
            Produtos
          </Link>
          <Link to="/compras" className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Compras
          </Link>
          <Link to="/fornecedores" className="sidebar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.61a1 1 0 0 0-.88-.91l-7.35-1.67a1 1 0 0 0-.76 0L14 15"/><circle cx="10" cy="20" r="2"/><circle cx="17" cy="20" r="2"/></svg>
            Fornecedores
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