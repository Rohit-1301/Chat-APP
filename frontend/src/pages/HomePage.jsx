import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, User, Settings, LogOut, Search, PlusCircle, Shield, Zap, Users, Globe, ChevronDown, Paperclip, Smile, Send, Code, FileText, ArrowRight, Star, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import ThemeToggle from "../components/ThemeToggle";

// --- Mock Conversations Data ---
const conversations = [
    { 
        id: 1, 
        name: "Alex Johnson", 
        status: "Online",
        lastMessage: "Hey team, check out this new API integration!", 
        avatar: `https://i.pravatar.cc/150?u=alex`, 
        unread: 0,
        time: "2:45 PM"
    },
    { 
        id: 2, 
        name: "Maria Ortega", 
        status: "Away",
        lastMessage: "Looks great! I think we can optimize the JSON parsing.", 
        avatar: `https://i.pravatar.cc/150?u=maria`, 
        unread: 0,
        time: "2:43 PM"
    },
    { 
        id: 3, 
        name: "Steve Doe", 
        status: "Offline",
        lastMessage: "I'll work on the UI adjustments later today.", 
        avatar: `https://i.pravatar.cc/150?u=steve`, 
        unread: 0,
        time: "1:20 PM"
    },
];

// Mock messages for the selected conversation
const mockMessages = [
    { id: 1, sender: "Alex Johnson", message: "Hey team, check out this new API integration!", time: "2:45 PM", type: "text" },
    { id: 2, sender: "Maria Ortega", message: "Looks great! I think we can optimize the JSON parsing.", time: "2:43 PM", type: "text", isHighlighted: true },
    { id: 3, sender: "Steve Doe", message: "I'll work on the UI adjustments later today.", time: "1:20 PM", type: "text" },
];

const HomePage = () => {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageText, setMessageText] = useState("");
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
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation Bar */}
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Code className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">DevChat</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <ThemeToggle />
                                <Link
                                    to="/login"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300 mb-8">
                                <Star className="w-4 h-4 mr-2" />
                                Trusted by 50,000+ developers worldwide
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Where Developers
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                                    Collaborate
                                </span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
                                The modern workspace for development teams. Share code, collaborate in real-time, and build the future together.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                                <Link
                                    to="/signup"
                                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                                >
                                    Start Building Today
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:shadow-lg"
                                >
                                    Sign In
                                </Link>
                            </div>

                            {/* Demo Chat Interface Preview */}
                            <div className="relative max-w-5xl mx-auto">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <div className="flex h-96">
                                        {/* Sidebar Preview */}
                                        <div className="w-80 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
                                            <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                                                        <Code className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="font-semibold text-gray-900 dark:text-white text-sm">DevChat</span>
                                                </div>
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                                                    <input
                                                        type="text"
                                                        placeholder="search"
                                                        className="w-full pl-8 pr-3 py-2 bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg border-0 text-xs"
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Chats</h3>
                                                <div className="space-y-2">
                                                    {conversations.slice(0, 3).map((conv, index) => (
                                                        <div key={conv.id} className={`flex items-center p-2 rounded-lg ${index === 0 ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}>
                                                            <div className="relative">
                                                                <img src={conv.avatar} alt={conv.name} className="w-8 h-8 rounded-full" />
                                                                <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white dark:border-gray-700 ${conv.status === 'Online' ? 'bg-green-500' : conv.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                                                            </div>
                                                            <div className="ml-2 flex-1 min-w-0">
                                                                <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{conv.name}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{conv.status}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chat Area Preview */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">Workspace: React Team</h3>
                                                    <div className="flex space-x-2">
                                                        <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-lg text-xs font-medium">Live</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-4 space-y-3">
                                                <div className="flex items-start space-x-3">
                                                    <img src="https://i.pravatar.cc/150?u=alex" alt="Alex" className="w-8 h-8 rounded-full" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="text-sm font-medium text-gray-900 dark:text-white">Alex Johnson</span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">2:45 PM</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300">Just pushed the new authentication system! 🚀</p>
                                                    </div>
                                                </div>
                                                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-3 rounded-r-lg">
                                                    <div className="flex items-start space-x-3">
                                                        <img src="https://i.pravatar.cc/150?u=maria" alt="Maria" className="w-8 h-8 rounded-full" />
                                                        <div>
                                                            <div className="flex items-center space-x-2 mb-1">
                                                                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Maria Ortega</span>
                                                                <span className="text-xs text-blue-700 dark:text-blue-300">2:43 PM</span>
                                                            </div>
                                                            <p className="text-sm text-blue-800 dark:text-blue-200">Awesome work! The JWT implementation looks solid.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Type a message..."
                                                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 rounded-lg border-0 text-sm"
                                                        readOnly
                                                    />
                                                    <button className="p-2 bg-blue-600 text-white rounded-lg">
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Everything developers need
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Built by developers, for developers. Every feature is designed to enhance your coding workflow.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="group p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Code className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Code Sharing</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Share code snippets with syntax highlighting and real-time collaboration.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        Syntax highlighting for 100+ languages
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        Real-time collaborative editing
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="group p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Security</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Bank-grade security keeps your code and conversations protected.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        End-to-end encryption
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        SOC 2 Type II compliant
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="group p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Team Workspaces</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Organize your team into dedicated workspaces with custom permissions.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        Unlimited team members
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />
                                        Role-based permissions
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to revolutionize your workflow?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Join thousands of developers who have already transformed how they collaborate and build software.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/signup"
                                className="group bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                            >
                                Start Free Trial
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/login"
                                className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-black py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                                    <Code className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">DevChat</span>
                            </div>
                            <p className="text-gray-400 mb-6">Empowering developers to build the future, together.</p>
                            <p className="text-gray-500">© 2025 DevChat. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // --- Main Chat Interface (for authenticated users) ---
    return (
        <div className="h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-purple-100">
                                <Code className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">DevChat</h1>
                                <p className="text-xs text-gray-600 font-semibold">Professional Hub</p>
                            </div>
                        </div>
                        
                        {/* User Menu */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-white/70 rounded-lg transition-all duration-200"
                            >
                                <span className="text-sm font-semibold">{authUser.username}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            
                            {/* Profile Dropdown */}
                            {showProfileDropdown && (
                                <div className="absolute top-12 right-0 border border-gray-200 rounded-xl shadow-xl py-2 w-48 z-50 backdrop-blur-lg bg-white/95">
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-all duration-200"
                                        onClick={() => setShowProfileDropdown(false)}
                                    >
                                        <User className="w-4 h-4 mr-3" />
                                        <span className="font-medium">Profile</span>
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                                        onClick={() => setShowProfileDropdown(false)}
                                    >
                                        <Settings className="w-4 h-4 mr-3" />
                                        <span className="font-medium">Settings</span>
                                    </Link>
                                    <div className="my-1">
                                        <ThemeToggle inDropdown={true} />
                                    </div>
                                    <hr className="my-2 border-gray-200" />
                                    <button
                                        onClick={() => {
                                            setShowProfileDropdown(false);
                                            handleLogout();
                                        }}
                                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-lg mx-2 mb-1"
                                    >
                                        <LogOut className="w-4 h-4 mr-3" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Search */}
                    <div className="relative px-4 mb-6">
                        <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-gray-50 to-white text-gray-900 placeholder-gray-500 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                        />
                    </div>
                </div>

                {/* Chats Section */}
                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <div className="w-2 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full mr-3"></div>
                                Recent Chats
                            </h2>
                            <button className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 rounded-xl transition-all duration-200">
                                <PlusCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => setSelectedConversation(conv)}
                                    className={`group flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                                        selectedConversation?.id === conv.id 
                                            ? 'bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-200 shadow-xl ring-4 ring-purple-100' 
                                            : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:shadow-xl border-2 border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <div className="relative">
                                        <img 
                                            src={conv.avatar} 
                                            alt={conv.name} 
                                            className="w-14 h-14 rounded-full border-3 border-white shadow-lg ring-2 ring-gray-100"
                                        />
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-3 border-white shadow-lg ${
                                            conv.status === 'Online' ? 'bg-emerald-500' : 
                                            conv.status === 'Away' ? 'bg-amber-500' : 'bg-gray-400'
                                        }`}></div>
                                    </div>
                                    <div className="ml-4 flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-purple-800 transition-colors">
                                                {conv.name}
                                            </h3>
                                            <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-1 rounded-lg">
                                                {conv.time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 truncate font-medium mb-2 leading-relaxed">
                                            {conv.lastMessage}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                                                conv.status === 'Online' ? 'bg-emerald-100 text-emerald-800' : 
                                                conv.status === 'Away' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {conv.status}
                                            </span>
                                            {conv.unread > 0 && (
                                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-full px-3 py-1 font-bold shadow-lg">
                                                    {conv.unread}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-gradient-to-br from-white via-gray-50 to-blue-50">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={selectedConversation.avatar} 
                                        alt={selectedConversation.name} 
                                        className="w-12 h-12 rounded-full border-2 border-purple-200 shadow-sm"
                                    />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {selectedConversation.name}
                                        </h2>
                                        <p className="text-sm text-gray-600 font-medium">
                                            Dev Team • {selectedConversation.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                                        <Paperclip className="w-4 h-4" />
                                        <span>Attach</span>
                                    </button>
                                    <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                                        <Code className="w-4 h-4" />
                                        <span>Code</span>
                                    </button>
                                    <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105">
                                        <Smile className="w-4 h-4" />
                                        <span>Emoji</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
                            <div className="space-y-6">
                                {mockMessages.map((msg) => (
                                    <div key={msg.id} className="group">
                                        <div className="flex items-start space-x-4">
                                            <img 
                                                src={`https://i.pravatar.cc/150?u=${msg.sender.toLowerCase().replace(' ', '')}`} 
                                                alt={msg.sender} 
                                                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-semibold text-gray-900 text-sm">
                                                        {msg.sender}
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-medium">
                                                        {msg.time}
                                                    </span>
                                                </div>
                                                <div className={`p-4 rounded-2xl max-w-2xl ${
                                                    msg.isHighlighted 
                                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500 shadow-sm' 
                                                        : 'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200'
                                                }`}>
                                                    <p className="text-gray-800 text-sm leading-relaxed font-medium">
                                                        {msg.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="bg-white border-t border-gray-200 p-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full px-6 py-4 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white text-sm font-medium transition-all duration-200 shadow-sm"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-purple-600 transition-colors">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>
                                <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Welcome State */
                    <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
                        <div className="text-center max-w-md">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <Code className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Welcome to DevChat
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Select a conversation from the sidebar to start collaborating with your team. 
                                Share code, discuss projects, and build amazing things together.
                            </p>
                            <div className="flex flex-col space-y-3">
                                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                                    Start New Chat
                                </button>
                                <button className="text-gray-600 hover:text-purple-600 px-6 py-3 rounded-xl font-medium transition-colors">
                                    Browse Teams
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;