import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useRouter, Stack } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

const PrivacyScreen = () => {
  const [hideLocation, setHideLocation] = useState(true);
  const [hideVideos, setHideVideos] = useState(true);
  const [hideYourself, setHideYourself] = useState(true);
  const [hideActiveTime, setHideActiveTime] = useState(true);
  const [closeScreenshots, setCloseScreenshots] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Privacy Policy",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      />

      {/* Privacy Settings */}
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Hide location</Text>
            <Text style={styles.optionSubText}>
              After turning this on, your location won’t appear in Profile or
              your LIVE notification
            </Text>
          </View>
          <Switch
            value={hideLocation}
            onValueChange={setHideLocation}
            thumbColor={hideLocation ? "#F1567D" : "#ccc"}
            trackColor={{ false: "#ddd", true: "#fcc" }}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Hide your videos in Nearby</Text>
            <Text style={styles.optionSubText}>
              After turning this on, your video won’t appear in Nearby
            </Text>
          </View>
          <Switch
            value={hideVideos}
            onValueChange={setHideVideos}
            thumbColor={hideVideos ? "#F1567D" : "#ccc"}
            trackColor={{ false: "#ddd", true: "#fcc" }}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Hide yourself in Nearby</Text>
            <Text style={styles.optionSubText}>
              After turning this on, your won’t appear in Nearby people
            </Text>
          </View>
          <Switch
            value={hideYourself}
            onValueChange={setHideYourself}
            thumbColor={hideYourself ? "#F1567D" : "#ccc"}
            trackColor={{ false: "#ddd", true: "#fcc" }}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Hide your recent active time</Text>
            <Text style={styles.optionSubText}>
              After turning this on, others won’t see your recent active time
            </Text>
          </View>
          <Switch
            value={hideActiveTime}
            onValueChange={setHideActiveTime}
            thumbColor={hideActiveTime ? "#F1567D" : "#ccc"}
            trackColor={{ false: "#ddd", true: "#fcc" }}
          />
        </View>

        <View style={styles.option}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Close screenshots in Profile</Text>
            <Text style={styles.optionSubText}>
              After turning this on, others could not download or screenshot
              your photos in Profile
            </Text>
          </View>
          <Switch
            value={closeScreenshots}
            onValueChange={setCloseScreenshots}
            thumbColor={closeScreenshots ? "#F1567D" : "#ccc"}
            trackColor={{ false: "#ddd", true: "#fcc" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  optionsContainer: {
    paddingVertical: 15,
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
  optionTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  optionSubText: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
});

export default PrivacyScreen;
