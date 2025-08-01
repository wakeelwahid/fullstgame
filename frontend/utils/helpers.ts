import { Dimensions, Platform } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT, getResponsiveSize } from './constants';

// Screen utilities
export const getScreenDimensions = () => ({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT
});

// Safe area utilities
export const getSafeAreaPadding = () => {
  if (Platform.OS === 'ios') {
    return {
      top: 44,
      bottom: 34
    };
  }
  return {
    top: 0,
    bottom: 0
  };
};

// Touch target utilities
export const getMinTouchTarget = () => getResponsiveSize(44, 48, 52);

// Format currency for mobile display
export const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '₹0';

  if (numAmount >= 10000000) {
    return `₹${(numAmount / 10000000).toFixed(1)}Cr`;
  } else if (numAmount >= 100000) {
    return `₹${(numAmount / 100000).toFixed(1)}L`;
  } else if (numAmount >= 1000) {
    return `₹${(numAmount / 1000).toFixed(1)}K`;
  }

  return `₹${numAmount.toLocaleString('en-IN')}`;
};

// Time formatting for mobile
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60);
    return `${minutes}m ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else {
    const days = Math.floor(diffInHours / 24);
    return `${days}d ago`;
  }
};

// Vibration utility
export const hapticFeedback = () => {
  // This will work on mobile devices
  if (Platform.OS !== 'web') {
    // Use Haptics from expo-haptics if available
    try {
      // Placeholder for haptic feedback
      console.log('Haptic feedback triggered');
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }
};

// Network status check
export const isOnline = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web') {
      resolve(navigator.onLine);
    } else {
      // Use NetInfo from @react-native-community/netinfo if available
      resolve(true); // Default to true for now
    }
  });
};

// Device orientation utilities
export const getOrientation = () => {
  return SCREEN_WIDTH > SCREEN_HEIGHT ? 'landscape' : 'portrait';
};

// Memory optimization for mobile
export const optimizeImageSize = (uri: string, targetWidth: number = SCREEN_WIDTH) => {
  // Return optimized image URI for mobile
  return uri; // Placeholder - implement actual optimization if needed
};

import { COLORS, APP_CONFIG } from './constants';

// Parse currency string to number
export const parseCurrency = (currencyString: string): number => {
  return parseFloat(currencyString.replace('₹', '').replace(',', ''));
};

// Calculate GST
export const calculateGST = (amount: number): number => {
  return Math.round(amount * APP_CONFIG.GST_RATE);
};

// Calculate cashback
export const calculateCashback = (amount: number): number => {
  return amount >= APP_CONFIG.CASHBACK_THRESHOLD 
    ? Math.round(amount * APP_CONFIG.CASHBACK_RATE) 
    : 0;
};

// Format date
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Generate unique ID
export const generateUniqueId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Validate UTR number
export const validateUTR = (utr: string): boolean => {
  return utr.length === APP_CONFIG.UTR_LENGTH && /^\d+$/.test(utr);
};

// Validate phone number
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Calculate bet payout
export const calculatePayout = (amount: number, betType: string): number => {
  const payoutRates = {
    'single': 9,
    'jodi': 90,
    'andar': 1.8,
    'bahar': 1.8,
    'open': 9,
    'close': 9
  };
  
  return amount * (payoutRates[betType as keyof typeof payoutRates] || 1);
};

// Get bet type display name
export const getBetTypeDisplayName = (betType: string): string => {
  const displayNames = {
    'single': 'Single',
    'jodi': 'Jodi',
    'andar': 'Andar',
    'bahar': 'Bahar',
    'open': 'Open',
    'close': 'Close'
  };
  
  return displayNames[betType as keyof typeof displayNames] || betType;
};

// Get status color
export const getStatusColor = (status: string): string => {
  const statusColors = {
    'pending': COLORS.WARNING,
    'win': COLORS.SUCCESS,
    'loss': COLORS.ERROR,
    'cancelled': COLORS.TEXT_SECONDARY
  };
  
  return statusColors[status as keyof typeof statusColors] || COLORS.TEXT_SECONDARY;
};

// Debounce function
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};