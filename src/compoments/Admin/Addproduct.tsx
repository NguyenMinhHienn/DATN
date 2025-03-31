import React, { useState } from 'react';
import { addProduct } from '../../services/api';

const AddProduct: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct = {
            name: productName,
            description: productDescription,
            price: parseFloat(productPrice),
            image: productImage,
        };
        await addProduct(newProduct);
        // Reset form fields
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductImage('');
        alert('Product added successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                        rows={4}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Price</label>
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product price"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        value={productImage}
                        onChange={(e) => setProductImage(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter image URL"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;