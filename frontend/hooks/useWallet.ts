
import { useState, useEffect } from 'react';
import { walletService } from '../services/walletService';

export const useWallet = () => {
  const [wallet, setWallet] = useState('₹0.00');
  const [winnings, setWinnings] = useState('₹0.00');
  const [bonus, setBonus] = useState('₹0.00');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWalletData = async () => {
    try {
      setIsLoading(true);
      const [balanceData, transactionData] = await Promise.all([
        walletService.getWalletBalance(),
        walletService.getTransactionHistory()
      ]);

      setWallet(`₹${balanceData.balance.toFixed(2)}`);
      setWinnings(`₹${balanceData.winnings.toFixed(2)}`);
      setBonus(`₹${balanceData.bonus.toFixed(2)}`);
      setTransactions(transactionData);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMoney = async (amount: number, paymentMethod: string, utrNumber: string) => {
    try {
      setIsLoading(true);
      const result = await walletService.addMoney({
        amount,
        paymentMethod,
        utrNumber,
        timestamp: Date.now()
      });

      if (result.success) {
        await fetchWalletData();
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Payment processing failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawMoney = async (amount: number) => {
    try {
      setIsLoading(true);
      const result = await walletService.withdrawMoney({
        amount,
        timestamp: Date.now()
      });

      if (result.success) {
        await fetchWalletData();
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Withdrawal processing failed' };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return {
    wallet,
    winnings,
    bonus,
    transactions,
    isLoading,
    addMoney,
    withdrawMoney,
    fetchWalletData
  };
};
