import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto text-center space-y-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
                <p className="text-sm">Follow us on social media:</p>
                <div className="flex justify-center space-x-6">
                    <a href="#" className="text-white hover:text-gray-400 transition duration-300 flex items-center">
                        <Facebook className="w-5 h-5 mr-1" /> Facebook
                    </a>
                    <a href="#" className="text-white hover:text-gray-400 transition duration-300 flex items-center">
                        <Twitter className="w-5 h-5 mr-1" /> Twitter
                    </a>
                    <a href="#" className="text-white hover:text-gray-400 transition duration-300 flex items-center">
                        <Instagram className="w-5 h-5 mr-1" /> Instagram
                    </a>
                </div>
                <div className="mt-4 text-sm">
                    <p className="flex justify-center items-center"><Mail className="w-5 h-5 mr-2" /> contact@ecommerce.com</p>
                    <p className="flex justify-center items-center"><Phone className="w-5 h-5 mr-2" /> +1 234 567 890</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;