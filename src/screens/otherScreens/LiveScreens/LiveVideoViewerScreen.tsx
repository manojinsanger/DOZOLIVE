import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    PermissionsAndroid,
    Platform,
    BackHandler,
    findNodeHandle,
} from 'react-native';
import ZegoExpressEngine, {
    ZegoTextureView,
    ZegoScenario,
    ZegoUser,
    ZegoRoomConfig,
    ZegoUpdateType,
    ZegoViewMode,
} from 'zego-express-engine-reactnative';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { goBack } from '@/utils/navigationService';
import LiveSetupExitModal from '@/components/live/LiveSetupExitModal';
import LiveOverlayOfLive from '@/components/live/LiveOverlayOfLive';
import MainContainer3 from '@/components/common/mainContainers/MainContainer3';
import { useAuth } from '@/context/AuthProvider';
import KeepAwake from 'react-native-keep-awake';
// Interfaces
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

// Default system message
const defaultMessage =
    'Contents containing vulgarity, pornography, violence, and minors are strictly prohibited Administrators monitor the feed 24/7 Reported contents and violations will be severely penalized';

// Room configuration
const roomConfig: ZegoRoomConfig = {
    isUserStatusNotify: true,
    maxMemberCount: 50,
    token: '',
};

const ViewerVideoLiveScreen = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isStreamPlaying, setIsStreamPlaying] = useState(false);
    const [users, setUsers] = useState<ZegoUser[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [allMessages, setAllMessages] = useState<AllMessage[]>([
        {
            id: 'system-0',
            type: 'system',
            message: defaultMessage,
            timestamp: Date.now(),
        },
    ]);
    const [roomMessages, setRoomMessages] = useState<RoomMessage[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const streamViewRef = useRef<any>(null);
    const { user } = useAuth();

    // Zego Configuration
    const zegoConfig = {
        appID: 756008351,
        appSign: 'ded150241da12d93cd6b504941d70e838f7768888a56ad83b73db71468dad546',
        userID: String(user?.liveId), // Unique viewer ID
        roomID: '9999',
        scenario: ZegoScenario.Broadcast,
        streamID: '333', // Matches host's streamID
    };

    // Initialize Zego Engine and join room
    useEffect(() => {
        const initZego = async () => {
            try {
                // Create Zego Engine
                console.log('Initializing Zego Engine...');
                await ZegoExpressEngine.createEngineWithProfile({
                    appID: zegoConfig.appID,
                    appSign: zegoConfig.appSign,
                    scenario: zegoConfig.scenario,
                });
                console.log('Zego Engine initialized successfully');

                if (Platform.OS === 'android') await requestPermissions();

                const instance = ZegoExpressEngine.instance();

                // Set up event listeners
                instance.on(
                    'roomUserUpdate',
                    (roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]) => {
                        console.log('User Update:', {
                            roomID,
                            updateType,
                            userList: userList.map((u) => ({ userID: u.userID, userName: u.userName })),
                        });
                        if (roomID === zegoConfig.roomID) {
                            if (updateType === ZegoUpdateType.Add) {
                                setUsers((prevUsers) => [...prevUsers, ...userList]);
                                setAllMessages((prev) => [
                                    ...prev,
                                    ...userList.map((u) => ({
                                        id: `join-${u.userID}-${Date.now()}`,
                                        type: 'join',
                                        userID: u.userID,
                                        userName: u.userName,
                                        timestamp: Date.now(),
                                    })),
                                ]);
                                setRoomMessages((prev) => [
                                    ...prev,
                                    ...userList.map((u) => ({
                                        id: `join-${u.userID}-${Date.now()}`,
                                        type: 'join',
                                        message: `${u.userName} joined the room`,
                                        timestamp: Date.now(),
                                    })),
                                ]);
                            } else if (updateType === ZegoUpdateType.Delete) {
                                setUsers((prevUsers) =>
                                    prevUsers.filter((user) => !userList.some((u) => u.userID === user.userID)),
                                );
                                setAllMessages((prev) => [
                                    ...prev,
                                    ...userList.map((u) => ({
                                        id: `leave-${u.userID}-${Date.now()}`,
                                        type: 'leave', // Fixed typo: typenz -> type
                                        userID: u.userID,
                                        userName: u.userName,
                                        timestamp: Date.now(),
                                    })),
                                ]);
                                setRoomMessages((prev) => [
                                    ...prev,
                                    ...userList.map((u) => ({
                                        id: `leave-${u.userID}-${Date.now()}`,
                                        type: 'leave',
                                        message: `${u.userName} left the room`,
                                        timestamp: Date.now(),
                                    })),
                                ]);
                            }
                        }
                    },
                );

                instance.on('IMRecvBroadcastMessage', (roomID: string, messageList: any[]) => {
                    console.log('Broadcast Received:', {
                        roomID,
                        messageList: messageList.map((msg) => ({
                            message: msg.message,
                            userID: msg.fromUser.userID,
                            userName: msg.fromUser.userName,
                            timestamp: msg.sendTime,
                        })),
                    });
                    if (roomID === zegoConfig.roomID) {
                        const newMessages = messageList.map((msg) => ({
                            id: `${msg.fromUser.userID}-${msg.sendTime}`,
                            message: msg.message,
                            userID: msg.fromUser.userID,
                            userName: msg.fromUser.userName,
                            timestamp: msg.sendTime,
                        }));
                        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
                        setAllMessages((prev) => [
                            ...prev,
                            ...newMessages.map((msg) => ({
                                id: msg.id,
                                type: 'chat',
                                message: msg.message,
                                userID: msg.userID,
                                userName: msg.userName,
                                timestamp: msg.timestamp,
                            })),
                        ]);
                    }
                });

                instance.on('roomStateUpdate', (roomID: string, state: any, errorCode: number) => {
                    console.log('Room State Update:', { roomID, state, errorCode });
                    if (errorCode !== 0) {
                        setErrorMessage(`Room connection error: ${errorCode}`);
                    }
                });

                instance.on('roomStreamUpdate', (roomID: string, updateType: ZegoUpdateType, streamList: any[]) => {
                    console.log('Stream Update:', { roomID, updateType, streamList: streamList.map((s) => s.streamID) });
                    if (roomID === zegoConfig.roomID && updateType === ZegoUpdateType.Add) {
                        const targetStream = streamList.find((stream) => stream.streamID === zegoConfig.streamID);
                        console.log('Target Stream Found:', targetStream);
                        if (targetStream && !isStreamPlaying) {
                            startPlayingStream();
                        }
                    }
                });

                // Login to room
                console.log('Logging into room...');
                await loginRoom();
                console.log('Room login successful');

                // Start playing stream with retry logic
                startPlayingStreamWithRetry();
            } catch (err:any) {
                console.error('Zego init error:', err);
                setErrorMessage(err.message || 'Failed to initialize stream');
            }
        };

        initZego();

        // Handle hardware back button press
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setIsModalVisible(true);
            return true;
        });

        return () => {
            backHandler.remove();
            const instance = ZegoExpressEngine.instance();
            instance.off('roomUserUpdate');
            instance.off('IMRecvBroadcastMessage');
            instance.off('roomStateUpdate');
            instance.off('roomStreamUpdate');
            instance.stopPlayingStream(zegoConfig.streamID);
            instance.logoutRoom(zegoConfig.roomID);
            ZegoExpressEngine.destroyEngine();
        };
    }, []);

    const requestPermissions = async () => {
        try {
            const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
            const results = await PermissionsAndroid.requestMultiple(permissions);
            const allGranted = Object.values(results).every((status) => status === 'granted');
            if (!allGranted) console.warn('Some permissions denied');
        } catch (err) {
            console.error('Permission request error:', err);
        }
    };

    const loginRoom = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            const userData: ZegoUser = {
                userID: zegoConfig.userID,
                userName: user?.name || 'Viewer',
            };
            await instance.loginRoom(zegoConfig.roomID, userData, roomConfig);
            console.log(`Successfully joined room: ${zegoConfig.roomID}`);
        } catch (err) {
            console.error('Failed to login to room:', err);
            setErrorMessage(err.message || 'Failed to join room');
            throw err;
        }
    };

    const startPlayingStream = async () => {
        if (isStreamPlaying) return true;
        try {
            const instance = ZegoExpressEngine.instance();
            const reactTag = findNodeHandle(streamViewRef.current);
            console.log('reactTag:', reactTag);
            if (!reactTag) {
                console.error('Invalid stream view ref: reactTag is null');
                setErrorMessage('Invalid stream view ref');
                return false;
            }
            console.log(`Attempting to play stream: ${zegoConfig.streamID}`);
            await instance.startPlayingStream(zegoConfig.streamID, {
                reactTag,
                viewMode: ZegoViewMode.AspectFill,
                backgroundColor: 0,
            });
            console.log('Stream playing started successfully');
            setIsStreamPlaying(true);
            setErrorMessage(null);
            return true;
        } catch (err) {
            console.error('Failed to play stream:', err);
            setErrorMessage(err.message || 'Failed to play stream');
            return false;
        }
    };

    const startPlayingStreamWithRetry = async (retries = 10, delay = 3000) => {
        for (let i = 0; i < retries; i++) {
            console.log(`Attempt ${i + 1} to play stream`);
            const success = await startPlayingStream();
            if (success) return;
            if (i < retries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        setErrorMessage('Failed to play stream after multiple attempts');
    };

    const sendMessage = async (message: string) => {
        if (!message.trim()) return;
        try {
            const instance = ZegoExpressEngine.instance();
            const result = await instance.sendBroadcastMessage(zegoConfig.roomID, message);
            if (result.errorCode === 0) {
                console.log('Message sent successfully:', message);
                const newMessage: Message = {
                    id: `${zegoConfig.userID}-${Date.now()}`,
                    message,
                    userID: zegoConfig.userID,
                    userName: user?.name || 'Viewer',
                    timestamp: Date.now(),
                };
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setAllMessages((prev) => [
                    ...prev,
                    {
                        id: newMessage.id,
                        type: 'chat',
                        message: newMessage.message,
                        userID: newMessage.userID,
                        userName: newMessage.userName,
                        timestamp: newMessage.timestamp,
                    },
                ]);
            } else {
                console.error('Failed to send message:', result.errorCode);
                setErrorMessage(`Failed to send message (Error: ${result.errorCode})`);
            }
        } catch (err) {
            console.error('Error sending message:', err);
            setErrorMessage('Error sending message');
        }
    };

    const handleBackPress = () => {
        setIsModalVisible(true);
    };

    const confirmExit = () => {
        setIsModalVisible(false);
        goBack();
    };

    const cancelExit = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
             <KeepAwake /> 
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Entypo name="cross" size={25} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.fullScreenContainer}>
                <MainContainer3>
                    <ZegoTextureView ref={streamViewRef} style={styles.streamView} />
                </MainContainer3>
            </View>

            {!isStreamPlaying && (
                <View style={styles.streamOff}>
                    <View style={styles.streamOffContent}>
                        <MaterialCommunityIcons name="video-off" size={scaleWidth(30)} color={customColors.primary} />
                        <Text style={styles.streamOffText}>Stream is not available</Text>
                        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                        <TouchableOpacity onPress={startPlayingStreamWithRetry} style={styles.retryButton}>
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.liveOverlay}>
                <LiveOverlayOfLive
                    isFront={true}
                    onPress={() => { }}
                    handleBackPress={handleBackPress}
                    toggleMic={() => { }}
                    isMicOn={true}
                    users={users}
                    messages={messages}
                    sendMessage={sendMessage}
                    allMessages={allMessages}
                    setAllMessages={setAllMessages}
                    roomMessages={roomMessages}
                />
            </View>

            <LiveSetupExitModal visible={isModalVisible} onConfirm={confirmExit} onCancel={cancelExit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: {
        zIndex: 200,
        position: 'absolute',
        top: 50,
        right: 10,
        left: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    fullScreenContainer: { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20 },
    streamView: { flex: 1, zIndex: 30 },
    streamOff: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    streamOffContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: scaleWidth(20),
        paddingHorizontal: scaleWidth(30),
        borderRadius: scaleWidth(20),
        alignItems: 'center',
    },
    streamOffText: { color: customColors.gray500, textAlign: 'center', fontSize: scaleFont(14) },
    errorText: { color: '#f66', textAlign: 'center', fontSize: scaleFont(12), marginTop: 10 },
    liveOverlay: { position: 'absolute', top: 35, left: 0, right: 0, bottom: 0, zIndex: 50 },
    retryButton: {
        marginTop: scaleHeight(10),
        backgroundColor: customColors.primary,
        paddingVertical: scaleHeight(8),
        paddingHorizontal: scaleWidth(20),
        borderRadius: scaleWidth(5),
    },
    retryButtonText: {
        color: customColors.white,
        fontSize: scaleFont(14),
        fontWeight: '600',
    },
});

export default ViewerVideoLiveScreen;
