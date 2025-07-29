import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface WithdrawSuccessProps {
  visible: boolean;
  amount: string;
  paymentMethod: string;
  onClose: () => void;
}

export default function WithdrawSuccess({
  visible,
  amount,
  paymentMethod,
  onClose
}: WithdrawSuccessProps) {
  const [countdownSeconds, setCountdownSeconds] = useState(7);

  useEffect(() => {
    if (visible) {
      setCountdownSeconds(7);
      const timer = setInterval(() => {
        setCountdownSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.withdrawSuccessModalContainer}>
          <View style={styles.successContent}>
            {/* Success Icon */}
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✅</Text>
            </View>

            {/* Success Message */}
            <Text style={styles.successTitle}>Withdrawal Successful!</Text>

            {/* Amount Display */}
            <View style={styles.amountDisplayContainer}>
              <Text style={styles.amountDisplayLabel}>Amount:</Text>
              <Text style={styles.amountDisplayValue}>₹{amount}</Text>
            </View>

            {/* UPI ID Display */}
            <View style={styles.upiDisplayContainer}>
              <Text style={styles.upiDisplayLabel}>UPI ID:</Text>
              <Text style={styles.upiDisplayValue}>user@{paymentMethod.toLowerCase()}</Text>
            </View>

            {/* Processing Time */}
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>Processing Time: 5-10 minutes</Text>
            </View>

            {/* Countdown */}
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>
                Auto redirect in {countdownSeconds} seconds
              </Text>
            </View>

            {/* Manual Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawSuccessModalContainer: {
    backgroundColor: '#0a0a0a',
    width: '85%',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00FF88',
  },
  successContent: {
    alignItems: 'center',
    width: '100%',
  },
  successIcon: {
    backgroundColor: '#00FF88',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIconText: {
    fontSize: 35,
    color: '#000',
  },
  successTitle: {
    color: '#00FF88',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  amountDisplayContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  amountDisplayLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  amountDisplayValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  upiDisplayContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A90E2',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  upiDisplayLabel: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  upiDisplayValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  timeText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  countdownContainer: {
    marginBottom: 20,
  },
  countdownText: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});