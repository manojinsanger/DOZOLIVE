import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import ThemedText from '@/components/ThemedText';
import Clipboard from '@react-native-clipboard/clipboard';
import  FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialIcons';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';

export interface AgentCardProps {
    name: string;
    status: string;
    imageUrl: string;
    accountId: string;
    country: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({ name, status, accountId, imageUrl, country }) => {
    const isOnline = status === 'Online';

    const handleCopyID = () => {
        Clipboard.setString(accountId);
        console.log('Copied to Clipboard', `ID: ${accountId}`);
    };

    const handleWhatsAppPress = () => {
        console.log('WhatsApp Icon Clicked for', name);
        // Future: WhatsApp deep linking can be added here
    };

    return (
        <TouchableOpacity
            style={[styles.card, { borderColor: customColors.secondary }]}
            activeOpacity={0.7}
        >
            <View style={styles.avatarContainer}>
                <Image source={{ uri: imageUrl }} style={styles.avatar} />
                <View style={[styles.statusDot, isOnline ? styles.online : styles.offline]} />
            </View>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <ThemedText style={styles.name}>
                        {name}
                    </ThemedText>
                    <View style={[styles.statusBadge, isOnline ? styles.onlineBadge : styles.offlineBadge]}>
                        <Text style={styles.statusText}>{status}</Text>
                    </View>
                </View>
                <View style={styles.idContainer}>
                    <ThemedText numberOfLines={1} style={styles.idText}>
                        ID: {accountId}
                    </ThemedText>
                    <TouchableOpacity onPress={handleCopyID} style={styles.copyButton}>
                        <MaterialCommunityIcons
                            name="content-copy"
                            size={scaleWidth(16)}
                            color={customColors.textLightPrimary}
                            style={styles.copyIcon}
                        />
                    </TouchableOpacity>
                </View>
                <ThemedText numberOfLines={1} style={styles.countryText}>
                    {country}
                </ThemedText>
            </View>
            <TouchableOpacity onPress={handleWhatsAppPress} style={styles.whatsappButton}>
                <FontAwesome name="whatsapp" size={scaleWidth(24)} color="#25D366" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: scaleHeight(6),
        paddingHorizontal: scaleWidth(16),
        marginHorizontal: scaleWidth(5),
        marginBottom: scaleHeight(15),
        borderRadius: scaleWidth(15),
        borderWidth: scaleWidth(2),
        backgroundColor: customColors.white,
        shadowOffset: { width: 0, height: scaleHeight(3) },
        shadowOpacity: 0.15,
        shadowRadius: scaleWidth(6),
        elevation: 4,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: scaleWidth(15),
    },
    avatar: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        borderRadius: scaleWidth(25),
        borderWidth: scaleWidth(2),
        borderColor: customColors.white,
    },
    statusDot: {
        position: 'absolute',
        bottom: scaleHeight(2),
        right: scaleWidth(2),
        width: scaleWidth(12),
        height: scaleWidth(12),
        borderRadius: scaleWidth(6),
        borderWidth: scaleWidth(2),
        borderColor: customColors.white,
    },
    online: {
        backgroundColor: '#02bd39',
    },
    offline: {
        backgroundColor: '#a8a8a8',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleHeight(6),
    },
    name: {
        fontSize: scaleFont(18),
        fontWeight: '700',
        marginRight: scaleWidth(8),
        color: customColors.textLightPrimary,
    },
    statusBadge: {
        paddingHorizontal: scaleWidth(8),
        paddingVertical: scaleHeight(2),
        borderRadius: scaleWidth(12),
    },
    onlineBadge: {
        backgroundColor: 'rgba(2, 189, 57, 0.2)',
    },
    offlineBadge: {
        backgroundColor: 'rgba(168, 168, 168, 0.2)',
    },
    statusText: {
        fontSize: scaleFont(12),
        fontWeight: '600',
        color: '#fff',
    },
    idContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaleHeight(4),
    },
    idText: {
        fontSize: scaleFont(14),
        color: customColors.textLightSecondary,
    },
    copyButton: {
        marginLeft: scaleWidth(8),
        padding: scaleWidth(4),
    },
    copyIcon: {},
    countryText: {
        fontSize: scaleFont(14),
        fontWeight: '500',
        color: customColors.textLightPrimary,
    },
    whatsappButton: {
        padding: scaleWidth(8),
        backgroundColor: 'rgba(37, 211, 102, 0.1)',
        borderRadius: scaleWidth(20),
        marginLeft: scaleWidth(10),
    },
});

export default AgentCard;
