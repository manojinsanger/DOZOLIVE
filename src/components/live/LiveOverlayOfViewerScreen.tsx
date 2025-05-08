// import { View, Image, TouchableOpacity, Animated, Dimensions, ScrollView, Text, FlatList } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { scaleWidth, scaleFont } from '@/constants/scaling';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Entypo from 'react-native-vector-icons/Entypo';
// import customColors from '@/constants/styles';
// import ThemedText from '../ThemedText';
// import MessagesModal from './Modals/MessageModal';
// import GiftsModal from './Modals/GiftModal';
// import CameraMicToggleBtn from './CameraMicToggleBtn';
// import JoinedUserModal from './Modals/JoinedUserModal';
// import LiveOptionsModal from './Modals/LiveOptionsModal';
// import Feather from 'react-native-vector-icons/Feather';
// import UserBroadCastWaitingModal from './Modals/UserBroadCastWaitingModal';
// import WealthLevel from '../wealthlevels/WealthLevel';
// import StreamLevel from '../streamlevel/StreamLevel';
// import { useAuth } from '@/context/AuthProvider';
// import ZegoExpressEngine from 'zego-express-engine-reactnative';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// // Constants
// const lightBackground = 'rgba(0, 8, 44, 0.2)';
// const selectedBackground = 'rgba(0, 45, 247, 0.7)';

// // Type Definitions
// interface User {
//     // icon: any ;
//     id: number;
//     name: string;
//     avatar: any;
// }

// interface Message {
//     id: string;
//     userID: string;
//     userName: string;
//     message: string;
//     timestamp: number;
// }


// interface Gift {
//     id: number;
//     name: string;
//     icon: any;
//     price: number;
// }

// interface LiveOverlayOfLiveProps {
//     isFront: boolean;
//     onPress: () => void;
//     handleBackPress: () => void;
//     toggleMic: () => void;
//     isMicOn: boolean;
//     users: any[],
//     messages: Message[],
//     sendMessage: (message: string) => Promise<void>;
//     allMessages:any[],
//     setAllMessages:any,
//     roomMessages:any,
// }

// const LiveOverlayOfLive: React.FC<LiveOverlayOfLiveProps> = ({
//     isFront,
//     onPress,
//     handleBackPress,
//     toggleMic,
//     isMicOn,
//     users,
//     messages,
//     sendMessage,
//     allMessages,
//     setAllMessages,
//     roomMessages

// }) => {
//     const [selected, setSelected] = useState<string | null>('All');
//     const [liveUsersModalVisible, setLiveUsersModalVisible] = useState(false);
//     const [messagesModalVisible, setMessagesModalVisible] = useState(false);
//     const [giftsModalVisible, setGiftsModalVisible] = useState(false);
//     const [liveOptionModalVisible, setLiveOptionModalVisible] = useState(false);
//     const [broadCastWaitngModalVisible, setBoradCastWaitingModalVisible] = useState(false)

//     const { user } = useAuth()

//     console.log(users, 'users on live')

//     const chatScrollRef = useRef<FlatList>(null);


//     console.log(user)

//     const scaleValue = new Animated.Value(1);

//     console.log(messages, 'messages')
//     // Sample live users data
//     const liveUsers: User[] = [
//         { id: 1, name: 'John Doe', avatar: require('../../assets/images/icon/p1.png') },
//         { id: 2, name: 'Jane Smith', avatar: require('../../assets/images/icon/p2.png') },
//         { id: 3, name: 'Mike Johnson', avatar: require('../../assets/images/icon/p3.png') },
//         { id: 4, name: 'Sarah Williams', avatar: require('../../assets/images/icon/p4.png') },
//         { id: 5, name: 'Sarah Williams', avatar: require('../../assets/images/icon/p5.png') },
//         { id: 6, name: 'Sarah Williams', avatar: require('../../assets/images/icon/user1.png') },
//         { id: 7, name: 'Sarah Williams', avatar: require('../../assets/images/icon/user1.png') },
//     ];
//     // Sample gifts data
//     const gifts: Gift[] = [
//         { id: 1, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
//         { id: 2, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
//         { id: 3, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
//         { id: 4, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
//         { id: 5, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
//         { id: 6, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
//         { id: 7, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
//         { id: 8, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
//         { id: 9, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
//         { id: 10, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
//         { id: 11, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
//         { id: 12, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
//         { id: 13, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
//         { id: 14, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
//         { id: 15, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
//         { id: 16, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
//         { id: 17, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
//         { id: 18, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
//         { id: 19, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
//         { id: 20, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
//         { id: 21, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
//     ];



//     const handleButtonPress = (button: string) => {
//         setSelected(button);
//         Animated.timing(scaleValue, {
//             toValue: 1.1,
//             duration: 100,
//             useNativeDriver: true,
//         }).start(() => {
//             Animated.timing(scaleValue, {
//                 toValue: 1,
//                 duration: 100,
//                 useNativeDriver: true,
//             }).start();
//         });
//     };



//     const renderButton = (title: string) => {
//         const isSelected = selected === title;
//         // Dynamic button dimensions based on screen width
//         const buttonWidth = 36;
//         const buttonHeight = 85;
//         const fontSize = scaleFont(11); // Responsive font size

//         return (
//             <TouchableOpacity
//                 onPress={() => handleButtonPress(title)}
//                 style={{
//                     backgroundColor: isSelected ? selectedBackground : lightBackground,
//                     borderRadius: 100,
//                     width: buttonWidth,
//                     height: buttonHeight,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginVertical: screenWidth * 0.001,
//                 }}
//             >
//                 <Animated.View
//                     style={{
//                         transform: [{ scale: scaleValue }],
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <ThemedText
//                         style={{
//                             color: 'white',
//                             fontSize: fontSize,
//                             transform: [{ rotate: '90deg' }],
//                             textAlign: 'center',
//                             padding: 0,
//                         }}
//                     >
//                         {title}
//                     </ThemedText>
//                 </Animated.View>
//             </TouchableOpacity>
//         );
//     };

//     const renderMessage = ({ item: message }: { item: Message }) => (
//         <View
//             style={{
//                 padding: 8,
//                 marginVertical: 4,
//                 backgroundColor: 'rgba(0, 0, 0, 0.15)',
//                 borderRadius: 12,
//                 flexDirection: 'row',
//                 gap: 10,
//                 alignItems: 'center',
//                 flexWrap: 'wrap',
//             }}
//         >
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//                 <WealthLevel />
//                 <ThemedText
//                     style={{
//                         color: customColors.accent,
//                         fontSize: 14,
//                         fontWeight: 'bold',
//                     }}
//                 >
//                     {message?.userName}fdgdf
//                 </ThemedText>
//             </View>
//             <ThemedText
//                 style={{
//                     color: customColors.white,
//                     fontSize: 12,
//                 }}
//             >
//                 {message?.message}
//             </ThemedText>
//         </View>
//     );

//     // Calculate ScrollView height and width based on buttons
//     const buttonHeight = 85;
//     const buttonMargin = screenWidth * 0.001;
//     const scrollViewHeight = 3 * buttonHeight + 2 * buttonMargin; // Height for 3 buttons

//     return (
//         <View style={{ flex: 1, position: 'relative', padding: 10 }}>
//             {/* Top Section */}
//             <View style={{ flexDirection: 'column' }}>
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                     }}
//                 >
//                     {/* User Info (Left) */}
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             gap: 5,
//                             backgroundColor: lightBackground,
//                             borderRadius: 100,
//                             padding: 3,
//                             paddingLeft: 5,
//                             paddingRight: 20,
//                         }}
//                     >
//                         <Image
//                             source={{ uri: user && user.profileImage }}
//                             style={{
//                                 width: scaleWidth(28),
//                                 height: scaleWidth(28),
//                                 borderRadius: 1000,
//                             }}
//                         />
//                         <View>
//                             <ThemedText style={{ color: 'white', fontSize: 11 }}>
//                                 {user && user?.name}
//                             </ThemedText>
//                             <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
//                                 <FontAwesome name="user" size={11} color="white" />
//                                 <ThemedText
//                                     style={{ color: customColors.white, fontSize: 11 }}
//                                 >
//                                     : 2
//                                 </ThemedText>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Right Icons */}
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                         <View style={{ width: screenWidth * 0.275 }}>
//                             <ScrollView
//                                 horizontal
//                                 showsHorizontalScrollIndicator={false}
//                                 contentContainerStyle={{
//                                     paddingVertical: 12,
//                                     paddingHorizontal: 2,
//                                     alignItems: 'center',
//                                     gap: 4,
//                                 }}
//                             >
//                                 {liveUsers.map((item, i) => {
//                                     return (
//                                         <TouchableOpacity
//                                             key={i}
//                                             style={{
//                                                 width: scaleWidth(30),
//                                                 height: scaleWidth(30),
//                                             }}
//                                         >
//                                             <Image
//                                                 source={item.avatar}
//                                                 style={{
//                                                     width: '100%',
//                                                     height: '100%',
//                                                     resizeMode: 'contain',
//                                                 }}
//                                             />
//                                         </TouchableOpacity>
//                                     );
//                                 })}
//                             </ScrollView>
//                         </View>
//                         <TouchableOpacity
//                             onPress={() => setLiveUsersModalVisible(true)}
//                             style={{
//                                 backgroundColor: lightBackground,
//                                 borderRadius: 100,
//                                 width: scaleWidth(30),
//                                 height: scaleWidth(30),
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <FontAwesome5 name="user-friends" size={20} color="#fff" />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={handleBackPress}>
//                             <Entypo name="cross" size={28} color="#fff" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 {/* Stream Level View (FIXED) */}
//                 <View
//                     style={{
//                         alignSelf: 'flex-start',
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         gap: 4,
//                         marginTop: 10,
//                         backgroundColor: 'rgba(0, 8, 44, 0.2)',
//                         borderRadius: 40,
//                         padding: 4,
//                     }}
//                 >
//                     <StreamLevel />
//                     <Text style={{ fontSize: 12, color: '#fff' }}>1,452,55.58k</Text>
//                 </View>

//             </View>

//             {/* Side Controls (Left Side) */}
//             <View style={{ position: 'absolute', left: scaleWidth(10), bottom: scaleWidth(10) }}>
//                 <View style={{ flexDirection: 'row', gap: 10 }}>
//                     {/* Buttons */}
//                     <View style={{ alignItems: 'center', alignSelf: 'flex-end', gap: 2 }}>
//                         {renderButton('All')}
//                         {renderButton('Room')}
//                         {renderButton('Chat')}
//                     </View>
//                     {/* Messages ScrollView with Fade Effect */}
//                     <View style={{ position: 'relative', alignSelf: 'flex-end' }}>
//                         <FlatList
//                             ref={chatScrollRef}
//                             data={[...messages]}

//                             renderItem={renderMessage}
//                             keyExtractor={(item) => `${item.userID}-${item.timestamp}`}
//                             // inverted
//                             showsVerticalScrollIndicator={false}
//                             style={{
//                                 width: screenWidth * 0.7,
//                                 maxHeight: scrollViewHeight,
//                             }}
//                             contentContainerStyle={{
//                                 paddingBottom: 0,
//                                 paddingTop: 0,
//                             }}
//                             onContentSizeChange={() => chatScrollRef.current?.scrollToEnd({ animated: true })}
//                         />

//                     </View>
//                 </View>
//                 {/* Message Button and Mic Toggle */}
//                 <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
//                     <TouchableOpacity
//                         style={{ backgroundColor: lightBackground, borderRadius: 100, padding: 8 }}
//                         onPress={() => setMessagesModalVisible(true)}
//                     >
//                         <AntDesign name="message1" size={20} color="white" />
//                     </TouchableOpacity>
//                     <CameraMicToggleBtn toggleMic={toggleMic} isMicOn={isMicOn} />
//                 </View>
//             </View>

//             {/* Gift Button and Camera Switch (Right Side) */}
//             <View style={{ position: 'absolute', right: scaleWidth(10), bottom: scaleWidth(10), alignItems: 'flex-end', gap: 10 }}>
//                 <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                     <View
//                         style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}
//                     >
//                         <Image
//                             source={require('../../assets/images/liveusers/user_placeholder-4.png')}
//                             style={{ width: "100%", height: "100%", resizeMode: 'contain' }}
//                         />
//                     </View>
//                     <View
//                         style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}
//                     >
//                         <Image
//                             source={require('../../assets/images/liveusers/user_placeholder-6.png')}
//                             style={{ width: "100%", height: "100%", resizeMode: 'contain' }}
//                         />
//                     </View>
//                     <View
//                         style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}
//                     >
//                         <Image
//                             source={require('../../assets/images/liveusers/user_placeholder-2.png')}
//                             style={{ width: "100%", height: "100%", resizeMode: 'contain' }}
//                         />
//                     </View>
//                     <TouchableOpacity
//                         style={{ backgroundColor: lightBackground, borderRadius: 100, padding: 8, width: 40, height: 40 }}
//                         onPress={() => setBoradCastWaitingModalVisible(true)}
//                     >
//                         <Image
//                             source={require('../../assets/images/icon/microphone1.png')}
//                             style={{ width: "100%", height: "100%", resizeMode: 'contain' }}
//                         />
//                     </TouchableOpacity>
//                 </View>

//                 <View style={{ flexDirection: 'row', gap: screenWidth * 0.03 }}>
//                     <TouchableOpacity
//                         style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
//                         onPress={() => setLiveOptionModalVisible(true)}
//                     >
//                         <Image
//                             source={require('../../assets/images/icon/menu3.png')}
//                             style={{ width: 30, height: 30 }}
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
//                         onPress={() => setGiftsModalVisible(true)}
//                     >
//                         <Image
//                             source={require('../../assets/images/icon/game-control.png')}
//                             style={{ width: 30, height: 30 }}
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
//                         onPress={() => setGiftsModalVisible(true)}
//                     >
//                         <Image
//                             source={require('../../assets/images/icon/gift2.png')}
//                             style={{ width: 30, height: 30 }}
//                         />
//                     </TouchableOpacity>
//                 </View>

//             </View>

//             {/* Modals */}
//             <JoinedUserModal
//                 visible={liveUsersModalVisible}
//                 onClose={() => setLiveUsersModalVisible(false)}
//                 users={liveUsers}
//             />
//             <MessagesModal
//                 visible={messagesModalVisible}
//                 onClose={() => setMessagesModalVisible(false)}
//                 messages={messages}
//                 sendMessage={sendMessage}
//             />
//             <GiftsModal
//                 visible={giftsModalVisible}
//                 onClose={() => setGiftsModalVisible(false)}
//                 gifts={gifts}
//             />
//             <LiveOptionsModal
//                 visible={liveOptionModalVisible}
//                 onClose={() => setLiveOptionModalVisible(false)}
//                 isFront={isFront}
//                 onPress={onPress}
//             />
//             <UserBroadCastWaitingModal
//                 visible={broadCastWaitngModalVisible}
//                 onClose={() => setBoradCastWaitingModalVisible(false)}
//             />
//         </View>
//     );
// };

// export default LiveOverlayOfLive;


import { View, Image, TouchableOpacity, Animated, Dimensions, ScrollView, Text, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useRef, useState } from 'react';
import { scaleWidth, scaleFont } from '@/constants/scaling';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import customColors from '@/constants/styles';
import ThemedText from '../ThemedText';
import MessagesModal from './Modals/MessageModal';
import GiftsModal from './Modals/GiftModal';
import CameraMicToggleBtn from './CameraMicToggleBtn';
import JoinedUserModal from './Modals/JoinedUserModal';
import LiveOptionsModal from './Modals/LiveOptionsModal';
import Feather from 'react-native-vector-icons/Feather';
import UserBroadCastWaitingModal from './Modals/UserBroadCastWaitingModal';
import WealthLevel from '../wealthlevels/WealthLevel';
import StreamLevel from '../streamlevel/StreamLevel';
import { useAuth } from '@/context/AuthProvider';
import { ZegoUser } from 'zego-express-engine-reactnative';
import Slider from '@react-native-community/slider';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Constants
const lightBackground = 'rgba(0, 8, 44, 0.2)';
const selectedBackground = 'rgba(0, 45, 247, 0.7)';

// Type Definitions
interface User {
    id: number;
    name: string;
    avatar: any;
}

interface Message {
    id: number;
    text: string;
    level: number;
    userID: string;
    userName: string;
    message: string;
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

interface Gift {
    id: number;
    name: string;
    icon: any;
    price: number;
}

interface LiveOverlayOfLiveProps {
    isFront: boolean;
    onPress: () => void;
    handleBackPress: () => void;
    toggleMic: () => void;
    isMicOn: boolean;
    users: ZegoUser[];
    messages: Message[];
    sendMessage: (message: string) => Promise<void>;
    allMessages: AllMessage[];
    setAllMessages: React.Dispatch<React.SetStateAction<AllMessage[]>>;
    roomMessages: RoomMessage[];
}

const LiveOverlayOfLive: React.FC<LiveOverlayOfLiveProps> = ({
    isFront,
    onPress,
    handleBackPress,
    toggleMic,
    isMicOn,
    users,
    messages,
    sendMessage,
    allMessages,
    setAllMessages,
    roomMessages,
    intensity,
    setIntensity
}) => {
    const [selected, setSelected] = useState<string>('All');
    const [liveUsersModalVisible, setLiveUsersModalVisible] = useState(false);
    const [messagesModalVisible, setMessagesModalVisible] = useState(false);
    const [giftsModalVisible, setGiftsModalVisible] = useState(false);
    const [liveOptionModalVisible, setLiveOptionModalVisible] = useState(false);

    const [broadCastWaitngModalVisible, setBoradCastWaitingModalVisible] = useState(false);

    console.log(roomMessages, 'roomMessages dfsdsdfsdfdsf')

    const { user } = useAuth();

    console.log(users, 'users on live');

    const chatScrollRef = useRef<FlatList>(null);


    const scaleValue = new Animated.Value(1);

    // Sample live users data
    const liveUsers: User[] = [
        { id: 1, name: 'John Doe', avatar: require('../../assets/images/icon/p1.png') },
        { id: 2, name: 'Jane Smith', avatar: require('../../assets/images/icon/p2.png') },
        { id: 3, name: 'Mike Johnson', avatar: require('../../assets/images/icon/p3.png') },
        { id: 4, name: 'Sarah Williams', avatar: require('../../assets/images/icon/p4.png') },
        { id: 5, name: 'Sarah Williams', avatar: require('../../assets/images/icon/p5.png') },
        { id: 6, name: 'Sarah Williams', avatar: require('../../assets/images/icon/user1.png') },
        { id: 7, name: 'Sarah Williams', avatar: require('../../assets/images/icon/user1.png') },
    ];

    // Sample gifts data
    const gifts: Gift[] = [
        { id: 1, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
        { id: 2, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
        { id: 3, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
        { id: 4, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
        { id: 5, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
        { id: 6, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
        { id: 7, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
        { id: 8, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
        { id: 9, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
        { id: 10, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
        { id: 11, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
        { id: 12, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
        { id: 13, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
        { id: 14, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
        { id: 15, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
        { id: 16, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
        { id: 17, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
        { id: 18, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
        { id: 19, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
        { id: 20, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
        { id: 21, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
    ];

    const handleButtonPress = (button: string) => {
        setSelected(button);
        Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start();
        });
    };

    const renderButton = (title: string) => {
        const isSelected = selected === title;
        const buttonWidth = 36;
        const buttonHeight = 85;
        const fontSize = scaleFont(11);

        return (
            <TouchableOpacity
                onPress={() => handleButtonPress(title)}
                style={{
                    backgroundColor: isSelected ? selectedBackground : lightBackground,
                    borderRadius: 100,
                    width: buttonWidth,
                    height: buttonHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: screenWidth * 0.001,
                }}
            >
                <Animated.View
                    style={{
                        transform: [{ scale: scaleValue }],
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ThemedText
                        style={{
                            color: 'white',
                            fontSize: fontSize,
                            transform: [{ rotate: '90deg' }],
                            textAlign: 'center',
                            padding: 0,
                        }}
                    >
                        {title}
                    </ThemedText>
                </Animated.View>
            </TouchableOpacity>
        );
    };


    const renderMessage = ({ item }: { item: Message | AllMessage | RoomMessage }) => {
        if ('type' in item) {
            // Handle AllMessage or RoomMessage
            if (item.type === 'chat') {
                // AllMessage chat
                return (
                    <View style={styles.messageContainer}>
                        <View style={styles.messageHeader}>
                            <WealthLevel wealthLevel={300} />
                            <ThemedText style={styles.userName}>{item.userName}</ThemedText>
                        </View>
                        <ThemedText style={styles.messageText}>{item.message}</ThemedText>
                    </View>
                );
            } else if (item.type === 'join' || item.type === 'leave') {
                // AllMessage join/leave
                const messageText = item.type === 'join' ? `joined the room` : `left the room`;
                return <View style={styles.messageContainer}>
                    <View style={styles.messageHeader}>
                        <WealthLevel wealthLevel={10} />
                        <ThemedText style={styles.userName}>{item.userName}</ThemedText>
                    </View>
                    <ThemedText style={styles.messageText}>{messageText}</ThemedText>
                </View>;
            } else if (item.type === 'system') {
                // AllMessage or RoomMessage system
                return <View style={styles.messageContainer}>
                    <ThemedText style={[styles.systemText, { color: customColors.gray300 }]}>{item.message}</ThemedText>
                </View>
            } else if (item.type === 'join' || item.type === 'leave') {
                // RoomMessage join/leave
                return (
                    item.type === "join"
                        ?
                        <View style={styles.messageContainer}>
                            <View style={styles.messageHeader}>
                                <WealthLevel wealthLevel={20} />
                                <ThemedText style={styles.userName}>{item.userName}</ThemedText>
                            </View>
                            <ThemedText style={styles.messageText}>{"Joined"}</ThemedText>
                        </View>
                        :
                        <View style={styles.messageContainer}>
                            <View style={styles.messageHeader}>
                                <WealthLevel wealthLevel={10} />
                                <ThemedText style={styles.userName}>{item.userName}</ThemedText>
                            </View>
                            <ThemedText style={styles.messageText}>{"leave"}</ThemedText>
                        </View>)


            }
        } else {
            // Handle Message
            return (
                <View style={styles.messageContainer}>
                    <View style={styles.messageHeader}>
                        <WealthLevel wealthLevel={10} />
                        <ThemedText style={styles.userName}>{item.userName}</ThemedText>
                    </View>
                    <ThemedText style={styles.messageText}>{item.message}</ThemedText>
                </View>
            );
        }
        return null;
    };

    // Select data based on tab
    const getMessages = () => {
        switch (selected) {
            case 'All':
                return allMessages;
            case 'Room':
                return roomMessages;
            case 'Chat':
                return messages;
            default:
                return allMessages;
        }
    };

    // Calculate ScrollView height
    const buttonHeight = 85;
    const buttonMargin = screenWidth * 0.001;
    const scrollViewHeight = 3 * buttonHeight + 2 * buttonMargin;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
            style={{
                width: '100%',
                flex: 1
            }}
        >
            <View style={{ flex: 1, position: 'relative', padding: 10 }}>
                {/* Top Section */}
                <View style={{ flexDirection: 'column' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {/* User Info (Left) */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                                backgroundColor: lightBackground,
                                borderRadius: 100,
                                padding: 3,
                                paddingLeft: 5,
                                paddingRight: 20,
                            }}
                        >
                            <Image
                                source={{ uri: user && user.profileImage }}
                                style={{
                                    width: scaleWidth(28),
                                    height: scaleWidth(28),
                                    borderRadius: 1000,
                                }}
                            />
                            <View>
                                <ThemedText style={{ color: 'white', fontSize: 11 }}>{user && user?.name}</ThemedText>
                                <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                    <FontAwesome name="user" size={11} color="white" />
                                    <ThemedText style={{ color: customColors.white, fontSize: 11 }}>: {users.length}</ThemedText>
                                </View>
                            </View>
                        </View>

                        {/* Right Icons */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View style={{ width: screenWidth * 0.275 }}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        paddingVertical: 12,
                                        paddingHorizontal: 2,
                                        alignItems: 'center',
                                        gap: 4,
                                    }}
                                >
                                    {liveUsers.map((item, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            style={{
                                                width: scaleWidth(30),
                                                height: scaleWidth(30),
                                            }}
                                        >
                                            <Image
                                                source={item.avatar}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <TouchableOpacity
                                onPress={() => setLiveUsersModalVisible(true)}
                                style={{
                                    backgroundColor: lightBackground,
                                    borderRadius: 100,
                                    width: scaleWidth(30),
                                    height: scaleWidth(30),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesome5 name="user-friends" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBackPress}>
                                <Entypo name="cross" size={28} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Stream Level View */}
                    <View
                        style={{
                            alignSelf: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                            marginTop: 10,
                            backgroundColor: 'rgba(0, 8, 44, 0.2)',
                            borderRadius: 40,
                            padding: 4,
                        }}
                    >
                        <StreamLevel />
                        <Text style={{ fontSize: 12, color: '#fff' }}>1,452,55.58k</Text>
                    </View>
                </View>

                {/* Side Controls (Left Side) */}
                <View style={{ position: 'absolute', left: scaleWidth(10), bottom: scaleWidth(10) }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        {/* Buttons */}
                        <View style={{ alignItems: 'center', alignSelf: 'flex-end', gap: 2 }}>
                            {renderButton('All')}
                            {renderButton('Room')}
                            {renderButton('Chat')}
                        </View>
                        {/* Messages FlatList */}
                        <View style={{ position: 'relative', alignSelf: 'flex-end' }}>
                            <FlatList
                                ref={chatScrollRef}
                                data={getMessages()}
                                renderItem={renderMessage}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    width: screenWidth * 0.7,
                                    maxHeight: scrollViewHeight,
                                }}
                                contentContainerStyle={{
                                    paddingBottom: 0,
                                    paddingTop: 0,
                                }}
                                onContentSizeChange={() => chatScrollRef.current?.scrollToEnd({ animated: true })}
                            />
                        </View>
                    </View>
                    {/* Message Button and Mic Toggle */}
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: lightBackground, borderRadius: 100, padding: 8 }}
                            onPress={() => setMessagesModalVisible(true)}
                        >
                            <AntDesign name="message1" size={20} color="white" />
                        </TouchableOpacity>
                        <CameraMicToggleBtn toggleMic={toggleMic} isMicOn={isMicOn} />
                    </View>
                </View>

                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={intensity}
                    onValueChange={(value) => setIntensity(value)}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />

                {/* Gift Button and Camera Switch (Right Side) */}
                <View
                    style={{ position: 'absolute', right: scaleWidth(10), bottom: scaleWidth(10), alignItems: 'flex-end', gap: 10 }}
                >
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <View style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}>
                            <Image
                                source={require('../../assets/images/liveusers/user_placeholder-4.png')}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}>
                            <Image
                                source={require('../../assets/images/liveusers/user_placeholder-6.png')}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}>
                            <Image
                                source={require('../../assets/images/liveusers/user_placeholder-2.png')}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: lightBackground, borderRadius: 100, padding: 8, width: 40, height: 40 }}
                            onPress={() => setBoradCastWaitingModalVisible(true)}
                        >
                            <Image
                                source={require('../../assets/images/icon/microphone1.png')}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', gap: screenWidth * 0.03 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
                            onPress={() => setLiveOptionModalVisible(true)}
                        >
                            <Image source={require('../../assets/images/icon/menu3.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
                            onPress={() => setGiftsModalVisible(true)}
                        >
                            <Image source={require('../../assets/images/icon/game-control.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
                            onPress={() => setGiftsModalVisible(true)}
                        >
                            <Image source={require('../../assets/images/icon/gift2.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Modals */}
                <JoinedUserModal visible={liveUsersModalVisible} onClose={() => setLiveUsersModalVisible(false)} users={liveUsers} />
                <MessagesModal
                    visible={messagesModalVisible}
                    onClose={() => setMessagesModalVisible(false)}
                    messages={messages}
                    sendMessage={sendMessage}
                />
                <GiftsModal visible={giftsModalVisible} onClose={() => setGiftsModalVisible(false)} gifts={gifts} />
                <LiveOptionsModal
                    visible={liveOptionModalVisible}
                    onClose={() => setLiveOptionModalVisible(false)}
                    isFront={isFront}
                    onPress={onPress}
                />
                <UserBroadCastWaitingModal
                    visible={broadCastWaitngModalVisible}
                    onClose={() => setBoradCastWaitingModalVisible(false)}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        padding: 8,
        marginVertical: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: 12,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    messageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    userName: {
        color: customColors.accent,
        fontSize: scaleFont(14),
        fontWeight: 'bold',
    },
    messageText: {
        color: customColors.white,
        fontSize: scaleFont(12),
    },
    eventText: {
        color: customColors.gray500,
        fontSize: scaleFont(12),
        textAlign: 'center',
        marginVertical: 4,
    },
    systemText: {
        color: customColors.primary,
        fontSize: scaleFont(12),
        textAlign: 'center',
        marginVertical: 4,
    },
});

export default LiveOverlayOfLive;


// import { View, Image, TouchableOpacity, Animated, Dimensions, FlatList, TextInput, StyleSheet, ScrollView, Text } from 'react-native';
// import React, { useState, useRef } from 'react';
// import { scaleWidth, scaleFont } from '@/constants/scaling';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Entypo from 'react-native-vector-icons/Entypo';
// import customColors from '@/constants/styles';
// import ThemedText from '../ThemedText';
// import MessagesModal from './Modals/MessageModal';
// import GiftsModal from './Modals/GiftModal';
// import CameraMicToggleBtn from './CameraMicToggleBtn';
// import JoinedUserModal from './Modals/JoinedUserModal';
// import LiveOptionsModal from './Modals/LiveOptionsModal';
// import Feather from 'react-native-vector-icons/Feather';
// import UserBroadCastWaitingModal from './Modals/UserBroadCastWaitingModal';
// import WealthLevel from '../wealthlevels/WealthLevel';
// import StreamLevel from '../streamlevel/StreamLevel';
// import { useAuth } from '@/context/AuthProvider';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// // Constants
// const lightBackground = 'rgba(0, 8, 44, 0.2)';
// const selectedBackground = 'rgba(0, 45, 247, 0.7)';

// // Type Definitions
// interface User {
//   id: number;
//   name: string;
//   avatar: any;
// }

// interface Message {
//   id: string;
//   userID: string;
//   userName: string;
//   message: string;
//   timestamp: number;
// }

// interface Gift {
//   id: number;
//   name: string;
//   icon: any;
//   price: number;
// }

// interface LiveOverlayOfLiveProps {
//   isFront: boolean;
//   onPress: () => void;
//   handleBackPress: () => void;
//   toggleMic: () => void;
//   isMicOn: boolean;
//   users: any[];
//   messages: Message[];
//   sendMessage: (message: string) => Promise<void>;
// }

// const safasdf: React.FC<LiveOverlayOfLiveProps> = ({
//   isFront,
//   onPress,
//   handleBackPress,
//   toggleMic,
//   isMicOn,
//   users,
//   messages,
//   sendMessage,
// }) => {
//   const [selected, setSelected] = useState<string | null>('All');
//   const [liveUsersModalVisible, setLiveUsersModalVisible] = useState(false);
//   const [messagesModalVisible, setMessagesModalVisible] = useState(false);
//   const [giftsModalVisible, setGiftsModalVisible] = useState(false);
//   const [liveOptionModalVisible, setLiveOptionModalVisible] = useState(false);
//   const [broadCastWaitingModalVisible, setBroadCastWaitingModalVisible] = useState(false);
//   const [messageInput, setMessageInput] = useState('');
//   const { user } = useAuth();
//   const chatScrollRef = useRef<FlatList>(null);
//   const scaleValue = new Animated.Value(1);

//   // Sample live users data (for fallback if users prop is empty)
//   const liveUsers: User[] = [
//     { id: 1, name: 'John Doe', avatar: require('../../assets/images/icon/p1.png') },
//     { id: 2, name: 'Jane Smith', avatar: require('../../assets/images/icon/p2.png') },
//     { id: 3, name: 'Mike Johnson', avatar: require('../../assets/images/icon/p3.png') },
//     { id: 4, name: 'Sarah Williams', avatar: require('../../assets/images/icon/p4.png') },
//     { id: 5, name: 'Sarah Williams', avatar: require('../../assets/images/icon/p5.png') },
//     { id: 6, name: 'Sarah Williams', avatar: require('../../assets/images/icon/user1.png') },
//     { id: 7, name: 'Sarah Williams', avatar: require('../../assets/images/icon/user1.png') },
//   ];

//   // Sample gifts data
//   const gifts: Gift[] = [
//     { id: 1, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
//     { id: 2, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
//     { id: 3, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
//     { id: 4, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
//     { id: 5, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
//     { id: 6, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
//     { id: 7, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
//     { id: 8, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
//     { id: 9, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
//     { id: 10, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
//     { id: 11, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
//     { id: 12, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
//     { id: 13, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
//     { id: 14, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
//     { id: 15, name: 'Star', icon: require('../../assets/images/gifts/sticker-2.png'), price: 10 },
//     { id: 16, name: 'Heart', icon: require('../../assets/images/gifts/sticker-3.png'), price: 20 },
//     { id: 17, name: 'Crown', icon: require('../../assets/images/gifts/sticker-4.png'), price: 50 },
//     { id: 18, name: 'Crown', icon: require('../../assets/images/gifts/sticker-5.png'), price: 50 },
//     { id: 19, name: 'Crown', icon: require('../../assets/images/gifts/sticker-6.png'), price: 50 },
//     { id: 20, name: 'Crown', icon: require('../../assets/images/gifts/sticker-7.png'), price: 50 },
//     { id: 21, name: 'Crown', icon: require('../../assets/images/gifts/Group_8860.png'), price: 50 },
//   ];

//   const handleSendMessage = async () => {
//     if (!messageInput.trim()) return;
//     await sendMessage(messageInput);
//     setMessageInput('');
//     chatScrollRef.current?.scrollToEnd({ animated: true });
//   };

//   const handleButtonPress = (button: string) => {
//     setSelected(button);
//     Animated.timing(scaleValue, {
//       toValue: 1.1,
//       duration: 100,
//       useNativeDriver: true,
//     }).start(() => {
//       Animated.timing(scaleValue, {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   const renderButton = (title: string) => {
//     const isSelected = selected === title;
//     const buttonWidth = 36;
//     const buttonHeight = 85;
//     const fontSize = scaleFont(11);

//     return (
//       <TouchableOpacity
//         onPress={() => handleButtonPress(title)}
//         style={{
//           backgroundColor: isSelected ? selectedBackground : lightBackground,
//           borderRadius: 100,
//           width: buttonWidth,
//           height: buttonHeight,
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginVertical: screenWidth * 0.001,
//         }}
//       >
//         <Animated.View
//           style={{
//             transform: [{ scale: scaleValue }],
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <ThemedText
//             style={{
//               color: 'white',
//               fontSize: fontSize,
//               transform: [{ rotate: '90deg' }],
//               textAlign: 'center',
//               padding: 0,
//             }}
//           >
//             {title}
//           </ThemedText>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   const renderMessage = ({ item: message }: { item: Message }) => (
//     <View
//       style={{
//         padding: 8,
//         marginVertical: 4,
//         backgroundColor: 'rgba(0, 0, 0, 0.15)',
//         borderRadius: 12,
//         flexDirection: 'row',
//         gap: 10,
//         alignItems: 'center',
//         flexWrap: 'wrap',
//       }}
//     >
//       <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//         <WealthLevel />
//         <ThemedText
//           style={{
//             color: customColors.accent,
//             fontSize: 14,
//             fontWeight: 'bold',
//           }}
//         >
//           {message.userName}
//         </ThemedText>
//       </View>
//       <ThemedText
//         style={{
//           color: customColors.white,
//           fontSize: 12,
//         }}
//       >
//         {message.message}
//       </ThemedText>
//     </View>
//   );

//   const buttonHeight = 85;
//   const buttonMargin = screenWidth * 0.001;
//   const scrollViewHeight = 3 * buttonHeight + 2 * buttonMargin;

//   return (
//     <View style={{ flex: 1, position: 'relative', padding: 10 }}>
//       {/* Top Section */}
//       <View style={{ flexDirection: 'column' }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           {/* User Info (Left) */}
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 5,
//               backgroundColor: lightBackground,
//               borderRadius: 100,
//               padding: 3,
//               paddingLeft: 5,
//               paddingRight: 20,
//             }}
//           >
//             <Image
//               source={{ uri: user && user.profileImage }}
//               style={{
//                 width: scaleWidth(28),
//                 height: scaleWidth(28),
//                 borderRadius: 1000,
//               }}
//             />
//             <View>
//               <ThemedText style={{ color: 'white', fontSize: 11 }}>{user && user?.name}</ThemedText>
//               <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
//                 <FontAwesome name="user" size={11} color="white" />
//                 <ThemedText style={{ color: customColors.white, fontSize: 11 }}>
//                   : {users.length}
//                 </ThemedText>
//               </View>
//             </View>
//           </View>

//           {/* Right Icons */}
//           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//             <View style={{ width: screenWidth * 0.275 }}>
//               <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={{
//                   paddingVertical: 12,
//                   paddingHorizontal: 2,
//                   alignItems: 'center',
//                   gap: 4,
//                 }}
//               >
//                 {(users.length > 0 ? users : liveUsers).map((item, i) => (
//                   <TouchableOpacity
//                     key={i}
//                     style={{
//                       width: scaleWidth(30),
//                       height: scaleWidth(30),
//                     }}
//                   >
//                     <Image
//                       source={item.avatar || require('../../assets/images/icon/user1.png')}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         resizeMode: 'contain',
//                       }}
//                     />
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//             <TouchableOpacity
//               onPress={() => setLiveUsersModalVisible(true)}
//               style={{
//                 backgroundColor: lightBackground,
//                 borderRadius: 100,
//                 width: scaleWidth(30),
//                 height: scaleWidth(30),
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <FontAwesome5 name="user-friends" size={20} color="#fff" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleBackPress}>
//               <Entypo name="cross" size={28} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Stream Level View */}
//         <View
//           style={{
//             alignSelf: 'flex-start',
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 4,
//             marginTop: 10,
//             backgroundColor: 'rgba(0, 8, 44, 0.2)',
//             borderRadius: 40,
//             padding: 4,
//           }}
//         >
//           <StreamLevel />
//           <Text style={{ fontSize: 12, color: '#fff' }}>1,452,55.58k</Text>
//         </View>
//       </View>

//       {/* Side Controls (Left Side) */}
//       <View style={{ position: 'absolute', left: scaleWidth(10), bottom: scaleWidth(10) }}>
//         <View style={{ flexDirection: 'row', gap: 10 }}>
//           {/* Buttons */}
//           <View style={{ alignItems: 'center', alignSelf: 'flex-end', gap: 2 }}>
//             {renderButton('All')}
//             {renderButton('Room')}
//             {renderButton('Chat')}
//           </View>
//           {/* Messages FlatList */}
//           <View style={{ position: 'relative', alignSelf: 'flex-end' }}>
//             <FlatList
//               ref={chatScrollRef}
//               data={[...messages].reverse()}

//               renderItem={renderMessage}
//               keyExtractor={(item) => `${item.userID}-${item.timestamp}`}
//               inverted
//               showsVerticalScrollIndicator={false}
//               style={{
//                 width: screenWidth * 0.7,
//                 maxHeight: scrollViewHeight,
//               }}
//               contentContainerStyle={{
//                 paddingBottom: 0,
//                 paddingTop: 0,
//               }}
//               onContentSizeChange={() => chatScrollRef.current?.scrollToEnd({ animated: true })}
//             />
//           </View>
//         </View>
//         {/* Message Input and Mic Toggle */}
//         <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}>
//           <View style={styles.chatInputContainer}>
//             <TextInput
//               style={styles.chatInput}
//               value={messageInput}
//               onChangeText={setMessageInput}
//               placeholder="Type a message..."
//               placeholderTextColor={customColors.gray500}
//             />
//             <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
//               <AntDesign name="message1" size={20} color="white" />
//             </TouchableOpacity>
//           </View>
//           <CameraMicToggleBtn toggleMic={toggleMic} isMicOn={isMicOn} />
//         </View>
//       </View>

//       {/* Gift Button and Camera Switch (Right Side) */}
//       <View style={{ position: 'absolute', right: scaleWidth(10), bottom: scaleWidth(10), alignItems: 'flex-end', gap: 10 }}>
//         <View style={{ flexDirection: 'column', gap: 10 }}>
//           <View style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}>
//             <Image
//               source={require('../../assets/images/liveusers/user_placeholder-4.png')}
//               style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
//             />
//           </View>
//           <View style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}>
//             <Image
//               source={require('../../assets/images/liveusers/user_placeholder-6.png')}
//               style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
//             />
//           </View>
//           <View style={{ backgroundColor: lightBackground, borderRadius: 100, width: 40, height: 40 }}>
//             <Image
//               source={require('../../assets/images/liveusers/user_placeholder-2.png')}
//               style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
//             />
//           </View>
//           <TouchableOpacity
//             style={{ backgroundColor: lightBackground, borderRadius: 100, padding: 8, width: 40, height: 40 }}
//             onPress={() => setBroadCastWaitingModalVisible(true)}
//           >
//             <Image
//               source={require('../../assets/images/icon/microphone1.png')}
//               style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={{ flexDirection: 'row', gap: screenWidth * 0.03 }}>
//           <TouchableOpacity
//             style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
//             onPress={() => setLiveOptionModalVisible(true)}
//           >
//             <Image source={require('../../assets/images/icon/menu3.png')} style={{ width: 30, height: 30 }} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
//             onPress={() => setGiftsModalVisible(true)}
//           >
//             <Image
//               source={require('../../assets/images/icon/game-control.png')}
//               style={{ width: 30, height: 30 }}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{ backgroundColor: lightBackground, borderRadius: 200, padding: 5 }}
//             onPress={() => setGiftsModalVisible(true)}
//           >
//             <Image source={require('../../assets/images/icon/gift2.png')} style={{ width: 30, height: 30 }} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Modals */}
//       <JoinedUserModal
//         visible={liveUsersModalVisible}
//         onClose={() => setLiveUsersModalVisible(false)}
//         users={users.length > 0 ? users : liveUsers}
//       />
//       <MessagesModal
//         visible={messagesModalVisible}
//         onClose={() => setMessagesModalVisible(false)}
//         messages={messages}
//       />
//       <GiftsModal visible={giftsModalVisible} onClose={() => setGiftsModalVisible(false)} gifts={gifts} />
//       <LiveOptionsModal
//         visible={liveOptionModalVisible}
//         onClose={() => setLiveOptionModalVisible(false)}
//         isFront={isFront}
//         onPress={onPress}
//       />
//       <UserBroadCastWaitingModal
//         visible={broadCastWaitingModalVisible}
//         onClose={() => setBroadCastWaitingModalVisible(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   chatInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: lightBackground,
//     borderRadius: 100,
//     padding: 8,
//   },
//   chatInput: {
//     // flex: 1,
//     color: customColors.white,
//     fontSize: scaleFont(14),
//     paddingHorizontal: 10,
//   },
//   sendButton: {
//     padding: 8,
//   },
// });

// export default safasdf;