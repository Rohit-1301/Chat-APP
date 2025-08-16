import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, User, Settings, LogOut, MessageCircle, Search, PlusCircle, Shield, Zap, Users, Globe, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import ThemeToggle from "../components/ThemeToggle";

// --- Mock Conversations Data ---
const conversations = [
    { id: 1, name: "Jessica", lastMessage: "Hey, are you free this weekend?", avatar: `https://i.pravatar.cc/150?u=jessica`, unread: 2 },
    { id: 2, name: "Michael", lastMessage: "Let's catch up tomorrow.", avatar: `https://i.pravatar.cc/150?u=michael`, unread: 0 },
    { id: 3, name: "Project Team", lastMessage: "Don't forget the meeting at 3 PM.", avatar: `https://i.pravatar.cc/150?u=team`, unread: 5 },
    { id: 4, name: "Sarah", lastMessage: "Just sent you the files.", avatar: `https://i.pravatar.cc/150?u=sarah`, unread: 0 },
];


const HomePage = () => {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // --- Public Landing Page (for non-authenticated users) ---
    if (!authUser) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Navigation Bar */}
                <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <MessageSquare className="h-8 w-8 text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ChatApp</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <ThemeToggle />
                                <Link
                                    to="/login"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                Connect with Friends
                                <span className="text-blue-600 dark:text-blue-400 block">Instantly</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                                Experience seamless communication with our modern chat application. 
                                Send messages, share files, and stay connected with your loved ones.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    to="/login"
                                    className="border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Why Choose ChatApp?
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Discover the features that make ChatApp the perfect choice for your communication needs.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center p-6">
                                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                                <p className="text-gray-600 dark:text-gray-300">Send and receive messages instantly with our optimized infrastructure.</p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure</h3>
                                <p className="text-gray-600 dark:text-gray-300">End-to-end encryption ensures your conversations stay private.</p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Group Chats</h3>
                                <p className="text-gray-600 dark:text-gray-300">Create groups and chat with multiple friends at once.</p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cross Platform</h3>
                                <p className="text-gray-600 dark:text-gray-300">Access your chats from any device, anywhere in the world.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-600 dark:bg-blue-700 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Start Chatting?
                        </h2>
                        <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who are already enjoying seamless communication with ChatApp.
                        </p>
                        <Link
                            to="/signup"
                            className="bg-white hover:bg-gray-100 text-blue-600 dark:text-blue-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
                        >
                            Join ChatApp Today
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-50 dark:bg-gray-800 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ChatApp</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">© 2025 ChatApp. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // --- Main Chat Interface (for authenticated users) ---
    return (
        <div className="h-screen w-full flex bg-gray-100 dark:bg-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
                        <img src={authUser.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <div className="flex items-center space-x-1">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{authUser.username}</h2>
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        
                        {/* Profile Dropdown */}
                        {showProfileDropdown && (
                            <div className="absolute top-12 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2 w-48 z-50">
                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    onClick={() => setShowProfileDropdown(false)}
                                >
                                    <User className="w-4 h-4 mr-3" />
                                    View Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    onClick={() => setShowProfileDropdown(false)}
                                >
                                    <Settings className="w-4 h-4 mr-3" />
                                    Settings
                                </Link>
                                <hr className="my-2 border-gray-200 dark:border-gray-600" />
                                <button
                                    onClick={() => {
                                        setShowProfileDropdown(false);
                                        handleLogout();
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    <button 
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="New Chat"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                </div>

                {/* Search and New Chat */}
                <div className="p-4 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search chats..." 
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((convo) => (
                        <div key={convo.id} className="flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                            <div className="relative">
                                <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full" />
                                {convo.unread > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                                        {convo.unread}
                                    </span>
                                )}
                            </div>
                            <div className="ml-4 flex-1">
                                <p className="font-semibold text-gray-800 dark:text-white">{convo.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{convo.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900/50">
                <div className="text-center">
                    <MessageCircle className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600" />
                    <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-white">Welcome back, {authUser.username}!</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Select a conversation from the sidebar to start chatting.</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                            Start New Chat
                        </button>
                        <Link 
                            to="/profile"
                            className="border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-6 py-2 rounded-lg transition-colors"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
