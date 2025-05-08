
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PointsCard from '@/components/profile/PointsCard';
import CustomHeader from '@/components/profile/CustomHeader';
import { scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import ConfirmationModel from '@/components/profile/ConfirmationModel';

const TransferScreen: React.FC = () => {
    // State for transfer amount
    const [transferAmount, setTransferAmount] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const handleTransfer = () => {
        // Show confirmation modal
        setModalVisible(true);
    };

    const handleConfirm = () => {
        // User confirmed the action
        console.log('User confirmed transfer');
        // Process the transfer here
        setModalVisible(false);
    };

    const handleCancel = () => {
        // User canceled the action
        console.log('User canceled transfer');
        setModalVisible(false);
    };

    // Demo data
    const availablePoints = 256674;
    const pointsToBeConfirmed = 0;
    const totalPointsFromIncome = 256674;

    return (
        <SafeAreaView style={styles.container}>

            <CustomHeader title='Transfer' rightHeader={<Ionicons name="document-text-outline" size={24} color="black" />} />

            <PointsCard />

            <ScrollView style={styles.formContainer}>
                {/* Receiver Section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>
                        <Text style={styles.requiredStar}>* </Text>
                        Receiver
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ID"
                        placeholderTextColor="#AAAAAA"
                    />
                    <Text style={styles.inputHelper}>
                        Please confirm the recipient's nickname and ID
                    </Text>
                </View>

                {/* Transfer Amount Section */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>
                        <Text style={styles.requiredStar}>* </Text>
                        Transfer
                    </Text>
                    <View style={styles.amountInputContainer}>
                        <TextInput
                            style={styles.amountInput}
                            value={transferAmount}
                            onChangeText={setTransferAmount}
                            keyboardType="numeric"
                        />
                        <Text>X 100,000</Text>

                    </View>
                </View>

                {/* Rules Section */}
                <View style={styles.rulesSection}>
                    <Text style={styles.rulesTitle}>Rule description</Text>

                    <Text style={styles.ruleItem}>
                        1. Transfer rate= 1:1. Minimum transfer ≥ 500,000 points.
                    </Text>

                    <Text style={styles.ruleItem}>
                        2. Click transfer button to transfer the corresponding points to other agents.
                    </Text>

                    <Text style={styles.ruleItem}>
                        3. After the exchange finished, it can't be cancelled or withdrawn.
                    </Text>
                </View>
            </ScrollView>

            {/* Transfer Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.transferButton, transferAmount === "" ? styles.disable : styles.active]}
                    onPress={handleTransfer} // Add this line
                    disabled={transferAmount === ""} // Optional: disable when empty
                >
                    <Text style={styles.transferButtonText}>Transfer</Text>
                </TouchableOpacity>
            </View>

            <ConfirmationModel
                visible={modalVisible}
                title="Instruction"
                message={`Are you sure to transfer ${parseFloat(transferAmount) * 100000} points?`}
                onCancel={handleCancel}
                onConfirm={handleConfirm}

            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    icon: {
        marginHorizontal: 15,
    },
    detailsText: {
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingBottom: 50,
        paddingTop: StatusBar.currentHeight
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    pointsCard: {
        backgroundColor: '#FF6B8B',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 8,
        padding: 16,
    },
    pointsSection: {
        marginBottom: 16,
    },
    pointsLabel: {
        color: 'white',
        opacity: 0.8,
        fontSize: 14,
    },
    pointsValue: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 4,
    },
    pointsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pointsColumn: {
        flex: 1,
    },
    divider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 8,
    },
    pointsSubLabel: {
        color: 'white',
        opacity: 0.8,
        fontSize: 12,
    },
    pointsSubValue: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 4,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    inputSection: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 8,
    },
    requiredStar: {
        color: '#FF0000',
    },
    input: {
        height: scaleHeight(40),
        borderRadius: 8,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    inputHelper: {
        fontSize: 12,
        color: '#999999',
        marginTop: 4,
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    amountPrefix: {
        fontSize: 16,
        color: '#555555',
        marginRight: 4,
    },
    amountInput: {
        // flex: 1,
        minWidth: scaleWidth(100),
        fontSize: 16,
        height: scaleHeight(40),
        color: '#000000',
        borderRadius: 8,
        backgroundColor: '#F7F7F7',
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    rulesSection: {
        marginVertical: 16,
    },
    rulesTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 12,
        color: '#333333',
    },
    ruleItem: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
        lineHeight: 20,
    },
    buttonContainer: {
        padding: 16,
    },
    transferButton: {
        // backgroundColor: '#A5A6F6',
        borderRadius: 24,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disable: {
        backgroundColor: '#A5A6F6',

    },
    active: {
        backgroundColor: '#2f2ffcda',
    },
    transferButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
});

export default TransferScreen;