
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;

interface TermsConditionsProps {
  onBack: () => void;
}

export default function TermsConditions({ onBack }: TermsConditionsProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📋 Terms & Conditions</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>नियम और शर्तें</Text>
        <Text style={styles.pageSubtitle}>कृपया इन नियमों को ध्यान से पढ़ें</Text>

        {/* Important Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeIcon}>⚠️</Text>
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>महत्वपूर्ण सूचना</Text>
            <Text style={styles.noticeText}>
              यह app केवल मनोरंजन के लिए है। 18+ उम्र के लोग ही इस app का उपयोग कर सकते हैं।
            </Text>
          </View>
        </View>

        {/* Terms Sections */}
        <View style={styles.termsContainer}>
          <Text style={styles.sectionTitle}>📱 App का उपयोग</Text>
          <Text style={styles.termsText}>• यह app केवल भारत में रहने वाले लोगों के लिए है</Text>
          <Text style={styles.termsText}>• 18 साल से कम उम्र के लोग इसका उपयोग नहीं कर सकते</Text>
          <Text style={styles.termsText}>• Fake जानकारी देना गैरकानूनी है</Text>
          <Text style={styles.termsText}>• Multiple accounts बनाना prohibited है</Text>
          <Text style={styles.termsText}>• Bot या automation tools का उपयोग नहीं कर सकते</Text>

          <Text style={styles.sectionTitle}>💰 पैसे संबंधी नियम</Text>
          <Text style={styles.termsText}>• केवल अपना पैसा ही deposit करें</Text>
          <Text style={styles.termsText}>• चोरी या गैरकानूनी पैसे का उपयोग नहीं करें</Text>
          <Text style={styles.termsText}>• सभी transactions का record रखा जाता है</Text>
          <Text style={styles.termsText}>• Wrong transactions की जिम्मेदारी user की है</Text>
          <Text style={styles.termsText}>• Money laundering strictly prohibited है</Text>

          <Text style={styles.sectionTitle}>🎮 गेम के नियम</Text>
          <Text style={styles.termsText}>• सभी games fair play के आधार पर चलाए जाते हैं</Text>
          <Text style={styles.termsText}>• Result को बदलने की कोशिश नहीं कर सकते</Text>
          <Text style={styles.termsText}>• Betting time के बाद bet place नहीं हो सकता</Text>
          <Text style={styles.termsText}>• Technical issues के लिए admin जिम्मेदार नहीं है</Text>
          <Text style={styles.termsText}>• Cheating या manipulation detect होने पर account ban</Text>

          <Text style={styles.sectionTitle}>🔒 खाता सुरक्षा</Text>
          <Text style={styles.termsText}>• अपना password किसी को न बताएं</Text>
          <Text style={styles.termsText}>• OTP share करना खतरनाक है</Text>
          <Text style={styles.termsText}>• Suspicious activity immediately report करें</Text>
          <Text style={styles.termsText}>• Account security की जिम्मेदारी user की है</Text>
          <Text style={styles.termsText}>• Unauthorized access के लिए company जिम्मेदार नहीं</Text>

          <Text style={styles.sectionTitle}>📞 ग्राहक सेवा</Text>
          <Text style={styles.termsText}>• Support timing: 24x7</Text>
          <Text style={styles.termsText}>• Response time: 2-6 hours</Text>
          <Text style={styles.termsText}>• Proper details के साथ complaint करें</Text>
          <Text style={styles.termsText}>• Fake complaints के लिए action लिया जाएगा</Text>
          <Text style={styles.termsText}>• Screenshots या proof provide करें</Text>

          <Text style={styles.sectionTitle}>⚖️ कानूनी अधिकार</Text>
          <Text style={styles.termsText}>• सभी disputes का final decision admin का होगा</Text>
          <Text style={styles.termsText}>• Terms violate करने पर account terminate</Text>
          <Text style={styles.termsText}>• Legal action का अधिकार company के पास है</Text>
          <Text style={styles.termsText}>• Jurisdiction: Indian courts</Text>
          <Text style={styles.termsText}>• Terms changes का अधिकार company के पास है</Text>

          <Text style={styles.sectionTitle}>🚫 प्रतिबंधित गतिविधियां</Text>
          <Text style={styles.termsText}>• Abusive language या harassment</Text>
          <Text style={styles.termsText}>• System hacking या data theft</Text>
          <Text style={styles.termsText}>• False advertising या spam</Text>
          <Text style={styles.termsText}>• Illegal activities का promotion</Text>
          <Text style={styles.termsText}>• Intellectual property violations</Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>📞 संपर्क करें</Text>
          <Text style={styles.contactText}>
            कोई भी समस्या या सवाल के लिए हमारी customer support team से संपर्क करें।
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
            हम समय-समय पर अपनी terms update करते रहते हैं। Latest updates के लिए यहाँ check करते रहें।
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
    alignItems: 'center',
    justifyContent: 'center',
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
  termsContainer: {
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
  termsText: {
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
