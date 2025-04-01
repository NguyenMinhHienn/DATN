import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api';
import Banner from './Banner';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category: string;
    brand: string;
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { dispatch } = useCart();

    // Load products from API
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                if (!Array.isArray(data)) {
                    console.error('Data is not an array:', data);
                    return;
                }

                setProducts(data);

                // Extract unique categories
                const uniqueCategories = [...new Set(data.map((product) => product.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error('Failed to load products:', err);
            }
        };

        loadProducts();
    }, []);

    // Add product to cart
    const handleAddToCart = (product: Product) => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            },
        });
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    };

    // View product details
    const handleViewDetails = (id: string) => {
        navigate(`/products/${id}`);
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Banner */}
            <Banner
                imageUrl="https://via.placeholder.com/1920x600"
                title="Our Products"
                subtitle="Browse through our wide range of products"
            />

            {/* Product Categories */}
            <div className="container mx-auto p-6">
                {categories.map((category) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products
                                .filter((product) => product.category === category)
                                .map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <img
                                            src={product.image || 'https://via.placeholder.com/300'}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-lg font-bold text-gray-800 truncate">{product.name}</h2>
                                            <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                                            <p className="text-xl font-semibold text-blue-600 mt-4">${product.price.toFixed(2)}</p>
                                            <button
                                                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Thêm vào giỏ hàng
                                            </button>
                                            <button
                                                className="mt-2 w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300"
                                                onClick={() => handleViewDetails(product.id)}
                                            >
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ProductsPage;