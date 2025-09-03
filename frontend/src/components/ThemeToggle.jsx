import React, { useState } from "react";
import { Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext_new";

const ThemeToggle = ({ className = "", inDropdown = false }) => {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleThemeChange = (newTheme) => {
    setIsAnimating(true);
    setTheme(newTheme);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    handleThemeChange(newTheme);
  };

  if (inDropdown) {
    return (
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            Theme
          </span>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1 relative overflow-hidden">
          {/* Animated background slider */}
          <div 
            className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-md shadow-sm transition-transform duration-300 ease-out ${
              theme === "light" ? "translate-x-0" : "translate-x-full"
            }`}
          />
          
          <button
            onClick={() => handleThemeChange("light")}
            className={`relative z-10 p-2 rounded-md transition-all duration-200 flex-1 flex items-center justify-center ${
              theme === "light" 
                ? "text-gray-900" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Light mode"
          >
            <Sun className={`h-4 w-4 transition-transform duration-200 ${isAnimating && theme === "light" ? "rotate-180 scale-110" : ""}`} />
          </button>
          
          <button
            onClick={() => handleThemeChange("dark")}
            className={`relative z-10 p-2 rounded-md transition-all duration-200 flex-1 flex items-center justify-center ${
              theme === "dark" 
                ? "text-gray-900" 
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Dark mode"
          >
            <Moon className={`h-4 w-4 transition-transform duration-200 ${isAnimating && theme === "dark" ? "rotate-12 scale-110" : ""}`} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg border-2 backdrop-blur-sm ${
          theme === "light" 
            ? "bg-white/80 border-gray-200 hover:bg-white hover:shadow-xl" 
            : "bg-gray-800/80 border-gray-600 hover:bg-gray-800 hover:shadow-2xl"
        } ${className}`}
      >
        {/* Animated background */}
        <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          theme === "light" 
            ? "bg-gradient-to-br from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100" 
            : "bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100"
        }`} />
        
        {/* Icon container */}
        <div className="relative z-10">
          {theme === "light" ? (
            <Moon className={`h-5 w-5 text-gray-600 transition-all duration-300 group-hover:text-blue-600 ${
              isAnimating ? "rotate-12 scale-110" : ""
            }`} />
          ) : (
            <Sun className={`h-5 w-5 text-yellow-400 transition-all duration-300 group-hover:text-yellow-300 ${
              isAnimating ? "rotate-180 scale-110" : ""
            }`} />
          )}
        </div>

        {/* Ripple effect */}
        <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isAnimating 
            ? "bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
            : ""
        }`} />
      </button>

      {/* Enhanced tooltip */}
      {showTooltip && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`px-3 py-2 text-xs font-medium rounded-lg shadow-lg border transition-all duration-200 ${
            theme === "light"
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-200"
          }`}>
            Switch to {theme === "light" ? "dark" : "light"} mode
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              theme === "light" ? "border-t-gray-900" : "border-t-white"
            }`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
