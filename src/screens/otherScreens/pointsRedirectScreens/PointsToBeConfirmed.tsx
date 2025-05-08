import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
    TextInput
} from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader';
// import { TextInput } from 'react-native-gesture-handler';
import beansIcon from "@/assets/images/bean.png"
import { scaleHeight, scaleWidth } from '@/constants/scaling';
import ThemedText from '@/components/ThemedText';

// Define TypeScript interfaces for our data
interface PointEntry {
    date: string;
    toBeConfirmed: number;
    confirmed: number;
}

// Component for the circle with number
interface CircleNumberProps {
    value: number;
    color: string;
}

const CircleNumber: React.FC<CircleNumberProps> = ({ value, color }) => {
    return (
        <View style={[styles.circleContainer, { backgroundColor: color }]}>
            <ThemedText style={styles.circleText}>{value}</ThemedText>
        </View>
    );
};

// Component for each point entry row
interface PointRowProps {
    label: string;
    value: number;
    isPrimary?: boolean;
}

const PointRow: React.FC<PointRowProps> = ({ label, value, isPrimary = false }) => {
    return (
        <View style={styles.pointRow}>
            <ThemedText style={isPrimary ? styles.primaryLabel : styles.label}>{label}</ThemedText>
            <View style={styles.pointRow}>
                <Image style={styles.beanIcon} source={beansIcon} />
                <ThemedText style={{fontSize: 16, }}>0</ThemedText>
            </View>
        </View>
    );
};

// Component for date section
interface DateSectionProps {
    entry: PointEntry;
}

const DateSection: React.FC<DateSectionProps> = ({ entry }) => {
    return (
        <View style={styles.dateSection}>
            <ThemedText style={styles.dateText}>{entry.date}</ThemedText>
            <PointRow label="to be confirmed:" value={entry.toBeConfirmed} />
            <TextInput placeholder='to be confirmed:' style={styles.inputBox} keyboardType='numeric' />
            <PointRow label="Confirmed:" value={entry.confirmed} isPrimary={true} />
        </View>
    );
};

const PointsConfirmationScreen = () => {
    // Mock data based on the image
    const pointEntries: PointEntry[] = [
        { date: '2025-04-10', toBeConfirmed: 0, confirmed: 0 },
        { date: '2025-04-09', toBeConfirmed: 0, confirmed: 0 },
        { date: '2025-04-08', toBeConfirmed: 0, confirmed: 0 },
        { date: '2025-04-07', toBeConfirmed: 0, confirmed: 0 },
        { date: '2025-04-06', toBeConfirmed: 0, confirmed: 0 },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title='Details' />

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.infoBox}>
                    <ThemedText style={styles.infoText}>
                        Points to be confirmed: The system will check the security of the source of points to be confirmed. It is expected that hosts can withdraw the points after 3 days.
                    </ThemedText>
                </View>
                {pointEntries.map((entry, index) => (
                    <DateSection key={index} entry={entry} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: "white"
    },
    infoBox: {
        backgroundColor: '#f0f0ff',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    infoText: {
        color: '#333',
        fontSize: 14,
        lineHeight: 20,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: "rgba(233, 231, 231, 0.3)"
    },
    inputBox: {
        borderBottomColor: 'rgba(233, 231, 231, 0.3)',
        borderBottomWidth: 2,
    },
    dateSection: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        marginInline: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    dateText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    pointRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    label: {
        color: '#999',
        fontSize: 15,
    },
    primaryLabel: {
        color: '#8169e5',
        fontSize: 15,
        fontWeight: '500',
    },
    circleContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 70,
        marginBottom: 12,
        borderRadius: 8,
    },
    beanIcon: {
        width: scaleWidth(14),
        height: scaleHeight(14),
        marginRight: scaleWidth(4),
        resizeMode: 'contain'
    },
    footerText: {
        color: 'white',
        fontWeight: '500',
    },
});

export default PointsConfirmationScreen;