import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ThemedText from '@/components/ThemedText';
import { formatDistanceToNow } from 'date-fns';
import LevelIcon from '../../assets/images/profile_assets/star.png';
import avatar from '../../assets/images/icon/user.png';
import { MessageCardProps } from '@/types/types';
import customColors from '../../constants/styles';


export const MessageCard: React.FC<MessageCardProps> = ({id, name, status, lastMessage, imageUrl, lastMessageTime }) => {
    const isOnline = status === 'Online';

    const formattedLastMessageTime = formatDistanceToNow(new Date(lastMessageTime), { addSuffix: true });

    return (
             <TouchableOpacity
            style={[styles.card, { backgroundColor:customColors.inputBg },]}
            onPress={() => router.push({ pathname: "/chat", params: {
                receiverId: id,
                receiverName: name,
                receiverImage: imageUrl,
            } })}
            activeOpacity={0.8}>
            <View style={styles.avatarContainer}>
                <Image  source={imageUrl ? { uri: imageUrl } : avatar} style={styles.avatar} />
                <View style={[styles.statusDot, isOnline ? styles.online : styles.offline]} />
            </View>
            <View style={styles.content}>
                <View style={styles.nameContainer}>
                    <ThemedText  style={styles.name}>
                        {name}
                    </ThemedText>
                    <View style={[styles.chip, styles.levelChip]}>
                        <Image source={LevelIcon} style={styles.icon} />
                        <ThemedText style={[styles.chipText, { color: 'white' }]}>
                            10
                        </ThemedText>
                    </View>
                </View>
                <ThemedText numberOfLines={1} style={styles.lastMessage}>
                    {lastMessage}
                </ThemedText>
            </View>
            <ThemedText  style={styles.lastMessageTime}>
                {formattedLastMessageTime}
            </ThemedText>
        </TouchableOpacity>
       
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        marginBottom: 15,
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        marginRight: 15,
    },
    statusDot: {
        position: 'absolute',
        bottom: 5,
        right: 15,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    online: {
        backgroundColor: '#02bd39',
    },
    offline: {
        backgroundColor: '#a8a8a8',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
    lastMessage: {
        fontSize: 15,
        marginBottom: 5,
    },
    lastMessageTime: {
        fontSize: 12,
        color: '#888',
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -8 }],
    },
    levelChip: {
        backgroundColor: '#d62828',
        paddingVertical: 1,
        paddingHorizontal: 6,
        borderRadius: 20,
    },
    icon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
        justifyContent: 'center',
    },
    chipText: {
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 12,
    },
});