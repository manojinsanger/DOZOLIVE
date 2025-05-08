import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedView } from '@/components/ThemedView';
import PointsCard from '@/components/profile/PointsCard';
import coinIcon from "@/assets/images/icon/loyalty.png";
import PointButton from '@/components/profile/PointButton';
import CustomHeader from '@/components/profile/CustomHeader';
import BeanIcon from "@/assets/images/profile_assets/pointsIcon.png";
import { redirect } from '@/utils/navigationService';
import { scaleWidth } from '@/constants/scaling';
import ThemedText from '@/components/ThemedText';
import { useAppDispatch } from '@/store/useTypeDispatchSelector';
import { useUser } from '@/context/UserProvider';
import { fetchTransactionsRequest } from '@/store/features/wallet/walletSlice';

type IncomeSource = {
    id: string;
    title: string;
    amount: number;
};

const PointsScreen: React.FC = () => {

    const dispatch = useAppDispatch();
    const { userAllDetails } = useUser()

    React.useEffect(() => {
        dispatch(fetchTransactionsRequest({
            commonId: userAllDetails?.id, secondUserID: userAllDetails.specialId || userAllDetails.liveId, page: 1,
            walletType: 'BEAN'
        }));

    }, []);

    const incomeSources: IncomeSource[] = [
        { id: '1', title: 'Livestream', amount: 0 },
        { id: '2', title: 'Party', amount: 0 },
        { id: '3', title: 'Commission', amount: 28884850 },
        { id: '4', title: 'Transfer beans', amount: 900000 },
        { id: '5', title: 'Platform Rewards', amount: 0 },
    ];


    const handleDetailsPress = () => redirect("transactiondetails");
    const handleWithdrawPress = () => redirect("withdrawnow", { id: "epay" });
    const handleExchangePress = () => redirect("exchangecoins");
    const handleTransferPress = () => redirect("transfer");

    return (
        <ThemedView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent />

            <CustomHeader title="Points" onPressHandle={handleDetailsPress} rightHeader={
                <TouchableOpacity onPress={() => redirect("tradingdetails", {
                    walletType: "BEAN"
                })}>
                    <ThemedText>Details</ThemedText>
                </TouchableOpacity>
            } />
            <PointsCard />

            <View style={styles.incomeSection}>
                <View style={styles.incomeHeader}>
                    <Text style={styles.incomeTitle}>Income</Text>
                    <TouchableOpacity style={styles.periodSelector}>
                        <Ionicons name="calendar-outline" size={20} color="black" />
                        <Text style={styles.periodText}>Last 30 days</Text>
                        <Ionicons name="chevron-down" size={20} color="black" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.incomeList}>
                    {incomeSources.map((source) => (
                        <TouchableOpacity key={source.id} style={styles.incomeItem}>
                            <Text style={styles.incomeItemText}>{source.title}</Text>
                            <View style={styles.incomeItemRight}>
                                <Image style={styles.pointIcon} source={BeanIcon} />
                                <Text style={styles.incomeItemAmount}>
                                    {source.amount.toLocaleString()}
                                </Text>
                                <Ionicons name="chevron-forward" size={20} color="#888" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.actionButtons}>
                <PointButton
                    text="Withdraw now"
                    onPress={handleWithdrawPress}
                    backgroundColor="#6B74F7"
                    textColor="white"
                    borderColor="white"
                />
                <PointButton text="Transfer" onPress={handleTransferPress} />
                <TouchableOpacity style={styles.exchangeButton} onPress={handleExchangePress}>
                    <Image style={styles.buttonicon} source={coinIcon} />
                    <Text style={styles.exchangeButtonText}>Exchange Beans for Coins</Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
        paddingBottom: 50,
    },
    incomeSection: {
        flex: 1,
        marginTop: 24,
    },
    incomeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 8,
        alignItems: 'center',
        marginHorizontal: scaleWidth(8)
    },
    incomeTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    periodSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    periodText: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 4,
    },
    incomeList: {
        flex: 1,
        paddingHorizontal: 16,
    },
    incomeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginVertical: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        borderRadius: 8,
    },
    incomeItemText: {
        fontSize: 16,
        color: '#333',
    },
    incomeItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginRight: 4,
    },
    incomeItemAmount: {
        fontSize: 16,
        color: '#333',
        marginRight: 4,
    },
    actionButtons: {
        padding: 16,
        paddingHorizontal: 50,
        gap: 10
    },
    exchangeButton: {
        flexDirection: 'row',
        borderRadius: 24,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#5C6BC0',
    },
    buttonicon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    exchangeButtonText: {
        color: '#5C6BC0',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default PointsScreen;
