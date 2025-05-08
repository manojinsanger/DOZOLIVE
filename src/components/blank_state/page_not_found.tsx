import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const NoInternetConnectionScreen = () => {
  const [fontsLoaded] = useFonts({
    "DM-Sans": require("../../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      {/* Empty State Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/blank_state/page_not_found.png")} // Update with the correct file name
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <Text style={[styles.title, { fontFamily: "DM-Sans" }]}>Page not found!</Text>
      <Text style={[styles.subtitle, { fontFamily: "DM-Sans" }]}>
      We’re sorry, the page you requested could not be found. Please go back to homepage.
      </Text>

      {/* Try Again Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
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
    marginTop: 100,
    alignItems: "center",
  },
  image: {
    width: 300, // Adjust size as needed
    height: 300,
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
  button: {
    marginTop: 20,
    backgroundColor: "#F1567D",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NoInternetConnectionScreen;
