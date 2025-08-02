import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔒 Privacy Policy</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>गोपनीयता नीति</Text>
        <Text style={styles.pageSubtitle}>आपकी जानकारी की सुरक्षा हमारी प्राथमिकता है</Text>

        {/* Important Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeIcon}>🔐</Text>
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>डेटा सुरक्षा</Text>
            <Text style={styles.noticeText}>
              हम आपकी व्यक्तिगत जानकारी को पूर्ण सुरक्षा के साथ store करते हैं और third parties के साथ share नहीं करते।
            </Text>
          </View>
        </View>

        {/* Privacy Sections */}
        <View style={styles.privacyContainer}>
          <Text style={styles.sectionTitle}>📊 डेटा संग्रह</Text>
          <Text style={styles.privacyText}>• नाम, फोन नंबर, email address</Text>
          <Text style={styles.privacyText}>• बैंक account details (payment के लिए)</Text>
          <Text style={styles.privacyText}>• Game history और betting patterns</Text>
          <Text style={styles.privacyText}>• Device information और IP address</Text>
          <Text style={styles.privacyText}>• Location data (compliance के लिए)</Text>

          <Text style={styles.sectionTitle}>🎯 डेटा का उपयोग</Text>
          <Text style={styles.privacyText}>• Account management और authentication</Text>
          <Text style={styles.privacyText}>• Payment processing और security</Text>
          <Text style={styles.privacyText}>• Customer support प्रदान करना</Text>
          <Text style={styles.privacyText}>• Service improvement और analytics</Text>
          <Text style={styles.privacyText}>• Legal compliance और fraud prevention</Text>

          <Text style={styles.sectionTitle}>🔒 डेटा सुरक्षा</Text>
          <Text style={styles.privacyText}>• End-to-end encryption का उपयोग</Text>
          <Text style={styles.privacyText}>• Secure servers पर data storage</Text>
          <Text style={styles.privacyText}>• Regular security audits और monitoring</Text>
          <Text style={styles.privacyText}>• Limited access - केवल authorized personnel</Text>
          <Text style={styles.privacyText}>• Data backup और disaster recovery</Text>

          <Text style={styles.sectionTitle}>🚫 डेटा साझाकरण</Text>
          <Text style={styles.privacyText}>• Third parties के साथ personal data share नहीं करते</Text>
          <Text style={styles.privacyText}>• Marketing purposes के लिए data sell नहीं करते</Text>
          <Text style={styles.privacyText}>• Legal requirements के अलावा कोई disclosure नहीं</Text>
          <Text style={styles.privacyText}>• Payment partners के साथ minimal required data</Text>
          <Text style={styles.privacyText}>• Analytics के लिए केवल anonymized data</Text>

          <Text style={styles.sectionTitle}>👤 आपके अधिकार</Text>
          <Text style={styles.privacyText}>• अपना personal data access करने का अधिकार</Text>
          <Text style={styles.privacyText}>• Data correction या update करने का अधिकार</Text>
          <Text style={styles.privacyText}>• Account deletion का अधिकार</Text>
          <Text style={styles.privacyText}>• Data portability का अधिकार</Text>
          <Text style={styles.privacyText}>• Marketing communications opt-out</Text>

          <Text style={styles.sectionTitle}>🍪 Cookies और Tracking</Text>
          <Text style={styles.privacyText}>• Essential cookies for app functionality</Text>
          <Text style={styles.privacyText}>• Analytics cookies for service improvement</Text>
          <Text style={styles.privacyText}>• Session management और security</Text>
          <Text style={styles.privacyText}>• User preferences storage</Text>
          <Text style={styles.privacyText}>• Advertising cookies - no third party tracking</Text>

          <Text style={styles.sectionTitle}>📱 Mobile App Permissions</Text>
          <Text style={styles.privacyText}>• Camera access - KYC verification के लिए</Text>
          <Text style={styles.privacyText}>• Storage access - documents save करने के लिए</Text>
          <Text style={styles.privacyText}>• Phone access - OTP verification के लिए</Text>
          <Text style={styles.privacyText}>• Location access - compliance check के लिए</Text>
          <Text style={styles.privacyText}>• Network access - app functionality के लिए</Text>

          <Text style={styles.sectionTitle}>⏰ डेटा Retention</Text>
          <Text style={styles.privacyText}>• Account data: जब तक account active है</Text>
          <Text style={styles.privacyText}>• Transaction records: 7 years (legal requirement)</Text>
          <Text style={styles.privacyText}>• Game history: 3 years</Text>
          <Text style={styles.privacyText}>• Support conversations: 2 years</Text>
          <Text style={styles.privacyText}>• Analytics data: 1 year</Text>

          <Text style={styles.sectionTitle}>🔄 Policy Updates</Text>
          <Text style={styles.privacyText}>• समय-समय पर policy updates हो सकती हैं</Text>
          <Text style={styles.privacyText}>• Major changes के लिए notification भेजी जाएगी</Text>
          <Text style={styles.privacyText}>• App में latest version हमेशा available</Text>
          <Text style={styles.privacyText}>• Continued use = policy acceptance</Text>
          <Text style={styles.privacyText}>• Version history maintained</Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>📞 Privacy संबंधी सवाल?</Text>
          <Text style={styles.contactText}>
            Privacy policy के बारे में कोई भी सवाल या concern हो तो हमसे संपर्क करें।
          </Text>

          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.whatsappButton}>
              <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
              <Text style={styles.contactButtonText}>WhatsApp Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.telegramButton}>
              <Ionicons name="paper-plane" size={20} color="#0088CC" />
              <Text style={styles.contactButtonText}>Telegram Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Last Updated */}
        <View style={styles.lastUpdated}>
          <Text style={styles.lastUpdatedText}>Last Updated: January 2025</Text>
          <Text style={styles.lastUpdatedSubtext}>
            यह privacy policy Indian laws के अनुसार बनाई गई है और regularly update की जाती है।
          </Text>
        </View>
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
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4A90E2',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
  },
  content: {
    padding: isSmallDevice ? 15 : 20,
  },
  pageTitle: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 10,
  },
  pageSubtitle: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 25,
  },
  noticeContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a2a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    color: '#00FF88',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noticeText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  privacyContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  privacyText: {
    color: '#fff',
    fontSize: isSmallDevice ? 13 : 14,
    marginBottom: 8,
    lineHeight: 20,
    paddingLeft: 10,
  },
  contactContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  contactTitle: {
    color: '#4A90E2',
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  contactText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  contactButtons: {
    gap: 10,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 8,
  },
  telegramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0088CC',
    padding: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  lastUpdated: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  lastUpdatedText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastUpdatedSubtext: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});