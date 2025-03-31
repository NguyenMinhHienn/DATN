import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Đảm bảo URL đúng với JSON Server

// Hàm lấy danh sách sản phẩm
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Hàm lấy thông tin sản phẩm theo ID
export const fetchProductById = async (id: string | undefined) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

// Add a new product
export const addProduct = async (product: { name: string; price: number; description: string; image: string }) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
};

// Hàm cập nhật sản phẩm
export const editProduct = async (id: string | undefined, updatedProduct: any) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
};