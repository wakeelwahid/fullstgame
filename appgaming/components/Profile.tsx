import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileProps {
  userData: {
    name: string;
    phone: string;
    email: string;
    referralCode: string;
    kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  };
  onUpdateProfile: (data: any) => void;
  onCompleteKYC: () => void;
}

export default function Profile({ userData, onUpdateProfile, onCompleteKYC }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [showKYCForm, setShowKYCForm] = useState(false);
    const [kycData, setKycData] = useState({
    fullName: '',
    aadhaarNumber: '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            Alert.alert('Logged Out', 'You have been successfully logged out');
          }
        }
      ]
    );
  };

  const copyReferralCode = () => {
    // In a real app, you'd use clipboard API
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleCompleteKYC = () => {
    setShowKYCForm(true);
  };

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
            // Here you would typically send the KYC data to your server
            console.log('KYC Data:', kycData);
            onCompleteKYC();
            setShowKYCForm(false); // Close the modal after submission
            Alert.alert('KYC Submitted', 'Your KYC verification process has been started. You will be notified once completed.');
            // Reset KYC Data
            setKycData({ fullName: '', aadhaarNumber: '' });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Title and Action Buttons */}
      <View style={styles.header}>
        <Text style={styles.title}>👤 Personal Information</Text>
        <View style={styles.topActions}>
          {isEditing ? (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Ionicons name="close" size={16} color="#fff" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={16} color="#000" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.topButtonsRow}>
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Ionicons name="pencil" size={16} color="#4A90E2" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out" size={16} color="#FF4444" />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Profile Fields */}
      <View style={styles.fieldsContainer}>
        {/* Name */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.fieldInput}
              value={editData.name}
              onChangeText={(text) => setEditData({...editData, name: text})}
              placeholder="Enter your name"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={styles.fieldValue}>{userData.name || '•••'}</Text>
          )}
        </View>

        {/* Phone */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.fieldInput}
              value={editData.phone}
              onChangeText={(text) => setEditData({...editData, phone: text})}
              placeholder="Enter phone number"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.fieldValue}>{userData.phone || '•••'}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.fieldInput}
              value={editData.email}
              onChangeText={(text) => setEditData({...editData, email: text})}
              placeholder="Enter email address"
              placeholderTextColor="#666"
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.fieldValue}>{userData.email || '•••'}</Text>
          )}
        </View>

        {/* Referral Code */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Referral Code:</Text>
          <View style={styles.referralContainer}>
            <Text style={styles.fieldValue}>{userData.referralCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyReferralCode}>
              <Ionicons name="copy" size={16} color="#FFD700" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* KYC Status and Actions */}
      <View style={styles.kycContainer}>
        <View style={styles.kycStatusRow}>
          <Text style={styles.kycLabel}>KYC Status:</Text>
          <View style={[
            styles.kycStatus,
            userData.kycStatus === 'VERIFIED' && styles.kycVerified,
            userData.kycStatus === 'PENDING' && styles.kycPending,
            userData.kycStatus === 'REJECTED' && styles.kycRejected
          ]}>
            <Text style={styles.kycStatusText}>{userData.kycStatus}</Text>
          </View>
        </View>

        {userData.kycStatus !== 'VERIFIED' && (
          <TouchableOpacity style={styles.completeKycButton} onPress={handleCompleteKYC}>
            <Ionicons name="card" size={16} color="#000" />
            <Text style={styles.completeKycButtonText}>Complete KYC</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* KYC Verification Modal */}
      <Modal
        visible={showKYCForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowKYCForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.kycModalSimple}>
            <View style={styles.kycModalHeader}>
              <Text style={styles.kycModalTitle}>🔐 Complete KYC</Text>
              <TouchableOpacity onPress={() => setShowKYCForm(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.kycModalContent}>
              <View style={styles.kycFormSimple}>
                <View style={styles.kycInputContainer}>
                  <Text style={styles.kycInputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.kycInput}
                    placeholder="Enter your full name"
                    placeholderTextColor="#999"
                    value={kycData.fullName}
                    onChangeText={(text) => setKycData({...kycData, fullName: text})}
                  />
                </View>

                <View style={styles.kycInputContainer}>
                  <Text style={styles.kycInputLabel}>Aadhaar Number</Text>
                  <TextInput
                    style={styles.kycInput}
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
                  <Text style={styles.aadhaarHelper}>
                    {kycData.aadhaarNumber.length}/12 digits
                  </Text>
                </View>

                <TouchableOpacity 
                  style={[
                    styles.verifyButtonSimple,
                    (!kycData.fullName.trim() || kycData.aadhaarNumber.length !== 12) && styles.verifyButtonDisabled
                  ]} 
                  onPress={handleKYCSubmit}
                  disabled={!kycData.fullName.trim() || kycData.aadhaarNumber.length !== 12}
                >
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  topActions: {
    alignItems: 'center',
  },
  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  editButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutButtonText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00FF88',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  fieldsContainer: {
    marginBottom: 30,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  fieldLabel: {
    color: '#999',
    fontSize: 16,
    width: 100,
  },
  fieldValue: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  fieldInput: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  referralContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  copyButton: {
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  kycContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  kycStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  kycLabel: {
    color: '#999',
    fontSize: 16,
    width: 100,
  },
  kycStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 10,
  },
  kycVerified: {
    backgroundColor: '#00FF88',
  },
  kycPending: {
    backgroundColor: '#FFD700',
  },
  kycRejected: {
    backgroundColor: '#FF4444',
  },
  kycStatusText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  completeKycButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4444',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  completeKycButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
    modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  kycModal: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  kycModalSimple: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    width: '85%',
    maxWidth: 350,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  kycModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  kycModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  kycModalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  kycInstructions: {
    color: '#ddd',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  kycFormContainer: {
    gap: 15,
  },
  kycFormSimple: {
    gap: 20,
    padding: 5,
  },
  kycInputContainer: {
    gap: 5,
  },
  kycInputLabel: {
    color: '#999',
    fontSize: 15,
  },
  kycInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  aadhaarHelper: {
    color: '#777',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  kycNotice: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    gap: 8,
  },
  kycNoticeTitle: {
    color: '#eee',
    fontWeight: 'bold',
    fontSize: 16,
  },
  kycNoticeText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  verifyButtonSimple: {
    backgroundColor: '#00FF88',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: '#777',
  },
  verifyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cancelKycButton: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  cancelKycButtonText: {
    color: '#999',
    fontSize: 15,
    textAlign: 'center',
  },
});