import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Twitter from "@/assets/images/svgs/Twitter";
import Instagram from "@/assets/images/svgs/Instagram";
import Google from "@/assets/images/svgs/Google";
import Facebook from "@/assets/images/svgs/Facebook";
import Phone from "@/assets/images/svgs/Phone";

const connectedAccounts = [
  {
    id: "1",
    platform: "Phone",
    icon: Phone,
    username: "+91 9876543210",
    color: "#4CAF50",
  },
  {
    id: "2",
    platform: "Facebook",
    icon: Facebook,
    username: "Akshay Syal",
    color: "#1877F2",
  },
  {
    id: "3",
    platform: "Twitter",
    icon: Twitter,
    username: "Akshay Syal 10",
    color: "#1DA1F2",
  },
  {
    id: "4",
    platform: "Google",
    icon: Google,
    username: "Akshay.syal96",
    color: "#DB4437",
  },
  {
    id: "5",
    platform: "Instagram",
    icon: Instagram,
    username: "Akshay.syal96",
    color: "#C13584",
  },
];

const ConnectedAccountScreen = () => {
  const router = useRouter();

  const handlePress = (platform: string) => {
    switch (platform) {
      case "Facebook":
        router.push("/profile/settings/facebook_account");
        break;
      case "Twitter":
        router.push("/profile/settings/twitter_account");
        break;
      case "Instagram":
        router.push("/profile/settings/instagram_account");
        break;
      case "Google":
        router.push("/profile/settings/google_account");
        break;
      case "Phone":
        router.push("/profile/settings/phone_account");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Connected Account",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      />

      {/* Connected Accounts List */}
      <FlatList
        data={connectedAccounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.platform)}>
            <View style={styles.accountRow}>
              <item.icon width={28} height={28} fill={item.color} />
              <View style={styles.accountInfo}>
                <Text style={styles.platform}>{item.platform}</Text>
              </View>
              <Text style={styles.username}>{item.username}</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color="#777"
              />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Why to Connect Account?</Text>
        <Text style={styles.infoText}>
          • Connect to Phone is recommended to protect your Yeah! Live account.
        </Text>
        <Text style={styles.infoText}>
          • Your connected phone will be used to receive verification codes when
          account settings change.
        </Text>
        <Text style={styles.infoText}>
          • Once connected, you can easily log in to Yeah! Live with any
          connected account from anywhere.
        </Text>
        <Text style={styles.infoText}>
          • You can set to show your social account on your profile.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 5,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  accountInfo: {
    flex: 1,
    marginLeft: 20,
  },
  platform: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f1f1f",
  },
  username: {
    fontSize: 16,
    color: "#777",
    marginRight: 10,
  },
  infoSection: {
    padding: 25,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
});

export default ConnectedAccountScreen;
