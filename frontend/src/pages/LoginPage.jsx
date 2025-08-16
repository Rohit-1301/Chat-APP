import React, { useState } from 'react';
// Import hooks for navigation and state management
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Assuming the store is in this path
import ThemeToggle from "../components/ThemeToggle";

// --- SHARED COMPONENTS (can be moved to a separate file e.g., /components/common.js) ---

// SVG Icon for a chat bubble
const ChatBubbleIcon = ({ className = "text-white" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

// Generic Input Field Component
const InputField = ({ id, type, placeholder, icon, value, onChange }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
        </span>
        <input
            id={id}
            name={id} // Added name attribute for better form handling
            type={type}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);


// --- LOGIN PAGE COMPONENT ---

const LoginPage = () => {
    // State from your authentication store
    const { login, isLoggingIn } = useAuthStore();
    // Hook for programmatic navigation
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the login function from your auth store
        const result = await login(formData);
        if (result.success) {
            // Navigate to the home page on successful login
            navigate("/");
        } else {
            // Show an error message if login fails
            // Note: Using a custom modal or toast notification is better than alert() in a real app.
            alert(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center font-sans p-4">
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            
            <div className="w-full max-w-md">
                <header className="flex flex-col items-center justify-center text-center mb-8">
                    <div className="bg-blue-600 p-4 rounded-full shadow-lg mb-4">
                        <ChatBubbleIcon />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Sign in to continue the conversation.</p>
                </header>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
                        />
                        <InputField
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}
                        />
                        <button type="submit" disabled={isLoggingIn} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                            {isLoggingIn ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Logging in...
                                </>
                            ) : 'Login'}
                        </button>
                    </form>
                </div>
                <footer className="text-center mt-6">
                    <p className="text-gray-600 dark:text-gray-300">
                        Don't have an account?{" "}
                        <Link to="/signup" className="ml-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">
                            Sign Up
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;
