import React, { useEffect, useState } from 'react';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://interview.t-alpha.com.br/api/products/get-all-products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao obter produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
      <ul className="space-y-4">
        {products.map((product: any) => (
          <li key={product.id} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p>Preço: R${product.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
