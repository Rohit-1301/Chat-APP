import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create()(
  persist(
    (set, get) => ({
      // Initial state
      theme: "light",
      language: "en",
      notifications: {
        sound: true,
        desktop: true,
        email: false,
      },
      privacy: {
        showOnlineStatus: true,
        readReceipts: true,
        lastSeen: "everyone",
      },

      // Actions
      setTheme: (newTheme) => {
        console.log("Setting theme to:", newTheme);
        
        // Apply theme to DOM immediately
        const applyTheme = () => {
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
            document.body.setAttribute('data-theme', 'dark');
          } else if (newTheme === "light") {
            document.documentElement.classList.remove("dark");
            document.body.setAttribute('data-theme', 'light');
          } else if (newTheme === "system") {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
              document.documentElement.classList.add("dark");
              document.body.setAttribute('data-theme', 'dark');
            } else {
              document.documentElement.classList.remove("dark");
              document.body.setAttribute('data-theme', 'light');
            }
          }
          console.log("Applied theme. Document classes:", document.documentElement.className);
        };

        // Apply immediately
        applyTheme();
        
        // Update store state
        set({ theme: newTheme });
        
        // Force a custom event to trigger re-renders
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('themeChange', { 
            detail: { theme: newTheme } 
          }));
        }, 0);
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
        console.log("Initializing theme:", currentTheme);
        
        // Apply theme immediately
        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
          document.body.setAttribute('data-theme', 'dark');
        } else if (currentTheme === "light") {
          document.documentElement.classList.remove("dark");
          document.body.setAttribute('data-theme', 'light');
        } else if (currentTheme === "system") {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (systemPrefersDark) {
            document.documentElement.classList.add("dark");
            document.body.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.classList.remove("dark");
            document.body.setAttribute('data-theme', 'light');
          }
          
          // Listen for system theme changes
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          const handleSystemThemeChange = (e) => {
            if (get().theme === "system") {
              if (e.matches) {
                document.documentElement.classList.add("dark");
                document.body.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.classList.remove("dark");
                document.body.setAttribute('data-theme', 'light');
              }
            }
          };
          
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
          mediaQuery.addEventListener('change', handleSystemThemeChange);
        }
        
        console.log("Theme initialized. Document classes:", document.documentElement.className);
      },
    }),
    {
      name: "chat-app-settings",
      getStorage: () => localStorage,
    }
  )
);

export { useSettingsStore };
