import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyScreenProps {
    message?: string;
    icon?: React.ReactNode;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ message = 'No data available', icon }) => {
    return (
        <View style={styles.container}>
            {icon}
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        color: '#666',
    },
});

export default EmptyScreen;
