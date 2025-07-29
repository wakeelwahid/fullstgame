
import { ApiResponse } from './apiService';

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

// Static data
const staticGames: Game[] = [
  {
    id: 1,
    title: 'Mumbai Day',
    openTime: '10:00',
    closeTime: '12:00',
    status: 'OPEN',
    color: '#FF6B6B',
    bgColor: '#FFE5E5',
    lastResult: '123-45-678',
    nextResultTime: '12:05'
  },
  {
    id: 2,
    title: 'Delhi Night',
    openTime: '21:00',
    closeTime: '23:00',
    status: 'CLOSED',
    color: '#4ECDC4',
    bgColor: '#E5F9F6',
    lastResult: '456-78-901',
    nextResultTime: '23:05'
  },
  {
    id: 3,
    title: 'Kolkata Open',
    openTime: '09:30',
    closeTime: '11:30',
    status: 'RESULT_DECLARED',
    color: '#45B7D1',
    bgColor: '#E5F4FD',
    lastResult: '789-01-234',
    nextResultTime: '11:35'
  },
  {
    id: 4,
    title: 'Chennai Close',
    openTime: '14:00',
    closeTime: '16:00',
    status: 'OPEN',
    color: '#F7B731',
    bgColor: '#FEF5E7',
    lastResult: '012-34-567',
    nextResultTime: '16:05'
  }
];

const staticBets: Bet[] = [
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
    placedAt: '2024-01-15T10:30:00Z',
    resultTime: '2024-01-15T12:05:00Z'
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
    placedAt: '2024-01-14T21:30:00Z',
    resultTime: '2024-01-14T23:05:00Z'
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

const staticResults: GameResult[] = [
  {
    id: 'result_1',
    gameId: 1,
    gameName: 'Mumbai Day',
    result: '123-45-678',
    declaredAt: '2024-01-15T12:05:00Z',
    date: '2024-01-15'
  },
  {
    id: 'result_2',
    gameId: 2,
    gameName: 'Delhi Night',
    result: '456-78-901',
    declaredAt: '2024-01-14T23:05:00Z',
    date: '2024-01-14'
  },
  {
    id: 'result_3',
    gameId: 3,
    gameName: 'Kolkata Open',
    result: '789-01-234',
    declaredAt: '2024-01-14T11:35:00Z',
    date: '2024-01-14'
  }
];

class GameService {
  private baseUrl = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/games` : 'https://api.example.com/api/games';

  private async makeStaticResponse<T>(data: T, delay: number = 300): Promise<ApiResponse<T>> {
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
    return typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') || '' : '';
  }

  // Game APIs - Static responses
  async getGames(): Promise<ApiResponse<Game[]>> {
    return this.makeStaticResponse(staticGames);
  }

  async getGameById(gameId: number): Promise<ApiResponse<Game>> {
    const game = staticGames.find(g => g.id === gameId);
    if (game) {
      return this.makeStaticResponse(game);
    }
    return { success: false, error: 'Game not found' };
  }

  async getGameStatus(gameId: number): Promise<ApiResponse<{
    isOpen: boolean;
    nextOpenTime?: string;
    nextCloseTime?: string;
    timeRemaining?: number;
  }>> {
    const game = staticGames.find(g => g.id === gameId);
    if (game) {
      return this.makeStaticResponse({
        isOpen: game.status === 'OPEN',
        nextOpenTime: game.openTime,
        nextCloseTime: game.closeTime,
        timeRemaining: Math.floor(Math.random() * 3600) // Random time remaining
      });
    }
    return { success: false, error: 'Game not found' };
  }

  // Betting APIs - Static responses
  async placeBet(betData: BetRequest): Promise<ApiResponse<{
    betId: string;
    message: string;
    newBalance: number;
  }>> {
    const betId = 'bet_' + Date.now();
    return this.makeStaticResponse({
      betId: betId,
      message: 'Bet placed successfully',
      newBalance: Math.floor(Math.random() * 10000) + 1000 // Random balance
    });
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
    let filteredBets = staticBets;
    if (gameId) {
      filteredBets = staticBets.filter(bet => bet.gameId === gameId);
    }

    return this.makeStaticResponse({
      bets: filteredBets,
      totalCount: filteredBets.length,
      currentPage: page,
      totalPages: Math.ceil(filteredBets.length / limit)
    });
  }

  async getBetDetails(betId: string): Promise<ApiResponse<Bet>> {
    const bet = staticBets.find(b => b.id === betId);
    if (bet) {
      return this.makeStaticResponse(bet);
    }
    return { success: false, error: 'Bet not found' };
  }

  async cancelBet(betId: string): Promise<ApiResponse<{
    success: boolean;
    refundAmount: number;
    newBalance: number;
  }>> {
    const bet = staticBets.find(b => b.id === betId);
    if (bet && bet.status === 'PENDING') {
      return this.makeStaticResponse({
        success: true,
        refundAmount: bet.amount,
        newBalance: Math.floor(Math.random() * 10000) + 1000
      });
    }
    return { success: false, error: 'Cannot cancel bet' };
  }

  // Results APIs - Static responses
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
    let filteredResults = staticResults;
    
    if (gameId) {
      filteredResults = staticResults.filter(result => result.gameId === gameId);
    }
    
    if (date) {
      filteredResults = filteredResults.filter(result => result.date === date);
    }

    return this.makeStaticResponse({
      results: filteredResults,
      totalCount: filteredResults.length,
      currentPage: page,
      totalPages: Math.ceil(filteredResults.length / limit)
    });
  }

  async getLatestResults(): Promise<ApiResponse<GameResult[]>> {
    return this.makeStaticResponse(staticResults.slice(0, 5));
  }

  async getResultByGame(gameId: number, date?: string): Promise<ApiResponse<GameResult>> {
    let result = staticResults.find(r => r.gameId === gameId);
    if (date) {
      result = staticResults.find(r => r.gameId === gameId && r.date === date);
    }
    
    if (result) {
      return this.makeStaticResponse(result);
    }
    return { success: false, error: 'Result not found' };
  }

  // Chart APIs - Static responses
  async getChart(gameId: number, month: string, year: string): Promise<ApiResponse<{
    gameId: number;
    gameName: string;
    month: string;
    year: string;
    results: Array<{
      date: string;
      result: string;
      day: string;
    }>;
  }>> {
    const game = staticGames.find(g => g.id === gameId);
    const chartData = {
      gameId: gameId,
      gameName: game?.title || 'Unknown Game',
      month: month,
      year: year,
      results: [
        { date: '01', result: '123-45-678', day: 'Mon' },
        { date: '02', result: '456-78-901', day: 'Tue' },
        { date: '03', result: '789-01-234', day: 'Wed' },
        { date: '04', result: '012-34-567', day: 'Thu' },
        { date: '05', result: '345-67-890', day: 'Fri' },
      ]
    };

    return this.makeStaticResponse(chartData);
  }

  // Statistics APIs - Static responses
  async getGameStatistics(gameId: number): Promise<ApiResponse<{
    totalBets: number;
    totalAmount: number;
    winPercentage: number;
    popularNumbers: Array<{
      number: string;
      count: number;
      percentage: number;
    }>;
  }>> {
    return this.makeStaticResponse({
      totalBets: 150,
      totalAmount: 25000,
      winPercentage: 15.5,
      popularNumbers: [
        { number: '123', count: 25, percentage: 16.7 },
        { number: '456', count: 20, percentage: 13.3 },
        { number: '789', count: 18, percentage: 12.0 },
      ]
    });
  }

  async getUserStatistics(): Promise<ApiResponse<{
    totalBets: number;
    totalAmount: number;
    totalWins: number;
    totalLosses: number;
    winPercentage: number;
    favoriteGame: string;
    biggestWin: number;
  }>> {
    return this.makeStaticResponse({
      totalBets: 45,
      totalAmount: 5000,
      totalWins: 8,
      totalLosses: 37,
      winPercentage: 17.8,
      favoriteGame: 'Mumbai Day',
      biggestWin: 2500
    });
  }

  // Rates APIs - Static responses
  async getBetRates(): Promise<ApiResponse<{
    single: number;
    jodi: number;
    singlePanna: number;
    doublePanna: number;
    triplePanna: number;
  }>> {
    return this.makeStaticResponse({
      single: 9.5,
      jodi: 95,
      singlePanna: 142,
      doublePanna: 285,
      triplePanna: 950
    });
  }
}

export const gameService = new GameService();
