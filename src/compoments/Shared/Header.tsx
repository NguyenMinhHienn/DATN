import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ShoppingCart } from 'lucide-react';
import Cart from '../Client/Cart'; // Import component Cart

const Header: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // State để điều khiển mở/đóng giỏ hàng

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <header className={`p-4 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        <Link to="/" className="hover:text-gray-400 transition duration-300">
                            E-Commerce
                        </Link>
                    </h1>
                    <nav>
                        <ul className="flex space-x-6 items-center">
                            <li>
                                <Link to="/" className="hover:text-gray-400 transition duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-gray-400 transition duration-300">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleCartToggle} // Thay đổi từ Link sang button để mở giỏ hàng
                                    className="hover:text-gray-400 transition duration-300 flex items-center"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-1" /> Cart
                                </button>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-gray-400 transition duration-300">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-gray-400 transition duration-300">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {/* Sidebar giỏ hàng */}
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Header;