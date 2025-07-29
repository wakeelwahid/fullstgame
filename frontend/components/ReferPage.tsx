
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReferPageProps {
  userData: {
    name: string;
    phone: string;
    email: string;
    referralCode: string;
    kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  };
}

export default function ReferPage({ userData }: ReferPageProps) {
  const [referralStats] = useState({
    totalReferrals: 0,
    directBonus: 0,
    commissionEarned: 0,
    totalEarnings: 0.00
  });

  const handleCopyCode = () => {
    if (userData.referralCode && userData.referralCode !== 'N/A') {
      Clipboard.setString(userData.referralCode);
      Alert.alert('Copied!', 'Referral code copied to clipboard');
    } else {
      Alert.alert('No Code', 'No referral code available');
    }
  };

  const handleShareWhatsApp = () => {
    const message = `🎮 Join me on Satta King App and get instant bonus!\n\nUse my referral code: ${userData.referralCode}\n\n🎁 Get ₹50 bonus on first deposit\n💰 Play & Win Big!\n\nDownload now!`;
    Alert.alert('Share on WhatsApp', 'WhatsApp sharing will be implemented soon');
  };

  const handleShareTelegram = () => {
    const message = `🎮 Join me on Satta King App and get instant bonus!\n\nUse my referral code: ${userData.referralCode}\n\n🎁 Get ₹50 bonus on first deposit\n💰 Play & Win Big!\n\nDownload now!`;
    Alert.alert('Share on Telegram', 'Telegram sharing will be implemented soon');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Benefits */}
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>🎁 Refer & Earn</Text>
        <Text style={styles.pageSubtitle}>Invite friends and earn unlimited rewards</Text>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsContainer}>
        <View style={styles.benefitCard}>
          <Text style={styles.benefitIcon}>💰</Text>
          <Text style={styles.benefitTitle}>Instant ₹50 Bonus</Text>
          <Text style={styles.benefitDescription}>Get ₹50 when your friend makes their first deposit.</Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitIcon}>📈</Text>
          <Text style={styles.benefitTitle}>1% Lifetime Commission</Text>
          <Text style={styles.benefitDescription}>Earn 1% of their winnings forever.</Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitIcon}>🚀</Text>
          <Text style={styles.benefitTitle}>No Limits</Text>
          <Text style={styles.benefitDescription}>Refer unlimited friends and earn more.</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>📊 Your Referral Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{referralStats.totalReferrals}</Text>
            <Text style={styles.statLabel}>Total Referrals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹{referralStats.directBonus}</Text>
            <Text style={styles.statLabel}>Direct Bonus Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹{referralStats.commissionEarned}</Text>
            <Text style={styles.statLabel}>Commission Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹{referralStats.totalEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
        </View>
      </View>

      {/* Referral Code Section */}
      <View style={styles.referralCodeContainer}>
        <Text style={styles.referralCodeTitle}>Your Unique Referral Code</Text>
        <Text style={styles.referralCodeSubtitle}>Share this code with your friends</Text>

        <View style={styles.codeDisplay}>
          <Text style={styles.referralCode}>{userData.referralCode || 'REF123456'}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
            <Ionicons name="copy" size={16} color="#000" />
            <Text style={styles.copyButtonText}>COPY CODE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappButton} onPress={handleShareWhatsApp}>
            <Ionicons name="logo-whatsapp" size={16} color="#fff" />
            <Text style={styles.whatsappButtonText}>SHARE ON WHATSAPP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.telegramButton} onPress={handleShareTelegram}>
            <Ionicons name="send" size={16} color="#fff" />
            <Text style={styles.telegramButtonText}>SHARE ON TELEGRAM</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.howItWorksContainer}>
        <Text style={styles.howItWorksTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Share Your Code</Text>
              <Text style={styles.stepDescription}>Share your unique referral code with friends.</Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Friend Registers</Text>
              <Text style={styles.stepDescription}>Your friend signs up and makes their first deposit.</Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Start Earning</Text>
              <Text style={styles.stepDescription}>Get ₹50 + 1% commission on their winnings.</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Commission Structure */}
      <View style={styles.commissionContainer}>
        <Text style={styles.commissionTitle}>Commission Structure</Text>
        <View style={styles.commissionGrid}>
          <View style={styles.commissionItem}>
            <Text style={styles.commissionAmount}>₹50</Text>
            <Text style={styles.commissionLabel}>Instant bonus per referral</Text>
          </View>
          <View style={styles.commissionItem}>
            <Text style={styles.commissionAmount}>1%</Text>
            <Text style={styles.commissionLabel}>Lifetime commission</Text>
          </View>
        </View>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsTitle}>📋 Terms & Conditions</Text>
        <Text style={styles.termsText}>• Friend must be a new user</Text>
        <Text style={styles.termsText}>• Minimum deposit of ₹100 required</Text>
        <Text style={styles.termsText}>• Bonus credited within 24 hours</Text>
        <Text style={styles.termsText}>• Commission paid weekly</Text>
        <Text style={styles.termsText}>• Terms subject to change</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  benefitsContainer: {
    padding: 20,
    gap: 12,
  },
  benefitCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#ccc',
    flex: 1,
  },
  statsContainer: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00FF88',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  referralCodeContainer: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  referralCodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 5,
  },
  referralCodeSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeDisplay: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  referralCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FF88',
    textAlign: 'center',
    letterSpacing: 2,
  },
  actionButtons: {
    gap: 10,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  copyButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  telegramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0088CC',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  telegramButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  howItWorksContainer: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  howItWorksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepsContainer: {
    gap: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  stepNumber: {
    backgroundColor: '#4A90E2',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 18,
  },
  commissionContainer: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  commissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  commissionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  commissionItem: {
    alignItems: 'center',
  },
  commissionAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00FF88',
    marginBottom: 5,
  },
  commissionLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  termsContainer: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 40,
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 15,
  },
  termsText: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 8,
    paddingLeft: 10,
  },
});
