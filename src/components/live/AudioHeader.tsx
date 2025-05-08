import { defaultPadding, scaleFont, scaleHeight, scaleWidth } from "@/constants/scaling";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ZegoUser } from "zego-express-engine-reactnative";

interface AudioRoomHeaderProps {
  roomID: string;
  connectedUsers: number;
  onBackPress: () => void;
  roomUser?: ZegoUser; // Changed from ZegoUser[] to optional single user
}

const AudioRoomHeader: React.FC<AudioRoomHeaderProps> = ({ 
  roomID, 
  connectedUsers, 
  onBackPress,
  roomUser 
}) => {

  // console.log('AudioRoomHeader', roomUser, connectedUsers, roomID);
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.profileBadge}>
          <Image
            source={require('@/assets/images/icon/p2.png')}
            style={styles.profileIcon}
          />
        </View>
        <View>
          <Text style={styles.headerName}>{roomUser?.userName || 'Host'}</Text>
          <Text style={styles.headerText}>ID: {roomUser?.userID || roomID}</Text>
        </View>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.userCountButton}>
          <Icon name="person" size={scaleWidth(20)} color="#fff" />
          <Text style={styles.userCountText}>{connectedUsers}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBackPress} style={styles.closeButton}>
          <Icon name="close" size={scaleWidth(24)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AudioRoomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: defaultPadding,
    paddingVertical: scaleHeight(10),
  },
  headerName: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBadge: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    backgroundColor: '#999',
    marginRight: scaleWidth(8),
    overflow: 'hidden',
  },
  profileIcon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
  },
  headerText: {
    color: '#fff',
    fontSize: scaleFont(14),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCountButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: scaleWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(6),
    marginRight: scaleWidth(12),
  },
  userCountText: {
    color: '#fff',
    marginLeft: scaleWidth(4),
    fontSize: scaleFont(14),
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: scaleWidth(20),
    padding: scaleWidth(6),
  },
});