import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ThemeTest from "./pages/ThemeTest";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <div className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theme-test" element={<ThemeTest />} />
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
    </div>
  );
};

export default App;
