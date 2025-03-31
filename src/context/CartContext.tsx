import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Định nghĩa action types
type Action =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: string };

// Reducer để quản lý giỏ hàng
const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            }
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
};

// Tạo context
const CartContext = createContext<{
    cart: CartItem[];
    dispatch: React.Dispatch<Action>;
}>({
    cart: [],
    dispatch: () => null,
});

// Provider để bọc ứng dụng
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);
    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook để sử dụng CartContext
export const useCart = () => useContext(CartContext);