
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { walletService } from '../services/walletService';

interface WalletManagerProps {
  wallet: string;
  setWallet: (wallet: string) => void;
  onPaymentSuccess: (amount: string) => void;
  onWithdrawSuccess: (amount: string) => void;
}

export const WalletManager: React.FC<WalletManagerProps> = ({
  wallet,
  setWallet,
  onPaymentSuccess,
  onWithdrawSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
        const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));
        setWallet(`₹${(currentWallet + amount).toFixed(2)}`);
        onPaymentSuccess(amount.toString());
      } else {
        Alert.alert('Error', result.error || 'Payment failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed');
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawMoney = async (amount: number) => {
    try {
      setIsLoading(true);
      const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));

      if (currentWallet >= amount) {
        const result = await walletService.withdrawMoney({
          amount,
          timestamp: Date.now()
        });

        if (result.success) {
          setWallet(`₹${(currentWallet - amount).toFixed(2)}`);
          onWithdrawSuccess(amount.toString());
        } else {
          Alert.alert('Error', result.error || 'Withdrawal failed');
        }
      } else {
        Alert.alert('Insufficient Balance', 'आपके wallet में पर्याप्त balance नहीं है।');
      }
    } catch (error) {
      Alert.alert('Error', 'Withdrawal processing failed');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDepositDetails = (amount: number) => {
    const gst = Math.round(amount * 0.28);
    const cashback = amount >= 2000 ? Math.round(amount * 0.05) : 0;
    const total = amount + gst;
    return { gst, cashback, total };
  };

  return {
    addMoney,
    withdrawMoney,
    calculateDepositDetails,
    isLoading
  };
};
