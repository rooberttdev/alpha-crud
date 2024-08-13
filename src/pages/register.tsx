import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; 

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'Usuário já cadastrado') {
          setError('Usuário já cadastrado.');
        } else {
          setError('Erro ao criar conta.');
        }
        return;
      }

      navigate('/login');
    } catch (error) {
      setError('Erro ao criar conta.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <label htmlFor="name" className="block mb-2 text-gray-700">Nome Completo</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome Completo"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <label htmlFor="taxNumber" className="block mb-2 text-gray-700">CPF ou CNPJ</label>
        <input
          id="taxNumber"
          type="text"
          value={taxNumber}
          onChange={(e) => setTaxNumber(e.target.value)}
          placeholder="CPF ou CNPJ"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <label htmlFor="mail" className="block mb-2 text-gray-700">E-mail</label>
        <input
          id="mail"
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="E-mail"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <label htmlFor="phone" className="block mb-2 text-gray-700">Telefone</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone"
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
          onClick={handleRegister}
          className="w-full py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Criar Conta
        </button>
        <p className="mt-4 text-center">
          Já tem uma conta?{' '}
          <button
            onClick={handleBackToLogin}
            className="text-blue-500 hover:underline"
          >
            Voltar para Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
