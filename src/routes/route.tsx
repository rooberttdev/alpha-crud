import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import ProductList from '../components/productList';
import ProductDetail from '../pages/productDetail';
import CreateProduct from '../pages/createProduct'; 

const AppRoutes: React.FC = () => {
  const [isAuthenticated] = useState<boolean>(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login onLogin={function (): void {
              throw new Error('Function not implemented.');
            } } />
          ) : (
            <Navigate to="/products" />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <Register />
          ) : (
            <Navigate to="/products" />
          )
        }
      />
      <Route
        path="/products"
        element={
          isAuthenticated ? (
            <ProductList />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/products/create"
        element={
          isAuthenticated ? (
            <CreateProduct />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/products/:id"
        element={
          isAuthenticated ? (
            <ProductDetail />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
