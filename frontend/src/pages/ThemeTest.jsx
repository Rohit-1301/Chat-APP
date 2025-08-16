import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext_new';

const ThemeTest = () => {
  const { theme, setTheme } = useTheme();
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
    console.log('🔄 ThemeTest component rendered, count:', renderCount + 1);
  });

  const testTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('🧪 Testing theme change:', theme, '->', newTheme);
    setTheme(newTheme);
  };

  const clearStorage = () => {
    localStorage.removeItem('chat-app-theme');
    localStorage.removeItem('chat-app-settings');
    window.location.reload();
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4">Theme Testing Page</h1>
      
      <div className="space-y-4">
        <p>Current Theme: <strong className="text-blue-600 dark:text-blue-400">{theme}</strong></p>
        <p>Render Count: <strong className="text-green-600 dark:text-green-400">{renderCount}</strong></p>
        <p>DOM Classes: <strong className="text-purple-600 dark:text-purple-400">{document.documentElement.className}</strong></p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <button 
            onClick={testTheme}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Toggle Theme
          </button>
          
          <button 
            onClick={() => setTheme('light')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
          >
            Light
          </button>
          
          <button 
            onClick={() => setTheme('dark')}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded transition-colors"
          >
            Dark
          </button>
          
          <button 
            onClick={clearStorage}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Clear Storage
          </button>
        </div>
        
        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-300">
          <h2 className="text-lg font-semibold mb-4">Test Elements:</h2>
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow transition-colors duration-300">
              <p className="text-gray-800 dark:text-gray-200">This card should change background and text color smoothly</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 transition-colors duration-300">
              <p className="text-blue-800 dark:text-blue-200">This is an info box that should adapt to the theme</p>
            </div>
            <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300">
              Gradient Button (should work in both themes)
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>If theme switching works, you should see:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Background color changes immediately</li>
            <li>Text colors adapt to the theme</li>
            <li>Render count increases on each change</li>
            <li>Console logs show theme transitions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeTest;
