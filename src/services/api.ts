import axios from 'axios';

const API_URL = 'https://interview.t-alpha.com.br/api';

const getAuthToken = () => localStorage.getItem('token');

export const createProduct = async (product: { name: string, description: string, price: number, stock: number }) => {
  const token = getAuthToken();
  if (!token) throw new Error('Token não encontrado');

  try {
    const response = await axios.post(`${API_URL}/products/create-product`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

export const getProducts = async () => {
  const token = getAuthToken();
  if (!token) throw new Error('Token não encontrado');

  try {
    const response = await axios.get(`${API_URL}/products/get-all-products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
};

export const getProduct = async (id: string) => { 
  const token = getAuthToken();
  if (!token) throw new Error('Token não encontrado');

  try {
    const response = await axios.get(`${API_URL}/products/get-one-product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: { name: string, description: string, price: number, stock: number }) => {
  const token = getAuthToken();
  if (!token) throw new Error('Token não encontrado');

  try {
    const response = await axios.patch(`${API_URL}/products/update-product/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  const token = getAuthToken();
  if (!token) throw new Error('Token não encontrado');

  try {
    const response = await axios.delete(`${API_URL}/products/delete-product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};
export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/get-all-products?search=${query}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar produtos');
  }
};