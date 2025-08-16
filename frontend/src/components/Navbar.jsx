// import React from "react";
// import { Link } from "react-router-dom";
// import { MessageSquare } from "lucide-react"; // npm install lucide-react

// const Navbar = ({ children }) => {
//   return (
//     <div>
//       <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <MessageSquare className="text-white w-6 h-6" />
//             <h1 className="text-white text-xl font-bold">Chat App</h1>
//           </div>

//           {/* Links */}
//           <div className="space-x-4">
//             <Link
//               to="/"
//               className="text-white px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300"
//             >
//               Home
//             </Link>
//             <Link
//               to="/login"
//               className="text-white px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="text-white px-3 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-300"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </nav>
//       <main>{children}</main>
//     </div>
//   );
// };

// export default Navbar;


import React from 'react';

// SVG Icon for a chat bubble
const ChatBubbleIcon = ({ className = "text-blue-600" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const Navbar = () => {
    // In a real app, you'd use a router's Link or NavLink component
    // instead of anchor tags for client-side navigation.
    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <a href="/" className="flex items-center space-x-2 text-blue-600">
                        <ChatBubbleIcon />
                        <span className="text-xl font-bold">ChatApp</span>
                    </a>
                    <div className="flex space-x-2">
                        <a href="/login" className="px-4 py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                            Login
                        </a>
                        <a href="/signup" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
