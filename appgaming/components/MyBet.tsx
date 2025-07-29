import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MyBetProps {
  placedBets?: any[];
}

const MyBet = ({ placedBets = [] }: MyBetProps) => {
  console.log('MyBet received placedBets:', placedBets);

  const groupBetsByGameAndDate = (bets: any[]) => {
    const grouped = bets.reduce((acc, bet) => {
      const key = `${bet.game}-${bet.date || new Date().toISOString().split('T')[0]}`;
      if (!acc[key]) {
        acc[key] = {
          game: bet.game,
          date: bet.date || new Date().toISOString().split('T')[0],
          sessionTime: bet.sessionTime || '09:00 PM - 04:50 PM',
          bets: []
        };
      }
      acc[key].bets.push(bet);
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const userBets = groupBetsByGameAndDate(placedBets || []);
  console.log('Grouped user bets:', userBets);

  const getBetTypeDisplay = (type: string) => {
    switch (type) {
      case 'single': return 'Single';
      case 'jodi': return 'Jodi';
      case 'andar': return 'Andar';
      case 'bahar': return 'Bahar';
      default: return type;
    }
  };

  const calculateGroupStats = (bets: any[]) => {
    const totalAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
    const totalWin = bets.reduce((sum, bet) => sum + (bet.winAmount || 0), 0);
    return { totalAmount, totalWin };
  };

  const renderGameCard = (group: any, index: number) => {
    const stats = calculateGroupStats(group.bets);
    return (
      <View key={index} style={styles.betCard}>
        <View style={styles.gameHeader}>
          <View style={styles.gameInfo}>
            <Text style={styles.gameTitle}>{group.game}</Text>
            <Text style={styles.gameDate}>{group.date}</Text>
            <Text style={styles.sessionTime}>{group.sessionTime}</Text>
          </View>
          <View style={styles.gameStats}>
            <Text style={styles.totalBets}>{group.bets.length} Bets</Text>
            <Text style={styles.totalAmount}>₹{stats.totalAmount}</Text>
            {stats.totalWin > 0 && (
              <Text style={styles.totalWin}>Won: ₹{stats.totalWin}</Text>
            )}
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.betsScrollContainer}
          contentContainerStyle={styles.betsScrollContent}
        >
          {group.bets.map((bet: any, betIdx: number) => (
            <View key={bet.id || betIdx} style={styles.betItemCard}>
              <View style={styles.betNumberContainer}>
                <Text style={styles.betNumber}>{bet.number}</Text>
                <Text style={styles.betType}>{getBetTypeDisplay(bet.type)}</Text>
              </View>

              <View style={styles.betAmountContainer}>
                <Text style={styles.betAmount}>₹{bet.amount}</Text>
                {bet.winAmount && (
                  <Text style={styles.winAmount}>₹{bet.winAmount}</Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.betHeader}>
        <Text style={styles.betLogo}>My Bets</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {userBets.length > 0 ? (
          userBets.map((gameGroup, index) => (
            <View key={index} style={styles.gameCard}>
              {renderGameCard(gameGroup, index)}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎯</Text>
            <Text style={styles.emptyTitle}>कोई bet नहीं है</Text>
            <Text style={styles.emptyMessage}>
              अपना bet लगाएं और यहाँ देखें
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  betHeader: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
    marginBottom: 10,
  },
  betLogo: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
  },
  betCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  gameDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  sessionTime: {
    fontSize: 11,
    color: '#666',
  },
  gameStats: {
    alignItems: 'flex-end',
  },
  totalBets: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 2,
  },
  totalWin: {
    fontSize: 14,
    color: '#00FF88',
    fontWeight: 'bold',
    marginTop: 2,
  },
  betsScrollContainer: {
    marginBottom: 10,
  },
  betsScrollContent: {
    paddingRight: 15,
    gap: 10,
  },
  betItemCard: {
    backgroundColor: '#0f0f0f',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  betNumberContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  betNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  betType: {
    fontSize: 10,
    color: '#999',
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
  },
  betAmountContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  betAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  winAmount: {
    fontSize: 11,
    color: '#00FF88',
    fontWeight: 'bold',
  },
  gameCard: {
    marginBottom: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default MyBet;