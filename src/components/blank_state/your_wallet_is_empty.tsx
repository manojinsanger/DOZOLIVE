import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useRouter, Stack } from "expo-router";

const YourWalletIsEmptyScreen = () => {
  const [fontsLoaded] = useFonts({
    "DM-Sans": require("../../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Stack.Screen options={{ headerShadowVisible: false,
        headerTitle: "",
         headerBackVisible: true
        }} />
      <View style={styles.container}>
        {/* Empty State Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/blank_state/your_wallet_is_empty.png")} // Update with the correct file name
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <Text style={[styles.title, { fontFamily: "DM-Sans" }]}>
          Your wallet is empty
        </Text>
        <Text style={[styles.subtitle, { fontFamily: "DM-Sans" }]}>
          Look like there are no credits in your wallet at the moment. Kindly
          purchase more to continue
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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

export default YourWalletIsEmptyScreen;
