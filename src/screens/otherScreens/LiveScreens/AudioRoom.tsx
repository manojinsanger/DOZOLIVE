// import { useUser } from '@/context/UserProvider';
// import KeyCenter from '@/zegodata/KeyCenter';
// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
// import ZegoExpressEngine, { ZegoScenario, ZegoUpdateType } from 'zego-express-engine-reactnative';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useAudioRoom } from '@/context/AudioRoomSocketProvider';

// const AudioRoom = () => {
//   const navigation = useNavigation();
//   const { params } = useRoute();

//   useEffect(() => {
//     console.log('AudioRoom params:', params, params.roomId);
//   }, [params])

//   const { userAllDetails } = useUser();
//   const engineRef = useRef<ZegoExpressEngine | null>(null);
//   const [roomState, setRoomState] = useState('disconnected');
//   const [streamState, setStreamState] = useState('idle');
//   const [soundLevel, setSoundLevel] = useState(0); // State for sound level
//   const [streamList, setStreamList] = useState<any[]>([]);
//   const roomID = params?.roomId || 'defaultRoomId';
//   const userID = String(userAllDetails.liveId);
//   const userName = String(userAllDetails.name);
//   const streamID = `stream_${userID}`;



//   const { room } = useAudioRoom()
//   // console.log(room, 'room from context');
// // 


//   const initEngine = async () => {
//     try {
//       const profile = {
//         appID: KeyCenter.appID,
//         appSign: KeyCenter.appSign,
//         scenario: ZegoScenario.HighQualityChatroom,
//       };

//       const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
//       engineRef.current = engine;

//       await engine.setAudioConfig({
//         bitrate: 48,
//         channel: 1,
//         codecID: 0,
//       }, undefined);

//       await engine.muteMicrophone(false);
//       await engine.muteSpeaker(false);
//       // Start sound level monitoring
//       engine.startSoundLevelMonitor();

//       setupEventHandlers(engine);
//       return engine;
//     } catch (error) {
//       console.error('Engine initialization failed:', error);
//     }
//   };

//   const setupEventHandlers = (engine: ZegoExpressEngine) => {
//     engine.on('roomStateUpdate', (roomID, state) => {
//       console.log('Room state update:', state);
//       setRoomState(state);
//     });


//     engine.on('roomStreamUpdate', async (roomID, updateType, newStreams) => {
//       console.log('Stream update:', updateType, newStreams, roomID);

//       if (updateType === 0) {
//         setStreamList(prev => [...prev, ...newStreams]);
//         newStreams.forEach((stream: any) => {
//           console.log('Playing stream:', stream.streamID);
//           playStream(stream.streamID);
//         });
//       }

//       if (updateType === 1) {
//         setStreamList(prev => prev.filter(s => !newStreams.find(ns => ns.streamID === s.streamID)));
//       }
//     });

//     engine.on('publisherStateUpdate', (streamID, state) => {
//       console.log('Publisher state update:', state);
//       setStreamState(state);
//     });

//     // Listen for captured sound level updates
//     engine.on('remoteSoundLevelUpdate', (soundLevels) => {
//       console.log('remoteSoundLevelUpdate sound level:', soundLevels);
//       // setSoundLevel(soundLevel); // Update sound level state
//     });
//     engine.on('capturedSoundLevelUpdate', (soundLevel: number) => {
//       // console.log('Captured sound level:', soundLevel);
//       setSoundLevel(soundLevel); // Update sound level state
//     });
//   };

//   const requestPermissions = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//           {
//             title: 'Microphone Permission',
//             message: 'App needs access to your microphone',
//             buttonPositive: 'OK',
//           }
//         );
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
//       if (!hasPermission) {
//         throw new Error('Microphone permission denied');
//       }

//       const engine = await initEngine();
//       if (!engine) throw new Error('Engine not initialized');

//       await engine.loginRoom(roomID, { userID, userName });
//       await engine.startPublishingStream(streamID);
//     } catch (error) {
//       console.error('Broadcast failed:', error.message);
//     }
//   };
//   // --- Play Audio Stream ---
//   const playStream = async (streamID: string) => {
//     try {
//       console.log('Attempting to play stream:', streamID);
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
//       engine.off('capturedSoundLevelUpdate'); // Remove sound level listener

//       // try {
//       //   await engine.stopPublishingStream(Number(streamID));
//       // } catch (e) {
//       //   console.warn('stopPublishingStream error:', e);
//       // }

//       try {
//         await engine.logoutRoom(roomID);
//       } catch (e) {
//         console.warn('logoutRoom error:', e);
//       }

//       try {
//         ZegoExpressEngine.instance().stopSoundLevelMonitor();
//         ZegoExpressEngine.destroyEngine();
//       } catch (e) {
//         console.warn('cleanup error:', e);
//       }

//       engineRef.current = null;
//     }
//   };

//   useEffect(() => {
//     startBroadcasting();
//     return () => {
//       cleanup();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🎤 Host Room: {roomID}</Text>

//       <View style={styles.statusContainer}>
//         <Text>Room Status: {roomState}</Text>
//         <Text>Stream Status: {streamState}</Text>
//       </View>

//       <View>
//         {
//           room?.users.map((user, index) => (
//             <View>
//               <Text style={{ color: 'black', fontSize: 20 }} key={index}>
//                 {user.id} - {user.userName}
//               </Text>
//             </View>
//           ))
//         }
//       </View>

//       <View style={styles.soundMeter}>
//         <View
//           style={[
//             styles.soundLevel,
//             { width: `${soundLevel}%` }, // Dynamic width based on sound level
//           ]}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     marginTop: 50,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   statusContainer: {
//     marginBottom: 20,
//   },
//   soundMeter: {
//     height: 20,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//     marginBottom: 10,
//     overflow: 'hidden',
//   },
//   soundLevel: {
//     height: '100%',
//     backgroundColor: '#4CAF50',
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
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAudioRoom } from '@/context/AudioRoomSocketProvider';
import { useUser } from '@/context/UserProvider';
import ZegoExpressEngine, { ZegoScenario, ZegoUpdateType } from 'zego-express-engine-reactnative';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import KeyCenter from '@/zegodata/KeyCenter';

interface User {
  id: string;
  userName: string;
  userProfile: string;
  level: number;
  specialId: string;
  seat?: number;
  micOn?: boolean;
  isCohost?: boolean;
}

const AudioRoom = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { userAllDetails } = useUser();
  const { room, socket, joinRoom, toggleMic, acceptCohost, kickUser, deleteRoom, changeSeat } = useAudioRoom();

  const engineRef = useRef<ZegoExpressEngine | null>(null);
  const [roomState, setRoomState] = useState('disconnected');
  const [streamState, setStreamState] = useState('idle');
  const [soundLevel, setSoundLevel] = useState(0);
  const [streamList, setStreamList] = useState<any[]>([]);
  const [cohostModalVisible, setCohostModalVisible] = useState(false);
  const [seatChangeModalVisible, setSeatChangeModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const roomId = params?.roomId || 'defaultRoomId';
  const userId = String(userAllDetails.liveId);
  const userName = String(userAllDetails.name);
  const streamId = `stream_${userId}`;

  useEffect(() => {
    const initialize = async () => {
      await startBroadcasting();
      joinRoom({
        roomId,
        id: userId,
        userName,
        userProfile: userAllDetails.profileImage || '',
        level: userAllDetails.level || 0,
        specialId: userAllDetails.specialId || '',
      });
    };
    initialize();
    return () => {
      cleanup();
    };
  }, []);

  const initEngine = async () => {
    try {
      const profile = {
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        scenario: ZegoScenario.HighQualityChatroom,
      };

      const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
      engineRef.current = engine;

      await engine.setAudioConfig({ bitrate: 48, channel: 1, codecID: 0 });
      await engine.muteMicrophone(false);
      await engine.muteSpeaker(false);
      engine.startSoundLevelMonitor();
      setupEventHandlers(engine);
      return engine;
    } catch (error) {
      console.error('Engine initialization failed:', error);
    }
  };

  const setupEventHandlers = (engine: ZegoExpressEngine) => {
    engine.on('roomStateUpdate', (roomID, state) => setRoomState(state));
    engine.on('roomStreamUpdate', async (roomID, updateType, newStreams) => {
      if (updateType === ZegoUpdateType.Add) {
        setStreamList((prev) => [...prev, ...newStreams]);
        newStreams.forEach((stream: any) => playStream(stream.streamID));
      } else if (updateType === ZegoUpdateType.Delete) {
        setStreamList((prev) => prev.filter((s) => !newStreams.find((ns) => ns.streamID === s.streamID)));
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

      const engine = await initEngine();
      if (!engine) throw new Error('Engine not initialized');

      await engine.loginRoom(roomId, { userID: userId, userName });
      await engine.startPublishingStream(streamId);
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

  const handleChangeSeat = (user: User) => {
    setSelectedUser(user);
    setSeatChangeModalVisible(true);
  };

  const confirmSeatChange = (newSeat: number) => {
    if (selectedUser) {
      changeSeat(roomId, selectedUser.id, newSeat);
    }
    setSeatChangeModalVisible(false);
    setSelectedUser(null);
  };

  const renderSeat = (user: User | null, seatIndex: number) => {
    const isOccupied = !!user;
    return (
      <TouchableOpacity
        style={[styles.seat, isOccupied && styles.occupiedSeat]}
        onPress={() => isOccupied && handleChangeSeat(user!)}
        disabled={!isOccupied}
      >
        {isOccupied ? (
          <>
            <Image source={{ uri: user!.userProfile || 'https://via.placeholder.com/50' }} style={styles.userImage} />
            <Text style={styles.userName}>{user!.userName}</Text>
            {user!.micOn && (
              <View style={styles.micIndicator}>
                <Text style={styles.micText}>🎤</Text>
              </View>
            )}
            {user!.isCohost && (
              <View style={styles.cohostBadge}>
                <Text style={styles.cohostText}>Co-host</Text>
              </View>
            )}
            <Text style={styles.seatNumber}>Seat {user!.seat}</Text>
          </>
        ) : (
          <Text style={styles.emptySeatText}>Seat {seatIndex + 1}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderSeatRows = () => {
    const seats = room?.seats || 8;
    const users = room?.users || [];
    const seatAssignments = Array(seats).fill(null).map((_, index) => {
      return users.find((u) => u.seat === index + 1) || null;
    });

    const rows: JSX.Element[] = [];
    // First row: 2 seats
    rows.push(
      <View key="row-0" style={styles.seatRow}>
        {seatAssignments.slice(0, 2).map((user, index) => renderSeat(user, index))}
      </View>
    );

    // Subsequent rows: 4 seats each
    for (let i = 2; i < seats; i += 4) {
      rows.push(
        <View key={`row-${i}`} style={styles.seatRow}>
          {seatAssignments.slice(i, i + 4).map((user, index) => renderSeat(user, i + index))}
        </View>
      );
    }

    return rows;
  };

  const renderCohostRequest = ({ item }: { item: string }) => {
    const user = room?.users.find((u) => u.id === item);
    if (!user) return null;
    return (
      <View style={styles.cohostRequestItem}>
        <Text style={styles.cohostRequestText}>{user.userName} wants to be a co-host</Text>
        <View style={styles.cohostRequestButtons}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => acceptCohost(roomId, user.id)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => kickUser(roomId, user.id)}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎤 {room?.title || 'Audio Room'}</Text>
      <Text style={styles.subHeader}>Room ID: {roomId}</Text>
      <View style={styles.statusContainer}>
        <Text>Room Status: {roomState}</Text>
        <Text>Stream Status: {streamState}</Text>
      </View>

      <View style={styles.soundMeter}>
        <View style={[styles.soundLevel, { width: `${soundLevel}%` }]} />
      </View>

      <View style={styles.seatContainer}>{renderSeatRows()}</View>

      <TouchableOpacity
        style={styles.cohostButton}
        onPress={() => setCohostModalVisible(true)}
      >
        <Text style={styles.cohostButtonText}>Cohost Requests ({room?.cohostRequests?.length || 0})</Text>
      </TouchableOpacity>

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
        visible={cohostModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCohostModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cohost Requests</Text>
            <FlatList
              data={room?.cohostRequests || []}
              renderItem={renderCohostRequest}
              keyExtractor={(item) => item}
              ListEmptyComponent={<Text style={styles.emptyText}>No cohost requests</Text>}
            />
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setCohostModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

      {room === null && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  soundMeter: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  soundLevel: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  seatContainer: {
    marginVertical: 20,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  seat: {
    width: 80,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  occupiedSeat: {
    backgroundColor: '#E6F2FF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  seatNumber: {
    fontSize: 10,
    color: '#666',
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  micIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 2,
  },
  micText: {
    color: '#fff',
    fontSize: 10,
  },
  cohostBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    padding: 2,
  },
  cohostText: {
    fontSize: 8,
    color: '#333',
  },
  emptySeatText: {
    fontSize: 12,
    color: '#888',
  },
  cohostButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  cohostButtonText: {
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
  cohostRequestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cohostRequestText: {
    fontSize: 16,
    color: '#333',
  },
  cohostRequestButtons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
  },
  seatOption: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
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
});

export default AudioRoom;