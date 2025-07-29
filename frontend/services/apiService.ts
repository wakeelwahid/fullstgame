export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface GameData {
  id: number;
  title: string;
  openTime: string;
  closeTime: string;
  status: string;
  color: string;
  bgColor: string;
}

interface UserData {
  id: string;
  username: string;
  phone: string;
  wallet: number;
  winnings: number;
}

interface BetData {
  id: number;
  number: string | number;
  amount: number;
  type: string;
  game: string;
  timestamp: Date;
}

// API Service for all HTTP requests
export const apiService = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://f6a6e99e-6f1a-48e3-8f59-ddb95fafc3d4-00-esakm2bltiwd.kirk.replit.dev:8000',

  // Helper to get auth token
  getAuthToken: () => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('authToken') || '';
      }
      return '';
    } catch (error) {
      console.error('Error getting token:', error);
      return '';
    }
  },

  // GET request
  get: async (endpoint: string) => {
    try {
      const token = apiService.getAuthToken();
      const response = await fetch(`${apiService.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API GET Error:', error);
      return { data: { success: false, error: 'Network error' } };
    }
  },

  // POST request
  post: async (endpoint: string, postData: any) => {
    try {
      const token = apiService.getAuthToken();
      const response = await fetch(`${apiService.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API POST Error:', error);
      return { data: { success: false, error: 'Network error' } };
    }
  },

  // PUT request
  put: async (endpoint: string, putData: any) => {
    try {
      const token = apiService.getAuthToken();
      const response = await fetch(`${apiService.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(putData),
      });

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API PUT Error:', error);
      return { data: { success: false, error: 'Network error' } };
    }
  },

  // DELETE request
  delete: async (endpoint: string) => {
    try {
      const token = apiService.getAuthToken();
      const response = await fetch(`${apiService.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API DELETE Error:', error);
      return { data: { success: false, error: 'Network error' } };
    }
  }
};

export type { GameData, UserData, BetData, ApiResponse };