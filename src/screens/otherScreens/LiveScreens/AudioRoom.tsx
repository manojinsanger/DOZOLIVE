
// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ImageBackground,
//   FlatList,
//   Modal,
//   ActivityIndicator,
//   Alert,
//   Switch,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useAudioRoom } from '@/context/AudioRoomSocketProvider';
// import { useUser } from '@/context/UserProvider';
// import ZegoExpressEngine, { ZegoScenario, ZegoUpdateType } from 'zego-express-engine-reactnative';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import { Platform, PermissionsAndroid } from 'react-native';
// import KeyCenter from '@/zegodata/KeyCenter';
// import SeatLayout from '@/components/liveaudioroom/SeatLayout';
// import ShowHostInfo from '@/components/liveaudioroom/ShowHostInfo';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import UserListModal from '@/components/liveaudioroom/UserListModal';
// import CohostRequestModal from '@/components/liveaudioroom/CohostRequestList';
// import customColors from '@/constants/styles';

// interface User {
//   id: string;
//   userName: string;
//   userProfile: string;
//   level: number;
//   specialId: string;
//   seat?: number;
//   mic?: boolean;
//   isCohost?: boolean;
//   isHost?: boolean;
//   chatMute?: boolean;
// }

// const AudioRoom = () => {
//   const navigation = useNavigation();
//   const { params } = useRoute();
//   const { userAllDetails } = useUser();
//   const { room, socket, joinRoom, toggleMic, acceptCohost, kickCohostFromSeat, deleteRoom, changeSeat, toggleRoomLock, changeRoomBackground, removeCohostStatus, toggleChatMute } = useAudioRoom();

//   const engineRef = useRef<ZegoExpressEngine | null>(null);
//   const [roomState, setRoomState] = useState('disconnected');
//   const [streamState, setStreamState] = useState('idle');
//   const [soundLevel, setSoundLevel] = useState(0);
//   const [streamList, setStreamList] = useState<any[]>([]);
//   const [seatChangeModalVisible, setSeatChangeModalVisible] = useState(false);
//   const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
//   const [newBackgroundImage, setNewBackgroundImage] = useState('');
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isLocked, setIsLocked] = useState(room?.isLocked || false);


//   // modals states 
//   const [isUserModalVisible, setUserModalVisible] = useState(false);
//   const [isCohostUserModalVisible, setCohostUserModalVisible] = useState(false);



//   const roomId = params?.roomId || 'defaultRoomId';
//   const userId = String(userAllDetails.liveId);
//   const userName = String(userAllDetails.name);
//   const streamId = `stream_${userId}`;

//   useEffect(() => {
//     const initialize = async () => {
//       await startBroadcasting();
//       joinRoom({
//         roomId,
//         id: userId,
//         userName,
//         userProfile: userAllDetails.profileImage || '',
//         level: userAllDetails.level || 0,
//         specialId: userAllDetails.specialId || '',
//       });
//     };
//     initialize();
//     return () => {
//       cleanup();
//     };
//   }, []);

//   useEffect(() => {
//     setIsLocked(room?.isLocked || false);
//   }, [room?.isLocked]);

//   const initEngine = async () => {
//     try {
//       const profile = {
//         appID: KeyCenter.appID,
//         appSign: KeyCenter.appSign,
//         scenario: ZegoScenario.HighQualityChatroom,
//       };

//       const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
//       engineRef.current = engine;

//       await engine.setAudioConfig({ bitrate: 48, channel: 1, codecID: 0 }, undefined);
//       await engine.muteMicrophone(false);
//       await engine.muteSpeaker(false);
//       engine.startSoundLevelMonitor(undefined);
//       setupEventHandlers(engine);
//       return engine;
//     } catch (error) {
//       console.error('Engine initialization failed:', error);
//     }
//   };


//   const setupEventHandlers = (engine: ZegoExpressEngine) => {
//     engine.on('roomStateUpdate', (roomID, state) => {
//       console.log('Room State Updated:', { roomID, state });
//       setRoomState(state);
//     });

//     engine.on('roomStreamUpdate', async (roomID, updateType, newStreams) => {
//       console.log('Room Stream Update:', {
//         roomID,
//         updateType,
//         newStreams,
//       });

//       if (updateType === ZegoUpdateType.Add) {
//         console.log('Adding new streams:', newStreams.map((s) => s.streamID));
//         setStreamList((prev) => [...prev, ...newStreams]);
//         newStreams.forEach((stream: any) => {
//           console.log('Playing stream:', stream.streamID);
//           playStream(stream.streamID);
//         });
//       } else if (updateType === ZegoUpdateType.Delete) {
//         console.log('Removing streams:', newStreams.map((s) => s.streamID));
//         setStreamList((prev) =>
//           prev.filter((s) => !newStreams.find((ns) => ns.streamID === s.streamID))
//         );
//       }
//     });

//     engine.on('publisherStateUpdate', (streamID, state) => setStreamState(state));
//     engine.on('capturedSoundLevelUpdate', (soundLevel: number) => setSoundLevel(soundLevel));
//   };

//   const requestPermissions = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(PERMISSIONS.ANDROID.RECORD_AUDIO);
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } else {
//         const result = await request(PERMISSIONS.IOS.MICROPHONE);
//         return result === RESULTS.GRANTED;
//       }
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const startBroadcasting = async () => {
//     try {
//       const hasPermission = await requestPermissions();
//       if (!hasPermission) throw new Error('Microphone permission denied');

//       const engine = await initEngine();
//       if (!engine) throw new Error('Engine not initialized');

//       await engine.loginRoom(roomId, { userID: userId, userName });
//       await engine.startPublishingStream(streamId);
//     } catch (error) {
//       console.error('Broadcast failed:', error.message);
//     }
//   };

//   const playStream = async (streamID: string) => {
//     try {
//       if (engineRef.current) {
//         await engineRef.current.startPlayingStream(streamID);
//       }
//     } catch (err) {
//       console.error('Error playing stream:', err);
//     }
//   };

//   const cleanup = async () => {
//     if (engineRef.current) {
//       const engine = engineRef.current;
//       engine.off('roomStateUpdate');
//       engine.off('publisherStateUpdate');
//       engine.off('capturedSoundLevelUpdate');
//       try {
//         await engine.logoutRoom(roomId);
//         ZegoExpressEngine.instance().stopSoundLevelMonitor();
//         ZegoExpressEngine.destroyEngine();
//       } catch (e) {
//         console.warn('Cleanup error:', e);
//       }
//       engineRef.current = null;
//     }
//   };

//   const handleToggleLock = () => {
//     const newLockState = !isLocked;
//     toggleRoomLock(roomId, newLockState);
//     setIsLocked(newLockState);
//   };

//   const handleChangeSeat = (user: User) => {
//     setSelectedUser(user);
//     setSeatChangeModalVisible(true);
//   };

//   const confirmSeatChange = (newSeat: number) => {
//     if (selectedUser) {
//       const isOccupied = room?.users.some((u) => u.seat === newSeat);
//       if (isOccupied) {
//         Alert.alert('Error', 'This seat is already occupied.');
//         return;
//       }
//       changeSeat(roomId, selectedUser.id, newSeat);
//       Alert.alert('Success', `Moved to Seat ${newSeat}`);
//     }
//     setSeatChangeModalVisible(false);
//     setSelectedUser(null);
//   };

//   const handleChangeBackground = () => {
//     if (!newBackgroundImage) {
//       Alert.alert('Error', 'Please enter a valid image URL');
//       return;
//     }
//     changeRoomBackground(roomId, newBackgroundImage);
//     setNewBackgroundImage('');
//     setBackgroundModalVisible(false);
//     Alert.alert('Success', 'Room background changed');
//   };

//   const handleRemoveCohostStatus = async () => {
//     try {
//       await removeCohostStatus(roomId, userId);
//       Alert.alert('Success', 'Co-host status removed');
//       if (engineRef.current) {
//         await engineRef.current.stopPublishingStream( );
//       }
//     } catch (err) {
//       console.error('Remove co-host status failed:', err);
//       Alert.alert('Error', 'Failed to remove co-host status');
//     }
//   };

//   const handleToggleMic = async (targetUserId: string, currentMicStatus: boolean) => {
//     try {
//       await toggleMic(roomId, targetUserId, !currentMicStatus);
//       Alert.alert('Success', `Mic ${currentMicStatus ? 'muted' : 'unmuted'}`);
//       if (targetUserId === userId && engineRef.current) {
//         await engineRef.current.muteMicrophone(currentMicStatus);
//       }
//     } catch (err) {
//       console.error('Toggle mic failed:', err);
//       Alert.alert('Error', 'Failed to toggle mic');
//     }
//   };

//   const handleKickUser = async (targetUserId: string) => {
//     try {
//       await kickCohostFromSeat(roomId, targetUserId);
//       Alert.alert('Success', 'User kicked');
//     } catch (err) {
//       console.error('Kick user failed:', err);
//       Alert.alert('Error', 'Failed to kick user');
//     }
//   };

//   const renderSeatOption = ({ item }: { item: number }) => {
//     const isOccupied = room?.users.some((u) => u.seat === item);
//     return (
//       <TouchableOpacity
//         style={[styles.seatOption, isOccupied && styles.seatOptionDisabled]}
//         onPress={() => !isOccupied && confirmSeatChange(item)}
//         disabled={isOccupied}
//       >
//         <Text style={styles.seatOptionText}>Seat {item}</Text>
//       </TouchableOpacity>
//     );
//   };

//   // console.log(room, 'room from context');

//   const availableSeats = Array.from({ length: room?.seats || 8 }, (_, i) => i + 1);
//   const isCohost = room?.users.find((u) => u.id === userId)?.isCohost && !room?.users.find((u) => u.id === userId)?.isHost;


//   return (
//     <ImageBackground
//       source={{ uri: room?.image || 'https://via.placeholder.com/300' }}
//       style={styles.container}
//       imageStyle={styles.backgroundImage}
//     >
//       <SafeAreaView style={{ flex: 1 }}>

//         <ScrollView style={styles.overlay}>
//           {/* header */}
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}
//           >
//             <ShowHostInfo />
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <TouchableOpacity
//                 onPress={() => setUserModalVisible(true)}
//                 style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
//               >
//                 <Ionicons name="person" size={20} color="#fff" style={{ marginRight: 5 }} />
//                 <Text style={{ fontSize: 16, color: 'white' }}>2</Text>
//               </TouchableOpacity>
//               <Ionicons name="close" size={22} color="white" />
//             </View>
//           </View>
//           {/* header ends here */}

//           {/* <Text style={styles.header}>🎤 {room?.title || 'Audio Room'}</Text>
//           <Text style={styles.subHeader}>Room ID: {roomId}</Text>
//           <View style={styles.statusContainer}>
//             <Text>Room Status: {roomState}</Text>
//             <Text>Stream Status: {streamState}</Text>
//             <Text>Room Locked: {room?.isLocked ? 'Yes' : 'No'}</Text>

//           </View> */}

//           {/* <View style={styles.soundMeter}>
//             <View style={[styles.soundLevel, { width: `${soundLevel}%` }]} />
//           </View> */}
//            <View style={styles.lockToggleContainer}>
//               <Text style={styles.lockToggleText}>Lock Room</Text>
//               <Switch
//                 value={isLocked}
//                 onValueChange={handleToggleLock}
//                 trackColor={{ false: '#767577', true: '#007AFF' }}
//                 thumbColor={isLocked ? '#fff' : '#f4f3f4'}
//               />
//             </View>
//           <View style={styles.seatContainer}>{<SeatLayout
//             room={room}
//             roomId={roomId}
//             userId={userId}
//             changeSeat={changeSeat}
//             handleToggleMic={handleToggleMic}
//             handleKickUser={handleKickUser}
//             handleChangeSeat={handleChangeSeat}
//           />}</View>


//           <TouchableOpacity
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 100, padding: 8, width: 40, height: 40, position: 'relative' }}
//             onPress={() => setCohostUserModalVisible(true)}
//           >
//             <Text style={{ position: 'absolute', fontSize: 2, top: -2, right: -2, color: customColors.white, backgroundColor: 'rgba(0,0,0,0.5)' }}>
//               10
//             </Text>
//             <Image
//               source={require('../../../assets/images/liveaudio/options.png')}
//               style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 100, padding: 8, width: 40, height: 40, position: 'relative' }}
//             onPress={() => setCohostUserModalVisible(true)}
//           >
//             <Text style={{ position: 'absolute', fontSize: 10, bottom: -2, right: -2, color: customColors.white, backgroundColor: 'rgba(0,0,0,0.9)',zIndex:120 ,borderRadius:100,width:15,height:15,textAlign:'center',alignItems:'center',display:'flex',justifyContent:'center'}}>
//               10
//             </Text>
//             <Image
//               source={require('../../../assets/images/icon/microphone1.png')}
//               style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
//             />
//           </TouchableOpacity>

//           {isCohost && (
//             <TouchableOpacity style={styles.removeCohostButton} onPress={handleRemoveCohostStatus}>
//               <Text style={styles.removeCohostButtonText}>Remove Co-host Status</Text>
//             </TouchableOpacity>
//           )}

//           {/* user list modal */}
//           <UserListModal
//             isVisible={isUserModalVisible}
//             onClose={() => setUserModalVisible(false)}
//             users={room?.users || []}
//             roomId={roomId}
//             toggleChatMute={toggleChatMute}
//           />

//           {/* cohostListModal  */}
//           <CohostRequestModal
//             isVisible={isCohostUserModalVisible}
//             onClose={() => setCohostUserModalVisible(false)}
//             cohostRequests={room?.cohostRequests || []}
//             users={room?.users || []}
//             roomId={roomId}
//             acceptCohost={acceptCohost}
//             rejectCohost={kickCohostFromSeat}
//           />


//           {room?.hostId === userId && (
//             <TouchableOpacity
//               style={styles.backgroundButton}
//               onPress={() => setBackgroundModalVisible(true)}
//             >
//               <Text style={styles.backgroundButtonText}>Change Background</Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={styles.endButton}
//             onPress={() => {
//               deleteRoom(roomId);
//               navigation.goBack();
//             }}
//           >
//             <Text style={styles.endButtonText}>End Room</Text>
//           </TouchableOpacity>



//           <Modal
//             visible={seatChangeModalVisible}
//             transparent
//             animationType="slide"
//             onRequestClose={() => setSeatChangeModalVisible(false)}
//           >
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>Change Seat for {selectedUser?.userName}</Text>
//                 <FlatList
//                   data={availableSeats}
//                   renderItem={renderSeatOption}
//                   keyExtractor={(item) => item.toString()}
//                   numColumns={2}
//                   ListEmptyComponent={<Text style={styles.emptyText}>No available seats</Text>}
//                 />
//                 <TouchableOpacity
//                   style={styles.closeModalButton}
//                   onPress={() => setSeatChangeModalVisible(false)}
//                 >
//                   <Text style={styles.closeModalText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>

//           <Modal
//             visible={backgroundModalVisible}
//             transparent
//             animationType="slide"
//             onRequestClose={() => setBackgroundModalVisible(false)}
//           >
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>Change Room Background</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter image URL"
//                   value={newBackgroundImage}
//                   onChangeText={setNewBackgroundImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.confirmButton}
//                   onPress={handleChangeBackground}
//                 >
//                   <Text style={styles.confirmButtonText}>Apply</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.closeModalButton}
//                   onPress={() => setBackgroundModalVisible(false)}
//                 >
//                   <Text style={styles.closeModalText}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>

//           {room === null && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
//         </ScrollView>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     opacity: 0.9,
//   },
//   overlay: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#333',
//     textAlign: 'center',
//   },
//   subHeader: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   statusContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   soundMeter: {
//     height: 10,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 5,
//     marginVertical: 10,
//     overflow: 'hidden',
//   },
//   soundLevel: {
//     height: '100%',
//     backgroundColor: '#4CAF50',
//   },
//   seatContainer: {
//     marginVertical: 20,
//   },
//   seatRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   seat: {
//     width: 80,
//     height: 120,
//     borderRadius: 10,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 5,
//   },
//   occupiedSeat: {
//     backgroundColor: '#E6F2FF',
//     borderWidth: 1,
//     borderColor: '#007AFF',
//   },
//   userImage: {
//     zIndex: 1000,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginBottom: 5,
//   },
//   userName: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//   },
//   seatNumber: {
//     fontSize: 10,
//     color: '#666',
//     position: 'absolute',
//     bottom: 5,
//     left: 5,
//   },
//   micIndicator: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//     padding: 2,
//   },
//   micText: {
//     color: '#fff',
//     fontSize: 10,
//   },
//   cohostBadge: {
//     position: 'absolute',
//     top: 5,
//     left: 5,
//     backgroundColor: '#FFD700',
//     borderRadius: 5,
//     padding: 2,
//   },
//   hostBadge: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: '#FF4500',
//     borderRadius: 5,
//     padding: 2,
//   },
//   cohostText: {
//     fontSize: 8,
//     color: '#333',
//   },
//   hostText: {
//     fontSize: 8,
//     color: '#fff',
//   },
//   micStatus: {
//     fontSize: 10,
//     color: '#333',
//     position: 'absolute',
//     top: 25,
//     right: 5,
//   },
//   hostControls: {
//     position: 'absolute',
//     bottom: 20,
//     alignItems: 'center',
//   },
//   micToggleButton: {
//     backgroundColor: '#007AFF',
//     padding: 4,
//     borderRadius: 5,
//     marginBottom: 4,
//     zIndex: 1000,
//   },
//   kickButton: {
//     backgroundColor: '#FF3B30',
//     padding: 4,
//     borderRadius: 5,
//   },
//   controlButtonText: {
//     color: '#fff',
//     fontSize: 10,
//     textAlign: 'center',
//   },
//   emptySeatText: {
//     fontSize: 12,
//     color: '#888',
//   },
//   cohostButton: {
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   cohostButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   removeCohostButton: {
//     backgroundColor: '#FF9800',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   removeCohostButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   backgroundButton: {
//     backgroundColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   backgroundButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   endButton: {
//     backgroundColor: '#FF3B30',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   endButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     margin: 20,
//     borderRadius: 10,
//     padding: 20,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 10,
//   },
//   cohostRequestItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   cohostRequestText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   cohostRequestButtons: {
//     flexDirection: 'row',
//   },
//   acceptButton: {
//     backgroundColor: '#4CAF50',
//     padding: 8,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   rejectButton: {
//     backgroundColor: '#FF3B30',
//     padding: 8,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   loader: {
//     position: 'absolute',
//     top: '50%',
//     alignSelf: 'center',
//   },
//   seatOption: {
//     padding: 10,
//     margin: 5,
//     borderRadius: 20,
//     backgroundColor: '#007AFF',
//     alignItems: 'center',
//     width: '45%',
//   },
//   seatOptionDisabled: {
//     backgroundColor: '#ccc',
//   },
//   seatOptionText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   lockToggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   lockToggleText: {
//     fontSize: 16,
//     color: '#333',
//     marginRight: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     fontSize: 16,
//   },
//   confirmButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   closeModalButton: {
//     backgroundColor: '#FF3B30',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   closeModalText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default AudioRoom;
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
  Switch,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAudioRoom } from '@/context/AudioRoomSocketProvider';
import { useUser } from '@/context/UserProvider';
import ZegoExpressEngine, { ZegoScenario, ZegoUpdateType } from 'zego-express-engine-reactnative';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, PermissionsAndroid } from 'react-native';
import KeyCenter from '@/zegodata/KeyCenter';
import SeatLayout from '@/components/liveaudioroom/SeatLayout';
import ShowHostInfo from '@/components/liveaudioroom/ShowHostInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserListModal from '@/components/liveaudioroom/UserListModal';
import CohostRequestModal from '@/components/liveaudioroom/CohostRequestList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import customColors from '@/constants/styles';

interface User {
  id: string;
  userName: string;
  userProfile: string;
  level: number;
  specialId: string;
  seat?: number;
  mic?: boolean;
  isCohost?: boolean;
  isHost?: boolean;
  chatMute?: boolean;
}

const AudioRoom = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { userAllDetails } = useUser();
  const { room, socket, joinRoom, toggleMic, acceptCohost, kickCohostFromSeat, deleteRoom, changeSeat, toggleRoomLock, changeRoomBackground, removeCohostStatus, toggleChatMute } = useAudioRoom();

  const engineRef = useRef<ZegoExpressEngine | null>(null);
  const [roomState, setRoomState] = useState('disconnected');
  const [streamState, setStreamState] = useState('idle');
  const [soundLevel, setSoundLevel] = useState(0);
  const [streamList, setStreamList] = useState<any[]>([]);
  const [seatChangeModalVisible, setSeatChangeModalVisible] = useState(false);
  const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
  const [newBackgroundImage, setNewBackgroundImage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLocked, setIsLocked] = useState(room?.isLocked || false);
  const [isInitializing, setIsInitializing] = useState(true); // New state for initialization

  // Modal states
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [isCohostUserModalVisible, setCohostUserModalVisible] = useState(false);

  const roomId = params?.roomId || 'defaultRoomId';
  const userId = String(userAllDetails.liveId);
  const userName = String(userAllDetails.name);
  const streamId = `stream_${userId}`;

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsInitializing(true);
        // Join room
        await joinRoom({
          roomId,
          id: userId,
          userName,
          userProfile: userAllDetails.profileImage || '',
          level: userAllDetails.level || 0,
          specialId: userAllDetails.specialId || '',
        });

        // Initialize Zego engine
        const engine = await initEngine();
        if (!engine) throw new Error('Engine initialization failed');

        // Login to room
        await engine.loginRoom(roomId, { userID: userId, userName });
        await startBroadcasting()
      } catch (error) {
        console.error('Initialization failed:', error);
        Alert.alert('Error', 'Failed to initialize room. Please try again.');
      } finally {
        // Only set isInitializing to false when room is loaded and engine is ready
        if (room !== null && engineRef.current) {
          setIsInitializing(false);
        }
      }
    };

    initialize();

    return () => {
      cleanup();
    };
  }, [roomId, userId, userName, userAllDetails]);

  useEffect(() => {
    setIsLocked(room?.isLocked || false);
    // Update isInitializing when room becomes available
    if (room !== null && engineRef.current) {
      setIsInitializing(false);
    }
  }, [room]);

  const initEngine = async () => {
    try {
      const profile = {
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        scenario: ZegoScenario.HighQualityChatroom,
      };

      const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
      engineRef.current = engine;

      await engine.setAudioConfig({ bitrate: 48, channel: 1, codecID: 0 }, undefined);
      await engine.muteMicrophone(false);
      await engine.muteSpeaker(false);
      engine.startSoundLevelMonitor(undefined);
      setupEventHandlers(engine);
      return engine;
    } catch (error) {
      console.error('Engine initialization failed:', error);
      throw error;
    }
  };

  const setupEventHandlers = (engine: ZegoExpressEngine) => {
    engine.on('roomStateUpdate', (roomID, state) => {
      console.log('Room State Updated:', { roomID, state });
      setRoomState(state);
    });

    engine.on('roomStreamUpdate', async (roomID, updateType, newStreams) => {
      console.log('Room Stream Update:', { roomID, updateType, newStreams });
      if (updateType === ZegoUpdateType.Add) {
        console.log('Adding new streams:', newStreams.map((s) => s.streamID));
        setStreamList((prev) => [...prev, ...newStreams]);
        newStreams.forEach((stream: any) => {
          console.log('Playing stream:', stream.streamID);
          playStream(stream.streamID);
        });
      } else if (updateType === ZegoUpdateType.Delete) {
        console.log('Removing streams:', newStreams.map((s) => s.streamID));
        setStreamList((prev) =>
          prev.filter((s) => !newStreams.find((ns) => ns.streamID === s.streamID))
        );
      }
    });

    engine.on('publisherStateUpdate', (streamID, state) => setStreamState(state));
    engine.on('capturedSoundLevelUpdate', (soundLevel: number) => setSoundLevel(soundLevel));
  };

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.IOS.MICROPHONE);
        return result === RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const startBroadcasting = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) throw new Error('Microphone permission denied');

      if (!engineRef.current) throw new Error('Engine not initialized');

      await engineRef.current.startPublishingStream(streamId);
    } catch (error) {
      console.error('Broadcast failed:', error.message);
    }
  };

  const playStream = async (streamID: string) => {
    try {
      if (engineRef.current) {
        await engineRef.current.startPlayingStream(streamID);
      }
    } catch (err) {
      console.error('Error playing stream:', err);
    }
  };

  const cleanup = async () => {
    if (engineRef.current) {
      const engine = engineRef.current;
      engine.off('roomStateUpdate');
      engine.off('publisherStateUpdate');
      engine.off('capturedSoundLevelUpdate');
      try {
        await engine.logoutRoom(roomId);
        ZegoExpressEngine.instance().stopSoundLevelMonitor();
        ZegoExpressEngine.destroyEngine();
      } catch (e) {
        console.warn('Cleanup error:', e);
      }
      engineRef.current = null;
    }
  };

  const handleToggleLock = () => {
    const newLockState = !isLocked;
    toggleRoomLock(roomId, newLockState);
    setIsLocked(newLockState);
  };

  const handleChangeSeat = (user: User) => {
    setSelectedUser(user);
    setSeatChangeModalVisible(true);
  };

  const confirmSeatChange = (newSeat: number) => {
    if (selectedUser) {
      const isOccupied = room?.users.some((u) => u.seat === newSeat);
      if (isOccupied) {
        Alert.alert('Error', 'This seat is already occupied.');
        return;
      }
      changeSeat(roomId, selectedUser.id, newSeat);
      Alert.alert('Success', `Moved to Seat ${newSeat}`);
    }
    setSeatChangeModalVisible(false);
    setSelectedUser(null);
  };

  const handleChangeBackground = () => {
    if (!newBackgroundImage) {
      Alert.alert('Error', 'Please enter a valid image URL');
      return;
    }
    changeRoomBackground(roomId, newBackgroundImage);
    setNewBackgroundImage('');
    setBackgroundModalVisible(false);
    Alert.alert('Success', 'Room background changed');
  };

  const handleRemoveCohostStatus = async () => {
    try {
      await removeCohostStatus(roomId, userId);
      Alert.alert('Success', 'Co-host status removed');
      if (engineRef.current) {
        await engineRef.current.stopPublishingStream();
      }
    } catch (err) {
      console.error('Remove co-host status failed:', err);
      Alert.alert('Error', 'Failed to remove co-host status');
    }
  };

  const handleToggleMic = async (targetUserId: string, currentMicStatus: boolean) => {
    try {
      await toggleMic(roomId, targetUserId, !currentMicStatus);
      Alert.alert('Success', `Mic ${currentMicStatus ? 'muted' : 'unmuted'}`);
      if (targetUserId === userId && engineRef.current) {
        await engineRef.current.muteMicrophone(currentMicStatus);
      }
    } catch (err) {
      console.error('Toggle mic failed:', err);
      Alert.alert('Error', 'Failed to toggle mic');
    }
  };

  const handleKickUser = async (targetUserId: string) => {
    try {
      await kickCohostFromSeat(roomId, targetUserId);
      Alert.alert('Success', 'User kicked');
    } catch (err) {
      console.error('Kick user failed:', err);
      Alert.alert('Error', 'Failed to kick user');
    }
  };

  const renderSeatOption = ({ item }: { item: number }) => {
    const isOccupied = room?.users.some((u) => u.seat === item);
    return (
      <TouchableOpacity
        style={[styles.seatOption, isOccupied && styles.seatOptionDisabled]}
        onPress={() => !isOccupied && confirmSeatChange(item)}
        disabled={isOccupied}
      >
        <Text style={styles.seatOptionText}>Seat {item}</Text>
      </TouchableOpacity>
    );
  };

  const availableSeats = Array.from({ length: room?.seats || 8 }, (_, i) => i + 1);
  const isCohost = room?.users.find((u) => u.id === userId)?.isCohost && !room?.users.find((u) => u.id === userId)?.isHost;

  if (isInitializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Initializing Audio Room...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: room?.image || 'https://via.placeholder.com/300' }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.overlay}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ShowHostInfo />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setUserModalVisible(true)}
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
              >
                <Ionicons name="person" size={20} color="#fff" style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 16, color: 'white' }}>{room?.users.length || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Header ends here */}
          <View style={{}}>
            <Text>Room Status: {roomState}</Text>
            <Text>Stream Status: {streamState}</Text>
            <Text>Room Locked: {room?.isLocked ? 'Yes' : 'No'}</Text>

          </View>

          <View style={styles.lockToggleContainer}>
            <Text style={styles.lockToggleText}>Lock Room</Text>
            <Switch
              value={isLocked}
              onValueChange={handleToggleLock}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={isLocked ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.seatContainer}>
            <SeatLayout
              room={room}
              roomId={roomId}
              userId={userId}
              changeSeat={changeSeat}
              handleToggleMic={handleToggleMic}
              handleKickUser={handleKickUser}
              handleChangeSeat={handleChangeSeat}
            />
          </View>

          <View style={styles.actionButtonsContainer}>

            {/* options button  */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setCohostUserModalVisible(true)}
            >
              <Text style={styles.actionButtonBadge}>{room?.cohostRequests?.length || 0}</Text>
              <Image
                source={require('../../../assets/images/liveaudio/options.png')}
                style={styles.actionButtonImage}
              />
            </TouchableOpacity>

            {/* check cohost list button   */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleToggleMic(userId, room?.users.find((u) => u.id === userId)?.mic || false)}
            >
              <MaterialCommunityIcons
                name={room?.users.find((u) => u.id === userId)?.mic ? 'microphone' : 'microphone-off'}
                size={22}
                color="#fff"
              />

            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setCohostUserModalVisible(true)}
            >
              <Text style={styles.actionButtonBadge}>{room?.cohostRequests?.length || 0}</Text>
              <Image
                source={require('../../../assets/images/icon/microphone1.png')}
                style={styles.actionButtonImage}
              />
            </TouchableOpacity>
          </View>

          {isCohost && (
            <TouchableOpacity style={styles.removeCohostButton} onPress={handleRemoveCohostStatus}>
              <Text style={styles.removeCohostButtonText}>Remove Co-host Status</Text>
            </TouchableOpacity>
          )}

          {/* User list modal */}
          <UserListModal
            isVisible={isUserModalVisible}
            onClose={() => setUserModalVisible(false)}
            users={room?.users || []}
            roomId={roomId}
            toggleChatMute={toggleChatMute}
          />

          {/* Cohost request modal */}
          <CohostRequestModal
            isVisible={isCohostUserModalVisible}
            onClose={() => setCohostUserModalVisible(false)}
            cohostRequests={room?.cohostRequests || []}
            users={room?.users || []}
            roomId={roomId}
            acceptCohost={acceptCohost}
            rejectCohost={kickCohostFromSeat}
          />

          {room?.hostId === userId && (
            <TouchableOpacity
              style={styles.backgroundButton}
              onPress={() => setBackgroundModalVisible(true)}
            >
              <Text style={styles.backgroundButtonText}>Change Background</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.endButton}
            onPress={() => {
              deleteRoom(roomId);
              navigation.goBack();
            }}
          >
            <Text style={styles.endButtonText}>End Room</Text>
          </TouchableOpacity>

          <Modal
            visible={seatChangeModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setSeatChangeModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Seat for {selectedUser?.userName}</Text>
                <FlatList
                  data={availableSeats}
                  renderItem={renderSeatOption}
                  keyExtractor={(item) => item.toString()}
                  numColumns={2}
                  ListEmptyComponent={<Text style={styles.emptyText}>No available seats</Text>}
                />
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={() => setSeatChangeModalVisible(false)}
                >
                  <Text style={styles.closeModalText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={backgroundModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setBackgroundModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Room Background</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter image URL"
                  value={newBackgroundImage}
                  onChangeText={setNewBackgroundImage}
                />
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleChangeBackground}
                >
                  <Text style={styles.confirmButtonText}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={() => setBackgroundModalVisible(false)}
                >
                  <Text style={styles.closeModalText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.9,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  lockToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
  },
  lockToggleText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  seatContainer: {
    marginVertical: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 100,
    padding: 8,
    width: 40,
    height: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  actionButtonBadge: {
    position: 'absolute',
    fontSize: 10,
    bottom: -2,
    right: -2,
    color: customColors.white,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 100,
    width: 15,
    height: 15,
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 120,
  },
  removeCohostButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  removeCohostButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backgroundButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  backgroundButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  endButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  seatOption: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    width: '45%',
  },
  seatOptionDisabled: {
    backgroundColor: '#ccc',
  },
  seatOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeModalButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeModalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default AudioRoom;