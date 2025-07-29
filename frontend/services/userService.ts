import { ApiResponse, apiService } from './apiService';

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

class UserService {
  private baseUrl = '';

  private setToken(token: string): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('authToken', token);
      }
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }

  private getToken(): string | null {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('authToken');
      }
      return null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }


  private removeToken(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_data');
      }
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // Authentication APIs
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: UserProfile; token: string }>> {
    try {
      const response = await apiService.post(`/login/`, credentials);

      if (response.data.access) {
        this.setToken(response.data.access);

        // Get user profile after login
        const profileResponse = await this.getProfile();
        if (profileResponse.success && profileResponse.data) {
          return {
            success: true,
            data: {
              user: profileResponse.data,
              token: response.data.access
            }
          };
        }
      }

      return { success: false, error: response.data.detail || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: UserProfile; token: string }>> {
    try {
      // Map frontend data to backend expected format
      const payload = {
        username: userData.name,
        mobile: userData.phone,
        email: userData.email || '',
        password: userData.password,
        referral_code: userData.referralCode || ''
      };

      console.log('Sending registration payload:', payload);
      const response = await apiService.post(`/register/`, payload);

      console.log('Registration response:', response.data);

      if (response.data.access) {
        this.setToken(response.data.access);

        // Create user profile from response
        const user: UserProfile = {
          id: response.data.user.id?.toString() || '',
          name: response.data.user.username || userData.name,
          phone: response.data.user.mobile || userData.phone,
          email: response.data.user.email || userData.email || '',
          referralCode: response.data.user.referral_code || '',
          kycStatus: 'PENDING',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Store user data locally
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(user));
        }

        return {
          success: true,
          data: {
            user: user,
            token: response.data.access
          }
        };
      }

      return { success: false, error: response.data.error || response.data.detail || 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  }

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    try {
      this.removeToken();
      return { success: true, data: { success: true } };
    } catch (error) {
      console.error('Error during logout:', error);
      return { success: false, error: 'Logout failed' };
    }
  }

  // Authentication status check
  async checkAuthStatus(): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      const token = this.getToken();
      if (!token) {
        return { success: false, error: 'No authentication found' };
      }

      // Set the token in apiService before checking profile
      apiService.setAuthToken(token);

      const profileResponse = await this.getProfile();
      if (profileResponse.success && profileResponse.data) {
        return {
          success: true,
          data: { user: profileResponse.data }
        };
      }

      return { success: false, error: 'Auth check failed' };
    } catch (error) {
      return { success: false, error: 'Auth check failed' };
    }
  }

  // Profile APIs
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiService.get(`/profile/`);

      if (response.data) {
        const user: UserProfile = {
          id: response.data.id?.toString() || '',
          name: response.data.first_name + ' ' + response.data.last_name || response.data.username || '',
          phone: response.data.phone || '',
          email: response.data.email || '',
          referralCode: response.data.referral_code || '',
          kycStatus: 'PENDING', // Default status
          createdAt: response.data.date_joined || new Date().toISOString(),
          updatedAt: response.data.last_login || new Date().toISOString()
        };

        // Store user data locally
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('user_data', JSON.stringify(user));
        }

        return { success: true, data: user };
      }

      return { success: false, error: 'Failed to get profile' };
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, error: 'Failed to get profile' };
    }
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const updateData = {
        first_name: profileData.name?.split(' ')[0] || '',
        last_name: profileData.name?.split(' ')[1] || '',
        email: profileData.email || '',
        phone: profileData.phone || ''
      };

      const response = await apiService.put(`${this.baseUrl}/profile/`, updateData);

      if (response.data) {
        return this.getProfile(); // Return updated profile
      }

      return { success: false, error: 'Failed to update profile' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/change-password/`, {
        old_password: currentPassword,
        new_password: newPassword
      });

      return {
        success: true,
        data: { success: true }
      };
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, error: 'Failed to change password' };
    }
  }

  // KYC APIs - These would need to be implemented in backend
  async submitKYC(kycData: any): Promise<ApiResponse<{ kycId: string; status: string }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/kyc/submit/`, kycData);
      return {
        success: true,
        data: {
          kycId: response.data.id || 'kyc_' + Date.now(),
          status: 'PENDING'
        }
      };
    } catch (error) {
      return { success: false, error: 'KYC submission failed' };
    }
  }

  async getKYCStatus(): Promise<ApiResponse<{ status: string; rejectionReason?: string }>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/kyc/status/`);
      return {
        success: true,
        data: {
          status: response.data.status || 'PENDING'
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to get KYC status' };
    }
  }

  // Referral APIs - These would need to be implemented in backend
  async getReferralData(): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/referrals/`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to get referral data' };
    }
  }

  async generateNewReferralCode(): Promise<ApiResponse<{ referralCode: string }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/referrals/generate-code/`, {});
      return {
        success: true,
        data: { referralCode: response.data.referral_code }
      };
    } catch (error) {
      return { success: false, error: 'Failed to generate referral code' };
    }
  }
}

export const userService = new UserService();