import { Dimensions, Platform } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mobile-first responsive breakpoints
export const BREAKPOINTS = {
  SMALL_MOBILE: 360,
  MEDIUM_MOBILE: 414,
  LARGE_MOBILE: 768,
};

export const isSmallMobile = SCREEN_WIDTH < BREAKPOINTS.SMALL_MOBILE;
export const isMediumMobile = SCREEN_WIDTH >= BREAKPOINTS.SMALL_MOBILE && SCREEN_WIDTH < BREAKPOINTS.MEDIUM_MOBILE;
export const isLargeMobile = SCREEN_WIDTH >= BREAKPOINTS.MEDIUM_MOBILE && SCREEN_WIDTH < BREAKPOINTS.LARGE_MOBILE;
export const isTablet = SCREEN_WIDTH >= BREAKPOINTS.LARGE_MOBILE;

// Responsive sizing function for mobile
export const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium || small * 1.1;
  return large || medium || small * 1.2;
};

// Platform specific constants
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

// App specific constants
export const APP_CONSTANTS = {
  MIN_BET_AMOUNT: 10,
  MAX_BET_AMOUNT: 10000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
};

export const COLORS = {
  PRIMARY: '#4A90E2',
  SECONDARY: '#00FF88',
  BACKGROUND: '#0a0a0a',
  CARD: '#1a1a1a',
  TEXT: '#ffffff',
  TEXT_SECONDARY: '#999999',
  BORDER: '#333333',
  SUCCESS: '#00FF88',
  WARNING: '#FFD700',
  ERROR: '#FF4444',
};

export const TYPOGRAPHY = {
  FONT_SIZES: {
    xs: getResponsiveSize(10),
    sm: getResponsiveSize(12),
    md: getResponsiveSize(14),
    lg: getResponsiveSize(16),
    xl: getResponsiveSize(18),
    xxl: getResponsiveSize(20),
    xxxl: getResponsiveSize(24)
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

export const SPACING = {
  XS: getResponsiveSize(4),
  SM: getResponsiveSize(8),
  MD: getResponsiveSize(12),
  LG: getResponsiveSize(16),
  XL: getResponsiveSize(20),
  XXL: getResponsiveSize(24),
  XXXL: getResponsiveSize(32)
};

export const BORDER_RADIUS = {
  sm: getResponsiveSize(4),
  md: getResponsiveSize(8),
  lg: getResponsiveSize(12),
  xl: getResponsiveSize(16),
  round: 50
};

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