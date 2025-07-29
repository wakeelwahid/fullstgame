import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { apiService } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure authentication state is properly synchronized
  useEffect(() => {
    const hasValidUser = user && user.id && user.phone;
    setIsAuthenticated(hasValidUser);
    console.log('Auth state updated:', { hasValidUser, userId: user?.id, userName: user?.name });
  }, [user]);

  // Login validation function
  const validateCredentials = (credentials: any) => {
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
  const validateRegistration = (userData: any) => {
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

    // Confirm Password validation
    if (!userData.confirmPassword || !userData.confirmPassword.trim()) {
      return { valid: false, error: 'Password confirm करना जरूरी है' };
    }
    if (userData.password !== userData.confirmPassword) {
      return { valid: false, error: 'Password और Confirm Password match नहीं कर रहे' };
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

  const login = async (credentials: any) => {
    try {
      setIsLoading(true);

      // Validate credentials first
      const validation = validateCredentials(credentials);
      if (!validation.valid) {
        setIsLoading(false);
        return { success: false, error: validation.error };
      }

      // Prepare API payload
      const payload = {
        mobile: credentials.phone.trim(),
        password: credentials.password
      };

      // Make API call to backend
      const response = await fetch(`${apiService.baseURL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          return { success: false, error: 'Invalid mobile number या password। कृपया check करें।' };
        } else if (response.status === 400) {
          return { success: false, error: data.error || 'Login details incorrect हैं।' };
        } else {
          return { success: false, error: 'Login में problem हुई। कृपया बाद में try करें।' };
        }
      }

      // If login successful, create user object
      const loggedInUser = {
        id: data.user?.id || Date.now().toString(),
        name: data.user?.username || `User ${credentials.phone.slice(-4)}`,
        phone: data.user?.mobile || credentials.phone,
        email: data.user?.email || '',
        kycStatus: data.user?.kyc_status || 'PENDING',
        referralCode: data.user?.referral_code || 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        walletBalance: data.user?.wallet_balance || 0,
        isVerified: data.user?.is_verified || false,
        joinedAt: data.user?.created_at || new Date().toISOString()
      };

      // Store user data securely
      await AsyncStorage.setItem('user_data', JSON.stringify(loggedInUser));
      await AsyncStorage.setItem('auth_token', data.token || 'token_' + Date.now());

      // Update states
      setUser(loggedInUser);
      setIsAuthenticated(true);

      console.log('User authenticated successfully:', loggedInUser.name, 'ID:', loggedInUser.id);
      return { success: true, user: loggedInUser };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error। कृपया अपना internet connection check करें।' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);

      // Validate registration data
      const validation = validateRegistration(userData);
      if (!validation.valid) {
        setIsLoading(false);
        return { success: false, error: validation.error };
      }

      console.log('Starting registration with data:', userData);
      
      // Use userService for registration
      const result = await userService.register({
        name: userData.name,
        phone: userData.phone,
        email: userData.email || '',
        password: userData.password,
        referralCode: userData.referralCode || ''
      });

      if (result.success && result.data) {
        // Set user and auth state
        setUser(result.data.user);
        setIsAuthenticated(true);
        
        console.log('Registration successful:', result.data.user.name);
        return { success: true, user: result.data.user };
      }
      
      return { success: false, error: result.error || 'Registration failed' };

    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. कृपया बाद में try करें।' };
    } finally {
      setIsLoading(false);
    }
  };e: userData.name.trim(),
        mobile: userData.phone.trim(),
        email: userData.email?.trim() || '',
        password: userData.password,
        confirm_password: userData.confirmPassword,
        referral_code: userData.referralCode?.trim().toUpperCase() || ''
      };

      // Make API call to backend
      const response = await fetch(`${apiService.baseURL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different types of errors from backend
        if (response.status === 400) {
          if (data?.mobile) {
            return { success: false, error: 'Mobile number already exists. कृपया दूसरा number उपयोग करें।' };
          } else if (data?.referred_by) {
            return { success: false, error: 'Invalid referral code. कृपया check करके try करें।' };
          } else if (data?.username) {
            return { success: false, error: data.username[0] };
          } else if (typeof data === 'object') {
            const firstKey = Object.keys(data)[0];
            return { success: false, error: data[firstKey] };
          } else {
            return { success: false, error: 'Registration failed. कृपया अपनी details check करें।' };
          }
        } else {
          return { success: false, error: 'Registration failed. कृपया बाद में try करें।' };
        }
      }

      // If registration successful, create user object
      const newUser = {
        id: data.user?.id || Date.now().toString(),
        name: data.user?.username || userData.name,
        phone: data.user?.mobile || userData.phone,
        email: data.user?.email || userData.email || '',
        kycStatus: 'PENDING',
        referralCode: data.user?.referral_code || 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        walletBalance: data.user?.wallet_balance || 0,
        isVerified: data.user?.is_verified || false,
        joinedAt: data.user?.created_at || new Date().toISOString(),
        referredBy: userData.referralCode || null
      };

      // Store user data securely
      await AsyncStorage.setItem('user_data', JSON.stringify(newUser));
      await AsyncStorage.setItem('auth_token', data.token || 'token_' + Date.now());

      // Update states
      setUser(newUser);
      setIsAuthenticated(true);

      console.log('User registered and authenticated successfully:', newUser.name);
      return { success: true, user: newUser };

    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. कृपया अपना internet connection check करें।' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear all stored data
      await AsyncStorage.multiRemove(['user_data', 'auth_token']);

      // Reset all states to initial values
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);

      console.log('Logout successful - all states cleared');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  };

  const updateProfile = async (profileData: any) => {
    try {
      if (!isAuthenticated) {
        return { success: false, error: 'User not authenticated' };
      }

      const updatedUser = { ...user, ...profileData };
      await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  };

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      const authToken = await AsyncStorage.getItem('auth_token');

      if (userData && authToken) {
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

  const requireAuth = () => {
    return isAuthenticated;
  };

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

  const loading = isLoading;
  return {
    user,
    isAuthenticated,
    isLoading: loading,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus,
    requireAuth
  };
};