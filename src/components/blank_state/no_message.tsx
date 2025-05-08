import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const NoMessageScreen = () => {

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Message",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      /> */}

      {/* Empty State Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/blank_state/no_message.png")} // Update with the correct file name
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <Text style={[styles.title, { fontFamily: "DM-Sans" }]}>
        You’ve got no message
      </Text>
      <Text style={[styles.subtitle, { fontFamily: "DM-Sans" }]}>
        No messages in your inbox, yet! Start chatting with people around you.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    width: 400, // Adjust size as needed
    height: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1f1f1f",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    paddingHorizontal: 40,
    marginTop: 10,
    fontWeight: 400,
    lineHeight: 24,
  },
});

export default NoMessageScreen;
