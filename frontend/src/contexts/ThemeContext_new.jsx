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
    
    // Apply to DOM immediately with multiple attempts
    setTimeout(() => applyThemeToDom(newTheme), 0);
    setTimeout(() => applyThemeToDom(newTheme), 10);
    setTimeout(() => applyThemeToDom(newTheme), 100);
    
    console.log('✅ Theme set successfully:', newTheme);
  };

  const forceTheme = (newTheme) => {
    console.log('💪 Force applying theme:', newTheme);
    
    // Immediate DOM manipulation
    const html = document.documentElement;
    const body = document.body;
    
    // Nuclear option - completely override everything
    html.className = '';
    html.removeAttribute('data-theme');
    html.removeAttribute('style');
    body.removeAttribute('style');
    
    // Remove all existing classes and styles from all elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.transition = 'none';
    });
    
    // Apply new theme immediately
    if (newTheme === 'dark') {
      html.className = 'dark';
      html.setAttribute('data-theme', 'dark');
      html.style.cssText = 'background: #111827 !important; color-scheme: dark !important;';
      body.style.cssText = 'background: #111827 !important; color: #f3f4f6 !important; color-scheme: dark !important;';
      
      // Force all elements to dark mode
      setTimeout(() => {
        document.querySelectorAll('.bg-white').forEach(el => {
          el.style.backgroundColor = '#1f2937';
        });
        document.querySelectorAll('.bg-gray-50').forEach(el => {
          el.style.backgroundColor = '#111827';
        });
        document.querySelectorAll('.text-gray-900').forEach(el => {
          el.style.color = '#f3f4f6';
        });
      }, 1);
      
    } else {
      html.className = 'light';
      html.setAttribute('data-theme', 'light');
      html.style.cssText = 'background: #ffffff !important; color-scheme: light !important;';
      body.style.cssText = 'background: #ffffff !important; color: #111827 !important; color-scheme: light !important;';
      
      // Force all elements to light mode
      setTimeout(() => {
        document.querySelectorAll('.bg-gray-800').forEach(el => {
          el.style.backgroundColor = '#ffffff';
        });
        document.querySelectorAll('.bg-gray-900').forEach(el => {
          el.style.backgroundColor = '#f9fafb';
        });
        document.querySelectorAll('.text-white').forEach(el => {
          el.style.color = '#111827';
        });
      }, 1);
    }
    
    // Force reflow multiple times
    html.offsetHeight;
    body.offsetHeight;
    
    // Update context
    setThemeState(newTheme);
    localStorage.setItem('chat-app-theme', newTheme);
    
    console.log('💪 Force theme complete:', {
      htmlClass: html.className,
      htmlBg: html.style.background,
      bodyBg: body.style.background
    });
  };

  const applyThemeToDom = (themeValue) => {
    console.log('🔧 Applying theme to DOM:', themeValue);
    
    // Get references to elements
    const html = document.documentElement;
    const body = document.body;
    
    // Clear all existing theme classes and attributes
    html.classList.remove('dark', 'light');
    html.removeAttribute('data-theme');
    body.removeAttribute('data-theme');
    
    // Force a style recalculation
    html.style.display = 'none';
    html.offsetHeight; // Trigger reflow
    html.style.display = '';
    
    // Apply the new theme
    if (themeValue === 'dark') {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      body.setAttribute('data-theme', 'dark');
      body.style.colorScheme = 'dark';
      
      // Force immediate style application
      html.style.backgroundColor = '#111827';
      body.style.backgroundColor = '#111827';
      body.style.color = '#f3f4f6';
      
    } else if (themeValue === 'light') {
      // Explicitly remove dark class
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
      body.setAttribute('data-theme', 'light');
      body.style.colorScheme = 'light';
      
      // Force immediate style application
      html.style.backgroundColor = '#ffffff';
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#111827';
      
    } else if (themeValue === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        html.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
        body.setAttribute('data-theme', 'dark');
        body.style.colorScheme = 'dark';
        html.style.backgroundColor = '#111827';
        body.style.backgroundColor = '#111827';
        body.style.color = '#f3f4f6';
      } else {
        html.classList.remove('dark');
        html.setAttribute('data-theme', 'light');
        body.setAttribute('data-theme', 'light');
        body.style.colorScheme = 'light';
        html.style.backgroundColor = '#ffffff';
        body.style.backgroundColor = '#ffffff';
        body.style.color = '#111827';
      }
    }
    
    // Force all child elements to recalculate styles
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.transition = 'none';
      el.offsetHeight; // Force reflow
      el.style.transition = '';
    });
    
    console.log('🔍 DOM classes after applying theme:', html.className);
    console.log('🔍 Data theme attribute:', html.getAttribute('data-theme'));
    console.log('🔍 Body background:', body.style.backgroundColor);
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
