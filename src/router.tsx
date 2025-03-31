import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientPage from './pages/ClientPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetail from './compoments/Client/ProductDetail';
import Cart from './compoments/Client/Cart';
import Login from './compoments/Client/Auth/Login';
import Register from './compoments/Client/Auth/Register';
import ProductList from './compoments/Admin/ProductList';
import AddProduct from './compoments/Admin/Addproduct';
import EditProduct from './compoments/Admin/EditProduct';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route path="/" element={<ClientPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminPage />} />
                <Route path="/admin/products" element={<ProductList />} />
                <Route path="/admin/products/add" element={<AddProduct />} />
                <Route path="/admin/edit-product/:id" element={<EditProduct />} />

                {/* 404 Not Found */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;