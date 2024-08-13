import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [taxNumber, setTaxNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!taxNumber || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://interview.t-alpha.com.br/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taxNumber, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      login();
      onLogin();
      navigate('/home');
    } catch (error) {
      setError('Erro ao fazer login.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label htmlFor="taxNumber" className="block mb-2 text-gray-700">CPF ou CNPJ</label>
        <input
          id="taxNumber"
          type="text"
          value={taxNumber}
          onChange={(e) => setTaxNumber(e.target.value)}
          placeholder="CPF ou CNPJ"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <label htmlFor="password" className="block mb-2 text-gray-700">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Não tem uma conta?{' '}
          <button
            onClick={handleCreateAccount}
            className="text-blue-500 hover:underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
