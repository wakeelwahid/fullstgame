
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  date: string;
  time: string;
  amount: string;
  utrNumber: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  type: 'Add Coins' | 'Redeem';
}

interface TransactionProps {
  transactions?: Transaction[];
}

// Dummy transaction data with updated structure
const dummyTransactions: Transaction[] = [
  {
    id: '1',
    date: '16/01/2025',
    time: '02:15 PM',
    amount: '₹1500',
    utrNumber: '789012345678',
    status: 'Pending',
    type: 'Deposit'
  },
  {
    id: '2',
    date: '16/01/2025',
    time: '01:30 PM',
    amount: '₹800',
    utrNumber: '890123456789',
    status: 'Approved',
    type: 'Withdraw'
  },
  {
    id: '3',
    date: '15/01/2025',
    time: '10:30 AM',
    amount: '₹500',
    utrNumber: '123456789012',
    status: 'Approved',
    type: 'Deposit'
  },
  {
    id: '4',
    date: '15/01/2025',
    time: '11:45 AM',
    amount: '₹1000',
    utrNumber: '234567890123',
    status: 'Pending',
    type: 'Withdraw'
  },
  {
    id: '5',
    date: '15/01/2025',
    time: '12:20 PM',
    amount: '₹2500',
    utrNumber: '345678901234',
    status: 'Approved',
    type: 'Deposit'
  },
  {
    id: '6',
    date: '14/01/2025',
    time: '03:20 PM',
    amount: '₹250',
    utrNumber: '456789012345',
    status: 'Rejected',
    type: 'Deposit'
  },
  {
    id: '7',
    date: '14/01/2025',
    time: '05:15 PM',
    amount: '₹750',
    utrNumber: '567890123456',
    status: 'Pending',
    type: 'Withdraw'
  },
  {
    id: '8',
    date: '14/01/2025',
    time: '06:30 PM',
    amount: '₹1200',
    utrNumber: '678901234567',
    status: 'Pending',
    type: 'Withdraw'
  },
  {
    id: '9',
    date: '13/01/2025',
    time: '09:30 AM',
    amount: '₹2000',
    utrNumber: '789012345678',
    status: 'Approved',
    type: 'Deposit'
  },
  {
    id: '10',
    date: '13/01/2025',
    time: '11:45 AM',
    amount: '₹500',
    utrNumber: '890123456789',
    status: 'Rejected',
    type: 'Withdraw'
  },
  {
    id: '11',
    date: '12/01/2025',
    time: '04:20 PM',
    amount: '₹3000',
    utrNumber: '901234567890',
    status: 'Pending',
    type: 'Deposit'
  },
  {
    id: '12',
    date: '12/01/2025',
    time: '07:15 PM',
    amount: '₹1500',
    utrNumber: '012345678901',
    status: 'Approved',
    type: 'Withdraw'
  }
];

export default function Transaction({ transactions = dummyTransactions }: TransactionProps) {
  const [searchText, setSearchText] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(dummyTransactions);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(transaction =>
        transaction.type.toLowerCase().includes(text.toLowerCase()) ||
        transaction.amount.includes(text) ||
        transaction.status.toLowerCase().includes(text.toLowerCase()) ||
        transaction.utrNumber.includes(text) ||
        transaction.date.includes(text)
      );
      setFilteredTransactions(filtered);
    }
  };

  const showAllTransactions = () => {
    setSearchText('');
    setFilteredTransactions(transactions);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return '#00FF88';
      case 'Pending': return '#FFD700';
      case 'Rejected': return '#FF4444';
      default: return '#999';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Deposit': return '💰';
      case 'Withdraw': return '💳';
      default: return '📝';
    }
  };

  const renderTableRow = ({ item }: { item: Transaction }) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.dateTimeText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={[styles.tableCell, { flexDirection: 'row', alignItems: 'center' }]}>
        {getTypeIcon(item.type)} {item.type}
      </Text>
      <Text style={[styles.tableCell, styles.amountCell]}>{item.amount}</Text>
      <Text style={[styles.tableCell, styles.utrCell]}>{item.utrNumber}</Text>
      <View style={styles.tableCell}>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>💳 Transaction History</Text>
      <Text style={styles.headerSubtitle}>Testing data - बाद में APIs से real data आएगा</Text>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by UTR, amount, status..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.showAllButton} onPress={showAllTransactions}>
          <Text style={styles.showAllButtonText}>Show All</Text>
        </TouchableOpacity>
      </View>

      {/* Table Container */}
      <View style={styles.tableContainer}>
        {filteredTransactions.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>📅 Date & Time</Text>
                <Text style={styles.headerCell}>📝 Type</Text>
                <Text style={styles.headerCell}>💰 Amount</Text>
                <Text style={styles.headerCell}>🔢 UTR Number</Text>
                <Text style={styles.headerCell}>📊 Status</Text>
              </View>

              {/* Table Body */}
              <FlatList
                data={filteredTransactions}
                renderItem={renderTableRow}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                style={styles.tableBody}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.noTransactionsContainer}>
            <Ionicons name="receipt-outline" size={64} color="#444" />
            <Text style={styles.noTransactionsText}>No transactions found</Text>
            <Text style={styles.noTransactionsSubtext}>कोई transaction नहीं मिला</Text>
          </View>
        )}
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>📈 Quick Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{filteredTransactions.filter(t => t.status === 'Approved').length}</Text>
            <Text style={styles.statLabel}>Approved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{filteredTransactions.filter(t => t.status === 'Pending').length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{filteredTransactions.filter(t => t.status === 'Rejected').length}</Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 15,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  showAllButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  showAllButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    marginBottom: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  headerCell: {
    flex: 1,
    color: '#FFD700',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 2,
    minWidth: 100,
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  tableCell: {
    flex: 1,
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 2,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCell: {
    color: '#00FF88',
    fontWeight: 'bold',
  },
  utrCell: {
    color: '#4A90E2',
    fontFamily: 'monospace',
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noTransactionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noTransactionsText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
  },
  noTransactionsSubtext: {
    color: '#444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  summaryContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  summaryTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  statLabel: {
    color: '#999',
    fontSize: 10,
    fontWeight: '500',
  },
  dateTimeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeText: {
    color: '#999',
    fontSize: 9,
    textAlign: 'center',
    marginTop: 1,
  },
});
