import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader';
import { ThemedView } from '@/components/ThemedView';
import { scaleHeight } from '@/constants/scaling';
import LinnerGradientCardCC from '@/components/common/gradientCards/LinnearGradientCardCC';
import MainContainer from '@/components/common/mainContainers/MainContainer';

// SVG components would be better for the graphics, but creating simpler version with Image
const ScamAlert = () => {
    return (
        <MainContainer >
            <ThemedView style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    translucent={true}
                />
                <CustomHeader title='Scam Alert' rightHeader="Details" textColor='white' />

                {/* Alert Card */}
                <ThemedView style={styles.card}>
                    <View style={styles.alertCard}>
                        <Text style={styles.alertTitle}>Scam Prevention Alert</Text>

                        <Text style={styles.introText}>
                            Please follow the reminders below to avoid financial losses by scams.
                        </Text>

                        <View style={styles.reminderItem}>
                            <Text style={styles.reminderNumber}>1.</Text>
                            <Text style={styles.reminderText}>All users should use their own information for withdrawal</Text>
                        </View>

                        <View style={styles.reminderItem}>
                            <Text style={styles.reminderNumber}>2.</Text>
                            <Text style={styles.reminderText}>The platform does not support any gift trading between users</Text>
                        </View>

                        <View style={styles.reminderItem}>
                            <Text style={styles.reminderNumber}>3.</Text>
                            <Text style={styles.reminderText}>Please look for the authorized Coinsellers for offline coin recharge</Text>
                        </View>

                        <View style={styles.reminderItem}>
                            <Text style={styles.reminderNumber}>4.</Text>
                            <Text style={styles.reminderText}>Please confirm the payment before making the coin transactions</Text>
                        </View>
                    </View>
                </ThemedView>
            </ThemedView>
        </MainContainer>
    );
};

// Type-safe styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: '#ffffff',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: scaleHeight(-100),
    },
    alertCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0099ff',
        textAlign: 'center',
        marginBottom: 20,
    },
    introText: {
        fontSize: 16,
        color: '#4a86c5',
        lineHeight: 24,
        marginBottom: 16,
    },
    reminderItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    reminderNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4a86c5',
        marginRight: 8,
    },
    reminderText: {
        flex: 1,
        fontSize: 16,
        color: '#4a86c5',
        lineHeight: 24,
    },
});

export default ScamAlert;