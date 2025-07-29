
import { COLORS, APP_CONFIG } from './constants';

// Format currency
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

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

// Format time
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-IN', {
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
