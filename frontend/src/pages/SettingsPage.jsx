import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettingsStore } from "../store/useSettingsStore";
import { useTheme } from "../contexts/ThemeContext_new";

const SettingsPage = () => {
  const {
    language,
    notifications,
    privacy,
    setLanguage,
    updateNotifications,
    updatePrivacy,
  } = useSettingsStore();

  const { theme, setTheme } = useTheme(); // Use theme context instead

  const [isLoading, setIsLoading] = useState(false);

  const themeOptions = [
    { code: "light", name: "Light Theme" },
    { code: "dark", name: "Dark Theme" },
    { code: "system", name: "System Theme" },
  ];

  const handleSaveSettings = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Chat Settings</h1>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isLoading ? "Saving..." : "Save"}</span>
          </button>
        </div>

        {/* Notifications */}
        <div className="mb-8">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            <ToggleRow
              label="Message Notifications"
              checked={notifications.sound}
              onChange={(val) => updateNotifications({ sound: val })}
            />
            <ToggleRow
              label="Mentions Notifications"
              checked={notifications.desktop}
              onChange={(val) => updateNotifications({ desktop: val })}
            />
            <ToggleRow
              label="Activity Alerts"
              checked={notifications.email}
              onChange={(val) => updateNotifications({ email: val })}
            />
          </div>
        </div>

        {/* Chat Themes */}
        <div className="mb-8">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Chat Themes</h2>
          <div className="space-y-3">
            {themeOptions.map((option) => (
              <div key={option.code} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`theme-${option.code}`}
                  name="theme"
                  value={option.code}
                  checked={theme === option.code}
                  onChange={(e) => {
                    console.log("Theme selector changed to:", e.target.value);
                    setTheme(e.target.value);
                  }}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor={`theme-${option.code}`} className="text-gray-700 dark:text-gray-300 cursor-pointer">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Preferences */}
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
            Workspace Preferences
          </h2>
          <div className="space-y-4">
            <ToggleRow
              label="Workspace Visibility"
              checked={privacy.showOnlineStatus}
              onChange={(val) => updatePrivacy({ showOnlineStatus: val })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Association Settings
              </label>
              <select
                value="all"
                onChange={() => {}}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 w-52 focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">Associate with All</option>
                <option value="none">Associate with None</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleRow = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
    </label>
  </div>
);

export default SettingsPage;
