import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import { useAuth } from '@/context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import { redirect } from '@/utils/navigationService';

const CreateRoomScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  
  const [roomName, setRoomName] = useState(`${user?.name}'s Room`);
  const [roomDescription, setRoomDescription] = useState('');
  const [seatCount, setSeatCount] = useState(6);
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');
  const [isSeatLocked, setIsSeatLocked] = useState(false);

  const handleCreateRoom = () => {
    redirect('AudioRoom', {
      roomConfig: {
        roomName,
        roomDescription,
        seatCount,
        isPrivate,
        password,
        isSeatLocked,
        isHost: true
      }
    });
  };

  return (
    <LinearGradient
      colors={['#6c3cb4', '#1e3b70']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={scaleWidth(20)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Audio Room</Text>
          <View style={{ width: scaleWidth(20) }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Room Name</Text>
            <TextInput
              style={styles.input}
              value={roomName}
              onChangeText={setRoomName}
              placeholder="Enter room name"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Room Description</Text>
            <TextInput
              style={[styles.input, { height: scaleHeight(80) }]}
              value={roomDescription}
              onChangeText={setRoomDescription}
              placeholder="Enter room description"
              placeholderTextColor="#aaa"
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Number of Seats (2-8)</Text>
            <View style={styles.seatCountContainer}>
              {[2, 4, 6, 8].map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.seatCountButton,
                    seatCount === count && styles.selectedSeatCount
                  ]}
                  onPress={() => setSeatCount(count)}
                >
                  <Text style={styles.seatCountText}>{count}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Private Room</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isPrivate ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          {isPrivate && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#aaa"
                secureTextEntry
              />
            </View>
          )}

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Lock Seats (Requires Host Approval)</Text>
            <Switch
              value={isSeatLocked}
              onValueChange={setIsSeatLocked}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isSeatLocked ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
          <Text style={styles.createButtonText}>Create Room</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(15),
  },
  headerTitle: {
    color: '#fff',
    fontSize: scaleFont(18),
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(20),
  },
  inputContainer: {
    marginBottom: scaleHeight(20),
  },
  label: {
    color: '#fff',
    fontSize: scaleFont(14),
    marginBottom: scaleHeight(8),
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: scaleWidth(8),
    padding: scaleWidth(12),
    color: '#fff',
    fontSize: scaleFont(14),
  },
  seatCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(10),
  },
  seatCountButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: scaleWidth(60),
    height: scaleWidth(60),
    borderRadius: scaleWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSeatCount: {
    backgroundColor: '#6c3cb4',
    borderWidth: 2,
    borderColor: '#fff',
  },
  seatCountText: {
    color: '#fff',
    fontSize: scaleFont(18),
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(20),
  },
  createButton: {
    backgroundColor: '#6c3cb4',
    marginHorizontal: scaleWidth(20),
    marginBottom: scaleHeight(20),
    borderRadius: scaleWidth(8),
    padding: scaleHeight(15),
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});

export default CreateRoomScreen;