
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


// src/pages/Register.jsx - NOVA PÁGINA DE REGISTRO
function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    // --- INTEGRAÇÃO REAL COM AWS COGNITO ---
    // Para usar o AWS Cognito de verdade, você precisaria instalar e configurar o AWS Amplify JS SDK.
    // Exemplo de como seria a chamada real:
    /*
    import { Auth } from 'aws-amplify'; // Certifique-se de ter 'aws-amplify' instalado e configurado

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          // outros atributos que você queira registrar, como nome, sobrenome, etc.
        }
      });
      setMessage('Registro bem-sucedido! Verifique seu e-mail para confirmar a conta.');
      // Opcional: redirecionar para a página de confirmação de código do Cognito
      // navigate('/confirm-signup');
      setTimeout(() => {
        navigate('/login'); // Redireciona para o login após o registro bem-sucedido
      }, 2000);
    } catch (error) {
      setMessage(`Erro no registro: ${error.message}`);
      console.error("Erro no registro Cognito:", error);
    }
    */

    // SIMULAÇÃO para demonstração:
    console.log('Tentativa de registro simulada:', { username, email, password });
    setMessage('Registro simulado bem-sucedido! Você pode fazer login agora.');
    setTimeout(() => {
      navigate('/login'); // Redireciona para o login após o registro simulado
    }, 2000);
  };

  return (
    <div className="login-page"> {/* Reutilizando o estilo da página de login */}
      <div className="login-box">
        <h2>Registrar Nova Conta</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
          {message && <p className="message">{message}</p>}
        </form>
        <p style={{ marginTop: '20px' }}>
          Já tem uma conta? <Link to="/login" style={{ color: '#007BFF', textDecoration: 'none' }}>Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
