

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import ZegoExpressEngine, { ZegoScenario, ZegoUpdateType } from 'zego-express-engine-reactnative';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@/context/UserProvider';
import { useAudioRoom } from '@/context/AudioRoomSocketProvider';
import KeyCenter from '@/zegodata/KeyCenter';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AudienceSeatLayout from '@/components/liveaudioroom/AudienceSeatLayout';


const AudienceAudioRoom = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { userAllDetails } = useUser();
  const { room, socket, joinRoom, leaveRoom, requestCohost, changeSeat, assignCohostAndSeat, removeCohostStatus, toggleMic } = useAudioRoom();

  const roomID = params?.roomDetails?.roomId || 'defaultRoomId';
  const userId = String(userAllDetails.liveId);
  const userName = userAllDetails.name || 'dozolive';
  const engineRef = useRef<ZegoExpressEngine | null>(null);
  const [roomState, setRoomState] = useState('DISCONNECTED');
  const [streamList, setStreamList] = useState<any[]>([]);
  const [activeStream, setActiveStream] = useState<string | null>(null);
  const [seatChangeModalVisible, setSeatChangeModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    console.log('Room data:', room);
    const initialize = async () => {
      await joinZegoRoom();
      joinRoom({
        roomId: roomID,
        id: userId,
        userName,
        userProfile: userAllDetails.profileImage || '',
        level: userAllDetails.level || 1,
        specialId: userAllDetails.specialId || '',
      });
    };
    initialize();
    return () => {
      leaveRoom(roomID, userId);
      cleanup();
    };
  }, []);

  useEffect(() => {
    socket?.on('kickedFromRoom', ({ roomId }) => {
      if (roomID === roomId) {
        Alert.alert('Kicked', 'You have been kicked from the room.');
        navigation.goBack();
      }
    });

    return () => {
      socket?.off('kickedFromRoom');
    };
  }, [socket]);

  useEffect(() => {
    const currentUser = room?.users.find((u) => u.id === userId);
    if (currentUser?.isCohost) {
      console.log('publishing stream');
      startPublishingStream();
    } else {
      if (engineRef.current) {
        engineRef.current.stopPublishingStream();
      }
    }
  }, [room?.users.find((u) => u.id === userId), userId]);

  const startPublishingStream = async () => {
    try {
      const engine = engineRef.current;
      if (!engine) return;
      await engine.startPublishingStream(`stream_${userId}`);
    } catch (err) {
      console.error('Error starting stream:', err);
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        return granted === RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.IOS.MICROPHONE);
        return result === RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  const initEngine = async () => {
    if (engineRef.current) return engineRef.current;
    try {
      const profile = {
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        scenario: ZegoScenario.HighQualityChatroom,
      };
      const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
      engineRef.current = engine;

      await engine.setAudioConfig({ bitrate: 48, channel: 1, codecID: 0 });
      await engine.muteSpeaker(false);
      setupEventHandlers(engine);
      return engine;
    } catch (err) {
      console.error('Engine initialization failed:', err);
      return null;
    }
  };

  const setupEventHandlers = (engine: ZegoExpressEngine) => {
    engine.on('roomStateUpdate', (roomID, state) => {
      console.log('Room State:', state);
      setRoomState(state);
    });

    engine.on('roomStreamUpdate', async (roomID, updateType, newStreams) => {
      console.log('Stream update:', updateType, newStreams, roomID);
      if (updateType === ZegoUpdateType.Add) {
        setStreamList((prev) => [...prev, ...newStreams]);
        newStreams.forEach((stream: any) => {
          console.log('Playing stream:', stream.streamID);
          playStream(stream.streamID);
        });
      } else if (updateType === ZegoUpdateType.Delete) {
        setStreamList((prev) => prev.filter((s) => !newStreams.find((ns) => ns.streamID === s.streamID)));
      }
    });

    engine.on('playerStateUpdate', (streamID, state, errorCode) => {
      console.log(`Player state: ${streamID}, ${state}, error: ${errorCode}`);
      if (state === 'PLAYING') {
        setActiveStream(streamID);
      }
    });
  };

  const joinZegoRoom = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert('Error', 'Microphone permission denied');
        return;
      }
      const engine = await initEngine();
      if (!engine) return;
      await engine.loginRoom(roomID, { userID: userId, userName });
      console.log('Joined room:', roomID);
    } catch (err) {
      console.error('Join room error:', err);
      Alert.alert('Error', 'Failed to join room');
    }
  };

  const playStream = async (streamID: string) => {
    try {
      if (engineRef.current) {
        await engineRef.current.startPlayingStream(streamID);
        console.log('Playing stream:', streamID);
      }
    } catch (err) {
      console.error('Error playing stream:', err);
    }
  };

  const cleanup = async () => {
    try {
      if (engineRef.current) {
        if (activeStream) {
          await engineRef.current.stopPlayingStream(activeStream);
        }
        await engineRef.current.logoutRoom(roomID);
        ZegoExpressEngine.destroyEngine();
        engineRef.current = null;
      }
    } catch (err) {
      console.warn('Cleanup error:', err);
    }
  };

  const RequestCohost = async () => {
    try {
      await requestCohost(roomID, userId);
      Alert.alert('Success', 'Co-host request sent');
    } catch (err) {
      console.error('Co-host request failed:', err);
      Alert.alert('Error', 'Failed to send co-host request');
    }
  };

  const handleRemoveCohostStatus = async () => {
    try {
      await removeCohostStatus(roomID, userId);
      Alert.alert('Success', 'Co-host status removed');
      if (engineRef.current) {
        await engineRef.current.stopPublishingStream();
      }
    } catch (err) {
      console.error('Remove co-host status failed:', err);
      Alert.alert('Error', 'Failed to remove co-host status');
    }
  };

  const handleChangeSeat = (user: any) => {
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
      changeSeat(roomID, selectedUser.id, newSeat);
      Alert.alert('Success', `Moved to Seat ${newSeat}`);
    }
    setSeatChangeModalVisible(false);
    setSelectedUser(null);
  };

  const handleToggleMic = async (targetUserId: string, currentMicStatus: boolean) => {
    try {
      await toggleMic(roomID, targetUserId, !currentMicStatus);
      Alert.alert('Success', `Mic ${currentMicStatus ? 'muted' : 'unmuted'}`);
      if (targetUserId === userId && engineRef.current) {
        await engineRef.current.muteMicrophone(currentMicStatus);
      }
    } catch (err) {
      console.error('Toggle mic failed:', err);
      Alert.alert('Error', 'Failed to toggle mic');
    }
  };

  useEffect(() => {
    const currentUser = room?.users.find((u) => u.id === userId);

    if (!currentUser || !engineRef.current) return;

    const shouldPublish = currentUser.isCohost;
    const micOn = currentUser.mic;

    if (shouldPublish) {
      engineRef.current.muteMicrophone(!micOn);
    } else {
      engineRef.current.muteMicrophone(true);
    }
  }, [userId, room?.users.find((u) => u.id === userId)?.mic]);

  const handleSeatPress = (seatIndex: number) => {
    const targetSeat = seatIndex + 1;
    const isSeatOccupied = room?.users.some((u) => u.seat === targetSeat);
    const currentUser = room?.users.find((u) => u.id === userId);

    if (!currentUser) {
      Alert.alert('Error', 'User not found in room');
      return;
    }

    if (currentUser.isCohost || currentUser.isHost) {
      if (isSeatOccupied) {
        const user = room?.users.find((u) => u.seat === targetSeat);
        if (user) {
          handleChangeSeat(user);
        }
      } else {
        changeSeat(roomID, userId, targetSeat);
        Alert.alert('Success', `Moved to Seat ${targetSeat}`);
      }
    } else if (!room?.isLocked) {
      if (isSeatOccupied) {
        Alert.alert('Error', 'This seat is already occupied.');
      } else {
        assignCohostAndSeat(roomID, userId, targetSeat);
        Alert.alert('Success', `Assigned as Co-host on Seat ${targetSeat}`);
      }
    } else {
      Alert.alert('Permission Denied', 'Room is locked. Request co-host status to take a seat.');
    }
  };

  const renderUser = ({ item }: { item: any }) => (
    <View style={styles.userItem}>
      <Image
        source={{ uri: item.userProfile || 'https://via.placeholder.com/30' }}
        style={styles.userListImage}
      />
      <Text style={styles.userListText}>
        {item.userName} {item.isHost ? '(Host)' : item.isCohost ? '(Co-host)' : ''}
      </Text>
    </View>
  );

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

  return (
    <ImageBackground
      source={{ uri: room?.image || 'https://via.placeholder.com/300' }}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
     
      <View style={styles.overlay}>
        <Text style={styles.header}>🎧 {room?.title || 'Audio Room'}</Text>
        <Text style={styles.subHeader}>Room ID: {roomID}</Text>
        <View style={styles.statusContainer}>
          <Text>Room Status: {roomState}</Text>
          <Text>Active Stream: {activeStream || 'None'}</Text>
          <Text>Room Locked: {room?.isLocked ? 'Yes' : 'No'}</Text>
        </View>
        <Text style={styles.instruction}>
          {streamList.length > 0 ? '🔊 Listening to audio' : '⏳ Waiting for audio to start...'}
        </Text>

        <AudienceSeatLayout
          room={
            room
              ? { ...room, seats: room.seats ?? 8 }
              : null
          }
          handleSeatPress={handleSeatPress}
        />

        {room?.users.find((u) => u.id === userId)?.isCohost && (
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
        )}

        <View style={styles.userListContainer}>
          <Text style={styles.userListTitle}>Audience ({room?.users?.length || 0})</Text>
          <FlatList
            data={room?.users}
            renderItem={renderUser}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>No audience members</Text>}
          />
        </View>

        <TouchableOpacity style={styles.cohostButton} onPress={RequestCohost}>
          <Text style={styles.cohostButtonText}>Request to Become Co-host</Text>
        </TouchableOpacity>

        {isCohost && (
          <TouchableOpacity style={styles.removeCohostButton} onPress={handleRemoveCohostStatus}>
            <Text style={styles.removeCohostButtonText}>Remove Co-host Status</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.leaveButton}
          onPress={() => {
            leaveRoom(roomID, userId);
            navigation.goBack();
          }}
        >
          <Text style={styles.leaveButtonText}>Leave Room</Text>
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

        {room === null && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  backgroundImage: {
    opacity: 0.9,
  },
  overlay: {
    flex: 1,
    padding: 20,
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
  instruction: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userListContainer: {
    flex: 1,
    marginVertical: 10,
  },
  userListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  userListImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userListText: {
    fontSize: 16,
    color: '#333',
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
  leaveButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  leaveButtonText: {
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
});

export default AudienceAudioRoom;