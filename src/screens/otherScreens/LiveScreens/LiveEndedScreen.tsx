import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import {
    scaleWidth,
    scaleHeight,
    scaleFont,
    fullWidth,
} from '../../../constants/scaling';
import CustomHeader from '@/components/profile/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import ThemedText from '@/components/ThemedText';

// Define types for the stream summary data
interface StreamSummaryData {
    username: string;
    wonPoints: number;
    newFollowers: number;
    hoursOfLiveStreaming: string;
    liveDurationOfToday: string;
    partyDurationOfToday: string;
    audiences: number;
}

// Sample data based on the screenshot
const streamData: StreamSummaryData = {
    username: 'Ueco',
    wonPoints: 0,
    newFollowers: 2,
    hoursOfLiveStreaming: '00:00:26',
    liveDurationOfToday: '00:00:30',
    partyDurationOfToday: '00:00:00',
    audiences: 2,
};

const LiveStreamEndScreen: React.FC = () => {

    return (
        <MainContainer>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#080E21" />
                <CustomHeader title='Stream Ended' textColor='white' />

                <View style={{ paddingHorizontal: 16 }}>
                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.profileImageContainer}>
                            {/* <Image
                                source={{ uri: user.profileImage }}
                                style={styles.profileImage}
                            /> */}
                        </View>
                        <ThemedText style={styles.username}>{streamData.username}</ThemedText>
                        <ThemedText style={styles.liveEndedText}>Live ended</ThemedText>
                    </View>

                    {/* Stats Section 1 */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <View style={styles.statIconContainer}>
                                <ThemedText style={styles.statIcon}>$</ThemedText>
                            </View>
                            <ThemedText style={styles.statLabel}>Won points</ThemedText>
                            <ThemedText style={styles.statValue}>{streamData.wonPoints}</ThemedText>
                        </View>

                        <View style={styles.statItem}>
                            <View style={styles.statIconContainer}>
                                <ThemedText style={styles.statIcon}>👥</ThemedText>
                            </View>
                            <ThemedText style={styles.statLabel}>New followers</ThemedText>
                            <ThemedText style={styles.statValue}>{streamData.newFollowers}</ThemedText>
                        </View>
                    </View>

                    {/* Stats Section 2 */}
                    <View
                        
                        style={styles.statsContainer}>
                        <View style={styles.topRow}>
                            <View style={styles.statItem}>
                                <ThemedText style={styles.statLabel}>Hours of Live Streaming</ThemedText>
                                <ThemedText style={styles.statValue}>{streamData.hoursOfLiveStreaming}</ThemedText>
                            </View>

                            <View style={styles.statItem}>
                                <ThemedText style={styles.statLabel}>Live Duration of Today</ThemedText>
                                <ThemedText style={styles.statValue}>{streamData.liveDurationOfToday}</ThemedText>
                            </View>
                        </View>

                        <View style={styles.topRow}>
                            <View style={styles.statItem}>
                                <ThemedText style={styles.statLabel}>Party Duration of Today</ThemedText>
                                <ThemedText style={styles.statValue}>{streamData.partyDurationOfToday}</ThemedText>
                            </View>

                            <View style={styles.statItem}>
                                <ThemedText style={styles.statLabel}>Audiences</ThemedText>
                                <ThemedText style={styles.statValue}>{streamData.audiences}</ThemedText>
                            </View>
                        </View>

                    </View>

                    {/* Confirm Button */}
                </View>
                <TouchableOpacity style={{marginTop: 'auto'}} >
                    <LinnerGradientCard customStyles={styles.confirmButton}>

                    <ThemedText style={styles.confirmText}>Confirm</ThemedText>
                    </LinnerGradientCard>
                </TouchableOpacity>
            </SafeAreaView>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#080E21', // Dark blue background
        paddingTop: StatusBar.currentHeight,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: scaleHeight(30),
    },
    profileImageContainer: {
        width: scaleWidth(80),
        height: scaleWidth(80),
        borderRadius: scaleWidth(40),
        backgroundColor: '#1A2039',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: scaleHeight(10),
    },
    profileImage: {
        width: scaleWidth(80),
        height: scaleWidth(80),
        borderRadius: scaleWidth(40),
    },
    topRow: {
        height: 180,
    },
    username: {
        color: 'white',
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        marginBottom: scaleHeight(5),
    },
    liveEndedText: {
        color: '#d4d5d8',
        fontSize: scaleFont(16),
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(30, 40, 70, 0.5)',
        borderRadius: scaleWidth(12),
        overflow: 'hidden',
        marginBottom: scaleHeight(12),
        paddingVertical: scaleHeight(20),
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statIconContainer: {
        width: scaleWidth(40),
        height: scaleWidth(40),
        borderRadius: scaleWidth(20),
        backgroundColor: '#2A3246',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: scaleHeight(8),
    },
    statIcon: {
        fontSize: scaleFont(18),
        color: '#d4d5d8'
    },
    statLabel: {
        color: '#b3b3b4',
        fontSize: scaleFont(14),
        marginBottom: scaleHeight(5),
        paddingHorizontal: scaleWidth(20),
        maxWidth: scaleWidth(180)

    },
    statValue: {
        color: 'white',
        fontSize: scaleFont(18),
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#5468FF',
        borderRadius: scaleWidth(30),
        height: scaleHeight(48),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: scaleHeight(50),
        marginHorizontal: 20
    },
    confirmText: {
        color: 'white',
        fontSize: scaleFont(16),
        fontWeight: 'bold',
    },
});

export default LiveStreamEndScreen;