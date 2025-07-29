
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GameRulesModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function GameRulesModal({ visible, onClose }: GameRulesModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>📋 Game Rules</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.rulesScrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.rulesContent}>
              <Text style={styles.rulesTitle}>🎯 सभी गेम्स के नियम:</Text>
              
              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>1.</Text>
                <Text style={styles.ruleText}>बेट लगाने से पहले समय चेक करें</Text>
              </View>

              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>2.</Text>
                <Text style={styles.ruleText}>एक बार बेट लगने के बाद cancel नहीं हो सकता</Text>
              </View>

              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>3.</Text>
                <Text style={styles.ruleText}>Result declare होने का wait करें</Text>
              </View>

              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>4.</Text>
                <Text style={styles.ruleText}>Fair play का पालन करें</Text>
              </View>

              <View style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>5.</Text>
                <Text style={styles.ruleText}>जिम्मेदारी से खेलें</Text>
              </View>

              <View style={styles.importantNote}>
                <Text style={styles.noteTitle}>⚠️ महत्वपूर्ण नियम:</Text>
                <Text style={styles.noteText}>• Minimum bet amount: ₹10</Text>
                <Text style={styles.noteText}>• Maximum bet amount: ₹5000</Text>
                <Text style={styles.noteText}>• Game timing को strictly follow करें</Text>
                <Text style={styles.noteText}>• Multiple bets allowed per game</Text>
                <Text style={styles.noteText}>• Results are final और बदले नहीं जा सकते</Text>
              </View>

              <View style={styles.fairPlayNote}>
                <Text style={styles.fairPlayTitle}>✅ Fair Play Guarantee:</Text>
                <Text style={styles.fairPlayText}>
                  सभी गेम्स 100% fair हैं और automated system द्वारा controlled हैं। 
                  कोई भी manipulation नहीं है।
                </Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>समझ गया / Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  closeButton: {
    padding: 5,
  },
  rulesScrollView: {
    maxHeight: 400,
  },
  rulesContent: {
    padding: 20,
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingLeft: 10,
  },
  ruleNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 10,
    minWidth: 25,
  },
  ruleText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    lineHeight: 22,
  },
  importantNote: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    paddingLeft: 10,
  },
  fairPlayNote: {
    backgroundColor: '#1a2e1a',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00FF88',
  },
  fairPlayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FF88',
    marginBottom: 10,
  },
  fairPlayText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
