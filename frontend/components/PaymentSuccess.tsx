
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface PaymentSuccessProps {
  visible: boolean;
  amount: string;
  utrNumber: string;
  paymentMethod: string;
  onClose: () => void;
}

export default function PaymentSuccess({
  visible,
  amount,
  utrNumber,
  paymentMethod,
  onClose
}: PaymentSuccessProps) {
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
        <View style={styles.paymentSuccessModalContainer}>
          <View style={styles.successContent}>
            {/* Success Icon */}
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✅</Text>
            </View>

            {/* Success Message */}
            <Text style={styles.successTitle}>Deposit Successful!</Text>
            
            {/* Amount Display */}
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount</Text>
              <Text style={styles.amountValue}>₹{amount}</Text>
            </View>

            {/* Payment Method */}
            <View style={styles.methodContainer}>
              <Text style={styles.methodLabel}>Payment Method</Text>
              <Text style={styles.methodValue}>{paymentMethod}</Text>
            </View>

            {/* UTR Display */}
            <View style={styles.utrContainer}>
              <Text style={styles.utrLabel}>UTR Number</Text>
              <Text style={styles.utrValue}>{utrNumber}</Text>
            </View>

            {/* Countdown */}
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>
                Closing in {countdownSeconds} seconds...
              </Text>
            </View>

            {/* Manual Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>CLOSE</Text>
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
  paymentSuccessModalContainer: {
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
  amountContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  amountLabel: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  amountValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  methodContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4A90E2',
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  methodLabel: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  methodValue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  utrContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  utrLabel: {
    color: '#999',
    fontSize: 14,
    fontWeight: 'bold',
  },
  utrValue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  countdownContainer: {
    marginBottom: 20,
  },
  countdownText: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
