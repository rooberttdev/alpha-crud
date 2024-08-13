import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const data = await getProduct(id);
        setProduct(data);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">{product.name}</h1>
      <p>{product.description}</p>
      <p>Preço: {product.price}</p>
      <p>Estoque: {product.stock}</p>
    </div>
  );
};

export default ProductDetail;
