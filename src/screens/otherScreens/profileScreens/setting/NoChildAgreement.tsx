import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

const NoChildAgreement = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "No Child Agreement",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>DOZO LIVE Child Safety Policy</Text>
        <Text style={styles.paragraph}>Latest updated: December, 2025</Text>

        <Text style={styles.paragraph}>
          DOZO LIVE has a zero tolerance attitude towards any behavior that would endanger children.
        </Text>

        <Text style={styles.paragraph}>
          When using DOZO LIVE, please be sure to follow the guidelines below.
        </Text>

        <Text style={styles.sectionTitle}>Policies</Text>

        <Text style={styles.sectionTitle}>Age Restriction</Text>
        <Text style={styles.paragraph}>
          • You must be at least 18 years old to use DOZO LIVE.
        </Text>

        <Text style={styles.sectionTitle}>Prohibition of Underage Appearance on the Platform</Text>
        <Text style={styles.paragraph}>
          • It is prohibited to upload images of minors engaged in sexually explicit conduct to DOZO LIVE, including but not limited to photos, videos and computer-generated images.
        </Text>
        <Text style={styles.paragraph}>• Nudity of children is forbidden.</Text>

        <Text style={styles.sectionTitle}>Prohibition of Harmful Acts Involving Minors</Text>
        <Text style={styles.paragraph}>
          Users are prohibited from creating, uploading, or distributing content that promotes the exploitation or abuse of children, such as:
        </Text>
        <Text style={styles.paragraph}>
          • Inappropriate interaction with a child (for example, groping or fondling).
        </Text>
        <Text style={styles.paragraph}>
          • Child grooming (for example, befriending a child online for the purpose of facilitating sexual contact and/or exchanging sexual images with that child, either online or offline).
        </Text>
        <Text style={styles.paragraph}>
          • Sexualization of a minor (for example, images that depict, encourage, or promote the sexual abuse of children, or depict children in a way that could lead to the sexual exploitation of children).
        </Text>
        <Text style={styles.paragraph}>
          • Sextortion (for example, threatening or blackmailing a child by using real or purported access to intimate images of a child).
        </Text>
        <Text style={styles.paragraph}>
          • Trafficking a child (for example, advertising or soliciting a child for commercial sexual exploitation).
        </Text>

        <Text style={styles.sectionTitle}>Commitment to Child Safety</Text>

        <Text style={styles.sectionTitle}>Compliance with Child Safety Laws</Text>
        <Text style={styles.paragraph}>
          DOZO LIVE uses extensive technical, human, and time resources to prevent, detect, remove, and report child sexual exploitation content and conduct. If, upon review, we are informed that content posted by a user contains child sexual abuse content, we will take immediate action against the user who posted the content. These actions may include, but are not limited to: removing illegal content, restricting the posting of user content, suspending accounts, and filing complaints with local authorities.
        </Text>
        <Text style={styles.paragraph}>
          If you find content that may violate the policy, you can also report and complain about the platform's content related to "Child Sexual Abuse and Sexual Exploitation (CSAE)" in DOZO LIVE - "HELP" or send us an email at info@dozolive.com.
        </Text>

        <Text style={styles.sectionTitle}>Additional Resources</Text>
        <Text style={styles.paragraph}>
          If you believe a child is at risk or has been abused, exploited, or trafficked, please contact your local law enforcement agency and your local child welfare organization.
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

export default NoChildAgreement;