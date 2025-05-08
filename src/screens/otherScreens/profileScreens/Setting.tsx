import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { redirect } from "@/utils/navigationService";
import SettingPagesHeader from "@/components/profile/SettingPagesHeader";
import { useAuth } from "@/context/AuthProvider";
import ThemedText from "@/components/ThemedText";
import CustomHeader from "@/components/profile/CustomHeader";
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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout, toggleCheckAuthentication } = useAuth()

  const handleLogout = async () => {
    logout()
    toggleCheckAuthentication()
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
          redirect("notification");
        } else if (item.title === "Privacy") {
          redirect("privacy");
        } else if (item.title === "Blocked List") {
          redirect("blockedlist");
        } else if (item.title === "Connected Account") {
          redirect("connectedaccount");
        } else if (item.title === "About Us") {
          redirect("aboutus");
        } else if (item.title === "Help Us Translate") {
          redirect("helpus");
        } else if (item.title === "Log Out") {
          setShowLogoutConfirm(true);
        }
      }}
    >
      <ThemedText style={styles.optionText}>{item.title}</ThemedText>
      {item.unprotected && (
        <View style={styles.unprotectedContainer}>
          <MaterialIcons name="security" size={14} color="#DD4E45" />
          <ThemedText style={styles.unprotectedText}> Unprotected</ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Settings",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}
      <CustomHeader title="Settings" />

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
            <ThemedText style={styles.modalTitle}>Confirm Logout</ThemedText>
            <ThemedText style={styles.modalMessage}>
              Are you sure you want to logout?
            </ThemedText>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutConfirm(false)}
              >
                <ThemedText style={styles.modalButtonText}>No</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <ThemedText style={styles.modalButtonText}>Yes</ThemedText>
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
    paddingTop: StatusBar.currentHeight,
  },
  list: {
    // paddingTop: 15,
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
