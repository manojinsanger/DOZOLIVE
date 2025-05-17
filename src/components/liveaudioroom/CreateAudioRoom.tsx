import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface CreateAudioRoomProps {
  roomId: string;
  roomTitle: string;
  setRoomTitle: (value: string) => void;
  selectedSeats: number;
  setSelectedSeats: (value: number) => void;
  isRoomLocked: boolean;
  setIsRoomLocked: (value: boolean) => void;
  onCreateRoom: () => void;
  isLoading: boolean;
}

const CreateAudioRoom: React.FC<CreateAudioRoomProps> = ({
  roomId,
  roomTitle,
  setRoomTitle,
  selectedSeats,
  setSelectedSeats,
  isRoomLocked,
  setIsRoomLocked,
  onCreateRoom,
  isLoading,
}) => {
  const seatOptions = [10, 14];

  // Handle room title input
  const handleTitleChange = useCallback(
    (text: string) => {
      setRoomTitle(text);
    },
    [setRoomTitle]
  );

  // Render seat option buttons
  const renderSeatOption = useCallback(
    ({ seats }: { seats: number }) => (
      <TouchableOpacity
        style={[styles.seatOption, selectedSeats === seats && styles.selectedSeat]}
        onPress={() => setSelectedSeats(seats)}
      >
        <View style={styles.seatContent}>
          <MaterialCommunityIcons
            name="account-group"
            size={22}
            color={selectedSeats === seats ? '#FFFFFF' : '#B39DDB'}
          />
          <Text style={[styles.seatText, selectedSeats === seats && styles.selectedSeatText]}>
            {seats} Seats
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [selectedSeats]
  );

  // Memoized seat options rendering
  const seatOptionsRender = useMemo(
    () =>
      seatOptions.map((seats) => (
        <React.Fragment key={seats}>{renderSeatOption({ seats })}</React.Fragment>
      )),
    [renderSeatOption]
  );

  // Header component
  const Header = React.memo(() => (
    <Animated.View style={styles.headerContainer}>
      <Text style={styles.title}>Create Audio Room</Text>
      <Text style={styles.subtitle}>Connect with your audience in real-time</Text>
    </Animated.View>
  ));

  return (
    <LinearGradient
      colors={['#170B43', '#311B92', '#4527A0']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.8, y: 0.9 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.formContainer}>
          <Text style={styles.label}>Room Title</Text>
          <TextInput
            style={styles.input}
            value={roomTitle}
            onChangeText={handleTitleChange}
            placeholder="Give your room an engaging title..."
            maxLength={30}
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          <Text style={styles.charCount}>{roomTitle.length}/30</Text>

          <Text style={styles.label}>Seat Capacity</Text>
          <View style={styles.seatOptionsContainer}>{seatOptionsRender}</View>

          <View style={styles.divider} />

          <View style={styles.switchContainer}>
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchLabel}>Lock Room</Text>
              <Text style={styles.switchDescription}>Require host approval to join</Text>
            </View>
            <TouchableOpacity
              style={[styles.switch, isRoomLocked ? styles.switchOn : styles.switchOff]}
              onPress={() => setIsRoomLocked(!isRoomLocked)}
            >
              <View style={[styles.switchToggle, isRoomLocked && styles.switchToggleOn]}>
                <MaterialCommunityIcons
                  name={isRoomLocked ? 'lock' : 'lock-open-variant'}
                  size={16}
                  color={isRoomLocked ? '#fff' : '#311B92'}
                />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.createButton, !roomTitle.trim() && styles.createButtonDisabled]}
            onPress={onCreateRoom}
            disabled={!roomTitle.trim() || isLoading}
          >
            <LinearGradient
              colors={roomTitle.trim() ? ['#6200EA', '#3700B3'] : ['#9E9E9E', '#757575']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButtonGradient}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.createButtonText}>Launch Room</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <BlurView style={styles.blurView} blurType="dark" blurAmount={5} />
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator size="large" color="#6200EA" />
            <Text style={styles.loadingText}>Creating your audio room...</Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#B39DDB',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#E1BEE7',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  charCount: {
    fontSize: 12,
    color: '#B39DDB',
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 16,
  },
  seatOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  seatOption: {
    width: '48%',
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSeat: {
    backgroundColor: '#6200EA',
    borderColor: '#9575CD',
  },
  seatContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  selectedSeatText: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 10,
  },
  switchTextContainer: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E1BEE7',
    fontFamily: 'Poppins-Medium',
  },
  switchDescription: {
    fontSize: 14,
    color: '#B39DDB',
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  switch: {
    width: 60,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  switchOff: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  switchOn: {
    backgroundColor: '#6200EA',
  },
  switchToggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  switchToggleOn: {
    transform: [{ translateX: 26 }],
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  createButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingIndicatorContainer: {
    backgroundColor: 'rgba(25, 10, 47, 0.85)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    width: '80%',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default React.memo(CreateAudioRoom);