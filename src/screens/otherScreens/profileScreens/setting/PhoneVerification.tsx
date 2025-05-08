import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet 
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const PhoneVerificationScreen = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const handleResend = () => {
    setTimer(60);
    setResendDisabled(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Phone Verification",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}

      {/* Phone Number Display */}
      <Text style={styles.infoText}>A verification code is sent to you</Text>
      <Text style={styles.phoneNumber}>+91 9876543210</Text>

      {/* Verification Code Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Verification Code"
          placeholderTextColor="#1f1f1f"
          value={code}
          onChangeText={setCode}
          maxLength={6}
        />
        <TouchableOpacity 
          disabled={isResendDisabled} 
          onPress={handleResend}
        >
          <Text style={[styles.resendText, isResendDisabled && styles.disabled]}>
            Resend {isResendDisabled ? `(${timer})` : ""}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} disabled={code.length !== 6}>
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  infoText: {
    textAlign: "center",
    fontSize: 14,
    color: "#1f1f1f",
    marginTop: 50,
  },
  phoneNumber: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 50,
    paddingBottom: 5,
    paddingTop: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  resendText: {
    fontSize: 14,
    color: "#F1567D",
    fontWeight: "500",
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#F1567D",
    borderRadius: 20,
  },
  disabled: {
    color: "#F1567D",
  },
  nextButton: {
    backgroundColor: "#F1567D",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 60,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PhoneVerificationScreen;
