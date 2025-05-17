import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleHeight, scaleWidth } from '@/constants/scaling'; // Assuming this is your scaling utility

interface SeatLayoutProps {
  room: { users: any[]; seats: number } | null;
  handleSeatPress: (seatIndex: number) => void;
}

const AudienceSeatLayout: React.FC<SeatLayoutProps> = ({ room, handleSeatPress }) => {
  const renderSeat = (user: any | null, seatIndex: number) => {
    const isOccupied = !!user;

    return (
      <TouchableOpacity
        style={{
          width: scaleWidth(70), // Fixed width to match SeatLayout
          height: scaleHeight(100), // Fixed height to accommodate all elements
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: 8,
          opacity: room === null ? 0.5 : 1,
        }}
        onPress={() => handleSeatPress(seatIndex)}
        disabled={room === null}
      >
        {/* Avatar container */}
        <View
          style={{
            width: scaleWidth(70),
            height: scaleWidth(70),
            borderRadius: 100,
            backgroundColor: isOccupied ? '#e0e0e0' : '#f0f0f0',
            borderWidth: 3,
            borderColor: isOccupied ? '#6200ea' : '#ccc',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {isOccupied ? (
            <Image
              source={{
                uri: user?.userProfile || 'https://via.placeholder.com/50',
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 40,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/images/liveaudio/seat.png')} // Ensure this asset exists
              style={{
                width: scaleWidth(40),
                height: scaleWidth(40),
                borderRadius: 20,
              }}
            />
          )}
        </View>

        {/* Mic status indicator */}
        {isOccupied && (
          <View
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: user.mic ? '#00c853' : '#d32f2f',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              zIndex: 100,
            }}
          >
            <MaterialCommunityIcons
              name={user.mic ? 'microphone' : 'microphone-off'}
              size={16}
              color="#fff"
            />
          </View>
        )}

        {/* User info container */}
        <View
          style={{
            height: 70,
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 8,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: '#333',
              textAlign: 'center',
              maxWidth: 100,
            }}
          >
            {isOccupied ? user.userName : `Seat ${seatIndex + 1}`}
          </Text>

          {/* Host and Co-host badges */}
          {isOccupied && user.isHost && (
            <View
              style={{
                backgroundColor: '#FF4500',
                borderRadius: 5,
                paddingHorizontal: 4,
                paddingVertical: 2,
                marginTop: 4,
              }}
            >
              <Text style={{ fontSize: 8, color: '#fff', fontWeight: '600' }}>Host</Text>
            </View>
          )}
          {isOccupied && user.isCohost && !user.isHost && (
            <View
              style={{
                backgroundColor: '#FFD700',
                borderRadius: 5,
                paddingHorizontal: 4,
                paddingVertical: 2,
                marginTop: 4,
              }}
            >
              <Text style={{ fontSize: 8, color: '#333', fontWeight: '600' }}>Co-host</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeatGrid = () => {
    const seats = room?.seats;
    const users = (room?.users || []).filter((user) => user.isCohost === true || user.isHost === true);

    const seatAssignments = Array(seats)
      .fill(null)
      .map((_, index) => {
        return users.find((u) => u.seat === index + 1) || null;
      });

    return (
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        {/* Top row - 2 seats */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
          {seatAssignments.slice(0, 2).map((user, index) => renderSeat(user, index))}
        </View>

        {/* Middle row(s) - 4 seats each */}
        {seatAssignments.slice(2).length > 0 && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
            {seatAssignments.slice(2, 6).map((user, index) => renderSeat(user, index + 2))}
          </View>
        )}
        {seatAssignments.slice(6).length > 0 && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
            {seatAssignments.slice(6, 10).map((user, index) => renderSeat(user, index + 6))}
          </View>
        )}
        {seatAssignments.slice(10).length > 0 && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
            {seatAssignments.slice(10, 14).map((user, index) => renderSeat(user, index + 10))}
          </View>
        )}
      </View>
    );
  };

  return <View style={{ width: '100%' }}>{renderSeatGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export default AudienceSeatLayout;