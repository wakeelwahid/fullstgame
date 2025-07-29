
import { apiService } from './apiService';

// Static bet data
const staticBets = [
  {
    id: 'bet_1',
    gameId: 1,
    gameName: 'Mumbai Day',
    number: 123,
    amount: 100,
    type: 'SINGLE',
    status: 'WIN',
    multiplier: 9.5,
    winAmount: 950,
    placedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'bet_2',
    gameId: 2,
    gameName: 'Delhi Night',
    number: '45-67',
    amount: 200,
    type: 'JODI',
    status: 'LOSS',
    multiplier: 95,
    placedAt: '2024-01-14T21:30:00Z'
  },
  {
    id: 'bet_3',
    gameId: 3,
    gameName: 'Kolkata Open',
    number: 789,
    amount: 50,
    type: 'SINGLE_PANNA',
    status: 'PENDING',
    multiplier: 142,
    placedAt: '2024-01-15T09:45:00Z'
  }
];

const staticResults = [
  {
    gameId: 1,
    gameName: 'Mumbai Day',
    result: '123-45-678',
    declaredAt: '2024-01-15T12:05:00Z',
    date: '2024-01-15'
  },
  {
    gameId: 2,
    gameName: 'Delhi Night',
    result: '456-78-901',
    declaredAt: '2024-01-14T23:05:00Z',
    date: '2024-01-14'
  }
];

export const betService = {
  // Simulate API delay
  delay: (ms: number = 400) => new Promise(resolve => setTimeout(resolve, ms)),

  // Place a bet - Static response
  placeBet: async (betData: any) => {
    try {
      await betService.delay();
      
      const newBet = {
        id: 'bet_' + Date.now(),
        ...betData,
        status: 'PENDING',
        placedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: {
          bet: newBet,
          message: 'Bet placed successfully',
          newBalance: Math.floor(Math.random() * 10000) + 1000
        }
      };
    } catch (error) {
      console.error('Error placing bet:', error);
      return {
        success: false,
        error: 'Failed to place bet'
      };
    }
  },

  // Get bet history - Static response
  getBetHistory: async (page: number = 1, limit: number = 20) => {
    try {
      await betService.delay();
      
      return {
        success: true,
        data: {
          bets: staticBets,
          totalCount: staticBets.length,
          currentPage: page,
          totalPages: Math.ceil(staticBets.length / limit)
        }
      };
    } catch (error) {
      console.error('Error fetching bet history:', error);
      return {
        success: false,
        error: 'Failed to fetch bet history'
      };
    }
  },

  // Get active bets - Static response
  getActiveBets: async () => {
    try {
      await betService.delay();
      
      const activeBets = staticBets.filter(bet => bet.status === 'PENDING');
      
      return {
        success: true,
        data: activeBets
      };
    } catch (error) {
      console.error('Error fetching active bets:', error);
      return {
        success: false,
        error: 'Failed to fetch active bets'
      };
    }
  },

  // Cancel bet - Static response
  cancelBet: async (betId: string) => {
    try {
      await betService.delay();
      
      const bet = staticBets.find(b => b.id === betId);
      if (bet && bet.status === 'PENDING') {
        return {
          success: true,
          data: {
            message: 'Bet cancelled successfully',
            refundAmount: bet.amount,
            newBalance: Math.floor(Math.random() * 10000) + 1000
          }
        };
      }
      
      return {
        success: false,
        error: 'Cannot cancel bet'
      };
    } catch (error) {
      console.error('Error cancelling bet:', error);
      return {
        success: false,
        error: 'Failed to cancel bet'
      };
    }
  },

  // Get bet results - Static response
  getBetResults: async (gameId: string) => {
    try {
      await betService.delay();
      
      const result = staticResults.find(r => r.gameId.toString() === gameId);
      
      if (result) {
        return {
          success: true,
          data: result
        };
      }
      
      return {
        success: false,
        error: 'Result not found'
      };
    } catch (error) {
      console.error('Error fetching bet results:', error);
      return {
        success: false,
        error: 'Failed to fetch bet results'
      };
    }
  },

  // Get bet rates - Static response
  getBetRates: async () => {
    try {
      await betService.delay();
      
      return {
        success: true,
        data: {
          single: 9.5,
          jodi: 95,
          singlePanna: 142,
          doublePanna: 285,
          triplePanna: 950
        }
      };
    } catch (error) {
      console.error('Error fetching bet rates:', error);
      return {
        success: false,
        error: 'Failed to fetch bet rates'
      };
    }
  },

  // Get game statistics - Static response
  getGameStatistics: async (gameId: string) => {
    try {
      await betService.delay();
      
      return {
        success: true,
        data: {
          totalBets: Math.floor(Math.random() * 500) + 100,
          totalAmount: Math.floor(Math.random() * 50000) + 10000,
          winPercentage: Math.floor(Math.random() * 30) + 10,
          popularNumbers: [
            { number: '123', count: 25, percentage: 16.7 },
            { number: '456', count: 20, percentage: 13.3 },
            { number: '789', count: 18, percentage: 12.0 },
          ]
        }
      };
    } catch (error) {
      console.error('Error fetching game statistics:', error);
      return {
        success: false,
        error: 'Failed to fetch game statistics'
      };
    }
  }
};
