
import { ApiResponse, apiService } from './apiService';

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

class WalletService {
  private baseUrl = '/api';

  // Wallet Balance APIs
  async getBalance(): Promise<ApiResponse<WalletBalance>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/balance/`);
      
      if (response.data) {
        const balance: WalletBalance = {
          totalBalance: response.data.wallet || 0,
          playableBalance: response.data.wallet || 0,
          winnings: response.data.winnings || 0,
          bonus: response.data.bonus || 0
        };
        
        return { success: true, data: balance };
      }
      
      return { success: false, error: 'Failed to get balance' };
    } catch (error) {
      console.error('Get balance error:', error);
      return { success: false, error: 'Failed to get balance' };
    }
  }

  async refreshBalance(): Promise<ApiResponse<WalletBalance>> {
    // Same as getBalance for now
    return this.getBalance();
  }

  // Transaction APIs
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
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(type && { type })
      });
      
      const response = await apiService.get(`${this.baseUrl}/transactions/?${params}`);
      
      if (response.data && response.data.results) {
        const transactions: Transaction[] = response.data.results.map((txn: any) => ({
          id: txn.id?.toString() || '',
          type: this.mapTransactionType(txn.type),
          amount: txn.amount || 0,
          status: this.mapTransactionStatus(txn.status),
          description: txn.note || txn.description || '',
          createdAt: txn.created_at || txn.timestamp || new Date().toISOString(),
          utrNumber: txn.utr_number
        }));
        
        return {
          success: true,
          data: {
            transactions,
            totalCount: response.data.count || transactions.length,
            currentPage: page,
            totalPages: Math.ceil((response.data.count || transactions.length) / limit)
          }
        };
      }
      
      return { success: false, error: 'Failed to get transaction history' };
    } catch (error) {
      console.error('Get transaction history error:', error);
      return { success: false, error: 'Failed to get transaction history' };
    }
  }

  async getTransactionById(transactionId: string): Promise<ApiResponse<Transaction>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/transactions/${transactionId}/`);
      
      if (response.data) {
        const transaction: Transaction = {
          id: response.data.id?.toString() || '',
          type: this.mapTransactionType(response.data.type),
          amount: response.data.amount || 0,
          status: this.mapTransactionStatus(response.data.status),
          description: response.data.note || response.data.description || '',
          createdAt: response.data.created_at || new Date().toISOString(),
          utrNumber: response.data.utr_number
        };
        
        return { success: true, data: transaction };
      }
      
      return { success: false, error: 'Transaction not found' };
    } catch (error) {
      console.error('Get transaction error:', error);
      return { success: false, error: 'Transaction not found' };
    }
  }

  // Deposit APIs
  async requestDeposit(depositData: DepositRequest): Promise<ApiResponse<{
    transactionId: string;
    status: string;
    message: string;
    paymentDetails?: any;
  }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/deposit/`, {
        amount: depositData.amount,
        payment_method: depositData.paymentMethod.toLowerCase(),
        utr_number: depositData.utrNumber
      });
      
      return {
        success: true,
        data: {
          transactionId: response.data.id?.toString() || 'txn_' + Date.now(),
          status: 'PENDING',
          message: 'Deposit request submitted successfully. Amount will be credited after admin approval.',
          paymentDetails: response.data.payment_details
        }
      };
    } catch (error) {
      console.error('Deposit request error:', error);
      return { success: false, error: 'Failed to submit deposit request' };
    }
  }

  async confirmDeposit(transactionId: string, utrNumber: string): Promise<ApiResponse<{
    success: boolean;
    message: string;
    newBalance?: WalletBalance;
  }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/deposit/${transactionId}/confirm/`, {
        utr_number: utrNumber
      });
      
      const newBalance = await this.getBalance();
      
      return {
        success: true,
        data: {
          success: true,
          message: 'Deposit confirmation received. Amount will be credited after verification.',
          newBalance: newBalance.data
        }
      };
    } catch (error) {
      console.error('Confirm deposit error:', error);
      return { success: false, error: 'Failed to confirm deposit' };
    }
  }

  // Withdraw APIs
  async requestWithdraw(withdrawData: WithdrawRequest): Promise<ApiResponse<{
    transactionId: string;
    status: string;
    message: string;
    processingTime: string;
  }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/withdraw/`, {
        amount: withdrawData.amount,
        account_number: withdrawData.accountDetails.accountNumber,
        ifsc_code: withdrawData.accountDetails.ifscCode,
        account_holder_name: withdrawData.accountDetails.accountHolderName
      });
      
      return {
        success: true,
        data: {
          transactionId: response.data.id?.toString() || 'txn_' + Date.now(),
          status: 'PENDING',
          message: 'Withdrawal request submitted successfully.',
          processingTime: '2-4 business hours'
        }
      };
    } catch (error) {
      console.error('Withdraw request error:', error);
      return { success: false, error: response.data?.error || 'Failed to submit withdrawal request' };
    }
  }

  async cancelWithdraw(transactionId: string): Promise<ApiResponse<{
    success: boolean;
    message: string;
    refundAmount: number;
  }>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/withdraw/${transactionId}/cancel/`, {});
      
      return {
        success: true,
        data: {
          success: true,
          message: 'Withdrawal cancelled successfully',
          refundAmount: response.data.refund_amount || 0
        }
      };
    } catch (error) {
      console.error('Cancel withdraw error:', error);
      return { success: false, error: 'Cannot cancel withdrawal' };
    }
  }

  // Helper methods
  private mapTransactionType(backendType: string): Transaction['type'] {
    const typeMap: Record<string, Transaction['type']> = {
      'deposit': 'DEPOSIT',
      'withdrawal': 'WITHDRAW',
      'bet': 'BET_PLACED',
      'win': 'BET_WON',
      'loss': 'BET_LOST',
      'bonus': 'BONUS',
      'refund': 'REFUND'
    };
    
    return typeMap[backendType?.toLowerCase()] || 'DEPOSIT';
  }

  private mapTransactionStatus(backendStatus: string): Transaction['status'] {
    const statusMap: Record<string, Transaction['status']> = {
      'pending': 'PENDING',
      'approved': 'COMPLETED',
      'completed': 'COMPLETED',
      'rejected': 'FAILED',
      'failed': 'FAILED',
      'cancelled': 'CANCELLED'
    };
    
    return statusMap[backendStatus?.toLowerCase()] || 'PENDING';
  }

  // Bonus APIs - These would need to be implemented in backend
  async getAvailableBonuses(): Promise<ApiResponse<Array<any>>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/bonuses/`);
      return { success: true, data: response.data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to get bonuses' };
    }
  }

  async claimBonus(bonusId: string): Promise<ApiResponse<any>> {
    try {
      const response = await apiService.post(`${this.baseUrl}/bonuses/${bonusId}/claim/`, {});
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to claim bonus' };
    }
  }

  // Payment Methods - These would need to be implemented in backend
  async getPaymentMethods(): Promise<ApiResponse<Array<any>>> {
    try {
      const response = await apiService.get(`${this.baseUrl}/payment-methods/`);
      return { success: true, data: response.data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to get payment methods' };
    }
  }
}

export const walletService = new WalletService();
