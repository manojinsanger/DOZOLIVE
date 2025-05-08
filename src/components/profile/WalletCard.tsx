import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling'; // Adjust path as needed
import Ionicons from 'react-native-vector-icons/Ionicons';
import customColors from '@/constants/styles';

interface WalletCardProps {
    title: string;
    tag: string;
    selected: boolean;
    disabled?: boolean;
    onPress: () => void;
}

const WalletCard = ({ title, tag, selected, disabled, onPress }: WalletCardProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.cardContainer,
                selected && styles.cardSelected,
                disabled && styles.cardDisabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={styles.cardTopRow}>
                <Text style={[styles.cardTitle, disabled && styles.textDisabled]}>{title}</Text>
                {selected && (
                    <Ionicons name="checkmark-circle" size={20} color="#4A6CF7" />
                )}
            </View>
            <View style={[styles.tag, { backgroundColor: !selected ? customColors.gray500 : '#4A6CF7' }]}>
                <Text style={styles.tagText}>{tag}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default WalletCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: '48%',
        backgroundColor: '#F5F6FB',
        padding: scaleWidth(10),
        paddingVertical: scaleHeight(7),
        borderRadius: scaleWidth(12),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'space-between',
    },
    cardSelected: {
        backgroundColor: '#E6ECFF',
        borderColor: '#4A6CF7',
    },
    cardDisabled: {
        backgroundColor: '#EDEDED',
        borderColor: '#C5C5C5',
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scaleHeight(8),
    },
    cardTitle: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#000',
    },
    tag: {
        alignSelf: 'flex-start',
        paddingHorizontal: scaleWidth(8),
        paddingVertical: scaleHeight(4),
        borderRadius: scaleWidth(20),
        backgroundColor: '#4A6CF7',
    },
    tagText: {
        color: '#fff',
        fontSize: scaleFont(10),
        fontWeight: '600',
    },
    textDisabled: {
        color: '#A0A0A0',
    },
});
