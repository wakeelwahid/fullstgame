import { ApiResponse, apiService } from './apiService';

// Note: Most authentication functionality has been moved to useAuth hook
// This service now only handles API calls that require authentication

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

class UserService {
  private getToken(): string | null {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('access_token') || localStorage.getItem('authToken');
      }
      return null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Get user profile from backend
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await apiService.get(`/api/profile/`);

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

        return { success: true, data: user };
      }

      return { success: false, error: 'Failed to get profile' };
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, error: 'Failed to get profile' };
    }
  }

  // Update user profile
  async updateProfile(profileData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const updateData = {
        first_name: profileData.name?.split(' ')[0] || '',
        last_name: profileData.name?.split(' ')[1] || '',
        email: profileData.email || '',
        phone: profileData.phone || ''
      };

      const response = await apiService.put(`/api/profile/`, updateData);

      if (response.data) {
        return this.getProfile(); // Return updated profile
      }

      return { success: false, error: 'Failed to update profile' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await apiService.post(`/api/change-password/`, {
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

  // KYC submission
  async submitKYC(kycData: any): Promise<ApiResponse<{ kycId: string; status: string }>> {
    try {
      const response = await apiService.post(`/api/kyc/submit/`, kycData);
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

  // Get KYC status
  async getKYCStatus(): Promise<ApiResponse<{ status: string; rejectionReason?: string }>> {
    try {
      const response = await apiService.get(`/api/kyc/status/`);
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

  // Get referral data
  async getReferralData(): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get(`/api/referrals/`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to get referral data' };
    }
  }

  // Generate new referral code
  async generateNewReferralCode(): Promise<ApiResponse<{ referralCode: string }>> {
    try {
      const response = await apiService.post(`/api/referrals/generate-code/`, {});
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