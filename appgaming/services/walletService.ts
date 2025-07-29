
import { ApiResponse } from './apiService';

export interface WalletBalance {
  totalBalance: number;
  playableBalance: number;
  winnings: number;
  bonus: number;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'BET_PLACED' | 'BET_WON' | 'BET_LOST' | 'BONUS' | 'REFUND';
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  description: string;
  createdAt: string;
  gameId?: number;
  gameName?: string;
  utrNumber?: string;
}

export interface DepositRequest {
  amount: number;
  paymentMethod: 'UPI' | 'BANK_TRANSFER' | 'CARD';
  utrNumber?: string;
}

export interface WithdrawRequest {
  amount: number;
  accountDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
  };
}

// Static data
const staticBalance: WalletBalance = {
  totalBalance: 5000,
  playableBalance: 4500,
  winnings: 2500,
  bonus: 500
};

const staticTransactions: Transaction[] = [
  {
    id: 'txn_1',
    type: 'DEPOSIT',
    amount: 1000,
    status: 'COMPLETED',
    description: 'Amount added to wallet',
    createdAt: '2024-01-15T10:30:00Z',
    utrNumber: 'UTR123456789012'
  },
  {
    id: 'txn_2',
    type: 'BET_PLACED',
    amount: -100,
    status: 'COMPLETED',
    description: 'Bet placed on Mumbai Day',
    createdAt: '2024-01-15T11:00:00Z',
    gameId: 1,
    gameName: 'Mumbai Day'
  },
  {
    id: 'txn_3',
    type: 'BET_WON',
    amount: 950,
    status: 'COMPLETED',
    description: 'Bet won on Mumbai Day',
    createdAt: '2024-01-15T12:05:00Z',
    gameId: 1,
    gameName: 'Mumbai Day'
  },
  {
    id: 'txn_4',
    type: 'WITHDRAW',
    amount: -500,
    status: 'PENDING',
    description: 'Withdrawal to bank account',
    createdAt: '2024-01-15T14:00:00Z'
  },
  {
    id: 'txn_5',
    type: 'BONUS',
    amount: 100,
    status: 'COMPLETED',
    description: 'Welcome bonus credited',
    createdAt: '2024-01-14T09:00:00Z'
  }
];

class WalletService {
  private baseUrl = process.env.EXPO_PUBLIC_API_URL ? `${process.env.EXPO_PUBLIC_API_URL}/api/wallet` : 'http://192.168.132.143:8000/api/wallet';

  private async makeStaticResponse<T>(data: T, delay: number = 400): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data,
        });
      }, delay);
    });
  }

  // Wallet Balance APIs - Static responses
  async getBalance(): Promise<ApiResponse<WalletBalance>> {
    return this.makeStaticResponse(staticBalance);
  }

  async refreshBalance(): Promise<ApiResponse<WalletBalance>> {
    // Simulate slight balance change
    const updatedBalance = {
      ...staticBalance,
      totalBalance: staticBalance.totalBalance + Math.floor(Math.random() * 100) - 50
    };
    return this.makeStaticResponse(updatedBalance);
  }

  // Transaction APIs - Static responses
  async getTransactionHistory(
    page: number = 1,
    limit: number = 20,
    type?: string
  ): Promise<ApiResponse<{
    transactions: Transaction[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }>> {
    let filteredTransactions = staticTransactions;
    
    if (type) {
      filteredTransactions = staticTransactions.filter(txn => txn.type === type);
    }

    return this.makeStaticResponse({
      transactions: filteredTransactions,
      totalCount: filteredTransactions.length,
      currentPage: page,
      totalPages: Math.ceil(filteredTransactions.length / limit)
    });
  }

  async getTransactionById(transactionId: string): Promise<ApiResponse<Transaction>> {
    const transaction = staticTransactions.find(txn => txn.id === transactionId);
    if (transaction) {
      return this.makeStaticResponse(transaction);
    }
    return { success: false, error: 'Transaction not found' };
  }

  // Deposit APIs - Static responses
  async requestDeposit(depositData: DepositRequest): Promise<ApiResponse<{
    transactionId: string;
    status: string;
    message: string;
    paymentDetails?: any;
  }>> {
    const transactionId = 'txn_' + Date.now();
    
    return this.makeStaticResponse({
      transactionId: transactionId,
      status: 'PENDING',
      message: 'Deposit request submitted successfully. Amount will be credited after admin approval.',
      paymentDetails: {
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51...',
        upiId: 'merchant@paytm',
        amount: depositData.amount
      }
    });
  }

  async confirmDeposit(transactionId: string, utrNumber: string): Promise<ApiResponse<{
    success: boolean;
    message: string;
    newBalance?: WalletBalance;
  }>> {
    return this.makeStaticResponse({
      success: true,
      message: 'Deposit confirmation received. Amount will be credited after verification.',
      newBalance: staticBalance
    });
  }

  // Withdraw APIs - Static responses
  async requestWithdraw(withdrawData: WithdrawRequest): Promise<ApiResponse<{
    transactionId: string;
    status: string;
    message: string;
    processingTime: string;
  }>> {
    const transactionId = 'txn_' + Date.now();
    
    return this.makeStaticResponse({
      transactionId: transactionId,
      status: 'PENDING',
      message: 'Withdrawal request submitted successfully.',
      processingTime: '2-4 business hours'
    });
  }

  async cancelWithdraw(transactionId: string): Promise<ApiResponse<{
    success: boolean;
    message: string;
    refundAmount: number;
  }>> {
    const transaction = staticTransactions.find(txn => txn.id === transactionId);
    if (transaction && transaction.status === 'PENDING') {
      return this.makeStaticResponse({
        success: true,
        message: 'Withdrawal cancelled successfully',
        refundAmount: Math.abs(transaction.amount)
      });
    }
    return { success: false, error: 'Cannot cancel withdrawal' };
  }

  // Bonus APIs - Static responses
  async getAvailableBonuses(): Promise<ApiResponse<Array<{
    id: string;
    title: string;
    description: string;
    amount: number;
    type: 'DEPOSIT_BONUS' | 'REFERRAL_BONUS' | 'WELCOME_BONUS';
    expiryDate: string;
    claimed: boolean;
  }>>> {
    return this.makeStaticResponse([
      {
        id: 'bonus_1',
        title: 'Welcome Bonus',
        description: 'Get 100% bonus on your first deposit',
        amount: 500,
        type: 'WELCOME_BONUS',
        expiryDate: '2024-02-15T23:59:59Z',
        claimed: false
      },
      {
        id: 'bonus_2',
        title: 'Referral Bonus',
        description: 'Bonus for referring a friend',
        amount: 250,
        type: 'REFERRAL_BONUS',
        expiryDate: '2024-01-31T23:59:59Z',
        claimed: true
      }
    ]);
  }

  async claimBonus(bonusId: string): Promise<ApiResponse<{
    success: boolean;
    message: string;
    bonusAmount: number;
    newBalance: WalletBalance;
  }>> {
    return this.makeStaticResponse({
      success: true,
      message: 'Bonus claimed successfully',
      bonusAmount: 500,
      newBalance: {
        ...staticBalance,
        bonus: staticBalance.bonus + 500,
        totalBalance: staticBalance.totalBalance + 500
      }
    });
  }

  // Payment Methods - Static responses
  async getPaymentMethods(): Promise<ApiResponse<Array<{
    id: string;
    name: string;
    type: 'UPI' | 'BANK_TRANSFER' | 'CARD';
    isActive: boolean;
    details: any;
  }>>> {
    return this.makeStaticResponse([
      {
        id: 'upi_1',
        name: 'UPI Payment',
        type: 'UPI',
        isActive: true,
        details: {
          qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51...',
          upiId: 'merchant@paytm'
        }
      },
      {
        id: 'bank_1',
        name: 'Bank Transfer',
        type: 'BANK_TRANSFER',
        isActive: true,
        details: {
          accountNumber: '1234567890',
          ifscCode: 'ICIC0001234',
          accountHolderName: 'Dream Big Gaming'
        }
      }
    ]);
  }
}

export const walletService = new WalletService();
