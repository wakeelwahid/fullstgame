
// API service for handling all API calls
interface ApiResponse<T> {
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

// Static data responses
const staticResponses = {
  games: [
    {
      id: 1,
      title: 'Mumbai Day',
      openTime: '10:00',
      closeTime: '12:00',
      status: 'OPEN',
      color: '#FF6B6B',
      bgColor: '#FFE5E5'
    },
    {
      id: 2,
      title: 'Delhi Night',
      openTime: '21:00',
      closeTime: '23:00',
      status: 'CLOSED',
      color: '#4ECDC4',
      bgColor: '#E5F9F6'
    }
  ],
  user: {
    id: 'user_123',
    username: 'John Doe',
    phone: '+919876543210',
    wallet: 5000,
    winnings: 2500
  },
  wallet: {
    balance: 5000,
    transactions: [
      {
        id: 'txn_1',
        type: 'DEPOSIT',
        amount: 1000,
        status: 'COMPLETED',
        date: '2024-01-15T10:30:00Z'
      },
      {
        id: 'txn_2',
        type: 'BET_PLACED',
        amount: -100,
        status: 'COMPLETED',
        date: '2024-01-15T11:00:00Z'
      }
    ]
  }
};

// API Service for all HTTP requests - Now returns static data
export const apiService = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.132.143:8000',

  // Simulate API delay
  delay: (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // GET request - Static response
  get: async (endpoint: string) => {
    try {
      await apiService.delay();
      
      // Return static data based on endpoint
      if (endpoint.includes('/games')) {
        return { data: staticResponses.games };
      } else if (endpoint.includes('/user') || endpoint.includes('/profile')) {
        return { data: staticResponses.user };
      } else if (endpoint.includes('/wallet')) {
        return { data: staticResponses.wallet };
      } else if (endpoint.includes('/transactions')) {
        return { data: staticResponses.wallet.transactions };
      }
      
      return { data: { success: true, message: 'Static response' } };
    } catch (error) {
      console.error('API GET Error:', error);
      return { data: { success: false, error: 'Static API error' } };
    }
  },

  // POST request - Static response
  post: async (endpoint: string, data: any) => {
    try {
      await apiService.delay();
      
      if (endpoint.includes('/login') || endpoint.includes('/register')) {
        return {
          data: {
            success: true,
            user: staticResponses.user,
            token: 'static_token_' + Date.now()
          }
        };
      } else if (endpoint.includes('/bet')) {
        return {
          data: {
            success: true,
            betId: 'bet_' + Date.now(),
            message: 'Bet placed successfully'
          }
        };
      } else if (endpoint.includes('/deposit')) {
        return {
          data: {
            success: true,
            transactionId: 'txn_' + Date.now(),
            message: 'Deposit request submitted'
          }
        };
      } else if (endpoint.includes('/withdraw')) {
        return {
          data: {
            success: true,
            transactionId: 'txn_' + Date.now(),
            message: 'Withdrawal request submitted'
          }
        };
      }
      
      return {
        data: {
          success: true,
          message: 'Static POST response',
          id: Date.now()
        }
      };
    } catch (error) {
      console.error('API POST Error:', error);
      return { data: { success: false, error: 'Static API error' } };
    }
  },

  // PUT request - Static response
  put: async (endpoint: string, data: any) => {
    try {
      await apiService.delay();
      
      return {
        data: {
          success: true,
          message: 'Static PUT response',
          updatedData: { ...data, updatedAt: new Date().toISOString() }
        }
      };
    } catch (error) {
      console.error('API PUT Error:', error);
      return { data: { success: false, error: 'Static API error' } };
    }
  },

  // DELETE request - Static response
  delete: async (endpoint: string) => {
    try {
      await apiService.delay();
      
      return {
        data: {
          success: true,
          message: 'Static DELETE response'
        }
      };
    } catch (error) {
      console.error('API DELETE Error:', error);
      return { data: { success: false, error: 'Static API error' } };
    }
  }
};

// Helper function to get auth token - Static token
const getAuthToken = async (): Promise<string> => {
  return 'static_auth_token_123';
};

export type { GameData, UserData, BetData, ApiResponse };
