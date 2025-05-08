import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface RecordCardProps {
    title: string;
    date: string;
    amount: number;
}

const RecordCard: React.FC<RecordCardProps> = ({ title, date, amount }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>

            <Text style={[styles.amount, amount >= 0 ? styles.positive : styles.negative]}>
                {amount >= 0 ? `+${amount}` : `${amount}`}
            </Text>
        </View>
    );
};

export default RecordCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        paddingVertical:16,
        // marginVertical: 6,
        // borderRadius: 8,
        // shadowColor: 'gray',
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 2,
        marginHorizontal: 6,

    },
    textContainer: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: '500',
    },
    positive: {
        // color: 'green',
    },
    negative: {
        // color: 'red',
    },
});
