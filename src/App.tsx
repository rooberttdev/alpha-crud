import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ProductList from './pages/productList';
import ProductDetail from './pages/productDetail';
import CreateProduct from './pages/createProduct';
import UpdateProduct from './pages/updateProduct';
import DeleteProduct from './pages/deleteProduct';
import SearchProducts from './pages/searchProduct';
import { useAuth } from './contexts/authContext';
import Navbar from './components/navbar';

const App: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && <Navbar onLogout={logout} />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={login} /> 
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" />
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
          path="/products/update/:id"
          element={
            isAuthenticated ? (
              <UpdateProduct />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/products/delete/:id"
          element={
            isAuthenticated ? (
              <DeleteProduct />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/products/search"
          element={
            isAuthenticated ? (
              <SearchProducts />
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
    </div>
  );
};

export default App;
