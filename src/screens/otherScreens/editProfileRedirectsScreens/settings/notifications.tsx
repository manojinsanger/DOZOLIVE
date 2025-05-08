import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  FlatList,
  Image,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Img1 from '@/assets/images/landing_page/placeholder11.png'
import Img2 from '@/assets/images/landing_page/placeholder12.png'
import Img3 from '@/assets/images/landing_page/placeholder21.png'
import Img4 from '@/assets/images/landing_page/placeholder22.png'
import Img5 from '@/assets/images/landing_page/placeholder32.png'

const initialNotifications = [
  {
    id: "1",
    name: "Jeanette King",
    image: Img1,
    enabled: true,
  },
  {
    id: "2",
    name: "The King",
    image: Img2,
    enabled: false,
  },
  {
    id: "3",
    name: "Akshay Syal",
    image: Img3,
    enabled: true,
  },
  {
    id: "4",
    name: "Wendy Ford",
    image: Img4,
    enabled: true,
  },
  {
    id: "5",
    name: "Jerfro Wind",
    image: Img5,
    enabled: false,
  },
];

const NotificationsScreen = () => {
  const [newFans, setNewFans] = useState(true);
  const [recommended, setRecommended] = useState(true);
  const [liveNotification, setLiveNotification] = useState(true);
  const [userNotifications, setUserNotifications] =
    useState(initialNotifications);

  const toggleUserNotification = (id: string) => {
    setUserNotifications((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, enabled: !user.enabled } : user
      )
    );
  };

  const renderUserItem = ({ item }: { item: { id: string; name: string; image: any; enabled: boolean } }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Image source={item.image} style={styles.avatar} />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      <Switch
        value={item.enabled}
        onValueChange={() => toggleUserNotification(item.id)}
        thumbColor={item.enabled ? "#F1567D" : "#ccc"}
        trackColor={{ false: "#ddd", true: "#fcc" }}
      />
    </View>
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

      {/* Notification Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Message Notification</Text>
      </View>

      <View style={styles.option}>
        <View>
          <Text style={styles.optionText}>New Fans</Text>
          <Text style={styles.optionSubText}>
            Notifies when you have new fans
          </Text>
        </View>
        <Switch
          value={newFans}
          onValueChange={setNewFans}
          thumbColor={newFans ? "#F1567D" : "#ccc"}
          trackColor={{ false: "#ddd", true: "#fcc" }}
        />
      </View>

      <View style={styles.option}>
        <View>
          <Text style={styles.optionText}>Recommended broadcasters</Text>
          <Text style={styles.optionSubText}>
            Recommended broadcasters you may like
          </Text>
        </View>
        <Switch
          value={recommended}
          onValueChange={setRecommended}
          thumbColor={recommended ? "#F1567D" : "#ccc"}
          trackColor={{ false: "#ddd", true: "#fcc" }}
        />
      </View>

      <View style={styles.option}>
        <View>
          <Text style={styles.optionText}>Live Notification</Text>
          <Text style={styles.optionSubText}>
            Turn on to get LIVE notifications
          </Text>
        </View>
        <Switch
          value={liveNotification}
          onValueChange={setLiveNotification}
          thumbColor={liveNotification ? "#F1567D" : "#ccc"}
          trackColor={{ false: "#ddd", true: "#fcc" }}
        />
      </View>

      {/* Users List with Toggles */}
      <FlatList
        data={userNotifications}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#1f1f1f",
  },
  optionSubText: {
    fontSize: 12,
    color: "#777",
  },
  list: {
    paddingTop: 10,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: "#000",
  },
});

export default NotificationsScreen;
