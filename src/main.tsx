import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router';
import './index.css'; // Đảm bảo file index.css tồn tại trong thư mục src
import { CartProvider } from './context/CartContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CartProvider>
        <App />
        </CartProvider>
    </React.StrictMode>
);