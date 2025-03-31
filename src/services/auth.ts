import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your API URL

// Đăng ký người dùng mới
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// Đăng nhập người dùng
export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        // Lưu thông tin người dùng vào localStorage
        setUser(response.data.user);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || 'Invalid email or password';
    }
};

// Đăng xuất người dùng
export const logoutUser = async () => {
    try {
        await axios.post(`${API_URL}/logout`);
        clearUser(); // Xóa thông tin người dùng khỏi localStorage
    } catch (error: any) {
        throw error.response?.data || 'An error occurred during logout';
    }
};

// Lấy thông tin người dùng hiện tại từ localStorage
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Lưu thông tin người dùng vào localStorage
export const setUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// Xóa thông tin người dùng khỏi localStorage
export const clearUser = () => {
    localStorage.removeItem('user');
};