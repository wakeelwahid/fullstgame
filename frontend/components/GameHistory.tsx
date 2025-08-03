
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { betService } from '../services/betService';

interface GameHistoryProps {
  betHistory?: any[];
}

const GameHistory = ({ betHistory }: GameHistoryProps) => {
  const [selectedGame, setSelectedGame] = useState<string>('All Games');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('Last 7 Days');
  const [filteredHistory, setFilteredHistory] = useState<any[]>(staticTestData);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [realBetHistory, setRealBetHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Enable loading for real API calls

  // Game names mapping
  const gameNamesMap: Record<string, string> = {
    'JAIPUR KING': 'Jaipur King',
    'FARIDABAD': 'Faridabad', 
    'GHAZIABAD': 'Ghaziabad',
    'GALI': 'Gali',
    'DISAWER': 'Disawer',
    'DIAMOND KING': 'Diamond King'
  };

  // Fetch real bet history from API
  const fetchBetHistory = async () => {
    try {
      setLoading(true);
      const response = await betService.getBetHistory(1, 100); // Fetch last 100 bets
      
      if (response.success && response.data) {
        const formattedBets = response.data.bets.map((bet: any) => ({
          id: bet.id,
          game: gameNamesMap[bet.gameName?.toUpperCase()] || bet.gameName || 'Unknown Game',
          number: bet.number || '',
          amount: bet.amount || 0,
          type: bet.type === 'ANDAR' ? 'andar' : bet.type === 'BAHAR' ? 'bahar' : 'number',
          status: bet.status === 'WON' ? 'win' : bet.status === 'LOST' ? 'loss' : 'pending',
          winAmount: bet.winAmount || 0,
          timestamp: new Date(bet.placedAt).getTime(),
          placedAt: bet.placedAt
        }));

        // Filter for last 7 days only
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const last7DaysBets = formattedBets.filter((bet: any) => bet.timestamp >= sevenDaysAgo);
        
        setRealBetHistory(last7DaysBets);
      } else {
        console.log('No bet history found or API error');
        setRealBetHistory([]);
      }
    } catch (error) {
      console.error('Error fetching bet history:', error);
      setRealBetHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBetHistory(); // Enable real API call
    console.log('Fetching real bet history from API');
  }, []);

  // Static test data for last 7 days
  const staticTestData = [
    // Today's data
    { id: 1, game: 'Jaipur King', number: '45', amount: 100, type: 'single', status: 'win', winAmount: 950, timestamp: Date.now() - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 2, game: 'Faridabad', number: '23', amount: 200, type: 'jodi', status: 'loss', winAmount: 0, timestamp: Date.now() - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (2 * 60 * 60 * 1000)).toISOString() },
    { id: 3, game: 'Ghaziabad', number: '8', amount: 50, type: 'andar', status: 'win', winAmount: 95, timestamp: Date.now() - (3 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (3 * 60 * 60 * 1000)).toISOString() },
    { id: 4, game: 'Gali', number: '91', amount: 300, type: 'bahar', status: 'pending', winAmount: 0, timestamp: Date.now() - (4 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (4 * 60 * 60 * 1000)).toISOString() },
    
    // Yesterday's data
    { id: 5, game: 'Disawer', number: '5', amount: 150, type: 'single', status: 'win', winAmount: 1425, timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString() },
    { id: 6, game: 'Diamond King', number: '34', amount: 500, type: 'jodi', status: 'loss', winAmount: 0, timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 7, game: 'Jaipur King', number: '67', amount: 75, type: 'andar', status: 'win', winAmount: 142, timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000)).toISOString() },
    { id: 8, game: 'Faridabad', number: '12', amount: 250, type: 'bahar', status: 'loss', winAmount: 0, timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000) - (3 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000) - (3 * 60 * 60 * 1000)).toISOString() },

    // 2 days ago
    { id: 9, game: 'Ghaziabad', number: '89', amount: 180, type: 'single', status: 'win', winAmount: 1710, timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString() },
    { id: 10, game: 'Gali', number: '33', amount: 120, type: 'jodi', status: 'loss', winAmount: 0, timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 11, game: 'Disawer', number: '76', amount: 80, type: 'andar', status: 'win', winAmount: 152, timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000)).toISOString() },

    // 3 days ago
    { id: 12, game: 'Diamond King', number: '54', amount: 400, type: 'bahar', status: 'loss', winAmount: 0, timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString() },
    { id: 13, game: 'Jaipur King', number: '21', amount: 60, type: 'single', status: 'win', winAmount: 570, timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 14, game: 'Faridabad', number: '99', amount: 350, type: 'jodi', status: 'pending', winAmount: 0, timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000)).toISOString() },

    // 4 days ago
    { id: 15, game: 'Ghaziabad', number: '17', amount: 90, type: 'andar', status: 'win', winAmount: 171, timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (4 * 24 * 60 * 60 * 1000)).toISOString() },
    { id: 16, game: 'Gali', number: '66', amount: 200, type: 'bahar', status: 'loss', winAmount: 0, timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (4 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 17, game: 'Disawer', number: '42', amount: 110, type: 'single', status: 'win', winAmount: 1045, timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (4 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000)).toISOString() },

    // 5 days ago
    { id: 18, game: 'Diamond King', number: '03', amount: 300, type: 'jodi', status: 'loss', winAmount: 0, timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toISOString() },
    { id: 19, game: 'Jaipur King', number: '88', amount: 150, type: 'andar', status: 'win', winAmount: 285, timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 20, game: 'Faridabad', number: '55', amount: 70, type: 'bahar', status: 'loss', winAmount: 0, timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000)).toISOString() },

    // 6 days ago
    { id: 21, game: 'Ghaziabad', number: '29', amount: 85, type: 'single', status: 'win', winAmount: 807, timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (6 * 24 * 60 * 60 * 1000)).toISOString() },
    { id: 22, game: 'Gali', number: '14', amount: 220, type: 'jodi', status: 'pending', winAmount: 0, timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (6 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 23, game: 'Disawer', number: '73', amount: 95, type: 'andar', status: 'loss', winAmount: 0, timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (6 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000)).toISOString() },

    // 7 days ago
    { id: 24, game: 'Diamond King', number: '61', amount: 180, type: 'bahar', status: 'win', winAmount: 342, timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toISOString() },
    { id: 25, game: 'Jaipur King', number: '19', amount: 130, type: 'single', status: 'loss', winAmount: 0, timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) - (1 * 60 * 60 * 1000)).toISOString() },
    { id: 26, game: 'Faridabad', number: '07', amount: 250, type: 'jodi', status: 'win', winAmount: 2375, timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000), placedAt: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) - (2 * 60 * 60 * 1000)).toISOString() },
  ];

  // Use real API data when available, fallback to static data for testing
  const currentHistory = realBetHistory.length > 0 ? realBetHistory : (staticTestData.length > 0 ? staticTestData : (betHistory || []));

  // Get last 7 days data only
  const getLast7DaysHistory = () => {
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const filtered = currentHistory.filter(bet => bet.timestamp && bet.timestamp >= sevenDaysAgo);
    console.log('Filtered last 7 days data:', filtered.length, 'items');
    return filtered;
  };

  // Get unique game names for dropdown
  const getUniqueGames = () => {
    const games = [...new Set(getLast7DaysHistory().map(bet => bet.game))];
    return ['All Games', ...games.sort()];
  };

  useEffect(() => {
    const last7DaysHistory = getLast7DaysHistory();
    console.log('Processing history for game filter:', selectedGame);
    console.log('Available history:', last7DaysHistory.length);

    if (selectedGame === 'All Games') {
      setFilteredHistory(last7DaysHistory);
      console.log('Set filtered history (all games):', last7DaysHistory.length);
    } else {
      const gameFiltered = last7DaysHistory.filter(bet => bet.game === selectedGame);
      setFilteredHistory(gameFiltered);
      console.log('Set filtered history for', selectedGame, ':', gameFiltered.length);
    }
  }, [selectedGame, realBetHistory, betHistory, staticTestData]);

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
    switch (type.toLowerCase()) {
      case 'andar': return 'अंदर';
      case 'bahar': return 'बाहर';
      case 'number': return 'नंबर';
      case 'single': return 'सिंगल';
      case 'jodi': return 'जोड़ी';
      default: return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'win': case 'won': return '✅ जीत';
      case 'loss': case 'lost': return '❌ हार';
      case 'pending': return '⏳ पेंडिंग';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'win': case 'won': return '#00FF88';
      case 'loss': case 'lost': return '#FF4757';
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
    const totalWin = filteredHistory.filter(bet => bet.status === 'win' || bet.status === 'won').reduce((sum, bet) => sum + (bet.winAmount || 0), 0);
    const winCount = filteredHistory.filter(bet => bet.status === 'win' || bet.status === 'won').length;
    const winRate = totalBets > 0 ? ((winCount / totalBets) * 100).toFixed(1) : '0';

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

  const renderLoadingView = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingIcon}>⏳</Text>
      <Text style={styles.loadingTitle}>गेम हिस्ट्री लोड हो रही है...</Text>
      <Text style={styles.loadingMessage}>कृपया प्रतीक्षा करें</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 गेम हिस्ट्री (Last 7 Days)</Text>
        <Text style={styles.headerSubtitle}>सभी 6 गेम्स का रिकॉर्ड</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchBetHistory}>
          <Ionicons name="refresh" size={20} color="#4A90E2" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        renderLoadingView()
      ) : (
        <>
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
          {filteredHistory && filteredHistory.length > 0 ? (
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
              <Text style={styles.emptySubMessage}>
                Debug: Static Data: {staticTestData.length} | Filtered: {filteredHistory.length} | Selected: {selectedGame}
              </Text>
              <TouchableOpacity style={styles.refreshButtonEmpty} onPress={fetchBetHistory}>
                <Ionicons name="refresh" size={20} color="#4A90E2" />
                <Text style={styles.refreshText}>Data Refresh करें</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

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
    marginBottom: 10,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#1a2a3a',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  refreshButtonEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1a2a3a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginTop: 20,
  },
  refreshText: {
    color: '#4A90E2',
    marginLeft: 5,
    fontSize: 12,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  loadingMessage: {
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

export default GameHistory;
