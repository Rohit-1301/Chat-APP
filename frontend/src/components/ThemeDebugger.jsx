import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext_new';

const ThemeDebugger = () => {
    const { theme, setTheme, forceTheme } = useTheme();
    const [domInfo, setDomInfo] = useState({});

    useEffect(() => {
        const updateDomInfo = () => {
            setDomInfo({
                htmlClasses: document.documentElement.className,
                dataTheme: document.documentElement.getAttribute('data-theme'),
                bodyClasses: document.body.className,
                colorScheme: document.body.style.colorScheme,
                localStorageTheme: localStorage.getItem('chat-app-theme'),
                contextTheme: theme,
                systemPrefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches
            });
        };

        updateDomInfo();
        
        // Update every second to see real-time changes
        const interval = setInterval(updateDomInfo, 1000);
        
        return () => clearInterval(interval);
    }, [theme]);

    const testThemeChange = (newTheme) => {
        console.log('🧪 Testing theme change to:', newTheme);
        setTheme(newTheme);
    };

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg max-w-md z-50">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Theme Debugger</h3>
            
            {/* Current Status */}
            <div className="space-y-2 text-sm mb-4">
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>Context Theme:</strong> {domInfo.contextTheme}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>LocalStorage:</strong> {domInfo.localStorageTheme}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>HTML Classes:</strong> {domInfo.htmlClasses || 'none'}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>Data Theme:</strong> {domInfo.dataTheme || 'none'}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>Color Scheme:</strong> {domInfo.colorScheme || 'none'}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>System Prefers Dark:</strong> {domInfo.systemPrefersDark ? 'Yes' : 'No'}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>HTML BG:</strong> {document.documentElement.style.background || 'none'}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                    <strong>Body BG:</strong> {document.body.style.background || 'none'}
                </div>
            </div>

            {/* Test Buttons */}
            <div className="space-y-2">
                <button
                    onClick={() => testThemeChange('light')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm"
                >
                    Set Light
                </button>
                <button
                    onClick={() => testThemeChange('dark')}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded text-sm"
                >
                    Set Dark
                </button>
                <button
                    onClick={() => testThemeChange('system')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
                >
                    System
                </button>
                
                {/* Force Buttons */}
                <div className="border-t pt-2 mt-2">
                    <div className="text-xs text-gray-500 mb-1">Nuclear Options:</div>
                    <button
                        onClick={() => forceTheme('light')}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs mb-1"
                    >
                        FORCE Light
                    </button>
                    <button
                        onClick={() => forceTheme('dark')}
                        className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs mb-1"
                    >
                        FORCE Dark
                    </button>
                    <button
                        onClick={() => {
                            const body = document.body;
                            const html = document.documentElement;
                            console.log('🔍 Computed Styles:', {
                                htmlComputed: window.getComputedStyle(html),
                                bodyComputed: window.getComputedStyle(body),
                                htmlBg: window.getComputedStyle(html).backgroundColor,
                                bodyBg: window.getComputedStyle(body).backgroundColor,
                                htmlColor: window.getComputedStyle(html).color,
                                bodyColor: window.getComputedStyle(body).color
                            });
                        }}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs"
                    >
                        Debug Styles
                    </button>
                </div>
            </div>

            {/* Visual Test */}
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="text-gray-900 dark:text-white text-sm">
                    This box should change color based on theme
                </div>
                <div className="w-4 h-4 bg-red-500 dark:bg-green-500 rounded mt-2"></div>
            </div>
        </div>
    );
};

export default ThemeDebugger;
