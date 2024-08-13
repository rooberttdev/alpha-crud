import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate('/products');
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Sejam Bem-vindo à T-Alpha</h1>
          <p className="text-lg mb-6">Seu e-commerce de produtos.</p>
          <button
            onClick={handleViewProducts}
            className="py-3 px-6 bg-lime-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Ver Produtos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
