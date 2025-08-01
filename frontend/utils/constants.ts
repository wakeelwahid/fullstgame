
import { Dimensions, Platform } from 'react-native';

export const SCREEN_DIMENSIONS = Dimensions.get('window');
export const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
export const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

// Device type detection
export const DEVICE_TYPES = {
  SMALL_MOBILE: SCREEN_WIDTH < 360,
  MEDIUM_MOBILE: SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 414,
  LARGE_MOBILE: SCREEN_WIDTH >= 414 && SCREEN_WIDTH < 768,
  TABLET: SCREEN_WIDTH >= 768
};

// Platform specific constants
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_WEB = Platform.OS === 'web';

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: 320,
  sm: 360,
  md: 414,
  lg: 768,
  xl: 1024
};

// App-specific constants
export const APP_CONSTANTS = {
  MIN_BET_AMOUNT: 10,
  MAX_BET_AMOUNT: 10000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  API_TIMEOUT: 10000
};

// Colors
export const COLORS = {
  PRIMARY: '#4A90E2',
  SECONDARY: '#00FF88',
  ACCENT: '#FFD700',
  BACKGROUND: '#0a0a0a',
  CARD_BG: '#1a1a1a',
  BORDER: '#333',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#999',
  SUCCESS: '#00FF88',
  ERROR: '#FF4444',
  WARNING: '#FFD700'
};

// Typography
export const TYPOGRAPHY = {
  FONT_SIZES: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24
  },
  LINE_HEIGHTS: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36
  }
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32
};

// Border radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50
};

// Shadows (for iOS)
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8
  }
};

// Game specific constants
export const GAME_CONSTANTS = {
  BETTING_TYPES: ['single', 'jodi', 'andar', 'bahar'],
  QUICK_AMOUNTS: [10, 50, 100, 200, 500, 1000],
  SESSION_DURATIONS: {
    'Jaipur King': { start: '21:00', end: '16:50' },
    'Faridabad': { start: '22:00', end: '18:40' },
    'Ghaziabad': { start: '23:00', end: '19:50' },
    'Gali': { start: '04:00', end: '22:30' },
    'Disawer': { start: '07:00', end: '02:30' },
    'Diamond King': { start: '06:00', end: '22:10' }
  }
};

// Network constants
export const NETWORK = {
  BASE_URL: 'https://api.yourdomain.com',
  ENDPOINTS: {
    AUTH: '/auth',
    GAMES: '/games',
    BETS: '/bets',
    WALLET: '/wallet',
    TRANSACTIONS: '/transactions'
  }
};
