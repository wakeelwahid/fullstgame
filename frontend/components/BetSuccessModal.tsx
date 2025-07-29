import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BetSuccessModalProps {
  visible: boolean;
  betDetails: {
    number: string | number;
    amount: number;
    type: string;
    gameName: string;
  } | null;
  onClose: () => void;
  onNavigateToMyBets?: () => void;
}

export default function BetSuccessModal({ visible, betDetails, onClose, onNavigateToMyBets }: BetSuccessModalProps) {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [scaleAnim] = React.useState(new Animated.Value(0.8));
  const [countdown, setCountdown] = React.useState(7);

  React.useEffect(() => {
    if (visible) {
      console.log('BetSuccessModal became visible');
      setCountdown(7);
      
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: false,
        }),
      ]).start();
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            console.log('BetSuccessModal auto-closing');
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // Reset animations when not visible
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
    }
  }, [visible, onClose]);

  if (!betDetails) return null;

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'andar': return '🟢';
      case 'bahar': return '🔴';
      default: return '🎯';
    }
  };

  const getTypeTitle = (type: string) => {
    switch (type) {
      case 'andar': return 'Andar';
      case 'bahar': return 'Bahar';
      default: return 'Numbers';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.successModal,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Success Icon */}
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#00FF88" />
          </View>

          {/* Success Title */}
          <Text style={styles.successTitle}>🎉 Challenge Started Successfully!</Text>
          <Text style={styles.successSubtitle}>आपका bet सफलतापूर्वक लगा दिया गया है</Text>

          {/* Bet Details Card */}
          <View style={styles.betDetailsCard}>
            <View style={styles.betDetailRow}>
              <Text style={styles.betDetailLabel}>Game:</Text>
              <Text style={styles.betDetailValue}>{betDetails.gameName}</Text>
            </View>

            <View style={styles.betDetailRow}>
              <Text style={styles.betDetailLabel}>Type:</Text>
              <Text style={styles.betDetailValue}>
                {getTypeEmoji(betDetails.type)} {getTypeTitle(betDetails.type)}
              </Text>
            </View>

            <View style={styles.betDetailRow}>
              <Text style={styles.betDetailLabel}>Number:</Text>
              <Text style={styles.betDetailValueHighlight}>{betDetails.number}</Text>
            </View>

            <View style={[styles.betDetailRow, styles.amountRow]}>
              <Text style={styles.betDetailLabel}>Amount:</Text>
              <Text style={styles.amountValue}>₹{betDetails.amount}</Text>
            </View>
          </View>

          {/* Success Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              ✨ Best of luck! आपका bet successfully place हो गया है।
            </Text>
            <Text style={styles.navigationText}>
              🎯 आपके bets MyBet section में दिखेंगे...
            </Text>
            <Text style={styles.countdownText}>
              {countdown} seconds में Home page पर redirect हो जाएंगे...
            </Text>
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={() => {
            onClose();
          }}>
            <Text style={styles.closeButtonText}>Continue to Home</Text>
            <Ionicons name="home" size={16} color="#0a0a0a" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#0a0a0a',
    width: '90%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00FF88',
    shadowColor: '#00FF88',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  successIconContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00FF88',
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 25,
  },
  betDetailsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  betDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountRow: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
    marginBottom: 0,
  },
  betDetailLabel: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  betDetailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  betDetailValueHighlight: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountValue: {
    color: '#00FF88',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  messageText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 10,
  },
  navigationText: {
    color: '#4A90E2',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#00FF88',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countdownText: {
    color: '#4A90E2',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});