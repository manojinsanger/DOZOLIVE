import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";

const BroadcasterAgreement = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Live Agreement",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      />

      {/* Scrollable Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Live Agreement</Text>
        <Text style={styles.paragraph}>
          Latest updated: January, 2025{"\n"}{"\n"}
          This Dozo host agreement (hereinafter referred to as "this Agreement") stipulates the rights and obligations between the company and its affiliated enterprises (hereinafter referred to as "Dozo" or "Dozo platform") and the host (hereinafter referred to as "you") regarding the provision of video / voice live broadcasting services on Dozo platform. Please read this Agreement carefully before the live video / voice broadcast to ensure that you have fully understood the terms of this agreement. You are not entitled to use the services covered by this Agreement unless you accept all the terms of this agreement. Your live video / voice broadcast on Dozo platform will be regarded as your acceptance of this Agreement and agree to be bound by the terms of this agreement.{"\n"}{"\n"}
          1. General Provisions{"\n"}{"\n"}
          1.1 You must be at least 18 years old and have full capacity for civil conduct; or you must be at least 16 years old and live mainly from your own labor income. If you do not meet the above conditions, you should immediately terminate the registration or use.{"\n"}{"\n"}
          1.2 Dozo will provide you with the live video / voice broadcast service of the platform anchor. You can use the above services for performance sharing and online interaction after agreeing to this agreement.{"\n"}{"\n"}
          1.3 According to this Agreement and the rules of the platform, you apply to be the anchor on Dozo platform to provide online video / voice live service for users of Dozo platform and interact with them. The period when you provide services on Dozo platform shall be regarded as within the term of the agreement. Dozo conducts formal audit on the content (including but not limited to pictures, posters, avatars, audio, video, etc.) uploaded by you or edited, produced by you, but you still need to bear corresponding legal responsibilities for the authenticity, legality, accuracy, timeliness, etc. of the above content.{"\n"}{"\n"}
          1.4 In the process of registering or using this service, you need to fill in or submit some necessary information and materials for Dozo platform review. If the information you submit is incomplete or does not comply with the provisions of laws and regulations or Dozo platform, you may not be able to register successfully or be restricted in the process of using this service. If your personal information or contact information changes, you must update it to Dozo in time.{"\n"}{"\n"}
          1.5 Dozo only provides you with online live interactive network platform, you and Dozo do not constitute any employment or labor relationship.{"\n"}{"\n"}
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

export default BroadcasterAgreement;