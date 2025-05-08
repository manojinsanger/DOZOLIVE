import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  Alert,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {
  scaleWidth,
  scaleHeight,
  scaleFont,
} from '@/constants/scaling';
import AudioRoomHeader from '@/components/live/AudioHeader';
import BottomControls from '@/components/live/BottomControls';
import AudioRoomSeats from '@/components/live/AudioRoomSeats';
import AudioRoomAnnouncement from '@/components/live/AudioRoomAnnouncement';
import AudioRoomBottomSeatTools from '@/components/live/AudioRoomBottomSeatTools';
import ZegoExpressEngine, {
  ZegoUser,
  ZegoUpdateType,
  ZegoRoomConfig,
  ZegoScenario,
  ZegoPublishChannel
} from 'zego-express-engine-reactnative';
import { useAuth } from '@/context/AuthProvider';
import KeepAwake from 'react-native-keep-awake';
import { formatTime } from '@/utils/helper';

// Define interfaces for type safety
interface SeatInfo {
  userID: string;
  userName: string;
  isSelf: boolean;
  isMuted: boolean;
  profileImage?: string; // Optional profile image URL
}

interface Message {
  id: string;
  message: string;
  userID: string;
  userName: string;
  timestamp: number;
}

interface RoomMessage {
  id: string;
  type: 'system' | 'join' | 'leave';
  message: string;
  userID?: string;
  userName?: string;
  timestamp: number;
}

interface AudioRoomScreenProps {
  route: any;
  navigation: any;
}

// Initialize with empty seats
const INITIAL_SEATS = Array(8).fill(null);

const AudioRoomScreen: React.FC<AudioRoomScreenProps> = ({ route, navigation }) => {
  const { user } = useAuth();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [roomUsers, setRoomUsers] = useState<ZegoUser[]>([]);
  const [seatInfo, setSeatInfo] = useState<(SeatInfo | null)[]>(INITIAL_SEATS);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomMessages, setRoomMessages] = useState<RoomMessage[]>([]);
  const [roomDuration, setRoomDuration] = useState(0);

  // Room configuration
  const zegoConfig = {
    appID: 756008351,
    appSign: 'ded150241da12d93cd6b504941d70e838f7768888a56ad83b73db71468dad546',
    userID: String(user?.liveId),
    roomID: '9999',
    scenario: ZegoScenario.Broadcast,
    licence: "84A2291E72E37C027D641A8985808E0A852F6649F463407266ABECDF1B8DEF3C9A7A8052700F273905BD6C05BDEBCBA4D4ECA76728EBDFA9BC19A151E35472E41802F6E3B4F8EFF34862841F14E80DA924AC942F71DCF7A8299BFA28246DE6C469C9CBEF341843146916FC10C64763BBD7286F615C72648C273A20C13C8FC9BE29705A2320E30702F830A8ED8E8FCFC3FF1830EC7618BB039308C5A7928DD06B8D83FEFB9493AE18D443CFE5B1B46654E2BEA0B69D07D1770FD46B2B49F0B065354EF63D0188C328B7B33362D4FA6CFB532146F0ABA0F36ABFFA0784F31197EF1082EE7C962B5B7F9E52AB10FA901301610940D7E01875E3BA12D62F2EE5C48AAB7D5183DB127204187D7CFEFB7B094B7A9F91AE8D13F8CABD8D7087E409F5608BA105151B45E0B5F1C526A023D74B46187E4B41C796E9BB0EC753CE373717EF7420B07C1546AA26CF4976ABE0E2C6B6E7629DBF9BF334A2B2143E761E0BC19E17934F2E8399B53816A796A8868195B761D48342B59B8B6874D317F90C2C26C82C9C3DF78EA6574515D72B0310D350468D54276A4ED52052C6067B8A575DF819EEC64D761DD276A9E53E4BAB23273DB13B295BEF51449DB5DDC624432FCD46ADA4AB6D966CDFF10FA170E7A42885BEA18F2502862D7DA9F978B847A6A978C22352BE54762D2DFD3C888E60E7289B8C487960E69B4DAAFCB8FCDEBC8B8033A6DE4F32D1984A2589CA0C236528E55583C2CCF8B44574AD833DCD172F8DAF7743A34D30F6B73F669442BAF0327AB55F06058D9F00B722468CC77C4244DC6C3F516E6F236E108212B95C8D7DAE770007F2269539397DC62498674FB72AB39051AF5E0600927B9769E54E4C1ACB5C0E470F97ED0738B11EB6FE71ACF54EEA806D33C28B7BA4D07AAC3CF683CF3499DAD129161B8A6EF9D197A1A8BF6456E423AB973FA1C4D02F831B81C418FEFDF435FECE90380841FCFCDCF7752509F458F01FFC1600046B20C3017CE4B89E89B11BA97672B22C108AEE0BE3F6B627914BA1F6DCE0FEBADCAD37336A065143F7085FEA68FD6B9C07DE4CAF807A63E492563CBDE101E1B0EB3BE2F835E279DEF5B95390C52E2ED8A4615C3ED90E464413F75BF9A053ED71A8B850180D97FEDF6F16A817A13BEF02798EBC8A6C24FDAC8A983EEE3171FBA13DD10E29F65EE95BCB2ECD0F939203DF6C78C5D2F46E341884156149D044F73BFACB91EBDDCD6918BC3221893203D8D4D63142D7163349AAF959B4CE3A4647D5A2FC82644029A08DEC93C2ABB8530F8324DB716ED3D43F5A6387E6170963EA61E4F482E5B3ED0AF99564746BED47D8935D9BB4EEECB44CE76F92AB74F31268313A43741406F237CC8DACF157F386EF7BD36A3F9806F9570C5762A72E6E34ED800918A47A824BB622CC7F9F4045EA67BCB477255C69F6F19D9033ABE0511DBF84E7DB72BE1E89C765B2B2947103B425F2870CFF92B6B94938FF1A77049ACF1430D8CA7EF564319031D0E062663C42BA067855F1C4481BABE56E070D2898942E08E6B82303B932F3BA4F9C705217A3A5E052BF33C76D96F489C3B605964E3CF2F99F23811ADBBCBAA2CF46E1E7BDC2141BF30516E0BF44FCA223E23FB891167E80A3D020F14F035E307E5A3960C498B0FBE14851632770255B54AE5921E579DFDB949AC28469E7B16E4733BE56510E34F4011C5C1571C70C8A8ECD6CD559EC04600EAF7B5C75048CA40C4E73EAD94F808116A513FA6E70CFD187173A23B6B9D1ECBC1176088776676ADA3F1AC6E3A6343D04944FF0216C1B7BD5926D9790FA2513B51B6E0C566B1EDED7EA5EBB28CE508AD994BC20AD27FA3D23634EFD81207B1001F3B12FB6A88DEB38E2A24B67985A7CCB667B2E557533D406106589B46AF2C73E7B686571E7E226DCBB33BAB94B89DE35E83AF06D06C75D893DDC564222C24FB32418A1B1FDDBE00B1675E37101F7DB0C00E5B1E7CFB6718CB45804D82C8D97D9EA5C848F3A86172CFA5EB6C844CD64C3EB1A7DE0FE56221CB51EBEC54D80A7A85C9272A9BBE5178FFA3294DAC3639C40E2B2C76C9F869087B68547E3E733C55EAD57D334C08E8FBC7B80086900"
  };

  const roomConfig: ZegoRoomConfig = {
    isUserStatusNotify: true,
    maxMemberCount: 50,
    token: '',
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Zego Engine
  useEffect(() => {
    let isMounted = true;

    const initZego = async () => {
      try {
        if (Platform.OS === 'android') {
          await requestPermissions();
        }

        await ZegoExpressEngine.createEngineWithProfile({
          appID: zegoConfig.appID,
          appSign: zegoConfig.appSign,
          scenario: 0,
        });

        setupEventListeners();
        await joinRoom();

        // Start timer only once after room is joined
        startRoomTimer();

        console.log('Zego engine initialized successfully');
      } catch (err: any) {
        if (isMounted) {
          console.error('Zego init error:', err);
          setErrorMessage(err.message);
          Alert.alert('Error', 'Failed to initialize audio room engine');
        }
      }
    };

    initZego();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleLeaveRoom();
      return true;
    });

    return () => {
      isMounted = false;
      backHandler.remove();

      // Cleanup timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Safe cleanup of Zego
      try {
        const instance = ZegoExpressEngine.instance();
        if (instance) {
          // Try to stop publishing and logout
          instance.stopPublishingStream(ZegoPublishChannel.Main).catch(console.error);
          instance.logoutRoom(zegoConfig.roomID).catch(console.error);
          // Destroy at the end
          setTimeout(() => {
            ZegoExpressEngine.destroyEngine().catch(console.error);
          }, 500); // Give a little time for other operations to complete
        }
      } catch (err) {
        console.error("Error during cleanup:", err);
      }
    };
  }, []);

  const sendCoHostRequest = async () => {
    const instance = ZegoExpressEngine.instance();

    const requestMessage = JSON.stringify({
      type: 'cohost_request',
      userID: zegoConfig.userID,
      userName: user?.nickName || user?.userName || 'Guest',
    });

    try {
      await instance.sendBroadcastMessage(zegoConfig.roomID, requestMessage);
      Alert.alert('Request Sent', 'Waiting for host to approve.');
    } catch (error) {
      console.error('Failed to send co-host request', error);
      Alert.alert('Error', 'Could not send request. Please try again.');
    }
  };



  const requestPermissions = async () => {
    try {
      const micPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "App needs access to your microphone for audio rooms",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      if (micPermission !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Microphone permission denied');
      }
    } catch (err) {
      console.error('Permission error:', err);
      setErrorMessage('Microphone permission required for audio room');
      throw err;
    }
  };

  const setupEventListeners = () => {
    const instance = ZegoExpressEngine.instance();
    instance.on('roomStateUpdate', (roomID, state, errorCode) => {
      console.log('Room State Update:', { roomID, state, errorCode });

      if (roomID === zegoConfig.roomID) {
        switch (state) {
          case 0: // Connected
            setIsConnected(true);
            setErrorMessage(null);
            break;
          case 1: // Connecting
            setIsConnected(false);
            setErrorMessage('Connecting to room...');
            break;
          case 2: // Disconnected / Error
            setIsConnected(false);
            if (errorCode !== 0) {
              setErrorMessage(`Connection error: ${errorCode}`);
            } else {
              setErrorMessage('Disconnected from room');
            }
            break;
        }
      }
    });

    // User update in room
    instance.on('roomUserUpdate', (roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]) => {
      console.log('User Update:', {
        roomID,
        updateType,
        userList: userList.map((u) => ({ userID: u.userID, userName: u.userName })),
      });

      if (roomID === zegoConfig.roomID) {
        if (updateType === ZegoUpdateType.Add) {
          setRoomUsers((prevUsers) => [...prevUsers, ...userList]);
          setRoomMessages((prev) => [
            ...prev,
            ...userList.map((u) => ({
              id: `join-${u.userID}-${Date.now()}`,
              type: 'join' as const,
              message: `${u.userName} joined the room`,
              userID: u.userID,
              userName: u.userName,
              timestamp: Date.now(),
            })),
          ]);
        } else if (updateType === ZegoUpdateType.Delete) {
          setRoomUsers((prevUsers) =>
            prevUsers.filter((user) => !userList.some((u) => u.userID === user.userID))
          );

          setSeatInfo(prevSeats =>
            prevSeats.map(seat =>
              seat && userList.some(u => u.userID === seat.userID) ? null : seat
            )
          );

          setRoomMessages((prev) => [
            ...prev,
            ...userList.map((u) => ({
              id: `leave-${u.userID}-${Date.now()}`,
              type: 'leave' as const,
              message: `${u.userName} left the room`,
              userID: u.userID,
              userName: u.userName,
              timestamp: Date.now(),
            })),
          ]);
        }
      }
    });

    instance.on('IMRecvBroadcastMessage', (roomID: string, messageList: any[]) => {
      if (roomID === zegoConfig.roomID) {
        messageList.forEach((msg) => {
          try {
            const parsed = JSON.parse(msg.message);

            if (parsed.type === 'profile_update') {
              // 🔥 It's a profile update!
              setRoomUsers(prevUsers =>
                prevUsers.map(user =>
                  user.userID === parsed.userID
                    ? { ...user, userAvatar: parsed.userAvatar }
                    : user
                )
              );
              return;
            }

            if (parsed.type === 'cohost_request') {
              handleCoHostRequest(parsed.userID, parsed.userName);
            }

            if (parsed.type === 'cohost_approved') {
              Alert.alert(
                'Co-Host Approved',
                'You can now join as co-host.',
                [
                  {
                    text: 'Join Now',
                    onPress: async () => {
                      // Convert seatIndex to a proper number if it's not already one
                      const seatIndexNum = typeof parsed.seatIndex === 'number'
                        ? parsed.seatIndex
                        : parseInt(String(parsed.seatIndex), 10);

                      // Make sure we have a valid number
                      if (!isNaN(seatIndexNum)) {
                        await joinMicSeat(seatIndexNum);
                      } else {
                        console.error('Invalid seat index:', parsed.seatIndex);
                        Alert.alert('Error', 'Invalid seat assignment. Please try again.');
                      }
                    },
                  },
                ],
                { cancelable: false }
              );
            }
          } catch (e) {
            // Normal text message
            const newMsg = {
              id: `${msg.fromUser.userID}-${msg.sendTime}`,
              message: msg.message,
              userID: msg.fromUser.userID,
              userName: msg.fromUser.userName,
              timestamp: msg.sendTime,
            };
            setMessages(prev => [...prev, newMsg]);
          }
        });
      }
    });


  };

  const handleCoHostRequest = (userID: string, userName: string) => {
    Alert.alert(
      'Co-Host Request',
      `${userName} wants to come on mic`,
      [
        { text: 'Reject', style: 'cancel' },
        { text: 'Accept', onPress: () => approveCoHost(userID, userName) },
      ],
      { cancelable: true }
    );
  };

  // Update the approveCoHost function
  const approveCoHost = async (userID: string, userName: string) => {
    // Find an empty seat
    const emptySeatIndex = seatInfo.findIndex((seat) => seat === null);

    if (emptySeatIndex === -1) {
      Alert.alert('No Empty Seat', 'All seats are occupied.');
      return;
    }

    // Send approval message with the seat index
    try {
      const instance = ZegoExpressEngine.instance();
      const inviteMessage = JSON.stringify({
        type: 'cohost_approved',
        seatIndex: emptySeatIndex, // This will be a number, which is fine
        userID: userID
      });

      console.log(`Sending co-host approval for seat ${emptySeatIndex} to user ${userID}`);
      await instance.sendBroadcastMessage(zegoConfig.roomID, inviteMessage);

      // Don't update seat info yet - wait for the co-host to join
      // The co-host will join when they click "Join Now"

      console.log(`Co-host approval sent successfully`);
    } catch (error) {
      console.error('Failed to approve co-host:', error);
      Alert.alert('Error', 'Failed to approve co-host request.');
    }
  };


  // Update the joinMicSeat function
  const joinMicSeat = async (seatIndex: number) => {
    try {
      if (Platform.OS === 'android') {
        const micPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (micPermission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Required', 'Please allow microphone access.');
          return;
        }
      }

      console.log(`Starting to join mic seat at index: ${seatIndex}`);

      // Convert everything to strings to avoid type issues
      const roomID = String(zegoConfig.roomID);
      const userID = String(zegoConfig.userID);

      // Create a unique stream ID for publishing
      const streamID = `${roomID}_stream_${userID}`;

      // Define a co-host stream name format
      const coHostStreamID = `${roomID}_cohost_${userID}`;

      console.log(`Publishing stream with ID: ${streamID}`);

      const instance = ZegoExpressEngine.instance();

      // Start publishing your stream
      await instance.startPublishingStream(
        streamID,
        ZegoPublishChannel.Main,
        undefined
      );

      // We don't need to play the stream here as that's for listening to others
      // If you're a co-host, you should only publish your audio

      console.log(`Successfully published stream, updating seat info`);

      // Update seat information in UI
      const updatedSeats = [...seatInfo];
      updatedSeats[seatIndex] = {
        userID: userID,
        userName: user?.nickName || user?.userName || 'Me',
        isSelf: true,
        isMuted: false,
      };

      setSeatInfo(updatedSeats);

      // Notify the host that you've joined successfully (optional)
      const joinMessage = JSON.stringify({
        type: 'cohost_joined',
        seatIndex: seatIndex,
        userID: userID,
        userName: user?.nickName || user?.userName || 'Co-Host'
      });

      await instance.sendBroadcastMessage(roomID, joinMessage);

      console.log(`Successfully joined as co-host at seat ${seatIndex}`);
    } catch (error) {
      console.error('Error joining mic seat:', error);
      // Log more detailed error information
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      Alert.alert('Error', 'Failed to join as co-host. Please try again.');
    }
  };




  const startRoomTimer = () => {
    if (timerRef.current) return; // prevent multiple intervals
    timerRef.current = setInterval(() => {
      setRoomDuration(prev => prev + 1);
    }, 1000);
  };




  const joinRoom = async () => {
    try {
      const instance = ZegoExpressEngine.instance();

      const userData: ZegoUser = {
        userID: zegoConfig.userID,
        userName: user.name, // Name only
      };

      await instance.loginRoom(zegoConfig.roomID, userData, roomConfig);
      console.log(`Successfully joined room: ${zegoConfig.roomID}`);

      // 🔥 Broadcast your profile image after joining
      const profileData = {
        type: 'profile_update',
        userID: zegoConfig.userID,
        userName: user.name,
        userAvatar: user.avatarUrl, // <-- you must have this
      };

      await instance.sendBroadcastMessage(
        zegoConfig.roomID,
        JSON.stringify(profileData)
      );

      takeSeat(0); // Take host seat
      setIsConnected(true);
    } catch (err: any) {
      console.error('Failed to join room:', err);
      setErrorMessage(err.message);
      Alert.alert('Error', 'Failed to join audio room');
    }
  };


  const leaveRoom = async () => {
    try {
      // First check if instance exists
      const instance = ZegoExpressEngine.instance();
      if (!instance) {
        console.warn("Zego engine not initialized or already destroyed");
        return;
      }

      // Stop publishing stream if currently publishing
      try {
        await instance.stopPublishingStream(ZegoPublishChannel.Main);
      } catch (publishError) {
        console.warn("Error stopping stream:", publishError);
        // Continue anyway, we still want to try logout
      }

      // Try to logout from room
      await instance.logoutRoom(zegoConfig.roomID);

      setIsConnected(false);
      console.log('Successfully left room');
    } catch (err) {
      console.error('Failed to leave room:', err);
    }
  };

  const takeSeat = async (seatIndex: number) => {
    try {
      // First check if user is already on another seat
      const currentSeatIndex = seatInfo.findIndex(
        seat => seat?.userID === zegoConfig.userID
      );

      if (currentSeatIndex !== -1 && currentSeatIndex !== seatIndex) {
        // Leave current seat first
        leaveSeat(currentSeatIndex);
      }

      // Then take the new seat
      const instance = ZegoExpressEngine.instance();

      // Start publishing stream if not already publishing
      const streamID = `${zegoConfig.roomID}_seat_${seatIndex}`;
      await instance.startPublishingStream(streamID, ZegoPublishChannel.Main, undefined);

      // Update the UI
      setSeatInfo(prev => {
        const newSeatInfo = [...prev];
        newSeatInfo[seatIndex] = {
          userID: zegoConfig.userID,
          userName: user?.name || 'Host',
          isSelf: true,
          isMuted: isMicMuted
        };
        return newSeatInfo;
      });

      // Ensure mic is enabled when taking a seat
      if (isMicMuted) {
        await instance.muteMicrophone(false);
        setIsMicMuted(false);
      }

      console.log(`Took seat: ${seatIndex}`);
    } catch (err) {
      console.error('Failed to take seat:', err);
      setErrorMessage('Failed to take seat');
    }
  };

  const leaveSeat = async (seatIndex: number) => {
    try {
      const instance = ZegoExpressEngine.instance();
      const streamID = `${zegoConfig.roomID}_seat_${seatIndex}`;

      // Stop publishing stream
      await instance.stopPublishingStream(ZegoPublishChannel.Main);

      // Update the UI
      setSeatInfo(prev => {
        const newSeatInfo = [...prev];
        newSeatInfo[seatIndex] = null;
        return newSeatInfo;
      });

      console.log(`Left seat: ${seatIndex}`);
    } catch (err) {
      console.error('Failed to leave seat:', err);
    }
  };

  const toggleMicrophone = async () => {
    try {
      const instance = ZegoExpressEngine.instance();
      await instance.muteMicrophone(!isMicMuted);
      setIsMicMuted(!isMicMuted);

      // Update seat info if user is on a seat
      const seatIndex = seatInfo.findIndex(
        seat => seat?.userID === zegoConfig.userID
      );

      if (seatIndex !== -1) {
        setSeatInfo(prev => {
          const newSeatInfo = [...prev];
          if (newSeatInfo[seatIndex]) {
            newSeatInfo[seatIndex] = {
              ...newSeatInfo[seatIndex]!,
              isMuted: !isMicMuted
            };
          }
          return newSeatInfo;
        });
      }

      console.log(`Microphone ${!isMicMuted ? 'muted' : 'unmuted'}`);
    } catch (err) {
      console.error('Failed to toggle microphone:', err);
    }
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
          userName: user?.name || 'Host',
          timestamp: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error('Failed to send message:', result.errorCode);
        setErrorMessage(`Failed to send message (Error: ${result.errorCode})`);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setErrorMessage('Error sending message');
    }
  };

  const handleLeaveRoom = () => {
    Alert.alert(
      "Leave Room",
      "Are you sure you want to leave this audio room?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => {
            leaveRoom();
            navigation.goBack();
          }
        }
      ]
    );
  };

  // Define the top badges component
  const renderTopBadges = () => {
    return (
      <View style={styles.topBadges}>
        <View style={styles.badgeItem}>
          <FontAwesome name="users" size={scaleWidth(16)} color="#fff" />
          <Text style={styles.badgeText}>{roomUsers.length}</Text>
        </View>
        <View style={styles.badgeItem}>
          <Text style={styles.badgeText}>
            {isConnected ? 'Room: ' + zegoConfig.roomID : 'Connecting...'}
          </Text>
        </View>
        <View style={styles.timerBadge}>
          <Text style={styles.badgeText}>{formatTime(roomDuration)}</Text>
        </View>
      </View>
    );
  };

  const renderWalletButton = () => {
    return (
      <TouchableOpacity style={styles.walletButton}>
        <View style={styles.walletContent}>
          <Text style={styles.walletAmount}>10606</Text>
          <Image style={styles.walletIcon} source={require("@/assets/images/bean.png")} />
          <Text style={styles.walletValue}>≈$1.0</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleAudioControls = (action: string) => {
    switch (action) {
      case 'toggleMic':
        toggleMicrophone();
        break;
      case 'openTools':
        setIsBottomSheetOpen(true);
        break;
      case 'leaveRoom':
        handleLeaveRoom();
        break;
      case 'sendMessage':
        break;
    }
  };

  return (
    <LinearGradient
      colors={['#6c3cb4', '#1e3b70']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeepAwake />

      <SafeAreaView style={styles.safeArea}>
        <AudioRoomHeader
          roomUser={roomUsers.length > 0 ? roomUsers[0] : undefined}
          roomID={zegoConfig.roomID}
          connectedUsers={roomUsers.length}
          onBackPress={handleLeaveRoom}
        />

        {renderTopBadges()}

        <AudioRoomSeats
          seatInfo={seatInfo}
          onSeatPress={(index) => {
            // Check if seat is already taken
            if (seatInfo[index]) {
              // If it's current user's seat, allow them to leave
              if (seatInfo[index]?.isSelf) {
                leaveSeat(index);
              } else {
                Alert.alert('Seat Occupied', 'This seat is already taken');
              }
            } else {
              // Take the seat if it's empty
              takeSeat(index);
            }
          }}
        />

        {!isBottomSheetOpen && (
          <AudioRoomAnnouncement
            messages={roomMessages}
            currentUsers={roomUsers.length}
          />
        )}

        {renderWalletButton()}

        <BottomControls
          onHandleBottomSheet={setIsBottomSheetOpen}
          isMicMuted={isMicMuted}
          onToggleMic={() => handleAudioControls('toggleMic')}
          onLeaveRoom={() => handleAudioControls('leaveRoom')}
          onSendMessage={sendMessage}
          chatMessages={messages}
        />

        <AudioRoomBottomSeatTools
          isBottomSheetOpen={isBottomSheetOpen}
          onHandleBottomSheet={setIsBottomSheetOpen}
          onTakeSeat={takeSeat}
          onLeaveSeat={leaveSeat}
          seatInfo={seatInfo}
          userID={zegoConfig.userID}
          onSendCoHostRequest={sendCoHostRequest}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    marginVertical: scaleHeight(10),
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(15),
  },
  badgeText: {
    color: '#ffffff',
    fontSize: scaleFont(12),
    marginLeft: scaleWidth(5),
  },
  timerBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(15),
  },
  walletButton: {
    position: 'absolute',
    right: scaleWidth(20),
    bottom: scaleHeight(100),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: scaleWidth(20),
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(10),
  },
  walletContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAmount: {
    color: '#ffffff',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
  walletIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    marginHorizontal: scaleWidth(5),
    resizeMode: 'contain'
  },
  walletValue: {
    color: '#cccccc',
    fontSize: scaleFont(12),
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    padding: scaleWidth(10),
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(5),
    marginBottom: scaleHeight(10),
  },
  errorText: {
    color: '#ffffff',
    fontSize: scaleFont(14),
    textAlign: 'center',
  },
});

export default AudioRoomScreen;