import React, { useState } from "react";
import { 
  ArrowLeft, 
  Monitor, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Shield, 
  Volume2, 
  Mail, 
  Eye, 
  Users, 
  Check,
  Save
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSettingsStore } from "../store/useSettingsStore";

const SettingsPage = () => {
  const {
    theme,
    language,
    notifications,
    privacy,
    setTheme,
    setLanguage,
    updateNotifications,
    updatePrivacy
  } = useSettingsStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call to save settings
    setTimeout(() => {
      setIsLoading(false);
      // Show success message (you can implement toast notifications here)
      console.log("Settings saved successfully!");
    }, 1000);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0];
  };

  const ThemeButton = ({ mode, icon: Icon, label, description }) => (
    <button
      onClick={() => setTheme(mode)}
      className={`relative p-4 rounded-lg border-2 transition-all ${
        theme === mode
          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex flex-col items-center space-y-2">
        <Icon className={`h-6 w-6 ${theme === mode ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
        <span className={`text-sm font-medium ${theme === mode ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'}`}>
          {label}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {description}
        </span>
      </div>
      {theme === mode && (
        <div className="absolute top-2 right-2">
          <Check className="h-4 w-4 text-blue-600" />
        </div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h1>
            </div>
            <button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">

          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Monitor className="h-5 w-5 mr-3 text-blue-600" />
                Appearance
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Customize how ChatApp looks and feels
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <ThemeButton
                      mode="light"
                      icon={Sun}
                      label="Light"
                      description="Clean and bright"
                    />
                    <ThemeButton
                      mode="dark"
                      icon={Moon}
                      label="Dark"
                      description="Easy on the eyes"
                    />
                    <ThemeButton
                      mode="system"
                      icon={Monitor}
                      label="System"
                      description="Follow device setting"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Globe className="h-5 w-5 mr-3 text-blue-600" />
                Language & Region
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose your preferred language for the interface
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interface Language
                  </label>
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getCurrentLanguage().flag}</span>
                      <span>{getCurrentLanguage().name}</span>
                    </div>
                    <Globe className="h-4 w-4 text-gray-400" />
                  </button>
                  
                  {showLanguageDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                            language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                          {language === lang.code && <Check className="h-4 w-4 ml-auto" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Bell className="h-5 w-5 mr-3 text-blue-600" />
                Notifications
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage how you receive notifications
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sound Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Play sounds for new messages</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.sound}
                      onChange={(e) => updateNotifications({ sound: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Show notifications on desktop</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.desktop}
                      onChange={(e) => updateNotifications({ desktop: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => updateNotifications({ email: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Shield className="h-5 w-5 mr-3 text-blue-600" />
                Privacy & Security
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Control your privacy and security settings
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Online Status</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Let others see when you're online</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.showOnlineStatus}
                      onChange={(e) => updatePrivacy({ showOnlineStatus: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Read Receipts</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Show when you've read messages</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.readReceipts}
                      onChange={(e) => updatePrivacy({ readReceipts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Friend Requests</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Let others send you friend requests</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy.allowFriendRequests}
                      onChange={(e) => updatePrivacy({ allowFriendRequests: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
