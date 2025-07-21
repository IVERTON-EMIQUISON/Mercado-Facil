// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';


// src/components/Header.jsx
function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em', fontWeight: 'bold' }}>
        Mercado Fácil
      </Link>
      <nav>
        <Link to="/">Produtos</Link>
        <Link to="/carrinho">Carrinho</Link>
        {isLoggedIn ? (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/dashboard">Dashboard</Link> {/* Adicionado link para Dashboard */}
            <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1em', marginLeft: '20px', fontWeight: 'bold' }}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}


export default Header;