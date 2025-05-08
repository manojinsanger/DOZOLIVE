import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PointsCard from '@/components/profile/PointsCard';
import CustomHeader from '@/components/profile/CustomHeader';
import beanIcon from "@/assets/images/bean.png";
import startIcon from "@/assets/images/icon/loyalty.png";


interface ExchangeOption {
    coins: number;
    points: number;
    selected?: boolean;
}

const ExchangeCoinsScreen = () => {
    const [verificationCode, setVerificationCode] = useState<string>('7084');
    const [exchangeOptions, setExchangeOptions] = useState<ExchangeOption[]>([
        { coins: 92000, points: 100000, selected: true },
        { coins: 475000, points: 500000, selected: false },
    ]);

    const selectOption = (index: number) => {
        const updatedOptions = exchangeOptions.map((option, i) => ({
            ...option,
            selected: i === index,
        }));
        setExchangeOptions(updatedOptions);
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title='Exchange Coins' />
            <ScrollView style={styles.scrollView}>
                <PointsCard />
                {/* Exchange Quantity */}
                <Text style={styles.sectionTitle}>Exchange quantity</Text>
                <View style={styles.exchangeOptionsContainer}>
                    {exchangeOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.exchangeOption,
                                option.selected ? styles.selectedOption : styles.unselectedOption,
                            ]}
                            onPress={() => selectOption(index)}
                        >
                            <View style={styles.coinContainer}>
                                <View style={styles.coinIconContainer}>
                                    {/* <Image style={styles.points} source={startIcon} /> */}
                                    <Image style={styles.points} source={startIcon} />
                                </View>
                                <Text style={styles.coinValue}>{option.coins.toLocaleString()}</Text>
                            </View>
                            <View style={styles.pointsContainer}>
                                <View style={styles.pointsIconContainer}>
                                    <Image style={styles.points} source={beanIcon} />
                                </View>
                                <Text style={styles.pointsAmount}>{option.points.toLocaleString()}</Text>
                            </View>
                            {option.selected && (
                                <View style={styles.checkmarkContainer}>
                                    <MaterialIcons name="checkmark" size={18} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={[styles.customizeButton,]}>
                        <Text style={styles.customizeText}>customize</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.agentNote}>
                    For agent, coins will be redeemed to your agency account by default&gt;&gt;
                </Text>

                {/* Verification Code */}
                <Text style={styles.sectionTitle}>Verification Code</Text>
                <View style={styles.verificationContainer}>
                    <TextInput
                        style={styles.verificationInput}
                        placeholder="Enter the verification code"
                        placeholderTextColor="#999999"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                    />
                    <View style={styles.refreshButton}>
                        <Text style={styles.verificationCodeText}>{verificationCode}</Text>
                        <MaterialIcons name="refresh" size={20} color="white" />
                    </View>
                </View>

                {/* Exchange Button */}
                <TouchableOpacity style={styles.exchangeButton}>
                    <Text style={styles.exchangeButtonText}>Exchange coins</Text>
                </TouchableOpacity>

                {/* Rules */}
                <Text style={styles.sectionTitle}>Rule description</Text>
                <Text style={styles.ruleText}>Exchange points for coins:</Text>

                {/* First Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.tableHeaderLeft]}>Single purchase amount</Text>
                        <Text style={[styles.tableHeaderText, styles.tableHeaderRight]}>Unit price</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>&lt;$50</Text>
                        <View style={[styles.tableCell, styles.priceCellContainer]}>
                            <Text style={styles.priceText}>$1= </Text>
                            <Image style={styles.points} source={startIcon} />
                            <Text style={styles.priceValue}> 9,200</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>$50 ≤ N &lt; $1,000</Text>
                        <View style={[styles.tableCell, styles.priceCellContainer]}>
                            <Text style={styles.priceText}>$1= </Text>
                            <Image style={styles.points} source={startIcon} />
                            <Text style={styles.priceValue}> 9,500</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>N≥$1,000</Text>
                        <View style={[styles.tableCell, styles.priceCellContainer]}>
                            <Text style={styles.priceText}>$1= </Text>
                            <Image style={styles.points} source={startIcon} />
                            <Text style={styles.priceValue}> 9,900</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.ruleText}>Purchase coins through Epay:</Text>

                {/* Second Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, styles.tableHeaderLeft]}>Single purchase amount</Text>
                        <Text style={[styles.tableHeaderText, styles.tableHeaderRight]}>Unit price</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>&lt;$500</Text>
                        <View style={[styles.tableCell, styles.priceCellContainer]}>
                            <Text style={styles.priceText}>$1= </Text>
                            <Image style={styles.points} source={startIcon} />
                            <Text style={styles.priceValue}> 9,200</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>$500 ≤ N &lt; $2,000</Text>
                        <View style={[styles.tableCell, styles.priceCellContainer]}>
                            <Text style={styles.priceText}>$1= </Text>
                            <Image style={styles.points} source={startIcon} />
                            <Text style={styles.priceValue}> 9,500</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>N≥$2,000</Text>
                        <View style={[styles.tableCell, styles.priceCellContainer]}>
                            <Text style={styles.priceText}>$1= </Text>
                            <Image style={styles.points} source={startIcon} />
                            <Text style={styles.priceValue}> 9,900</Text>
                        </View>
                    </View>
                </View>

                {/* Notes */}
                <View style={styles.notesContainer}>
                    <Text style={styles.noteText}>1. After exchanging successful, the agent coin account will be increased the correspond coins.</Text>
                    <Text style={styles.noteText}>2. Cancellation is not allowed after exchange.</Text>
                    <Text style={styles.noteText}>3. For small amount purchase, please buy from coin seller.</Text>
                    <Text style={styles.noteText}>4. If you have any concerns of the price agent sell to users, please contact corresponding regional admin for further consulting.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 50,
        paddingTop: 30,
    },
    scrollView: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    points: {
        width: 16,
        height: 16,
        resizeMode: "contain"
    },
    exchangeOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        gap: 10,
    },
    exchangeOption: {
        width: '48%',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        position: 'relative',
    },
    selectedOption: {
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#FF7B9C',
    },
    unselectedOption: {
        backgroundColor: '#F7F7F7',
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    coinIconContainer: {
        marginRight: 4,
    },
    coinIcon: {
        fontSize: 16,
    },
    coinValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointsIconContainer: {
        marginRight: 4,
    },
    pointsIcon: {
        fontSize: 14,
    },
    pointsAmount: {
        fontSize: 14,
        color: '#666666',
    },
    checkmarkContainer: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF7B9C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customizeButton: {
        margin: "auto",
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        padding: 20,
        paddingInline: 30,
        alignItems: 'center',
        marginBottom: 12,
        flexWrap: "nowrap"
    },
    customizeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    agentNote: {
        fontSize: 12,
        color: '#5C73FF',
        marginHorizontal: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    verificationContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16,
    },
    verificationInput: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        color: '#333333',
    },
    refreshButton: {
        backgroundColor: '#A0A5FF',
        borderRadius: 6,
        marginLeft: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    verificationCodeText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginRight: 8,
    },
    exchangeButton: {
        backgroundColor: '#5C73FF',
        borderRadius: 25,
        marginHorizontal: 16,
        marginBottom: 24,
        paddingVertical: 14,
        alignItems: 'center',
    },
    exchangeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    ruleText: {
        fontSize: 14,
        color: '#333333',
        marginHorizontal: 16,
        marginBottom: 8,
    },
    table: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    tableHeaderText: {
        padding: 10,
        fontWeight: '500',
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
    },
    tableHeaderLeft: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#DDDDDD',
    },
    tableHeaderRight: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    tableCell: {
        flex: 1,
        padding: 10,
        fontSize: 14,
        color: '#333333',
        borderRightWidth: 1,
        borderRightColor: '#DDDDDD',
    },
    priceCellContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0,
    },
    priceText: {
        fontSize: 14,
        color: '#333333',
    },
    priceValue: {
        fontSize: 14,
        color: '#333333',
    },
    notesContainer: {
        marginHorizontal: 16,
        marginBottom: 24,
    },
    noteText: {
        fontSize: 13,
        color: '#666666',
        marginBottom: 6,
    },
});

export default ExchangeCoinsScreen;