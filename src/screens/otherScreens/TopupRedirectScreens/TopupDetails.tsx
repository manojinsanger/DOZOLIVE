import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import CustomHeader from '@/components/profile/CustomHeader';
import FilteredByDate from '@/components/profile/FilteredByDate';
import LinnerGradientCard3 from '@/components/common/gradientCards/LinnearGradientCard3';
import customColors from '@/constants/styles';
import { redirect } from '@/utils/navigationService';
import DarkContentStatusBar from '@/components/statusbar/DarkContentStatusBar';
import ThemedText from '@/components/ThemedText';


// Types
interface Transaction {
    id: string;
    description: string;
    agent: {
        name: string;
        id: string;
    };
    dateTime: string;
    amount: number;
    points: number;
}


const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {

    return (

        <View style={styles.transactionRow}>

            <View style={styles.transactionInfo}>


                <TouchableOpacity style={styles.agentContainer}>
                    <ThemedText> Gave it to {transaction.agent.name}</ThemedText>
                    <ThemedText style={styles.agentId}> ( {transaction.agent.id})</ThemedText>
                </TouchableOpacity>

                <ThemedText style={styles.transactionDate}>{transaction.dateTime}</ThemedText>
            </View>

            <View style={styles.amountContainer}>
                <ThemedText style={styles.transactionAmount}>{transaction.amount}</ThemedText>
                <ThemedText style={styles.transactionPoints}>
                    {transaction.points.toLocaleString()}
                </ThemedText>
            </View>
        </View>
    );
};

// Main Component
const TopupDetails: React.FC = () => {
    const [transactions] = useState<Transaction[]>([
        {
            id: '1',
            description: 'invite agent commission',
            agent: {
                name: 'AGENT MR.CAT',
                id: '1345234',
            },
            dateTime: '2025-04-01 18:32:49',
            amount: 28,
            points: 256562,
        },
        {
            id: '2',
            description: 'invite agent commission',
            agent: {
                name: 'AGENT MR.CAT',
                id: '1345234',
            },
            dateTime: '2025-04-01 18:32:02',
            amount: 28,
            points: 256534,
        },
        {
            id: '3',
            description: 'invite agent commission',
            agent: {
                name: 'AGENT MR.CAT',
                id: '1345234',
            },
            dateTime: '2025-04-01 18:31:19',
            amount: 108,
            points: 256506,
        },
        {
            id: '4',
            description: 'invite agent commission',
            agent: {
                name: 'KRISHNA',
                id: '1867297',
            },
            dateTime: '2025-04-01 18:29:37',
            amount: 168,
            points: 256398,
        },
        {
            id: '5',
            description: 'invite agent commission',
            agent: {
                name: 'KRISHNA',
                id: '1867297',
            },
            dateTime: '2025-04-01 18:28:43',
            amount: 168,
            points: 256230,
        },
        {
            id: '6',
            description: 'invite agent commission',
            agent: {
                name: 'AGENT MR.CAT',
                id: '1345234',
            },
            dateTime: '2025-04-01 18:28:43',
            amount: 100,
            points: 256062,
        },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <DarkContentStatusBar />
            <CustomHeader title='Details' />
            <LinnerGradientCard3 customStyles={{ padding: 20 ,marginHorizontal:10}}>

                <View style={styles.topRow}>
                    <View style={styles.coinInfo}>
                        <ThemedText style={styles.coinValue}>0</ThemedText>
                        <ThemedText style={styles.coinLabel}>Remaining Coins</ThemedText>
                    </View>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => redirect("coins")}>
                        <Text style={styles.detailsText}>Top up</Text>

                    </TouchableOpacity>
                </View>
            </LinnerGradientCard3>

            {/* Filter Bar */}

            <FilteredByDate
                showPeriodFilter={false}
                showDateFilter={true}
                showTypeFilter={true}

            />

            {/* Transaction List */}
            <ScrollView style={styles.transactionList}>
                {transactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                ))}

                {/* Bottom padding for scrolling */}
                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: StatusBar.currentHeight
    },

    transactionList: {
        flex: 1,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    transactionInfo: {
        flex: 1,
        marginRight: 16,
    },
    transactionDesc: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 6,
    },
    agentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    shield: {
        fontSize: 14,
    },
    redSquare: {
        fontSize: 14,
    },
    tiger: {
        fontSize: 14,
    },
    agentId: {
        fontSize: 14,
        color: '#5C73FF',
    },
    transactionDate: {
        fontSize: 14,
        color: '#999999',
    },
    amountContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    transactionAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    transactionPoints: {
        fontSize: 14,
        // fontWeight: 'bold',
        color: '#333333',
    },
    bottomPadding: {
        height: 20,
    },
    cardContainer: {
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 8,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    detailsButton: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: customColors.white,
    },
    detailsText: {
        color: "black",
        fontSize: 14,
        fontWeight: "600",
    },
    coinInfo: {
        alignItems: "flex-start",
    },
    coinValue: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    coinLabel: {
        color: "white",
        opacity: 0.8,
        fontSize: 14,
        marginTop: 4,
    },
});

export default TopupDetails;