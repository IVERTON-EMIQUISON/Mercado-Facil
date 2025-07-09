// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


// src/components/ProtectedRoute.jsx
function ProtectedRoute() {
  // Componente simples para simular uma rota protegida.
  // Na vida real, verificaria um token de autenticação ou estado de login (Cognito).
  const isAuthenticated = () => {
    // Por enquanto, apenas para demonstração:
    // Retorna true se "isLoggedIn" está no localStorage (simulando login)
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ProtectedRoute;