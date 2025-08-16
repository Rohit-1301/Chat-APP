import React from "react";
import { MessageSquare, User, Settings, LogOut, MessageCircle, Search, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

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

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // --- Public Welcome Page (for non-authenticated users) ---
    if (!authUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 font-sans">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg w-full max-w-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-4 rounded-full">
                            <MessageSquare className="text-blue-600 w-10 h-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to ChatApp
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">
                        Connect with friends and start meaningful conversations.
                    </p>
                    <div className="space-y-4">
                        <Link
                            to="/login"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold block text-lg"
                        >
                            Login to Continue
                        </Link>
                        <Link
                            to="/signup"
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 font-semibold block text-lg"
                        >
                            Create New Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- Main Chat Interface (for authenticated users) ---
    return (
        <div className="h-screen w-full flex bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img src={authUser.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <h2 className="text-lg font-semibold text-gray-800">{authUser.username}</h2>
                    </div>
                    <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                {/* Search and New Chat */}
                <div className="p-4 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((convo) => (
                        <div key={convo.id} className="flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-200">
                            <div className="relative">
                                <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full" />
                                {convo.unread > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                                        {convo.unread}
                                    </span>
                                )}
                            </div>
                            <div className="ml-4 flex-1">
                                <p className="font-semibold text-gray-800">{convo.name}</p>
                                <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="text-center">
                    <MessageCircle className="mx-auto h-24 w-24 text-gray-300" />
                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">Welcome to ChatApp, {authUser.username}!</h2>
                    <p className="mt-2 text-gray-500">Select a conversation from the sidebar to start chatting.</p>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
