import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ZegoExpressEngine, { ZegoScenario, ZegoUpdateType } from 'zego-express-engine-reactnative';
import { apiUrl } from '@/services/apiUrl';
import { useAudioRoom } from '@/context/AudioRoomSocketProvider';
import { useUser } from '@/context/UserProvider';
import CohostRequestModal from '@/components/liveaudioroom/CohostRequestList';
import CreateAudioRoom from '@/components/liveaudioroom/CreateAudioRoom';
import KeyCenter from '@/zegodata/KeyCenter';
import SeatLayout from '@/components/liveaudioroom/SeatLayout';
import ShowHostInfo from '@/components/liveaudioroom/ShowHostInfo';
import UserListModal from '@/components/liveaudioroom/UserListModal';
import customColors from '@/constants/styles';
import { redirect } from '@/utils/navigationService';

// Type definitions
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

interface RoomData {
  title: string;
  seats: number;
  isLocked: boolean;
  hostId: string;
  hostName: string;
  hostProfile: string;
  hostLevel: number;
  image: string;
  tags: string[];
  createdAt: string;
  specialId: string;
  kickedUsers?: { id: string; kickedAt: string }[];
  totalGifts?: number;
  maxUsers?: number;
  users: User[];
  cohostRequests: string[];
  roomBackground?: string;
}

interface UserDetails {
  liveId: string;
  name: string;
  profileImage: string;
  level: number;
  specialId: string;
}

interface ZegoStream {
  streamID: string;
  user: { userID: string; userName: string };
}

const AudioRoom: React.FC = () => {
  // Navigation and context hooks
  const navigation = useNavigation();
  const { userAllDetails } = useUser();
  const {
    room: rawRoom,
    socket,
    joinRoom,
    leaveRoom,
    toggleMic,
    acceptCohost,
    kickCohostFromSeat,
    changeSeat,
    toggleRoomLock,
    changeRoomBackground,
    removeCohostStatus,
    toggleChatMute,
  } = useAudioRoom();

  // State for Zego engine and room management
  const engineRef = useRef<ZegoExpressEngine | null>(null);
  const [roomState, setRoomState] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [streamState, setStreamState] = useState<'idle' | 'publishing' | 'published'>('idle');
  const [soundLevel, setSoundLevel] = useState(0);
  const [streamList, setStreamList] = useState<ZegoStream[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [draftRoomApiResponseDone, setDraftRoomApiResponse] = useState<boolean>(false);
  const isInitializingRef = useRef(false);

  // State for modals and UI interactions
  const [seatChangeModalVisible, setSeatChangeModalVisible] = useState(false);
  const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
  const [newBackgroundImage, setNewBackgroundImage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isExitModalVisible, setExitModalVisible] = useState(false);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [isCohostUserModalVisible, setCohostUserModalVisible] = useState(false);
  const [createLiveRoomApiHitted, setCreateLiveRoomApiHitted] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createRoomLoading, setCreateRoomLoading] = useState<boolean>(false)

  // State for room creation form
  const [roomTitle, setRoomTitle] = useState('');
  const [selectedSeats, setSelectedSeats] = useState(10);
  const [isRoomLocked, setIsRoomLocked] = useState(false);

  // Memoized user details to prevent unnecessary re-renders
  const memoizedUserDetails = useMemo(
    () => ({
      liveId: userAllDetails.liveId,
      name: userAllDetails.name,
      profileImage: userAllDetails.profileImage,
      level: userAllDetails.level,
      specialId: userAllDetails.specialId,
    }),
    [userAllDetails.liveId, userAllDetails.name, userAllDetails.profileImage, userAllDetails.level, userAllDetails.specialId]
  );

  // Room and user identifiers
  const roomId = `dozoLiveRoom8844${memoizedUserDetails.liveId}`;
  const userId = String(memoizedUserDetails.liveId);
  const userName = String(memoizedUserDetails.name);
  const streamId = `stream_${userId}`;

  // Memoized draft room info for API call
  const draftRoomInfo = useMemo(
    () => ({
      hostId: userId,
      hostName: userName,
      hostSpecialId: memoizedUserDetails.specialId,
      hostImage: memoizedUserDetails.profileImage,
      roomId: `dozoLiveRoom8844${memoizedUserDetails.liveId}`,
      title: `UserAllDetails${memoizedUserDetails.liveId}`,
      seats: 10,
      isLocked: false,
      image: '',
      tags: [] as string[],
    }),
    [userId, userName, memoizedUserDetails]
  );

  // Prevent back navigation and show exit confirmation
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      setExitModalVisible(true);
    });
    return () => unsubscribe();
  }, [navigation]);

  // Create draft room via API
  useEffect(() => {
    const createRoom = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/live/create-draft-audio-room`,
          draftRoomInfo,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        setDraftRoomApiResponse(true);
      } catch (err: any) {
        setErrorMessage('Failed to create room. Please try again.');
        setDraftRoomApiResponse(false);
      }
    };
    if (!draftRoomApiResponseDone) {
      createRoom();
    }
  }, [draftRoomInfo, draftRoomApiResponseDone]);

  // Initialize Zego engine and join room
  useEffect(() => {
    if (!draftRoomApiResponseDone) return;

    const initialize = async () => {
      try {
        isInitializingRef.current = true;
        setIsInitializing(true);
        await joinRoom({
          roomId,
          id: userId,
          userName,
          userProfile: memoizedUserDetails.profileImage || '',
          level: memoizedUserDetails.level || 0,
          specialId: memoizedUserDetails.specialId || '',
        });
        const engine = await initEngine();
        if (!engine) throw new Error('Engine initialization failed');
        await engine.loginRoom(roomId, { userID: userId, userName });
        await startBroadcasting();
      } catch (error) {
        setErrorMessage('Failed to initialize room. Please try again.');
      } finally {
        isInitializingRef.current = false;
        setIsInitializing(false);
      }
    };

    initialize();

    return () => {
      if (!isInitializingRef.current) {
        cleanup();
      }
    };
  }, [draftRoomApiResponseDone]);

  // Debounce room updates to prevent excessive re-renders
  const [room, setRoom] = useState<RoomData | null>(rawRoom);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRoom(rawRoom);
    }, 500);
    return () => clearTimeout(timer);
  }, [rawRoom]);

  // Initialize Zego engine with configuration
  const initEngine = async () => {
    try {
      const profile = {
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        scenario: ZegoScenario.HighQualityChatroom,
      };
      const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
      if (!engine) return null;

      engineRef.current = engine;
      await engine.setAudioConfig({ bitrate: 48, channel: 1, codecID: 0 }, undefined);
      await engine.muteMicrophone(false);
      await engine.muteSpeaker(false);
      engine.startSoundLevelMonitor(undefined);
      setupEventHandlers(engine);
      return engine;
    } catch (error) {
      return null;
    }
  };

  // Set up Zego event handlers
  const setupEventHandlers = useCallback((engine: ZegoExpressEngine) => {
    engine.on('roomStateUpdate', (roomID, state) => setRoomState(state));
    engine.on('roomStreamUpdate', async (roomID, updateType, newStreams: ZegoStream[]) => {
      if (updateType === ZegoUpdateType.Add) {
        setStreamList((prev) => [...prev, ...newStreams]);
        newStreams.forEach((stream) => playStream(stream.streamID));
      } else if (updateType === ZegoUpdateType.Delete) {
        setStreamList((prev) => prev.filter((s) => !newStreams.find((ns) => ns.streamID === s.streamID)));
      }
    });
    engine.on('publisherStateUpdate', (streamID, state) => setStreamState(state));
    engine.on('capturedSoundLevelUpdate', (soundLevel: number) => setSoundLevel(soundLevel));
  }, []);

  // Request microphone permissions
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        return granted === RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.IOS.MICROPHONE);
        return result === RESULTS.GRANTED;
      }
    } catch (err) {
      return false;
    }
  };

  // Start broadcasting audio stream
  const startBroadcasting = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) throw new Error('Microphone permission denied');
      if (!engineRef.current) throw new Error('Engine not initialized');
      await engineRef.current.startPublishingStream(streamId);
    } catch (error: any) {
      setErrorMessage('Failed to start broadcasting. Please check permissions.');
    }
  };

  // Play incoming audio stream
  const playStream = async (streamID: string) => {
    try {
      if (engineRef.current) {
        await engineRef.current.startPlayingStream(streamID);
      }
    } catch (err) {
      console.error('Error playing stream:', err);
    }
  };

  // Clean up Zego engine and room state
  const cleanup = async () => {
    if (engineRef.current) {
      const engine = engineRef.current;
      engine.off('roomStateUpdate');
      engine.off('publisherStateUpdate');
      engine.off('capturedSoundLevelUpdate');
      try {
        await engine.stopPublishingStream();
        await engine.logoutRoom(roomId);
        ZegoExpressEngine.instance().stopSoundLevelMonitor();
        ZegoExpressEngine.destroyEngine();
      } catch (e) {
        console.warn('Cleanup error:', e);
      }
      engineRef.current = null;
      setStreamList([]);
      setRoomState('disconnected');
      setStreamState('idle');
    }
  };

  // Toggle room lock status
  const handleToggleLock = useCallback(() => {
    if (room) {
      toggleRoomLock(roomId, !room.isLocked);
    }
  }, [room, roomId, toggleRoomLock]);

  // Open seat change modal
  const handleChangeSeat = useCallback((user: User) => {
    setSelectedUser(user);
    setSeatChangeModalVisible(true);
  }, []);

  // Confirm seat change
  const confirmSeatChange = useCallback(
    (newSeat: number) => {
      if (selectedUser && room) {
        const isOccupied = room.users.some((u) => u.seat === newSeat);
        if (isOccupied) {
          Alert.alert('Error', 'This seat is already occupied.');
          return;
        }
        changeSeat(roomId, selectedUser.id, newSeat);
        Alert.alert('Success', `Moved to Seat ${newSeat}`);
      }
      setSeatChangeModalVisible(false);
      setSelectedUser(null);
    },
    [selectedUser, room, roomId, changeSeat]
  );

  // Change room background
  const handleChangeBackground = useCallback(() => {
    if (!newBackgroundImage) {
      Alert.alert('Error', 'Please enter a valid image URL');
      return;
    }
    changeRoomBackground(roomId, newBackgroundImage);
    setNewBackgroundImage('');
    setBackgroundModalVisible(false);
    Alert.alert('Success', 'Room background changed');
  }, [newBackgroundImage, roomId, changeRoomBackground]);

  // Remove co-host status
  const handleRemoveCohostStatus = useCallback(async () => {
    try {
      await removeCohostStatus(roomId, userId);
      Alert.alert('Success', 'Co-host status removed');
      if (engineRef.current) {
        await engineRef.current.stopPublishingStream();
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to remove co-host status');
    }
  }, [roomId, userId]);

  // Toggle microphone
  const handleToggleMic = useCallback(
    async (targetUserId: string, currentMicStatus: boolean) => {
      try {
        await toggleMic(roomId, targetUserId, !currentMicStatus);
        Alert.alert('Success', `Mic ${currentMicStatus ? 'muted' : 'unmuted'}`);
        if (targetUserId === userId && engineRef.current) {
          await engineRef.current.muteMicrophone(currentMicStatus);
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to toggle mic');
      }
    },
    [roomId, userId]
  );

  // Kick user from room
  const handleKickUser = useCallback(
    async (targetUserId: string) => {
      try {
        await kickCohostFromSeat(roomId, targetUserId);
        Alert.alert('Success', 'User kicked');
      } catch (err) {
        Alert.alert('Error', 'Failed to kick user');
      }
    },
    [roomId]
  );

  // Handle room exit
  const handleExitRoom = useCallback(() => {
    setExitModalVisible(true);
  }, []);

  // Confirm room exit
  const confirmExitRoom = useCallback(() => {
    leaveRoom(roomId, userId);
    redirect("Tabs")
    setExitModalVisible(false);
  }, [roomId, userId, leaveRoom]);

  // Cancel room exit
  const cancelExitRoom = useCallback(() => {
    setExitModalVisible(false);
  }, []);

  // Create audio room via API
  const handleCreateRoom = useCallback(async () => {
    if (!roomTitle.trim()) {
      Alert.alert('Room title required', 'Please enter a title for your audio room');
      return;
    }
    setCreateLiveRoomApiHitted(false)
    setCreateRoomLoading(true);
    try {
      const roomData = {
        roomId,
        title: roomTitle,
        seats: selectedSeats,
        isLocked: isRoomLocked,
        hostId: userId,
        hostName: userName || 'dozolive',
        hostProfile: memoizedUserDetails.profileImage || '',
        image: 'https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3',
        tags: [],
        createdAt: new Date().toISOString(),
        specialId: memoizedUserDetails.specialId || '',
        hostLevel: memoizedUserDetails.level || 0,
      };

      const response = await axios.post(`${apiUrl}/live/createaudiolive`, roomData);
      if (response.status === 200 && response.data.roomId) {
        setCreateRoomLoading(false);
        await joinRoom({
          roomId,
          id: userId,
          userName,
          userProfile: memoizedUserDetails.profileImage || '',
          level: memoizedUserDetails.level || 0,
          specialId: memoizedUserDetails.specialId || '',
        });
      } else {
        throw new Error(response.data.error || 'Failed to create room');
      }
    } catch (error: any) {
      Alert.alert('Creation Failed', `Unable to create your audio room: ${error.message || 'Please try again later.'}`);
    } finally {
      setCreateRoomLoading(false);
    }
  }, [roomTitle, selectedSeats, isRoomLocked, userId, userName, memoizedUserDetails, roomId, setCreateLiveRoomApiHitted]);

  // Render seat options for modal
  const renderSeatOption = useCallback(
    ({ item }: { item: number }) => {
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
    },
    [room, confirmSeatChange]
  );

  // Available seats for seat change modal
  const availableSeats = room ? Array.from({ length: room.seats || 8 }, (_, i) => i + 1) : [];
  const isCohost = room?.users.find((u) => u.id === userId)?.isCohost && !room?.users.find((u) => u.id === userId)?.isHost;

  // Conditional rendering based on room state
  if (createLiveRoomApiHitted) {
    return (
      <CreateAudioRoom
        roomId={roomId}
        roomTitle={roomTitle}
        setRoomTitle={setRoomTitle}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        isRoomLocked={isRoomLocked}
        setIsRoomLocked={setIsRoomLocked}
        onCreateRoom={handleCreateRoom}
        isLoading={createRoomLoading}
      />
    );
  }

  if (!room) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Room not found. Please try again.</Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={
        room?.roomBackground
          ? { uri: room?.roomBackground }
          : require('../../../assets/images/audioroombackground/audioroom1.jpg')
      }
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.overlay}>
          <View style={styles.headerContainer}>
            <ShowHostInfo />
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => setUserModalVisible(true)}
                style={styles.userCountButton}
              >
                <Ionicons name="person" size={20} color="#fff" style={{ marginRight: 5 }} />
                <Text style={styles.userCountText}>{room?.users.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleExitRoom}>
                <Ionicons name="close" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <Text>Room Status: {roomState}</Text>
            <Text>Stream Status: {streamState}</Text>
            <Text>Room Locked: {room?.isLocked ? 'Yes' : 'No'}</Text>
          </View>

          <View style={styles.lockToggleContainer}>
            <Text style={styles.lockToggleText}>Lock Room</Text>
            <Switch
              value={room?.isLocked}
              onValueChange={handleToggleLock}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={room?.isLocked ? '#fff' : '#f4f3f4'}
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
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setCohostUserModalVisible(true)}
            >
              <Text style={styles.actionButtonBadge}>{room?.cohostRequests.length}</Text>
              <Image
                source={require('../../../assets/images/liveaudio/options.png')}
                style={styles.actionButtonImage}
              />
            </TouchableOpacity>
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
              onPress={() => setBackgroundModalVisible(true)}
            >
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

          <UserListModal
            isVisible={isUserModalVisible}
            onClose={() => setUserModalVisible(false)}
            users={room?.users}
            roomId={roomId}
            toggleChatMute={toggleChatMute}
          />

          <CohostRequestModal
            isVisible={isCohostUserModalVisible}
            onClose={() => setCohostUserModalVisible(false)}
            cohostRequests={room?.cohostRequests}
            users={room?.users}
            roomId={roomId}
            acceptCohost={acceptCohost}
            rejectCohost={kickCohostFromSeat}
          />

          <TouchableOpacity style={styles.endButton} onPress={handleExitRoom}>
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
                <TouchableOpacity style={styles.confirmButton} onPress={handleChangeBackground}>
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

          <Modal
            visible={isExitModalVisible}
            transparent
            animationType="slide"
            onRequestClose={cancelExitRoom}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Confirm Exit</Text>
                <Text style={styles.modalText}>Are you sure you want to end the room and exit?</Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={confirmExitRoom}
                  >
                    <Text style={styles.confirmButtonText}>Yes, End Room</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.closeModalButton]}
                    onPress={cancelExitRoom}
                  >
                    <Text style={styles.closeModalText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
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
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  userCountText: {
    fontSize: 16,
    color: 'white',
  },
  statusContainer: {
    marginTop: 10,
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
    zIndex:100
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
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
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

export default React.memo(AudioRoom);




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