
import { apiService } from './apiService';

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  email?: string;
  password: string;
  confirmPassword?: string;
  referralCode?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  referralCode: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  walletBalance?: number;
  isVerified?: boolean;
  joinedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
  access?: string;
  refresh?: string;
}

class AuthService {
  private API_BASE_URL = 'https://0084f960-81d6-49ad-b213-176e01e7ed47-00-104c87rivqu68.kirk.replit.dev:8000';

  // Login validation
  private validateLogin(credentials: LoginCredentials) {
    if (!credentials.phone || credentials.phone.trim() === '') {
      return { valid: false, error: '📱 Mobile number जरूरी है' };
    }

    if (!credentials.password || credentials.password.trim() === '') {
      return { valid: false, error: '🔒 Password जरूरी है' };
    }

    const cleanPhone = credentials.phone.replace(/\s/g, '');
    if (!/^\d{10}$/.test(cleanPhone)) {
      return { valid: false, error: '📱 10 digit का valid mobile number डालें' };
    }

    if (credentials.password.length < 4) {
      return { valid: false, error: '🔒 Password कम से कम 4 characters का होना चाहिए' };
    }

    return { valid: true };
  }

  // Register validation
  private validateRegister(userData: RegisterData) {
    if (!userData.name || !userData.name.trim()) {
      return { valid: false, error: 'Username जरूरी है' };
    }
    if (userData.name.length < 3) {
      return { valid: false, error: 'Username कम से कम 3 characters का होना चाहिए' };
    }
    if (userData.name.length > 50) {
      return { valid: false, error: 'Username 50 characters से कम होना चाहिए' };
    }

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

    if (userData.confirmPassword !== undefined) {
      if (!userData.confirmPassword || !userData.confirmPassword.trim()) {
        return { valid: false, error: 'Password confirm करना जरूरी है' };
      }
      if (userData.password !== userData.confirmPassword) {
        return { valid: false, error: 'Password और Confirm Password match नहीं कर रहे' };
      }
    }

    if (userData.email && userData.email.trim() && !userData.email.includes('@')) {
      return { valid: false, error: 'Valid email address डालें' };
    }

    if (userData.referralCode && userData.referralCode.trim() && userData.referralCode.length < 6) {
      return { valid: false, error: 'Referral code कम से कम 6 characters का होना चाहिए' };
    }

    return { valid: true };
  }

  // Login API call
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const validation = this.validateLogin(credentials);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const payload = {
        mobile: credentials.phone.trim(),
        password: credentials.password
      };

      const response = await fetch(`${this.API_BASE_URL}/api/login/`, {
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

      const user: UserProfile = {
        id: data.user?.id?.toString() || Date.now().toString(),
        name: data.user?.username || `User ${credentials.phone.slice(-4)}`,
        phone: data.user?.mobile || credentials.phone,
        email: data.user?.email || '',
        kycStatus: data.user?.kyc_status || 'PENDING',
        referralCode: data.user?.referral_code || 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        walletBalance: data.user?.wallet_balance || 0,
        isVerified: data.user?.is_verified || false,
        joinedAt: data.user?.created_at || new Date().toISOString()
      };

      // Store tokens
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user_data', JSON.stringify(user));
      }

      return { 
        success: true, 
        user, 
        access: data.access, 
        refresh: data.refresh 
      };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error। कृपया अपना internet connection check करें।' };
    }
  }

  // Register API call
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const validation = this.validateRegister(userData);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const registerPayload = {
        username: userData.name,
        mobile: userData.phone,
        email: userData.email || '',
        password: userData.password,
        referral_code: userData.referralCode || ''
      };

      console.log('[AUTH_SERVICE] Register payload:', registerPayload);
      console.log('[AUTH_SERVICE] Register URL:', `${this.API_BASE_URL}/api/register/`);

      const response = await fetch(`${this.API_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          return { success: false, error: data.error || data.detail || 'Registration में problem हुई।' };
        } else if (response.status === 409) {
          return { success: false, error: 'यह mobile number पहले से registered है।' };
        } else {
          return { success: false, error: 'Registration में problem हुई। कृपया बाद में try करें।' };
        }
      }

      if (data.access) {
        const user: UserProfile = {
          id: data.user?.id?.toString() || Date.now().toString(),
          name: data.user?.username || userData.name,
          phone: data.user?.mobile || userData.phone,
          email: data.user?.email || userData.email || '',
          referralCode: data.user?.referral_code || 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase(),
          kycStatus: 'PENDING',
          walletBalance: 0,
          isVerified: false,
          joinedAt: new Date().toISOString()
        };

        // Store tokens
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          localStorage.setItem('user_data', JSON.stringify(user));
        }

        return { 
          success: true, 
          user, 
          access: data.access, 
          refresh: data.refresh 
        };
      }

      return { 
        success: false, 
        error: data.error || data.detail || 'Registration failed' 
      };

    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error। कृपया अपना internet connection check करें।' };
    }
  }

  // Logout
  async logout(): Promise<{ success: boolean }> {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('authToken');
      }
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  }

  // Get stored user data
  getCurrentUser(): UserProfile | null {
    try {
      if (typeof localStorage !== 'undefined') {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    try {
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('access_token');
        const userData = localStorage.getItem('user_data');
        return !!(token && userData);
      }
      return false;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }

  // Get auth token
  getToken(): string | null {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('access_token');
      }
      return null;
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
