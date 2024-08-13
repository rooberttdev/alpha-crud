import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [taxNumber, setTaxNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
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
      onLogin();
    } catch (error) {
      setError('Erro ao fazer login.');
    }
  };

  const handleRegister = async () => {
    if (!name || !taxNumber || !mail || !phone || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://interview.t-alpha.com.br/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, taxNumber, mail, phone, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); 
      navigate('/');
    } catch (error) {
      setError('Erro ao registrar.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className={`transition-transform duration-500 ease-in-out ${mode === 'login' ? 'w-full max-w-md' : 'w-0'} bg-white p-8 shadow-md rounded-lg`}>
        <h2 className="text-2xl font-bold mb-6 text-center">{mode === 'login' ? 'Login' : 'Registrar'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {mode === 'login' ? (
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <input
              type="text"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              placeholder="CPF ou CNPJ"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
            <p className="mt-4 text-center">
              Não tem uma conta?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-blue-500 hover:underline"
              >
                Criar conta
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              placeholder="CPF ou CNPJ"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="E-mail"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Registrar
            </button>
            <p className="mt-4 text-center">
              Já tem uma conta?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
      </div>
  );
};

export default Auth;
