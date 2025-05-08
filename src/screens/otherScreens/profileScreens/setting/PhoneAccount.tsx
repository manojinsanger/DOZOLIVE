import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import Phone from "@/assets/images/svgs/Phone";

import { redirect } from "@/utils/navigationService"; // adjust the path if needed

const PhoneAccount = () => {
  return (
    <View style={styles.container}>
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
        onPress={() => redirect("PhoneVerification")}
      >
        <Ionicons name="call-outline" size={20} color="black" />
        <Text style={styles.optionText}>Change Phone Number</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => redirect("ChangePassword")}
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

export default PhoneAccount;
