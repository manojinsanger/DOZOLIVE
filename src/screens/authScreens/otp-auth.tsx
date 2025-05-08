import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initiateOTP, verifyAndLoginWithPhone } from "@/services/userAuth";
import { goBack, redirect } from "@/utils/navigationService";
import customColors from "@/constants/styles";
import { scaleWidth, scaleHeight, scaleFont } from "@/constants/scaling";

export default function OtpAuth() {
  const [phone, setPhone] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [dialCode, setDialCode] = useState<string | null>(null);

  // Correctly typed useRef for TextInput array
  const otpInputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const getPhoneNumber = async () => {
      try {
        const storedPhone = await AsyncStorage.getItem("verifyPhone");
        const storedDialCode = await AsyncStorage.getItem("verifyDialCode");
        setDialCode(storedDialCode);
        setPhone(storedPhone);
      } catch (error) {
        Alert.alert("Error", "Failed to load phone number");
      }
    };
    getPhoneNumber();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }: any, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    Keyboard.dismiss();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }
    try {
      const res = await verifyAndLoginWithPhone(Number(phone), enteredOtp);
      if (res.success) {
        await AsyncStorage.setItem("fbUser", JSON.stringify(res.data.user));
        await AsyncStorage.setItem("userToken", res.data.token);
        // router.replace("/onboard/profile");
        redirect("profileSetup");
      } else {
        Alert.alert("Failed", "OTP Verification Failed!");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong during verification");
    }
  };

  const handleSendOTP = async () => {
    if (!phone || !dialCode) {
      Alert.alert("Error", "Phone number or country code missing");
      return;
    }
    setIsSendingOTP(true);
    try {
      if (dialCode !== "+91") {
        Alert.alert("Restricted", "OTP can only be sent to Indian numbers.");
        return;
      }
      const res = await initiateOTP(Number(phone));
      if (res?.success) {
        setCountdown(60);
        setResendDisabled(true);
        setOtp(["", "", "", "", "", ""]);
        otpInputRefs.current[0]?.focus();
        Alert.alert("Success", "OTP Sent Successfully!");
      } else {
        Alert.alert("Error", "Failed to send OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setIsSendingOTP(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            We sent a code to {phone ? `${dialCode} ${phone}` : "Loading..."}
            <Text style={styles.wrongNumber} onPress={() => goBack()}>
              {" Wrong number?"}
            </Text>
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, digit ? styles.otpInputFilled : styles.otpInputEmpty]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => {
                otpInputRefs.current[index] = ref; // Fixed ref assignment
              }}
              autoFocus={index === 0}
              textContentType="oneTimeCode"
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isSendingOTP && styles.buttonDisabled]}
          onPress={handleVerifyOTP}
          disabled={isSendingOTP}
        >
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={resendDisabled || isSendingOTP} onPress={handleSendOTP}>
          <Text
            style={[styles.timer, !resendDisabled && styles.resendText, isSendingOTP && styles.disabledText]}
          >
            {isSendingOTP
              ? "Sending OTP..."
              : countdown > 0
                ? `Resend in 00:${countdown < 10 ? `0${countdown}` : countdown}`
                : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
    paddingTop: StatusBar.currentHeight || scaleHeight(20),
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scaleWidth(24),
  },
  titleContainer: {
    marginBottom: scaleHeight(32),
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(32),
    fontWeight: "700",
    color: customColors.gray800,
    fontFamily: "DMSans",
    marginBottom: scaleHeight(8),
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: customColors.gray600,
    textAlign: "center",
    fontFamily: "DMSans",
    lineHeight: scaleHeight(24),
  },
  wrongNumber: {
    color: customColors.primary,
    fontWeight: "600",
    fontFamily: "DMSans",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scaleWidth(300),
    marginBottom: scaleHeight(40),
  },
  otpInput: {
    width: scaleWidth(44),
    height: scaleHeight(56),
    borderRadius: 12,
    textAlign: "center",
    fontSize: scaleFont(24),
    fontFamily: "DMSans",
    backgroundColor: customColors.gray100,
    color: customColors.gray800,
  },
  otpInputFilled: {
    borderWidth: 2,
    borderColor: customColors.primary,
  },
  otpInputEmpty: {
    borderWidth: 1,
    borderColor: customColors.gray300,
  },
  button: {
    backgroundColor: customColors.primary,
    width: scaleWidth(300),
    paddingVertical: scaleHeight(16),
    borderRadius: 12,
    alignItems: "center",
    marginBottom: scaleHeight(16),
  },
  buttonDisabled: {
    backgroundColor: customColors.gray400,
  },
  buttonText: {
    color: customColors.white,
    fontSize: scaleFont(18),
    fontWeight: "600",
    fontFamily: "DMSans",
  },
  timer: {
    fontSize: scaleFont(16),
    color: customColors.gray600,
    fontFamily: "DMSans",
  },
  resendText: {
    color: customColors.primary,
    fontWeight: "600",
  },
  disabledText: {
    color: customColors.gray400,
  },
});