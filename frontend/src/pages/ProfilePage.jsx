import React, { useState } from "react";
import { User, Mail, Camera, Save, ArrowLeft, Edit3, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: authUser?.username || "",
    email: authUser?.email || "",
    profilepic: authUser?.profilepic || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilepic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      // Here you would normally call your API to update the profile
      console.log("Profile updated:", profileData);
    }, 1000);
  };

  const handleCancel = () => {
    setProfileData({
      username: authUser?.username || "",
      email: authUser?.email || "",
      profilepic: authUser?.profilepic || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h1>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSave}>
            {/* Profile Picture Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileData.profilepic || `https://i.pravatar.cc/150?u=${profileData.username}`}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{profileData.username}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{profileData.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Member since {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter your username"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Profile Picture URL Field */}
              <div>
                <label htmlFor="profilepic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Camera className="inline h-4 w-4 mr-2" />
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  id="profilepic"
                  name="profilepic"
                  value={profileData.profilepic}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEditing ? 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  placeholder="Enter profile picture URL (optional)"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Leave empty to use auto-generated avatar
                </p>
              </div>

              {/* Password Change Link */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <Key className="h-4 w-4 mr-2" />
                      Password
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Last updated {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3 rounded-b-lg">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Additional Profile Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Chats</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Messages Sent</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Friends</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
