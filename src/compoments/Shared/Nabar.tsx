import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    E-Commerce
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
                    <Link to="/cart" className="text-gray-300 hover:text-white">Cart</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                    <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
                    <Link to="/admin" className="text-gray-300 hover:text-white">Admin</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;