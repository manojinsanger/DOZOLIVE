import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Switch, ScrollView, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/Feather';
import CustomHeader from '@/components/profile/CustomHeader';
import FilteredByDate from '@/components/profile/FilterByDate';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import { fullWidth, scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import PaymentConfirmationModal from '@/components/profile/PaymentConfirmationModal';
import BeanIcon from "@/assets/images/profile_assets/pointsIcon.png";
import { redirect } from '@/utils/navigationService';
import DarkContentStatusBar from '@/components/statusbar/DarkContentStatusBar';
import ThemedText from '@/components/ThemedText';

const PayrollScreen = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isOrderActive, setIsOrderActive] = useState(true);
    const [activeTab, setActiveTab] = useState('pending');
    const [paymentAmount, setPaymentAmount] = useState('2,549,132.92');
    const [pointsEarnings, setPointsEarnings] = useState('289,680,044');
    const [platformRewards, setPlatformRewards] = useState('17,543,808');
    const [modelVisible, setModalVisible] = useState(false);

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };

    const copyToClipboard = (text: string): void => {
        // Replace with actual clipboard implementation
        Alert.alert('Copied', `${text} copied to clipboard`);
    };

    const hiddenText = '************';
    const bankDetails = {
        bank: 'State Bank of India',
        fullName: 'USHA RAWAT',
        upiNumber: 'usharawat19941@oksbi',
        ifscCode: 'SBIN0003293',
        accountNumber: '11808437667'
    };

    // Function to truncate text to show beginning and end with ellipsis in middle
    const truncateMiddle = (text: string, maxLength = 15) => {
        if (text.length <= maxLength) return text;
        const start = text.substring(0, maxLength / 2);
        const end = text.substring(text.length - maxLength / 2);
        return `${start}...${end}`;
    };

    return (
        <View style={styles.container}>
            <DarkContentStatusBar />
            <CustomHeader title='Payroll' />
            <FilteredByDate />
            <ScrollView style={styles.contentScrollView}>

                <LinnerGradientCard customStyles={styles.paymentCard}>
                    <View style={styles.paymentHeaderRow}>
                        <ThemedText style={styles.paymentLabel}>Payment amount</ThemedText>
                        <TouchableOpacity onPress={toggleVisibility}>
                            <Feather name={isHidden ? "eye-off" : "eye"} size={scaleWidth(22)} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ThemedText style={styles.paymentValue}>{isHidden ? hiddenText : paymentAmount}</ThemedText>

                    <View style={styles.paymentInfoRow}>
                        <ThemedText style={styles.paymentLabel}>Points of earnings</ThemedText>
                        <TouchableOpacity>
                            <Feather name="info" size={scaleWidth(16)} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ThemedText style={styles.paymentValue}>{isHidden ? hiddenText : pointsEarnings}</ThemedText>

                    <View style={styles.paymentInfoRow}>
                        <ThemedText style={styles.paymentLabel}>Platform reward</ThemedText>
                        <TouchableOpacity>
                            <Feather name="info" size={scaleWidth(16)} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ThemedText style={styles.paymentValue}>{isHidden ? hiddenText : platformRewards}</ThemedText>

                    <View style={styles.cardDivider} />

                    <View style={styles.orderToggleRow}>
                        <ThemedText style={styles.orderToggleText}>take order now</ThemedText>
                        <Switch
                            value={isOrderActive}
                            onValueChange={setIsOrderActive}
                            trackColor={{ false: '#ffb0c9', true: '#ffffff' }}
                            thumbColor={'#ffffff'}
                            ios_backgroundColor="#ffb0c9"
                            style={styles.switch}
                        />
                        <ThemedText style={styles.toggleStatus}>{isOrderActive ? 'ON' : 'OFF'}</ThemedText>
                    </View>
                </LinnerGradientCard>

                {/* Horizontally Scrollable Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
                    <View style={styles.tabBar}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                            onPress={() => setActiveTab('pending')}
                        >
                            <ThemedText style={styles.tabText}>Pending payment(2)</ThemedText>
                            {activeTab === 'pending' && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'confirmed' && styles.activeTab]}
                            onPress={() => setActiveTab('confirmed')}
                        >
                            <ThemedText style={styles.tabText}>To be confirmed by hosts(4)</ThemedText>
                            {activeTab === 'confirmed' && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'paid' && styles.activeTab]}
                            onPress={() => setActiveTab('paid')}
                        >
                            <ThemedText style={styles.tabText}>Paid(1)</ThemedText>
                            {activeTab === 'paid' && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'problem order' && styles.activeTab]}
                            onPress={() => setActiveTab('problem order')}
                        >
                            <ThemedText style={styles.tabText}>Problem order(1)</ThemedText>
                            {activeTab === 'problem order' && <View style={styles.activeIndicator} />}
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Orders count */}
                <ThemedText style={styles.ordersText}>
                    <ThemedText style={styles.redText}>0</ThemedText>
                    orders in the waiting list.
                </ThemedText>

                {/* Payment Details Card */}
                <View style={styles.paymentDetailsCard}>
                    <View style={styles.totalRow}>
                        <Image style={styles.pointIcon} source={BeanIcon} />
                        <ThemedText style={styles.totalAmount}>208,247</ThemedText>
                        <View style={styles.statusContainer}>
                            <ThemedText style={styles.statusText}>Pending payment</ThemedText>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Income from this order:</ThemedText>
                        <View style={styles.amountWithIcon}>
                            <Image style={[styles.pointIcon, { width: 12, height: 12 }]} source={BeanIcon} />
                            <ThemedText style={styles.detailValue} numberOfLines={1}>197,513</ThemedText>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Platform reward:</ThemedText>
                        <View style={styles.amountWithIcon}>
                            <Image style={[styles.pointIcon, { width: 12, height: 12 }]} source={BeanIcon} />
                            <ThemedText style={styles.detailValue} numberOfLines={1}>10,734</ThemedText>
                        </View>
                    </View>

                    <View style={[styles.detailRow, { borderBottomColor: '#e9e7e792', borderBottomWidth: 1 }]}>
                        <ThemedText style={styles.detailLabel}>Order number:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue} numberOfLines={1} ellipsizeMode='tail'>
                                {/* {truncateMiddle('250407174400992428915120457', 20)} */}250407174400992428915120457
                            </ThemedText>
                            <TouchableOpacity
                                style={styles.copyIcon}
                                onPress={() => copyToClipboard('250407174400992428915120457')}>
                                <Feather name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Local currency:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue} numberOfLines={1}>₹1738</ThemedText>
                            <TouchableOpacity style={styles.copyIcon} onPress={() => copyToClipboard('₹1738')}>
                                <MaterialIcons name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Actual amount received:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue} numberOfLines={1}>₹1738</ThemedText>
                            <TouchableOpacity style={styles.copyIcon} onPress={() => copyToClipboard('₹1738')}>
                                <MaterialIcons name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Payment Method:</ThemedText>
                        <View style={styles.paymentMethodContainer}>
                            {/* <MaterialIcons name="account-balance-wallet" size={scaleWidth(20)} color="#333" /> */}
                            <ThemedText style={[styles.detailValue, styles.bankText]}>India Bank Transfer</ThemedText>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Bank:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue} numberOfLines={1}>State Bank of India</ThemedText>
                            <TouchableOpacity style={styles.copyIcon} onPress={() => copyToClipboard('State Bank of India')}>
                                <MaterialIcons name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Full Name:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue} numberOfLines={1}>A Hemlemsonla Chang</ThemedText>
                            <TouchableOpacity style={styles.copyIcon} onPress={() => copyToClipboard('A Hemlemsonla Chang')}>
                                <MaterialIcons name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>UPI number:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue} numberOfLines={1}>changsonla59@oksbi</ThemedText>
                            <TouchableOpacity style={styles.copyIcon} onPress={() => copyToClipboard('changsonla59@oksbi')}>
                                <MaterialIcons name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View> */}

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Bank IFSC Code:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue} numberOfLines={1} >SBIN0006482</ThemedText>
                            <TouchableOpacity style={styles.copyIcon} onPress={() => copyToClipboard('SBIN0006482')}>
                                <MaterialIcons name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Bank Account Number:</ThemedText>
                        <View style={styles.copyContainer}>
                            <ThemedText style={styles.detailValue}>33916303933</ThemedText>
                            <TouchableOpacity style={styles.copyIcon} onPress={() => copyToClipboard('33916303933')}>
                                <MaterialIcons name="copy" size={scaleWidth(14)} color="#ccc" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Countdown timer */}
                    <View style={styles.countdownContainer}>
                        <View style={styles.timerIconContainer}>
                            <AntDesign name="clock" size={scaleWidth(16)} color="#ff6347" />
                        </View>
                        <ThemedText style={styles.countdownTimer}>07:55:27</ThemedText>
                        <View style={styles.countdownTextContainer}>
                            <ThemedText style={styles.countdownText}>
                                Please make the payment before the end of the countdown. Failed to make payment on time will affect the amount of orders given to you.
                            </ThemedText>
                        </View>
                    </View>

                    {/* Action buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.abandonButton} onPress={() => redirect("abandonmentOfordersscreen")}>
                            <ThemedText style={styles.abandonButtonText}>Abandon the order</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.remitButton} onPress={() => setModalVisible(true)}>
                            <ThemedText style={styles.remitButtonText}>Remit</ThemedText>
                        </TouchableOpacity>
                    </View>
                    <PaymentConfirmationModal visible={modelVisible} onClose={() => setModalVisible(false)} bankDetails={bankDetails} onUploadProof={() => console.log("Upload proof")} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    paymentHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: StatusBar.currentHeight,
    },
    paymentCard: {
        backgroundColor: '#ff6b96',
        margin: scaleWidth(16),
        borderRadius: scaleWidth(16),
        padding: scaleWidth(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: scaleHeight(2) },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(8),
    },
    paymentLabel: {
        color: 'white',
        fontSize: scaleFont(14),
        marginRight: scaleWidth(8),
    },
    paymentValue: {
        color: 'white',
        fontSize: scaleFont(18),
        fontWeight: '500',
        marginTop: scaleHeight(2),
    },
    cardDivider: {
        height: scaleHeight(1),
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginVertical: scaleHeight(8),
    },
    orderToggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    orderToggleText: {
        color: 'white',
        fontSize: scaleFont(16),
        marginRight: scaleWidth(12),
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    toggleStatus: {
        color: 'white',
        marginLeft: scaleWidth(4),
        fontSize: scaleFont(14),
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(16),
    },
    tab: {
        paddingVertical: scaleHeight(10),
        marginRight: scaleWidth(20),
        position: 'relative',
    },
    activeTab: {
        borderBottomColor: 'red',
    },
    tabText: {
        fontSize: scaleFont(14),
        color: '#333',
    },
    tabScrollView: {
        maxHeight: scaleHeight(50),
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: scaleHeight(2),
        backgroundColor: 'red',
        borderRadius: scaleHeight(3),
    },
    redText: {
        color: 'red',
    },
    contentScrollView: {
        flex: 1,
        backgroundColor: '#cfcfcf44'
    },
    ordersText: {
        fontSize: scaleFont(14),
        color: '#666',
        backgroundColor: 'white',
        paddingHorizontal: scaleWidth(26),
        paddingVertical: scaleHeight(4),
        marginVertical: scaleHeight(8)
    },
    paymentDetailsCard: {
        backgroundColor: 'white',
        borderRadius: scaleWidth(8),
        margin: scaleWidth(16),
        marginTop: 0,
        padding: scaleWidth(16),
    },
    totalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleHeight(16),
    },
    pointIcon: {
        width: 18,
        height: 18,
        resizeMode: "contain",
        marginTop: 5,
        marginRight: 5,
    },
    currencyIconContainer: {
        width: scaleWidth(26),
        height: scaleHeight(26),
        borderRadius: scaleWidth(18),
        backgroundColor: '#ff6b96',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleWidth(8),
    },
    currencyIcon: {
        color: 'white',
        fontSize: scaleFont(18),
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    statusContainer: {
        marginLeft: 'auto',
    },
    statusText: {
        color: '#5b6af0',
        fontSize: scaleFont(14),
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingVertical: scaleHeight(6),
    },
    detailLabel: {
        color: '#888',
        fontSize: scaleFont(11),
        flex: 0.5, // Use flex instead of maxWidth for more predictable layout
        //  backgroundColor: 'red'
    },
    detailValue: {
        color: '#333',
        fontSize: scaleFont(11),
        // backgroundColor: 'red'
    },
    detailValueLong: {
        color: '#333',
        fontSize: scaleFont(12),
        flex: 1, // Allow the text to take available space
    },
    amountWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallCurrencyIcon: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        borderRadius: scaleWidth(10),
        backgroundColor: '#ff6b96',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scaleWidth(4),
    },
    smallCurrencyIconText: {
        color: 'white',
        fontSize: scaleFont(10),
        fontWeight: 'bold',
    },
    copyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.55, // Use flex instead of maxWidth for more predictable layout
        justifyContent: 'flex-end', // Ensure copy icon stays at the end
    },
    copyIcon: {
        marginLeft: scaleWidth(4),
        padding: scaleWidth(2), // Add padding to make it easier to press
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bankText: {
        marginLeft: scaleWidth(4),
    },
    countdownContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff8f8',
        padding: scaleWidth(12),
        borderRadius: scaleWidth(8),
        marginTop: scaleHeight(16),
        alignItems: 'flex-start',
    },
    timerIconContainer: {
        marginRight: scaleWidth(8),
        marginTop: scaleHeight(2),
    },
    countdownTimer: {
        color: '#ff6347',
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        marginRight: scaleWidth(8),
    },
    countdownTextContainer: {
        flex: 1,
    },
    countdownText: {
        color: '#666',
        fontSize: scaleFont(12),
        lineHeight: scaleHeight(20),
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleHeight(24),
    },
    abandonButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#6c7ee1',
        borderRadius: scaleWidth(24),
        paddingVertical: scaleHeight(8),
        marginRight: scaleWidth(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    abandonButtonText: {
        color: '#6c7ee1',
        fontSize: scaleFont(14),
    },
    remitButton: {
        flex: 1,
        backgroundColor: '#5b6af0',
        borderRadius: scaleWidth(24),
        paddingVertical: scaleHeight(8),
        marginLeft: scaleWidth(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    remitButtonText: {
        color: 'white',
        fontSize: scaleFont(14),
    },
});

export default PayrollScreen;