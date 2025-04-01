import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Products', path: '/admin/products' },
        { name: 'Add Product', path: '/admin/products/add' },
        { name: 'Orders', path: '/admin/orders' },
        { name: 'Users', path: '/admin/users' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-500 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold text-center border-b border-blue-400">
                    Admin Dashboard
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-4">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="block px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </header>

                {/* Render nội dung của các route con */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;