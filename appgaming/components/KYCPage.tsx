
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface KYCPageProps {
  onBack: () => void;
}

export default function KYCPage({ onBack }: KYCPageProps) {
  const [kycData, setKycData] = useState({
    fullName: '',
    aadhaarNumber: '',
  });

  const handleKYCSubmit = () => {
    if (!kycData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (kycData.aadhaarNumber.length !== 12) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number');
      return;
    }

    Alert.alert(
      'Confirm KYC Submission',
      'Are you sure you want to submit your KYC information?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            Alert.alert('KYC Submitted', 'Your KYC verification process has been started. You will be notified once completed.');
            // Reset form
            setKycData({ fullName: '', aadhaarNumber: '' });
            onBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🔐 Complete KYC</Text>
      </View>

      {/* KYC Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📋 KYC Verification</Text>
        <Text style={styles.infoText}>
          Complete your KYC verification to enable withdrawals and increase security of your account.
        </Text>
      </View>

      {/* KYC Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Personal Information</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name as per Aadhaar"
            placeholderTextColor="#999"
            value={kycData.fullName}
            onChangeText={(text) => setKycData({...kycData, fullName: text})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Aadhaar Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 12-digit Aadhaar number"
            placeholderTextColor="#999"
            value={kycData.aadhaarNumber}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '').slice(0, 12);
              setKycData({...kycData, aadhaarNumber: numericText});
            }}
            keyboardType="numeric"
            maxLength={12}
          />
          <Text style={styles.helperText}>
            {kycData.aadhaarNumber.length}/12 digits
          </Text>
        </View>

        <TouchableOpacity 
          style={[
            styles.verifyButton,
            (!kycData.fullName.trim() || kycData.aadhaarNumber.length !== 12) && styles.verifyButtonDisabled
          ]} 
          onPress={handleKYCSubmit}
          disabled={!kycData.fullName.trim() || kycData.aadhaarNumber.length !== 12}
        >
          <Ionicons name="shield-checkmark" size={20} color="#fff" />
          <Text style={styles.verifyButtonText}>Verify Now</Text>
        </TouchableOpacity>
      </View>

      {/* Security Notice */}
      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>🔒 Security Notice</Text>
        <Text style={styles.noticeText}>• Your information is encrypted and secure</Text>
        <Text style={styles.noticeText}>• KYC verification typically takes 24-48 hours</Text>
        <Text style={styles.noticeText}>• You will be notified via SMS/Email once verified</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  backText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerTitle: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  infoTitle: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  formTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555',
  },
  helperText: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FF88',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  verifyButtonDisabled: {
    backgroundColor: '#666',
  },
  verifyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  noticeCard: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  noticeTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  noticeText: {
    color: '#999',
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
});
