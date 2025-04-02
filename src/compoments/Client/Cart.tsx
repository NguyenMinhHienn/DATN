import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để chuyển trang

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
    const { cart, dispatch } = useCart();
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleRemoveFromCart = (id: string) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: id,
        });
    };

    const handleCheckout = () => {
        onClose(); // Đóng giỏ hàng trước khi chuyển trang
        navigate('/checkout'); // Chuyển đến trang thanh toán
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 z-50`}
        >
            <div className="p-4">
                <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    Close
                </button>
                <h1 className="text-2xl font-bold text-center mb-4">Your Cart</h1>
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
                        <button
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                            onClick={handleCheckout}
                        >
                            Thanh toán
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;