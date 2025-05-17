
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
import axios from 'axios';
import { apiUrl } from '@/services/apiUrl';

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
  // const { params } = useRoute();
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

  const [draftRoomApiResponseDone, setDraftRoomApiResponse] = useState<boolean>();

  // Modal states
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [isCohostUserModalVisible, setCohostUserModalVisible] = useState(false);

  const roomId = `dozoLiveRoom8844${userAllDetails.liveId}`;
  const userId = String(userAllDetails.liveId);
  const userName = String(userAllDetails.name);
  const streamId = `stream_${userId}`;

  const [draftRoomInfo, setDraftRoomInfo] = useState({
    hostId: '',              // e.g., "101"
    hostName: '',            // e.g., "John"
    hostSpecialId: userAllDetails.specialId,
    hostImage: userAllDetails.profileImage,
    roomId: `dozoLiveRoom8844${userAllDetails.liveId}`,        // UUID generated client-side
    title: `UserAllDetails${userAllDetails.liveId}`,               // e.g., "John's Room"
    seats: 10,                // default value
    isLocked: false,         // room privacy
    image: '',               // optional image URL or base64
    tags: [] as string[],    // optional tags list
  });

  useEffect(() => {
    console.log(isInitializing)
  }, [isInitializing])

  useEffect(() => {
    console.log(room)
  }, [room])


  useEffect(() => {
    setDraftRoomApiResponse(true)
    const createRoom = async () => {
      try {
        const response = await axios.post(`${apiUrl}/create-draft-audio-room`, draftRoomInfo);
        if (response.data.roomId) {
          console.log('Room created with ID:', response.data.roomId);
        }
      } catch (err: any) {
        console.error('Room creation failed:', err.response?.data || err.message);
      }
    };
    createRoom()
    setDraftRoomApiResponse(false)
  }, [])


  useEffect(() => {
    if (draftRoomApiResponseDone) return
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
  }, [draftRoomApiResponseDone, roomId, userId, userName, userAllDetails]);

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
      source={{ uri: room?.roomBackground || 'https://via.placeholder.com/300' }}
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
// import { Platform } from 'react-native';
// import KeyCenter from '@/zegodata/KeyCenter';
// import SeatLayout from '@/components/liveaudioroom/SeatLayout';
// import ShowHostInfo from '@/components/liveaudioroom/ShowHostInfo';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import UserListModal from '@/components/liveaudioroom/UserListModal';
// import CohostRequestModal from '@/components/liveaudioroom/CohostRequestList';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import customColors from '@/constants/styles';
// import CreateAudioRoom from '@/components/liveaudioroom/CreateAudioRoom';

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

//   const engineRef = useRef(null);
//   const [roomState, setRoomState] = useState('disconnected');
//   const [streamState, setStreamState] = useState('idle');
//   const [soundLevel, setSoundLevel] = useState(0);
//   const [streamList, setStreamList] = useState([]);
//   const [seatChangeModalVisible, setSeatChangeModalVisible] = useState(false);
//   const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
//   const [newBackgroundImage, setNewBackgroundImage] = useState('');
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isLocked, setIsLocked] = useState(room?.isLocked || false);
//   const [isInitializing, setIsInitializing] = useState(true);
//   const [isCreatingRoom, setIsCreatingRoom] = useState(!params?.roomId);

//   const [isUserModalVisible, setUserModalVisible] = useState(false);
//   const [isCohostUserModalVisible, setCohostUserModalVisible] = useState(false);

//   const roomId = `dozoliveroomcode${userAllDetails.liveId}`;
//   const userId = String(userAllDetails.liveId);
//   const userName = String(userAllDetails.name);
//   const streamId = `stream_${userId}`;

//   useEffect(()=>{
// console.log(room)
//   },[room])

//   useEffect(() => {
//     if (!isCreatingRoom) {
//       initializeRoom();
//     }
//     return () => {
//       cleanup();
//     };
//   }, [isCreatingRoom]);

//   useEffect(() => {
//     setIsLocked(room?.isLocked || false);
//     if (room !== null && engineRef.current) {
//       setIsInitializing(false);
//     }
//   }, [room, engineRef.current]);

//   const initializeRoom = async () => {
//     try {
//       setIsInitializing(true);
//       console.log('Joining room with data:', {
//         roomId,
//         id: userId,
//         userName,
//         userProfile: userAllDetails.profileImage || '',
//         level: userAllDetails.level || 0,
//         specialId: userAllDetails.specialId || '',
//       });
//       await joinRoom({
//         roomId,
//         id: userId,
//         userName,
//         userProfile: userAllDetails.profileImage || '',
//         level: userAllDetails.level || 0,
//         specialId: userAllDetails.specialId || '',
//       });

//       if (!room) {
//         throw new Error('Room state is null after joining');
//       }

//       const engine = await initEngine();
//       if (!engine) throw new Error('Engine initialization failed');

//       console.log('Logging into room:', roomId, userId, userName);
//       await engine.loginRoom(roomId, { userID: userId, userName });
//       await startBroadcasting();
//     } catch (error) {
//       console.error('Initialization failed:', error);
//       Alert.alert('Error', `Failed to initialize room: ${error.message || 'Unknown error'}`);
//       setIsInitializing(false);
//     }
//   };

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
//       throw error;
//     }
//   };

//   const setupEventHandlers = (engine: any) => {
//     engine.on('roomStateUpdate', (roomID: string, state: string) => {
//       console.log('Room State Updated:', { roomID, state });
//       setRoomState(state);
//     });

//     engine.on('roomStreamUpdate', async (roomID: string, updateType: ZegoUpdateType, newStreams: any[]) => {
//       console.log('Room Stream Update:', { roomID, updateType, newStreams });
//       if (updateType === ZegoUpdateType.Add) {
//         setStreamList((prev) => [...prev, ...newStreams]);
//         newStreams.forEach((stream) => {
//           playStream(stream.streamID);
//         });
//       } else if (updateType === ZegoUpdateType.Delete) {
//         setStreamList((prev) =>
//           prev.filter((s) => !newStreams.find((ns) => ns.streamID === s.streamID))
//         );
//       }
//     });

//     engine.on('publisherStateUpdate', (streamID: string, state: string) => setStreamState(state));
//     engine.on('capturedSoundLevelUpdate', (soundLevel: number) => setSoundLevel(soundLevel));
//   };

//   const requestPermissions = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
//         if (granted !== RESULTS.GRANTED) {
//           throw new Error('Microphone permission denied');
//         }
//       } else {
//         const result = await request(PERMISSIONS.IOS.MICROPHONE);
//         if (result !== RESULTS.GRANTED) {
//           throw new Error('Microphone permission denied');
//         }
//       }
//       return true;
//     } catch (err) {
//       console.warn('Permission error:', err);
//       Alert.alert('Permission Denied', 'Microphone access is required to join the audio room.');
//       return false;
//     }
//   };

//   const startBroadcasting = async () => {
//     try {
//       const hasPermission = await requestPermissions();
//       if (!hasPermission) throw new Error('Microphone permission denied');

//       if (!engineRef.current) throw new Error('Engine not initialized');

//       await engineRef.current.startPublishingStream(streamId);
//     } catch (error) {
//       console.error('Broadcast failed:', error);
//       throw error;
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
//         await engineRef.current.stopPublishingStream();
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

//   const handleRoomCreated = (createdRoomId: string) => {
//     setIsCreatingRoom(false);
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

//   const availableSeats = Array.from({ length: room?.seats || 8 }, (_, i) => i + 1);
//   const isCohost = room?.users.find((u) => u.id === userId)?.isCohost && !room?.users.find((u) => u.id === userId)?.isHost;

//   if (isCreatingRoom) {
//     return <CreateAudioRoom onRoomCreated={handleRoomCreated} roomId={roomId} />;
//   }

//   if (isInitializing) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={styles.loadingText}>Initializing Audio Room...</Text>
//       </View>
//     );
//   }

//   if (!room) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Failed to load room. Please try again.</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={() => initializeRoom()}
//         >
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ImageBackground
//       source={{ uri: room?.image || 'https://via.placeholder.com/300' }}
//       style={styles.container}
//       imageStyle={styles.backgroundImage}
//     >
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView style={styles.overlay}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <ShowHostInfo />
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <TouchableOpacity
//                 onPress={() => setUserModalVisible(true)}
//                 style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
//               >
//                 <Ionicons name="person" size={20} color="#fff" style={{ marginRight: 5 }} />
//                 <Text style={{ fontSize: 16, color: 'white' }}>{room?.users.length || 0}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Ionicons name="close" size={22} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View>
//             <Text>Room Status: {roomState}</Text>
//             <Text>Stream Status: {streamState}</Text>
//             <Text>Room Locked: {room?.isLocked ? 'Yes' : 'No'}</Text>
//           </View>

//           <View style={styles.lockToggleContainer}>
//             <Text style={styles.lockToggleText}>Lock Room</Text>
//             <Switch
//               value={isLocked}
//               onValueChange={handleToggleLock}
//               trackColor={{ false: '#767577', true: '#007AFF' }}
//               thumbColor={isLocked ? '#fff' : '#f4f3f4'}
//             />
//           </View>

//           <View style={styles.seatContainer}>
//             <SeatLayout
//               room={room}
//               roomId={roomId}
//               userId={userId}
//               changeSeat={changeSeat}
//               handleToggleMic={handleToggleMic}
//               handleKickUser={handleKickUser}
//               handleChangeSeat={handleChangeSeat}
//             />
//           </View>

//           <View style={styles.actionButtonsContainer}>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => setCohostUserModalVisible(true)}
//             >
//               <Text style={styles.actionButtonBadge}>{room?.cohostRequests?.length || 0}</Text>
//               <Image
//                 source={require('../../../assets/images/liveaudio/options.png')}
//                 style={styles.actionButtonImage}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => handleToggleMic(userId, room?.users.find((u) => u.id === userId)?.mic || false)}
//             >
//               <MaterialCommunityIcons
//                 name={room?.users.find((u) => u.id === userId)?.mic ? 'microphone' : 'microphone-off'}
//                 size={22}
//                 color="#fff"
//               />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => setCohostUserModalVisible(true)}
//             >
//               <Text style={styles.actionButtonBadge}>{room?.cohostRequests?.length || 0}</Text>
//               <Image
//                 source={require('../../../assets/images/icon/microphone1.png')}
//                 style={styles.actionButtonImage}
//               />
//             </TouchableOpacity>
//           </View>

//           {isCohost && (
//             <TouchableOpacity style={styles.removeCohostButton} onPress={handleRemoveCohostStatus}>
//               <Text style={styles.removeCohostButtonText}>Remove Co-host Status</Text>
//             </TouchableOpacity>
//           )}

//           <UserListModal
//             isVisible={isUserModalVisible}
//             onClose={() => setUserModalVisible(false)}
//             users={room?.users || []}
//             roomId={roomId}
//             toggleChatMute={toggleChatMute}
//           />

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
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.8)',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: '500',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.8)',
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius: 10,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   lockToggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     padding: 10,
//     borderRadius: 8,
//   },
//   lockToggleText: {
//     fontSize: 16,
//     color: '#fff',
//     marginRight: 10,
//   },
//   seatContainer: {
//     marginVertical: 20,
//   },
//   actionButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 15,
//     marginVertical: 10,
//   },
//   actionButton: {
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 100,
//     padding: 8,
//     width: 40,
//     height: 40,
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   actionButtonImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   actionButtonBadge: {
//     position: 'absolute',
//     fontSize: 10,
//     bottom: -2,
//     right: -2,
//     color: customColors.white,
//     backgroundColor: 'rgba(0,0,0,0.9)',
//     borderRadius: 100,
//     width: 15,
//     height: 15,
//     textAlign: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     zIndex: 120,
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
//   emptyText: {
//     fontSize: 16,
//     color: '#888',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
// });

// export default AudioRoom;