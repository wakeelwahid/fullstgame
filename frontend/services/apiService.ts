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
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://1c54390b-cc54-4bb4-b672-8c22f6a25c1b-00-29hc2bu2j7y3j.riker.replit.dev:8000',

  // Helper to get auth token
  getAuthToken: () => {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('access_token') || localStorage.getItem('authToken') || '';
      }
      return '';
    } catch (error) {
      console.error('Error getting token:', error);
      return '';
    }
  },

  // GET request with auto token refresh
  get: async (endpoint: string) => {
    try {
      let token = apiService.getAuthToken();
      let response = await fetch(`${apiService.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      // If token expired, try to refresh
      if (response.status === 401 && token) {
        const refreshResult = await apiService.refreshToken();
        if (refreshResult.success) {
          token = refreshResult.access_token;
          response = await fetch(`${apiService.baseURL}${endpoint}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
        }
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API GET Error:', error);
      return { data: { success: false, error: 'Network error' } };
    }
  },

  // POST request with auto token refresh
  post: async (endpoint: string, postData: any) => {
    try {
      let token = apiService.getAuthToken();
      let response = await fetch(`${apiService.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(postData),
      });

      // If token expired, try to refresh
      if (response.status === 401 && token) {
        const refreshResult = await apiService.refreshToken();
        if (refreshResult.success) {
          token = refreshResult.access_token;
          response = await fetch(`${apiService.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          });
        }
      }

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
  },

  // Refresh JWT token
  refreshToken: async () => {
    try {
      const refreshToken = typeof localStorage !== 'undefined' 
        ? localStorage.getItem('refresh_token') 
        : '';

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${apiService.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('access_token', data.access);
        }
        return { success: true, access_token: data.access };
      }

      return { success: false };
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false };
    }
  }
};

export type { GameData, UserData, BetData, ApiResponse };