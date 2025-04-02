import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner';
import Header from '../Shared/Header'; // Import Header
import Footer from '../Shared/Footer'; // Import Footer

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category: string;
}

const ProductListt: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { dispatch } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                if (!Array.isArray(data)) {
                    console.error('Data is not an array:', data);
                    return;
                }

                setProducts(data);

                const uniqueCategories = [...new Set(data.map((product) => product.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error('Failed to load products:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

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

    const handleViewDetails = (id: string) => {
        navigate(`/products/${id}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold">Đang tải...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
    }

    return (
        <div>
            {/* Header */}
            <Header />

            {/* Banner */}
            <Banner
                imageUrl="https://via.placeholder.com/1920x600"
                title="Chào mừng đến với cửa hàng của chúng tôi"
                subtitle="Khám phá những sản phẩm tốt nhất tại đây"
            />

            {/* Product Categories */}
            <div className="container mx-auto p-6">
                {categories.map((category) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-gradient-to-r from-blue-500 to-purple-500 pb-2">
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products
                                .filter((product) => product.category === category)
                                .map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <img
                                            src={product.image || 'https://via.placeholder.com/300'}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-lg font-bold text-gray-800 truncate">{product.name}</h2>
                                            <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                                                {product.description}
                                            </p>
                                            <p className="text-xl font-semibold text-blue-600 mt-4">
                                                ${product.price.toFixed(2)}
                                            </p>
                                            <button
                                                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded hover:opacity-90 transition-opacity duration-300"
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

export default ProductListt;