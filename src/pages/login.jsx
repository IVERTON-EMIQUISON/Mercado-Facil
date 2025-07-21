// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Importa useLocation para redirecionamento após login
// src/pages/Login.jsx
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    // --- INTEGRAÇÃO REAL COM AWS COGNITO ---
    // Para usar o AWS Cognito de verdade, você precisaria instalar e configurar o AWS Amplify JS SDK.
    // Exemplo de como seria a chamada real:
    /*
    import { Auth } from 'aws-amplify'; // Certifique-se de ter 'aws-amplify' instalado e configurado

    try {
      const user = await Auth.signIn(username, password);
      console.log("Login bem-sucedido:", user);
      localStorage.setItem('isLoggedIn', 'true'); // Marca como logado
      onLoginSuccess();
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (error) {
      setMessage(`Erro de login: ${error.message}`);
      console.error("Erro no login Cognito:", error);
    }
    */

    // SIMULAÇÃO para demonstração: usuário/senha fixos para "admin"
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true'); // Marca como logado
      onLoginSuccess();
      const from = location.state?.from?.pathname || "/dashboard"; // Redireciona para o dashboard
      navigate(from, { replace: true });
    } else {
      setMessage('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login - Mercado Fácil</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          {message && <p className="message">{message}</p>}
        </form>
       
      </div>
    </div>
  );
}

export default Login;