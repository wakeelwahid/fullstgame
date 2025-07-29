import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AgeVerificationModalProps {
  visible: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export default function AgeVerificationModal({
  visible,
  onAccept,
  onReject,
}: AgeVerificationModalProps) {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [scaleAnim] = React.useState(new Animated.Value(0.9));

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {}} // Prevent back button close
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.verificationModal,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Warning Icon */}
          <View style={styles.warningIconContainer}>
            <Ionicons name="warning" size={60} color="#FF6B6B" />
          </View>

          {/* Title */}
          <Text style={styles.title}>🔞 Age Verification Required</Text>

          {/* Main Warning Message */}
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              ⚠️ यह app केवल 18+ उम्र के लोगों के लिए है
            </Text>
            <Text style={styles.warningSubtext}>
              This application is only for users aged 18 and above
            </Text>
          </View>

          {/* Important Points */}
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsTitle}>📋 Important Guidelines:</Text>

            <View style={styles.point}>
              <Text style={styles.pointIcon}>🔸</Text>
              <Text style={styles.pointText}>Gambling can be addictive</Text>
            </View>

            <View style={styles.point}>
              <Text style={styles.pointIcon}>🔸</Text>
              <Text style={styles.pointText}>
                Play responsibly within your limits
              </Text>
            </View>

            <View style={styles.point}>
              <Text style={styles.pointIcon}>🔸</Text>
              <Text style={styles.pointText}>Never chase your losses</Text>
            </View>

            <View style={styles.point}>
              <Text style={styles.pointIcon}>🔸</Text>
              <Text style={styles.pointText}>
                Seek help if gambling becomes a problem
              </Text>
            </View>
          </View>

          {/* Confirmation Text */}
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
              🤝 By continuing, you confirm that:
            </Text>
            <Text style={styles.confirmationPoints}>
              • You are 18 years or older{"\n"}• You understand the risks of
              gambling{"\n"}• You agree to play responsibly
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
              <Text style={styles.rejectButtonText}>Under 18 / Exit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
              <Text style={styles.acceptButtonText}>I'm 18+ / Continue</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  verificationModal: {
    backgroundColor: "#0a0a0a",
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B6B",
    shadowColor: "#FF6B6B",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 15,
  },
  warningIconContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 20,
  },
  warningContainer: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  warningText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 5,
  },
  warningSubtext: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },
  pointsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  pointsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
  },
  point: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  pointIcon: {
    color: "#00FF88",
    fontSize: 14,
    marginRight: 8,
    marginTop: 2,
  },
  pointText: {
    color: "#999",
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  confirmationContainer: {
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    width: "100%",
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  confirmationText: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  confirmationPoints: {
    color: "#999",
    fontSize: 11,
    lineHeight: 16,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    marginBottom: 20,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#666",
  },
  rejectButtonText: {
    color: "#999",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#00FF88",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#00FF88",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  acceptButtonText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerWarning: {
    backgroundColor: "rgba(255, 193, 7, 0.1)",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFC107",
  },
  footerText: {
    color: "#FFC107",
    fontSize: 9,
    textAlign: "center",
    lineHeight: 12,
  },
});
