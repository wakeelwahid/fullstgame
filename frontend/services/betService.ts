
import { apiService } from './apiService';

export const betService = {
  // Place a bet
  placeBet: async (betData: any) => {
    try {
      const response = await apiService.post('/api/place-bet/', {
        game_id: betData.gameId,
        number: betData.number,
        amount: betData.amount,
        bet_type: betData.type?.toLowerCase() || 'single'
      });
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: {
            bet: {
              id: response.data.bet_id || 'bet_' + Date.now(),
              ...betData,
              status: 'PENDING',
              placedAt: new Date().toISOString()
            },
            message: response.data.message || 'Bet placed successfully',
            newBalance: response.data.new_balance || 0
          }
        };
      }
      
      return {
        success: false,
        error: response.data.error || 'Failed to place bet'
      };
    } catch (error) {
      console.error('Error placing bet:', error);
      return {
        success: false,
        error: 'Failed to place bet'
      };
    }
  },

  // Get bet history
  getBetHistory: async (page: number = 1, limit: number = 20) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      const response = await apiService.get(`/api/my-bets/?${params}`);
      
      if (response.data) {
        const bets = (response.data.results || response.data || []).map((bet: any) => ({
          id: bet.id?.toString() || '',
          gameId: bet.game_id || bet.game || 0,
          gameName: bet.game_name || 'Unknown Game',
          number: bet.number || bet.bet_number || '',
          amount: bet.amount || bet.bet_amount || 0,
          type: bet.bet_type || bet.type || 'SINGLE',
          status: bet.status || 'PENDING',
          multiplier: bet.multiplier || 1,
          winAmount: bet.win_amount,
          placedAt: bet.created_at || bet.placed_at || new Date().toISOString()
        }));
        
        return {
          success: true,
          data: {
            bets,
            totalCount: response.data.count || bets.length,
            currentPage: page,
            totalPages: Math.ceil((response.data.count || bets.length) / limit)
          }
        };
      }
      
      return {
        success: false,
        error: 'Failed to fetch bet history'
      };
    } catch (error) {
      console.error('Error fetching bet history:', error);
      return {
        success: false,
        error: 'Failed to fetch bet history'
      };
    }
  },

  // Get active bets
  getActiveBets: async () => {
    try {
      const response = await apiService.get('/api/current-session/');
      
      if (response.data) {
        const activeBets = (response.data.bets || response.data || []).map((bet: any) => ({
          id: bet.id?.toString() || '',
          gameId: bet.game_id || bet.game || 0,
          gameName: bet.game_name || 'Unknown Game',
          number: bet.number || bet.bet_number || '',
          amount: bet.amount || bet.bet_amount || 0,
          type: bet.bet_type || bet.type || 'SINGLE',
          status: bet.status || 'PENDING',
          multiplier: bet.multiplier || 1,
          placedAt: bet.created_at || bet.placed_at || new Date().toISOString()
        }));
        
        return {
          success: true,
          data: activeBets.filter((bet: any) => bet.status === 'PENDING')
        };
      }
      
      return {
        success: false,
        error: 'Failed to fetch active bets'
      };
    } catch (error) {
      console.error('Error fetching active bets:', error);
      return {
        success: false,
        error: 'Failed to fetch active bets'
      };
    }
  },

  // Cancel bet
  cancelBet: async (betId: string) => {
    try {
      const response = await apiService.post(`/api/bets/${betId}/cancel/`, {});
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: {
            message: 'Bet cancelled successfully',
            refundAmount: response.data.refund_amount || 0,
            newBalance: response.data.new_balance || 0
          }
        };
      }
      
      return {
        success: false,
        error: response.data.error || 'Cannot cancel bet'
      };
    } catch (error) {
      console.error('Error cancelling bet:', error);
      return {
        success: false,
        error: 'Failed to cancel bet'
      };
    }
  },

  // Get bet results
  getBetResults: async (gameId: string) => {
    try {
      const response = await apiService.get(`/api/games/${gameId}/result/`);
      
      if (response.data) {
        return {
          success: true,
          data: {
            gameId: parseInt(gameId),
            gameName: response.data.game_name || 'Unknown Game',
            result: response.data.result || response.data.winning_number || '',
            declaredAt: response.data.declared_at || response.data.created_at || new Date().toISOString(),
            date: response.data.date || new Date().toISOString().split('T')[0]
          }
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

  // Get bet rates
  getBetRates: async () => {
    try {
      const response = await apiService.get('/api/bet-rates/');
      
      if (response.data) {
        return {
          success: true,
          data: response.data
        };
      }
      
      // Default rates if API doesn't exist yet
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

  // Get game statistics
  getGameStatistics: async (gameId: string) => {
    try {
      const response = await apiService.get(`/api/games/${gameId}/statistics/`);
      
      if (response.data) {
        return {
          success: true,
          data: response.data
        };
      }
      
      return {
        success: false,
        error: 'Failed to fetch game statistics'
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
import { ApiResponse, apiService } from './apiService';

export interface BetHistoryItem {
  id: number;
  gameName: string;
  number: string;
  amount: number;
  type: string;
  status: string;
  winAmount: number;
  timestamp: number;
  placedAt: string;
}

export interface BetHistoryResponse {
  success: boolean;
  data: {
    bets: BetHistoryItem[];
    totalCount: number;
  };
}

class BetService {
  private baseUrl = '/api';

  async getBetHistory(page: number = 1, limit: number = 100): Promise<BetHistoryResponse> {
    try {
      const response = await apiService.get(`${this.baseUrl}/view-bets-history/?page=${page}&limit=${limit}`);
      
      if (response.data && Array.isArray(response.data)) {
        const formattedBets = response.data.map((bet: any) => ({
          id: bet.id,
          gameName: bet.game || bet.game_name,
          number: bet.number,
          amount: parseFloat(bet.amount),
          type: bet.bet_type,
          status: bet.status,
          winAmount: parseFloat(bet.win_amount || bet.payout || 0),
          timestamp: new Date(bet.timestamp || bet.created_at).getTime(),
          placedAt: bet.created_at || bet.placedAt
        }));

        return {
          success: true,
          data: {
            bets: formattedBets,
            totalCount: formattedBets.length
          }
        };
      }
      
      return { success: false, data: { bets: [], totalCount: 0 } };
    } catch (error) {
      console.error('Get bet history error:', error);
      return { success: false, data: { bets: [], totalCount: 0 } };
    }
  }

  async placeBet(betData: {
    game_name: string;
    number: string;
    amount: number;
    bet_type: string;
  }): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/place-bet/`, betData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Place bet error:', error);
      return { success: false, error: 'Failed to place bet' };
    }
  }

  async getCurrentSessionBets(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/view-bets-current-session/`);
      return { success: true, data: response.data || [] };
    } catch (error) {
      console.error('Get current session bets error:', error);
      return { success: false, error: 'Failed to get current session bets' };
    }
  }
}

export const betService = new BetService();
