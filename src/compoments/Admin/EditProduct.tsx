import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, editProduct } from '../../services/api';

interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
}

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({
        name: '',
        price: 0,
        description: '',
        image: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                if (!id) throw new Error('Product ID is missing');
                const fetchedProduct = await fetchProductById(id); // Gọi API để lấy thông tin sản phẩm
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editProduct(id, product); // Gửi yêu cầu cập nhật sản phẩm
            alert('Product updated successfully!');
            navigate('/admin/products'); // Quay lại danh sách sản phẩm
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Price</label>
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                        className="border border-gray-300 p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="border border-gray-300 p-2 w-full rounded"
                        rows={4}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        value={product.image}
                        onChange={(e) => setProduct({ ...product, image: e.target.value })}
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
