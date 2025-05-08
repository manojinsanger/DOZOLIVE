import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const settingsOptions = [
  { id: "1", title: "Notifications" },
  { id: "2", title: "Privacy" },
  { id: "3", title: "Blocked List" },
  { id: "4", title: "Connected Account", unprotected: true },
  { id: "5", title: "About Us" },
  { id: "6", title: "Help Us Translate" },
  { id: "7", title: "Clean Cache" },
  { id: "8", title: "Log Out" },
];

const SettingsScreen = () => {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async() => {
    setShowLogoutConfirm(false);
    await AsyncStorage.clear();
    router.replace('/onboard/auth')
  };

  const renderItem = ({
    item,
  }: {
    item: { id: string; title: string; unprotected?: boolean };
  }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        if (item.title === "Notifications") {
          router.push("/profile/settings/notifications");
        } else if (item.title === "Privacy") {
          router.push("/profile/settings/privacy");
        } else if (item.title === "Blocked List") {
          router.push("/profile/settings/blocked_list");
        } else if (item.title === "Connected Account") {
          router.push("/profile/settings/connected_account");
        } else if (item.title === "About Us") {
          router.push("/profile/settings/about_us");
        } else if (item.title === "Help Us Translate") {
          router.push("/profile/settings/help_us");
        } else if (item.title === "Log Out") {
          setShowLogoutConfirm(true);
        }
      }}
    >
      <Text style={styles.optionText}>{item.title}</Text>
      {item.unprotected && (
        <View style={styles.unprotectedContainer}>
          <MaterialIcons name="security" size={14} color="#DD4E45" />
          <Text style={styles.unprotectedText}> Unprotected</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Settings",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      />

      {/* Settings List */}
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Logout Confirmation */}
      <Modal
        transparent={true}
        visible={showLogoutConfirm}
        animationType="slide"
        onRequestClose={() => setShowLogoutConfirm(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutConfirm(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingTop: 15,
  },
  option: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#1f1f1f",
  },
  unprotectedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unprotectedText: {
    color: "#DD4E45",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#fff",
  },
  confirmButton: {
    backgroundColor: "#fff",
  },
  modalButtonText: {
    color: "#f1567D",
    fontSize: 16,
  },
});

export default SettingsScreen;
