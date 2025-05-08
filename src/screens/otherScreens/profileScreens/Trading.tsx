import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, Image, Pressable, Platform, ActivityIndicator } from 'react-native';
import dollarIcon from '@/assets/images/icon/loyalty.png';
import CustomHeader from '@/components/profile/CustomHeader';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import customColors from '@/constants/styles';
import ThemedText from '@/components/ThemedText';
import CoinSellerModal from '@/components/profile/CoinSellerModal';
import { redirect } from '@/utils/navigationService';
import { useAppDispatch, useAppSelector } from '@/store/useTypeDispatchSelector';
import { clearTransferResponse, clearWalletError, fetchSellerWalletBalanceRequest, fetchTransactionsRequest, sendCoinSellerWalletToAnyUserRequest, sendCoinSellerWalletToSellerRequest } from '@/store/features/wallet/walletSlice';
import { copyToClipboard, formatNumber } from '@/utils/helper';
import { fetchSingleUser } from '@/store/features/wallet/walletServices';
import { WalletType, UserSearchResult } from '@/store/features/wallet/walletTypes';
import { useToast } from '@/context/CustomToastContext';
import { useUser } from '@/context/UserProvider';
import LoadingScreen from '@/components/common/Loading';
import WalletCard from '@/components/profile/WalletCard';

const Trading = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [receiverId, setReceiverId] = useState<string>('');
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<UserSearchResult | null>(null);
    const [selectedWallet, setSelectedWallet] = useState<WalletType>('COIN');
    const [amount, setAmount] = useState('');
    const [isTransferEnabled, setIsTransferEnabled] = useState(false);
    const dispatch = useAppDispatch();
    const { userAllDetails } = useUser()
    const toast = useToast();
    const { sellerWalletBalance, loading, transferResponse, error } = useAppSelector(state => state.wallet);



    useEffect(() => {
        dispatch(fetchSellerWalletBalanceRequest());
        dispatch(fetchTransactionsRequest({
            commonId: userAllDetails?.id, secondUserID: userAllDetails.specialId || userAllDetails.liveId, page: 1,
            walletType: 'SELLER'
        }));

        setSelectedWallet("COIN")

    }, []);

    // Check if transfer button should be enabled
    useEffect(() => {
        // Enable button only when both receiverId and amount are valid
        setIsTransferEnabled(!!receiverId && receiverId.length > 3 && !!amount && amount.trim() !== '' && !!searchResult);
    }, [receiverId, amount, searchResult]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (receiverId && receiverId.length > 3) {
                setSearchLoading(true);
                try {
                    const result = await fetchSingleUser(receiverId);
                    setSearchResult(result); // ✅ only set if it's not self
                } catch (error) {
                    console.log("error while searching user...");
                    setSearchResult(null);
                } finally {
                    setSearchLoading(false);
                }
            } else {
                setSearchResult(null);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [receiverId, userAllDetails.liveId]); // include liveId in deps


    // Handle successful transfer response
    useEffect(() => {
        if (transferResponse?.message) {
            toast.showToast('success', transferResponse?.message);
            setAmount('');
            setReceiverId('');
            setSearchResult(null);
            setSelectedWallet('COIN')
            dispatch(fetchSellerWalletBalanceRequest());
            dispatch(clearTransferResponse());
        }
    }, [transferResponse, dispatch]);

    useEffect(() => {
        if (error) {
            toast.showToast("error", error);
            dispatch(clearWalletError()); // optional, if you have such an action
        }
    }, [error]);


    const handleTransfer = () => {
        if (!receiverId || !amount || !searchResult) {
            toast.showToast("error", "Please enter a valid amount and receiver ID");
            return;
        }

        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            toast.showToast("error", "Please enter a valid amount");
            return;
        }

        if (numAmount > sellerWalletBalance) {
            toast.showToast("error", "Insufficient balance");
            return;
        }

        // if (numAmount < 5000) {
        //     toast.showToast("error", "Minimum transfer amount is 5,000");
        //     return;
        // }

        if (selectedWallet === "SELLER" && (searchResult?.roles?.includes("SELLER") || searchResult?.roles?.includes("SUPER_SELLER"))) {
            dispatch(sendCoinSellerWalletToSellerRequest({ receiverId, amount }));
        }
        else {
            dispatch(sendCoinSellerWalletToAnyUserRequest({ receiverId, amount }));
        }
    }

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSave = () => {
        console.log('Settings saved!');
        setModalVisible(false);
    };

    // if (loading) return <LoadingScreen />

    return (
        <MainContainer>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
            />

            <View style={styles.container}>
                {/* Update CustomHeader to trigger modal on icon press */}
                <CustomHeader
                    title='Trading account'
                    rightHeader={
                        <TouchableOpacity onPress={handleOpenModal}>
                            <MaterialIcons name="settings" size={20} color={customColors.gray700} />
                        </TouchableOpacity>
                    }
                />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Coin Trading Balance Section */}
                    <LinnerGradientCard customStyles={{ marginBottom: scaleHeight(20), marginTop: scaleHeight(20) }}>
                        <View style={styles.balanceContainer}>
                            <View style={styles.balanceHeader}>
                                <Image source={dollarIcon} style={styles.icon} />
                                <ThemedText style={styles.balanceHeaderText}>Coins trading</ThemedText>

                                <TouchableOpacity onPress={() => redirect("tradingdetails", {
                                    walletType: "SELLER"
                                })}>
                                    <ThemedText style={styles.detailsText}>Details</ThemedText>
                                </TouchableOpacity>
                            </View>
                            <ThemedText style={styles.balanceAmount}>{formatNumber(sellerWalletBalance)}</ThemedText>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => redirect("exchangecoins")} style={[styles.actionButton, styles.exchangeBtn]}>
                                    <MaterialIcons name="swap-horiz" size={scaleWidth(20)} color="#fff" />
                                    <ThemedText style={styles.actionButtonText}>Exchange</ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, styles.topUpButton]} onPress={() => redirect("topupcoin")}>
                                    <ThemedText style={[styles.actionButtonText, styles.topUpText]}>Top Up</ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinnerGradientCard>


                    {/* Transfer Section */}
                    <View style={styles.transferContainer}>
                        <View style={styles.agentDetails}>
                            <ThemedText style={styles.sectionTitle}>
                                <ThemedText style={styles.required}>*</ThemedText> Transfer To
                            </ThemedText>
                            {searchLoading ?
                                <ActivityIndicator style={{ marginLeft: scaleWidth(15) }} /> :
                                searchResult && receiverId ?
                                    <View style={styles.agentInfo}>
                                        <Image
                                            source={{ uri: searchResult?.profileImage || '' }}
                                            style={styles.agentAvatar}
                                        />
                                        <ThemedText style={styles.agentName}>{searchResult?.name}</ThemedText>
                                    </View> : <View></View>
                            }
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="User ID"
                                placeholderTextColor="#999"
                                onChangeText={setReceiverId}
                                value={receiverId}
                            // keyboardType='numeric'
                            />
                            <TouchableOpacity onPress={() => copyToClipboard(receiverId)}>
                                <FontAwesome name="copy" size={scaleWidth(20)} color="#ccc" />
                            </TouchableOpacity>
                        </View>

                        <ThemedText style={[styles.sectionTitle, styles.tranferAmmountTitle]}>
                            <ThemedText style={styles.required}>*</ThemedText> Transfer Amount
                        </ThemedText>
                        <View style={styles.inputContainer}>
                            <Image source={dollarIcon} style={styles.icon} />
                            <TextInput
                                style={[styles.input, { flex: 1, marginLeft: scaleWidth(4) }]}
                                placeholder="Please enter coins amount"
                                placeholderTextColor="#999"
                                onChangeText={setAmount}
                                value={amount}
                                keyboardType='numeric'
                            />
                        </View>
                        {searchResult && searchResult?.roles?.includes("SUPER_SELLER") && (searchResult?.liveId !== userAllDetails.liveId) ? (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <WalletCard
                                    title="Coins account"
                                    tag="User"
                                    selected={selectedWallet === 'COIN'}
                                    onPress={() => setSelectedWallet('COIN')}
                                />
                                <WalletCard
                                    title="Sellers account"
                                    tag="Seller"
                                    selected={selectedWallet === 'SELLER'}
                                    disabled={!searchResult?.roles?.includes("SELLER") && !searchResult?.roles?.includes("SUPER_SELLER")}
                                    onPress={() => setSelectedWallet('SELLER')}
                                />
                            </View>
                        ) : null}

                    </View>

                    {/* Banner Section */}
                    <Pressable onPress={() => redirect("morepricedetails")} style={styles.bannerContainer}>
                        <View style={styles.leftCircle} />
                        <View style={styles.rightCircle} />
                        <View style={styles.textContainer}>
                            <ThemedText style={styles.toBeText}>Dozo Live</ThemedText>
                            <View>
                                <View style={styles.officialRow}>
                                    <ThemedText style={styles.officialText}>OFFICIAL</ThemedText>
                                    <Image source={dollarIcon} style={styles.dollarIcon} />
                                </View>
                                <ThemedText style={styles.coinsellerText}>Price List</ThemedText>
                            </View>
                            <ThemedText style={styles.startingText}>
                                Starting From <Image source={dollarIcon} style={styles.smallDollarIcon} /> 5,000,000
                            </ThemedText>
                        </View>
                    </Pressable>

                    {/* Transfer Button */}
                    <TouchableOpacity
                        onPress={handleTransfer}
                        disabled={!isTransferEnabled || loading}
                        style={[
                            styles.transferButton,
                            isTransferEnabled ? { marginTop: scaleHeight(-12) } : { backgroundColor: '#D3D3FA' }
                        ]}
                    >
                        {isTransferEnabled ? (
                            <LinnerGradientCard customStyles={[styles.transferButton,]}>
                                {loading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <ThemedText style={styles.transferButtonText}>Transfer</ThemedText>
                                )}
                            </LinnerGradientCard>
                        ) : (
                            <ThemedText style={styles.transferButtonText}>Transfer</ThemedText>
                        )}
                    </TouchableOpacity>
                </ScrollView>

                {/* Add CoinSellerModal here */}
                <CoinSellerModal
                    visible={modalVisible}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            </View>
        </MainContainer>
    );
};
export default Trading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.white,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: scaleWidth(10),
        paddingBottom: scaleHeight(20),
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: scaleFont(16),
        fontWeight: '400',
        color: customColors.gray900,
        textAlign: 'center',
    },
    settingsButton: {
        padding: scaleWidth(15),
    },
    headerText: {
        fontSize: scaleFont(13),
        fontWeight: '400',
        color: customColors.gray900,
    },

    // Balance Section
    balanceContainer: { padding: scaleWidth(15) },
    walletSelectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    walletBox: {
        width: '48%',
        padding: scaleHeight(10),
        borderRadius: scaleWidth(12),
        backgroundColor: '#F5F5F5',
        borderWidth: 1.6,
        borderColor: '#E0E0E0',
        position: 'relative',
        marginBottom: scaleHeight(20)
    },

    selectedBoxText: {
        color: customColors.gray900,
    },

    selectedWalletBox: {
        borderColor: customColors.primary,
        backgroundColor: '#c9d4f8',
    },

    walletBoxTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    walletBoxAmount: {
        fontWeight: '600',
        fontSize: scaleFont(14),
        marginTop: scaleHeight(6),
    },

    checkIcon: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: customColors.primary,
        borderRadius: 12,
        padding: 1,
    },

    balanceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    balanceHeaderText: {
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: customColors.white,
        marginLeft: scaleWidth(5),
        flex: 1,
    },
    icon: {
        width: scaleWidth(25),
        height: scaleHeight(25),
    },
    detailsText: {
        fontSize: scaleFont(16),
        color: customColors.white,
        fontWeight: '500',
    },
    walletType: {
        backgroundColor: customColors.Blue400,
        padding: scaleWidth(4),
        borderRadius: scaleWidth(10),
        // width: scaleWidth(60),
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // margin: 'auto',
        alignItems: 'flex-start'

    },
    balanceAmount: {
        fontSize: scaleFont(30),
        fontWeight: 'bold',
        color: customColors.white,
        textAlign: 'left',
        marginBottom: scaleHeight(20),
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        gap: scaleWidth(10),
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        paddingTop: scaleHeight(15),
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: scaleWidth(20),
        justifyContent: 'center',
        padding: scaleWidth(6),
        paddingHorizontal: scaleWidth(10),
    },
    exchangeBtn: {
        borderWidth: 1,
        borderColor: customColors.white,
    },
    topUpButton: {
        backgroundColor: customColors.white,
        paddingHorizontal: scaleWidth(20),
    },
    actionButtonText: {
        color: customColors.white,
        fontSize: scaleFont(14),
        fontWeight: '500',
        marginLeft: scaleWidth(5),
    },
    topUpText: {
        color: customColors.accent,
        fontWeight: 'bold',
    },
    agentFoundText: {
        fontSize: scaleFont(12),
        fontWeight: '600',
        color: '#0077CC',
    },
    agentDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaleWidth(8),
        backgroundColor: customColors.white || '#FFFFFF',
    },
    agentAvatar: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        borderRadius: scaleWidth(25),
        marginRight: scaleWidth(4),
        borderWidth: scaleWidth(2),
        borderColor: '#E9F5FF',
    },
    agentInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scaleWidth(10)
    },
    agentName: {
        fontSize: scaleFont(14),
        fontWeight: '800',
        color: customColors.gray900 || '#333',
        marginBottom: scaleHeight(2),
    },
    agentIdText: {
        fontSize: scaleFont(12),
        color: customColors.gray600 || '#666',
    },
    noUserFoundText: {
        color: 'red',
        fontSize: scaleFont(12),
        marginLeft: scaleWidth(10),
    },
    noAgentFound: {
        padding: scaleHeight(12),
        backgroundColor: '#FFF2F2',
        borderRadius: scaleWidth(8),
        marginBottom: scaleHeight(20),
        alignItems: 'center',
    },
    errorText: {
        fontSize: scaleFont(14),
        color: '#FF4040',
        fontWeight: '500',
    },

    // Transfer Section
    transferContainer: {
        borderRadius: scaleWidth(10),
        padding: scaleWidth(15),
        paddingTop: scaleHeight(0)
    },
    sectionTitle: {
        fontSize: scaleFont(14),
        fontWeight: '700',
        color: customColors.gray400,
    },
    tranferAmmountTitle: {
        fontSize: scaleFont(16),
        fontWeight: '700',
        color: customColors.gray800,
        paddingBottom: scaleHeight(8)
    },
    required: {
        color: 'red',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: scaleWidth(10),
        paddingHorizontal: scaleWidth(10),
        marginBottom: scaleHeight(15),
        backgroundColor: customColors.inputBg,
    },
    input: {
        flex: 1,
        paddingVertical: scaleHeight(12),
        fontSize: scaleFont(14),
        color: customColors.gray900,
        fontWeight: '500',
    },

    // Banner Container
    bannerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    leftCircle: {
        width: scaleWidth(120),
        height: scaleHeight(100),
        backgroundColor: customColors.primary,
        position: 'absolute',
        borderRadius: scaleWidth(50),
        left: scaleWidth(-50),
        top: '50%',
        transform: [{ translateY: -scaleHeight(50) }],
    },
    rightCircle: {
        width: scaleWidth(120),
        height: scaleHeight(100),
        backgroundColor: customColors.primary,
        position: 'absolute',
        borderRadius: scaleWidth(50),
        right: scaleWidth(-50),
        top: '50%',
        transform: [{ translateY: -scaleHeight(50) }],
    },
    textContainer: {},
    toBeText: {
        fontWeight: 'bold',
        fontSize: scaleFont(20),
        color: 'black',
        textShadowColor: "rgba(0, 0, 0, 0.4)",
        textShadowOffset: { width: scaleWidth(2), height: scaleHeight(2) },
        textShadowRadius: scaleWidth(1),
    },
    officialRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleWidth(2),
    },
    officialText: {
        fontWeight: 'bold',
        fontSize: scaleFont(20),
        color: customColors.accent,
        textShadowColor: "rgba(0, 0, 0, 0.4)",
        textShadowOffset: { width: scaleWidth(2), height: scaleHeight(2) },
        textShadowRadius: scaleWidth(1),
    },
    dollarIcon: {
        width: scaleWidth(25),
        height: scaleHeight(25),
    },
    coinsellerText: {
        fontWeight: 'bold',
        fontSize: scaleFont(20),
        color: customColors.accent,
        textShadowColor: "rgba(0, 0, 0, 0.4)",
        textShadowOffset: { width: scaleWidth(2), height: scaleHeight(2) },
        textShadowRadius: scaleWidth(1),
    },
    startingText: {
        fontWeight: 'bold',
        fontSize: scaleFont(10),
        color: '#ffffff',
        backgroundColor: 'black',
        borderRadius: scaleWidth(120),
        padding: scaleWidth(2),
        width: 'auto',
    },
    smallDollarIcon: {
        width: scaleWidth(8),
        height: scaleHeight(8),
    },

    // Transfer Button
    transferButton: {
        width: "100%",
        paddingVertical: scaleHeight(15),
        borderRadius: scaleWidth(25),
        alignItems: 'center',
        marginTop: scaleHeight(20),
    },
    transferButtonText: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: 'white',
    },
});
