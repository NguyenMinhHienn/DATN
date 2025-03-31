import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/api';
import { ShoppingCart, LoaderCircle, AlertTriangle } from 'lucide-react';
import { useCart } from '../../context/CartContext'; // Import CartContext

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { dispatch } = useCart(); // Sử dụng CartContext

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!id) throw new Error('Product ID is missing');
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                },
            });
            alert('Product added to cart!');
        }
    };

    if (loading) 
        return <div className="flex justify-center items-center h-64"><LoaderCircle className="w-8 h-8 animate-spin" /></div>;
    
    if (error) 
        return <div className="text-red-600 text-center py-4"><AlertTriangle className="inline w-6 h-6 mr-2" />{error}</div>;

    return (
        <div className="container mx-auto p-6">
            {product && (
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-md shadow-md"
                    />
                    <p className="mt-4 text-gray-700">{product.description}</p>
                    <p className="mt-4 text-xl font-semibold">${product.price}</p>
                    <button
                        onClick={handleAddToCart}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;