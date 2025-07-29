import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameCard from './GameCard';
import AuthStatus from './AuthStatus';
import GameRulesModal from './GameRulesModal';
import { Dimensions } from 'react-native';

interface HomeScreenProps {
  gameCards: any[];
  features: any[];
  onPlayNow: (game: any) => void;
  isAuthenticated?: boolean;
  user?: any;
  onViewResults?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function HomeScreen({ gameCards, features, onPlayNow, isAuthenticated, user, onViewResults, onNavigate }: HomeScreenProps) {
  const [showGameRules, setShowGameRules] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date());
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const indianTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(new Date());
      setCurrentTime(indianTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Promotional Banner */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
        <View style={styles.promoCard}>
          <Text style={styles.promoText}>🎊 आज का जैकपॉट: ₹25,00,000</Text>
        </View>
        <View style={styles.promoCard}>
          <Text style={styles.promoText}>🎮 नया गेम लॉन्च: डायमंड किंग</Text>
        </View>
        <View style={styles.promoCard}>
          <Text style={styles.promoText}>🎁 विशेष ऑफर: पहली डिपॉजिट पर 100% बोनस</Text>
        </View>
      </ScrollView>

      {/* Enhanced Colorful Features Section */}
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={[
            styles.featureCard,
            index === 0 && styles.feature24x7,
            index === 1 && styles.feature5min,
            index === 2 && styles.feature100safe,
            index === 3 && styles.feature24x7Support
          ]}>
            <View style={[
              styles.featureIconContainer,
              index === 0 && styles.iconContainer24x7,
              index === 1 && styles.iconContainer5min,
              index === 2 && styles.iconContainer100safe,
              index === 3 && styles.iconContainer24x7Support
            ]}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
            </View>
            <Text style={[
              styles.featureTitle,
              index === 0 && styles.title24x7,
              index === 1 && styles.title5min,
              index === 2 && styles.title100safe,
              index === 3 && styles.title24x7Support
            ]}>{feature.title}</Text>
            <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            {/* Colorful glow effect */}
            <View style={[
              styles.featureGlow,
              index === 0 && styles.glow24x7,
              index === 1 && styles.glow5min,
              index === 2 && styles.glow100safe,
              index === 3 && styles.glow24x7Support
            ]} />
          </View>
        ))}
      </View>

      {/* Game Rules, Time and KYC Section */}
      <View style={styles.timeKycContainer}>
        <TouchableOpacity style={styles.gameRulesButton} onPress={() => setShowGameRules(true)}>
          <Text style={styles.gameRulesText}>📋 Game Rules</Text>
        </TouchableOpacity>

        <View style={styles.timeCenterSection}>
          <Text style={styles.currentTime}>{currentTime}</Text>
        </View>

        <TouchableOpacity style={styles.viewResultButton} onPress={onViewResults}>
          <Text style={styles.viewResultButtonIcon}>📊</Text>
          <Text style={styles.viewResultButtonText}>View Result</Text>
        </TouchableOpacity>
      </View>

      {/* Game Cards */}
      <View style={styles.gamesContainer}>
        <View style={styles.gameRow}>
          {gameCards.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onPlayNow={onPlayNow}
            />
          ))}
        </View>
      </View>
      <View style={styles.bottomSpacing} />

      {/* Game Rules Modal */}
      <GameRulesModal 
        visible={showGameRules} 
        onClose={() => setShowGameRules(false)} 
      />
    </ScrollView>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;
const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? 10 : 15,
  },
  promoScroll: {
    marginVertical: isSmallDevice ? 10 : 15,
  },
  promoCard: {
    backgroundColor: '#1a1a1a',
    padding: isSmallDevice ? 12 : 15,
    marginRight: isSmallDevice ? 8 : 10,
    borderRadius: isSmallDevice ? 10 : 12,
    borderWidth: 1,
    borderColor: '#333',
    minWidth: isSmallDevice ? 200 : 250,
  },
  promoText: {
    color: '#4A90E2',
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: isSmallDevice ? 12 : 15,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
    overflow: 'hidden',
  },
  featureIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(74, 144, 226, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.4)',
  },
  featureIcon: {
    fontSize: 20,
    color: '#4A90E2',
  },
  featureTitle: {
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureSubtitle: {
    color: '#999',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 12,
  },
  featureGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
    zIndex: -1,
  },
  // 24x7 Feature Styles
  feature24x7: {
    backgroundColor: '#1a1a2e',
    borderColor: '#00FF88',
  },
  iconContainer24x7: {
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    borderColor: 'rgba(0, 255, 136, 0.4)',
  },
  title24x7: {
    color: '#00FF88',
  },
  glow24x7: {
    borderColor: 'rgba(0, 255, 136, 0.4)',
  },
  // 5 min Feature Styles
  feature5min: {
    backgroundColor: '#2e1a1a',
    borderColor: '#FFD700',
  },
  iconContainer5min: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  title5min: {
    color: '#FFD700',
  },
  glow5min: {
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  // 100% Safe Feature Styles
  feature100safe: {
    backgroundColor: '#1a2e1a',
    borderColor: '#FF6B6B',
  },
  iconContainer100safe: {
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    borderColor: 'rgba(255, 107, 107, 0.4)',
  },
  title100safe: {
    color: '#FF6B6B',
  },
  glow100safe: {
    borderColor: 'rgba(255, 107, 107, 0.4)',
  },
    // 24x7 Support Feature Styles
  feature24x7Support: {
    backgroundColor: '#1a1a1a',
    borderColor: '#00BFFF',
  },
  iconContainer24x7Support: {
    backgroundColor: 'rgba(0, 191, 255, 0.15)',
    borderColor: 'rgba(0, 191, 255, 0.4)',
  },
  title24x7Support: {
    color: '#00BFFF',
  },
  glow24x7Support: {
    borderColor: 'rgba(0, 191, 255, 0.4)',
  },
  timeKycContainer: {
    backgroundColor: '#1a1a1a',
    padding: isSmallDevice ? 12 : 15,
    borderRadius: isSmallDevice ? 10 : 12,
    marginBottom: isSmallDevice ? 15 : 20,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeCenterSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
      paddingHorizontal: isSmallDevice ? 8 : 10,
      paddingVertical: isSmallDevice ? 4 : 6,
    borderRadius: isSmallDevice ? 6 : 8,
      minHeight: isSmallDevice ? 32 : 36,
    marginHorizontal: isSmallDevice ? 8 : 10,


  },
  currentTime: {
    color: '#4A90E2',
    fontSize: isSmallDevice ? 10 : 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameRulesButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: isSmallDevice ? 10 : 12,
    paddingVertical: isSmallDevice ? 6 : 8,
    borderRadius: isSmallDevice ? 6 : 8,
    minHeight: isSmallDevice ? 32 : 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF8A8A',
  },
  gameRulesText: {
    color: '#fff',
    fontSize: isSmallDevice ? 9 : 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewResultButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: isSmallDevice ? 12 : 15,
    paddingVertical: isSmallDevice ? 8 : 10,
    borderRadius: isSmallDevice ? 8 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minHeight: isSmallDevice ? 35 : 40,
  },
  viewResultButtonIcon: {
    fontSize: isSmallDevice ? 12 : 14,
  },
  viewResultButtonText: {
    color: '#000',
    fontSize: isSmallDevice ? 10 : 12,
    fontWeight: 'bold',
  },
  gamesContainer: {
    marginBottom: isSmallDevice ? 15 : 20,
  },
  gameRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: isSmallDevice ? 8 : 10,
  },
  bottomSpacing: {
    height: isSmallDevice ? 80 : 100,
  },
  gameRulesModal: {
    backgroundColor: '#1a1a1a',
    width: '95%',
    maxHeight: '80%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },

});