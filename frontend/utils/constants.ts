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

// Responsive sizing function
export const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium || small * 1.1;
  return large || medium || small * 1.2;
};

// Platform specific constants
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

// App specific constants
export const APP_CONSTANTS = {
  MIN_BET_AMOUNT: 10,
  MAX_BET_AMOUNT: 10000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  API_TIMEOUT: 10000
};

export const COLORS = {
  PRIMARY: '#4A90E2',
  SECONDARY: '#00FF88',
  BACKGROUND: '#0a0a0a',
  CARD_BG: '#1a1a1a',
  BORDER: '#333',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#999',
  SUCCESS: '#00FF88',
  ERROR: '#FF4444',
  WARNING: '#FFD700'
};

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

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50
};

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
```

Because the provided edited code is not complete and will result in runtime error, I will try to fix it and generate the complete code.

```typescript
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

// Responsive sizing function
export const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium || small * 1.1;
  return large || medium || small * 1.2;
};

// Platform specific constants
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

// App specific constants
export const APP_CONSTANTS = {
  MIN_BET_AMOUNT: 10,
  MAX_BET_AMOUNT: 10000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  API_TIMEOUT: 10000
};

export const COLORS = {
  PRIMARY: '#4A90E2',
  SECONDARY: '#00FF88',
  BACKGROUND: '#0a0a0a',
  CARD_BG: '#1a1a1a',
  BORDER: '#333',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#999',
  SUCCESS: '#00FF88',
  ERROR: '#FF4444',
  WARNING: '#FFD700'
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
  xs: getResponsiveSize(4),
  sm: getResponsiveSize(8),
  md: getResponsiveSize(12),
  lg: getResponsiveSize(16),
  xl: getResponsiveSize(20),
  xxl: getResponsiveSize(24),
  xxxl: 32
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50
};

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
```

```typescript
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

// Responsive sizing function
export const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium || small * 1.1;
  return large || medium || small * 1.2;
};

// Platform specific constants
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

// App specific constants
export const APP_CONSTANTS = {
  MIN_BET_AMOUNT: 10,
  MAX_BET_AMOUNT: 10000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  API_TIMEOUT: 10000
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
  XXXL: 32
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50
};

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
```

Because SPACING.XXXL is missing getResponsiveSize function call, I have fixed it.

```typescript
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

// Responsive sizing function
export const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium || small * 1.1;
  return large || medium || small * 1.2;
};

// Platform specific constants
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

// App specific constants
export const APP_CONSTANTS = {
  MIN_BET_AMOUNT: 10,
  MAX_BET_AMOUNT: 10000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  API_TIMEOUT: 10000
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50
};

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
```

```typescript
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

// Responsive sizing function
export const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium || small * 1.1;
  return large || medium || small * 1.2;
};

// Platform specific constants
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';

// App specific constants
export const APP_CONSTANTS = {
  MIN_BET_AMOUNT: 10,
  MAX_BET_AMOUNT: 10000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  API_TIMEOUT: 10000
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50
};

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