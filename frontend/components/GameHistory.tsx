import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface GameHistoryProps {
  betHistory?: any[];
}

// Enhanced mock game history data for last 30 days
const mockGameHistory = [
  // Today
  {
    id: '1',
    game: 'Jaipur King',
    number: '45',
    amount: 100,
    type: 'andar',
    status: 'win',
    winAmount: 180,
    timestamp: Date.now() - (0 * 24 * 60 * 60 * 1000), // Today
  },
  {
    id: '2',
    game: 'Delhi Bazaar',
    number: '23',
    amount: 50,
    type: 'bahar',
    status: 'loss',
    timestamp: Date.now() - (0 * 24 * 60 * 60 * 1000), // Today
  },
  // Yesterday
  {
    id: '3',
    game: 'Jaipur King',
    number: '8',
    amount: 200,
    type: 'andar',
    status: 'win',
    winAmount: 360,
    timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    game: 'Mumbai King',
    number: '91',
    amount: 150,
    type: 'bahar',
    status: 'pending',
    timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  // 2 days ago
  {
    id: '5',
    game: 'Delhi Bazaar',
    number: '5',
    amount: 75,
    type: 'andar',
    status: 'loss',
    timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '6',
    game: 'Jaipur King',
    number: '34',
    amount: 300,
    type: 'bahar',
    status: 'win',
    winAmount: 540,
    timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  // 3 days ago
  {
    id: '7',
    game: 'Mumbai King',
    number: '7',
    amount: 100,
    type: 'andar',
    status: 'loss',
    timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: '8',
    game: 'Ghaziabad',
    number: '89',
    amount: 250,
    type: 'bahar',
    status: 'win',
    winAmount: 450,
    timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  // 4 days ago
  {
    id: '9',
    game: 'Faridabad',
    number: '12',
    amount: 80,
    type: 'andar',
    status: 'loss',
    timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000), // 4 days ago
  },
  // 5 days ago
  {
    id: '10',
    game: 'Disawar',
    number: '67',
    amount: 120,
    type: 'bahar',
    status: 'win',
    winAmount: 216,
    timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  // 6 days ago
  {
    id: '11',
    game: 'Gali',
    number: '33',
    amount: 90,
    type: 'andar',
    status: 'loss',
    timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000), // 6 days ago
  },
  // 7 days ago
  {
    id: '12',
    game: 'Diamond King',
    number: '55',
    amount: 180,
    type: 'bahar',
    status: 'win',
    winAmount: 324,
    timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  // 15 days ago
  {
    id: '13',
    game: 'Jaipur King',
    number: '21',
    amount: 60,
    type: 'andar',
    status: 'loss',
    timestamp: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
  },
  // 20 days ago
  {
    id: '14',
    game: 'Delhi Bazaar',
    number: '77',
    amount: 140,
    type: 'bahar',
    status: 'win',
    winAmount: 252,
    timestamp: Date.now() - (20 * 24 * 60 * 60 * 1000), // 20 days ago
  },
  // 25 days ago
  {
    id: '15',
    game: 'Mumbai King',
    number: '99',
    amount: 200,
    type: 'andar',
    status: 'win',
    winAmount: 360,
    timestamp: Date.now() - (25 * 24 * 60 * 60 * 1000), // 25 days ago
  }
];

export default function GameHistory({ betHistory = mockGameHistory }: GameHistoryProps) {
  const [selectedGame, setSelectedGame] = useState<string>('All Games');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('Last 7 Days');
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);

  // Get filtered history based on date range
  const getFilteredHistoryByDate = () => {
    const now = Date.now();
    let filterTimestamp;

    switch (selectedDateFilter) {
      case 'Today':
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        filterTimestamp = todayStart.getTime();
        break;
      case 'Yesterday':
        const yesterdayStart = new Date();
        yesterdayStart.setDate(yesterdayStart.getDate() - 1);
        yesterdayStart.setHours(0, 0, 0, 0);
        const yesterdayEnd = new Date();
        yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
        yesterdayEnd.setHours(23, 59, 59, 999);
        return betHistory.filter(bet => 
          bet.timestamp && 
          bet.timestamp >= yesterdayStart.getTime() && 
          bet.timestamp <= yesterdayEnd.getTime()
        );
      case 'Last 7 Days':
        filterTimestamp = now - (7 * 24 * 60 * 60 * 1000);
        break;
      case 'Last 15 Days':
        filterTimestamp = now - (15 * 24 * 60 * 60 * 1000);
        break;
      case 'Last 30 Days':
        filterTimestamp = now - (30 * 24 * 60 * 60 * 1000);
        break;
      default:
        filterTimestamp = now - (7 * 24 * 60 * 60 * 1000);
    }

    return betHistory.filter(bet => bet.timestamp && bet.timestamp >= filterTimestamp);
  };

  // Get unique game names for dropdown
  const getUniqueGames = () => {
    const games = [...new Set(betHistory.map(bet => bet.game))];
    return ['All Games', ...games];
  };

  useEffect(() => {
    const dateFilteredHistory = getFilteredHistoryByDate();

    if (selectedGame === 'All Games') {
      setFilteredHistory(dateFilteredHistory);
    } else {
      setFilteredHistory(dateFilteredHistory.filter(bet => bet.game === selectedGame));
    }
  }, [selectedGame, selectedDateFilter, betHistory]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getBetTypeText = (type: string) => {
    switch (type) {
      case 'andar': return 'Andar';
      case 'bahar': return 'Bahar';
      default: return type;
    }
  };

  // Group bets by date
  const groupBetsByDate = () => {
    const grouped = filteredHistory.reduce((acc, bet) => {
      const dateKey = formatDate(bet.timestamp);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(bet);
      return acc;
    }, {} as Record<string, any[]>);

    return Object.entries(grouped).sort((a, b) => {
      // Sort by date, with today first
      const aDate = a[1][0]?.timestamp || 0;
      const bDate = b[1][0]?.timestamp || 0;
      return bDate - aDate;
    });
  };

  const groupedBets = groupBetsByDate();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Game History</Text>
     
      </View>

      {/* Redesigned Stylish Filter Section */}
      <View style={styles.filterContainer}>
        <View style={styles.filterWrapper}>
          {/* Game Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>🎮 Games</Text>
            <View style={styles.compactPickerContainer}>
              <Picker
                selectedValue={selectedGame}
                onValueChange={(itemValue) => setSelectedGame(itemValue)}
                style={styles.compactPicker}
                dropdownIconColor="#4A90E2"
              >
                {getUniqueGames().map((game, index) => (
                  <Picker.Item
                    key={index}
                    label={game}
                    value={game}
                    color="#fff"
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Date Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>📅 Period</Text>
            <View style={styles.compactPickerContainer}>
              <Picker
                selectedValue={selectedDateFilter}
                onValueChange={(itemValue) => setSelectedDateFilter(itemValue)}
                style={styles.compactPicker}
                dropdownIconColor="#4A90E2"
              >
                <Picker.Item label="Today" value="Today" color="#fff" />
                <Picker.Item label="Yesterday" value="Yesterday" color="#fff" />
                <Picker.Item label="Last 7 Days" value="Last 7 Days" color="#fff" />
                <Picker.Item label="Last 15 Days" value="Last 15 Days" color="#fff" />
                <Picker.Item label="Last 30 Days" value="Last 30 Days" color="#fff" />
              </Picker>
            </View>
          </View>

          {/* Filter Stats */}
          <View style={styles.filterStatsContainer}>
            <Text style={styles.filterStatsText}>
              {filteredHistory.length} {filteredHistory.length === 1 ? 'bet' : 'bets'}
            </Text>
          </View>
        </View>
      </View>

      {/* History List */}
      <ScrollView style={styles.historyContainer} showsVerticalScrollIndicator={false}>
        {groupedBets.length > 0 ? (
          groupedBets.map(([date, bets], dateIndex) => (
            <View key={dateIndex}>
              <View style={styles.dateSection}>
                {/* Date Header */}
                <View style={styles.dateHeader}>
                  <Text style={styles.dateTitle}>{date}</Text>
                  <Text style={styles.dateBetCount}>{bets.length} bets</Text>
                </View>

                {/* Horizontal Scrollable Bets */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.betsScrollContainer}
                  contentContainerStyle={styles.betsScrollContent}
                >
                  {bets.map((bet, betIndex) => (
                    <View key={betIndex} style={[
                      styles.betCard,
                      bet.status === 'win' && styles.winCard,
                      bet.status === 'loss' && styles.lossCard,
                      bet.status === 'pending' && styles.pendingCard
                    ]}>
                      <View style={styles.gameNameContainer}>
                        <Text style={styles.gameName}>🎮 {bet.game}</Text>
                        <View style={[
                          styles.statusBadge,
                          styles[`status${bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}`]
                        ]}>
                          <Text style={styles.statusText}>
                            {bet.status === 'win' ? '✅' : bet.status === 'loss' ? '❌' : '⏳'}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.betDetailsContainer}>
                        <View style={styles.numberContainer}>
                          <Text style={styles.betNumber}>{bet.number}</Text>
                          <Text style={styles.betType}>{getBetTypeText(bet.type)}</Text>
                        </View>

                        <View style={styles.amountContainer}>
                          <Text style={styles.betAmount}>₹{bet.amount}</Text>
                          {bet.status === 'win' && bet.winAmount && (
                            <Text style={styles.winAmount}>+₹{bet.winAmount}</Text>
                          )}
                          {bet.status === 'loss' && (
                            <Text style={styles.lossAmount}>-₹{bet.amount}</Text>
                          )}
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
              
              {/* Horizontal Divider Line - show between sections, not after last one */}
              {dateIndex < groupedBets.length - 1 && (
                <View style={styles.dateDivider} />
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyTitle}>No Game History Found</Text>
            <Text style={styles.emptyMessage}>
              {selectedGame === 'All Games' 
                ? 'No games played in the last 7 days'
                : `No history found for ${selectedGame}`
              }
            </Text>
            <Text style={styles.emptySubMessage}>
              🎮 Play some games first to see your history here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  filterContainer: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  filterSection: {
    flex: 1,
  },
  filterSectionTitle: {
    fontSize: 10,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  compactPickerContainer: {
    backgroundColor: '#333',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4A90E2',
    height: 32,
    overflow: 'hidden',
  },
  compactPicker: {
    color: '#fff',
    backgroundColor: '#333',
    fontSize: 12,
    height: 32,
  },
  dateFilterContainer: {
    height: 32,
  },
  dateFilterButton: {
    backgroundColor: '#333',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4A90E2',
    paddingHorizontal: 8,
    paddingVertical: 6,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateFilterText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  filterStatsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 60,
  },
  filterStatsText: {
    fontSize: 9,
    color: '#999',
    backgroundColor: '#333',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    padding: 15,
  },
  dateSection: {
    marginBottom: 15,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  dateTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  dateBetCount: {
    fontSize: 10,
    color: '#555',
  },
  dateDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  betsScrollContainer: {
    marginBottom: 10,
  },
  betsScrollContent: {
    paddingRight: 15,
    paddingLeft: 5,
  },
  betCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
    minWidth: 120,
    maxWidth: 140,
  },
  gameNameContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  gameName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  betDetailsContainer: {
    alignItems: 'center',
  },
  numberContainer: {
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
    fontSize: 9,
    color: '#4A90E2',
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontWeight: 'bold',
  },
  amountContainer: {
    alignItems: 'center',
  },
  betAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00FF88',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  emptySubMessage: {
    fontSize: 12,
    color: '#4A90E2',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // Status-specific card styles
  winCard: {
    borderColor: '#00FF88',
    borderWidth: 1,
    backgroundColor: '#1a2e1a',
  },
  lossCard: {
    borderColor: '#FF4757',
    borderWidth: 1,
    backgroundColor: '#2e1a1a',
  },
  pendingCard: {
    borderColor: '#FFD700',
    borderWidth: 1,
    backgroundColor: '#2e2a1a',
  },
  // Status badge styles
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
    alignSelf: 'center',
  },
  statusWin: {
    backgroundColor: '#00FF88',
  },
  statusLoss: {
    backgroundColor: '#FF4757',
  },
  statusPending: {
    backgroundColor: '#FFD700',
  },
  statusText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  // Win/Loss amount styles
  winAmount: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#00FF88',
    marginTop: 2,
  },
  lossAmount: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FF4757',
    marginTop: 2,
  },
});