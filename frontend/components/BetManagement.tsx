
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { betService } from '../services/betService';
import { walletService } from '../services/walletService';

interface BetManagementProps {
  wallet: string;
  setWallet: (wallet: string) => void;
  onBetSuccess: (betDetails: any) => void;
}

export const BetManagement: React.FC<BetManagementProps> = ({
  wallet,
  setWallet,
  onBetSuccess,
}) => {
  const [betHistory, setBetHistory] = useState<any[]>([]);
  const [placedBets, setPlacedBets] = useState<any[]>([]);

  const placeBet = async (betData: any) => {
    try {
      const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));
      const totalAmount = betData.amount;

      if (currentWallet >= totalAmount) {
        // Update wallet
        const newWallet = currentWallet - totalAmount;
        setWallet(`₹${newWallet.toFixed(2)}`);

        // Create bet record
        const newBet = {
          ...betData,
          id: Date.now() + Math.random(),
          status: 'pending',
          timestamp: Date.now(),
          date: new Date().toISOString().split('T')[0]
        };

        // Update local state
        setPlacedBets(prev => [...prev, newBet]);
        setBetHistory(prev => [...prev, newBet]);

        // Call API
        await betService.placeBet(newBet);

        // Success callback
        onBetSuccess(newBet);

        return { success: true, bet: newBet };
      } else {
        Alert.alert('Insufficient Balance', 'आपके wallet में पर्याप्त balance नहीं है।');
        return { success: false, error: 'Insufficient balance' };
      }
    } catch (error) {
      Alert.alert('Error', 'Bet placement failed');
      return { success: false, error: 'Bet placement failed' };
    }
  };

  const fetchBetHistory = async () => {
    try {
      const history = await betService.getBetHistory();
      setBetHistory(history);
    } catch (error) {
      console.error('Error fetching bet history:', error);
    }
  };

  useEffect(() => {
    fetchBetHistory();
  }, []);

  return {
    placeBet,
    betHistory,
    placedBets,
    fetchBetHistory
  };
};
