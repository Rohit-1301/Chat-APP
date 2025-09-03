import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  pendingEmail: null,
  otpPreview: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", credentials);
      if (res.data && res.data.message === 'OTP_SENT') {
        set({ pendingEmail: res.data.email || credentials.email, otpPreview: res.data.preview || null });
        return { success: false, otpRequired: true, email: res.data.email, preview: res.data.preview };
      }
      set({ authUser: res.data });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Signup failed" };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      if (res.data && res.data.message === 'OTP_SENT') {
        set({ pendingEmail: res.data.email || credentials.email, otpPreview: res.data.preview || null });
        return { success: false, otpRequired: true, email: res.data.email, preview: res.data.preview };
      }
      set({ authUser: res.data });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  verifyOtp: async ({ email, otp }) => {
    try {
      const res = await axiosInstance.post('/auth/verify-otp', { email, otp });
      if (res.data && res.data.message === 'VERIFIED') {
        set({ pendingEmail: null, otpPreview: null, authUser: { _id: res.data._id, email: res.data.email, username: res.data.username } });
        return { success: true };
      }
      return { success: false, message: res.data?.message || 'Verification failed' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Verification failed' };
    }
  },

  resendOtp: async (email) => {
    try {
      const res = await axiosInstance.post('/auth/resend-otp', { email });
      if (res.data && res.data.message === 'OTP_SENT') {
        set({ otpPreview: res.data.preview || null });
        return { success: true, preview: res.data.preview };
      }
      return { success: false, message: res.data?.message || 'Resend failed' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Resend failed' };
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("Error in logout: ", error.message);
    }
  },

  updateAuthUser: (userData) => {
    set({ authUser: userData });
  },
}));
