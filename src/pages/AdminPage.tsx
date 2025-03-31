import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddProduct from '../compoments/Admin/Addproduct';
import EditProduct from '../compoments/Admin/EditProduct';
import ProductList from '../compoments/Admin/ProductList';

const AdminPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <nav className="mb-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/admin/products" className="text-blue-500 hover:underline">
                            Product List
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products/add" className="text-blue-500 hover:underline">
                            Add Product
                        </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/:id/edit" element={<EditProduct />} />
            </Routes>
        </div>
    );
};

export default AdminPage;