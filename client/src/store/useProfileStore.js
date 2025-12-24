import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProfileStore = create((set, get) => ({
  profile: null,
  stats: null,
  isLoading: false,
  isUpdating: false,

  // Get user profile
  getProfile: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/profile");
      set({ profile: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || "Failed to load profile");
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put("/profile/update", profileData);
      set({ 
        profile: response.data.user, 
        isUpdating: false 
      });
      toast.success("Profile updated successfully!");
      return response.data.user;
    } catch (error) {
      set({ isUpdating: false });
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (profilepic) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.post("/profile/upload-picture", {
        profilepic
      });
      set({ 
        profile: response.data.user, 
        isUpdating: false 
      });
      toast.success("Profile picture updated successfully!");
      return response.data.user;
    } catch (error) {
      set({ isUpdating: false });
      toast.error(error.response?.data?.message || "Failed to upload profile picture");
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    set({ isUpdating: true });
    try {
      const response = await axiosInstance.put("/profile/change-password", {
        currentPassword,
        newPassword
      });
      set({ isUpdating: false });
      toast.success("Password changed successfully!");
      return response.data;
    } catch (error) {
      set({ isUpdating: false });
      toast.error(error.response?.data?.message || "Failed to change password");
      throw error;
    }
  },

  // Get user statistics
  getUserStats: async () => {
    try {
      const response = await axiosInstance.get("/profile/stats");
      set({ stats: response.data });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load statistics");
      throw error;
    }
  },

  // Delete account
  deleteAccount: async () => {
    try {
      await axiosInstance.delete("/profile/delete");
      set({ profile: null, stats: null });
      toast.success("Account deleted successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
      throw error;
    }
  },

  // Clear profile data
  clearProfile: () => {
    set({ profile: null, stats: null });
  }
}));
