import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";


const HelpUs = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Help Us Translate",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Help Us</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          tortor augue, suscipit a eleifend eu, dignissim sollicitudin purus.
          Proin eget ante consectetur, sagittis eros in, consectetur dui.
          Vestibulum sollicitudin diam et diam lacinia, a porta augue dapibus.
          Duis varius lorem vel elit molestie, nec dignissim velit cursus.
          Phasellus at blandit tellus. Duis vel metus eu turpis lobortis
          iaculis. Pellentesque id nisl aliquet, suscipit magna fermentum,
          tristique arcu.
        </Text>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          tortor augue, suscipit a eleifend eu, dignissim sollicitudin purus.
          Proin eget ante consectetur, sagittis eros in, consectetur dui.
          Vestibulum sollicitudin diam et diam lacinia, a porta augue dapibus.
          Duis varius lorem vel elit molestie, nec dignissim velit cursus.
          Phasellus at blandit tellus. Duis vel metus eu turpis lobortis
          iaculis. Pellentesque id nisl aliquet, suscipit magna fermentum,
          tristique arcu.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f1f1f",
  },
  paragraph: {
    fontSize: 16,
    color: "#777777",
    lineHeight: 24,
    marginBottom: 18,
  },
});

export default HelpUs;
