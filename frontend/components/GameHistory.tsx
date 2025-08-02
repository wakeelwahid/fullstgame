import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

interface GameHistoryProps {
  betHistory?: any[];
}

// Enhanced mock game history data for last 7 days - all 6 games
const mockGameHistory = [
  // Today's bets
  { id: '1', game: 'Jaipur King', number: '45', amount: 100, type: 'number', status: 'win', winAmount: 9000, timestamp: Date.now() - (0 * 24 * 60 * 60 * 1000) },
  { id: '2', game: 'Faridabad', number: '7', amount: 50, type: 'andar', status: 'win', winAmount: 450, timestamp: Date.now() - (0 * 24 * 60 * 60 * 1000) },
  { id: '3', game: 'Gali', number: '3', amount: 75, type: 'bahar', status: 'loss', timestamp: Date.now() - (0 * 24 * 60 * 60 * 1000) },
  { id: '4', game: 'Diamond King', number: '89', amount: 200, type: 'number', status: 'pending', timestamp: Date.now() - (0 * 24 * 60 * 60 * 1000) },

  // Yesterday's bets
  { id: '5', game: 'Disawer', number: '2', amount: 120, type: 'andar', status: 'win', winAmount: 1080, timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) },
  { id: '6', game: 'Ghaziabad', number: '8', amount: 80, type: 'bahar', status: 'loss', timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) },
  { id: '7', game: 'Jaipur King', number: '34', amount: 150, type: 'number', status: 'win', winAmount: 13500, timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) },
  { id: '8', game: 'Faridabad', number: '6', amount: 90, type: 'andar', status: 'loss', timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) },

  // 2 days ago
  { id: '9', game: 'Gali', number: '91', amount: 110, type: 'number', status: 'win', winAmount: 9900, timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) },
  { id: '10', game: 'Diamond King', number: '4', amount: 60, type: 'bahar', status: 'loss', timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) },
  { id: '11', game: 'Disawer', number: '77', amount: 180, type: 'number', status: 'win', winAmount: 16200, timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) },
  { id: '12', game: 'Ghaziabad', number: '9', amount: 70, type: 'andar', status: 'win', winAmount: 630, timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) },

  // 3 days ago
  { id: '13', game: 'Jaipur King', number: '1', amount: 85, type: 'bahar', status: 'loss', timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000) },
  { id: '14', game: 'Faridabad', number: '56', amount: 130, type: 'number', status: 'win', winAmount: 11700, timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000) },
  { id: '15', game: 'Gali', number: '0', amount: 95, type: 'andar', status: 'win', winAmount: 855, timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000) },
  { id: '16', game: 'Diamond King', number: '23', amount: 160, type: 'number', status: 'loss', timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000) },

  // 4 days ago
  { id: '17', game: 'Disawer', number: '5', amount: 75, type: 'bahar', status: 'win', winAmount: 675, timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000) },
  { id: '18', game: 'Ghaziabad', number: '88', amount: 220, type: 'number', status: 'win', winAmount: 19800, timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000) },
  { id: '19', game: 'Jaipur King', number: '7', amount: 55, type: 'andar', status: 'loss', timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000) },
  { id: '20', game: 'Faridabad', number: '3', amount: 100, type: 'bahar', status: 'win', winAmount: 900, timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000) },

  // 5 days ago
  { id: '21', game: 'Gali', number: '45', amount: 140, type: 'number', status: 'loss', timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000) },
  { id: '22', game: 'Diamond King', number: '8', amount: 65, type: 'andar', status: 'win', winAmount: 585, timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000) },
  { id: '23', game: 'Disawer', number: '2', amount: 90, type: 'bahar', status: 'loss', timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000) },
  { id: '24', game: 'Ghaziabad', number: '67', amount: 175, type: 'number', status: 'win', winAmount: 15750, timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000) },

  // 6 days ago
  { id: '25', game: 'Jaipur King', number: '9', amount: 80, type: 'bahar', status: 'win', winAmount: 720, timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000) },
  { id: '26', game: 'Faridabad', number: '12', amount: 115, type: 'number', status: 'loss', timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000) },
  { id: '27', game: 'Gali', number: '4', amount: 70, type: 'andar', status: 'win', winAmount: 630, timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000) },
  { id: '28', game: 'Diamond King', number: '6', amount: 125, type: 'bahar', status: 'loss', timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000) },

  // 7 days ago
  { id: '29', game: 'Disawer', number: '99', amount: 190, type: 'number', status: 'win', winAmount: 17100, timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000) },
  { id: '30', game: 'Ghaziabad', number: '1', amount: 85, type: 'andar', status: 'loss', timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000) },
  { id: '31', game: 'Jaipur King', number: '78', amount: 150, type: 'number', status: 'win', winAmount: 13500, timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000) },
  { id: '32', game: 'Faridabad', number: '5', amount: 95, type: 'bahar', status: 'win', winAmount: 855, timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000) }
];

export default function GameHistory({ betHistory = mockGameHistory }: GameHistoryProps) {
  const [selectedGame, setSelectedGame] = useState<string>('All Games');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('Last 7 Days');
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Get last 7 days data only
  const getLast7DaysHistory = () => {
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    return betHistory.filter(bet => bet.timestamp && bet.timestamp >= sevenDaysAgo);
  };

  // Get unique game names for dropdown
  const getUniqueGames = () => {
    const games = [...new Set(getLast7DaysHistory().map(bet => bet.game))];
    return ['All Games', ...games.sort()];
  };

  useEffect(() => {
    const last7DaysHistory = getLast7DaysHistory();

    if (selectedGame === 'All Games') {
      setFilteredHistory(last7DaysHistory);
    } else {
      setFilteredHistory(last7DaysHistory.filter(bet => bet.game === selectedGame));
    }
  }, [selectedGame, betHistory]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'आज (Today)';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'कल (Yesterday)';
    } else {
      return date.toLocaleDateString('hi-IN', { 
        day: '2-digit', 
        month: '2-digit',
        year: 'numeric'
      });
    }
  };

  const getBetTypeText = (type: string) => {
    switch (type) {
      case 'andar': return 'अंदर';
      case 'bahar': return 'बाहर';
      case 'number': return 'नंबर';
      default: return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'win': return '✅ जीत';
      case 'loss': return '❌ हार';
      case 'pending': return '⏳ पेंडिंग';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'win': return '#00FF88';
      case 'loss': return '#FF4757';
      case 'pending': return '#FFD700';
      default: return '#999';
    }
  };

  // Group bets by date for table view
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
      const aDate = a[1][0]?.timestamp || 0;
      const bDate = b[1][0]?.timestamp || 0;
      return bDate - aDate;
    });
  };

  const groupedBets = groupBetsByDate();

  // Calculate statistics
  const calculateStats = () => {
    const totalBets = filteredHistory.length;
    const totalAmount = filteredHistory.reduce((sum, bet) => sum + bet.amount, 0);
    const totalWin = filteredHistory.filter(bet => bet.status === 'win').reduce((sum, bet) => sum + (bet.winAmount || 0), 0);
    const winRate = totalBets > 0 ? ((filteredHistory.filter(bet => bet.status === 'win').length / totalBets) * 100).toFixed(1) : '0';

    return { totalBets, totalAmount, totalWin, winRate };
  };

  const stats = calculateStats();

  const renderTableView = () => (
    <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
      {groupedBets.map(([date, bets], dateIndex) => (
        <View key={dateIndex} style={styles.dateGroup}>
          <View style={styles.dateHeader}>
            <Text style={styles.dateTitle}>{date}</Text>
            <Text style={styles.dateBetCount}>{bets.length} बेट्स</Text>
          </View>

          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { flex: 2 }]}>गेम</Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>नंबर</Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>टाइप</Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>राशि</Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>स्थिति</Text>
              <Text style={[styles.tableHeaderText, { flex: 1 }]}>जीत</Text>
            </View>

            {/* Table Rows */}
            {bets.map((bet, betIndex) => (
              <View key={betIndex} style={[
                styles.tableRow,
                betIndex % 2 === 0 ? styles.evenRow : styles.oddRow
              ]}>
                <Text style={[styles.tableCellText, { flex: 2 }]} numberOfLines={1}>
                  {bet.game}
                </Text>
                <Text style={[styles.tableCellText, { flex: 1, fontWeight: 'bold', color: '#FFD700' }]}>
                  {bet.number}
                </Text>
                <Text style={[styles.tableCellText, { flex: 1, fontSize: 10 }]}>
                  {getBetTypeText(bet.type)}
                </Text>
                <Text style={[styles.tableCellText, { flex: 1, color: '#00FF88' }]}>
                  ₹{bet.amount}
                </Text>
                <Text style={[styles.tableCellText, { flex: 1, color: getStatusColor(bet.status), fontSize: 10 }]}>
                  {getStatusText(bet.status)}
                </Text>
                <Text style={[styles.tableCellText, { flex: 1, color: bet.winAmount ? '#00FF88' : '#999', fontSize: 10 }]}>
                  {bet.winAmount ? `₹${bet.winAmount}` : '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 गेम हिस्ट्री (Last 7 Days)</Text>
        <Text style={styles.headerSubtitle}>सभी 6 गेम्स का रिकॉर्ड</Text>
      </View>

      {/* Statistics Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalBets}</Text>
          <Text style={styles.statLabel}>कुल बेट्स</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹{stats.totalAmount}</Text>
          <Text style={styles.statLabel}>कुल राशि</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹{stats.totalWin}</Text>
          <Text style={styles.statLabel}>कुल जीत</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.winRate}%</Text>
          <Text style={styles.statLabel}>जीत दर</Text>
        </View>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>🎮 गेम फिल्टर</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedGame}
                onValueChange={(itemValue) => setSelectedGame(itemValue)}
                style={styles.picker}
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

          <TouchableOpacity
            style={[styles.viewToggle, viewMode === 'table' && styles.activeToggle]}
            onPress={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
          >
            <Ionicons 
              name={viewMode === 'table' ? 'grid-outline' : 'list-outline'} 
              size={16} 
              color={viewMode === 'table' ? '#4A90E2' : '#999'} 
            />
            <Text style={[styles.toggleText, viewMode === 'table' && styles.activeToggleText]}>
              {viewMode === 'table' ? 'कार्ड व्यू' : 'टेबल व्यू'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* History Content */}
      {filteredHistory.length > 0 ? (
        renderTableView()
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📊</Text>
          <Text style={styles.emptyTitle}>कोई गेम हिस्ट्री नहीं मिली</Text>
          <Text style={styles.emptyMessage}>
            {selectedGame === 'All Games' 
              ? 'पिछले 7 दिनों में कोई गेम नहीं खेला गया'
              : `${selectedGame} के लिए कोई हिस्ट्री नहीं मिली`
            }
          </Text>
          <Text style={styles.emptySubMessage}>
            🎮 पहले कुछ गेम खेलें फिर यहाँ हिस्ट्री देखें
          </Text>
        </View>
      )}
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

  // Statistics
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },

  // Filter
  filterContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterSection: {
    flex: 1,
    marginRight: 15,
  },
  filterLabel: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: '#333',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4A90E2',
    height: 40,
  },
  picker: {
    color: '#fff',
    backgroundColor: '#333',
    height: 40,
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
    gap: 5,
  },
  activeToggle: {
    borderColor: '#4A90E2',
    backgroundColor: '#1a2a3a',
  },
  toggleText: {
    fontSize: 10,
    color: '#999',
  },
  activeToggleText: {
    color: '#4A90E2',
  },

  // Table
  tableContainer: {
    flex: 1,
    padding: 15,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    marginBottom: 10,
  },
  dateTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  dateBetCount: {
    fontSize: 12,
    color: '#999',
  },
  table: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  evenRow: {
    backgroundColor: '#1a1a1a',
  },
  oddRow: {
    backgroundColor: '#222',
  },
  tableCellText: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
  },

  // Empty State
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
});