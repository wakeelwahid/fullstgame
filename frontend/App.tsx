
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Modal, TextInput, Alert, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
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
import AgeVerificationModal from './components/AgeVerificationModal';
import Transaction from './components/Transaction';
import KYCPage from './components/KYCPage';
import ReferPage from './components/ReferPage';
import ResultsModal from './components/ResultsModal';
import AuthScreen from './components/AuthScreen';

// Import constants
import { GAME_CARDS, FEATURES } from './constants/gameData';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mobile-first responsive design
const isSmallMobile = SCREEN_WIDTH < 360;
const isMediumMobile = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 414;

// Dynamic sizing for mobile screens
const getResponsiveSize = (small: number, medium: number = small * 1.1, large: number = small * 1.2) => {
  if (isSmallMobile) return small;
  if (isMediumMobile) return medium;
  return large;
};

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  // User data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john@example.com',
    referralCode: 'REF12345',
    kycStatus: 'VERIFIED' as 'VERIFIED' | 'PENDING' | 'REJECTED'
  });

  // Wallet state
  const [wallet, setWallet] = useState('₹1,750');
  const [winnings] = useState('₹1,250');
  const [bonus] = useState('₹500');

  // UI state
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);

  // Modal states
  const [showBettingModal, setShowBettingModal] = useState(false);
  const [showBetSuccess, setShowBetSuccess] = useState(false);
  const [showAddCashModal, setShowAddCashModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showWithdrawSuccessModal, setShowWithdrawSuccessModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showKYCPage, setShowKYCPage] = useState(false);

  // Betting state
  const [betList, setBetList] = useState([]);
  const [lastBetDetails, setLastBetDetails] = useState(null);
  const [placedBets, setPlacedBets] = useState([]);
  const [betHistory, setBetHistory] = useState([
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
      game: 'Faridabad',
      number: '6',
      amount: 100,
      type: 'single',
      status: 'win',
      winAmount: 900,
      timestamp: Date.now() - 7200000,
      sessionTime: '10:00 PM - 06:40 PM'
    }
  ]);

  // Payment state
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  const gameCards = GAME_CARDS;
  const features = FEATURES;

  useEffect(() => {
    // Auto start the app without age verification for demo
    setIsAgeVerified(true);
    setIsAuthenticated(true);
  }, []);

  const handleAgeVerificationAccept = () => {
    setIsAgeVerified(true);
    setShowAgeVerification(false);
  };

  const handleAgeVerificationReject = () => {
    Alert.alert(
      'Access Denied',
      'यह app केवल 18+ उम्र के लोगों के लिए है।',
      [{ text: 'OK' }]
    );
  };

  const handleAuthSuccess = (userAuthData: any) => {
    setUserData(userAuthData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setActiveTab('home');

    Alert.alert(
      '✅ Welcome!',
      `${userAuthData.name}, आपका account ready है!\n🎮 अब सभी games खेल सकते हैं!`,
      [{ text: '🚀 Start Playing' }]
    );
  };

  const handlePlayNow = (game: any) => {
    setSelectedGame(game);
    setShowBettingModal(true);
  };

  const handleGameSelect = (game: any) => {
    setSelectedGame(game);
    setBetList([]);
    setShowBettingModal(true);
  };

  const handleNumberSelect = (number: any, type: string, amount: number) => {
    const existingBetIndex = betList.findIndex(b => b.number === number && b.type === type);

    if (existingBetIndex >= 0) {
      const updatedBetList = [...betList];
      updatedBetList[existingBetIndex].amount = amount;
      setBetList(updatedBetList);
    } else {
      const newBet = {
        id: Date.now(),
        number,
        amount,
        type,
        game: selectedGame?.title || '',
        timestamp: new Date(),
      };
      setBetList([...betList, newBet]);
    }
  };

  const handlePlaceBets = () => {
    if (betList.length === 0) {
      Alert.alert('No Bets', 'कोई bet select नहीं किया गया है।');
      return;
    }

    const totalAmount = betList.reduce((total, bet) => total + bet.amount, 0);
    const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));

    if (currentWallet >= totalAmount) {
      const newWalletAmount = currentWallet - totalAmount;
      setWallet(`₹${newWalletAmount.toLocaleString()}`);
    }

    const newBets = betList.map(bet => ({
      ...bet,
      id: Date.now() + Math.random(),
      game: selectedGame?.title || 'Unknown Game',
      status: 'pending' as const,
      timestamp: Date.now(),
      sessionTime: selectedGame?.timing || '09:00 PM - 04:50 PM',
    }));

    const betDetails = {
      number: betList.length > 1 ? `${betList.length} Numbers` : String(betList[0].number),
      amount: totalAmount,
      type: betList.length > 1 ? 'Multiple' : betList[0].type,
      gameName: selectedGame?.title || '',
      betCount: betList.length
    };

    setPlacedBets(prevBets => [...prevBets, ...newBets]);
    setBetHistory(prevHistory => [...prevHistory, ...newBets]);
    setLastBetDetails(betDetails);
    setBetList([]);
    setShowBettingModal(false);
    setShowBetSuccess(true);

    setTimeout(() => {
      setShowBetSuccess(false);
      setActiveTab('home');
    }, 3000);
  };

  const removeBet = (betId: number) => {
    setBetList(betList.filter(b => b.id !== betId));
  };

  const handleMenuItemPress = (key: string) => {
    setActiveTab(key);
  };

  const handleHeaderMenuItemPress = (key: string) => {
    if (key === 'transactions') {
      setActiveTab('transactions');
    } else if (key === 'history') {
      setActiveTab('game-history');
    } else if (key === 'refer') {
      setActiveTab('refer');
    } else if (key === 'help') {
      setActiveTab('help');
    } else if (key === 'logout') {
      setIsAuthenticated(false);
      setActiveTab('home');
      Alert.alert('✅ Logout Successful', 'आप successfully logout हो गए हैं।');
    }
  };

  const handleAddCash = async (amount: number) => {
    setShowAddCashModal(false);
    setDepositAmount('');
    Alert.alert('Deposit Request', `₹${amount} deposit request submitted. Admin approval pending.`);
  };

  const handleWithdraw = async (amount: number) => {
    setShowWithdrawModal(false);
    setShowWithdrawSuccessModal(true);

    const currentWallet = parseFloat(wallet.replace('₹', '').replace(',', ''));
    if (currentWallet >= amount) {
      const newAmount = currentWallet - amount;
      setWallet(`₹${newAmount.toLocaleString()}`);
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowAddCashModal(false);
    setShowPaymentModal(true);
  };

  const handleUTRConfirmation = () => {
    if (utrNumber.length !== 12) {
      Alert.alert('Invalid UTR', 'Please enter a valid 12-digit UTR number');
      return;
    }
    setShowPaymentModal(false);
    setShowPaymentSuccessModal(true);
  };

  const handleUpdateProfile = async (profileData: any) => {
    setUserData(profileData);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleViewResults = () => {
    setShowResultsModal(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            gameCards={gameCards}
            features={features}
            onPlayNow={handlePlayNow}
            isAuthenticated={isAuthenticated}
            user={userData}
            onViewResults={handleViewResults}
            onNavigate={(screen) => setActiveTab(screen)}
          />
        );
      case 'games':
        return (
          <Games
            gameCards={gameCards}
            onGameSelect={handleGameSelect}
          />
        );
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
                onPress={() => setShowAddCashModal(true)}
              >
                <Text style={styles.actionButtonIcon}>➕</Text>
                <Text style={[styles.actionButtonText, { color: '#000' }]}>Add Money</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButtonWithdraw}
                onPress={() => setShowWithdrawModal(true)}
              >
                <Text style={styles.actionButtonIcon}>💳</Text>
                <Text style={[styles.actionButtonText, { color: '#4A90E2' }]}>Withdraw</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.balanceBreakdown}>
              <View style={styles.breakdownItem}>
                <View style={styles.breakdownLeft}>
                  <Text style={styles.breakdownIcon}>🏆</Text>
                  <View>
                    <Text style={styles.breakdownTitle}>Winnings</Text>
                    <Text style={styles.breakdownSubtitle}>Withdrawable</Text>
                  </View>
                </View>
                <Text style={styles.breakdownAmount}>{winnings}</Text>
              </View>

              <View style={styles.breakdownItem}>
                <View style={styles.breakdownLeft}>
                  <Text style={styles.breakdownIcon}>🎁</Text>
                  <View>
                    <Text style={styles.breakdownTitle}>Bonus</Text>
                    <Text style={styles.breakdownSubtitle}>Game only</Text>
                  </View>
                </View>
                <Text style={styles.breakdownAmountBonus}>{bonus}</Text>
              </View>
            </View>
          </View>
        );
      case 'mybets':
      case 'history':
        return <MyBet placedBets={placedBets} />;
      case 'transactions':
        return <Transaction />;
      case 'refer':
        return <ReferPage userData={userData} />;
      case 'profile':
        return (
          <Profile
            userData={userData}
            onUpdateProfile={handleUpdateProfile}
            onCompleteKYC={() => setShowKYCPage(true)}
          />
        );
      case 'help':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>🆘 Help & Support</Text>
            <ScrollView style={styles.helpContainer} showsVerticalScrollIndicator={false}>
              <Text style={styles.helpWelcome}>हमारी support team 24x7 आपकी सेवा में है!</Text>

              <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>📱 Contact Us</Text>

                <TouchableOpacity style={styles.contactButton}>
                  <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactMethod}>WhatsApp Support</Text>
                    <Text style={styles.contactDetails}>+91 98765 43210</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        );
      default:
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>🚧 Coming Soon</Text>
            <Text style={styles.comingSoonText}>यह feature जल्दी आएगा</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <Header 
        wallet={wallet} 
        onMenuItemPress={handleHeaderMenuItemPress}
        isAuthenticated={isAuthenticated}
        user={userData}
      />

      <View style={styles.content}>
        {showKYCPage ? (
          <KYCPage onBack={() => setShowKYCPage(false)} />
        ) : (
          renderContent()
        )}
      </View>

      <BottomMenu
        activeTab={activeTab}
        onMenuItemPress={handleMenuItemPress}
      />

      <BettingModal
        visible={showBettingModal}
        selectedGame={selectedGame}
        currentBetType="numbers"
        betList={betList}
        onClose={() => setShowBettingModal(false)}
        onBetTypeChange={() => {}}
        onNumberSelect={handleNumberSelect}
        onRemoveBet={removeBet}
        onPlaceBets={handlePlaceBets}
      />

      <AuthScreen 
        visible={showAuthModal}
        onAuthSuccess={handleAuthSuccess}
        onClose={() => setShowAuthModal(false)}
      />

      <WalletOperations
        showAddCashModal={showAddCashModal}
        showWithdrawModal={showWithdrawModal}
        showPaymentModal={showPaymentModal}
        depositAmount={depositAmount}
        withdrawAmount={withdrawAmount}
        selectedPaymentMethod={selectedPaymentMethod}
        utrNumber={utrNumber}
        onCloseAddCash={() => setShowAddCashModal(false)}
        onCloseWithdraw={() => setShowWithdrawModal(false)}
        onClosePayment={() => setShowPaymentModal(false)}
        onDepositAmountChange={setDepositAmount}
        onWithdrawAmountChange={setWithdrawAmount}
        onPaymentMethodSelect={handlePaymentMethodSelect}
        onUtrChange={setUtrNumber}
        onConfirmPayment={handleUTRConfirmation}
        onWithdrawRequest={handleWithdraw}
      />

      <PaymentSuccess
        visible={showPaymentSuccessModal}
        amount={depositAmount}
        utrNumber={utrNumber}
        paymentMethod={selectedPaymentMethod}
        onClose={() => {
          setShowPaymentSuccessModal(false);
          setActiveTab('home');
        }}
      />

      <WithdrawSuccess
        visible={showWithdrawSuccessModal}
        amount={withdrawAmount}
        paymentMethod={selectedPaymentMethod || 'UPI'}
        onClose={() => {
          setShowWithdrawSuccessModal(false);
          setActiveTab('wallet');
        }}
        onNavigateToMyBets={() => {
          setShowWithdrawSuccessModal(false);
          setActiveTab('mybets');
        }}
      />

      <AgeVerificationModal
        visible={showAgeVerification}
        onAccept={handleAgeVerificationAccept}
        onReject={handleAgeVerificationReject}
      />

      <BetSuccessModal
        visible={showBetSuccess}
        betDetails={lastBetDetails}
        onClose={() => {
          setShowBetSuccess(false);
          setActiveTab('home');
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
  tabContent: {
    flex: 1,
    padding: getResponsiveSize(15),
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: getResponsiveSize(20),
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: getResponsiveSize(20),
    textAlign: 'center',
  },
  walletContainer: {
    flex: 1,
    padding: getResponsiveSize(15),
  },
  mainBalanceCard: {
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(20),
    borderRadius: getResponsiveSize(12),
    alignItems: 'center',
    marginBottom: getResponsiveSize(20),
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  walletTitle: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(16),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainBalanceAmount: {
    color: '#00FF88',
    fontSize: getResponsiveSize(28),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceSubtitle: {
    color: '#999',
    fontSize: getResponsiveSize(12),
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: getResponsiveSize(12),
    marginBottom: getResponsiveSize(20),
  },
  actionButtonAdd: {
    flex: 1,
    backgroundColor: '#00FF88',
    padding: getResponsiveSize(15),
    borderRadius: getResponsiveSize(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: getResponsiveSize(8),
    minHeight: getResponsiveSize(50),
  },
  actionButtonWithdraw: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(15),
    borderRadius: getResponsiveSize(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: getResponsiveSize(8),
    borderWidth: 1,
    borderColor: '#4A90E2',
    minHeight: getResponsiveSize(50),
  },
  actionButtonIcon: {
    fontSize: getResponsiveSize(18),
  },
  actionButtonText: {
    fontSize: getResponsiveSize(14),
    fontWeight: 'bold',
  },
  balanceBreakdown: {
    backgroundColor: '#1a1a1a',
    borderRadius: getResponsiveSize(12),
    padding: getResponsiveSize(15),
    borderWidth: 1,
    borderColor: '#333',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getResponsiveSize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getResponsiveSize(12),
  },
  breakdownIcon: {
    fontSize: getResponsiveSize(20),
  },
  breakdownTitle: {
    color: '#fff',
    fontSize: getResponsiveSize(16),
    fontWeight: 'bold',
  },
  breakdownSubtitle: {
    color: '#999',
    fontSize: getResponsiveSize(12),
  },
  breakdownAmount: {
    color: '#00FF88',
    fontSize: getResponsiveSize(16),
    fontWeight: 'bold',
  },
  breakdownAmountBonus: {
    color: '#FFD700',
    fontSize: getResponsiveSize(16),
    fontWeight: 'bold',
  },
  comingSoonText: {
    color: '#999',
    fontSize: getResponsiveSize(16),
    textAlign: 'center',
    marginTop: 20,
  },
  helpContainer: {
    width: '100%',
    paddingHorizontal: getResponsiveSize(10),
  },
  helpWelcome: {
    color: '#00FF88',
    fontSize: getResponsiveSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: getResponsiveSize(20),
  },
  contactSection: {
    marginBottom: getResponsiveSize(25),
  },
  contactTitle: {
    color: '#FFD700',
    fontSize: getResponsiveSize(16),
    fontWeight: 'bold',
    marginBottom: getResponsiveSize(15),
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: getResponsiveSize(15),
    borderRadius: getResponsiveSize(12),
    marginBottom: getResponsiveSize(12),
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  contactInfo: {
    marginLeft: getResponsiveSize(15),
    flex: 1,
  },
  contactMethod: {
    color: '#fff',
    fontSize: getResponsiveSize(16),
    fontWeight: 'bold',
    marginBottom: 2,
  },
  contactDetails: {
    color: '#4A90E2',
    fontSize: getResponsiveSize(14),
  },
});
