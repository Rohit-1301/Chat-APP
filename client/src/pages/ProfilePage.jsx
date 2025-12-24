import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, User, Mail, Edit2, Save, X, Trash2, BarChart3, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import { useTheme } from "../contexts/ThemeContext_new";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { authUser, updateAuthUser } = useAuthStore();
    const { 
        profile, 
        stats, 
        isLoading, 
        isUpdating, 
        getProfile, 
        updateProfile, 
        uploadProfilePicture, 
        getUserStats,
        changePassword,
        deleteAccount
    } = useProfileStore();
    const { theme } = useTheme();

    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Load profile and stats when component mounts
        getProfile();
        getUserStats();
    }, []);

    useEffect(() => {
        // Update form data when profile loads
        if (profile) {
            setFormData({
                username: profile.username || "",
                email: profile.email || "",
            });
        }
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(file);
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleImageUpload = async () => {
        if (!imagePreview) return;

        try {
            const updatedUser = await uploadProfilePicture(imagePreview);
            // Update auth store with new profile picture
            updateAuthUser(updatedUser);
            setSelectedImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error("Failed to upload image:", error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            // Only send changed fields
            const changes = {};
            if (formData.username !== profile?.username) changes.username = formData.username;
            if (formData.email !== profile?.email) changes.email = formData.email;

            if (Object.keys(changes).length > 0) {
                const updatedUser = await updateProfile(changes);
                // Update auth store with new user data
                updateAuthUser(updatedUser);
            }
            
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            alert("New password must be at least 6 characters long!");
            return;
        }

        try {
            await changePassword(passwordData.currentPassword, passwordData.newPassword);
            setIsChangingPassword(false);
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Failed to change password:", error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            // Redirect to login page after account deletion
            navigate("/login");
        } catch (error) {
            console.error("Failed to delete account:", error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset form data to original values
        if (profile) {
            setFormData({
                username: profile.username || "",
                email: profile.email || "",
            });
        }
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleCancelPasswordChange = () => {
        setIsChangingPassword(false);
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const currentProfile = profile || authUser;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h1>
                        <div className="w-16"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Picture Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <div className="text-center">
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview || currentProfile?.profilepic || `https://api.dicebear.com/7.x/initials/svg?seed=${currentProfile?.username}`}
                                        alt={currentProfile?.username}
                                        className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 object-cover"
                                    />
                                    <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                                        <Camera className="w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                
                                {imagePreview && (
                                    <div className="mt-4 space-y-2">
                                        <button
                                            onClick={handleImageUpload}
                                            disabled={isUpdating}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                                        >
                                            {isUpdating ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save Photo
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedImage(null);
                                                setImagePreview(null);
                                            }}
                                            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                    {currentProfile?.username}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Member since {new Date(currentProfile?.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long' 
                                    })}
                                </p>
                            </div>

                            {/* Stats */}
                            {stats && (
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {stats.totalChats}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Chats</div>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {stats.totalMessages}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Messages</div>
                                    </div>
                                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            {stats.friendsCount}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Friends</div>
                                    </div>
                                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                            {stats.accountAge}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Profile Information
                                </h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 mr-1" />
                                        Edit
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={isUpdating}
                                            className="flex items-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            {isUpdating ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 mr-1" />
                                                    Save
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Username Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Username
                                    </label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                                placeholder="Enter username"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <User className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-900 dark:text-white">
                                                {currentProfile?.username}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-900 dark:text-white">
                                                {currentProfile?.email}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Account Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Account ID
                                    </label>
                                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <span className="text-gray-900 dark:text-white font-mono text-sm">
                                            {currentProfile?._id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Password Change Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Password & Security
                                </h3>
                                {!isChangingPassword ? (
                                    <button
                                        onClick={() => setIsChangingPassword(true)}
                                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        <Lock className="w-4 h-4 mr-1" />
                                        Change Password
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleChangePassword}
                                            disabled={isUpdating}
                                            className="flex items-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            {isUpdating ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 mr-1" />
                                                    Update
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={handleCancelPasswordChange}
                                            className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {isChangingPassword && (
                                <div className="space-y-4">
                                    {/* Current Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type={showPasswords.current ? "text" : "password"}
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordInputChange}
                                                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type={showPasswords.new ? "text" : "password"}
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordInputChange}
                                                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                                placeholder="Enter new password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type={showPasswords.confirm ? "text" : "password"}
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordInputChange}
                                                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                                                placeholder="Confirm new password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                                Danger Zone
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            {!showDeleteConfirm ? (
                                <button 
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Account
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-red-600 dark:text-red-400 font-semibold">
                                        Are you absolutely sure? This action cannot be undone.
                                    </p>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Yes, Delete My Account
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;