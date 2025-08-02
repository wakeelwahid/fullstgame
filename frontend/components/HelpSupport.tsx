import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;

interface HelpSupportProps {
  onBack: () => void;
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/919876543210?text=नमस्ते! मुझे help चाहिए।');
  };

  const handleTelegramPress = () => {
    Linking.openURL('https://t.me/Dream11Support');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@dream11.com?subject=Help Required');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🆘 Help & Support</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>सहायता और सपोर्ट</Text>
        <Text style={styles.pageSubtitle}>हम 24x7 आपकी सेवा में हैं</Text>

        {/* Quick Contact */}
        <View style={styles.quickContactContainer}>
          <Text style={styles.quickContactTitle}>📞 तुरंत सहायता पाएं</Text>

          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppPress}>
            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>WhatsApp Support</Text>
              <Text style={styles.contactSubtitle}>+91 98765 43210</Text>
              <Text style={styles.contactTime}>24x7 Available</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.telegramButton} onPress={handleTelegramPress}>
            <Ionicons name="paper-plane" size={24} color="#0088CC" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Telegram Support</Text>
              <Text style={styles.contactSubtitle}>@Dream11Support</Text>
              <Text style={styles.contactTime}>Instant Response</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
            <Ionicons name="mail" size={24} color="#FF6B6B" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Email Support</Text>
              <Text style={styles.contactSubtitle}>support@dream11.com</Text>
              <Text style={styles.contactTime}>Response in 2-6 hours</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqContainer}>
          <Text style={styles.faqTitle}>❓ अक्सर पूछे जाने वाले सवाल</Text>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>🎮 गेम कैसे खेलें?</Text>
            <Text style={styles.faqAnswer}>
              1. पहले अपना account verify करें{'\n'}
              2. Wallet में पैसे add करें{'\n'}
              3. Game select करें और number choose करें{'\n'}
              4. Bet amount enter करके confirm करें
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>💰 पैसे कैसे add करें?</Text>
            <Text style={styles.faqAnswer}>
              Wallet section में जाकर "Add Money" पर click करें। UPI, Net Banking, या Card से payment कर सकते हैं।
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>🏆 Winning amount कब मिलेगा?</Text>
            <Text style={styles.faqAnswer}>
              Result declare होने के तुरंत बाद winning amount आपके wallet में add हो जाएगा।
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>🏧 Withdrawal कैसे करें?</Text>
            <Text style={styles.faqAnswer}>
              Wallet section में "Withdraw" option का उपयोग करें। Bank account verify होना जरूरी है।
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>📱 App update कैसे करें?</Text>
            <Text style={styles.faqAnswer}>
              Play Store से latest version download करें या app में auto-update enable करें।
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>🔒 Account security कैसे बढ़ाएं?</Text>
            <Text style={styles.faqAnswer}>
              Strong password रखें, OTP किसी को न बताएं, और 2FA enable करें।
            </Text>
          </View>
        </View>

        {/* Common Issues */}
        <View style={styles.issuesContainer}>
          <Text style={styles.issuesTitle}>🔧 सामान्य समस्याएं और समाधान</Text>

          <View style={styles.issueItem}>
            <Text style={styles.issueTitle}>💳 Payment Failed</Text>
            <Text style={styles.issueText}>• Internet connection check करें{'\n'}• Bank balance verify करें{'\n'}• Support team से contact करें</Text>
          </View>

          <View style={styles.issueItem}>
            <Text style={styles.issueTitle}>🎯 Bet Not Placed</Text>
            <Text style={styles.issueText}>• Game timing check करें{'\n'}• Wallet balance sufficient है या नहीं{'\n'}• App restart करें</Text>
          </View>

          <View style={styles.issueItem}>
            <Text style={styles.issueTitle}>🔐 Login Problem</Text>
            <Text style={styles.issueText}>• Phone number correct है या नहीं{'\n'}• OTP expire तो नहीं हो गया{'\n'}• Password reset करें</Text>
          </View>

          <View style={styles.issueItem}>
            <Text style={styles.issueTitle}>📊 Result Not Updated</Text>
            <Text style={styles.issueText}>• App refresh करें{'\n'}• Internet connection check करें{'\n'}• Result timing confirm करें</Text>
          </View>
        </View>

        {/* Support Hours */}
        <View style={styles.supportHoursContainer}>
          <Text style={styles.supportHoursTitle}>⏰ सपोर्ट समय</Text>
          <View style={styles.timeSlot}>
            <Ionicons name="time" size={20} color="#4A90E2" />
            <Text style={styles.timeText}>24 घंटे x 7 दिन उपलब्ध</Text>
          </View>
          <View style={styles.timeSlot}>
            <Ionicons name="flash" size={20} color="#FFD700" />
            <Text style={styles.timeText}>तुरंत response: WhatsApp & Telegram</Text>
          </View>
          <View style={styles.timeSlot}>
            <Ionicons name="mail" size={20} color="#FF6B6B" />
            <Text style={styles.timeText}>Email response: 2-6 घंटे में</Text>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 उपयोगी टिप्स</Text>
          <Text style={styles.tipText}>• हमेशा latest app version use करें</Text>
          <Text style={styles.tipText}>• Strong internet connection रखें</Text>
          <Text style={styles.tipText}>• Screenshots save करें problems के लिए</Text>
          <Text style={styles.tipText}>• Bank details सही भरें withdrawal के लिए</Text>
          <Text style={styles.tipText}>• Game timing का ध्यान रखें</Text>
          <Text style={styles.tipText}>• Responsible gaming करें</Text>
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
  quickContactContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  quickContactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  telegramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0088CC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  contactTime: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.6,
  },
  faqContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  issuesContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  issuesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 20,
    textAlign: 'center',
  },
  issueItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  issueTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  issueText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  supportHoursContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  supportHoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FF88',
    marginBottom: 15,
    textAlign: 'center',
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  tipsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    paddingLeft: 10,
    lineHeight: 20,
  },
});