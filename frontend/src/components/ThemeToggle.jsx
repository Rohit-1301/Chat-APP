import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext_new";

const ThemeToggle = ({ className = "", inDropdown = false }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("🔄 ThemeToggle: Changing theme from", theme, "to", newTheme);
    setTheme(newTheme);
  };

  if (inDropdown) {
    return (
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Theme</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTheme("light")}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                theme === "light" 
                  ? "bg-white shadow-sm text-gray-900" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Light mode"
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                theme === "dark" 
                  ? "bg-white shadow-sm text-gray-900" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Dark mode"
            >
              <Moon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105 shadow-sm border border-gray-200 ${className}`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-600" />
      ) : (
        <Sun className="h-5 w-5 text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
