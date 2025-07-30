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
        } else if (response.status === 403) {
          return { success: false, error: data.error || 'आपका account block है।' };
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

      // Store user data and tokens securely
      await AsyncStorage.setItem('user_data', JSON.stringify(loggedInUser));
      await AsyncStorage.setItem('access_token', data.access);
      await AsyncStorage.setItem('refresh_token', data.refresh);
      
      // Also store in localStorage for web
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user_data', JSON.stringify(loggedInUser));
      }

      // Update states
      setUser(loggedInUser);
      setIsAuthenticated(true);

      return { success: true, user: loggedInUser };

    } catch (error) {
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

      // Prepare API payload - mapping to backend expected format
      const registerPayload = {
        username: userData.name,
        mobile: userData.phone,
        email: userData.email || '',
        password: userData.password,
        referral_code: userData.referralCode || ''
      };

      console.log('Making registration API call to:', `${apiService.baseURL}/register/`);
      console.log('Registration payload:', registerPayload);

      // Professional single API call using apiService
      const response = await apiService.post(`/register/`, registerPayload);

      console.log('Registration response:', response.data);

      if (response.data.access) {
        const registeredUser = {
          id: response.data.user?.id?.toString() || '',
          name: response.data.user?.username || userData.name,
          phone: response.data.user?.mobile || userData.phone,
          email: response.data.user?.email || userData.email || '',
          referralCode: response.data.user?.referral_code || '',
          isNewUser: true
        };

        // Store authentication tokens securely
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          localStorage.setItem('user_data', JSON.stringify(registeredUser));
        }

        // Update auth states
        setUser(registeredUser);
        setIsAuthenticated(true);

        return { success: true, user: registeredUser };
      }

      return { 
        success: false, 
        error: response.data.error || response.data.detail || 'Registration failed' 
      };

    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error। कृपया अपना internet connection check करें।' };
    } finally {
      setIsLoading(false);
    }eredUser));
        await AsyncStorage.setItem('access_token', result.data.token);
        
        // Also store in localStorage for web
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('access_token', result.data.token);
          localStorage.setItem('user_data', JSON.stringify(registeredUser));
        }

        // Update states
        setUser(registeredUser);
        setIsAuthenticated(true);

        return { success: true, user: registeredUser };
      } else {
        return { success: false, error: result.error || 'Registration failed' };
      }

    } catch (error) {
      return { success: false, error: 'Network error। कृपया अपना internet connection check करें।' };
    } finally {
      setIsLoading(false);
    }
  };

      

  const logout = async () => {
    try {
      // Clear all stored data from AsyncStorage
      await AsyncStorage.multiRemove(['user_data', 'auth_token', 'access_token', 'refresh_token']);

      // Clear localStorage for web
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('authToken');
      }

      // Reset all states to initial values
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);

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
        // Silent error handling
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