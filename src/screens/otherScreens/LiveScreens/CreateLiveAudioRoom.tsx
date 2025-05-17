import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@/context/UserProvider';
import { redirect } from '@/utils/navigationService';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateAudioRoomScreen = () => {
  const { userAllDetails } = useUser();
  const navigation = useNavigation();
  const [roomTitle, setRoomTitle] = useState('');
  const [selectedSeats, setSelectedSeats] = useState(10);
  const [isRoomLocked, setIsRoomLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const seatOptions = [10, 14];
  const roomId = `dozoliveroomcode${userAllDetails.liveId}`;
  const defaultImage = 'https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3';

  const handleCreateRoom = async () => {
    if (!roomTitle.trim()) {
      Alert.alert('Room title required', 'Please enter a title for your audio room');
      return;
    }

    try {
      setIsLoading(true);

      const roomData = {
        roomId: roomId,
        title: roomTitle,
        seats: selectedSeats,
        isLocked: isRoomLocked,
        hostId: String(userAllDetails.liveId || ''),
        hostName: userAllDetails.name || 'dozolive',
        hostProfile: userAllDetails.profileImage || '',
        image: defaultImage,
        tags: [],
        createdAt: new Date().toISOString(),
        specialId: userAllDetails.specialId || '',
        hostLevel: userAllDetails.level || 0,
      };

      const response = await fetch('http://10.0.2.2:3010/api/live/createaudiolive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData),
      });

      const data = await response.json();

      if (response.ok) {
        redirect('audioscreen');
      } else {
        throw new Error(data.error || 'Failed to create room');
      }
    } catch (error: any) {
      console.error('Error creating room:', error);
      Alert.alert(
        'Creation Failed',
        `Unable to create your audio room: ${error.message || 'Please try again later.'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#170B43', '#311B92', '#4527A0']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.8, y: 0.9 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeIn.duration(600)} style={styles.headerContainer}>
            <Text style={styles.title}>Create Audio Room</Text>
            <Text style={styles.subtitle}>Connect with your audience in real-time</Text>
          </Animated.View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Room Title</Text>
            <TextInput
              style={styles.input}
              value={roomTitle}
              onChangeText={setRoomTitle}
              placeholder="Give your room an engaging title..."
              maxLength={30}
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
            <Text style={styles.charCount}>{roomTitle.length}/30</Text>

            <Text style={styles.label}>Seat Capacity</Text>
            <View style={styles.seatOptionsContainer}>
              {seatOptions.map((seats) => (
                <TouchableOpacity
                  key={seats}
                  style={[
                    styles.seatOption,
                    selectedSeats === seats && styles.selectedSeat,
                  ]}
                  onPress={() => setSelectedSeats(seats)}
                >
                  <View style={styles.seatContent}>
                    <MaterialCommunityIcons
                      name="account-group"
                      size={22}
                      color={selectedSeats === seats ? '#FFFFFF' : '#B39DDB'}
                    />
                    <Text
                      style={[
                        styles.seatText,
                        selectedSeats === seats && styles.selectedSeatText,
                      ]}
                    >
                      {seats} Seats
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

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
              onPress={handleCreateRoom}
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
                  <Text style={styles.createButtonText}>
                    Launch Room
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <BlurView
              style={styles.blurView}
              blurType="dark"
              blurAmount={5}
            />
            <View style={styles.loadingIndicatorContainer}>
              <ActivityIndicator size="large" color="#6200EA" />
              <Text style={styles.loadingText}>Creating your audio room...</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
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
    color: '#B39DDB',
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

export default CreateAudioRoomScreen;