import React, { useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../services/api'; 

const DeleteProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDelete = async () => {
    try {
      await deleteProduct(id!);
      setSuccess('Produto deletado com sucesso!');
      navigate('/products');
    } catch (error) {
      setError('Erro ao deletar produto.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Deletar Produto</h2>
          <p className="mb-4 text-center">Tem certeza de que deseja deletar este produto?</p>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Deletar
            </button>
            <button
              onClick={() => navigate('/products')}
              className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
