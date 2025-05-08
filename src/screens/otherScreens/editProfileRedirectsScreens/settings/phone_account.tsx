import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import Phone from "@/assets/images/svgs/Phone";

const PhoneVerificationScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Phone Verification",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      />

      {/* Phone Number Section */}
      <View style={styles.phoneContainer}>
        <View style={styles.phoneIconContainer}>
          <Phone width={85} height={85} />
        </View>
        <Text style={styles.phoneNumber}>+91 9876543210</Text>
      </View>

      {/* Options */}
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => router.push("/profile/settings/phone_verification")}
      >
        <Ionicons name="call-outline" size={20} color="black" />
        <Text style={styles.optionText}>Change Phone Number</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => router.push("/profile/settings/change_password")}
      >
        <Ionicons name="lock-closed-outline" size={20} color="black" />
        <Text style={styles.optionText}>Change Password</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  phoneContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  phoneIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 50,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PhoneVerificationScreen;
