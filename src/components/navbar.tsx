import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const handleLogout = () => {
    console.log("Logout button clicked");
    onLogout();
  };

  return (
    <header className="bg-lime-500 w-full py-4 text-white">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">T-Alpha Tech</h1>
        <div>
          <Link to="/products" className="text-white hover:text-gray-200 mx-4">
            Produtos
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 mx-4 bg-transparent border-none cursor-pointer"
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
