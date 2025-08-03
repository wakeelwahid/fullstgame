import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, TextInput, Alert, TouchableOpacity, Text, ScrollView, Dimensions, Modal } from 'react-native';
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
import KYCPage from './components/KYCPage';
import GameHistory from './components/GameHistory';
import ReferPage from './components/ReferPage';
import ResultsModal from './components/ResultsModal';
import AuthScreen from './components/AuthScreen';

// Import additional components
import TermsConditions from './components/TermsConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import HelpSupport from './components/HelpSupport';
import RefundPolicy from './components/RefundPolicy';
import ResponsiveText from './components/ResponsiveText';


// Import constants
import { GAME_CARDS, FEATURES } from './constants/gameData';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mobile-first responsive design
const isSmallMobile = SCREEN_WIDTH < 360;
const isMediumMobile = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 414;

// Dynamic sizing for mobile screens
const getResponsiveSize = (small: number, medium?: number, large?: number) => {
  const mediumSize = medium || small * 1.1;
  const largeSize = large || small * 1.2;

  if (isSmallMobile) return small;
  if (isMediumMobile) return mediumSize;
  return largeSize;
};

export default function App() {
  // Authentication state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Guest User',
    phone: '',
    email: '',
    referralCode: '',
    kycStatus: 'PENDING' as 'VERIFIED' | 'PENDING' | 'REJECTED'
  });

  // Remove modal states as these will now be tabs

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
  const [nextBetId, setNextBetId] = useState(1);
  const [currentBetType, setCurrentBetType] = useState('numbers');
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

  const handleRemoveBet = (betId: number) => {
    setBetList(betList.filter(b => b.id !== betId));
  };

  const handleMenuItemPress = (key: string) => {
    console.log('Menu item pressed:', key);
    setActiveTab(key);

    if (key === 'home') {
      setCurrentComponent('home');
    } else if (key === 'mybets') {
      setCurrentComponent('mybets');
    } else if (key === 'wallet') {
      setCurrentComponent('wallet');
    } else if (key === 'games') {
      setCurrentComponent('games');
    } else if (key === 'profile') {
      setCurrentComponent('profile');
    } else if (key === 'gamehistory') {
      setShowGameHistory(true);
    }
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
    } else if (key === 'terms') {
      setActiveTab('terms');
    } else if (key === 'privacy') {
      setActiveTab('privacy');
    } else if (key === 'refund') {
      setActiveTab('refund');
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
      case 'terms':
        return <TermsConditions onBack={() => setActiveTab('home')} />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => setActiveTab('home')} />;
      case 'refund':
        return <RefundPolicy onBack={() => setActiveTab('home')} />;
      case 'help':
        return <HelpSupport onBack={() => setActiveTab('home')} />;
      case 'profile':
        return (
          <Profile
            userData={userData}
            onUpdateProfile={handleUpdateProfile}
            onCompleteKYC={() => setShowKYCPage(true)}
          />
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

  useEffect(() => {
    // Show age verification modal on app start if not verified
    if (!isAgeVerified) {
      setShowAgeVerification(true);
    }

    // Show auth modal if not authenticated
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, isAgeVerified]);

  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [showReferPage, setShowReferPage] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsConditions, setShowTermsConditions] = useState(false);
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  const [showGameHistory, setShowGameHistory] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <Header 
        wallet={wallet} 
        onMenuItemPress={handleHeaderMenuItemPress}
        isAuthenticated={isAuthenticated}
        user={userData}
        onLogout={() => {
          // localStorage.clear(); // localStorage is not available in React Native
          setIsAuthenticated(false);
          setUserData({
            name: 'Guest User',
            phone: '',
            email: '',
            referralCode: '',
            kycStatus: 'PENDING' as 'VERIFIED' | 'PENDING' | 'REJECTED'
          });
          setShowAuthModal(true);
        }}
      />

      <View style={styles.content}>
        {showKYCPage ? (
          <KYCPage onBack={() => setShowKYCPage(false)} />
        ) : (
          renderContent()
        )}

        {showGameHistory && (
          <Modal
            visible={showGameHistory}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={() => setShowGameHistory(false)}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: 15,
                  backgroundColor: '#1a1a1a',
                  borderBottomWidth: 1,
                  borderBottomColor: '#333'
                }}>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    color: '#4A90E2' 
                  }}>
                    🎮 Game History
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowGameHistory(false)}
                    style={{ 
                      padding: 8,
                      backgroundColor: '#333',
                      borderRadius: 20
                    }}
                  >
                    <Ionicons name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>

                {/* GameHistory Component */}
                <GameHistory betHistory={betHistory} />
              </View>
            </SafeAreaView>
          </Modal>
        )}
      </View>

      <BottomMenu
        activeTab={activeTab}
        onMenuItemPress={handleMenuItemPress}
      />

      <BettingModal
          visible={showBettingModal}
          selectedGame={selectedGame}
          currentBetType={currentBetType}
          betList={betList}
          onClose={() => {
            setShowBettingModal(false);
            setCurrentBetType('numbers');
          }}
          onBetTypeChange={setCurrentBetType}
          onNumberSelect={handleNumberSelect}
          onRemoveBet={handleRemoveBet}
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

});