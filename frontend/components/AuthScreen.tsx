import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  onClose: () => void;
  visible: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const isSmallDevice = SCREEN_WIDTH < 375;

export default function AuthScreen({
  onAuthSuccess,
  onClose,
  visible,
}: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-hide error message after 3 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  const { login, register } = useAuth();

  // Reset form data when modal opens or closes
  React.useEffect(() => {
    if (visible) {
      setLoginData({
        phone: "",
        password: "",
      });
      setRegisterData({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
      });
      setLoading(false);
      setIsLogin(true); // Default to login tab
    }
  }, [visible]);

  // Login form state
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const result = await login(loginData);

      if (result.success && result.user) {
        // Show success message
        setError('✅ Login Successful! Redirecting...');

        // Close modal and redirect after 2 seconds
        setTimeout(() => {
          onClose();
          onAuthSuccess(result.user);
        }, 2000);
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. कृपया अपना internet connection check करें।");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      console.log('[REGISTER] Starting registration with data:', registerData);

      const result = await register(registerData);
      console.log('[REGISTER] Registration result:', result);

      if (result.success && result.user) {
        // Show success message
        setError('✅ Registration Successful! Redirecting...');

        // Close modal and redirect after 2 seconds
        setTimeout(() => {
          onClose();
          onAuthSuccess({ ...result.user, isNewUser: true });
        }, 2000);
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('[REGISTER] Registration error:', error);
      setError("Network error। कृपया अपना internet connection check करें।");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>
                {isLogin ? "🔐 Login करें" : "📝 Register करें"}
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tab, isLogin && styles.activeTab]}
                  onPress={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                >
                  <Text
                    style={[styles.tabText, isLogin && styles.activeTabText]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, !isLogin && styles.activeTab]}
                  onPress={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                >
                  <Text
                    style={[styles.tabText, !isLogin && styles.activeTabText]}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Error will be shown above buttons now */}

              {isLogin ? (
                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>
                    अपने Account में Login करें
                  </Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>📱 Mobile Number</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="10 digit mobile number"
                      placeholderTextColor="#666"
                      value={loginData.phone}
                      onChangeText={(text) => {
                        setLoginData({ ...loginData, phone: text });
                        if (error) setError('');
                      }}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>🔒 Password</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#666"
                      value={loginData.password}
                      onChangeText={(text) => {
                        setLoginData({ ...loginData, password: text });
                        if (error) setError('');
                      }}
                      secureTextEntry
                    />
                  </View>

                  {/* Error/Success message above button */}
                  {error ? (
                    <View style={error.includes('✅') ? styles.successContainerAboveButton : styles.errorContainerAboveButton}>
                      <Text style={error.includes('✅') ? styles.successTextAboveButton : styles.errorTextAboveButton}>
                        {error.includes('✅') ? error : `❌ ${error}`}
                      </Text>
                    </View>
                  ) : null}

                  <TouchableOpacity
                    style={[
                      styles.authButton,
                      loading && styles.authButtonDisabled,
                    ]}
                    onPress={handleLogin}
                    disabled={loading}
                  >
                    <Text style={styles.authButtonText}>
                      {loading ? "Login हो रहा है..." : "🚀 Login करें"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>
                      Password भूल गए?
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>नया Account बनाएं</Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>👤 Full Name *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your full name"
                      placeholderTextColor="#666"
                      value={registerData.name}
                      onChangeText={(text) => {
                        setRegisterData({ ...registerData, name: text });
                        if (error) setError('');
                      }}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>📱 Mobile Number *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="10 digit mobile number"
                      placeholderTextColor="#666"
                      value={registerData.phone}
                      onChangeText={(text) => {
                        setRegisterData({ ...registerData, phone: text });
                        if (error) setError('');
                      }}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>📧 Email (Optional)</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your email"
                      placeholderTextColor="#666"
                      value={registerData.email}
                      onChangeText={(text) =>
                        setRegisterData({ ...registerData, email: text })
                      }
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>🔒 Password *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Minimum 6 characters"
                      placeholderTextColor="#666"
                      value={registerData.password}
                      onChangeText={(text) =>
                        setRegisterData({ ...registerData, password: text })
                      }
                      secureTextEntry
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>🔒 Confirm Password *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Re-enter your password"
                      placeholderTextColor="#666"
                      value={registerData.confirmPassword}
                      onChangeText={(text) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: text,
                        })
                      }
                      secureTextEntry
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>
                      🎁 Referral Code (Optional)
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter referral code"
                      placeholderTextColor="#666"
                      value={registerData.referralCode}
                      onChangeText={(text) =>
                        setRegisterData({
                          ...registerData,
                          referralCode: text.toUpperCase(),
                        })
                      }
                      autoCapitalize="characters"
                    />
                  </View>

                  {/* Error/Success message above button */}
                  {error ? (
                    <View style={error.includes('✅') ? styles.successContainerAboveButton : styles.errorContainerAboveButton}>
                      <Text style={error.includes('✅') ? styles.successTextAboveButton : styles.errorTextAboveButton}>
                        {error.includes('✅') ? error : `❌ ${error}`}
                      </Text>
                    </View>
                  ) : null}

                  <TouchableOpacity
                    style={[
                      styles.authButton,
                      loading && styles.authButtonDisabled,
                    ]}
                    onPress={handleRegister}
                    disabled={loading}
                  >
                    <Text style={styles.authButtonText}>
                      {loading ? "Account बन रहा है..." : "✨ Account बनाएं"}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>
                      By registering, you agree to our Terms & Conditions
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  keyboardAvoidingView: {
    width: "100%",
    maxWidth: isSmallDevice ? 340 : 380,
    maxHeight: SCREEN_HEIGHT * 0.85,
  },
  modalContainer: {
    backgroundColor: "rgba(10, 10, 10, 0.95)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#00FF88",
    overflow: "hidden",
    shadowColor: "#00FF88",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    // backdropFilter: 'blur(10px)',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(26, 26, 26, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#00FF88",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00FF88",
    flex: 1,
  },
  closeButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  scrollContainer: {
    flex: 1,
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  scrollContent: {
    paddingBottom: 30,
    flexGrow: 1,
  },
  tabContainer: {
    flexDirection: "row",
    margin: 12,
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: "#00FF88",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#00FF88",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999999",
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "700",
  },
  formContainer: {
    padding: 12,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00FF88",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: "#ffffff",
    minHeight: 40,
  },
  authButton: {
    backgroundColor: "#00FF88",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#00FF88",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  authButtonDisabled: {
    opacity: 0.6,
  },
  authButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#4A90E2",
    fontSize: 12,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  termsContainer: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  termsText: {
    color: "#999999",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 10,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  errorContainerAboveButton: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    marginTop: 5,
  },
  errorTextAboveButton: {
    color: "#FF6B6B",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  successContainerAboveButton: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderWidth: 1,
    borderColor: '#00FF88',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    marginTop: 5,
  },
  successTextAboveButton: {
    color: '#00FF88',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333333",
  },
  dividerText: {
    color: "#666666",
    fontSize: 12,
    paddingHorizontal: 15,
    fontWeight: "600",
  },
  testLoginButton: {
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    borderWidth: 1,
    borderColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
});