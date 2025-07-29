
// App Configuration Constants
export const APP_CONFIG = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  MIN_CHALLENGE_AMOUNT: 10,
  MAX_CHALLENGE_AMOUNT: 50000,
  REDEEM_MIN_AMOUNT: 100,
  GST_RATE: 0.28,
  CASHBACK_THRESHOLD: 2000,
  CASHBACK_RATE: 0.05,
  UTR_LENGTH: 12,
  AUTO_CLOSE_SUCCESS_MODAL: 3000,
};

// Game Types
export const GAME_TYPES = {
  SINGLE: 'single',
  JODI: 'jodi',
  ANDAR: 'andar',
  BAHAR: 'bahar',
  OPEN: 'open',
  CLOSE: 'close'
};

// Challenge Status
export const CHALLENGE_STATUS = {
  PENDING: 'pending',
  WIN: 'win',
  LOSS: 'loss',
  CANCELLED: 'cancelled'
};

// Payment Methods
export const PAYMENT_METHODS = {
  UPI: 'upi',
  BANK_TRANSFER: 'bank_transfer',
  PAYTM: 'paytm',
  PHONEPE: 'phonepe',
  GPAY: 'gpay'
};

// KYC Status
export const KYC_STATUS = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

// Transaction Types
export const TRANSACTION_TYPES = {
  ADD_COINS: 'add_coins',
  REDEEM: 'redeem',
  CHALLENGE_PLAYED: 'challenge_played',
  REWARD_WON: 'reward_won',
  REFUND: 'refund'
};

// Colors
export const COLORS = {
  PRIMARY: '#4A90E2',
  SUCCESS: '#00FF88',
  WARNING: '#FFD700',
  ERROR: '#FF4444',
  BACKGROUND: '#0a0a0a',
  CARD_BACKGROUND: '#1a1a1a',
  BORDER: '#333',
  TEXT_PRIMARY: '#fff',
  TEXT_SECONDARY: '#999',
  TEXT_MUTED: '#666'
};

// Common Styles
export const COMMON_STYLES = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  card: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
  }
};
