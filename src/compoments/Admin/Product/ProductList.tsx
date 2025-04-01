import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../../api/productApi';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productList = await fetchProducts();
                if (!Array.isArray(productList)) {
                    console.error('productList is not an array:', productList);
                    return;
                }

                setProducts(productList);

                const uniqueCategories = [...new Set(productList.map((product) => product.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        getProducts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/admin/edit-product/${id}`);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product List</h1>
            <div className="container mx-auto">
                {categories.map((category) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{category}</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Name</th>
                                        <th className="py-3 px-6 text-left">Price</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products
                                        .filter((product) => product.category === category)
                                        .map((product) => (
                                            <tr key={product.id} className="border-b hover:bg-gray-100">
                                                <td className="py-3 px-6">{product.id}</td>
                                                <td className="py-3 px-6">{product.name}</td>
                                                <td className="py-3 px-6">${product.price.toFixed(2)}</td>
                                                <td className="py-3 px-6 text-center">
                                                    <button
                                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                                                        onClick={() => handleEdit(product.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white py-1 px-3 rounded ml-4 hover:bg-red-600 transition duration-300"
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;