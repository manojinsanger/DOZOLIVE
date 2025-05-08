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

const aboutItems = [
  { id: "1", title: "Privacy Policy" },
  { id: "2", title: "Terms Of Service" },
  { id: "3", title: "Live Agreement" },
  { id: "4", title: "User Recharge Agreement" },
  { id: "5", title: "No Child Engangement Policy" },
];

const AboutUsScreen = () => {
  const router = useRouter();

  const handlePress = (title: string) => {
    let route: string | undefined;

    if (title === "Privacy Policy") {
      route = "/profile/settings/privacy_policy";
    } else if (title === "Terms Of Service") {
      route = "/profile/settings/user_agreement";
    } else if (title === "Live Agreement") {
      route = "/profile/settings/broadcaster_agreement";
    } else if (title === "User Recharge Agreement") {
      route = "/profile/settings/user_recharge_agreement";
    } else if (title === "No Child Engangement Policy") {
      route = "/profile/settings/no_child_agreement";
    }

    if (route) {
      router.push(route as any); // 👈 Cast as 'any' to bypass TypeScript error
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "About Us",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      />

      <View>
        
      </View>

      {/* List of About Items */}
      <FlatList
        data={aboutItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handlePress(item.title)}
          >
            <Text style={styles.itemText}>{item.title}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={28} color="#777" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
});

export default AboutUsScreen;
