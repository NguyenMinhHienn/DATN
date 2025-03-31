import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { dispatch } = useCart();
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
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
        alert(`${product.name} added to cart!`);
    };

    const handleViewDetails = (id: string) => {
        navigate(`/products/${id}`); // Điều hướng đến trang chi tiết sản phẩm
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
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
                                Add to Cart
                            </button>
                            <button
                                className="mt-2 w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300"
                                onClick={() => handleViewDetails(product.id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;