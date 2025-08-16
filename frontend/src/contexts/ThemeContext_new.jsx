import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    // Get theme from localStorage on initial load
    const savedTheme = localStorage.getItem('chat-app-theme');
    return savedTheme || 'light';
  });

  const setTheme = (newTheme) => {
    console.log('🎨 ThemeProvider: Setting theme to:', newTheme);
    
    // Update state
    setThemeState(newTheme);
    
    // Save to localStorage
    localStorage.setItem('chat-app-theme', newTheme);
    
    // Apply to DOM immediately
    applyThemeToDom(newTheme);
    
    console.log('✅ Theme set successfully:', newTheme);
  };

  const applyThemeToDom = (themeValue) => {
    console.log('🔧 Applying theme to DOM:', themeValue);
    
    // Remove all theme classes first
    document.documentElement.classList.remove('dark', 'light');
    
    if (themeValue === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.colorScheme = 'dark';
    } else if (themeValue === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.style.colorScheme = 'light';
    } else if (themeValue === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
        document.body.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.style.colorScheme = 'light';
      }
    }
    
    console.log('🔍 DOM classes after applying theme:', document.documentElement.className);
  };

  // Apply theme on mount
  useEffect(() => {
    console.log('🚀 ThemeProvider mounted, applying theme:', theme);
    applyThemeToDom(theme);
    
    // Listen for system theme changes if theme is set to system
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        console.log('🌐 System theme changed:', e.matches ? 'dark' : 'light');
        applyThemeToDom('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
