import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WalletOperationsProps {
  showAddCashModal: boolean;
  showWithdrawModal: boolean;
  showPaymentModal: boolean;
  depositAmount: string;
  withdrawAmount: string;
  selectedPaymentMethod: string;
  utrNumber: string;
  onCloseAddCash: () => void;
  onCloseWithdraw: () => void;
  onClosePayment: () => void;
  onDepositAmountChange: (amount: string) => void;
  onWithdrawAmountChange: (amount: string) => void;
  onPaymentMethodSelect: (method: string) => void;
  onUtrChange: (utr: string) => void;
  onConfirmPayment: () => void;
  onWithdrawRequest: (amount: number) => void;
}

export default function WalletOperations({
  showAddCashModal,
  showWithdrawModal,
  showPaymentModal,
  depositAmount,
  withdrawAmount,
  selectedPaymentMethod,
  utrNumber,
  onCloseAddCash,
  onCloseWithdraw,
  onClosePayment,
  onDepositAmountChange,
  onWithdrawAmountChange,
  onPaymentMethodSelect,
  onUtrChange,
  onConfirmPayment,
  onWithdrawRequest
}: WalletOperationsProps) {
  const [showPaymentWarningModal, setShowPaymentWarningModal] = useState(false);
  const [selectedMethodForWarning, setSelectedMethodForWarning] = useState('');
  const [showWithdrawConfirmModal, setShowWithdrawConfirmModal] = useState(false);
    const [paymentTimer, setPaymentTimer] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    if (showPaymentModal) {
      setPaymentTimer(300);
      const timer = setInterval(() => {
        setPaymentTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClosePayment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showPaymentModal, onClosePayment]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateDepositDetails = (amount: number) => {
    const gst = Math.round(amount * 0.28);
    const cashback = amount >= 2000 ? Math.round(amount * 0.05) : 0;
    const total = amount + gst;
    return { gst, cashback, total };
  };

  const handleWithdrawSubmit = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount >= 100) {
      setShowWithdrawConfirmModal(true);
    } else {
      Alert.alert('Invalid Amount', 'Minimum withdrawal amount is ₹100');
    }
  };

  const handleConfirmWithdraw = () => {
    setShowWithdrawConfirmModal(false);
    const amount = parseFloat(withdrawAmount);
    onWithdrawRequest(amount);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedMethodForWarning(method);
    setShowPaymentWarningModal(true);
  };

  const handleConfirmPaymentMethod = () => {
    setShowPaymentWarningModal(false);
    onPaymentMethodSelect(selectedMethodForWarning);
  };

  return (
    <>
      {/* Add Cash Modal */}
      <Modal
        visible={showAddCashModal}
        animationType="slide"
        transparent={true}
        onRequestClose={onCloseAddCash}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addCashModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>💰 UPI से पैसे Add करें</Text>
              <TouchableOpacity onPress={onCloseAddCash}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.addCashContent}>
              <Text style={styles.depositLabel}>Amount डालें (₹)</Text>
              <TextInput
                style={styles.depositInput}
                placeholder="Enter amount"
                placeholderTextColor="#999"
                value={depositAmount}
                onChangeText={onDepositAmountChange}
                keyboardType="numeric"
              />

              <View style={styles.quickAmountsGrid}>
                {[100, 200, 500, 1000, 5000, 10000].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.quickAmountButton}
                    onPress={() => onDepositAmountChange(amount.toString())}
                  >
                    <Text style={styles.quickAmountText}>₹{amount}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {depositAmount && parseFloat(depositAmount) >= 100 && (
                <View style={styles.depositSummary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Deposit Amount (Tax छोड़कर)</Text>
                    <Text style={styles.summaryValue}>₹{depositAmount}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Govt. Tax (28% GST)</Text>
                    <Text style={styles.summaryValue}>₹{calculateDepositDetails(parseFloat(depositAmount)).gst}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Cashback Bonus</Text>
                    <Text style={styles.summaryValueGreen}>+₹{calculateDepositDetails(parseFloat(depositAmount)).cashback}</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabelTotal}>Total Amount</Text>
                    <Text style={styles.summaryValueTotal}>₹{calculateDepositDetails(parseFloat(depositAmount)).total}</Text>
                  </View>
                </View>
              )}

              <Text style={styles.paymentMethodLabel}>UPI से Payment करें</Text>
              <View style={styles.paymentMethods}>
                <TouchableOpacity 
                  style={styles.paymentMethod}
                  onPress={() => handlePaymentMethodSelect('PhonePe')}
                >
                  <Text style={styles.paymentMethodText}>📱 PhonePe</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.paymentMethod}
                  onPress={() => handlePaymentMethodSelect('Google Pay')}
                >
                  <Text style={styles.paymentMethodText}>🟢 Google Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.paymentMethod}
                  onPress={() => handlePaymentMethodSelect('Paytm')}
                >
                  <Text style={styles.paymentMethodText}>💙 Paytm</Text>
                </TouchableOpacity>
              </View>

              {(!depositAmount || parseFloat(depositAmount) < 100) && (
                <View style={styles.depositInfo}>
                  <Text style={styles.depositInfoTitle}>📌 Deposit की जानकारी:</Text>
                  <Text style={styles.depositInfoText}>• कम से कम deposit: ₹100</Text>
                  <Text style={styles.depositInfoText}>• तुरंत UPI deposits (Max ₹50,000)</Text>
                  <Text style={styles.depositInfoText}>• सभी deposits पर 28% GST लगेगा</Text>
                  <Text style={styles.depositInfoText}>• ₹2000 से ऊपर 5% cashback मिलेगा</Text>
                  <Text style={styles.depositInfoText}>• Admin approval के बाद wallet balance update होगा</Text>
                  <Text style={styles.depositWarningText}>⚠️ Withdrawal केवल deposit वाले account में होगी</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Payment QR Code Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={onClosePayment}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.paymentQRModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Complete Your Payment</Text>
              <TouchableOpacity onPress={onClosePayment}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentQRContent}>
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(paymentTimer)}</Text>
                <Text style={styles.timerNote}>Time remaining to complete payment</Text>
              </View>
              {/* QR Code Display */}
              <View style={styles.qrCodeContainer}>
                <View style={styles.qrCodePlaceholder}>
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                  <View style={styles.qrSquare} />
                </View>
              </View>

              <Text style={styles.scanInstructions}>
                Scan this code using <Text style={styles.highlightText}>{selectedPaymentMethod}</Text> to pay ₹{depositAmount && calculateDepositDetails(parseFloat(depositAmount)).total}
              </Text>

              {/* UTR Input */}
              <Text style={styles.utrLabel}>UTR Number</Text>
              <TextInput
                style={styles.utrInput}
                placeholder="Enter 12-digit UTR"
                placeholderTextColor="#999"
                value={utrNumber}
                onChangeText={onUtrChange}
                keyboardType="numeric"
                maxLength={12}
              />

              <TouchableOpacity
                style={[
                  styles.confirmPaymentButton,
                  utrNumber.length !== 12 && styles.confirmPaymentButtonDisabled
                ]}
                onPress={onConfirmPayment}
                disabled={utrNumber.length !== 12}
              >
                <Text style={styles.confirmPaymentButtonText}>CONFIRM PAYMENT</Text>
              </TouchableOpacity>

              {/* UTR Help */}
              <View style={styles.utrHelp}>
                <Text style={styles.utrHelpTitle}>How to Find Your UTR Number:</Text>
                <Text style={styles.utrHelpText}>• Check your bank SMS for the transaction confirmation</Text>
                <Text style={styles.utrHelpText}>• Look for a 12-digit number labeled "UTR" or "Ref No"</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        visible={showWithdrawModal}
        animationType="slide"
        transparent={true}
        onRequestClose={onCloseWithdraw}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.withdrawModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>💳 Redeem Coins to Your Account</Text>
              <TouchableOpacity onPress={onCloseWithdraw}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.withdrawContent}>
              <Text style={styles.withdrawLabel}>Amount (₹)</Text>
              <TextInput
                style={styles.withdrawInput}
                placeholder="Enter amount"
                placeholderTextColor="#999"
                value={withdrawAmount}
                onChangeText={onWithdrawAmountChange}
                keyboardType="numeric"
              />

              <View style={styles.quickAmountsGrid}>
                {[100, 500, 1000, 2000, 5000, 10000].map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.quickAmountButton}
                    onPress={() => onWithdrawAmountChange(amount.toString())}
                  >
                    <Text style={styles.quickAmountText}>₹{amount}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.withdrawRequestButton, (!withdrawAmount || parseFloat(withdrawAmount) < 100) && styles.withdrawButtonDisabled]}
                onPress={handleWithdrawSubmit}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) < 100}
              >
                <Text style={styles.withdrawRequestButtonText}>REQUEST WITHDRAWAL</Text>
              </TouchableOpacity>

              <View style={styles.withdrawInfo}>
                <Text style={styles.withdrawInfoTitle}>ℹ️ Withdrawal Information:</Text>
                <Text style={styles.withdrawInfoText}>• Minimum withdrawal: ₹100</Text>
                <Text style={styles.withdrawInfoText}>• Maximum per request: ₹30,000</Text>
                <Text style={styles.withdrawInfoText}>• Processing time: 5 to 10 minutes</Text>
                <Text style={styles.withdrawInfoText}>• Daily limit: ₹50,000</Text>
                <Text style={styles.withdrawInfoText}>• Bank charges may apply</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Payment Warning Modal */}
      <Modal
        visible={showPaymentWarningModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPaymentWarningModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.paymentWarningModalContainer}>
            <View style={styles.warningModalHeader}>
              <Text style={styles.warningModalTitle}>⚠️ महत्वपूर्ण सूचना</Text>
              <TouchableOpacity onPress={() => setShowPaymentWarningModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.warningModalContent}>
              <View style={styles.warningIconContainer}>
                <Text style={styles.warningIcon}>⚠️</Text>
              </View>

              <Text style={styles.warningMainText}>
                जब आप <Text style={styles.highlightText}>{selectedMethodForWarning}</Text> से deposit करते हैं, तो withdrawal भी इसी {selectedMethodForWarning} account में होगी।
              </Text>

              <Text style={styles.warningSubText}>
                When you deposit via <Text style={styles.highlightText}>{selectedMethodForWarning}</Text>, withdrawal will also be made to the same {selectedMethodForWarning} account.
              </Text>

              <View style={styles.warningPointsContainer}>
                <Text style={styles.warningPoint}>• कृपया सुनिश्चित करें कि यह आपका own account है</Text>
                <Text style={styles.warningPoint}>• Please ensure this is your own account</Text>
                <Text style={styles.warningPoint}>• Withdrawal केवल same payment method में होगी</Text>
                <Text style={styles.warningPoint}>• No changes allowed after deposit</Text>
              </View>

              <View style={styles.warningButtonsContainer}>
                <TouchableOpacity
                  style={styles.cancelWarningButton}
                  onPress={() => setShowPaymentWarningModal(false)}
                >
                  <Text style={styles.cancelWarningButtonText}>रद्द करें (Cancel)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmWarningButton}
                  onPress={handleConfirmPaymentMethod}
                >
                  <Text style={styles.confirmWarningButtonText}>समझ गया, आगे बढ़ें</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Withdrawal Confirmation Modal */}
      <Modal
        visible={showWithdrawConfirmModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowWithdrawConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.withdrawConfirmModalContainer}>
            <View style={styles.confirmModalHeader}>
              <Text style={styles.confirmModalTitle}>💰 Withdrawal Confirm करें</Text>
              <TouchableOpacity onPress={() => setShowWithdrawConfirmModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.confirmModalContent}>
              <View style={styles.confirmIconContainer}>
                <Text style={styles.confirmIcon}>💳</Text>
              </View>

              <Text style={styles.confirmMainText}>
                क्या आप withdraw करना चाहते हैं?
              </Text>

              <View style={styles.withdrawDetailsContainer}>
                <View style={styles.withdrawDetailRow}>
                  <Text style={styles.withdrawDetailLabel}>📱 UPI ID (जिससे last deposit किया था):</Text>
                  <Text style={styles.withdrawDetailValueHighlight}>user@phonepe</Text>
                </View>

                <View style={styles.withdrawDetailRow}>
                  <Text style={styles.withdrawDetailLabel}>⏰ Processing Time:</Text>
                  <Text style={styles.withdrawDetailValue}>5-10 minutes</Text>
                </View>
              </View>

              <View style={styles.confirmWarningContainer}>
                <Text style={styles.confirmWarningText}>
                  ⚠️ जिस UPI ID से आपने last deposit किया था, उसी में withdrawal आएगी
                </Text>
                <Text style={styles.confirmWarningSubText}>
                  Amount credited after admin approval
                </Text>
              </View>

              <View style={styles.confirmButtonsContainer}>
                <TouchableOpacity
                  style={styles.cancelConfirmButton}
                  onPress={() => setShowWithdrawConfirmModal(false)}
                >
                  <Text style={styles.cancelConfirmButtonText}>रद्द करें</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmWithdrawButton}
                  onPress={handleConfirmWithdraw}
                >
                  <Text style={styles.confirmWithdrawButtonText}>हाँ, Withdraw करें</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    flex: 1,
  },
  addCashModalContainer: {
    backgroundColor: '#0a0a0a',
    width: '95%',
    maxHeight: '90%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  addCashContent: {
    flex: 1,
    padding: 20,
  },
  depositLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  depositInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  quickAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAmountButton: {
    width: '30%',
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  quickAmountText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },
  depositSummary: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#999',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryValueGreen: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryLabelTotal: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryValueTotal: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 8,
  },
  paymentMethodLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethod: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  paymentMethodText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  depositInfo: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  depositInfoTitle: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  depositInfoText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  depositWarningText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  paymentQRModalContainer: {
    backgroundColor: '#0a0a0a',
    width: '95%',
    maxHeight: '90%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  paymentQRContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  qrCodeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  qrSquare: {
    width: '48%',
    height: '48%',
    backgroundColor: '#ccc',
    margin: '1%',
    borderRadius: 5,
  },
  scanInstructions: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  highlightText: {
    color: '#00FF88',
    fontWeight: 'bold',
  },
  utrLabel: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  utrInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: '#fff',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmPaymentButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmPaymentButtonDisabled: {
    backgroundColor: '#333',
  },
  confirmPaymentButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  utrHelp: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  utrHelpTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  utrHelpText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  withdrawModalContainer: {
    backgroundColor: '#0a0a0a',
    width: '95%',
    maxHeight: '90%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  withdrawContent: {
    flex: 1,
    padding: 20,
  },
  withdrawLabel: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  withdrawInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  withdrawRequestButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  withdrawButtonDisabled: {
    backgroundColor: '#333',
  },
  withdrawRequestButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawInfo: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  withdrawInfoTitle: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  withdrawInfoText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  upiAccountContainer: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  upiAccountLabel: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  upiAccountBox: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#00FF88',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  upiAccountText: {
    color: '#00FF88',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upiAccountSubText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  upiAccountNote: {
    color: '#FFD700',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  paymentWarningModalContainer: {
    backgroundColor: '#0a0a0a',
    width: '90%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    maxWidth: 400,
  },
  warningModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  warningModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    flex: 1,
  },
  warningModalContent: {
    padding: 20,
  },
  warningIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  warningIcon: {
    fontSize: 50,
    color: '#FF6B6B',
  },
  warningMainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  warningSubText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  warningPointsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  warningPoint: {
    color: '#FFD700',
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
  warningButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelWarningButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  cancelWarningButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmWarningButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmWarningButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  withdrawConfirmModalContainer: {
    backgroundColor: '#0a0a0a',
    width: '90%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4A90E2',
    maxWidth: 400,
  },
  confirmModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    flex: 1,
  },
  confirmModalContent: {
    padding: 20,
  },
  confirmIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmIcon: {
    fontSize: 50,
    color: '#4A90E2',
  },
  confirmMainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  withdrawDetailsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  withdrawDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  withdrawDetailLabel: {
    color: '#999',
    fontSize: 14,
    flex: 1,
  },
  withdrawDetailValue: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  withdrawDetailValueHighlight: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  confirmWarningContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  confirmWarningText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    lineHeight: 18,
  },
  confirmWarningSubText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  confirmButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelConfirmButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  cancelConfirmButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmWithdrawButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmWithdrawButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timerContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  timerText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timerNote: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
});