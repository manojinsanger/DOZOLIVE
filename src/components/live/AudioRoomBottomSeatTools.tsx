import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

interface SeatInfo {
  userID: string;
  userName: string;
  isSelf: boolean;
  isMuted: boolean;
}

interface AudioBottomTool {
  onHandleBottomSheet: (isVisible: boolean) => void;
  isBottomSheetOpen: boolean;
  onTakeSeat: (seatIndex: number) => void;
  onLeaveSeat: (seatIndex: number) => void;
  seatInfo: (SeatInfo | null)[];
  userID: string;
  onSendCoHostRequest: () => void;
}


const AudioRoomBottomSeatTools: React.FC<AudioBottomTool> = ({
  onHandleBottomSheet,
  isBottomSheetOpen,
  onTakeSeat,
  onLeaveSeat,
  seatInfo,
  userID,
  onSendCoHostRequest,
}) => {
  const [showSeats, setShowSeats] = useState(false);
  const bottomSheetPosition = useRef(new Animated.Value(0)).current;

  // Find the current user's seat index (if any)
  const currentSeatIndex = seatInfo.findIndex(seat => seat?.userID === userID && seat.isSelf);

  useEffect(() => {
    if (isBottomSheetOpen) {
      // Animate the bottom sheet to open from bottom to top
      Animated.timing(bottomSheetPosition, {
        toValue: 0, // Open position (0 is the bottom of the screen)
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate the bottom sheet to close from top to bottom
      Animated.timing(bottomSheetPosition, {
        toValue: 200, // Closed position (200 is off the screen)
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Reset seats visibility when closing the sheet
      setShowSeats(false);
    }
  }, [isBottomSheetOpen]);

  if (!isBottomSheetOpen) return null;

  const handleClose = () => {
    onHandleBottomSheet(false);  // Trigger the bottom sheet closure
  }

  const toggleSeatsVisibility = () => {
    setShowSeats(!showSeats);
  }

  return (
    <TouchableWithoutFeedback onPress={() => onHandleBottomSheet(false)}>
      <View style={styles.bottomSheetContainer}>
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: bottomSheetPosition }],
              },
            ]}
          >
            <View style={styles.bottomSheetHeader}>
              {/* Close Icon */}
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Icon name="close" size={scaleWidth(28)} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSheetHandle} />

            <Text style={styles.sectionTitle}>Room Play</Text>
            <View style={styles.toolsGrid}>

              <TouchableOpacity style={styles.toolButton}>
                <View style={styles.toolIcon}>
                  <Icon name="calculate" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Calculator</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={styles.toolIcon}>
                  <Icon name="card-giftcard" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Lucky Bag</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toolButton}
                onPress={onSendCoHostRequest}
              >
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="emoji-people" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Co-Host</Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.sectionTitle}>Tools</Text>
            <View style={styles.toolsGrid}>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="volume-up" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Voice On</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="card-giftcard" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Gift Effects</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="person" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Applyer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="cleaning-services" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Clean</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="message" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Public Msg</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="music-note" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="photo" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon, styles.activeToolIcon]}>
                  <Icon name="call" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="chat" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Message</Text>
                <View style={styles.toolNotificationDot} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.toolButton}>
                <View style={[styles.toolIcon, styles.circleToolIcon]}>
                  <Icon name="share" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Share</Text>
              </TouchableOpacity>

              {/* Single Seat Management Icon */}
              <TouchableOpacity
                style={styles.toolButton}
                onPress={toggleSeatsVisibility}
              >
                <View style={[styles.toolIcon, styles.circleToolIcon, currentSeatIndex !== -1 ? styles.seatTakenIcon : null]}>
                  <Icon name="chair" size={scaleWidth(24)} color="#fff" />
                </View>
                <Text style={styles.toolLabel}>Seats</Text>
              </TouchableOpacity>
            </View>

            {/* Seat Management Section - Only show when showSeats is true */}
            {showSeats && (
              <>
                <Text style={styles.sectionTitle}>Seat Management</Text>
                <View style={styles.toolsGrid}>
                  {currentSeatIndex !== -1 ? (
                    <TouchableOpacity
                      style={styles.toolButton}
                      onPress={() => onLeaveSeat(currentSeatIndex)}
                    >
                      <View style={[styles.toolIcon, styles.circleToolIcon, styles.leaveIcon]}>
                        <Icon name="exit-to-app" size={scaleWidth(24)} color="#fff" />
                      </View>
                      <Text style={styles.toolLabel}>Leave Seat</Text>
                    </TouchableOpacity>
                  ) : (
                    Array.from({ length: 10 }, (_, index) => (
                      !seatInfo[index] && (
                        <TouchableOpacity
                          key={index}
                          style={styles.toolButton}
                          onPress={() => onTakeSeat(index)}
                        >
                          <View style={[styles.toolIcon, styles.circleToolIcon]}>
                            <Icon name="person-add" size={scaleWidth(24)} color="#fff" />
                          </View>
                          <Text style={styles.toolLabel}>Take Seat {index + 1}</Text>
                        </TouchableOpacity>
                      )
                    ))
                  )}
                </View>
              </>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AudioRoomBottomSeatTools;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    
  },
  bottomSheet: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderTopLeftRadius: scaleWidth(24),
    borderTopRightRadius: scaleWidth(24),
    padding: scaleWidth(16),
    paddingBottom: scaleHeight(32),
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: scaleHeight(8),
  },
  closeButton: {
    padding: scaleWidth(8),
  },
  bottomSheetHandle: {
    width: scaleWidth(40),
    height: scaleHeight(5),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: scaleWidth(5),
    alignSelf: 'center',
    marginBottom: scaleHeight(16),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(16),
    // marginTop: scaleHeight(8),
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: scaleHeight(16),
  },
  toolButton: {
    width: '20%', // 5 tools per row
    alignItems: 'center',
    marginBottom: scaleHeight(16),
    position: 'relative',
  },
  toolIcon: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    backgroundColor: '#1e88e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleHeight(8),
  },
  circleToolIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activeToolIcon: {
    backgroundColor: '#4CAF50',
  },
  seatTakenIcon: {
    backgroundColor: '#FFA500', // Orange color to indicate user has a seat
  },
  leaveIcon: {
    backgroundColor: '#F44336', // Red color for leave seat button
  },
  toolLabel: {
    color: '#fff',
    fontSize: scaleFont(12),
  },
  toolNotificationDot: {
    position: 'absolute',
    top: scaleHeight(8),
    right: scaleWidth(25),
    width: scaleWidth(8),
    height: scaleWidth(8),
    borderRadius: scaleWidth(4),
    backgroundColor: 'red',
  },
});