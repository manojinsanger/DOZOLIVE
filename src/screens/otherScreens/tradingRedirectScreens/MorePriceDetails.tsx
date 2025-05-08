import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import dollarIcon from '@/assets/images/icon/loyalty.png';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import CustomHeader from '@/components/profile/CustomHeader';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';


const priceData = {
    agentToUsers: [
        { dollar: 3, rupee: 270, coin: 26400, exchangeRate: 8800 },
        { dollar: 10, rupee: 900, coin: 88000, exchangeRate: 8800 },
        { dollar: 30, rupee: 2700, coin: 264000, exchangeRate: 8800 },
        { dollar: 50, rupee: 4500, coin: 440000, exchangeRate: 8800 },
        { dollar: 100, rupee: 9000, coin: 880000, exchangeRate: 8800 },
        { dollar: 200, rupee: 18000, coin: 1760000, exchangeRate: 8800 },
        { dollar: 500, rupee: 45000, coin: 4400000, exchangeRate: 8800 },
        { dollar: 1000, rupee: 90000, coin: 8800000, exchangeRate: 8800 },
    ],
    agentToAgent: [
        { dollar: 100, rupee: 9000, coin: 940000, exchangeRate: 9400 },
        { dollar: 200, rupee: 18000, coin: 1920000, exchangeRate: 9600 },
        { dollar: 500, rupee: 45000, coin: 4850000, exchangeRate: 9700 },
        { dollar: 1000, rupee: 90000, coin: 9800000, exchangeRate: 9800 },
    ],
};

const MorePriceDetails = () => {
    return (
        <MainContainer>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" />
                <CustomHeader title="More Details" textColor='white' />
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Banner Section */}
                    <Animated.View entering={FadeInDown.delay(100)} style={styles.banner}>
                        <View>
                            <Text style={styles.bannerTitle}>DOZO LIVE Official</Text>
                            <Text style={styles.bannerTitle}>Coins Price List</Text>
                        </View>
                        <Image source={dollarIcon} style={styles.bannnerIcon} />
                    </Animated.View>

                    {/* Agent Sells to Users Section */}
                    <Animated.View entering={FadeInDown.delay(200)} style={styles.tableSection}>
                        <LinnerGradientCard customStyles={styles.tableHeader}
                        >
                            <View style={styles.pageHole}></View>
                            <Text style={styles.tableHeaderText}>Agent sells to users</Text>
                        </LinnerGradientCard>
                        <View style={styles.table}>
                            <View style={styles.tableRowHeader}>
                                <Text style={styles.tableHeaderCell}>Dollar</Text>
                                <Text style={styles.tableHeaderCell}>Rupee</Text>
                                <Text style={styles.tableHeaderCell}>Coin</Text>
                                <Text style={styles.tableHeaderCell}>$1 exchange rate</Text>
                            </View>
                            {priceData.agentToUsers.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{item.dollar}</Text>
                                    <Text style={styles.tableCell}>{item.rupee}</Text>
                                    <Text style={styles.tableCell}>{item.coin}</Text>
                                    <Text style={styles.tableCell}>{item.exchangeRate}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Agent Sells to Agent Section */}
                    <Animated.View entering={FadeInDown.delay(300)} style={styles.tableSection}>
                        <LinnerGradientCard customStyles={styles.tableHeader}
                        >
                            <View style={styles.pageHole}></View>
                            <Text style={styles.tableHeaderText}>Agent sells to agent</Text>
                        </LinnerGradientCard>

                        <View style={styles.table}>
                            <View style={styles.tableRowHeader}>
                                <Text style={styles.tableHeaderCell}>Dollar</Text>
                                <Text style={styles.tableHeaderCell}>Rupee</Text>
                                <Text style={styles.tableHeaderCell}>Coin</Text>
                                <Text style={styles.tableHeaderCell}>$1 exchange rate</Text>
                            </View>
                            {priceData.agentToAgent.map((item, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={styles.tableCell}>{item.dollar}</Text>
                                    <Text style={styles.tableCell}>{item.rupee}</Text>
                                    <Text style={styles.tableCell}>{item.coin}</Text>
                                    <Text style={styles.tableCell}>{item.exchangeRate}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        </MainContainer>
    );
};

export default MorePriceDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollContent: {
        paddingBottom: scaleHeight(20),
    },
    // Banner Styles
    banner: {
        padding: scaleWidth(20),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleWidth(20),
        zIndex: 10,
    },
    bannnerIcon: {
        width: scaleWidth(80),
        height: scaleHeight(80),
    },
    bannerTitle: {
        fontSize: scaleFont(24),
        fontWeight: '900',
        color: '#fff',
        textShadowColor: "rgba(214, 92, 9, 0.9)",
        textShadowOffset: { width: scaleWidth(2), height: scaleHeight(2) },
        textShadowRadius: scaleWidth(1),
        fontStyle: 'italic',
    },
    // Table Styles
    tableSection: {
        zIndex: 10,
        marginHorizontal: scaleWidth(15),
        marginBottom: scaleHeight(20),
        backgroundColor: '#fff',
        borderRadius: scaleWidth(20),
        padding: scaleWidth(10),
        display: 'flex',
        flexDirection: 'column',
    },
    tableHeader: {
        paddingVertical: scaleHeight(10),
        borderRadius: scaleWidth(10),
        marginBottom: scaleHeight(10),
        paddingHorizontal: scaleWidth(20),
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        gap: scaleWidth(15),
        alignItems: 'center',
        paddingLeft: scaleWidth(20),
    },
    pageHole: {
        backgroundColor: 'white',
        borderRadius: scaleWidth(100),
        width: scaleWidth(15),
        height: scaleHeight(15),
        shadowColor: "#000",
        shadowOffset: { width: scaleWidth(2), height: scaleHeight(2) },
        shadowOpacity: 0.4,
        shadowRadius: scaleWidth(4),
        elevation: 6,
    },
    tableHeaderText: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: scaleWidth(1), height: scaleHeight(1) },
        textShadowRadius: scaleWidth(4),
    },
    table: {
        backgroundColor: '#fff',
        borderColor: customColors.primary,
        borderWidth: scaleWidth(1),
        borderRadius: scaleWidth(15),
        overflow: 'hidden',
    },
    tableRowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scaleHeight(8),
        borderBottomWidth: scaleWidth(1),
        borderBottomColor: customColors.primary,
        backgroundColor: 'rgba(255, 64, 129, 0.2)',
        alignItems: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: scaleHeight(8),
        borderBottomWidth: scaleWidth(1),
        borderBottomColor: customColors.primary,
        alignItems: 'center',
    },
    tableHeaderCell: {
        fontWeight: '500',
        fontSize: scaleFont(12),
        color: customColors.primary,
        flex: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableCell: {
        fontSize: scaleFont(12),
        color: customColors.primary,
        flex: 1,
        textAlign: 'center',
    },
});