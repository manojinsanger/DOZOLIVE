import { defaultPadding, scaleFont, scaleHeight, scaleWidth } from "@/constants/scaling";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SeatInfo {
  userID: string;
  userName: string;
  isSelf: boolean;
  isMuted: boolean;
  profileImage?: string;
}

interface AudioRoomSeatsProps {
  seatInfo: (SeatInfo | null)[];
  onSeatPress: (index: number) => void;
}

const AudioRoomSeats: React.FC<AudioRoomSeatsProps> = ({ seatInfo, onSeatPress }) => {
  // Ensure seatInfo has 10 seats (matching the 10 seats in your layout)
  const seats = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    label: index === 0 ? 'Host' : `No.${index + 1}`,
    isHost: index === 0,
    hasUser: !!seatInfo[index],
    user: seatInfo[index],
  }));

  // Split seats into rows (2, 4, 4)
  const topRow = seats.slice(0, 2);
  const middleRow = seats.slice(2, 6);
  const bottomRow = seats.slice(6, 10);

  const renderSeat = (seat: { id: Key | null | undefined; isHost: boolean; hasUser: boolean; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; user?: SeatInfo | null; index: number }) => (
    <TouchableOpacity
      key={seat.id}
      style={styles.seatContainer}
      onPress={() => onSeatPress(seat.index)}
      disabled={seat.hasUser && !seat.user?.isSelf} // Disable press if seat is taken by another user
    >
      {seat.hasUser ? (
        <View style={styles.hostSeatWrapper}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual user avatar if available
            style={styles.hostAvatar}
          />
          <View style={styles.hostBadge}>
            <Icon
              name={seat.user?.isMuted ? 'mic-off' : 'mic'}
              size={scaleWidth(14)}
              color="#fff"
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptySeat}>
          <Image
            source={require('@/assets/images/live_images/ic_empty_seat.png')}
            style={styles.sofaIcon}
          />
        </View>
      )}
      <Text style={styles.seatLabel}>{seat.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.seatsGridContainer}>
      <View style={styles.topRowContainer}>
        {topRow.map((seat, index) => renderSeat({ ...seat, index }))}
      </View>
      <View style={styles.midRowContainer}>
        {middleRow.map((seat, index) => renderSeat({ ...seat, index: index + 2 }))}
      </View>
      <View style={styles.bottomRowContainer}>
        {bottomRow.map((seat, index) => renderSeat({ ...seat, index: index + 6 }))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seatContainer: {
    alignItems: 'center',
    marginHorizontal: scaleWidth(8),
  },
  hostSeatWrapper: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(35),
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  hostAvatar: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(32.5),
  },
  hostBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF1493',
    borderRadius: scaleWidth(10),
    width: scaleWidth(20),
    height: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySeat: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(35),
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sofaIcon: {
    width: scaleWidth(25),
    height: scaleWidth(25),
  },
  seatLabel: {
    color: '#fff',
    marginTop: scaleHeight(8),
    fontSize: scaleFont(12),
  },
  seatsGridContainer: {
    paddingHorizontal: defaultPadding,
    marginTop: scaleHeight(20),
    alignItems: 'center',
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: scaleHeight(20),
    gap: 30,
  },
  midRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: scaleHeight(20),
  },
  bottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AudioRoomSeats;