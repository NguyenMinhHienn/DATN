import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './compoments/Admin/AdminLayout';
import ProductList from './compoments/Admin/Product/ProductList';
import AddProduct from './compoments/Admin/Product/Addproduct';
import EditProduct from './compoments/Admin/Product/EditProduct';
import Dashboard from './compoments/Admin/Dashboard';
import Orders from './compoments/Admin/Oders';
import Users from './compoments/Admin/User';
import NotFoundPage from './pages/NotFoundPage';
import ProductsPage from './compoments/Client/ProductPage';
import ProductDetail from './compoments/Client/ProductDetail';
import Cart from './compoments/Client/Cart';
import Login from './compoments/Client/Auth/Login';
import Register from './compoments/Client/Auth/Register';
import ProductListt from './compoments/Client/ProductListt';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route path="/" element={<ProductListt />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route path="edit-product/:id" element={<EditProduct />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                </Route>

                {/* 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;