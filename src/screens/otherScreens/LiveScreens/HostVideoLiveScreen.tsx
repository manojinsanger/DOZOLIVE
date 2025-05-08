import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    findNodeHandle,
    TextInput,
    BackHandler,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ZegoExpressEngine, {
    ZegoTextureView,
    ZegoScenario,
    ZegoPublishChannel,
    ZegoViewMode,
    ZegoUpdateType,
    ZegoUser,
    ZegoRoomConfig,
    ZegoVideoMirrorMode,
} from 'zego-express-engine-reactnative';
import Entypo from 'react-native-vector-icons/Entypo';
import LinnerGradientCard2 from '@/components/common/gradientCards/LinnearGradientCard2';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { goBack } from '@/utils/navigationService';
import LiveSetupExitModal from '@/components/live/LiveSetupExitModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterButton from '@/components/live/FilterButton';
import TermsAndConditions from '@/components/live/TermsAndConditions';
import MainContainer3 from '@/components/common/mainContainers/MainContainer3';
import LiveOverlayOfLive from '@/components/live/LiveOverlayOfLive';
import { useAuth } from '@/context/AuthProvider';
import ZegoEffects from '@zegocloud/zego-effects-reactnative';
import KeepAwake from 'react-native-keep-awake';
import { useZegoEffects } from '@/context/ZegoEffectsProvider';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import EffectsHelper from '@/zegodata/EffectsHelper';
import KeyCenter from '@/zegodata/KeyCenter';
// import { useZegoEffects } from '@/context/ZegoEffectsProvider';
// import { initializeZegoEffects } from '@/config/zegoEffects';



// Define live types
const liveTypes = [
    'Chatting',
    'Dancing',
    'Singing',
    'Music',
    'Comedy',
    'Talent',
    'Fitness',
    'Cooking',
    'Funny',
    'Stories',
    'Make Friends',
    'Art',
];


// Room configuration
const roomConfig: ZegoRoomConfig = {
    isUserStatusNotify: true,
    maxMemberCount: 50,
    token: '', // Will be set dynamically
};

// Default system message
const defaultMessage =
    'Contents containing vulgarity, pornography, violence, and minors are strictly prohibited Administrators monitor the feed 24/7 Reported contents and violations will be severely penalized';

// Interfaces for type safety
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

const HostVideoLiveScreen = () => {
    const [previewStarted, setPreviewStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [selectedLiveType, setSelectedLiveType] = useState('Chatting');
    const [streamType, setStreamType] = useState('Live');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingPreview, setLoadingPreview] = useState(true);
    const [isLive, setIsLive] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [users, setUsers] = useState<ZegoUser[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [intensity, setIntensity] = useState(50);
    const effectsRef = useRef<ZegoEffects | null>(null);
    const [allMessages, setAllMessages] = useState<AllMessage[]>([
        {
            id: 'system-0',
            type: 'system',
            message: defaultMessage,
            timestamp: Date.now(),
        },
    ]);
    const [roomMessages, setRoomMessages] = useState<RoomMessage[]>([]);
    const { initializeEffects } = useZegoEffects();
    const previewRef = useRef<any>(null);
    const { user } = useAuth();

    // Zego Configuration
    const zegoConfig = {
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        userID: String(user?.liveId),
        roomID: '9999',
        scenario: ZegoScenario.Broadcast,
        licence: KeyCenter.licence
    };

    useEffect(() => {
        const initZego = async () => {
          try {
            await ZegoExpressEngine.createEngineWithProfile({
              appID: zegoConfig.appID,
              appSign: zegoConfig.appSign,
              scenario: zegoConfig.scenario,
            });
            const instance = ZegoExpressEngine.instance();

            if (Platform.OS === 'android') await requestPermissions();

            const authInfo = await ZegoEffects.getAuthInfo(zegoConfig.appSign);
            console.log(authInfo, 'auth info of zego effects');

            // Create Effects instance
            const effects = new ZegoEffects(zegoConfig.licence);
            effectsRef.current = effects;

            effects.on('error', (errorCode, desc) => {
              console.error(`Error code: ${errorCode}, Description: ${desc}`);
            });

            // Enable custom video processing
            instance.enableCustomVideoProcessing(true, {}, ZegoPublishChannel.Main);

            // Set video mirror mode
            try {
              await instance.setVideoMirrorMode(ZegoVideoMirrorMode.BothMirror, ZegoPublishChannel.Main);
            } catch (err) {
              console.error('Failed to set video mirror mode:', err);
              setErrorMessage('Failed to set video mirror mode');
            }

            // Room user update listener
            instance.on('roomUserUpdate', (roomID, updateType, userList) => {
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
                      userID: u.userID,
                      userName: u.userName,
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
                      type: 'leave',
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
                      userID: u.userID,
                      userName: u.userName,
                      timestamp: Date.now(),
                    })),
                  ]);
                }
              }
            });

            // Broadcast message listener
            instance.on('IMRecvBroadcastMessage', (roomID, messageList) => {
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

            // Room state update listener
            instance.on('roomStateUpdate', (roomID, state, errorCode) => {
              console.log('Room State Update:', { roomID, state, errorCode });
            });

            // Initialize effects
            await EffectsHelper.initEffects();
            // await initializeEffects(zegoConfig.licence)

    // 
            // Log SDK versions
            // const expressVersion = await instance.getVers();
            const effectsVersion = await ZegoEffects.getVersion();
            // console.log('Express SDK Version:', expressVersion);
            console.log('Effects SDK Version:', effectsVersion);

            startPreviewWithDelay();
          } catch (err:any) {
            console.error('Zego init error:', err);
            setErrorMessage(err.message);
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
          ZegoExpressEngine.destroyEngine();
        };
      }, []);

    const requestPermissions = async () => {
        const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
        const results = await PermissionsAndroid.requestMultiple(permissions);
        const allGranted = Object.values(results).every((status) => status === 'granted');
        if (!allGranted) throw new Error('Camera or microphone permission denied');
    };

    const startPreviewWithDelay = async () => {
        setTimeout(async () => {
            try {
                const instance = ZegoExpressEngine.instance();
                const reactTag = findNodeHandle(previewRef.current);
                if (!reactTag) throw new Error('Invalid preview ref');
                await instance.startPreview(
                    { reactTag, viewMode: ZegoViewMode.AspectFill, backgroundColor: 0 },
                    ZegoPublishChannel.Main,
                );
                setPreviewStarted(true);
            } catch (err: any) {
                console.error('Preview error:', err);
                setErrorMessage(err.message);
            }
            setLoadingPreview(false);
        }, 10);
    };

    const toggleCamera = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            await instance.useFrontCamera(!isFrontCamera, ZegoPublishChannel.Main);
            setIsFrontCamera(!isFrontCamera);
        } catch (err) {
            console.error('Failed to toggle camera:', err);
        }
    };

    const toggleMic = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            await instance.muteMicrophone(isMicOn);
            setIsMicOn(!isMicOn);
        } catch (err) {
            console.error('Failed to toggle mic:', err);
        }
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (res: any) => {
            if (res.assets?.[0]?.uri) {
                setImageUri(res.assets[0].uri);
            }
        });
    };

    const selectLiveType = (type: string) => {
        setSelectedLiveType(type);
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

    const loginRoom = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            const userData: ZegoUser = { userID: zegoConfig.userID, userName: user?.name || 'Host' };
            //   const token = await fetchTokenFromServer(zegoConfig.userID, zegoConfig.roomID);
            const dynamicRoomConfig: ZegoRoomConfig = { ...roomConfig };
            await instance.loginRoom(zegoConfig.roomID, userData, dynamicRoomConfig);
            // console.log(`Successfully joined room: ${zegoConfig.roomID}`);
        } catch (err: any) {
            console.error('Failed to login to room:', err);
            setErrorMessage(err.message);
            throw err;
        }
    };

    const startLiveStream = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            await loginRoom();
            const streamID = `3333`;
            // console.log(`Publishing stream with ID: 333`);
            await instance.startPublishingStream(streamID, ZegoPublishChannel.Main, undefined);
            // console.log('Live stream started successfully');
            setIsLive(true);
        } catch (err: any) {
            console.error('Failed to start live stream:', err);
            setErrorMessage(err.message);
        }
    };

    const sendMessage = async (message: string) => {
        if (!message.trim()) return;
        try {
            const instance = ZegoExpressEngine.instance();
            const result = await instance.sendBroadcastMessage(zegoConfig.roomID, message);
            if (result.errorCode === 0) {
                // console.log('Message sent successfully:', message);
                const newMessage: Message = {
                    id: `${zegoConfig.userID}-${Date.now()}`,
                    message,
                    userID: zegoConfig.userID,
                    userName: user?.name || 'Host',
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

    const handleGoLive = (type: string) => {
        setCountdown(3);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === null) return null;
                if (prev <= 1) {
                    clearInterval(timer);
                    startLiveStream();
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (

        <View style={styles.container}>
            <KeepAwake />
            {!isLive && (
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <Entypo name="cross" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.fullScreenContainer}>
                <MainContainer3>
                    <ZegoTextureView ref={previewRef} style={styles.preview} />
                    <View style={{ position: 'absolute', top: 200, zIndex: 100 }}>


                    </View>
                    <View>

                    </View>
                </MainContainer3>
            </View>

            {!isCameraOn && (
                <View style={styles.cameraOff}>
                    <View style={styles.cameraOffContent}>
                        <MaterialCommunityIcons name="camera-off" size={scaleWidth(30)} color={customColors.primary} />
                        <Text style={styles.cameraOffText}>Your Camera Is Off Now!!!</Text>
                    </View>
                </View>
            )}

            {countdown !== null && (
                <View style={styles.countdownContainer}>
                    <Text style={styles.countdownText}>{countdown}</Text>
                </View>
            )}

            {!isLive && (
                <View style={styles.overlay}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.contentMainContainer}>
                            <View style={styles.contentContainer}>
                                <TouchableOpacity onPress={pickImage}>
                                    <View style={styles.imagePicker}>
                                        {imageUri ? (
                                            <Image source={{ uri: imageUri }} style={styles.image} />
                                        ) : (
                                            <Image
                                                source={require('../../../assets/images/icon/addImage.png')}
                                                style={styles.placeholderImage}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder="Live Title"
                                        style={styles.input}
                                        value={title}
                                        onChangeText={setTitle}
                                        placeholderTextColor={customColors.white}
                                    />
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveTypeScroll}>
                                        {liveTypes.map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                style={[styles.liveTypeButton, selectedLiveType === type && styles.liveTypeButtonSelected]}
                                                onPress={() => selectLiveType(type)}
                                            >
                                                <Text
                                                    style={[styles.liveTypeText, selectedLiveType === type && styles.liveTypeTextSelected]}
                                                >
                                                    {type}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <FilterButton />
                        <TouchableOpacity onPress={() => handleGoLive(liveTypes)} style={styles.goLiveButton}>
                            <LinnerGradientCard2 customStyles={styles.goLiveBtn}>
                                <Text style={styles.goLiveText}>Go Live</Text>
                            </LinnerGradientCard2>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.streamTypeContainer}>
                        {['Live', 'Audio'].map((type) => (
                            <TouchableOpacity key={type} onPress={() => setStreamType(type)}>
                                <View style={styles.streamTypeItem}>
                                    <Text style={styles.streamTypeText}>{type}</Text>
                                    {streamType === type && <View style={styles.streamTypeIndicator} />}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.termsContainer}>
                        <TermsAndConditions />
                    </View>
                </View>
            )}

            {isLive && (
                <View style={styles.liveOverlay}>
                    <LiveOverlayOfLive
                        isFront={isFrontCamera}
                        toggleCamera={toggleCamera}
                        handleBackPress={handleBackPress}
                        toggleMic={toggleMic}
                        isMicOn={isMicOn}
                        users={users}
                        messages={messages}
                        sendMessage={sendMessage}
                        allMessages={allMessages}
                        setAllMessages={setAllMessages}
                        roomMessages={roomMessages}
                        setIntensity={setIntensity}
                        intensity={intensity}
                    />
                </View>
            )}

            <LiveSetupExitModal visible={isModalVisible} onConfirm={confirmExit} onCancel={cancelExit} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
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
    preview: { flex: 1, zIndex: 30 },
    cameraOff: {
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
    cameraOffContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: scaleWidth(20),
        paddingHorizontal: scaleWidth(30),
        borderRadius: scaleWidth(20),
        alignItems: 'center',
    },
    cameraOffText: { color: customColors.gray500, textAlign: 'center', fontSize: scaleFont(14) },
    countdownContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 200,
        width: scaleWidth(100),
        height: scaleWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    countdownText: { color: customColors.white, fontSize: scaleFont(40), fontWeight: 'bold' },
    overlay: { position: 'absolute', top: 100, left: 10, right: 10, bottom: 20, zIndex: 50 },
    scrollContent: { paddingBottom: 100 },
    contentMainContainer: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'rgba(0, 8, 44, 0.2)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    contentContainer: { flexDirection: 'row', gap: 10, borderRadius: 10, alignItems: 'center' },
    imagePicker: {
        width: scaleWidth(80),
        height: scaleHeight(80),
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: { width: '100%', height: '100%' },
    placeholderImage: { width: '50%', height: '50%' },
    inputContainer: { flex: 1 },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 12,
        borderRadius: 80,
        height: scaleHeight(38),
        paddingLeft: 20,
        color: customColors.white,
        fontSize: scaleFont(14),
        fontWeight: '500',
    },
    error: { color: '#f66', marginTop: 10 },
    buttonContainer: { flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', marginTop: 20 },
    goLiveButton: { flex: 1 },
    goLiveBtn: {
        width: '100%',
        padding: 10,
        borderRadius: 120,
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    goLiveText: { color: customColors.white, fontSize: scaleFont(20), fontWeight: '600' },
    liveTypeScroll: {},
    liveTypeButton: {
        borderColor: customColors.white,
        borderWidth: 1,
        borderRadius: 60,
        paddingHorizontal: 15,
        height: scaleHeight(30),
        marginRight: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveTypeButtonSelected: { backgroundColor: customColors.primary, borderColor: customColors.primary },
    liveTypeText: { color: customColors.white, fontSize: scaleFont(14) },
    liveTypeTextSelected: { color: customColors.white, fontWeight: '600' },
    liveOverlay: { position: 'absolute', top: 35, left: 0, right: 0, bottom: 0, zIndex: 50 },
    streamTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        gap: scaleWidth(20),
    },
    streamTypeItem: { alignItems: 'center' },
    streamTypeText: { color: customColors.white, fontWeight: '600', fontSize: scaleFont(14) },
    streamTypeIndicator: {
        height: 2,
        backgroundColor: customColors.white,
        width: '100%',
        marginTop: 4,
        borderRadius: 1,
    },
    termsContainer: { zIndex: 120, alignItems: 'center' },
});

export default HostVideoLiveScreen;
// import React, { useEffect, useRef, useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     Image,
//     PermissionsAndroid,
//     Platform,
//     StyleSheet,
//     findNodeHandle,
//     TextInput,
//     BackHandler,
//     FlatList,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import ZegoExpressEngine, {
//     ZegoTextureView,
//     ZegoScenario,
//     ZegoPublishChannel,
//     ZegoViewMode,
//     ZegoUpdateType,
//     ZegoUser,
//     ZegoRoomConfig,
//     ZegoVideoMirrorMode,
// } from 'zego-express-engine-reactnative';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinnerGradientCard2 from '@/components/common/gradientCards/LinnearGradientCard2';
// import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
// import customColors from '@/constants/styles';
// import { goBack } from '@/utils/navigationService';
// import LiveSetupExitModal from '@/components/live/LiveSetupExitModal';
// import FilterButton from '@/components/live/FilterButton';
// import TermsAndConditions from '@/components/live/TermsAndConditions';
// import MainContainer3 from '@/components/common/mainContainers/MainContainer3';
// import LiveOverlayOfLive from '@/components/live/LiveOverlayOfLive';
// import { useAuth } from '@/context/AuthProvider';
// import ZegoEffects from '@zegocloud/zego-effects-reactnative';
// import KeepAwake from 'react-native-keep-awake';
// import { useZegoEffects } from '@/context/ZegoEffectsProvider';
// import MainContainer from '@/components/common/mainContainers/MainContainer';
// import EffectsHelper from '@/zegodata/EffectsHelper';
// import KeyCenter from '@/zegodata/KeyCenter';

// // Define live types
// const liveTypes = [
//     'Chatting',
//     'Dancing',
//     'Singing',
//     'Music',
//     'Comedy',
//     'Talent',
//     'Fitness',
//     'Cooking',
//     'Funny',
//     'Stories',
//     'Make Friends',
//     'Art',
// ];

// // Room configuration
// const roomConfig: ZegoRoomConfig = {
//     isUserStatusNotify: true,
//     maxMemberCount: 50,
//     token: '',
// };

// // Default system message
// const defaultMessage =
//     'Contents containing vulgarity, pornography, violence, and minors are strictly prohibited Administrators monitor the feed 24/7 Reported contents and violations will be severely penalized';

// // Interfaces for type safety
// interface Message {
//     id: string;
//     message: string;
//     userID: string;
//     userName: string;
//     timestamp: number;
// }

// interface AllMessage {
//     id: string;
//     type: 'join' | 'leave' | 'chat' | 'system' | 'cohost_request' | 'cohost_accepted' | 'cohost_removed';
//     message?: string;
//     userID?: string;
//     userName?: string;
//     timestamp: number;
// }

// interface RoomMessage {
//     id: string;
//     type: 'system' | 'join' | 'leave';
//     message: string;
//     timestamp: number;
// }

// interface CoHostRequest {
//     userID: string;
//     userName: string;
//     timestamp: number;
// }

// interface StreamInfo {
//     streamID: string;
//     userID: string;
//     userName: string;
//     ref: React.MutableRefObject<any>;
//     isMuted: boolean;
// }

// const HostVideoLiveScreen = () => {
//     const [previewStarted, setPreviewStarted] = useState(false);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [title, setTitle] = useState('');
//     const [imageUri, setImageUri] = useState<string | null>(null);
//     const [isFrontCamera, setIsFrontCamera] = useState(true);
//     const [isMicOn, setIsMicOn] = useState(true);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [selectedLiveType, setSelectedLiveType] = useState('Chatting');
//     const [streamType, setStreamType] = useState('Live');
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [loadingPreview, setLoadingPreview] = useState(true);
//     const [isLive, setIsLive] = useState(false);
//     const [countdown, setCountdown] = useState<number | null>(null);
//     const [users, setUsers] = useState<ZegoUser[]>([]);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [intensity, setIntensity] = useState(50);
//     const [allMessages, setAllMessages] = useState<AllMessage[]>([
//         {
//             id: 'system-0',
//             type: 'system',
//             message: defaultMessage,
//             timestamp: Date.now(),
//         },
//     ]);
//     const [roomMessages, setRoomMessages] = useState<RoomMessage[]>([]);
//     const [coHostRequests, setCoHostRequests] = useState<CoHostRequest[]>([]);
//     const [coHosts, setCoHosts] = useState<string[]>([]);
//     const [coHostStreams, setCoHostStreams] = useState<StreamInfo[]>([]);
//     const [isEngineInitialized, setIsEngineInitialized] = useState(false);
//     const effectsRef = useRef<ZegoEffects | null>(null);
//     const { initializeEffects } = useZegoEffects();
//     const previewRef = useRef<any>(null);
//     const { user } = useAuth();

//     console.log(coHostStreams)

//     // Zego Configuration
//     const zegoConfig = {
//         appID: KeyCenter.appID,
//         appSign: KeyCenter.appSign,
//         userID: String(user?.liveId),
//         roomID: '9999',
//         scenario: ZegoScenario.Broadcast,
//         licence: KeyCenter.licence,
//     };

//     useEffect(() => {
//         const initZego = async () => {
//             try {
//                 await ZegoExpressEngine.createEngineWithProfile({
//                     appID: zegoConfig.appID,
//                     appSign: zegoConfig.appSign,
//                     scenario: zegoConfig.scenario,
//                 });
//                 const instance = ZegoExpressEngine.instance();

//                 if (Platform.OS === 'android') await requestPermissions();

//                 const authInfo = await ZegoEffects.getAuthInfo(zegoConfig.appSign);
//                 console.log(authInfo, 'auth info of zego effects');

//                 const effects = new ZegoEffects(zegoConfig.licence);
//                 effectsRef.current = effects;

//                 effects.on('error', (errorCode, desc) => {
//                     console.error(`Error code: ${errorCode}, Description: ${desc}`);
//                 });

//                 instance.enableCustomVideoProcessing(true, {}, ZegoPublishChannel.Main);

//                 try {
//                     await instance.setVideoMirrorMode(ZegoVideoMirrorMode.BothMirror, ZegoPublishChannel.Main);
//                 } catch (err) {
//                     console.error('Failed to set video mirror mode:', err);
//                     setErrorMessage('Failed to set video mirror mode');
//                 }

//                 // Room user update listener
//                 instance.on('roomUserUpdate', (roomID, updateType, userList) => {
//                     console.log('User Update:', {
//                         roomID,
//                         updateType,
//                         userList: userList.map((u) => ({ userID: u.userID, userName: u.userName })),
//                     });
//                     if (roomID === zegoConfig.roomID) {
//                         if (updateType === ZegoUpdateType.Add) {
//                             setUsers((prevUsers) => [...prevUsers, ...userList]);
//                             setAllMessages((prev) => [
//                                 ...prev,
//                                 ...userList.map((u) => ({
//                                     id: `join-${u.userID}-${Date.now()}`,
//                                     type: 'join',
//                                     userID: u.userID,
//                                     userName: u.userName,
//                                     timestamp: Date.now(),
//                                 })),
//                             ]);
//                             setRoomMessages((prev) => [
//                                 ...prev,
//                                 ...userList.map((u) => ({
//                                     id: `join-${u.userID}-${Date.now()}`,
//                                     type: 'join',
//                                     userID: u.userID,
//                                     userName: u.userName,
//                                     timestamp: Date.now(),
//                                 })),
//                             ]);
//                         } else if (updateType === ZegoUpdateType.Delete) {
//                             setUsers((prevUsers) =>
//                                 prevUsers.filter((user) => !userList.some((u) => u.userID === user.userID)),
//                             );
//                             setAllMessages((prev) => [
//                                 ...prev,
//                                 ...userList.map((u) => ({
//                                     id: `leave-${u.userID}-${Date.now()}`,
//                                     type: 'leave',
//                                     userID: u.userID,
//                                     userName: u.userName,
//                                     timestamp: Date.now(),
//                                 })),
//                             ]);
//                             setRoomMessages((prev) => [
//                                 ...prev,
//                                 ...userList.map((u) => ({
//                                     id: `leave-${u.userID}-${Date.now()}`,
//                                     type: 'leave',
//                                     userID: u.userID,
//                                     userName: u.userName,
//                                     timestamp: Date.now(),
//                                 })),
//                             ]);
//                         }
//                     }
//                 });

//                 // Broadcast message listener
//                 instance.on('IMRecvBroadcastMessage', (roomID, messageList) => {
//                     console.log('Broadcast Received:', {
//                         roomID,
//                         messageList: messageList.map((msg) => ({
//                             message: msg.message,
//                             userID: msg.fromUser.userID,
//                             userName: msg.fromUser.userName,
//                             timestamp: msg.sendTime,
//                         })),
//                     });
//                     if (roomID === zegoConfig.roomID) {
//                         const newMessages = messageList.map((msg) => ({
//                             id: `${msg.fromUser.userID}-${msg.sendTime}`,
//                             message: msg.message,
//                             userID: msg.fromUser.userID,
//                             userName: msg.fromUser.userName,
//                             timestamp: msg.sendTime,
//                         }));
//                         setMessages((prevMessages) => [...prevMessages, ...newMessages]);
//                         setAllMessages((prev) => [
//                             ...prev,
//                             ...newMessages.map((msg) => {
//                                 if (msg.message.startsWith('COHOST_REQUEST:')) {
//                                     const userID = msg.message.split(':')[1];
//                                     setCoHostRequests((prev) => [
//                                         ...prev,
//                                         {
//                                             userID: msg.userID,
//                                             userName: msg.userName,
//                                             timestamp: msg.timestamp,
//                                         },
//                                     ]);
//                                     return {
//                                         id: msg.id,
//                                         type: 'cohost_request',
//                                         userID: msg.userID,
//                                         userName: msg.userName,
//                                         timestamp: msg.timestamp,
//                                     };
//                                 } else if (msg.message.startsWith('COHOST_ACCEPTED:')) {
//                                     return {
//                                         id: msg.id,
//                                         type: 'cohost_accepted',
//                                         userID: msg.userID,
//                                         userName: msg.userName,
//                                         timestamp: msg.timestamp,
//                                     };
//                                 } else if (msg.message.startsWith('COHOST_REMOVED:')) {
//                                     return {
//                                         id: msg.id,
//                                         type: 'cohost_removed',
//                                         userID: msg.userID,
//                                         userName: msg.userName,
//                                         timestamp: msg.timestamp,
//                                     };
//                                 }
//                                 return {
//                                     id: msg.id,
//                                     type: 'chat',
//                                     message: msg.message,
//                                     userID: msg.userID,
//                                     userName: msg.userName,
//                                     timestamp: msg.timestamp,
//                                 };
//                             }),
//                         ]);
//                     }
//                 });

//                 // Room stream update listener for co-host streams
//                 instance.on('roomStreamUpdate', (roomID, updateType, streamList) => {
//                     console.log('Room Stream Update:', { roomID, updateType, streamList });
//                     if (roomID === zegoConfig.roomID) {
//                         console.log(streamList,'streamList')
//                         if (updateType === ZegoUpdateType.Add) {
//                             const newStreams = streamList
//                                 .filter((stream) => stream.user.userID !== zegoConfig.userID)
//                                 .map((stream) => ({
//                                     streamID: stream.streamID,
//                                     userID: stream.user.userID,
//                                     userName: stream.user.userName,
//                                     ref: { current: null },
//                                     isMuted: false,
//                                 }));
//                             setCoHostStreams((prevStreams) => {
//                                 // Filter streams based on the current coHosts state
//                                 const filteredStreams = newStreams
//                                     .filter((newStream) => coHosts.includes(newStream.userID))
//                                     .filter((newStream) => !prevStreams.some((prev) => prev.streamID === newStream.streamID));
//                                 const updatedStreams = [...prevStreams, ...filteredStreams];
//                                 console.log('Updated coHostStreams:', updatedStreams);
//                                 filteredStreams.forEach((stream) => {
//                                     setTimeout(() => playStream(stream), 100);
//                                 });
//                                 return updatedStreams;
//                             });
//                         } else if (updateType === ZegoUpdateType.Delete) {
//                             setCoHostStreams((prevStreams) =>
//                                 prevStreams.filter((stream) => !streamList.some((s) => s.streamID === stream.streamID)),
//                             );
//                         }
//                     }
//                 });

//                 instance.on('roomStateUpdate', (roomID, state, errorCode) => {
//                     console.log('Room State Update:', { roomID, state, errorCode });
//                 });

//                 await EffectsHelper.initEffects();

//                 const effectsVersion = await ZegoEffects.getVersion();
//                 console.log('Effects SDK Version:', effectsVersion);

//                 setIsEngineInitialized(true);
//                 startPreviewWithDelay();
//             } catch (err: any) {
//                 console.error('Zego init error:', err);
//                 setErrorMessage(err.message);
//             }
//         };

//         initZego();

//         const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//             setIsModalVisible(true);
//             return true;
//         });

//         return () => {
//             backHandler.remove();
//             const instance = ZegoExpressEngine.instance();
//             instance.off('roomUserUpdate');
//             instance.off('IMRecvBroadcastMessage');
//             instance.off('roomStateUpdate');
//             instance.off('roomStreamUpdate');
//             coHostStreams.forEach((stream) => {
//                 try {
//                     instance.stopPlayingStream(stream.streamID);
//                 } catch (err) {
//                     console.error(`Error stopping stream ${stream.streamID}:`, err);
//                 }
//             });
//             ZegoExpressEngine.destroyEngine();
//             setIsEngineInitialized(false);
//             setCoHostStreams([]);
//         };
//     }, []); // Removed coHosts from dependencies

//     const requestPermissions = async () => {
//         const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
//         const results = await PermissionsAndroid.requestMultiple(permissions);
//         const allGranted = Object.values(results).every((status) => status === 'granted');
//         if (!allGranted) throw new Error('Camera or microphone permission denied');
//     };

//     const startPreviewWithDelay = async () => {
//         setTimeout(async () => {
//             try {
//                 const instance = ZegoExpressEngine.instance();
//                 const reactTag = findNodeHandle(previewRef.current);
//                 if (!reactTag) throw new Error('Invalid preview ref');
//                 await instance.startPreview(
//                     { reactTag, viewMode: ZegoViewMode.AspectFill, backgroundColor: 0 },
//                     ZegoPublishChannel.Main,
//                 );
//                 setPreviewStarted(true);
//             } catch (err: any) {
//                 console.error('Preview error:', err);
//                 setErrorMessage(err.message);
//             }
//             setLoadingPreview(false);
//         }, 10);
//     };

//     const toggleCamera = async () => {
//         try {
//             const instance = ZegoExpressEngine.instance();
//             await instance.useFrontCamera(!isFrontCamera, ZegoPublishChannel.Main);
//             setIsFrontCamera(!isFrontCamera);
//         } catch (err) {
//             console.error('Failed to toggle camera:', err);
//         }
//     };

//     const toggleMic = async () => {
//         try {
//             const instance = ZegoExpressEngine.instance();
//             await instance.muteMicrophone(isMicOn);
//             setIsMicOn(!isMicOn);
//         } catch (err) {
//             console.error('Failed to toggle mic:', err);
//         }
//     };

//     const pickImage = () => {
//         launchImageLibrary({ mediaType: 'photo' }, (res: any) => {
//             if (res.assets?.[0]?.uri) {
//                 setImageUri(res.assets[0].uri);
//             }
//         });
//     };

//     const selectLiveType = (type: string) => {
//         setSelectedLiveType(type);
//     };

//     const handleBackPress = () => {
//         setIsModalVisible(true);
//     };

//     const confirmExit = () => {
//         setIsModalVisible(false);
//         goBack();
//     };

//     const cancelExit = () => {
//         setIsModalVisible(false);
//     };

//     const loginRoom = async () => {
//         try {
//             const instance = ZegoExpressEngine.instance();
//             const userData: ZegoUser = { userID: zegoConfig.userID, userName: user?.name || 'Host' };
//             const dynamicRoomConfig: ZegoRoomConfig = { ...roomConfig };
//             await instance.loginRoom(zegoConfig.roomID, userData, dynamicRoomConfig);
//         } catch (err: any) {
//             console.error('Failed to login to room:', err);
//             setErrorMessage(err.message);
//             throw err;
//         }
//     };

//     const startLiveStream = async () => {
//         try {
//             const instance = ZegoExpressEngine.instance();
//             await loginRoom();
//             const streamID = `3333`;
//             await instance.startPublishingStream(streamID, ZegoPublishChannel.Main, undefined);
//             setIsLive(true);
//         } catch (err: any) {
//             console.error('Failed to start live stream:', err);
//             setErrorMessage(err.message);
//         }
//     };

//     const sendMessage = async (message: string) => {
//         if (!message.trim()) return;
//         try {
//             const instance = ZegoExpressEngine.instance();
//             const result = await instance.sendBroadcastMessage(zegoConfig.roomID, message);
//             if (result.errorCode === 0) {
//                 const newMessage: Message = {
//                     id: `${zegoConfig.userID}-${Date.now()}`,
//                     message,
//                     userID: zegoConfig.userID,
//                     userName: user?.name || 'Host',
//                     timestamp: Date.now(),
//                 };
//                 setMessages((prevMessages) => [...prevMessages, newMessage]);
//                 setAllMessages((prev) => [
//                     ...prev,
//                     {
//                         id: newMessage.id,
//                         type: 'chat',
//                         message: newMessage.message,
//                         userID: newMessage.userID,
//                         userName: newMessage.userName,
//                         timestamp: newMessage.timestamp,
//                     },
//                 ]);
//             } else {
//                 console.error('Failed to send message:', result.errorCode);
//                 setErrorMessage(`Failed to send message (Error: ${result.errorCode})`);
//             }
//         } catch (err) {
//             console.error('Error sending message:', err);
//             setErrorMessage('Error sending message');
//         }
//     };

//     const acceptCoHost = async (userID: string, userName: string) => {
//         try {
//             const instance = ZegoExpressEngine.instance();
//             if (coHosts.length >= 2) {
//                 setErrorMessage('Co-host limit reached (max 2 co-hosts)');
//                 return;
//             }

//             setCoHosts((prev) => [...prev, userID]);
//             setCoHostRequests((prev) => prev.filter((request) => request.userID !== userID));

//             const acceptMessage = `COHOST_ACCEPTED:${userID}`;
//             const result = await instance.sendBroadcastMessage(zegoConfig.roomID, acceptMessage);
//             if (result.errorCode === 0) {
//                 setAllMessages((prev) => [
//                     ...prev,
//                     {
//                         id: `cohost_accepted-${userID}-${Date.now()}`,
//                         type: 'cohost_accepted',
//                         userID,
//                         userName,
//                         timestamp: Date.now(),
//                     },
//                 ]);
//             } else {
//                 console.error('Failed to send co-host acceptance:', result.errorCode);
//                 setErrorMessage(`Failed to send co-host acceptance (Error: ${result.errorCode})`);
//             }
//         } catch (err) {
//             console.error('Error accepting co-host:', err);
//             setErrorMessage('Error accepting co-host');
//         }
//     };

//     const removeCoHost = async (userID: string, userName: string) => {
//         try {
//             const instance = ZegoExpressEngine.instance();
//             setCoHosts((prev) => prev.filter((id) => id !== userID));
//             setCoHostStreams((prev) => {
//                 const streamToRemove = prev.find((stream) => stream.userID === userID);
//                 if (streamToRemove) {
//                     instance.stopPlayingStream(streamToRemove.streamID);
//                 }
//                 return prev.filter((stream) => stream.userID !== userID);
//             });

//             const removeMessage = `COHOST_REMOVED:${userID}`;
//             const result = await instance.sendBroadcastMessage(zegoConfig.roomID, removeMessage);
//             if (result.errorCode === 0) {
//                 setAllMessages((prev) => [
//                     ...prev,
//                     {
//                         id: `cohost_removed-${userID}-${Date.now()}`,
//                         type: 'cohost_removed',
//                         userID,
//                         userName,
//                         timestamp: Date.now(),
//                     },
//                 ]);
//             } else {
//                 console.error('Failed to send co-host removal:', result.errorCode);
//                 setErrorMessage(`Failed to send co-host removal (Error: ${result.errorCode})`);
//             }
//         } catch (err) {
//             console.error('Error removing co-host:', err);
//             setErrorMessage('Error removing co-host');
//         }
//     };

//     const toggleCoHostMic = async (stream: StreamInfo) => {
//         try {
//             const instance = ZegoExpressEngine.instance();
//             const newMutedState = !stream.isMuted;
//             // Note: ZegoExpressEngine does not have a direct method to mute a specific user's audio from the host side.
//             // This would require server-side implementation or a custom signaling mechanism.
//             // For now, we'll simulate the mute by updating the UI state.
//             setCoHostStreams((prev) =>
//                 prev.map((s) =>
//                     s.streamID === stream.streamID ? { ...s, isMuted: newMutedState } : s,
//                 ),
//             );
//             setErrorMessage('Microphone mute/unmute not fully implemented due to SDK limitations.');
//         } catch (err) {
//             console.error('Error toggling co-host mic:', err);
//             setErrorMessage('Error toggling co-host mic');
//         }
//     };

//     const playStream = async (stream: StreamInfo, retryCount = 3) => {
//         if (!isEngineInitialized) {
//             console.error(`Cannot play stream ${stream.streamID}: Engine not initialized`);
//             setErrorMessage(`Cannot play stream ${stream.streamID}: Engine not initialized`);
//             return;
//         }
//         try {
//             const instance = ZegoExpressEngine.instance();
//             const reactTag = findNodeHandle(stream.ref.current);
//             if (!reactTag) {
//                 if (retryCount > 0) {
//                     console.log(`Invalid ref for stream ${stream.streamID}, retrying (${retryCount} attempts left)`);
//                     setTimeout(() => playStream(stream, retryCount - 1), 500);
//                     return;
//                 }
//                 throw new Error(`Invalid ref for stream ${stream.streamID} after retries`);
//             }
//             console.log(`Playing stream: ${stream.streamID}, ReactTag: ${reactTag}`);
//             await instance.startPlayingStream(stream.streamID, {
//                 reactTag,
//                 viewMode: ZegoViewMode.AspectFill,
//                 backgroundColor: 0x000000,
//             });
//             console.log(`Stream ${stream.streamID} playback started successfully`);
//         } catch (err: any) {
//             console.error(`Failed to play stream ${stream.streamID}:`, err);
//             setErrorMessage(`Failed to play stream ${stream.streamID}: ${err.message}`);
//         }
//     };

//     const handleGoLive = (type: string) => {
//         setCountdown(3);
//         const timer = setInterval(() => {
//             setCountdown((prev) => {
//                 if (prev === null) return null;
//                 if (prev <= 1) {
//                     clearInterval(timer);
//                     startLiveStream();
//                     return null;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//     };

//     const renderCoHostStream = ({ item }: { item: StreamInfo }) => (
//         <View style={styles.coHostContainer}>
//             <ZegoTextureView
//                 ref={item.ref}
//                 style={styles.coHostPreview}
//                 onLayout={() => playStream(item)}
//             />
//             <Text style={styles.coHostLabel}>{item.userName}'s Stream</Text>
//             <View style={styles.coHostControls}>
//                 <TouchableOpacity
//                     style={styles.coHostControlButton}
//                     onPress={() => toggleCoHostMic(item)}
//                 >
//                     <MaterialCommunityIcons
//                         name={item.isMuted ? 'microphone-off' : 'microphone'}
//                         size={20}
//                         color={customColors.white}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.coHostControlButton}
//                     onPress={() => removeCoHost(item.userID, item.userName)}
//                 >
//                     <MaterialCommunityIcons name="close" size={20} color={customColors.red} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     console.log(coHostStreams)

//     return (
//         <View style={styles.container}>
//             <KeepAwake />
//             {!isLive && (
//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={handleBackPress}>
//                         <Entypo name="cross" size={25} color="#fff" />
//                     </TouchableOpacity>
//                 </View>
//             )}

//             <View style={styles.fullScreenContainer}>
//                 <MainContainer3>
//                     <ZegoTextureView ref={previewRef} style={styles.preview} />
//                 </MainContainer3>
//                 {isLive && (
//                     <FlatList
//                         data={coHostStreams}
//                         renderItem={renderCoHostStream}
//                         keyExtractor={(item) => `${item.streamID}-${item.userID}`}
//                         horizontal
//                         style={styles.coHostList}
//                         contentContainerStyle={styles.coHostListContent}
//                         ListEmptyComponent={
//                             <View style={styles.emptyCoHostContainer}>
//                                 <Text style={styles.emptyCoHostText}>No co-hosts available</Text>
//                             </View>
//                         }
//                     />
//                 )}
//             </View>

//             {!isCameraOn && (
//                 <View style={styles.cameraOff}>
//                     <View style={styles.cameraOffContent}>
//                         <MaterialCommunityIcons name="camera-off" size={scaleWidth(30)} color={customColors.primary} />
//                         <Text style={styles.cameraOffText}>Your Camera Is Off Now!!!</Text>
//                     </View>
//                 </View>
//             )}

//             {countdown !== null && (
//                 <View style={styles.countdownContainer}>
//                     <Text style={styles.countdownText}>{countdown}</Text>
//                 </View>
//             )}

//             {!isLive && (
//                 <View style={styles.overlay}>
//                     <ScrollView contentContainerStyle={styles.scrollContent}>
//                         <View style={styles.contentMainContainer}>
//                             <View style={styles.contentContainer}>
//                                 <TouchableOpacity onPress={pickImage}>
//                                     <View style={styles.imagePicker}>
//                                         {imageUri ? (
//                                             <Image source={{ uri: imageUri }} style={styles.image} />
//                                         ) : (
//                                             <Image
//                                                 source={require('../../../assets/images/icon/addImage.png')}
//                                                 style={styles.placeholderImage}
//                                             />
//                                         )}
//                                     </View>
//                                 </TouchableOpacity>
//                                 <View style={styles.inputContainer}>
//                                     <TextInput
//                                         placeholder="Live Title"
//                                         style={styles.input}
//                                         value={title}
//                                         onChangeText={setTitle}
//                                         placeholderTextColor={customColors.white}
//                                     />
//                                     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveTypeScroll}>
//                                         {liveTypes.map((type) => (
//                                             <TouchableOpacity
//                                                 key={type}
//                                                 style={[styles.liveTypeButton, selectedLiveType === type && styles.liveTypeButtonSelected]}
//                                                 onPress={() => selectLiveType(type)}
//                                             >
//                                                 <Text
//                                                     style={[styles.liveTypeText, selectedLiveType === type && styles.liveTypeTextSelected]}
//                                                 >
//                                                     {type}
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         ))}
//                                     </ScrollView>
//                                 </View>
//                             </View>
//                         </View>
//                         {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
//                     </ScrollView>
//                     <View style={styles.buttonContainer}>
//                         <FilterButton />
//                         <TouchableOpacity onPress={() => handleGoLive(liveTypes)} style={styles.goLiveButton}>
//                             <LinnerGradientCard2 customStyles={styles.goLiveBtn}>
//                                 <Text style={styles.goLiveText}>Go Live</Text>
//                             </LinnerGradientCard2>
//                         </TouchableOpacity>
//                     </View>
//                     <View style={styles.streamTypeContainer}>
//                         {['Live', 'Audio'].map((type) => (
//                             <TouchableOpacity key={type} onPress={() => setStreamType(type)}>
//                                 <View style={styles.streamTypeItem}>
//                                     <Text style={styles.streamTypeText}>{type}</Text>
//                                     {streamType === type && <View style={styles.streamTypeIndicator} />}
//                                 </View>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                     <View style={styles.termsContainer}>
//                         <TermsAndConditions />
//                     </View>
//                 </View>
//             )}

//             {isLive && (
//                 <View style={styles.liveOverlay}>
//                     {/* <LiveOverlayOfLive
//                         isFront={isFrontCamera}
//                         toggleCamera={toggleCamera}
//                         handleBackPress={handleBackPress}
//                         toggleMic={toggleMic}
//                         isMicOn={isMicOn}
//                         users={users}
//                         messages={messages}
//                         sendMessage={sendMessage}
//                         allMessages={allMessages}
//                         setAllMessages={setAllMessages}
//                         roomMessages={roomMessages}
//                         setIntensity={setIntensity}
//                         intensity={intensity}
//                     /> */}
//                     {coHostRequests.length > 0 && (
//                         <View style={styles.coHostRequestContainer}>
//                             <Text style={styles.coHostRequestTitle}>Co-Host Requests</Text>
//                             {coHostRequests.map((request) => (
//                                 <View key={request.userID} style={styles.coHostRequestItem}>
//                                     <Text style={styles.coHostRequestText}>
//                                         {request.userName} wants to be a co-host
//                                     </Text>
//                                     <TouchableOpacity
//                                         style={[
//                                             styles.acceptButton,
//                                             coHosts.length >= 2 && styles.acceptButtonDisabled,
//                                         ]}
//                                         onPress={() => acceptCoHost(request.userID, request.userName)}
//                                         disabled={coHosts.length >= 2}
//                                     >
//                                         <Text style={styles.acceptButtonText}>Accept</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             ))}
//                         </View>
//                     )}
//                 </View>
//             )}

//             <LiveSetupExitModal visible={isModalVisible} onConfirm={confirmExit} onCancel={cancelExit} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1 },
//     header: {
//         zIndex: 200,
//         position: 'absolute',
//         top: 50,
//         right: 10,
//         left: 10,
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     fullScreenContainer: { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20 },
//     preview: { flex: 1, zIndex: 30 },
//     cameraOff: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 40,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     cameraOffContent: {
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//         padding: scaleWidth(20),
//         paddingHorizontal: scaleWidth(30),
//         borderRadius: scaleWidth(20),
//         alignItems: 'center',
//     },
//     cameraOffText: { color: customColors.gray500, textAlign: 'center', fontSize: scaleFont(14) },
//     countdownContainer: {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: [{ translateX: -50 }, { translateY: -50 }],
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         borderRadius: 200,
//         width: scaleWidth(100),
//         height: scaleWidth(100),
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 100,
//     },
//     countdownText: { color: customColors.white, fontSize: scaleFont(40), fontWeight: 'bold' },
//     overlay: { position: 'absolute', top: 100, left: 10, right: 10, bottom: 20, zIndex: 50 },
//     scrollContent: { paddingBottom: 100 },
//     contentMainContainer: {
//         flexDirection: 'row',
//         gap: 10,
//         backgroundColor: 'rgba(0, 8, 44, 0.2)',
//         padding: 10,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     contentContainer: { flexDirection: 'row', gap: 10, borderRadius: 10, alignItems: 'center' },
//     imagePicker: {
//         width: scaleWidth(80),
//         height: scaleHeight(80),
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         borderRadius: 16,
//         justifyContent: 'center',
//         alignItems: 'center',
//         overflow: 'hidden',
//     },
//     image: { width: '100%', height: '100%' },
//     placeholderImage: { width: '50%', height: '50%' },
//     inputContainer: { flex: 1 },
//     input: {
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         marginBottom: 12,
//         borderRadius: 80,
//         height: scaleHeight(38),
//         paddingLeft: 20,
//         color: customColors.white,
//         fontSize: scaleFont(14),
//         fontWeight: '500',
//     },
//     error: { color: '#f66', marginTop: 10 },
//     buttonContainer: { flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', marginTop: 20 },
//     goLiveButton: { flex: 1 },
//     goLiveBtn: {
//         width: '100%',
//         padding: 10,
//         borderRadius: 120,
//         marginRight: 5,
//         marginLeft: 5,
//         alignItems: 'center',
//     },
//     goLiveText: { color: customColors.white, fontSize: scaleFont(20), fontWeight: '600' },
//     liveTypeScroll: {},
//     liveTypeButton: {
//         borderColor: customColors.white,
//         borderWidth: 1,
//         borderRadius: 60,
//         paddingHorizontal: 15,
//         height: scaleHeight(30),
//         marginRight: 4,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     liveTypeButtonSelected: { backgroundColor: customColors.primary, borderColor: customColors.primary },
//     liveTypeText: { color: customColors.white, fontSize: scaleFont(14) },
//     liveTypeTextSelected: { color: customColors.white, fontWeight: '600' },
//     liveOverlay: { position: 'absolute', top: 35, left: 0, right: 0, bottom: 0, zIndex: 50 },
//     streamTypeContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 15,
//         gap: scaleWidth(20),
//     },
//     streamTypeItem: { alignItems: 'center' },
//     streamTypeText: { color: customColors.white, fontWeight: '600', fontSize: scaleFont(14) },
//     streamTypeIndicator: {
//         height: 2,
//         backgroundColor: customColors.white,
//         width: '100%',
//         marginTop: 4,
//         borderRadius: 1,
//     },
//     termsContainer: { zIndex: 120, alignItems: 'center' },
//     coHostRequestContainer: {
//         position: 'absolute',
//         top: scaleHeight(100),
//         left: scaleWidth(10),
//         right: scaleWidth(10),
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         borderRadius: 10,
//         padding: scaleWidth(10),
//         zIndex: 100,
//     },
//     coHostRequestTitle: {
//         color: customColors.white,
//         fontSize: scaleFont(16),
//         fontWeight: '600',
//         marginBottom: scaleHeight(10),
//     },
//     coHostRequestItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: scaleHeight(5),
//         borderBottomWidth: 1,
//         borderBottomColor: customColors.gray500,
//         marginBottom: scaleHeight(5),
//     },
//     coHostRequestText: {
//         color: customColors.white,
//         fontSize: scaleFont(14),
//     },
//     acceptButton: {
//         backgroundColor: customColors.green,
//         paddingVertical: scaleHeight(5),
//         paddingHorizontal: scaleWidth(10),
//         borderRadius: 5,
//     },
//     acceptButtonDisabled: {
//         backgroundColor: customColors.gray500,
//     },
//     acceptButtonText: {
//         color: customColors.white,
//         fontSize: scaleFont(12),
//         fontWeight: '600',
//     },
//     coHostList: {
//         position: 'absolute',
//         top: scaleHeight(80),
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//     },
//     coHostListContent: {
//         paddingHorizontal: scaleWidth(10),
//     },
//     coHostContainer: {
//         width: scaleWidth(120),
//         height: scaleHeight(150),
//         marginHorizontal: scaleWidth(5),
//         position: 'relative',
//     },
//     coHostPreview: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: customColors.white,
//     },
//     coHostLabel: {
//         position: 'absolute',
//         top: 5,
//         left: 5,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         color: customColors.white,
//         padding: scaleWidth(3),
//         borderRadius: 5,
//         fontSize: scaleFont(10),
//     },
//     coHostControls: {
//         position: 'absolute',
//         bottom: 5,
//         right: 5,
//         flexDirection: 'row',
//         gap: scaleWidth(5),
//     },
//     coHostControlButton: {
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         padding: scaleWidth(5),
//         borderRadius: 5,
//     },
//     emptyCoHostContainer: {
//         height: scaleHeight(150),
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     emptyCoHostText: {
//         color: customColors.white,
//         fontSize: scaleFont(12),
//     },
// });

// export default HostVideoLiveScreen;