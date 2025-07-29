
import { ApiResponse, apiService } from './apiService';

export interface Game {
  id: number;
  title: string;
  openTime: string;
  closeTime: string;
  status: 'OPEN' | 'CLOSED' | 'RESULT_DECLARED';
  color: string;
  bgColor: string;
  lastResult?: string;
  nextResultTime?: string;
}

export interface Bet {
  id: string;
  gameId: number;
  gameName: string;
  number: string | number;
  amount: number;
  type: 'SINGLE' | 'JODI' | 'SINGLE_PANNA' | 'DOUBLE_PANNA' | 'TRIPLE_PANNA';
  status: 'PENDING' | 'WIN' | 'LOSS';
  multiplier: number;
  winAmount?: number;
  placedAt: string;
  resultTime?: string;
}

export interface BetRequest {
  gameId: number;
  number: string | number;
  amount: number;
  type: string;
}

export interface GameResult {
  id: string;
  gameId: number;
  gameName: string;
  result: string;
  declaredAt: string;
  date: string;
}

class GameService {
  private baseUrl = '/api';

  // Game APIs
  async getGames(): Promise<ApiResponse<Game[]>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/games/`);
      
      if (response.data) {
        const games: Game[] = (response.data.results || response.data || []).map((game: any) => ({
          id: game.id,
          title: game.name || game.title || 'Unknown Game',
          openTime: game.open_time || '10:00',
          closeTime: game.close_time || '12:00',
          status: this.mapGameStatus(game.status),
          color: game.color || '#FF6B6B',
          bgColor: game.bg_color || '#FFE5E5',
          lastResult: game.last_result,
          nextResultTime: game.next_result_time
        }));
        
        return { success: true, data: games };
      }
      
      return { success: false, error: 'Failed to get games' };
    } catch (error) {
      console.error('Get games error:', error);
      return { success: false, error: 'Failed to get games' };
    }
  }

  async getGameById(gameId: number): Promise<ApiResponse<Game>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/games/${gameId}/`);
      
      if (response.data) {
        const game: Game = {
          id: response.data.id,
          title: response.data.name || response.data.title || 'Unknown Game',
          openTime: response.data.open_time || '10:00',
          closeTime: response.data.close_time || '12:00',
          status: this.mapGameStatus(response.data.status),
          color: response.data.color || '#FF6B6B',
          bgColor: response.data.bg_color || '#FFE5E5',
          lastResult: response.data.last_result,
          nextResultTime: response.data.next_result_time
        };
        
        return { success: true, data: game };
      }
      
      return { success: false, error: 'Game not found' };
    } catch (error) {
      console.error('Get game error:', error);
      return { success: false, error: 'Game not found' };
    }
  }

  async getGameStatus(gameId: number): Promise<ApiResponse<{
    isOpen: boolean;
    nextOpenTime?: string;
    nextCloseTime?: string;
    timeRemaining?: number;
  }>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/games/${gameId}/status/`);
      
      if (response.data) {
        return {
          success: true,
          data: {
            isOpen: response.data.is_open || false,
            nextOpenTime: response.data.next_open_time,
            nextCloseTime: response.data.next_close_time,
            timeRemaining: response.data.time_remaining
          }
        };
      }
      
      return { success: false, error: 'Failed to get game status' };
    } catch (error) {
      console.error('Get game status error:', error);
      return { success: false, error: 'Failed to get game status' };
    }
  }

  // Betting APIs
  async placeBet(betData: BetRequest): Promise<ApiResponse<{
    betId: string;
    message: string;
    newBalance: number;
  }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/place-bet/`, {
        game_id: betData.gameId,
        number: betData.number,
        amount: betData.amount,
        bet_type: betData.type.toLowerCase()
      });
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: {
            betId: response.data.bet_id || 'bet_' + Date.now(),
            message: response.data.message || 'Bet placed successfully',
            newBalance: response.data.new_balance || 0
          }
        };
      }
      
      return { success: false, error: response.data.error || 'Failed to place bet' };
    } catch (error) {
      console.error('Place bet error:', error);
      return { success: false, error: 'Failed to place bet' };
    }
  }

  async getBetHistory(
    page: number = 1,
    limit: number = 20,
    gameId?: number
  ): Promise<ApiResponse<{
    bets: Bet[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(gameId && { game_id: gameId.toString() })
      });
      
      const response = await apiService.get(`${this.baseUrl}/my-bets/?${params}`);
      
      if (response.data) {
        const bets: Bet[] = (response.data.results || response.data || []).map((bet: any) => ({
          id: bet.id?.toString() || '',
          gameId: bet.game_id || bet.game || 0,
          gameName: bet.game_name || 'Unknown Game',
          number: bet.number || bet.bet_number || '',
          amount: bet.amount || bet.bet_amount || 0,
          type: this.mapBetType(bet.bet_type || bet.type),
          status: this.mapBetStatus(bet.status),
          multiplier: bet.multiplier || 1,
          winAmount: bet.win_amount,
          placedAt: bet.created_at || bet.placed_at || new Date().toISOString(),
          resultTime: bet.result_time
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
      
      return { success: false, error: 'Failed to get bet history' };
    } catch (error) {
      console.error('Get bet history error:', error);
      return { success: false, error: 'Failed to get bet history' };
    }
  }

  async getBetDetails(betId: string): Promise<ApiResponse<Bet>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/bets/${betId}/`);
      
      if (response.data) {
        const bet: Bet = {
          id: response.data.id?.toString() || '',
          gameId: response.data.game_id || response.data.game || 0,
          gameName: response.data.game_name || 'Unknown Game',
          number: response.data.number || response.data.bet_number || '',
          amount: response.data.amount || response.data.bet_amount || 0,
          type: this.mapBetType(response.data.bet_type || response.data.type),
          status: this.mapBetStatus(response.data.status),
          multiplier: response.data.multiplier || 1,
          winAmount: response.data.win_amount,
          placedAt: response.data.created_at || response.data.placed_at || new Date().toISOString(),
          resultTime: response.data.result_time
        };
        
        return { success: true, data: bet };
      }
      
      return { success: false, error: 'Bet not found' };
    } catch (error) {
      console.error('Get bet details error:', error);
      return { success: false, error: 'Bet not found' };
    }
  }

  async cancelBet(betId: string): Promise<ApiResponse<{
    success: boolean;
    refundAmount: number;
    newBalance: number;
  }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/bets/${betId}/cancel/`, {});
      
      return {
        success: true,
        data: {
          success: true,
          refundAmount: response.data.refund_amount || 0,
          newBalance: response.data.new_balance || 0
        }
      };
    } catch (error) {
      console.error('Cancel bet error:', error);
      return { success: false, error: 'Cannot cancel bet' };
    }
  }

  // Results APIs
  async getResults(
    gameId?: number,
    date?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<{
    results: GameResult[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(gameId && { game_id: gameId.toString() }),
        ...(date && { date })
      });
      
      const response = await apiService.get(`${this.baseUrl}/results/?${params}`);
      
      if (response.data) {
        const results: GameResult[] = (response.data.results || response.data || []).map((result: any) => ({
          id: result.id?.toString() || '',
          gameId: result.game_id || result.game || 0,
          gameName: result.game_name || 'Unknown Game',
          result: result.result || result.winning_number || '',
          declaredAt: result.declared_at || result.created_at || new Date().toISOString(),
          date: result.date || new Date().toISOString().split('T')[0]
        }));
        
        return {
          success: true,
          data: {
            results,
            totalCount: response.data.count || results.length,
            currentPage: page,
            totalPages: Math.ceil((response.data.count || results.length) / limit)
          }
        };
      }
      
      return { success: false, error: 'Failed to get results' };
    } catch (error) {
      console.error('Get results error:', error);
      return { success: false, error: 'Failed to get results' };
    }
  }

  async getLatestResults(): Promise<ApiResponse<GameResult[]>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/results/latest/`);
      
      if (response.data) {
        const results: GameResult[] = (response.data || []).map((result: any) => ({
          id: result.id?.toString() || '',
          gameId: result.game_id || result.game || 0,
          gameName: result.game_name || 'Unknown Game',
          result: result.result || result.winning_number || '',
          declaredAt: result.declared_at || result.created_at || new Date().toISOString(),
          date: result.date || new Date().toISOString().split('T')[0]
        }));
        
        return { success: true, data: results };
      }
      
      return { success: false, error: 'Failed to get latest results' };
    } catch (error) {
      console.error('Get latest results error:', error);
      return { success: false, error: 'Failed to get latest results' };
    }
  }

  async getResultByGame(gameId: number, date?: string): Promise<ApiResponse<GameResult>> {
    try {
      const params = new URLSearchParams({
        ...(date && { date })
      });
      
      const response = await apiService.get(`${this.baseUrl}/games/${gameId}/result/?${params}`);
      
      if (response.data) {
        const result: GameResult = {
          id: response.data.id?.toString() || '',
          gameId: response.data.game_id || response.data.game || gameId,
          gameName: response.data.game_name || 'Unknown Game',
          result: response.data.result || response.data.winning_number || '',
          declaredAt: response.data.declared_at || response.data.created_at || new Date().toISOString(),
          date: response.data.date || new Date().toISOString().split('T')[0]
        };
        
        return { success: true, data: result };
      }
      
      return { success: false, error: 'Result not found' };
    } catch (error) {
      console.error('Get result by game error:', error);
      return { success: false, error: 'Result not found' };
    }
  }

  // Helper methods
  private mapGameStatus(backendStatus: string): Game['status'] {
    const statusMap: Record<string, Game['status']> = {
      'open': 'OPEN',
      'closed': 'CLOSED',
      'result_declared': 'RESULT_DECLARED'
    };
    
    return statusMap[backendStatus?.toLowerCase()] || 'CLOSED';
  }

  private mapBetType(backendType: string): Bet['type'] {
    const typeMap: Record<string, Bet['type']> = {
      'single': 'SINGLE',
      'jodi': 'JODI',
      'single_panna': 'SINGLE_PANNA',
      'double_panna': 'DOUBLE_PANNA',
      'triple_panna': 'TRIPLE_PANNA'
    };
    
    return typeMap[backendType?.toLowerCase()] || 'SINGLE';
  }

  private mapBetStatus(backendStatus: string): Bet['status'] {
    const statusMap: Record<string, Bet['status']> = {
      'pending': 'PENDING',
      'win': 'WIN',
      'loss': 'LOSS',
      'lost': 'LOSS'
    };
    
    return statusMap[backendStatus?.toLowerCase()] || 'PENDING';
  }

  // Chart APIs - These would need to be implemented in backend
  async getChart(gameId: number, month: string, year: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/games/${gameId}/chart/?month=${month}&year=${year}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to get chart data' };
    }
  }

  // Statistics APIs - These would need to be implemented in backend
  async getGameStatistics(gameId: number): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/games/${gameId}/statistics/`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to get game statistics' };
    }
  }

  async getUserStatistics(): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/user/statistics/`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to get user statistics' };
    }
  }

  // Rates APIs - These would need to be implemented in backend
  async getBetRates(): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/bet-rates/`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to get bet rates' };
    }
  }
}

export const gameService = new GameService();
