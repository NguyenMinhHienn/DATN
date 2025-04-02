import React from 'react';
import { useCart } from '../../context/CartContext';

const Checkout: React.FC = () => {
    const { cart } = useCart();

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý logic thanh toán tại đây
        alert('Thanh toán thành công!');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Thanh toán</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Danh sách sản phẩm */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sản phẩm trong giỏ hàng</h2>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center border p-4 rounded-lg shadow-md bg-gray-50"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                                        <p className="text-gray-600">Giá: ${item.price.toFixed(2)}</p>
                                        <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="font-bold text-gray-800">
                                        Tổng: ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-right font-bold text-2xl mt-6 text-blue-600">
                            Tổng cộng: ${totalAmount.toFixed(2)}
                        </div>
                    </div>

                    {/* Biểu mẫu thanh toán */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Thông tin thanh toán</h2>
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Địa chỉ giao hàng
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="card" className="block text-sm font-medium text-gray-700">
                                    Số thẻ tín dụng
                                </label>
                                <input
                                    type="text"
                                    id="card"
                                    name="card"
                                    required
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Thanh toán
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;