import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Modal, TextInput, Alert, FlatList, Animated, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import components
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import Games from './components/Games';
import BottomMenu from './components/BottomMenu';
import BettingModal from './components/BettingModal';
import BetSuccessModal from './components/BetSuccessModal';
import MyBet from './components/MyBet';
import WalletOperations from './components/WalletOperations';
import PaymentSuccess from './components/PaymentSuccess';
import WithdrawSuccess from './components/WithdrawSuccess';
import Profile from './components/Profile';
import BetHistory from './components/BetHistory';
import AgeVerificationModal from './components/AgeVerificationModal';
import Transaction from './components/Transaction';
import KYCPage from './components/KYCPage';
import ReferPage from './components/ReferPage';
import RefundPolicy from './components/RefundPolicy';
import {
  GameHistory,
  ResultsModal,
} from './components';

// Import API services
import { userService } from './services/userService';
import { walletService } from './services/walletService';
import { gameService } from './services/gameService';

// Import constants
import { GAME_CARDS, FEATURES } from './constants/gameData';

// Import hooks
import { useAuth } from './hooks/useAuth';
import { useWallet } from './hooks/useWallet';
import AuthScreen from './components/AuthScreen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mobile-first responsive breakpoints
const isSmallMobile = SCREEN_WIDTH < 360;
const isMediumMobile = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 414;
const isLargeMobile = SCREEN_WIDTH >= 414 && SCREEN_WIDTH < 768;
const isTablet = SCREEN_WIDTH >= 768;

// Dynamic sizing based on screen size
const getResponsiveSize = (small: number, medium: number, large: number) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium;
  return large;
};

export default function App() {
  // Auth state
  const { user, isAuthenticated, isLoading, login, register, logout, updateProfile } = useAuth();
  const [showAuthRequired, setShowAuthRequired] = useState(false);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [appInitialized, setAppInitialized] = useState(false);

  // Wallet state  
  const { wallet, winnings, bonus, addMoney, withdrawMoney } = useWallet();

  // Sync authentication states
  useEffect(() => {
    if (isAuthenticated && user) {
      setIsAuthenticatedState(true);
      setShowAuthRequired(false);
      setShowAuthModalState(false);
    } else {
      setIsAuthenticatedState(false);
    }
  }, [isAuthenticated, user]);

  const [winningsState, setWinningsState] = useState('₹0.00');
  const [showBettingModalState, setShowBettingModalState] = useState(false);
  const [selectedGameState, setSelectedGameState] = useState(null);
  const [showAmountModalState, setShowAmountModalState] = useState(false);
  const [selectedNumberState, setSelectedNumberState] = useState(null);
  const [customAmountState, setCustomAmountState] = useState('');
  const [betListState, setBetListState] = useState([]);
  const [betHistoryState, setBetHistoryState] = useState([
    {
      id: '1',
      game: 'Jaipur King',
      number: '14',
      amount: 100,
      type: 'single',
      status: 'pending',
      timestamp: Date.now() - 3600000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '2',
      game: 'Jaipur King',
      number: '2',
      amount: 100,
      type: 'andar',
      status: 'pending',
      timestamp: Date.now() - 3600000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '3',
      game: 'Jaipur King',
      number: '61',
      amount: 100,
      type: 'single',
      status: 'pending',
      timestamp: Date.now() - 3600000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '4',
      game: 'Jaipur King',
      number: '5',
      amount: 50,
      type: 'bahar',
      status: 'pending',
      timestamp: Date.now() - 3600000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '5',
      game: 'Jaipur King',
      number: '77',
      amount: 200,
      type: 'jodi',
      status: 'pending',
      timestamp: Date.now() - 3600000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '6',
      game: 'Jaipur King',
      number: '9',
      amount: 150,
      type: 'single',
      status: 'pending',
      timestamp: Date.now() - 3600000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '7',
      game: 'Faridabad',
      number: '6',
      amount: 100,
      type: 'single',
      status: 'win',
      winAmount: 900,
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '8',
      game: 'Faridabad',
      number: '8',
      amount: 100,
      type: 'single',
      status: 'win',
      winAmount: 900,
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '9',
      game: 'Faridabad',
      number: '1',
      amount: 100,
      type: 'andar',
      status: 'win',
      winAmount: 180,
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '10',
      game: 'Faridabad',
      number: '27',
      amount: 100,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '11',
      game: 'Faridabad',
      number: '33',
      amount: 100,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '12',
      game: 'Faridabad',
      number: '4',
      amount: 100,
      type: 'bahar',
      status: 'loss',
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '13',
      game: 'Faridabad',
      number: '19',
      amount: 500,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '14',
      game: 'Faridabad',
      number: '99',
      amount: 300,
      type: 'jodi',
      status: 'loss',
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '15',
      game: 'Faridabad',
      number: '0',
      amount: 100,
      type: 'andar',
      status: 'win',
      winAmount: 180,
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '16',
      game: 'Faridabad',
      number: '7',
      amount: 250,
      type: 'single',
      status: 'win',
      winAmount: 2250,
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '17',
      game: 'Ghaziabad',
      number: '89',
      amount: 200,
      type: 'jodi',
      status: 'loss',
      timestamp: Date.now() - 86400000,
      sessionTime: '11:00 PM - 07:50 PM'
    },
    {
      id: '18',
      game: 'Ghaziabad',
      number: '45',
      amount: 150,
      type: 'single',
      status: 'win',
      winAmount: 1350,
      timestamp: Date.now() - 86400000,
      sessionTime: '11:00 PM - 07:50 PM'
    },
    {
      id: '19',
      game: 'Ghaziabad',
      number: '3',
      amount: 100,
      type: 'single',
      status: 'win',
      winAmount: 900,
      timestamp: Date.now() - 86400000,
      sessionTime: '11:00 PM - 07:50 PM'
    },
    {
      id: '20',
      game: 'Ghaziabad',
      number: '7',
      amount: 50,
      type: 'bahar',
      status: 'loss',
      timestamp: Date.now() - 86400000,
      sessionTime: '11:00 PM - 07:50 PM'
    },
    {
      id: '21',
      game: 'Ghaziabad',
      number: '56',
      amount: 300,
      type: 'jodi',
      status: 'loss',
      timestamp: Date.now() - 86400000,
      sessionTime: '11:00 PM - 07:50 PM'
    },
    {
      id: '22',
      game: 'Ghaziabad',
      number: '2',
      amount: 100,
      type: 'andar',
      status: 'win',
      winAmount: 180,
      timestamp: Date.now() - 86400000,
      sessionTime: '11:00 PM - 07:50 PM'
    },
    {
      id: '23',
      game: 'Gali',
      number: '12',
      amount: 300,
      type: 'single',
      status: 'pending',
      timestamp: Date.now() - 1800000,
      sessionTime: '04:00 AM - 10:30 PM'
    },
    {
      id: '24',
      game: 'Gali',
      number: '3',
      amount: 200,
      type: 'bahar',
      status: 'pending',
      timestamp: Date.now() - 1800000,
      sessionTime: '04:00 AM - 10:30 PM'
    },
    {
      id: '25',
      game: 'Gali',
      number: '88',
      amount: 150,
      type: 'jodi',
      status: 'pending',
      timestamp: Date.now() - 1800000,
      sessionTime: '04:00 AM - 10:30 PM'
    },
    {
      id: '26',
      game: 'Gali',
      number: '5',
      amount: 100,
      type: 'single',
      status: 'pending',
      timestamp: Date.now() - 1800000,
      sessionTime: '04:00 AM - 10:30 PM'
    },
    {
      id: '27',
      game: 'Gali',
      number: '9',
      amount: 100,
      type: 'andar',
      status: 'pending',
      timestamp: Date.now() - 1800000,
      sessionTime: '04:00 AM - 10:30 PM'
    },
    {
      id: '28',
      game: 'Disawer',
      number: '23',
      amount: 100,
      type: 'single',
      status: 'win',
      winAmount: 900,
      timestamp: Date.now() - 10800000,
      sessionTime: '07:00 AM - 02:30 AM'
    },
    {
      id: '29',
      game: 'Disawer',
      number: '67',
      amount: 200,
      type: 'jodi',
      status: 'loss',
      timestamp: Date.now() - 10800000,
      sessionTime: '07:00 AM - 02:30 AM'
    },
    {
      id: '30',
      game: 'Disawer',
      number: '4',
      amount: 50,
      type: 'bahar',
      status: 'win',
      winAmount: 90,
      timestamp: Date.now() - 10800000,
      sessionTime: '07:00 AM - 02:30 AM'
    },
    {
      id: '31',
      game: 'Disawer',
      number: '1',
      amount: 150,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 10800000,
      sessionTime: '07:00 AM - 02:30 AM'
    },
    {
      id: '32',
      game: 'Disawer',
      number: '8',
      amount: 100,
      type: 'andar',
      status: 'win',
      winAmount: 180,
      timestamp: Date.now() - 10800000,
      sessionTime: '07:00 AM - 02:30 AM'
    },
    {
      id: '33',
      game: 'Diamond King',
      number: '55',
      amount: 500,
      type: 'jodi',
      status: 'win',
      winAmount: 4500,
      timestamp: Date.now() - 14400000,
      sessionTime: '06:00 AM - 10:10 PM'
    },
    {
      id: '34',
      game: 'Diamond King',
      number: '6',
      amount: 200,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 14400000,
      sessionTime: '06:00 AM - 10:10 PM'
    },
    {
      id: '35',
      game: 'Diamond King',
      number: '11',
      amount: 100,
      type: 'jodi',
      status: 'loss',
      timestamp: Date.now() - 14400000,
      sessionTime: '06:00 AM - 10:10 PM'
    },
    {
      id: '36',
      game: 'Diamond King',
      number: '3',
      amount: 50,
      type: 'bahar',
      status: 'win',
      winAmount: 90,
      timestamp: Date.now() - 14400000,
      sessionTime: '06:00 AM - 10:10 PM'
    },
    {
      id: '37',
      game: 'Diamond King',
      number: '9',
      amount: 100,
      type: 'single',
      status: 'win',
      winAmount: 900,
      timestamp: Date.now() - 14400000,
      sessionTime: '06:00 AM - 10:10 PM'
    },
    {
      id: '38',
      game: 'Diamond King',
      number: '0',
      amount: 75,
      type: 'andar',
      status: 'loss',
      timestamp: Date.now() - 14400000,
      sessionTime: '06:00 AM - 10:10 PM'
    },
    {
      id: '39',
      game: 'Jaipur King',
      number: '44',
      amount: 400,
      type: 'jodi',
      status: 'win',
      winAmount: 3600,
      timestamp: Date.now() - 172800000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '40',
      game: 'Jaipur King',
      number: '7',
      amount: 250,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 172800000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '41',
      game: 'Jaipur King',
      number: '6',
      amount: 100,
      type: 'bahar',
      status: 'win',
      winAmount: 180,
      timestamp: Date.now() - 172800000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '42',
      game: 'Jaipur King',
      number: '22',
      amount: 300,
      type: 'jodi',
      status: 'loss',
      timestamp: Date.now() - 172800000,
      sessionTime: '09:00 PM - 04:50 PM'
    },
    {
      id: '43',
      game: 'Faridabad',
      number: '13',
      amount: 1000,
      type: 'single',
      status: 'win',
      winAmount: 9000,
      timestamp: Date.now() - 259200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '44',
      game: 'Faridabad',
      number: '78',
      amount: 600,
      type: 'jodi',
      status: 'loss',
      timestamp: Date.now() - 259200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '45',
      game: 'Faridabad',
      number: '5',
      amount: 200,
      type: 'andar',
      status: 'win',
      winAmount: 360,
      timestamp: Date.now() - 259200000,
      sessionTime: '10:00 PM - 06:40 PM'
    },
    {
      id: '46',
      game: 'Gali',
      number: '90',
      amount: 800,
      type: 'jodi',
      status: 'win',
      winAmount: 7200,
      timestamp: Date.now() - 345600000,
      sessionTime: '04:00 AM - 10:30 PM'
    },
    {
      id: '47',
      game: 'Disawer',
      number: '2',
      amount: 150,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 432000000,
      sessionTime: '07:00 AM - 02:30 AM'
    },
    {
      id: '48',
      game: 'Diamond King',
      number: '77',
      amount: 500,
      type: 'jodi',
      status: 'win',
      winAmount: 4500,
      timestamp: Date.now() - 518400000,
      sessionTime: '06:00 AM - 10:10 PM'
    },
    {
      id: '49',
      game: 'Ghaziabad',
      number: '4',
      amount: 100,
      type: 'single',
      status: 'loss',
      timestamp: Date.now() - 604800000,
      sessionTime: '11:00 PM - 07:50 PM'
    },
    {
      id: '50',
      game: 'Jaipur King',
      number: '9',
      amount: 200,
      type: 'bahar',
      status: 'win',
      winAmount: 360,
      timestamp: Date.now() - 691200000,
      sessionTime: '09:00 PM - 04:50 PM'
    }
  ]);
  const [currentBetTypeState, setCurrentBetTypeState] = useState('numbers');
  const [showAuthModalState, setShowAuthModalState] = useState(false);
  const [authModeState, setAuthModeState] = useState('login');
  const [showAddCashModalState, setShowAddCashModalState] = useState(false);
  const [showWithdrawModalState, setShowWithdrawModalState] = useState(false);
  const [depositAmountState, setDepositAmountState] = useState('');
  const [withdrawAmountState, setWithdrawAmountState] = useState('');
  const [showPaymentModalState, setShowPaymentModalState] = useState(false);
  const [selectedPaymentMethodState, setSelectedPaymentMethodState] = useState('');
  const [utrNumberState, setUtrNumberState] = useState('');
  const [showPaymentSuccessModalState, setShowPaymentSuccessModalState] = useState(false);
  const [showWithdrawSuccessModalState, setShowWithdrawSuccessModalState] = useState(false);
  const [countdownSecondsState, setCountdownSecondsState] = useState(5);
  const [userDataState, setUserDataState] = useState({
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john@example.com',
    referralCode: 'REF12345',
    kycStatus: 'VERIFIED' as 'VERIFIED' | 'PENDING' | 'REJECTED'
  });

  const [showBetSuccessState, setShowBetSuccessState] = useState(false);
  const [lastBetDetailsState, setLastBetDetailsState] = useState(null);
  const [redirectTimer, setRedirectTimer] = useState(null);
  const [placedBetsState, setPlacedBetsState] = React.useState<any[]>([]);

  const [showAgeVerificationState, setShowAgeVerificationState] = React.useState(false);
  const [isAgeVerifiedState, setIsAgeVerifiedState] = React.useState(false);
  const [showKYCPageState, setShowKYCPageState] = React.useState(false);
  const [showRefundPolicyState, setShowRefundPolicyState] = React.useState(false);

  const gameCards = GAME_CARDS;
  const features = FEATURES;

  // UI state - consolidated
  const [activeTabLocal, setActiveTabLocal] = useState('home');
  const [showBettingModalLocal, setShowBettingModalLocal] = useState(false);
  const [showKYCPageLocal, setShowKYCPageLocal] = useState(false);
  const [showAgeVerificationLocal, setShowAgeVerificationLocal] = useState(false);
  const [isAgeVerifiedLocal, setIsAgeVerifiedLocal] = useState(false);

  // Game state
  const [selectedGameLocal, setSelectedGameLocal] = useState(null);

  // Modal states
  const [showAddCashModalLocal, setShowAddCashModalLocal] = useState(false);
  const [showWithdrawModalLocal, setShowWithdrawModalLocal] = useState(false);
  const [showPaymentModalLocal, setShowPaymentModalLocal] = useState(false);
  const [showPaymentSuccessModalLocal, setShowPaymentSuccessModalLocal] = useState(false);
  const [showWithdrawSuccessModalLocal, setShowWithdrawSuccessModalLocal] = useState(false);

  // Form states
  const [depositAmountLocal, setDepositAmountLocal] = useState('');
  const [withdrawAmountLocal, setWithdrawAmountLocal] = useState('');
  const [selectedPaymentMethodLocal, setSelectedPaymentMethodLocal] = useState('');
  const [utrNumberLocal, setUtrNumberLocal] = useState('');
  const [activeTabState, setActiveTabState] = useState('home');
  const [currentViewState, setCurrentViewState] = useState('home');
  const [showResultsModal, setShowResultsModal] = useState(false);

  useEffect(() => {
    console.log('App initialized - Age verification will be shown first');
    setTimeout(() => {
      setShowAgeVerificationState(true);
      setAppInitialized(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (appInitialized && !isLoading && !isAuthenticated) {
      setShowAuthModalState(true);
      setShowAuthRequired(true);
    }
  }, [appInitialized, isLoading, isAuthenticated]);

  const handlePlayNow = (game: any) => {
    setSelectedGameState(game);
    setShowBettingModalState(true);
  };

  const handleBetSuccessState = (betDetails: any) => {
    setLastBetDetailsState(betDetails);
    setShowBetSuccessState(true);
    setShowBettingModalState(false);

    setTimeout(() => {
      setShowBetSuccessState(false);
      setActiveTabLocal('mybets');
    }, 3000);
  };

  const handleKYCPress = () => {
    setShowKYCPageState(true);
  };

  const handleAgeVerificationAccept = () => {
    setIsAgeVerifiedState(true);
    setShowAgeVerificationState(false);

    setTimeout(() => {
      setShowAuthModalState(true);
      setShowAuthRequired(true);
    }, 300);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethodState(method);
    setShowAddCashModalState(false);
    setShowPaymentModalState(true);
  };

  const handleUTRConfirmation = async () => {
    if (utrNumberState.length !== 12) {
      return;
    }
    setShowPaymentModalState(false);
    setShowPaymentSuccessModalState(true);
  };

  const handleWithdrawRequest = async (amount: number) => {
    setShowWithdrawModalState(false);
    setShowWithdrawSuccessModalState(true);
    console.log('Withdrawal request submitted for amount:', amount);
  };

  const handleMenuItemPress = (key: string) => {
    setActiveTabLocal(key);
    setActiveTabState(key);
  };

  const handleGameSelect = (game: any) => {
    setSelectedGameLocal(game);
    setSelectedGameState(game);
    setBetListState([]);
    setShowBettingModalLocal(true);
    setShowBettingModalState(true);
  };

  const handleNumberSelect = (number: any, type: string, amount: number) => {
    const existingBetIndex = betListState.findIndex(b => b.number === number && b.type === type);

    if (existingBetIndex >= 0) {
      const updatedBetList = [...betListState];
      updatedBetList[existingBetIndex].amount = amount;
      setBetListState(updatedBetList);
    } else {
      const newBet = {
        id: Date.now(),
        number,
        amount,
        type,
        game: selectedGameState?.title || '',
        timestamp: new Date(),
      };
      setBetListState([...betListState, newBet]);
    }
  };

  const handlePlaceBets = () => {
    console.log('handlePlaceBets called with betList:', betListState);

    if (betListState.length === 0) {
      Alert.alert('No Bets', 'कोई bet select नहीं किया गया है।');
      return;
    }

    const totalAmount = betListState.reduce((total, bet) => total + bet.amount, 0);
    const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));

    console.log('Total amount:', totalAmount, 'Current wallet:', currentWallet);

    if (currentWallet >= totalAmount) {
      withdrawMoney(totalAmount);
    }

    const newBets = betListState.map(bet => ({
      ...bet,
      id: Date.now() + Math.random(),
      game: selectedGameLocal?.title || selectedGameState?.title || 'Unknown Game',
      status: 'pending' as const,
      timestamp: Date.now(),
      sessionTime: selectedGameLocal?.timing || selectedGameState?.timing || '09:00 PM - 04:50 PM',
      date: new Date().toISOString().split('T')[0]
    }));

    const betDetails = {
      number: betListState.length > 1 ? `${betListState.length} Numbers` : String(betListState[0].number),
      amount: totalAmount,
      type: betListState.length > 1 ? 'Multiple' : betListState[0].type,
      gameName: selectedGameLocal?.title || selectedGameState?.title || '',
      betCount: betListState.length
    };

    setPlacedBetsState(prevBets => [...prevBets, ...newBets]);
    setBetHistoryState(prevHistory => [...prevHistory, ...newBets]);
    setLastBetDetailsState(betDetails);

    setBetListState([]);

    setShowBettingModalLocal(false);
    setShowBettingModalState(false);
    setShowBetSuccessState(true);

    console.log('Bet placed successfully, success modal should be visible');

    const timer = setTimeout(() => {
      console.log('Auto navigating to home page');
      setShowBetSuccessState(false);
      setActiveTabLocal('home');
      setActiveTabState('home');
    }, 7000);

    setRedirectTimer(timer);
  };

  const handleBetPlace = (amount: number) => {
    const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));

    if (currentWallet >= amount) {
      const newBet = {
        id: Date.now(),
        number: selectedNumberState,
        amount: amount,
        type: currentBetTypeState,
        game: selectedGameState?.title || 'Unknown Game',
        timestamp: new Date(),
        status: 'pending' as const
      };

      setBetListState([...betListState, newBet]);
      setShowAmountModalState(false);
      Alert.alert('Bet Placed!', `आपका ₹${amount} का bet ${selectedNumberState} पर लगा दिया गया है।`);
    } else {
      Alert.alert('Insufficient Coins', 'आपके wallet में पर्याप्त coins नहीं हैं।');
    }
  };

  const removeBet = (betId: number) => {
    const bet = betListState.find(b => b.id === betId);
    if (bet) {
      const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));
      setBetListState(betListState.filter(b => b.id !== betId));
    }
  };

  const handleAuthPress = (mode: string) => {
    setAuthModeState(mode);
    setShowAuthModalState(true);
  };

  const handleAuthSuccess = (userData: any) => {
    if (!userData || !userData.phone) {
      Alert.alert('Error', 'Invalid user data received');
      return;
    }

    console.log('Auth success with user data:', userData);

    setUserDataState(userData);
    setIsAuthenticatedState(true);
    setShowAuthRequired(false);
    setShowAuthModalState(false);

    setActiveTabLocal('home');
    setActiveTabState('home');
    setCurrentViewState('home');

    setTimeout(() => {
      if (userData.isNewUser) {
        Alert.alert(
          '🎉 Welcome!',
          `${userData.name}, आपका account successfully create हो गया है!\n\n🎁 Welcome bonus मिल गया है!\n🎮 अब सभी games खेल सकते हैं!`,
          [{ text: '✨ शुरू करें', style: 'default' }]
        );
      } else {
        Alert.alert(
          '✅ Login Successful',
          `Welcome back, ${userData.name}!\n\n🎮 अब आप home page पर हैं और सभी features access कर सकते हैं!`,
          [{ text: '🚀 Continue', style: 'default' }]
        );
      }
    }, 300);

    console.log('Authentication completed - redirected to home page');
  };

  const handleLogin = async () => {
    Alert.alert('Login', 'Login functionality to be implemented');
    setShowAuthModalState(false);
  };

  const handleRegister = async () => {
    Alert.alert('Register', 'Registration functionality to be implemented');
    setShowAuthModalState(false);
  };

  const checkAuthentication = () => {
    return (isAuthenticated && user && user.id) || (isAuthenticatedState && userDataState && userDataState.phone);
  };

  const handleAddCash = async (amount: number) => {
    setShowAddCashModalState(false);
    setDepositAmountState('');
    Alert.alert('Deposit Successful', `₹${amount} has been added to your wallet. Admin approval pending.`);
  };

  const handleWithdraw = async (amount: number) => {
    setShowWithdrawModalState(false);
    setShowWithdrawSuccessModalState(true);

    const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));
    if (currentWallet >= amount) {
      // API call placeholder
    }
  };

  const handleWithdrawSuccessClose = () => {
    setShowWithdrawSuccessModalState(false);
    setWithdrawAmountState('');
    setActiveTabLocal('wallet');
  };

  const calculateDepositDetails = (amount: number) => {
    const gst = Math.round(amount * 0.28);
    const cashback = amount >= 2000 ? Math.round(amount * 0.05) : 0;
    const total = amount + gst;
    return { gst, cashback, total };
  };

  const handlePaymentMethodSelectState = (method: string) => {
    setSelectedPaymentMethodState(method);
    setShowAddCashModalState(false);
    setShowPaymentModalState(true);
  };

  const handleUTRConfirmationState = () => {
    if (utrNumberState.length !== 12) {
      Alert.alert('Invalid UTR', 'Please enter a valid 12-digit UTR number');
      return;
    }

    setShowPaymentModalState(false);
    setShowPaymentSuccessModalState(true);
  };

  const handlePaymentSuccessClose = () => {
    setShowPaymentSuccessModalState(false);
    setActiveTabLocal('home');
    setUtrNumberState('');
    setDepositAmountState('');
    setSelectedPaymentMethodState('');
    setShowAddCashModalState(false);
  };

  const handleUpdateProfile = async (profileData: any) => {
    try {
      setUserDataState(profileData);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleCompleteKYC = () => {
    Alert.alert('KYC Verification', 'KYC verification process will be implemented soon');
  };

  const handleKYCPressState = () => {
    setShowKYCPageState(true);
  };

  const handleAgeVerificationAcceptState = async () => {
    setIsAgeVerifiedState(true);
    setShowAgeVerificationState(false);
  };

  const handleAgeVerificationReject = () => {
    Alert.alert(
      'Access Denied',
      'आप इस app का उपयोग नहीं कर सकते। यह केवल 18+ उम्र के लोगों के लिए है।',
      [
        {
          text: 'Exit App',
          onPress: () => {
            // Close app functionality
          }
        }
      ]
    );
  };

  const handleViewResults = () => {
    setShowResultsModal(true);
  };

  const renderContent = () => {
    switch (activeTabLocal) {
      case 'home':
        return (
          <HomeScreen
            gameCards={gameCards}
            features={features}
            onPlayNow={handlePlayNow}
            isAuthenticated={true}
            user={userDataState || user}
            onViewResults={handleViewResults}
            onNavigate={(screen) => {
              setActiveTabLocal(screen);
              setActiveTabState(screen);
            }}
          />
        );
      case 'game-history':
        return <GameHistory betHistory={betHistoryState} />;
      case 'wallet':
        return (
          <View style={styles.walletContainer}>
            <View style={styles.mainBalanceCard}>
              <Text style={styles.walletTitle}>💰 My Wallet</Text>
              <Text style={styles.mainBalanceAmount}>{wallet}</Text>
              <Text style={styles.balanceSubtitle}>Total Available Balance</Text>
            </View>

            <View style={styles.quickActionsRow}>
              <TouchableOpacity
                style={styles.actionButtonAdd}
                onPress={() => setShowAddCashModalState(true)}
              >
                <Text style={styles.actionButtonIcon}>➕</Text>
                <Text style={[styles.actionButtonText, { color: '#000' }]}>Add Money</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButtonWithdraw}
                onPress={() => setShowWithdrawModalState(true)}
              >
                <Text style={styles.actionButtonIcon}>💳</Text>
                <Text style={[styles.actionButtonText, { color: '#4A90E2' }]}>Withdraw</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.balanceBreakdownSimple}>
              <View style={styles.breakdownItem}>
                <View style={styles.breakdownLeft}>
                  <Text style={styles.breakdownIcon}>🏆</Text>
                  <View>
                    <Text style={styles.breakdownTitle}>Winnings</Text>
                    <Text style={styles.breakdownSubtitle}>Withdrawable</Text>
                  </View>
                </View>
                <Text style={styles.breakdownAmount}>₹1,250</Text>
              </View>

              <View style={styles.breakdownItem}>
                <View style={styles.breakdownLeft}>
                  <Text style={styles.breakdownIcon}>🎁</Text>
                  <View>
                    <Text style={styles.breakdownTitle}>Bonus</Text>
                    <Text style={styles.breakdownSubtitle}>Game only</Text>
                  </View>
                </View>
                <Text style={styles.breakdownAmountBonus}>₹500</Text>
              </View>
            </View>

            <View style={styles.quickStatsCard}>
              <Text style={styles.quickStatsTitle}>📊 Quick Stats</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>15</Text>
                  <Text style={styles.statLabel}>Total Bets</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>8</Text>
                  <Text style={styles.statLabel}>Wins</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹2.8K</Text>
                  <Text style={styles.statLabel}>Total Won</Text>
                </View>
              </View>
            </View>
          </View>
        );
      case 'mybets':
      case 'history':
      case 'bets':
        return <MyBet placedBets={placedBetsState} />;
      case 'transactions':
        return <Transaction />;
      case 'refer':
        return <ReferPage userData={userDataState} />;
      case 'terms':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>📋 Terms & Conditions</Text>
            <ScrollView style={styles.policyContainer} showsVerticalScrollIndicator={false}>
              <Text style={styles.policySection}>🔞 Age Requirement</Text>
              <Text style={styles.policyText}>• You must be 18+ years old to use this app</Text>
              <Text style={styles.policyText}>• Age verification may be required</Text>

              <Text style={styles.policySection}>💰 Betting Rules</Text>
              <Text style={styles.policyText}>• Minimum bet amount is ₹10</Text>
              <Text style={styles.policyText}>• Maximum daily bet limit applies</Text>
              <Text style={styles.policyText}>• All bets are final once placed</Text>
              <Text style={styles.policyText}>• Results are declared as per official timing</Text>

              <Text style={styles.policySection}>💳 Payment Terms</Text>
              <Text style={styles.policyText}>• Deposits are processed instantly</Text>
              <Text style={styles.policyText}>• Withdrawals take 5-30 minutes</Text>
              <Text style={styles.policyText}>• GST charges apply on deposits</Text>
              <Text style={styles.policyText}>• TDS deducted as per government rules</Text>

              <Text style={styles.policySection}>⚠️ Responsible Gaming</Text>
              <Text style={styles.policyText}>• Set betting limits for yourself</Text>
              <Text style={styles.policyText}>• Never bet more than you can afford</Text>
              <Text style={styles.policyText}>• Seek help if gambling becomes a problem</Text>

              <Text style={styles.policySection}>🚫 Prohibited Activities</Text>
              <Text style={styles.policyText}>• Creating multiple accounts</Text>
              <Text style={styles.policyText}>• Using automated betting systems</Text>
              <Text style={styles.policyText}>• Attempting to manipulate results</Text>
            </ScrollView>
          </View>
        );
      case 'privacy':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>🛡️ Privacy Policy</Text>
            <ScrollView style={styles.policyContainer} showsVerticalScrollIndicator={false}>
              <Text style={styles.policySection}>📋 Information We Collect</Text>
              <Text style={styles.policyText}>• Personal information (name, phone, email)</Text>
              <Text style={styles.policyText}>• Transaction history and betting records</Text>
              <Text style={styles.policyText}>• Device information and app usage data</Text>

              <Text style={styles.policySection}>🔒 How We Use Your Information</Text>
              <Text style={styles.policyText}>• To provide gaming services</Text>
              <Text style={styles.policyText}>• To process deposits and withdrawals</Text>
              <Text style={styles.policyText}>• To ensure account security</Text>
              <Text style={styles.policyText}>• To comply with legal requirements</Text>

              <Text style={styles.policySection}>🛡️ Data Protection</Text>
              <Text style={styles.policyText}>• We use industry-standard encryption</Text>
              <Text style={styles.policyText}>• Your data is stored securely</Text>
              <Text style={styles.policyText}>• We never share personal data with third parties</Text>

              <Text style={styles.policySection}>📞 Contact Us</Text>
              <Text style={styles.policyText}>For privacy concerns, contact our support team.</Text>
            </ScrollView>
          </View>
        );
      case 'refund':
        return (
          <ScrollView style={styles.refundContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.tabTitle}>💳 Refund Policy</Text>
            <Text style={styles.pageSubtitle}>हमारी refund policy के नियम और शर्तें</Text>

            <View style={styles.noticeContainer}>
              <Text style={styles.noticeIcon}>⚠️</Text>
              <View style={styles.noticeContent}>
                <Text style={styles.noticeTitle}>महत्वपूर्ण सूचना</Text>
                <Text style={styles.noticeText}>
                  यह एक gaming platform है। सभी bets और deposits के लिए विशेष नियम लागू होते हैं।
                </Text>
              </View>
            </View>

            <View style={styles.policyContainer}>
              <Text style={styles.policySection}>📋 Deposit Refund Policy</Text>
              <Text style={styles.policyText}>• Deposit के तुरंत बाद refund नहीं किया जा सकता</Text>
              <Text style={styles.policyText}>• Technical error के case में 24 घंटे के अंदर refund</Text>
              <Text style={styles.policyText}>• Duplicate payment के case में automatic refund</Text>
              <Text style={styles.policyText}>• Wrong payment के case में 2-3 working days में refund</Text>
              <Text style={styles.policyText}>• GST charges refund नहीं किए जाएंगे</Text>

              <Text style={styles.policySection}>🎮 Game Bet Refund Policy</Text>
              <Text style={styles.policyText}>• एक बार bet place होने के बाद cancel नहीं हो सकता</Text>
              <Text style={styles.policyText}>• Result declare होने के बाद कोई refund नहीं</Text>
              <Text style={styles.policyText}>• Technical issue के case में admin द्वारा review</Text>
              <Text style={styles.policyText}>• Wrong number selection की जिम्मेदारी user की है</Text>
              <Text style={styles.policyText}>• Game close होने के बाद bet cancel नहीं हो सकता</Text>
            </View>

            <View style={styles.contactContainer}>
              <Text style={styles.contactTitle}>🆘 Refund के लिए Help चाहिए?</Text>
              <Text style={styles.contactText}>
                Refund के लिए हमारी customer support team से संपर्क करें। हमारी team 24x7 आपकी सेवा में है।
              </Text>

              <View style={styles.contactButtons}>
                <TouchableOpacity style={styles.whatsappButton}>
                  <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
                  <Text style={styles.contactButtonText}>WhatsApp Support</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.telegramButton}>
                  <Ionicons name="paper-plane" size={20} color="#0088CC" />
                  <Text style={styles.contactButtonText}>Telegram Support</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      case 'games':
        return (
          <Games
            gameCards={gameCards}
            onGameSelect={handleGameSelect}
          />
        );
      case 'profile':
        return (
          <Profile
            userData={userDataState}
            onUpdateProfile={handleUpdateProfile}
            onCompleteKYC={handleCompleteKYC}
          />
        );
      case 'results':
        return <ResultsModal visible={true} onClose={() => setActiveTabLocal('home')} />;
      case 'help':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>🆘 Help & Support</Text>
            <ScrollView style={styles.helpContainer} showsVerticalScrollIndicator={false}>
              <Text style={styles.helpWelcome}>हमारी सपोर्ट टीम 24x7 आपकी सेवा में है!</Text>

              <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>📱 Contact Us</Text>

                <TouchableOpacity style={styles.contactButton} onPress={() => {
                  Alert.alert('WhatsApp Support', 'WhatsApp पर संपर्क करने के लिए +91 98765 43210 पर मैसेज करें।');
                }}>
                  <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactMethod}>WhatsApp Support</Text>
                    <Text style={styles.contactDetails}>+91 98765 43210</Text>
                    <Text style={styles.contactTiming}>24x7 Available</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactButton} onPress={() => {
                  Alert.alert('Telegram Support', 'Telegram पर @SattaKingSupport से संपर्क करें।');
                }}>
                  <Ionicons name="paper-plane" size={24} color="#0088CC" />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactMethod}>Telegram Support</Text>
                    <Text style={styles.contactDetails}>@SattaKingSupport</Text>
                    <Text style={styles.contactTiming}>Instant Response</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.faqSection}>
                <Text style={styles.faqTitle}>❓ Frequently Asked Questions</Text>

                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Q: How to deposit money?</Text>
                  <Text style={styles.faqAnswer}>A: Go to Wallet → Add Cash → Select UPI method → Enter amount → Pay through UPI app</Text>
                </View>

                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Q: How long does withdrawal take?</Text>
                  <Text style={styles.faqAnswer}>A: Withdrawals are processed within 5-30 minutes to your bank account.</Text>
                </View>

                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Q: What is minimum bet amount?</Text>
                  <Text style={styles.faqAnswer}>A: Minimum bet amount is ₹10 for all games.</Text>
                </View>

                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Q: When are results declared?</Text>
                  <Text style={styles.faqAnswer}>A: Results are declared as per official timing shown on each game card.</Text>
                </View>

                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Q: Is my money safe?</Text>
                  <Text style={styles.faqAnswer}>A: Yes, all transactions are secured with bank-level encryption.</Text>
                </View>
              </View>

              <View style={styles.quickActions}>
                <Text style={styles.quickActionsTitle}>⚡ Quick Actions</Text>
                <TouchableOpacity style={styles.quickActionButton} onPress={() => setActiveTabLocal('transactions')}>
                  <Ionicons name="receipt" size={20} color="#4A90E2" />
                  <Text style={styles.quickActionText}>Check Transaction History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton} onPress={() => setActiveTabLocal('mybets')}>
                  <Ionicons name="list" size={20} color="#4A90E2" />
                  <Text style={styles.quickActionText}>View My Bets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickActionButton} onPress={() => setActiveTabLocal('wallet')}>
                  <Ionicons name="wallet" size={20} color="#4A90E2" />
                  <Text style={styles.quickActionText}>Check Wallet Balance</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        );
      default:
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>🚧 Coming Soon</Text>
            <Text style={styles.comingSoonText}>यह फीचर जल्द हीआएगा</Text>
          </View>
        );
    }
  };

  const handleHeaderMenuItemPress = (key: string) => {
    console.log('Header menu item pressed:', key);

    if (key === 'transactions') {
      setActiveTabLocal('transactions');
    } else if (key === 'history') {
      setActiveTabLocal('game-history');
    } else if (key === 'refer') {
      setActiveTabLocal('refer');
    } else if (key === 'terms') {
      setActiveTabLocal('terms');
    } else if (key === 'privacy') {
      setActiveTabLocal('privacy');
    } else if (key === 'refund') {
      setActiveTabLocal('refund');
    } else if (key === 'help') {
      setActiveTabLocal('help');
    } else if (key === 'logout') {
      logout();
      setShowAuthRequired(false);
      setActiveTabLocal('home');
      setActiveTabState('home');
      Alert.alert('✅ Logout Successful', 'आप successfully logout हो गए हैं। अब आप फिर से login कर सकते हैं।');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <Header 
        wallet={wallet} 
        onMenuItemPress={handleHeaderMenuItemPress}
        isAuthenticated={isAuthenticated}
        user={user}
      />

      <View style={[styles.content, !isAgeVerifiedState && styles.blurredContent]}>
        {showKYCPageState ? (
          <KYCPage onBack={() => setShowKYCPageState(false)} />
        ) : (
          renderContent()
        )}
      </View>

      <BottomMenu
        activeTab={activeTabLocal}
        onMenuItemPress={handleMenuItemPress}
      />

      {!isAgeVerifiedState && !showAgeVerificationState && (
        <View style={styles.verificationOverlay}>
          <Text style={styles.overlayText}>Age verification required</Text>
        </View>
      )}

      <BettingModal
        visible={showBettingModalState}
        selectedGame={selectedGameState}
        currentBetType={currentBetTypeState}
        betList={betListState}
        onClose={() => setShowBettingModalState(false)}
        onBetTypeChange={setCurrentBetTypeState}
        onNumberSelect={handleNumberSelect}
        onRemoveBet={removeBet}
        onPlaceBets={handlePlaceBets}
      />

      <Modal
        visible={showAmountModalState}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAmountModalState(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.amountModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Bet Amount - {selectedNumberState}
              </Text>
              <TouchableOpacity onPress={() => setShowAmountModalState(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.amountContent}>
              <View style={styles.betPreview}>
                <Text style={styles.betPreviewText}>
                  🎯 {selectedNumberState} ({currentBetTypeState})
                </Text>
                <Text style={styles.betPreviewGame}>
                  Game: {selectedGameState?.title}
                </Text>
              </View>

              <Text style={styles.amountLabel}>Quick Select:</Text>
              <View style={styles.amountButtonsGrid}>
                {[10, 50, 200, 300, 500, 1000].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.amountButton}
                    onPress={() => handleBetPlace(amount)}
                  >
                    <Text style={styles.amountButtonText}>₹{amount}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.amountLabel}>Custom Amount (Min ₹10):</Text>
              <TextInput
                style={styles.customAmountInput}
                placeholder="Enter amount"
                placeholderTextColor="#999"
                value={customAmountState}
                onChangeText={setCustomAmountState}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.customAmountButton}
                onPress={() => {
                  const amount = parseFloat(customAmountState);
                  if (amount >= 10) {
                    handleBetPlace(amount);
                    setCustomAmountState('');
                  } else {
                    Alert.alert('Invalid Amount', 'Minimum bet amount is ₹10');
                  }
                }}
              >
                <Text style={styles.customAmountButtonText}>Place Custom Bet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AuthScreen 
        visible={showAuthModalState}
        onAuthSuccess={handleAuthSuccess}
        onClose={() => {
          setShowAuthModalState(false);
          setShowAuthRequired(false);
        }}
      />

      <WalletOperations
        showAddCashModal={showAddCashModalState}
        showWithdrawModal={showWithdrawModalState}
        showPaymentModal={showPaymentModalState}
        depositAmount={depositAmountState}
        withdrawAmount={withdrawAmountState}
        selectedPaymentMethod={selectedPaymentMethodState}
        utrNumber={utrNumberState}
        onCloseAddCash={() => setShowAddCashModalState(false)}
        onCloseWithdraw={() => setShowWithdrawModalState(false)}
        onClosePayment={() => setShowPaymentModalState(false)}
        onDepositAmountChange={setDepositAmountState}
        onWithdrawAmountChange={setWithdrawAmountState}
        onPaymentMethodSelect={handlePaymentMethodSelectState}
        onUtrChange={setUtrNumberState}
        onConfirmPayment={handleUTRConfirmationState}
        onWithdrawRequest={handleWithdraw}
      />

      <PaymentSuccess
        visible={showPaymentSuccessModalState}
        amount={depositAmountState && calculateDepositDetails(parseFloat(depositAmountState)).total.toString()}
        utrNumber={utrNumberState}
        paymentMethod={selectedPaymentMethodState}
        onClose={handlePaymentSuccessClose}
      />

      <WithdrawSuccess
        visible={showWithdrawSuccessModalState}
        amount={withdrawAmountState}
        paymentMethod={selectedPaymentMethodState || 'Selected UPI'}
        onClose={handleWithdrawSuccessClose}
        onNavigateToMyBets={() => {
          setShowBetSuccessState(false);
          setActiveTabLocal('mybets');
          setActiveTabState('mybets');
        }}
      />

      <AgeVerificationModal
        visible={showAgeVerificationState}
        onAccept={handleAgeVerificationAcceptState}
        onReject={handleAgeVerificationReject}
      />

      <BetSuccessModal
        visible={showBetSuccessState}
        betDetails={lastBetDetailsState}
        onClose={() => {
          setShowBetSuccessState(false);
          setActiveTabLocal('home');
          setActiveTabState('home');
          if (redirectTimer) {
            clearTimeout(redirectTimer);
            setRedirectTimer(null);
          }
        }}
      />

      <ResultsModal
        visible={showResultsModal}
        onClose={() => setShowResultsModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
  },
  blurredContent: {
    opacity: 0.3,
  },
  tabContent: {
    flex: 1,
    padding: getResponsiveSize(10, 15, 20),
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: getResponsiveSize(18, 20, 24),
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: getResponsiveSize(15, 18, 20),
    textAlign: 'center',
  },
  walletContainer: {
    flex: 1,
    padding: getResponsiveSize(10, 15, 20),
  },
  mainBalanceCard: {
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(15, 20, 25),
    borderRadius: getResponsiveSize(10, 12, 15),
    alignItems: 'center',
    marginBottom: getResponsiveSize(15, 18, 20),
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  walletTitle: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(14, 16, 18),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainBalanceAmount: {
    color: '#00FF88',
    fontSize: getResponsiveSize(24, 28, 32),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceSubtitle: {
    color: '#999',
    fontSize: getResponsiveSize(11, 12, 14),
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: getResponsiveSize(8, 12, 15),
    marginBottom: getResponsiveSize(15, 18, 20),
  },
  actionButtonAdd: {
    flex: 1,
    backgroundColor: '#00FF88',
    padding: getResponsiveSize(12, 14, 15),
    borderRadius: getResponsiveSize(8, 10, 12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: getResponsiveSize(6, 7, 8),
    minHeight: getResponsiveSize(44, 48, 50),
  },
  actionButtonWithdraw: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(12, 14, 15),
    borderRadius: getResponsiveSize(8, 10, 12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: getResponsiveSize(6, 7, 8),
    borderWidth: 1,
    borderColor: '#4A90E2',
    minHeight: getResponsiveSize(44, 48, 50),
  },
  actionButtonIcon: {
    fontSize: getResponsiveSize(16, 17, 18),
  },
  actionButtonText: {
    fontSize: getResponsiveSize(12, 13, 14),
    fontWeight: 'bold',
  },
  balanceBreakdownSimple: {
    backgroundColor: '#1a1a1a',
    borderRadius: getResponsiveSize(10, 11, 12),
    padding: getResponsiveSize(12, 14, 15),
    marginBottom: getResponsiveSize(18, 19, 20),
    borderWidth: 1,
    borderColor: '#333',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getResponsiveSize(10, 11, 12),
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getResponsiveSize(10, 11, 12),
  },
  breakdownIcon: {
    fontSize: getResponsiveSize(18, 19, 20),
  },
  breakdownTitle: {
    color: '#fff',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
  },
  breakdownSubtitle: {
    color: '#999',
    fontSize: getResponsiveSize(10, 11, 12),
  },
  breakdownAmount: {
    color: '#00FF88',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
  },
  breakdownAmountBonus: {
    color: '#FFD700',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
  },
  quickStatsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: getResponsiveSize(10, 11, 12),
    padding: getResponsiveSize(12, 14, 15),
    borderWidth: 1,
    borderColor: '#333',
  },
  quickStatsTitle: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginBottom: getResponsiveSize(12, 14, 15),
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#00FF88',
    fontSize: getResponsiveSize(16, 17, 18),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#999',
    fontSize: getResponsiveSize(10, 11, 12),
    textAlign: 'center',
  },
  comingSoonText: {
    color: '#999',
    fontSize: getResponsiveSize(14, 15, 16),
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getResponsiveSize(10, 15, 20),
  },
  amountModal: {
    backgroundColor: '#0a0a0a',
    width: '95%',
    maxWidth: 500,
    borderRadius: getResponsiveSize(10, 12, 15),
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: getResponsiveSize(15, 18, 20),
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: getResponsiveSize(16, 17, 18),
    fontWeight: 'bold',
    color: '#4A90E2',
    flex: 1,
  },
  amountContent: {
    padding: getResponsiveSize(15, 18, 20),
  },
  betPreview: {
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(12, 14, 15),
    borderRadius: getResponsiveSize(8, 9, 10),
    marginBottom: getResponsiveSize(15, 18, 20),
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  betPreviewText: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  betPreviewGame: {
    color: '#999',
    fontSize: getResponsiveSize(10, 11, 12),
  },
  amountLabel: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(12, 13, 14),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amountButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: getResponsiveSize(15, 18, 20),
  },
  amountButton: {
    width: '31%',
    backgroundColor: '#1a1a1a',
    paddingVertical: getResponsiveSize(10, 11, 12),
    borderRadius: getResponsiveSize(6, 7, 8),
    alignItems: 'center',
    marginBottom: getResponsiveSize(6, 7, 8),
    borderWidth: 1,
    borderColor: '#00FF88',
    minHeight: getResponsiveSize(35, 38, 40),
  },
  amountButtonText: {
    color: '#00FF88',
    fontSize: getResponsiveSize(12, 13, 14),
    fontWeight: 'bold',
  },
  customAmountInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: getResponsiveSize(6, 7, 8),
    paddingHorizontal: getResponsiveSize(12, 14, 15),
    paddingVertical: getResponsiveSize(10, 11, 12),
    color: '#fff',
    fontSize: getResponsiveSize(14, 15, 16),
    marginBottom: getResponsiveSize(12, 14, 15),
    minHeight: getResponsiveSize(40, 42, 45),
  },
  customAmountButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: getResponsiveSize(12, 14, 15),
    borderRadius: getResponsiveSize(6, 7, 8),
    alignItems: 'center',
    minHeight: getResponsiveSize(40, 42, 45),
  },
  customAmountButtonText: {
    color: '#000',
    fontSize: getResponsiveSize(12, 13, 14),
    fontWeight: 'bold',
  },
  // Policy & Terms Styles
  policyContainer: {
    width: '100%',
    paddingHorizontal: getResponsiveSize(8, 10, 12),
  },
  policySection: {
    color: '#FFD700',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginTop: getResponsiveSize(18, 19, 20),
    marginBottom: getResponsiveSize(8, 9, 10),
  },
  policyText: {
    color: '#fff',
    fontSize: getResponsiveSize(12, 13, 14),
    marginBottom: getResponsiveSize(6, 7, 8),
    lineHeight: getResponsiveSize(18, 19, 20),
    paddingLeft: getResponsiveSize(8, 9, 10),
  },
  // Help & Support Styles
  helpContainer: {
    width: '100%',
    paddingHorizontal: getResponsiveSize(8, 10, 12),
  },
  helpWelcome: {
    color: '#00FF88',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: getResponsiveSize(18, 19, 20),
  },
  contactSection: {
    marginBottom: getResponsiveSize(22, 24, 25),
  },
  contactTitle: {
    color: '#FFD700',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginBottom: getResponsiveSize(12, 14, 15),
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(12, 14, 15),
    borderRadius: getResponsiveSize(10, 11, 12),
    marginBottom: getResponsiveSize(10, 11, 12),
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  contactInfo: {
    marginLeft: getResponsiveSize(12, 14, 15),
    flex: 1,
  },
  contactMethod: {
    color: '#fff',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginBottom: 2,
  },
  contactDetails: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(12, 13, 14),
    marginBottom: 2,
  },
  contactTiming: {
    color: '#00FF88',
    fontSize: getResponsiveSize(10, 11, 12),
  },
  faqSection: {
    marginBottom: getResponsiveSize(22, 24, 25),
  },
  faqTitle: {
    color: '#FFD700',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginBottom: getResponsiveSize(12, 14, 15),
  },
  faqItem: {
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(12, 14, 15),
    borderRadius: getResponsiveSize(8, 9, 10),
    marginBottom: getResponsiveSize(8, 9, 10),
    borderWidth: 1,
    borderColor: '#333',
  },
  faqQuestion: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(12, 13, 14),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  faqAnswer: {
    color: '#fff',
    fontSize: getResponsiveSize(11, 12, 13),
    lineHeight: getResponsiveSize(16, 17, 18),
  },
  quickActions: {
    marginBottom: getResponsiveSize(18, 19, 20),
  },
  quickActionsTitle: {
    color: '#FFD700',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginBottom: getResponsiveSize(12, 14, 15),
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(10, 11, 12),
    borderRadius: getResponsiveSize(8, 9, 10),
    marginBottom: getResponsiveSize(6, 7, 8),
    borderWidth: 1,
    borderColor: '#333',
  },
  quickActionText: {
    color: '#fff',
    fontSize: getResponsiveSize(12, 13, 14),
    marginLeft: getResponsiveSize(8, 9, 10),
  },
  verificationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: getResponsiveSize(18, 19, 20),
    color: 'white',
    fontWeight: 'bold',
  },
  // Refund Policy Styles
  refundContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: getResponsiveSize(12, 15, 20),
  },
  pageSubtitle: {
    fontSize: getResponsiveSize(12, 14, 16),
    color: '#999',
    textAlign: 'center',
    marginBottom: getResponsiveSize(22, 24, 25),
  },
  noticeContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a1a00',
    padding: getResponsiveSize(12, 14, 15),
    borderRadius: getResponsiveSize(8, 9, 10),
    marginBottom: getResponsiveSize(22, 24, 25),
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  noticeIcon: {
    fontSize: getResponsiveSize(20, 22, 24),
    marginRight: getResponsiveSize(12, 14, 15),
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    color: '#FFD700',
    fontSize: getResponsiveSize(14, 15, 16),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noticeText: {
    color: '#fff',
    fontSize: getResponsiveSize(12, 13, 14),
    lineHeight: getResponsiveSize(18, 19, 20),
  },
  contactContainer: {
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(18, 19, 20),
    borderRadius: getResponsiveSize(12, 14, 15),
    marginBottom: getResponsiveSize(22, 24, 25),
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  contactText: {
    color: '#fff',
    fontSize: getResponsiveSize(12, 13, 14),
    textAlign: 'center',
    lineHeight: getResponsiveSize(18, 19, 20),
    marginBottom: getResponsiveSize(18, 19, 20),
  },
  contactButtons: {
    gap: getResponsiveSize(8, 9, 10),
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    padding: getResponsiveSize(10, 11, 12),
    borderRadius: getResponsiveSize(6, 7, 8),
  },
  telegramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0088CC',
    padding: getResponsiveSize(10, 11, 12),
    borderRadius: getResponsiveSize(6, 7, 8),
  },
  contactButtonText: {
    color: '#fff',
    fontSize: getResponsiveSize(12, 13, 14),
    fontWeight: 'bold',
    marginLeft: getResponsiveSize(6, 7, 8),
  },
});