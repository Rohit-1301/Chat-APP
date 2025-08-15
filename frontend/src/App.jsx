import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div className="text-xl font-semibold text-gray-700">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/signup" 
        element={!authUser ? <SignUpPage /> : <Navigate to="/" />} 
      />
      <Route 
        path="/login" 
        element={!authUser ? <LoginPage /> : <Navigate to="/" />} 
      />
      <Route 
        path="/settings" 
        element={authUser ? <SettingsPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile" 
        element={authUser ? <ProfilePage /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
};

export default App;
