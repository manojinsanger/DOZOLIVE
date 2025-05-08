import { scaleFont } from "@/constants/scaling";
import customColors from "@/constants/styles";
import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
} from "react-native";

const RulesPage = () => {
    return (
        <View style={styles.container}>
            {/* Header
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Agent Level",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}

            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                <Text style={{ fontSize: scaleFont(18), color: customColors.gray800 }}>
                    Agent Level
                </Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.sectionTitle}>RULE</Text>

                <Text style={styles.paragraph}>1. The agent's commission ratio fluctuates according to the total earnings of the last 30 days. The total earnings in the last 30 days consist of two parts:</Text>
                <Text style={styles.paragraph}>a. All host's total income in the last 30 days</Text>
                <Text style={styles.paragraph}>b. The total income of all invite agents in the last 30 days</Text>

                <Text style={styles.note}>Note: The agency earnings consist of the host's income from video and voice calls, text chats, and gifts, and do not include rewards such as tasks and rankings issued by the platform.</Text>
                <Text style={styles.note}>Note: If the agent was not active for ≥7 days or was banned (including temporarily banned), the agent's commission will not be counted.</Text>

                <Text style={styles.paragraph}>2. The agency commission consists of two parts:</Text>
                <Text style={styles.paragraph}>a. Host: Agent's corresponding commission rate * Host's performance</Text>
                <Text style={styles.paragraph}>b. Invite agent: (Agency Commission Rate - Commission rate for invite agents) * Invite agent earnings</Text>
                <Text style={styles.note}>Note: The commission will be issued to the points account in real-time.</Text>

                <Text style={styles.sectionTitle}>Agent Commission Rate</Text>
                <View style={styles.table}>
                    <View style={styles.rowHeader}>
                        <Text style={styles.cellHeader}>Level</Text>
                        <Text style={styles.cellHeader}>Earnings (30 Days)</Text>
                        <Text style={styles.cellHeader}>Live</Text>
                        <Text style={styles.cellHeader}>Match and Chat</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>D</Text>
                        <Text style={styles.cell}>0</Text>
                        <Text style={styles.cell}>4%</Text>
                        <Text style={styles.cell}>4%</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>C</Text>
                        <Text style={styles.cell}>2,000,000</Text>
                        <Text style={styles.cell}>8%</Text>
                        <Text style={styles.cell}>8%</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>B</Text>
                        <Text style={styles.cell}>10,000,000</Text>
                        <Text style={styles.cell}>12%</Text>
                        <Text style={styles.cell}>12%</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>A</Text>
                        <Text style={styles.cell}>50,000,000</Text>
                        <Text style={styles.cell}>16%</Text>
                        <Text style={styles.cell}>16%</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>S</Text>
                        <Text style={styles.cell}>150,000,000</Text>
                        <Text style={styles.cell}>20%</Text>
                        <Text style={styles.cell}>20%</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop:StatusBar.currentHeight,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 25,
        paddingBottom: 50,
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
    note: {
        fontSize: 14,
        color: "#800000",
        lineHeight: 22,
        marginBottom: 16,
    },
    table: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        overflow: "hidden",
    },
    rowHeader: {
        flexDirection: "row",
        backgroundColor: "#f1f1f1",
        paddingVertical: 8,
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 8,
    },
    cellHeader: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
});

export default RulesPage;
