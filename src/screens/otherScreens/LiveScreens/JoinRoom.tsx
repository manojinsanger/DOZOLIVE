// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   StyleSheet,
//   findNodeHandle,
//   BackHandler,
//   FlatList,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import ZegoExpressEngine, {
//   ZegoTextureView,
//   ZegoScenario,
//   ZegoUser,
//   ZegoRoomConfig,
//   ZegoUpdateType,
//   ZegoViewMode,
// } from 'zego-express-engine-reactnative';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
// import customColors from '@/constants/styles';
// import { goBack } from '@/utils/navigationService';
// import LiveSetupExitModal from '@/components/live/LiveSetupExitModal';
// import { useAuth } from '@/context/AuthProvider';
// import KeyCenter from '@/zegodata/KeyCenter';

// // Room configuration
// const roomConfig: ZegoRoomConfig = {
//   isUserStatusNotify: true,
//   maxMemberCount: 50,
//   token: '',
// };

// // Default system message
// const defaultMessage =
//   'Contents containing vulgarity, pornography, violence, and minors are strictly prohibited Administrators monitor the feed 24/7 Reported contents and violations will be severely penalized';

// // Interfaces
// interface Message {
//   id: string;
//   message: string;
//   userID: string;
//   userName: string;
//   timestamp: number;
// }

// interface AllMessage {
//   id: string;
//   type: 'join' | 'leave' | 'chat' | 'system';
//   message?: string;
//   userID?: string;
//   userName?: string;
//   timestamp: number;
// }

// interface StreamInfo {
//   streamID: string;
//   userID: string;
//   userName: string;
//   ref: React.MutableRefObject<any>;
// }

// // Utility function to sanitize keys
// const sanitizeKey = (key: string): string => {
//   return key.replace(/[^a-zA-Z0-9-_]/g, '_');
// };

// // Check if running on an emulator
// const isEmulator = Platform.OS === 'android' && (Platform.constants.Brand === 'generic' || Platform.constants.Model.includes('Emulator'));

// const UserJoinLiveScreen = () => {
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [users, setUsers] = useState<ZegoUser[]>([]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [allMessages, setAllMessages] = useState<AllMessage[]>([
//     {
//       id: 'system-0',
//       type: 'system',
//       message: defaultMessage,
//       timestamp: Date.now(),
//     },
//   ]);
//   const [messageInput, setMessageInput] = useState('');
//   const [streams, setStreams] = useState<StreamInfo[]>([]);
//   const [isEngineInitialized, setIsEngineInitialized] = useState(false);
//   const [pendingStreams, setPendingStreams] = useState<StreamInfo[]>([]);
//   const { user } = useAuth();

//   // Zego Configuration
//   const zegoConfig = {
//     appID: KeyCenter.appID,
//     appSign: KeyCenter.appSign,
//     userID: String(user?.liveId),
//     roomID: '9999',
//     scenario: ZegoScenario.Broadcast,
//   };

//   // Process pending streams when engine is initialized
//   useEffect(() => {
//     if (isEngineInitialized && pendingStreams.length > 0) {
//       setStreams((prevStreams) => {
//         const filteredStreams = pendingStreams.filter(
//           (pendingStream) => !prevStreams.some((prev) => prev.streamID === pendingStream.streamID),
//         );
//         console.log('Processing Pending Streams:', filteredStreams); // Debug log
//         const updatedStreams = [...prevStreams, ...filteredStreams];
//         console.log('Updated Streams State:', updatedStreams); // Debug log
//         // Manually trigger playStream for each new stream
//         filteredStreams.forEach((stream) => {
//           setTimeout(() => playStream(stream), 100); // Small delay to ensure ref is ready
//         });
//         return updatedStreams;
//       });
//       setPendingStreams([]);
//     }
//   }, [isEngineInitialized, pendingStreams]);

//   useEffect(() => {
//     const initZego = async () => {
//       try {
//         // Initialize Zego Engine
//         await ZegoExpressEngine.createEngineWithProfile({
//           appID: zegoConfig.appID,
//           appSign: zegoConfig.appSign,
//           scenario: zegoConfig.scenario,
//         });
//         const instance = ZegoExpressEngine.instance();

//         // Set up listeners before joining the room
//         instance.on('roomStreamUpdate', (roomID, updateType, streamList) => {
//           console.log('Room Stream Update:', { roomID, updateType, streamList }); // Debug log
//           if (roomID === zegoConfig.roomID) {
//             if (updateType === ZegoUpdateType.Add) {
//               const newStreams = streamList.map((stream) => ({
//                 streamID: stream.streamID,
//                 userID: stream.user.userID,
//                 userName: stream.user.userName,
//                 ref: { current: null },
//               }));

//               if (isEngineInitialized) {
//                 setStreams((prevStreams) => {
//                   const filteredStreams = newStreams.filter(
//                     (newStream) => !prevStreams.some((prev) => prev.streamID === newStream.streamID),
//                   );
//                   console.log('Adding Streams:', filteredStreams); // Debug log
//                   const updatedStreams = [...prevStreams, ...filteredStreams];
//                   console.log('Updated Streams State:', updatedStreams); // Debug log
//                   // Manually trigger playStream for each new stream
//                   filteredStreams.forEach((stream) => {
//                     setTimeout(() => playStream(stream), 100); // Small delay to ensure ref is ready
//                   });
//                   return updatedStreams;
//                 });
//               } else {
//                 setPendingStreams((prevPending) => {
//                   const filteredPending = newStreams.filter(
//                     (newStream) => !prevPending.some((prev) => prev.streamID === newStream.streamID),
//                   );
//                   console.log('Adding to Pending Streams:', filteredPending); // Debug log
//                   const updatedPending = [...prevPending, ...filteredPending];
//                   console.log('Updated Pending Streams State:', updatedPending); // Debug log
//                   return updatedPending;
//                 });
//               }
//             } else if (updateType === ZegoUpdateType.Delete) {
//               setStreams((prevStreams) => {
//                 const updatedStreams = prevStreams.filter(
//                   (stream) => !streamList.some((s) => s.streamID === stream.streamID),
//                 );
//                 console.log('Updated Streams after Delete:', updatedStreams); // Debug log
//                 return updatedStreams;
//               });
//               setPendingStreams((prevPending) => {
//                 const updatedPending = prevPending.filter(
//                   (stream) => !streamList.some((s) => s.streamID === stream.streamID),
//                 );
//                 console.log('Updated Pending Streams after Delete:', updatedPending); // Debug log
//                 return updatedPending;
//               });
//             }
//           }
//         });

//         // Room User Update Listener
//         instance.on('roomUserUpdate', (roomID, updateType, userList) => {
//           console.log('Room User Update:', { roomID, updateType, userList }); // Debug log
//           if (roomID === zegoConfig.roomID) {
//             if (updateType === ZegoUpdateType.Add) {
//               setUsers((prevUsers) => [...prevUsers, ...userList]);
//               setAllMessages((prev) => [
//                 ...prev,
//                 ...userList.map((u) => ({
//                   id: `join-${u.userID}-${Date.now()}`,
//                   type: 'join',
//                   userID: u.userID,
//                   userName: u.userName,
//                   timestamp: Date.now(),
//                 })),
//               ]);
//             } else if (updateType === ZegoUpdateType.Delete) {
//               setUsers((prevUsers) =>
//                 prevUsers.filter((user) => !userList.some((u) => u.userID === user.userID)),
//               );
//               setAllMessages((prev) => [
//                 ...prev,
//                 ...userList.map((u) => ({
//                   id: `leave-${u.userID}-${Date.now()}`,
//                   type: 'leave',
//                   userID: u.userID,
//                   userName: u.userName,
//                   timestamp: Date.now(),
//                 })),
//               ]);
//             }
//           }
//         });

//         // Broadcast Message Listener
//         instance.on('IMRecvBroadcastMessage', (roomID, messageList) => {
//           console.log('Received Broadcast Message:', { roomID, messageList }); // Debug log
//           if (roomID === zegoConfig.roomID) {
//             const newMessages = messageList.map((msg) => ({
//               id: `${msg.fromUser.userID}-${msg.sendTime}`,
//               message: msg.message,
//               userID: msg.fromUser.userID,
//               userName: msg.fromUser.userName,
//               timestamp: msg.sendTime,
//             }));
//             setMessages((prevMessages) => [...prevMessages, ...newMessages]);
//             setAllMessages((prev) => [
//               ...prev,
//               ...newMessages.map((msg) => ({
//                 id: msg.id,
//                 type: 'chat',
//                 message: msg.message,
//                 userID: msg.userID,
//                 userName: msg.userName,
//                 timestamp: msg.timestamp,
//               })),
//             ]);
//           }
//         });

//         // Room State Update Listener
//         instance.on('roomStateUpdate', (roomID, state, errorCode) => {
//           console.log('Room State Update:', { roomID, state, errorCode }); // Debug log
//           if (errorCode !== 0) {
//             setErrorMessage(`Room error: ${errorCode}`);
//           }
//         });

//         // Join Room
//         const userData: ZegoUser = { userID: zegoConfig.userID, userName: user?.name || 'Guest',userProfilePic:"" };
//         await instance.loginRoom(zegoConfig.roomID, userData, roomConfig);
//         console.log('User joined room:', zegoConfig.roomID); // Debug log

//         // Set engine initialized flag
//         setIsEngineInitialized(true);
//         console.log('Engine Initialized'); // Debug log
//       } catch (err: any) {
//         console.error('Zego init error:', err);
//         setErrorMessage(err.message);
//       }
//     };

//     initZego();

//     // Handle hardware back button press
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       setIsModalVisible(true);
//       return true;
//     });

//     return () => {
//       backHandler.remove();
//       const instance = ZegoExpressEngine.instance();
//       if (instance) {
//         instance.off('roomStreamUpdate');
//         instance.off('roomUserUpdate');
//         instance.off('IMRecvBroadcastMessage');
//         instance.off('roomStateUpdate');
//         streams.forEach((stream) => {
//           try {
//             instance.stopPlayingStream(stream.streamID);
//           } catch (err) {
//             console.error(`Error stopping stream ${stream.streamID}:`, err);
//           }
//         });
//         instance.logoutRoom(zegoConfig.roomID);
//         ZegoExpressEngine.destroyEngine();
//       }
//       setIsEngineInitialized(false);
//       setStreams([]);
//       setPendingStreams([]);
//     };
//   }, []);

//   const sendMessage = async () => {
//     if (!messageInput.trim()) return;
//     if (!isEngineInitialized) {
//       setErrorMessage('Cannot send message: Engine not initialized');
//       return;
//     }
//     try {
//       const instance = ZegoExpressEngine.instance();
//       if (!instance) {
//         setErrorMessage('Cannot send message: Zego instance not available');
//         return;
//       }
//       const result = await instance.sendBroadcastMessage(zegoConfig.roomID, messageInput);
//       if (result.errorCode === 0) {
//         const newMessage: Message = {
//           id: `${zegoConfig.userID}-${Date.now()}`,
//           message: messageInput,
//           userID: zegoConfig.userID,
//           userName: user?.name || 'Guest',
//           timestamp: Date.now(),
//         };
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         setAllMessages((prev) => [
//           ...prev,
//           {
//             id: newMessage.id,
//             type: 'chat',
//             message: newMessage.message,
//             userID: newMessage.userID,
//             userName: newMessage.userName,
//             timestamp: newMessage.timestamp,
//           },
//         ]);
//         setMessageInput('');
//       } else {
//         setErrorMessage(`Failed to send message (Error: ${result.errorCode})`);
//       }
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setErrorMessage('Error sending message');
//     }
//   };

//   const playStream = async (stream: StreamInfo, retryCount = 3) => {
//     if (!isEngineInitialized) {
//       setErrorMessage(`Cannot play stream ${stream.streamID}: Engine not initialized`);
//       return;
//     }
//     try {
//       const instance = ZegoExpressEngine.instance();
//       if (!instance) {
//         setErrorMessage(`Cannot play stream ${stream.streamID}: Zego instance not available`);
//         return;
//       }
//       const reactTag = findNodeHandle(stream.ref.current);
//       if (!reactTag) {
//         if (retryCount > 0) {
//           console.log(`Invalid ref for stream ${stream.streamID}, retrying (${retryCount} attempts left)`); // Debug log
//           setTimeout(() => playStream(stream, retryCount - 1), 500); // Retry after a delay
//           return;
//         }
//         throw new Error(`Invalid ref for stream ${stream.streamID} after retries`);
//       }
//       console.log(`Playing stream: ${stream.streamID}, ReactTag: ${reactTag}`); // Debug log
//       await instance.startPlayingStream(stream.streamID, {
//         reactTag,
//         viewMode: ZegoViewMode.AspectFill,
//         backgroundColor: 0x000000,
//       });
//       console.log(`Stream ${stream.streamID} playback started successfully`); // Debug log
//     } catch (err: any) {
//       console.error(`Failed to play stream ${stream.streamID}:`, err);
//       setErrorMessage(`Failed to play stream ${stream.streamID}: ${err.message}`);
//     }
//   };

//   const confirmExit = () => {
//     setIsModalVisible(false);
//     goBack();
//   };

//   const cancelExit = () => {
//     setIsModalVisible(false);
//   };

//   // Separate main host and co-hosts
//   const mainHostStream = streams.find((stream) => stream.userID === '49854261');
//   const coHostStreams = streams.filter((stream) => stream.userID !== '49854261');

//   const renderMainHostStream = () => {
//     if (!mainHostStream) {
//       return (
//         <View style={styles.mainHostContainer}>
//           <Text style={styles.emptyText}>Main host stream not available</Text>
//         </View>
//       );
//     }
//     return (
//       <View style={styles.mainHostContainer}>
//         <ZegoTextureView
//           ref={mainHostStream.ref}
//           style={styles.mainHostPreview}
//           onLayout={() => playStream(mainHostStream)}
//         />
//         <Text style={styles.mainHostLabel}>{mainHostStream.userName}'s Stream</Text>
//       </View>
//     );
//   };

//   const renderCoHostStream = ({ item }: { item: StreamInfo }) => (
//     <View style={styles.coHostContainer}>
//       <ZegoTextureView
//         ref={item.ref}
//         style={styles.coHostPreview}
//         onLayout={() => playStream(item)}
//       />
//       <Text style={styles.coHostLabel}>{item.userName}'s Stream</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//           <Entypo name="cross" size={25} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.previewContainer}>
//         {renderMainHostStream()}
//         <FlatList
//           data={coHostStreams}
//           renderItem={renderCoHostStream}
//           keyExtractor={(item) => sanitizeKey(`${item.streamID}-${item.userID}`)}
//           horizontal
//           style={styles.coHostList}
//           contentContainerStyle={styles.coHostListContent}
//           ListEmptyComponent={
//             <View style={styles.emptyCoHostContainer}>
//               <Text style={styles.emptyCoHostText}>No co-hosts available</Text>
//             </View>
//           }
//         />
//       </View>

//       <View style={styles.overlay}>
//         <View style={styles.usersContainer}>
//           <Text style={styles.usersText}>Users: {users.length}</Text>
//         </View>

//         <ScrollView style={styles.messagesContainer}>
//           {allMessages.map((msg) => (
//             <View key={msg.id} style={styles.messageItem}>
//               {msg.type === 'system' && (
//                 <Text style={styles.systemMessage}>{msg.message}</Text>
//               )}
//               {msg.type === 'join' && (
//                 <Text style={styles.joinMessage}>{msg.userName} joined</Text>
//               )}
//               {msg.type === 'leave' && (
//                 <Text style={styles.leaveMessage}>{msg.userName} left</Text>
//               )}
//               {msg.type === 'chat' && (
//                 <Text style={styles.chatMessage}>
//                   <Text style={styles.userName}>{msg.userName}: </Text>
//                   {msg.message}
//                 </Text>
//               )}
//             </View>
//           ))}
//         </ScrollView>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             value={messageInput}
//             onChangeText={setMessageInput}
//             placeholder="Type a message..."
//             placeholderTextColor={customColors.gray500}
//           />
//           <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//             <MaterialCommunityIcons name="send" size={20} color={customColors.white} />
//           </TouchableOpacity>
//         </View>

//         {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
//       </View>

//       <LiveSetupExitModal visible={isModalVisible} onConfirm={confirmExit} onCancel={cancelExit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   header: {
//     position: 'absolute',
//     top: 50,
//     right: 10,
//     left: 10,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     zIndex: 100,
//   },
//   previewContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   mainHostContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   mainHostPreview: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   mainHostLabel: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     color: customColors.white,
//     padding: scaleWidth(5),
//     borderRadius: 5,
//     fontSize: scaleFont(14),
//   },
//   coHostList: {
//     position: 'absolute',
//     top: scaleHeight(80),
//     left: 0,
//     right: 0,
//     zIndex: 10,
//   },
//   coHostListContent: {
//     paddingHorizontal: scaleWidth(10),
//   },
//   coHostContainer: {
//     width: scaleWidth(120),
//     height: scaleHeight(150),
//     marginHorizontal: scaleWidth(5),
//     position: 'relative',
//   },
//   coHostPreview: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: customColors.white,
//   },
//   coHostLabel: {
//     position: 'absolute',
//     top: 5,
//     left: 5,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     color: customColors.white,
//     padding: scaleWidth(3),
//     borderRadius: 5,
//     fontSize: scaleFont(10),
//   },
//   emptyCoHostContainer: {
//     height: scaleHeight(150),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyCoHostText: {
//     color: customColors.white,
//     fontSize: scaleFont(12),
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   emptyText: {
//     color: customColors.white,
//     fontSize: scaleFont(16),
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 20,
//     left: 10,
//     right: 10,
//     zIndex: 50,
//   },
//   usersContainer: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: scaleWidth(10),
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   usersText: {
//     color: customColors.white,
//     fontSize: scaleFont(14),
//     fontWeight: '600',
//   },
//   messagesContainer: {
//     maxHeight: scaleHeight(200),
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 10,
//     padding: scaleWidth(10),
//     marginBottom: 10,
//   },
//   messageItem: { marginBottom: 5 },
//   systemMessage: { color: customColors.gray500, fontSize: scaleFont(12) },
//   joinMessage: { color: customColors.green, fontSize: scaleFont(12) },
//   leaveMessage: { color: customColors.red, fontSize: scaleFont(12) },
//   chatMessage: { color: customColors.white, fontSize: scaleFont(12) },
//   userName: { fontWeight: '600' },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 20,
//     paddingHorizontal: scaleWidth(10),
//   },
//   input: {
//     flex: 1,
//     color: customColors.white,
//     fontSize: scaleFont(14),
//     paddingVertical: scaleHeight(8),
//   },
//   sendButton: {
//     padding: scaleWidth(10),
//   },
//   error: {
//     color: '#f66',
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });

// export default UserJoinLiveScreen;





import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    findNodeHandle,
    BackHandler,
    FlatList,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import ZegoExpressEngine, {
    ZegoTextureView,
    ZegoScenario,
    ZegoUser,
    ZegoRoomConfig,
    ZegoUpdateType,
    ZegoViewMode,
    ZegoPublishChannel,
    ZegoPublisherState,
} from 'zego-express-engine-reactnative';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { goBack } from '@/utils/navigationService';
import LiveSetupExitModal from '@/components/live/LiveSetupExitModal';
import { useAuth } from '@/context/AuthProvider';
import KeyCenter from '@/zegodata/KeyCenter';

// Room configuration
const roomConfig: ZegoRoomConfig = {
    isUserStatusNotify: true,
    maxMemberCount: 50,
    token: '',
};

// Default system message
const defaultMessage =
    'Contents containing vulgarity, pornography, violence, and minors are strictly prohibited Administrators monitor the feed 24/7 Reported contents and violations will be severely penalized';

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
    type: 'join' | 'leave' | 'chat' | 'system' | 'cohost_request' | 'cohost_accepted' | 'cohost_removed';
    message?: string;
    userID?: string;
    userName?: string;
    timestamp: number;
}

interface StreamInfo {
    streamID: string;
    userID: string;
    userName: string;
    ref: React.MutableRefObject<any>;
}

// Utility function to sanitize keys
const sanitizeKey = (key: string): string => {
    return key.replace(/[^a-zA-Z0-9-_]/g, '_');
};

// Check if running on an emulator
const isEmulator = Platform.OS === 'android' && (Platform.constants.Brand === 'generic' || Platform.constants.Model.includes('Emulator'));

const UserJoinLiveScreen = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
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
    const [messageInput, setMessageInput] = useState('');
    const [streams, setStreams] = useState<StreamInfo[]>([]);
    const [isEngineInitialized, setIsEngineInitialized] = useState(false);
    const [pendingStreams, setPendingStreams] = useState<StreamInfo[]>([]);
    const [hasAppliedAsCoHost, setHasAppliedAsCoHost] = useState(false);
    const [isCoHost, setIsCoHost] = useState(false);
    const [ownStream, setOwnStream] = useState<StreamInfo | null>(null);
    const [coHosts, setCoHosts] = useState<string[]>([]);
    const [shouldStartPublishing, setShouldStartPublishing] = useState(false);
    const { user } = useAuth();

    const zegoConfig = {
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        userID: String(user?.liveId),
        roomID: '9999',
        scenario: ZegoScenario.Broadcast,
    };

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
            const results = await PermissionsAndroid.requestMultiple(permissions);
            const allGranted = Object.values(results).every((status) => status === 'granted');
            if (!allGranted) {
                setErrorMessage('Camera or microphone permission denied. Cannot publish stream.');
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        if (isEngineInitialized && pendingStreams.length > 0) {
            setStreams((prevStreams) => {
                const filteredStreams = pendingStreams.filter(
                    (pendingStream) => !prevStreams.some((prev) => prev.streamID === pendingStream.streamID),
                );
                console.log('Processing Pending Streams:', filteredStreams);
                const updatedStreams = [...prevStreams, ...filteredStreams];
                filteredStreams.forEach((stream) => {
                    setTimeout(() => playStream(stream), 100);
                });
                return updatedStreams;
            });
            setPendingStreams([]);
        }
    }, [isEngineInitialized, pendingStreams]);

    useEffect(() => {
        if (isEngineInitialized && shouldStartPublishing) {
            console.log('Engine initialized, starting to publish stream');
            startPublishingStream();
            setShouldStartPublishing(false);
        }
    }, [isEngineInitialized, shouldStartPublishing]);

    useEffect(() => {
        const initZego = async () => {
            try {
                const permissionsGranted = await requestPermissions();
                if (!permissionsGranted && Platform.OS === 'android') {
                    return;
                }

                await ZegoExpressEngine.createEngineWithProfile({
                    appID: zegoConfig.appID,
                    appSign: zegoConfig.appSign,
                    scenario: zegoConfig.scenario,
                });
                const instance = ZegoExpressEngine.instance();

                instance.on('roomStreamUpdate', (roomID, updateType, streamList) => {
                    console.log('Room Stream Update:', { roomID, updateType, streamList });
                    if (roomID === zegoConfig.roomID) {
                        if (updateType === ZegoUpdateType.Add) {
                            const newStreams = streamList
                                .filter((stream) => stream.user.userID !== zegoConfig.userID)
                                .map((stream) => ({
                                    streamID: stream.streamID,
                                    userID: stream.user.userID,
                                    userName: stream.user.userName,
                                    ref: { current: null },
                                }));

                            if (isEngineInitialized) {
                                setStreams((prevStreams) => {
                                    const filteredStreams = newStreams.filter(
                                        (newStream) => !prevStreams.some((prev) => prev.streamID === newStream.streamID),
                                    );
                                    const updatedStreams = [...prevStreams, ...filteredStreams];
                                    filteredStreams.forEach((stream) => {
                                        setTimeout(() => playStream(stream), 100);
                                    });
                                    return updatedStreams;
                                });
                            } else {
                                setPendingStreams((prevPending) => {
                                    const filteredPending = newStreams.filter(
                                        (newStream) => !prevPending.some((prev) => prev.streamID === newStream.streamID),
                                    );
                                    return [...prevPending, ...filteredPending];
                                });
                            }
                        } else if (updateType === ZegoUpdateType.Delete) {
                            setStreams((prevStreams) =>
                                prevStreams.filter((stream) => !streamList.some((s) => s.streamID === stream.streamID)),
                            );
                            setPendingStreams((prevPending) =>
                                prevPending.filter((stream) => !streamList.some((s) => s.streamID === stream.streamID)),
                            );
                        }
                    }
                });

                instance.on('roomUserUpdate', (roomID, updateType, userList) => {
                    console.log('Room User Update:', { roomID, updateType, userList });
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
                        }
                    }
                });

                instance.on('IMRecvBroadcastMessage', (roomID, messageList) => {
                    console.log('Received Broadcast Message:', { roomID, messageList });
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
                            ...newMessages.map((msg) => {
                                if (msg.message.startsWith('COHOST_REQUEST:')) {
                                    return {
                                        id: msg.id,
                                        type: 'cohost_request',
                                        userID: msg.userID,
                                        userName: msg.userName,
                                        timestamp: msg.timestamp,
                                    };
                                } else if (msg.message.startsWith('COHOST_ACCEPTED:')) {
                                    const coHostUserID = msg.message.split(':')[1];
                                    setCoHosts((prev) => [...prev, coHostUserID]);
                                    if (msg.message === `COHOST_ACCEPTED:${zegoConfig.userID}`) {
                                        setIsCoHost(true);
                                        if (isEngineInitialized) {
                                            console.log('Engine already initialized, starting to publish stream');
                                            startPublishingStream();
                                        } else {
                                            console.log('Engine not initialized yet, queuing stream publishing');
                                            setShouldStartPublishing(true);
                                        }
                                    }
                                    return {
                                        id: msg.id,
                                        type: 'cohost_accepted',
                                        userID: msg.userID,
                                        userName: msg.userName,
                                        timestamp: msg.timestamp,
                                    };
                                } else if (msg.message.startsWith('COHOST_REMOVED:')) {
                                    const coHostUserID = msg.message.split(':')[1];
                                    setCoHosts((prev) => prev.filter((id) => id !== coHostUserID));
                                    if (msg.message === `COHOST_REMOVED:${zegoConfig.userID}`) {
                                        setIsCoHost(false);
                                        setOwnStream(null);
                                        instance.stopPublishingStream();
                                    }
                                    return {
                                        id: msg.id,
                                        type: 'cohost_removed',
                                        userID: msg.userID,
                                        userName: msg.userName,
                                        timestamp: msg.timestamp,
                                    };
                                }
                                return {
                                    id: msg.id,
                                    type: 'chat',
                                    message: msg.message,
                                    userID: msg.userID,
                                    userName: msg.userName,
                                    timestamp: msg.timestamp,
                                };
                            }),
                        ]);
                    }
                });

                instance.on('roomStateUpdate', (roomID, state, errorCode) => {
                    console.log('Room State Update:', { roomID, state, errorCode });
                    if (errorCode !== 0) {
                        setErrorMessage(`Room error: ${errorCode}`);
                    }
                });

                instance.on('publisherStateUpdate', (streamID, state, errorCode, extendedData) => {
                    console.log('Publisher State Update:', { streamID, state, errorCode, extendedData });
                    if (state === ZegoPublisherState.NoPublish) {
                        setErrorMessage(`Failed to publish stream: ${errorCode} - ${JSON.stringify(extendedData)}`);
                    } else if (state === ZegoPublisherState.PublishRequesting) {
                        console.log(`Stream ${streamID} is requesting to publish`);
                    } else if (state === ZegoPublisherState.Publishing) {
                        console.log(`Stream ${streamID} is now publishing`);
                    }
                });

                const userData: ZegoUser = { userID: zegoConfig.userID, userName: user?.name || 'Guest' };
                await instance.loginRoom(zegoConfig.roomID, userData, roomConfig);
                console.log('User joined room:', zegoConfig.roomID);

                setIsEngineInitialized(true);
                console.log('Engine Initialized');
            } catch (err: any) {
                console.error('Zego init error:', err);
                setErrorMessage(err.message);
            }
        };

        initZego();

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setIsModalVisible(true);
            return true;
        });

        return () => {
            backHandler.remove();
            const instance = ZegoExpressEngine.instance();
            if (instance) {
                instance.off('roomStreamUpdate');
                instance.off('roomUserUpdate');
                instance.off('IMRecvBroadcastMessage');
                instance.off('roomStateUpdate');
                instance.off('publisherStateUpdate');
                streams.forEach((stream) => {
                    try {
                        instance.stopPlayingStream(stream.streamID);
                    } catch (err) {
                        console.error(`Error stopping stream ${stream.streamID}:`, err);
                    }
                });
                if (isCoHost) {
                    instance.stopPublishingStream();
                }
                instance.logoutRoom(zegoConfig.roomID);
                ZegoExpressEngine.destroyEngine();
            }
            setIsEngineInitialized(false);
            setStreams([]);
            setPendingStreams([]);
            setOwnStream(null);
            setCoHosts([]);
            setShouldStartPublishing(false);
        };
    }, []);

    const sendMessage = async () => {
        if (!messageInput.trim()) return;
        if (!isEngineInitialized) {
            setErrorMessage('Cannot send message: Engine not initialized');
            return;
        }
        try {
            const instance = ZegoExpressEngine.instance();
            if (!instance) {
                setErrorMessage('Cannot send message: Zego instance not available');
                return;
            }
            const result = await instance.sendBroadcastMessage(zegoConfig.roomID, messageInput);
            if (result.errorCode === 0) {
                const newMessage: Message = {
                    id: `${zegoConfig.userID}-${Date.now()}`,
                    message: messageInput,
                    userID: zegoConfig.userID,
                    userName: user?.name || 'Guest',
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
                setMessageInput('');
            } else {
                setErrorMessage(`Failed to send message (Error: ${result.errorCode})`);
            }
        } catch (err) {
            console.error('Error sending message:', err);
            setErrorMessage('Error sending message');
        }
    };

    const applyAsCoHost = async () => {
        if (!isEngineInitialized) {
            setErrorMessage('Cannot apply as co-host: Engine not initialized');
            return;
        }
        try {
            const instance = ZegoExpressEngine.instance();
            if (!instance) {
                setErrorMessage('Cannot apply as co-host: Zego instance not available');
                return;
            }
            const coHostRequestMessage = `COHOST_REQUEST:${zegoConfig.userID}`;
            const result = await instance.sendBroadcastMessage(zegoConfig.roomID, coHostRequestMessage);
            if (result.errorCode === 0) {
                setHasAppliedAsCoHost(true);
                setAllMessages((prev) => [
                    ...prev,
                    {
                        id: `cohost_request-${zegoConfig.userID}-${Date.now()}`,
                        type: 'cohost_request',
                        userID: zegoConfig.userID,
                        userName: user?.name || 'Guest',
                        timestamp: Date.now(),
                    },
                ]);
            } else {
                setErrorMessage(`Failed to apply as co-host (Error: ${result.errorCode})`);
            }
        } catch (err) {
            console.error('Error applying as co-host:', err);
            setErrorMessage('Error applying as co-host');
        }
    };

    const startPublishingStream = async (retryCount = 3) => {
        if (!isEngineInitialized) {
            setErrorMessage('Cannot start stream: Engine not initialized');
            return;
        }
        try {
            const instance = ZegoExpressEngine.instance();
            if (!instance) {
                setErrorMessage('Cannot start stream: Zego instance not available');
                return;
            }
            const streamID = `${zegoConfig.userID}-${Date.now()}`;
            console.log(`Attempting to publish stream: ${streamID}, Retry count: ${retryCount}`);
            const result = await instance.startPublishingStream(streamID, ZegoPublishChannel.Main);
            if (result) {
                console.log(`Stream ${streamID} published successfully`);
                setOwnStream({
                    streamID,
                    userID: zegoConfig.userID,
                    userName: user?.name || 'Guest',
                    ref: { current: null },
                });
            } else if (retryCount > 0) {
                console.log(`Retrying to publish stream: ${streamID}, Retries left: ${retryCount - 1}`);
                setTimeout(() => startPublishingStream(retryCount - 1), 2000); // Increased delay to 2 seconds
            } else {
                setErrorMessage('Failed to publish stream after retries. Check logs for details.');
            }
        } catch (err: any) {
            console.error('Error starting stream:', err);
            if (retryCount > 0) {
                console.log(`Retrying to publish stream after error: ${err.message}, Retries left: ${retryCount - 1}`);
                setTimeout(() => startPublishingStream(retryCount - 1), 2000);
            } else {
                setErrorMessage(`Error starting stream: ${err.message}`);
            }
        }
    };

    const playStream = async (stream: StreamInfo, retryCount = 3) => {
        if (!isEngineInitialized) {
            setErrorMessage(`Cannot play stream ${stream.streamID}: Engine not initialized`);
            return;
        }
        try {
            const instance = ZegoExpressEngine.instance();
            if (!instance) {
                setErrorMessage(`Cannot play stream ${stream.streamID}: Zego instance not available`);
                return;
            }
            const reactTag = findNodeHandle(stream.ref.current);
            if (!reactTag) {
                if (retryCount > 0) {
                    console.log(`Invalid ref for stream ${stream.streamID}, retrying (${retryCount} attempts left)`);
                    setTimeout(() => playStream(stream, retryCount - 1), 500);
                    return;
                }
                throw new Error(`Invalid ref for stream ${stream.streamID} after retries`);
            }
            console.log(`Playing stream: ${stream.streamID}, ReactTag: ${reactTag}`);
            await instance.startPlayingStream(stream.streamID, {
                reactTag,
                viewMode: ZegoViewMode.AspectFill,
                backgroundColor: 0x000000,
            });
            console.log(`Stream ${stream.streamID} playback started successfully`);
        } catch (err: any) {
            console.error(`Failed to play stream ${stream.streamID}:`, err);
            setErrorMessage(`Failed to play stream ${stream.streamID}: ${err.message}`);
        }
    };

    const confirmExit = () => {
        setIsModalVisible(false);
        goBack();
    };

    const cancelExit = () => {
        setIsModalVisible(false);
    };

    const mainHostStream = streams.find((stream) => stream.userID === '49854261');
    const coHostStreams = streams.filter((stream) => coHosts.includes(stream.userID));

    const renderMainHostStream = () => {
        if (!mainHostStream) {
            return (
                <View style={styles.mainHostContainer}>
                    <Text style={styles.emptyText}>Main host stream not available</Text>
                </View>
            );
        }
        return (
            <View style={styles.mainHostContainer}>
                <ZegoTextureView
                    ref={mainHostStream.ref}
                    style={styles.mainHostPreview}
                    onLayout={() => playStream(mainHostStream)}
                />
                <Text style={styles.mainHostLabel}>{mainHostStream.userName}'s Stream</Text>
            </View>
        );
    };

    const renderCoHostStream = ({ item }: { item: StreamInfo }) => (
        <View style={styles.coHostContainer}>
            <ZegoTextureView
                ref={item.ref}
                style={styles.coHostPreview}
                onLayout={() => playStream(item)}
            />
            <Text style={styles.coHostLabel}>{item.userName}'s Stream</Text>
        </View>
    );

    const renderOwnStream = () => {
        if (!ownStream) return null;
        return (
            <View style={styles.ownStreamContainer}>
                <ZegoTextureView
                    ref={ownStream.ref}
                    style={styles.ownStreamPreview}
                    onLayout={() => playStream(ownStream)}
                />
                <Text style={styles.ownStreamLabel}>Your Stream</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Entypo name="cross" size={25} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.previewContainer}>
                {renderMainHostStream()}
                <FlatList
                    data={coHostStreams}
                    renderItem={renderCoHostStream}
                    keyExtractor={(item) => sanitizeKey(`${item.streamID}-${item.userID}`)}
                    horizontal
                    style={styles.coHostList}
                    contentContainerStyle={styles.coHostListContent}
                    ListEmptyComponent={
                        <View style={styles.emptyCoHostContainer}>
                            <Text style={styles.emptyCoHostText}>No co-hosts available</Text>
                        </View>
                    }
                />
                {isCoHost && renderOwnStream()}
            </View>

            <View style={styles.overlay}>
                <View style={styles.usersContainer}>
                    <Text style={styles.usersText}>Users: {users.length}</Text>
                    <TouchableOpacity
                        style={[styles.coHostButton, hasAppliedAsCoHost && styles.coHostButtonDisabled]}
                        onPress={applyAsCoHost}
                        disabled={hasAppliedAsCoHost}
                    >
                        <Text style={styles.coHostButtonText}>
                            {hasAppliedAsCoHost ? 'Applied as Co-Host' : 'Apply as Co-Host'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.messagesContainer}>
                    {allMessages.map((msg) => (
                        <View key={msg.id} style={styles.messageItem}>
                            {msg.type === 'system' && (
                                <Text style={styles.systemMessage}>{msg.message}</Text>
                            )}
                            {msg.type === 'join' && (
                                <Text style={styles.joinMessage}>{msg.userName} joined</Text>
                            )}
                            {msg.type === 'leave' && (
                                <Text style={styles.leaveMessage}>{msg.userName} left</Text>
                            )}
                            {msg.type === 'chat' && (
                                <Text style={styles.chatMessage}>
                                    <Text style={styles.userName}>{msg.userName}: </Text>
                                    {msg.message}
                                </Text>
                            )}
                            {msg.type === 'cohost_request' && (
                                <Text style={styles.coHostRequestMessage}>
                                    {msg.userName} applied to be a co-host
                                </Text>
                            )}
                            {msg.type === 'cohost_accepted' && (
                                <Text style={styles.coHostAcceptedMessage}>
                                    {msg.userName} has been accepted as a co-host
                                </Text>
                            )}
                            {msg.type === 'cohost_removed' && (
                                <Text style={styles.coHostRemovedMessage}>
                                    {msg.userName} has been removed as a co-host
                                </Text>
                            )}
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={messageInput}
                        onChangeText={setMessageInput}
                        placeholder="Type a message..."
                        placeholderTextColor={customColors.gray500}
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <MaterialCommunityIcons name="send" size={20} color={customColors.white} />
                    </TouchableOpacity>
                </View>

                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            </View>

            <LiveSetupExitModal visible={isModalVisible} onConfirm={confirmExit} onCancel={cancelExit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: {
        position: 'absolute',
        top: 50,
        right: 10,
        left: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 100,
    },
    previewContainer: {
        flex: 1,
        position: 'relative',
    },
    mainHostContainer: {
        flex: 1,
        position: 'relative',
    },
    mainHostPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    mainHostLabel: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: customColors.white,
        padding: scaleWidth(5),
        borderRadius: 5,
        fontSize: scaleFont(14),
    },
    coHostList: {
        position: 'absolute',
        top: scaleHeight(80),
        left: 0,
        right: 0,
        zIndex: 10,
    },
    coHostListContent: {
        paddingHorizontal: scaleWidth(10),
    },
    coHostContainer: {
        width: scaleWidth(120),
        height: scaleHeight(150),
        marginHorizontal: scaleWidth(5),
        position: 'relative',
    },
    coHostPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: customColors.white,
    },
    coHostLabel: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: customColors.white,
        padding: scaleWidth(3),
        borderRadius: 5,
        fontSize: scaleFont(10),
    },
    emptyCoHostContainer: {
        height: scaleHeight(150),
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCoHostText: {
        color: customColors.white,
        fontSize: scaleFont(12),
    },
    ownStreamContainer: {
        position: 'absolute',
        bottom: scaleHeight(250),
        right: scaleWidth(10),
        width: scaleWidth(100),
        height: scaleHeight(120),
        zIndex: 60,
    },
    ownStreamPreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: customColors.yellow,
    },
    ownStreamLabel: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: customColors.white,
        padding: scaleWidth(3),
        borderRadius: 5,
        fontSize: scaleFont(10),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    emptyText: {
        color: customColors.white,
        fontSize: scaleFont(16),
    },
    overlay: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        zIndex: 50,
    },
    usersContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: scaleWidth(10),
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    usersText: {
        color: customColors.white,
        fontSize: scaleFont(14),
        fontWeight: '600',
    },
    coHostButton: {
        backgroundColor: customColors.green,
        paddingVertical: scaleHeight(5),
        paddingHorizontal: scaleWidth(10),
        borderRadius: 5,
    },
    coHostButtonDisabled: {
        backgroundColor: customColors.gray500,
    },
    coHostButtonText: {
        color: customColors.white,
        fontSize: scaleFont(12),
        fontWeight: '600',
    },
    messagesContainer: {
        maxHeight: scaleHeight(200),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        padding: scaleWidth(10),
        marginBottom: 10,
    },
    messageItem: { marginBottom: 5 },
    systemMessage: { color: customColors.gray500, fontSize: scaleFont(12) },
    joinMessage: { color: customColors.green, fontSize: scaleFont(12) },
    leaveMessage: { color: customColors.red, fontSize: scaleFont(12) },
    chatMessage: { color: customColors.white, fontSize: scaleFont(12) },
    coHostRequestMessage: { color: customColors.yellow, fontSize: scaleFont(12) },
    coHostAcceptedMessage: { color: customColors.green, fontSize: scaleFont(12) },
    coHostRemovedMessage: { color: customColors.red, fontSize: scaleFont(12) },
    userName: { fontWeight: '600' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        paddingHorizontal: scaleWidth(10),
    },
    input: {
        flex: 1,
        color: customColors.white,
        fontSize: scaleFont(14),
        paddingVertical: scaleHeight(8),
    },
    sendButton: {
        padding: scaleWidth(10),
    },
    error: {
        color: '#f66',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default UserJoinLiveScreen;