import React from 'react';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
    const { cart, dispatch } = useCart();

    const handleRemoveFromCart = (id: string) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: id,
        });
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border p-4 rounded-lg shadow-md bg-white"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                                onClick={() => handleRemoveFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-right font-bold text-xl">
                        Total: ${totalAmount.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;