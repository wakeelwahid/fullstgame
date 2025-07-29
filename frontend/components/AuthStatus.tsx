
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AuthStatusProps {
  isAuthenticated: boolean;
  user?: any;
  onNavigate: (screen: string) => void;
}

export default function AuthStatus({ isAuthenticated, user, onNavigate }: AuthStatusProps) {
  if (!isAuthenticated || !user) {
    return null;
  }

  const availableFeatures = [
    { key: 'games', title: '🎮 Games', description: 'Play all betting games' },
    { key: 'wallet', title: '💰 Wallet', description: 'Add money & withdraw' },
    { key: 'mybets', title: '📋 My Bets', description: 'View betting history' },
    { key: 'transactions', title: '💳 Transactions', description: 'Money transactions' },
    { key: 'profile', title: '👤 Profile', description: 'Manage your account' },
    { key: 'results', title: '🏆 Results', description: 'Check game results' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✅ Full Access Unlocked!</Text>
        <Text style={styles.subtitle}>Welcome {user.name}, आप सभी features access कर सकते हैं!</Text>
      </View>

      <View style={styles.featuresGrid}>
        {availableFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.key}
            style={styles.featureCard}
            onPress={() => onNavigate(feature.key)}
          >
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
            <Ionicons name="chevron-forward" size={16} color="#4A90E2" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <Ionicons name="checkmark-circle" size={20} color="#00FF88" />
          <Text style={styles.statusText}>Authenticated</Text>
        </View>
        <View style={styles.statusItem}>
          <Ionicons name="person" size={20} color="#4A90E2" />
          <Text style={styles.statusText}>{user.name}</Text>
        </View>
        <View style={styles.statusItem}>
          <Ionicons name="call" size={20} color="#FFD700" />
          <Text style={styles.statusText}>{user.phone}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    margin: 10,
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#00FF88',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FF88',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  featuresGrid: {
    gap: 10,
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#333',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    flex: 1,
  },
  featureDescription: {
    fontSize: 12,
    color: '#999',
    flex: 2,
    marginHorizontal: 10,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  statusItem: {
    alignItems: 'center',
    gap: 5,
  },
  statusText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
});
