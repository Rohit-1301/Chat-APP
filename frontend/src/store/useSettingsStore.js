import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create()(
  persist(
    (set, get) => ({
      // Theme settings
      theme: "light", // Default to light mode
      themeUpdateCount: 0, // Add a counter to force re-renders
      
      // Language settings
      language: "en", // Default to English
      
      // Notification settings
      notifications: {
        sound: true,
        desktop: true,
        email: false,
      },
      
      // Privacy settings
      privacy: {
        showOnlineStatus: true,
        readReceipts: true,
        allowFriendRequests: true,
      },

      // Actions
      setTheme: (newTheme) => {
        console.log("🎨 Setting theme to:", newTheme);
        console.log("🔍 Current DOM classes before:", document.documentElement.className);
        
        // Clear any existing theme classes first
        document.documentElement.classList.remove("dark");
        
        // Apply theme to DOM FIRST
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute('data-theme', 'dark');
          console.log("✅ Applied dark theme");
        } else if (newTheme === "light") {
          document.documentElement.classList.remove("dark");
          document.documentElement.setAttribute('data-theme', 'light');
          console.log("✅ Applied light theme");
        } else if (newTheme === "system") {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (systemPrefersDark) {
            document.documentElement.classList.add("dark");
            document.documentElement.setAttribute('data-theme', 'dark');
            console.log("✅ Applied system dark theme");
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.setAttribute('data-theme', 'light');
            console.log("✅ Applied system light theme");
          }
        }
        
        console.log("🔍 Current DOM classes after:", document.documentElement.className);
        
        // Update state with incremented counter to force re-renders
        set((state) => ({ 
          theme: newTheme,
          themeUpdateCount: state.themeUpdateCount + 1
        }));
        
        // Force re-render by dispatching custom event
        window.dispatchEvent(new CustomEvent('theme-changed', { 
          detail: { theme: newTheme }
        }));
        
        console.log("🔄 Theme update complete:", newTheme);
      },

      setLanguage: (language) => set({ language }),

      updateNotifications: (notifications) => 
        set((state) => ({
          notifications: { ...state.notifications, ...notifications }
        })),

      updatePrivacy: (privacy) => 
        set((state) => ({
          privacy: { ...state.privacy, ...privacy }
        })),

      // Initialize theme on app load
      initializeTheme: () => {
        const state = get();
        const currentTheme = state.theme || "light";
        console.log("🚀 Initializing theme:", currentTheme);
        
        // Apply theme immediately
        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.documentElement.setAttribute('data-theme', 'dark');
          console.log("✅ Init: Applied dark theme");
        } else if (currentTheme === "light") {
          document.documentElement.classList.remove("dark");
          document.documentElement.setAttribute('data-theme', 'light');
          console.log("✅ Init: Applied light theme");
        } else if (currentTheme === "system") {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (systemPrefersDark) {
            document.documentElement.classList.add("dark");
            document.documentElement.setAttribute('data-theme', 'dark');
            console.log("✅ Init: Applied system dark theme");
          } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.setAttribute('data-theme', 'light');
            console.log("✅ Init: Applied system light theme");
          }
          
          // Listen for system theme changes
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleSystemThemeChange = (e) => {
            if (get().theme === "system") {
              if (e.matches) {
                document.documentElement.classList.add("dark");
                document.documentElement.setAttribute('data-theme', 'dark');
                console.log("✅ System changed to dark");
              } else {
                document.documentElement.classList.remove("dark");
                document.documentElement.setAttribute('data-theme', 'light');
                console.log("✅ System changed to light");
              }
            }
          };
          
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
          mediaQuery.addEventListener('change', handleSystemThemeChange);
        }
        
        console.log("🎯 Theme initialization complete");
      },
    }),
    {
      name: "chat-app-settings",
      getStorage: () => localStorage,
    }
  )
);
