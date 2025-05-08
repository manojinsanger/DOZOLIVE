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
                <ThemedText style={styles.transactionDesc}>{transaction.description} </ThemedText>

                <TouchableOpacity style={styles.agentContainer}>
                    <ThemedText>{transaction.agent.name}</ThemedText>
                    <ThemedText style={styles.agentId}>({transaction.agent.id})</ThemedText>
                </TouchableOpacity>

                <ThemedText style={styles.transactionDate}>{transaction.dateTime}</ThemedText>
            </View>

            <View style={styles.amountContainer}>
                <ThemedText style={styles.transactionAmount}>{transaction.points.toLocaleString()}</ThemedText>
                <ThemedText style={styles.transactionPoints}>{transaction.amount}</ThemedText>
            </View>
        </View>
    );
};

// Main Component
const TransactionDetailsScreen: React.FC = () => {
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

            <CustomHeader title='Details' />

            {/* Filter Bar */}
            <FilteredByDate/>

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
        fontSize: 16,
        color: '#999999',
        marginBottom: 4,
    },
    transactionPoints: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    bottomPadding: {
        height: 20,
    },
});

export default TransactionDetailsScreen;