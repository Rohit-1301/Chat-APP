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
    // Update state and persist
    setThemeState(newTheme);
    localStorage.setItem('chat-app-theme', newTheme);

    // Apply theme by toggling top-level classes/attributes only.
    // Avoid inline styling or mass element iteration which creates hard-to-debug conflicts.
    applyThemeToDom(newTheme);
  };

  const forceTheme = (newTheme) => {
    // Keep forceTheme simple: delegate to setTheme which handles persistence
    setTheme(newTheme);
  };

  const applyThemeToDom = (themeValue) => {
    // Toggle only the top-level html/body classes & data attributes.
    const html = document.documentElement;
    const body = document.body;

    html.classList.remove('dark', 'light');
    if (themeValue === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.add(prefersDark ? 'dark' : 'light');
      html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      html.classList.add(themeValue);
      html.setAttribute('data-theme', themeValue);
      body.setAttribute('data-theme', themeValue);
    }
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
    <ThemeContext.Provider value={{ theme, setTheme, forceTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
