
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;
const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;

interface RefundPolicyProps {
  onBack: () => void;
}

export default function RefundPolicy({ onBack }: RefundPolicyProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>💳 Refund Policy</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>रिफंड नीति</Text>
        <Text style={styles.pageSubtitle}>हमारी refund policy के नियम और शर्तें</Text>

        {/* Important Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeIcon}>⚠️</Text>
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>महत्वपूर्ण सूचना</Text>
            <Text style={styles.noticeText}>
              यह एक gaming platform है। सभी bets और deposits के लिए विशेष नियम लागू होते हैं।
            </Text>
          </View>
        </View>

        {/* Policy Sections */}
        <View style={styles.policyContainer}>
          <Text style={styles.sectionTitle}>📋 Deposit Refund Policy</Text>
          <Text style={styles.policyText}>• Deposit के तुरंत बाद refund नहीं किया जा सकता</Text>
          <Text style={styles.policyText}>• Technical error के case में 24 घंटे के अंदर refund</Text>
          <Text style={styles.policyText}>• Duplicate payment के case में automatic refund</Text>
          <Text style={styles.policyText}>• Wrong payment के case में 2-3 working days में refund</Text>
          <Text style={styles.policyText}>• GST charges refund नहीं किए जाएंगे</Text>

          <Text style={styles.sectionTitle}>🎮 Game Bet Refund Policy</Text>
          <Text style={styles.policyText}>• एक बार bet place होने के बाद cancel नहीं हो सकता</Text>
          <Text style={styles.policyText}>• Result declare होने के बाद कोई refund नहीं</Text>
          <Text style={styles.policyText}>• Technical issue के case में admin द्वारा review</Text>
          <Text style={styles.policyText}>• Wrong number selection की जिम्मेदारी user की है</Text>
          <Text style={styles.policyText}>• Game close होने के बाद bet cancel नहीं हो सकता</Text>

          <Text style={styles.sectionTitle}>💰 Wallet Refund Scenarios</Text>
          <Text style={styles.policyText}>• Account ban के case में balance refund किया जाएगा</Text>
          <Text style={styles.policyText}>• Fraud activity detect होने पर no refund</Text>
          <Text style={styles.policyText}>• User द्वारा account delete पर balance withdrawal</Text>
          <Text style={styles.policyText}>• Legal issues के case में amount hold</Text>
          <Text style={styles.policyText}>• KYC incomplete होने पर withdrawal restrictions</Text>

          <Text style={styles.sectionTitle}>⏰ Refund Processing Time</Text>
          <Text style={styles.policyText}>• UPI refund: 2-24 hours</Text>
          <Text style={styles.policyText}>• Bank account refund: 3-7 working days</Text>
          <Text style={styles.policyText}>• Credit/Debit card refund: 5-10 working days</Text>
          <Text style={styles.policyText}>• E-wallet refund: Instant to 24 hours</Text>
          <Text style={styles.policyText}>• International payments: 10-15 working days</Text>

          <Text style={styles.sectionTitle}>📝 Refund Request Process</Text>
          <Text style={styles.policyText}>• Customer support से contact करें</Text>
          <Text style={styles.policyText}>• Transaction ID और screenshot provide करें</Text>
          <Text style={styles.policyText}>• Valid reason के साथ request submit करें</Text>
          <Text style={styles.policyText}>• KYC documents की जरूरत हो सकती है</Text>
          <Text style={styles.policyText}>• Admin approval के बाद refund processing</Text>

          <Text style={styles.sectionTitle}>❌ Non-Refundable Cases</Text>
          <Text style={styles.policyText}>• Winning amount dispute करना</Text>
          <Text style={styles.policyText}>• Fair play violations</Text>
          <Text style={styles.policyText}>• Multiple account creation</Text>
          <Text style={styles.policyText}>• Bonus amount misuse</Text>
          <Text style={styles.policyText}>• Terms & conditions violation</Text>

          <Text style={styles.sectionTitle}>🔄 Partial Refund Conditions</Text>
          <Text style={styles.policyText}>• Service charges deduction</Text>
          <Text style={styles.policyText}>• Processing fees deduction</Text>
          <Text style={styles.policyText}>• GST amount non-refundable</Text>
          <Text style={styles.policyText}>• Bonus amount adjustment</Text>
          <Text style={styles.policyText}>• TDS deduction if applicable</Text>

          <Text style={styles.sectionTitle}>📞 Refund Support</Text>
          <Text style={styles.policyText}>• WhatsApp: +91 98765 43210</Text>
          <Text style={styles.policyText}>• Telegram: @SattaKingSupport</Text>
          <Text style={styles.policyText}>• Email: refunds@sattaking.com</Text>
          <Text style={styles.policyText}>• Support timing: 24x7 available</Text>
          <Text style={styles.policyText}>• Response time: Within 2 hours</Text>

          <Text style={styles.sectionTitle}>⚖️ Dispute Resolution</Text>
          <Text style={styles.policyText}>• सभी disputes का final decision admin का होगा</Text>
          <Text style={styles.policyText}>• Evidence के basis पर decision लिया जाएगा</Text>
          <Text style={styles.policyText}>• Legal proceedings की case में court jurisdiction</Text>
          <Text style={styles.policyText}>• Arbitration के through dispute resolution</Text>
          <Text style={styles.policyText}>• Company के terms के अनुसार final decision</Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>🆘 Need Help with Refund?</Text>
          <Text style={styles.contactText}>
            Refund के लिए हमारी customer support team से संपर्क करें। हमारी team 24x7 आपकी सेवा में है।
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
            यह policy समय-समय पर update हो सकती है। Latest policy के लिए app check करते रहें।
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: isSmallDevice ? 15 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  backText: {
    color: '#4A90E2',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: isSmallDevice ? 18 : 20,
    fontWeight: 'bold',
    color: '#4A90E2',
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
    backgroundColor: '#2a1a00',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noticeText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  policyContainer: {
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
  policyText: {
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
