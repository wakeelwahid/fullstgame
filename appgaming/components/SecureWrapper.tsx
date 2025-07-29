
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SecureWrapperProps {
  isAuthenticated: boolean;
  user?: any;
  children: React.ReactNode;
  onLoginPress: () => void;
  onClose?: () => void;
  title?: string;
  message?: string;
  icon?: string;
}

export default function SecureWrapper({
  isAuthenticated,
  user,
  children,
  onLoginPress,
  onClose,
  title = 'Login Required',
  message = 'इस feature को access करने के लिए आपको login करना होगा।',
  icon = '🔒'
}: SecureWrapperProps) {
  if (!isAuthenticated || !user) {
    return (
      <View style={styles.authRequiredContainer}>
        <View style={styles.authRequiredCard}>
          {onClose && (
            <TouchableOpacity 
              style={styles.authRequiredCloseButton} 
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
          <Text style={styles.authRequiredIcon}>{icon}</Text>
          <Text style={styles.authRequiredTitle}>{title}</Text>
          <Text style={styles.authRequiredMessage}>{message}</Text>
          <TouchableOpacity 
            style={styles.authRequiredButton}
            onPress={onLoginPress}
          >
            <Text style={styles.authRequiredButtonText}>🚀 Login करें</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  authRequiredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0a0a0a',
  },
  authRequiredCard: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
    maxWidth: 350,
    width: '100%',
    position: 'relative',
  },
  authRequiredCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  authRequiredIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  authRequiredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 15,
    textAlign: 'center',
  },
  authRequiredMessage: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  authRequiredButton: {
    backgroundColor: '#00FF88',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#00FF88',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  authRequiredButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
