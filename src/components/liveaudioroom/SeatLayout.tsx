import { scaleHeight, scaleWidth } from '@/constants/scaling';
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SeatLayout = ({
  room,
  roomId,
  userId,
  changeSeat,
  handleToggleMic,
  handleKickUser,
  handleChangeSeat,
}: {
  room: any;
  roomId: any;
  userId: any;
  changeSeat: any;
  handleToggleMic: any;
  handleKickUser: any;
  handleChangeSeat: any;
}) => {
  // Render individual seat component with fixed dimensions to prevent layout shifts
  const renderSeat = (user: any, seatIndex: any) => {
    const isOccupied = !!user;
    const currentUser = room?.users.find((u: any) => u.id === userId);
    const canChangeSeat = currentUser?.isCohost || currentUser?.isHost;
    const isHost = currentUser?.isHost;

    return (
      <TouchableOpacity
        style={{
          width: scaleWidth(70), // Fixed width to prevent layout shifts
          height: scaleHeight(100), // Fixed height to accommodate all elements
          alignItems: 'center',
          justifyContent: 'flex-start',
          margin: 8,
          opacity: room === null ? 0.5 : 1,
        }}
        onPress={() => {
          if (!canChangeSeat) {
            Alert.alert('Permission Denied', 'You must be a co-host or host to change seats.');
            return;
          }
          const targetSeat = seatIndex + 1;
          const isSeatOccupied = room?.users.some((u: any) => u.seat === targetSeat);
          if (isSeatOccupied) {
            handleChangeSeat(user);
          } else {
            changeSeat(roomId, userId, targetSeat);
            Alert.alert('Success', `Moved to Seat ${targetSeat}`);
          }
        }}
        disabled={room === null}
      >
        {/* Avatar container with fixed position for mic indicator */}
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
              source={require('../../assets/images/liveaudio/seat.png')}
              style={{
                width: scaleWidth(40),
                height: scaleWidth(40),
                borderRadius: 20,
              }}
            />
          )}
        </View>

        {/* Mic status indicator (positioned absolutely to prevent layout shifts) */}
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

        {/* User info container with fixed height to prevent layout shifts */}
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
        </View>

        {/* Control buttons with fixed layout */}
        {isOccupied && isHost && !user.isHost && user.isCohost && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 6,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: user.mic ? '#d32f2f' : '#00c853',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}
              onPress={() => handleToggleMic(user.id, user.mic)}
            >
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>
                {user.mic ? 'Mute' : 'Unmute'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#b0bec5',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}
              onPress={() => handleKickUser(user.id)}
            >
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>
                Kick
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Render seats in a visually appealing grid layout
  const renderSeatGrid = () => {
    const seats = room?.seats;
    const users = (room?.users || []).filter(
      (user: any) => user.isCohost === true || user.isHost === true
    );

    const seatAssignments = Array(seats)
      .fill(null)
      .map((_, index) => {
        return users.find((u: any) => u.seat === index + 1) || null;
      });

    // Create more natural circular seating arrangement
    return (
      <View style={{ alignItems: 'center', paddingVertical: 10 }}>
        {/* Top row - 2 seats */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
          {seatAssignments.slice(0, 2).map((user, index) => renderSeat(user, index))}
        </View>

        {/* Middle row - 4 seats */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
          {seatAssignments.slice(2, 6).map((user, index) => renderSeat(user, index + 2))}
        </View>

        {/* Bottom row - 2 seats */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {seatAssignments.slice(6, 10).map((user, index) => renderSeat(user, index + 6))}
        </View>
        {/* Bottom row - 2 seats */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {seatAssignments.slice(10, 14).map((user, index) => renderSeat(user, index + 10))}
        </View>
      </View>
    );
  };

  return <View style={{ width: '100%' }}>{renderSeatGrid()}</View>;
};

// Styles
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
};

export default SeatLayout;