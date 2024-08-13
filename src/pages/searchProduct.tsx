import React, { useState } from 'react';
import { searchProducts } from '../services/api'; 

const SearchProduct: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]); 
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await searchProducts(query);
      setResults(data);
    } catch (error) {
      setError('Erro ao buscar produtos.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Buscar Produtos</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produtos"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-lime-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Buscar
            </button>
          </form>
          {results.length > 0 && (
            <ul className="mt-6">
              {results.map((product) => (
                <li key={product.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Preço: {product.price}</p>
                  <p>Estoque: {product.stock}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
