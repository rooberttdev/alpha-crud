import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, updateProduct } from '../services/api';

interface ProductFormProps {
  mode: 'create' | 'edit';
  productId?: string;
  initialProduct?: { name: string, description: string, price: number, stock: number };
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId, initialProduct }) => {
  const [name, setName] = useState(initialProduct?.name || '');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [price, setPrice] = useState(initialProduct?.price || 0);
  const [stock, setStock] = useState(initialProduct?.stock || 0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        await createProduct({ name, description, price, stock });
      } else if (mode === 'edit' && productId) {
        await updateProduct(productId, { name, description, price, stock });
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar o produto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">Descrição</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium">Preço</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="stock" className="block text-sm font-medium">Estoque</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {mode === 'create' ? 'Adicionar Produto' : 'Atualizar Produto'}
      </button>
    </form>
  );
};

export default ProductForm;
