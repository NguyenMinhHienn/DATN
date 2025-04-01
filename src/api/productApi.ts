const API_BASE_URL = 'http://localhost:5000';

// Hàm lấy danh sách sản phẩm
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Hàm xóa sản phẩm
export const deleteProduct = async (id: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Hàm thêm sản phẩm (nếu cần)
export const addProduct = async (product: { name: string; price: number; category: string; image?: string }) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Hàm cập nhật sản phẩm (nếu cần)
export const updateProduct = async (
    id: string,
    product: { name: string; price: number; category: string; image?: string }
) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Lấy danh sách danh mục
export const fetchCategories = async () => {
    const response = await fetch(`http://localhost:5000/categories`);
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await response.json();
};

// Lấy thông tin sản phẩm theo ID
export const fetchProductById = async (id: string) => {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return await response.json();
};

// Cập nhật sản phẩm
export const editProduct = async (id: string, product: any) => {
    const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return await response.json();
};