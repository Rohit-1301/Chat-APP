import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Theme settings
      theme: "light", // Default to light mode
      
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
        console.log("Setting theme to:", newTheme); // Debug log
        
        // Update state first
        set({ theme: newTheme });
        
        // Apply theme to document immediately
        requestAnimationFrame(() => {
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
            console.log("Applied dark theme - classes:", document.documentElement.className);
          } else if (newTheme === "light") {
            document.documentElement.classList.remove("dark");
            console.log("Applied light theme - classes:", document.documentElement.className);
          } else if (newTheme === "system") {
            // Follow system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
              document.documentElement.classList.add("dark");
              console.log("Applied system dark theme");
            } else {
              document.documentElement.classList.remove("dark");
              console.log("Applied system light theme");
            }
          }
        });
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
        const currentTheme = state.theme || "light"; // Default to light if no theme is set
        console.log("Initializing theme:", currentTheme); // Debug log
        
        // Apply theme immediately
        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
          console.log("Init: Applied dark theme");
        } else if (currentTheme === "light") {
          document.documentElement.classList.remove("dark");
          console.log("Init: Applied light theme");
        } else if (currentTheme === "system") {
          // Follow system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (systemPrefersDark) {
            document.documentElement.classList.add("dark");
            console.log("Init: Applied system dark theme");
          } else {
            document.documentElement.classList.remove("dark");
            console.log("Init: Applied system light theme");
          }
          
          // Listen for system theme changes
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleSystemThemeChange = (e) => {
            if (get().theme === "system") {
              if (e.matches) {
                document.documentElement.classList.add("dark");
                console.log("System changed to dark");
              } else {
                document.documentElement.classList.remove("dark");
                console.log("System changed to light");
              }
            }
          };
          
          // Remove any existing listener before adding new one
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
          mediaQuery.addEventListener('change', handleSystemThemeChange);
        }
      },
    }),
    {
      name: "chat-app-settings", // Storage key
      getStorage: () => localStorage,
    }
  )
);
