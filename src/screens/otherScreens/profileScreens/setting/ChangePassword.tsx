import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secureOld, setSecureOld] = useState(true);
  const [secureNew, setSecureNew] = useState(true);

  const isButtonEnabled = oldPassword.length > 0 && newPassword.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Change Password",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={secureOld}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureOld(!secureOld)}
        >
          <Ionicons
            name={secureOld ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={secureNew}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureNew(!secureNew)}
        >
          <Ionicons
            name={secureNew ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, isButtonEnabled && styles.buttonEnabled]}
        disabled={!isButtonEnabled}
      >
        <Text
          style={[
            styles.buttonText,
            isButtonEnabled && styles.buttonTextEnabled,
          ]}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonEnabled: {
    backgroundColor: "#F1567D",
  },
  buttonText: {
    color: "#888",
    fontSize: 16,
  },
  buttonTextEnabled: {
    color: "#fff",
  },
});

export default ChangePassword;
