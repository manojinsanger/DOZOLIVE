import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, FlatList, TextInput } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { defaultPadding, scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CameraMicToggleBtn from './CameraMicToggleBtn';
import MessagesModal from './Modals/MessageModal';
import { ZegoUser } from 'zego-express-engine-reactnative';

interface Message {
    id: string;
    message: string;
    userID: string;
    userName: string;
    timestamp: number;
}

interface AllMessage {
    id: string;
    type: 'join' | 'leave' | 'chat' | 'system';
    message?: string;
    userID?: string;
    userName?: string;
    timestamp: number;
}

interface RoomMessage {
    id: string;
    type: 'system' | 'join' | 'leave';
    message: string;
    timestamp: number;

}

interface BottomControlsProps {
    onHandleBottomSheet: (show: boolean) => void;
    isMicMuted: boolean;
    onToggleMic: () => void;
    onLeaveRoom: () => void;
    onSendMessage: (message: string) => void;
    chatMessages?: Message[];
    users?: ZegoUser[];
    messages?: Message[];
    sendMessage?: (message: string) => Promise<void>;
    allMessages?: AllMessage[];
    setAllMessages?: React.Dispatch<React.SetStateAction<AllMessage[]>>;
    roomMessages?: RoomMessage[];
}
// Constants
const lightBackground = 'rgba(0, 8, 44, 0.2)';
const selectedBackground = 'rgba(0, 45, 247, 0.7)';

const BottomControls: React.FC<BottomControlsProps> = ({
    onHandleBottomSheet,
    isMicMuted,
    onToggleMic,
    onLeaveRoom,
    onSendMessage,
    chatMessages,
    users,
    messages,
    sendMessage,
    allMessages,
    setAllMessages,
    roomMessages,
}) => {
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState('');
    const chatHeight = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const [messagesModalVisible, setMessagesModalVisible] = useState(false);


    // Animate chat visibility
    useEffect(() => {
        Animated.timing(chatHeight, {
            toValue: showChat ? scaleHeight(200) : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [showChat]);

    // Scroll to the latest message when chatMessages updates
    useEffect(() => {
        if (showChat && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [chatMessages, showChat]);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage(''); // Clear input after sending
        }
    };

    const renderChatMessage = ({ item }: { item: Message }) => (
        <View style={styles.chatMessage}>
            <Text style={styles.chatMessageUser}>{item.userName}: </Text>
            <Text style={styles.chatMessageText}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Chat Window */}
            <Animated.View style={[styles.chatContainer, { height: chatHeight }]}>
                <FlatList
                    ref={flatListRef}
                    data={chatMessages}
                    renderItem={renderChatMessage}
                    keyExtractor={(item) => item.id}
                    style={styles.chatList}
                />
            </Animated.View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
                {/* Message Button and Mic Toggle */}
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
                    <CameraMicToggleBtn size={24} toggleMic={onToggleMic} isMicOn={!isMicMuted} />
                    <TouchableOpacity
                        style={{ backgroundColor: lightBackground, borderRadius: 100, padding: 8 }}
                        onPress={() => setMessagesModalVisible(true)}
                    >
                        <AntDesign name="message1" size={26} color="white" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.controlButton}>
                    <FontAwesome name="smile-o" size={scaleWidth(26)} color="#fff" />
                </TouchableOpacity>


                {/* Tools Button */}
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => onHandleBottomSheet(true)}
                >
                    <Icon name="grid-view" size={scaleWidth(24)} color="#fff" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>

                {/* Game Button */}
                <TouchableOpacity style={styles.controlButton}>
                    <Image
                        style={styles.gameIcon}
                        source={require('@/assets/images/live_images/icon_room_action_game.png')}
                    />
                </TouchableOpacity>

                {/* Sale Button */}
                <TouchableOpacity style={styles.saleButton}>
                    <Text style={styles.saleButtonText}>80%{'\n'}OFF</Text>
                </TouchableOpacity>

                {/* Gift Button */}
                <TouchableOpacity style={styles.giftButton}>
                    <Icon name="card-giftcard" size={scaleWidth(24)} color="#fff" />
                </TouchableOpacity>
            </View>

            <MessagesModal
                visible={messagesModalVisible}
                onClose={() => setMessagesModalVisible(false)}
                messages={messages}
                sendMessage={sendMessage || (() => Promise.resolve())}
            />

            {/* Chat Input (visible when chat is open) */}
            {showChat && (
                <View style={styles.chatInputContainer}>
                    <TextInput
                        style={styles.chatInput}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message..."
                        placeholderTextColor="#999"
                        onSubmitEditing={handleSendMessage}
                        returnKeyType="send"
                    />
                    <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                        <Icon name="send" size={scaleWidth(20)} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default BottomControls;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: defaultPadding,
        paddingVertical: scaleHeight(8),
        height: scaleHeight(80),
    },
    gameIcon: {
        width: scaleWidth(36),
        height: scaleWidth(36),
    },
    micButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: scaleWidth(20),
        paddingHorizontal: scaleWidth(12),
        // paddingVertical: scaleHeight(8),
    },
    controlButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 5
    },
    buttonText: {
        color: '#fff',
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(14),
        minWidth: scaleWidth(90),
    },
    notificationDot: {
        position: 'absolute',
        top: -scaleHeight(5),
        right: -scaleWidth(5),
        width: scaleWidth(8),
        height: scaleWidth(8),
        borderRadius: scaleWidth(4),
        backgroundColor: 'red',
    },
    saleButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: scaleWidth(20),
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(6),
        alignItems: 'center',
    },
    saleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scaleFont(10),
        textAlign: 'center',
    },
    giftButton: {
        backgroundColor: '#8A2BE2',
        borderRadius: scaleWidth(25),
        width: scaleWidth(40),
        height: scaleWidth(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        marginBottom: scaleHeight(80),
    },
    chatList: {
        padding: scaleWidth(10),
    },
    chatMessage: {
        flexDirection: 'row',
        marginBottom: scaleHeight(5),
    },
    chatMessageUser: {
        color: '#FFD700',
        fontSize: scaleFont(12),
        fontWeight: 'bold',
    },
    chatMessageText: {
        color: '#fff',
        fontSize: scaleFont(12),
    },
    chatInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: scaleWidth(10),
        paddingVertical: scaleHeight(5),
        marginHorizontal: defaultPadding,
        borderRadius: scaleWidth(20),
        position: 'absolute',
        bottom: scaleHeight(90),
        left: 0,
        right: 0,
    },
    chatInput: {
        flex: 1,
        color: '#fff',
        fontSize: scaleFont(14),
        paddingVertical: 0,
    },
    sendButton: {
        padding: scaleWidth(5),
    },
});