import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  Animated,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

interface ResultsModalProps {
  visible: boolean;
  onClose: () => void;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

interface GameResult {
  id: string;
  gameId: number;
  gameName: string;
  result: string;
  date: string;
  time: string;
}

// Mock data for last 2 months
const mockResults: GameResult[] = [
  // Current results (today)
  { id: '1', gameId: 1, gameName: 'Jaipur King', result: '45', date: '2025-01-15', time: '04:50 PM' },
  { id: '2', gameId: 2, gameName: 'Faridabad', result: '23', date: '2025-01-15', time: '06:40 PM' },
  { id: '3', gameId: 3, gameName: 'Ghaziabad', result: '8', date: '2025-01-15', time: '07:50 PM' },
  { id: '4', gameId: 4, gameName: 'Gali', result: '91', date: '2025-01-15', time: '10:30 PM' },
  { id: '5', gameId: 5, gameName: 'Disawer', result: '5', date: '2025-01-15', time: '02:30 AM' },
  { id: '6', gameId: 6, gameName: 'Diamond King', result: '34', date: '2025-01-15', time: '10:10 PM' },

  // Previous days data
  { id: '7', gameId: 1, gameName: 'Jaipur King', result: '67', date: '2025-01-14', time: '04:50 PM' },
  { id: '8', gameId: 2, gameName: 'Faridabad', result: '12', date: '2025-01-14', time: '06:40 PM' },
  { id: '9', gameId: 3, gameName: 'Ghaziabad', result: '89', date: '2025-01-14', time: '07:50 PM' },
  { id: '10', gameId: 4, gameName: 'Gali', result: '33', date: '2025-01-14', time: '10:30 PM' },
  { id: '11', gameId: 5, gameName: 'Disawer', result: '76', date: '2025-01-14', time: '02:30 AM' },
  { id: '12', gameId: 6, gameName: 'Diamond King', result: '54', date: '2025-01-14', time: '10:10 PM' },

  // More historical data (last 2 months)
  { id: '13', gameId: 1, gameName: 'Jaipur King', result: '21', date: '2025-01-13', time: '04:50 PM' },
  { id: '14', gameId: 2, gameName: 'Faridabad', result: '87', date: '2025-01-13', time: '06:40 PM' },
  { id: '15', gameId: 1, gameName: 'Jaipur King', result: '99', date: '2025-01-12', time: '04:50 PM' },
  { id: '16', gameId: 3, gameName: 'Ghaziabad', result: '14', date: '2025-01-12', time: '07:50 PM' },
  { id: '17', gameId: 1, gameName: 'Jaipur King', result: '43', date: '2025-01-11', time: '04:50 PM' },
  { id: '18', gameId: 4, gameName: 'Gali', result: '62', date: '2025-01-11', time: '10:30 PM' },
  { id: '19', gameId: 2, gameName: 'Faridabad', result: '18', date: '2025-01-10', time: '06:40 PM' },
  { id: '20', gameId: 5, gameName: 'Disawer', result: '95', date: '2025-01-10', time: '02:30 AM' },
];

export default function ResultsModal({ visible, onClose, isAuthenticated = false, onAuthRequired }: ResultsModalProps) {
  const [selectedGame, setSelectedGame] = useState<string>('All Games');
  const [selectedMonth, setSelectedMonth] = useState<string>('January 2025');
  const [filteredResults, setFilteredResults] = useState<GameResult[]>([]);
  const [currentResults, setCurrentResults] = useState<GameResult[]>([]);

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Start animations when modal opens
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.2,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false,
            }),
          ])
        ),
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
          })
        ),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  useEffect(() => {
    filterResults();
  }, [selectedGame, selectedMonth]);

  const filterResults = () => {
    let filtered = mockResults;

    // Filter by game
    if (selectedGame !== 'All Games') {
      filtered = filtered.filter(result => result.gameName === selectedGame);
    }

    // Filter by month (for simplicity, just showing current month data)
    if (selectedMonth === 'December 2024') {
      filtered = filtered.filter(result => result.date.includes('2024-12'));
    } else {
      filtered = filtered.filter(result => result.date.includes('2025-01'));
    }

    // Get current results (today's results) - showing only one for testing
    const today = '2025-01-15';
    const todaysResults = mockResults.filter(result => result.date === today);
    // Show only first result for testing
    setCurrentResults(todaysResults.slice(0, 1));

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredResults(filtered);
  };

  const getUniqueGames = () => {
    const games = [...new Set(mockResults.map(result => result.gameName))];
    return ['All Games', ...games];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getGameColor = (gameName: string) => {
    const colors: { [key: string]: string } = {
      'Jaipur King': '#FFD700',
      'Faridabad': '#00FF88',
      'Ghaziabad': '#4A90E2',
      'Gali': '#9B59B6',
      'Disawer': '#FF6B6B',
      'Diamond King': '#FF1493',
    };
    return colors[gameName] || '#4A90E2';
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🏆 Winning Results</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Current Winning Numbers */}
          <View style={styles.currentResultsContainer}>
            <Text style={styles.sectionTitle}>🎯 Current Winning Numbers</Text>
            <View style={styles.currentResultsWrapper}>
              {currentResults.map((result, index) => (
                <Animated.View
                  key={result.id}
                  style={[
                    styles.currentResultCircle,
                    {
                      backgroundColor: getGameColor(result.gameName),
                      transform: [
                        { scale: pulseAnim },
                        { rotate: rotateInterpolate }
                      ],
                    }
                  ]}
                >
                  <Text style={styles.currentResultNumber}>{result.result}</Text>
                  <Text style={styles.currentResultGame}>{result.gameName}</Text>
                  <Text style={styles.currentResultTime}>{result.time}</Text>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Filters */}
          <View style={styles.filtersContainer}>
            <View style={styles.filterRow}>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>🎮 Game</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedGame}
                    onValueChange={(value) => setSelectedGame(value)}
                    style={styles.picker}
                    dropdownIconColor="#4A90E2"
                  >
                    {getUniqueGames().map((game, index) => (
                      <Picker.Item key={index} label={game} value={game} color="#fff" />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>📅 Month</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(value) => setSelectedMonth(value)}
                    style={styles.picker}
                    dropdownIconColor="#4A90E2"
                  >
                    <Picker.Item label="January 2025" value="January 2025" color="#fff" />
                    <Picker.Item label="December 2024" value="December 2024" color="#fff" />
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          {/* Results Table */}
          <View style={styles.tableContainer}>
            <Text style={styles.sectionTitle}>📊 Historical Results</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Date</Text>
              <Text style={styles.tableHeaderText}>Game</Text>
              <Text style={styles.tableHeaderText}>Result</Text>
              <Text style={styles.tableHeaderText}>Time</Text>
            </View>

            <ScrollView style={styles.tableBody} showsVerticalScrollIndicator={false}>
              {filteredResults.map((result, index) => (
                <Animated.View
                  key={result.id}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.evenRow : styles.oddRow
                  ]}
                >
                  <Text style={styles.tableCellDate}>{formatDate(result.date)}</Text>
                  <Text style={[styles.tableCellGame, { color: getGameColor(result.gameName) }]}>
                    {result.gameName}
                  </Text>
                  <View style={[styles.resultBadge, { backgroundColor: getGameColor(result.gameName) }]}>
                    <Text style={styles.resultNumber}>{result.result}</Text>
                  </View>
                  <Text style={styles.tableCellTime}>{result.time}</Text>
                </Animated.View>
              ))}

              {filteredResults.length === 0 && (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>📊 No results found</Text>
                  <Text style={styles.emptySubText}>Try adjusting your filters</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.95,
    height: '90%',
    backgroundColor: '#0a0a0a',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4A90E2',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  closeButton: {
    padding: 5,
  },
  currentResultsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 15,
    textAlign: 'center',
  },
  currentResultsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: 120,
  },
  currentResultCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  currentResultNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  currentResultGame: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 2,
  },
  currentResultTime: {
    fontSize: 7,
    color: '#000',
    opacity: 0.8,
  },
  filtersContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 15,
  },
  filterSection: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
    height: 40,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    backgroundColor: '#333',
    height: 40,
  },
  tableContainer: {
    flex: 1,
    padding: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: '#4A90E2',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginBottom: 5,
    minHeight: 50,
  },
  evenRow: {
    backgroundColor: '#1a1a1a',
  },
  oddRow: {
    backgroundColor: '#222',
  },
  tableCellDate: {
    flex: 1,
    color: '#999',
    fontSize: 10,
    textAlign: 'center',
  },
  tableCellGame: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  resultBadge: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  resultNumber: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCellTime: {
    flex: 1,
    color: '#999',
    fontSize: 10,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 12,
    color: '#999',
  },
  authRequiredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authRequiredCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    position: 'relative',
  },
  authRequiredCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  authRequiredIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  authRequiredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  authRequiredMessage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  authRequiredButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  authRequiredButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});