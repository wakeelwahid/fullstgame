
import { ApiResponse } from './apiService';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  referralCode: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  email?: string;
  password: string;
  referralCode?: string;
}

// Static user data
const staticUserData: UserProfile = {
  id: 'user_123',
  name: 'John Doe',
  phone: '+919876543210',
  email: 'john@example.com',
  referralCode: 'REF123',
  kycStatus: 'VERIFIED',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

class UserService {
  private baseUrl = process.env.EXPO_PUBLIC_API_URL ? `${process.env.EXPO_PUBLIC_API_URL}/api` : 'https://f6a6e99e-6f1a-48e3-8f59-ddb95fafc3d4-00-esakm2bltiwd.kirk.replit.dev:8000/api';

  private async makeStaticResponse<T>(data: T, delay: number = 500): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data,
        });
      }, delay);
    });
  }

  private getToken(): string {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('authToken') || 'static_token_123';
      }
      return 'static_token_123';
    } catch (error) {
      console.error('Error getting token:', error);
      return 'static_token_123';
    }
  }

  private setToken(token: string): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user_data', JSON.stringify(staticUserData));
      }
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }

  // Authentication APIs - Static responses
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: UserProfile; token: string }>> {
    // Validate credentials (basic validation for demo)
    if (credentials.phone && credentials.password) {
      const token = 'static_auth_token_' + Date.now();
      this.setToken(token);
      
      return this.makeStaticResponse({
        user: staticUserData,
        token: token
      });
    } else {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: UserProfile; token: string }>> {
    // Create new user with provided data
    const newUser: UserProfile = {
      ...staticUserData,
      id: 'user_' + Date.now(),
      name: userData.name,
      phone: userData.phone,
      email: userData.email || '',
      referralCode: userData.referralCode || 'REF' + Math.random().toString(36).substring(7).toUpperCase(),
    };

    const token = 'static_auth_token_' + Date.now();
    this.setToken(token);

    return this.makeStaticResponse({
      user: newUser,
      token: token
    });
  }

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_data');
      }
      return this.makeStaticResponse({ success: true });
    } catch (error) {
      console.error('Error during logout:', error);
      return { success: false, error: 'Logout failed' };
    }
  }

  // Authentication status check - Static response
  async checkAuthStatus(): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      if (typeof localStorage !== 'undefined') {
        const userData = localStorage.getItem('user_data');
        const authToken = localStorage.getItem('authToken');
        
        if (userData && authToken) {
          return {
            success: true,
            data: { user: JSON.parse(userData) }
          };
        }
      }
      
      return { success: false, error: 'No authentication found' };
    } catch (error) {
      return { success: false, error: 'Auth check failed' };
    }
  }

  // Profile APIs - Static responses
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    if (!this.getToken()) {
      return { success: false, error: 'Authentication required' };
    }
    return this.makeStaticResponse(staticUserData);
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    if (!this.getToken()) {
      return { success: false, error: 'Authentication required' };
    }
    
    const updatedUser = {
      ...staticUserData,
      ...profileData,
      updatedAt: new Date().toISOString()
    };

    // Update localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }

    return this.makeStaticResponse(updatedUser);
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ success: boolean }>> {
    if (!this.getToken()) {
      return { success: false, error: 'Authentication required' };
    }
    return this.makeStaticResponse({ success: true });
  }

  // KYC APIs - Static responses
  async submitKYC(kycData: {
    documentType: string;
    documentNumber: string;
    documentImages: string[];
    personalInfo: {
      fullName: string;
      dateOfBirth: string;
      address: string;
    };
  }): Promise<ApiResponse<{ kycId: string; status: string }>> {
    return this.makeStaticResponse({
      kycId: 'kyc_' + Date.now(),
      status: 'PENDING'
    });
  }

  async getKYCStatus(): Promise<ApiResponse<{ status: string; rejectionReason?: string }>> {
    return this.makeStaticResponse({
      status: 'VERIFIED'
    });
  }

  // Referral APIs - Static responses
  async getReferralData(): Promise<ApiResponse<{
    referralCode: string;
    totalReferrals: number;
    totalEarnings: number;
    referrals: Array<{
      id: string;
      name: string;
      joinedAt: string;
      status: string;
      earnings: number;
    }>;
  }>> {
    return this.makeStaticResponse({
      referralCode: staticUserData.referralCode,
      totalReferrals: 5,
      totalEarnings: 2500,
      referrals: [
        {
          id: 'ref_1',
          name: 'Amit Kumar',
          joinedAt: '2024-01-15T10:00:00Z',
          status: 'ACTIVE',
          earnings: 500
        },
        {
          id: 'ref_2',
          name: 'Priya Sharma',
          joinedAt: '2024-01-20T14:30:00Z',
          status: 'ACTIVE',
          earnings: 750
        },
        {
          id: 'ref_3',
          name: 'Rahul Singh',
          joinedAt: '2024-02-01T09:15:00Z',
          status: 'ACTIVE',
          earnings: 300
        }
      ]
    });
  }

  async generateNewReferralCode(): Promise<ApiResponse<{ referralCode: string }>> {
    const newCode = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return this.makeStaticResponse({ referralCode: newCode });
  }
}

export const userService = new UserService();
