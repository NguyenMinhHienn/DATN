export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface CartItem {
    productId: string;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
}

export interface AuthResponse {
    token: string;
    user: User;
}