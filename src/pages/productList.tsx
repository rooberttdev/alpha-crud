import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError('Erro ao buscar produtos.');
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError('Erro ao deletar produto.');
    }
  };

  const handleUpdateProduct = (id: string) => {
    navigate(`/update-product/${id}`);
  };

  const handleCreateProduct = () => {
    navigate('/products/create');
  };

  return (
    <div>
      <div className="pt-16 px-4 flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <p className="text-2xl font-bold mb-6 text-center">Lista de Produtos</p>
          <div className="flex justify-between mb-4">
            <button
              onClick={handleCreateProduct}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Criar Produto
            </button>
            <button
              onClick={() => navigate('/products/update/:id')}
              className="py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
            >
              Atualizar Produto
            </button>
            <button
              onClick={() => navigate('/products/delete/:id')}
              className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Deletar Produto
            </button>
            <button
              onClick={() => navigate('/products/search')}
              className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Buscar Produto
            </button>
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="flex flex-col items-center">
            {products.length ? (
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border-b">Nome</th>
                    <th className="p-2 border-b">Descrição</th>
                    <th className="p-2 border-b">Preço</th>
                    <th className="p-2 border-b">Estoque</th>
                    <th className="p-2 border-b">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.description}</td>
                      <td className="p-2">{product.price}</td>
                      <td className="p-2">{product.stock}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleUpdateProduct(product.id)}
                          className="py-1 px-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                        >
                          Atualizar
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="py-1 px-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 ml-2"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
