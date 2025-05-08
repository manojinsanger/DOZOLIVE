import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Twitter from "@/assets/images/svgs/Twitter";

const TwitterAccountScreen = () => {

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Twitter",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}

      {/* Twitter Profile */}
      <View style={styles.profileContainer}>
        <Twitter width={85} height={85} />
        <Text style={styles.profileName}>Eren Yeager</Text>
      </View>

      {/* Disconnect Button */}
      <TouchableOpacity style={styles.disconnectButton}>
        <Text style={styles.disconnectText}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
  },
  disconnectButton: {
    marginTop: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  disconnectText: {
    fontSize: 16,
    color: "#1f1f1f",
  },
});

export default TwitterAccountScreen;
