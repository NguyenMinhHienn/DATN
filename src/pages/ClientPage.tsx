import React from 'react';
import ProductList from '../compoments/Client/ProductListt';
import Cart from '../compoments/Client/Cart';
import Header from '../compoments/Shared/Header';
import Footer from '../compoments/Shared/Footer';

const ClientPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <ProductList />
                <Cart />
            </main>
            <Footer />
        </div>
    );
};

export default ClientPage;