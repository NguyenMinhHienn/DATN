import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm}`);
        }
    };

    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Store</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="hover:underline">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="hover:underline">
                            Cart
                        </Link>
                    </li>
                </ul>
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-2 py-1 rounded text-black"
                    />
                    <button
                        type="submit"
                        className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-gray-200"
                    >
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;