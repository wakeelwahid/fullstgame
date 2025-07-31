
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import type { UserProfile, LoginCredentials, RegisterData } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure authentication state is properly synchronized
  useEffect(() => {
    const hasValidUser = user && user.id && user.phone;
    setIsAuthenticated(hasValidUser);
  }, [user]);

  // Login validation function
  const validateCredentials = (credentials: LoginCredentials) => {
    if (!credentials.phone || credentials.phone.trim() === '') {
      return { valid: false, error: '📱 Mobile number जरूरी है' };
    }

    if (!credentials.password || credentials.password.trim() === '') {
      return { valid: false, error: '🔒 Password जरूरी है' };
    }

    // Remove any spaces and check if it's numeric
    const cleanPhone = credentials.phone.replace(/\s/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      return { valid: false, error: '📱 10 digit का valid mobile number डालें' };
    }

    if (credentials.password.length < 4) {
      return { valid: false, error: '🔒 Password कम से कम 4 characters का होना चाहिए' };
    }

    return { valid: true };
  };

  // Register validation function
  const validateRegistration = (userData: RegisterData) => {
    // Username/Name validation
    if (!userData.name || !userData.name.trim()) {
      return { valid: false, error: 'Username जरूरी है' };
    }
    if (userData.name.length < 3) {
      return { valid: false, error: 'Username कम से कम 3 characters का होना चाहिए' };
    }
    if (userData.name.length > 50) {
      return { valid: false, error: 'Username 50 characters से कम होना चाहिए' };
    }

    // Mobile validation
    if (!userData.phone || !userData.phone.trim()) {
      return { valid: false, error: 'Mobile number जरूरी है' };
    }
    if (userData.phone.length !== 10) {
      return { valid: false, error: 'Mobile number exactly 10 digits का होना चाहिए' };
    }
    if (!/^[0-9]{10}$/.test(userData.phone)) {
      return { valid: false, error: 'Mobile number में केवल digits होने चाहिए' };
    }
    if (userData.phone.startsWith('0')) {
      return { valid: false, error: 'Mobile number 0 से शुरू नहीं हो सकता' };
    }

    // Password validation
    if (!userData.password || !userData.password.trim()) {
      return { valid: false, error: 'Password जरूरी है' };
    }
    if (userData.password.length < 6) {
      return { valid: false, error: 'Password कम से कम 6 characters का होना चाहिए' };
    }
    if (userData.password.length > 50) {
      return { valid: false, error: 'Password 50 characters से कम होना चाहिए' };
    }
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(userData.password)) {
      return { valid: false, error: 'Password में कम से कम एक letter और एक number होना चाहिए' };
    }

    // Confirm Password validation (if provided)
    if (userData.confirmPassword !== undefined) {
      if (!userData.confirmPassword || !userData.confirmPassword.trim()) {
        return { valid: false, error: 'Password confirm करना जरूरी है' };
      }
      if (userData.password !== userData.confirmPassword) {
        return { valid: false, error: 'Password और Confirm Password match नहीं कर रहे' };
      }
    }

    // Email validation (optional)
    if (userData.email && userData.email.trim() && !userData.email.includes('@')) {
      return { valid: false, error: 'Valid email address डालें' };
    }

    // Referral code validation (optional)
    if (userData.referralCode && userData.referralCode.trim() && userData.referralCode.length < 6) {
      return { valid: false, error: 'Referral code कम से कम 6 characters का होना चाहिए' };
    }

    return { valid: true };
  };

  // Login function using authService
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      
      const result = await authService.login(credentials);
      
      if (result.success && result.user) {
        // Store in AsyncStorage for mobile
        await AsyncStorage.setItem('user_data', JSON.stringify(result.user));
        await AsyncStorage.setItem('access_token', result.access || '');
        await AsyncStorage.setItem('refresh_token', result.refresh || '');
        
        // Update states
        setUser(result.user);
        setIsAuthenticated(true);
        
        return { success: true, user: result.user };
      }
      
      return { success: false, error: result.error };
      
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error। कृपया अपना internet connection check करें।' };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function using authService
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      const result = await authService.register(userData);
      
      if (result.success && result.user) {
        // Store in AsyncStorage for mobile
        await AsyncStorage.setItem('user_data', JSON.stringify(result.user));
        await AsyncStorage.setItem('access_token', result.access || '');
        await AsyncStorage.setItem('refresh_token', result.refresh || '');
        
        // Update states
        setUser({ ...result.user, isNewUser: true });
        setIsAuthenticated(true);
        
        return { success: true, user: result.user };
      }
      
      return { success: false, error: result.error };
      
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error। कृपया अपना internet connection check करें।' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function using authService
  const logout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['user_data', 'auth_token', 'access_token', 'refresh_token']);
      
      // Use authService logout
      const result = await authService.logout();
      
      // Reset states
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  };

  // Update profile function
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    try {
      if (!isAuthenticated || !user) {
        return { success: false, error: 'User not authenticated' };
      }

      const updatedUser = { ...user, ...profileData };
      await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
      }
      
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Profile update failed' };
    }
  };

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      let userData, accessToken;
      
      // Try AsyncStorage first (mobile)
      userData = await AsyncStorage.getItem('user_data');
      accessToken = await AsyncStorage.getItem('access_token');
      
      // Fallback to localStorage (web)
      if (!userData && typeof localStorage !== 'undefined') {
        userData = localStorage.getItem('user_data');
        accessToken = localStorage.getItem('access_token');
      }

      if (userData && accessToken) {
        const user = JSON.parse(userData);
        setUser(user);
        setIsAuthenticated(true);
        return { success: true, user };
      }

      return { success: false };
    } catch (error) {
      console.error('Auth check error:', error);
      return { success: false };
    }
  };

  // Check if user is authenticated
  const requireAuth = () => {
    return isAuthenticated;
  };

  // Initialize authentication on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        const result = await checkAuthStatus();
        if (result.success && result.user) {
          setUser(result.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus,
    requireAuth
  };
};
