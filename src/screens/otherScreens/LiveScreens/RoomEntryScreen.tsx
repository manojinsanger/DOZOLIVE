import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { redirect } from '@/utils/navigationService';

export default function RoomEntryScreen() {
  const [roomID, setRoomID] = useState('');
  const [userName, setUserName] = useState('');
  
  // Generate a random user ID
  const userID = generateRandomString(8);
  
  const startLiveStream = () => {
    // If no room ID is provided, generate one
    const finalRoomID = roomID || generateRandomString(6);
    
    redirect('audioscreen', {
      isHost: true,
      roomID: finalRoomID,
      userID: userID,
      userName: userName || 'Host',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zego Live Streaming</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Room ID"
        value={roomID}
        onChangeText={setRoomID}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={userName}
        onChangeText={setUserName}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Start as Host" onPress={startLiveStream} />
        {/* <Button title="Join as Audience" onPress={joinAsAudience} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

function alert(arg0: string) {
    throw new Error('Function not implemented.');
}
function generateRandomString(arg0: number) {
  throw new Error('Function not implemented.');
}

