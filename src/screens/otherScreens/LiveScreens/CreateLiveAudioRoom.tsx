// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useUser } from '@/context/UserProvider';
// import { redirect } from '@/utils/navigationService';

// const CreateAudioRoomScreen = () => {
//     const { userAllDetails } = useUser();
//     const navigation = useNavigation();

//     const [roomTitle, setRoomTitle] = useState('');
//     const [selectedSeats, setSelectedSeats] = useState<number>(8);
//     const [isRoomLocked, setIsRoomLocked] = useState(false);
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);

//     const seatOptions = [4, 8, 12, 16];
//     const roomImages = [
//         require('@/assets/images/agent_banner.png'),
//     ];


//     console.log('User Details:', userAllDetails);
//     const handleCreateRoom = async () => {
//         try {
//             const roomData = {
//                 title: roomTitle,
//                 seats: selectedSeats,
//                 isLocked: isRoomLocked,
//                 hostId: userAllDetails.liveId,
//                 hostName: userAllDetails.name || "dozolive",               
//                 image: "https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//                 createdAt: new Date().toISOString(),
//             };

//             console.log('Room Data:', roomData);

//             // Call API to create room
//             const response = await fetch('http://10.0.2.2:3010/api/live/createaudiolive', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(roomData),
//             });

//             const data = await response.json();

//             console.log('API Response:', data);

//             if (response.ok) {
//             redirect('audioscreen', { roomId: data.roomId });
//             } else {
//                 console.error('Room creation failed:', data.error);
//             }
//         } catch (error) {
//             console.error('Error creating room:', error);
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.title}>Create New Room</Text>

//             <Text style={styles.label}>Room Title</Text>
//             <TextInput
//                 style={styles.input}
//                 value={roomTitle}
//                 onChangeText={setRoomTitle}
//                 placeholder="Enter room title"
//                 maxLength={30}
//             />

//             <Text style={styles.label}>Select Room Image</Text>
//             <View style={styles.imageContainer}>
//                 {roomImages.map((img, index) => (
//                     <TouchableOpacity
//                         key={index}
//                         onPress={() => setSelectedImage(img)}
//                         style={[
//                             styles.imageOption,
//                             selectedImage === img && styles.selectedImage
//                         ]}
//                     >
//                         <Image source={img} style={styles.image} />
//                     </TouchableOpacity>
//                 ))}
//             </View>

//             <Text style={styles.label}>Number of Seats</Text>
//             <View style={styles.seatContainer}>
//                 {seatOptions.map(seats => (
//                     <TouchableOpacity
//                         key={seats}
//                         style={[
//                             styles.seatOption,
//                             selectedSeats === seats && styles.selectedSeat
//                         ]}
//                         onPress={() => setSelectedSeats(seats)}
//                     >
//                         <Text>{seats}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>

//             <View style={styles.switchContainer}>
//                 <Text>Lock Room (Require host approval to join)</Text>
//                 <TouchableOpacity
//                     style={[
//                         styles.switch,
//                         isRoomLocked ? styles.switchOn : styles.switchOff
//                     ]}
//                     onPress={() => setIsRoomLocked(!isRoomLocked)}
//                 >
//                     <View style={styles.switchToggle} />
//                 </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//                 style={styles.createButton}
//                 onPress={handleCreateRoom}
//                 disabled={!roomTitle.trim()}
//             >
//                 <Text style={styles.createButtonText}>Create Room</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         paddingBottom: 50,
//         marginTop: 50,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     label: {
//         fontSize: 16,
//         marginTop: 15,
//         marginBottom: 10,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         padding: 12,
//         fontSize: 16,
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     imageOption: {
//         width: 100,
//         height: 100,
//         borderRadius: 8,
//         overflow: 'hidden',
//         borderWidth: 2,
//         borderColor: 'transparent',
//     },
//     selectedImage: {
//         borderColor: '#007AFF',
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     seatContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     seatOption: {
//         padding: 15,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 70,
//     },
//     selectedSeat: {
//         borderColor: '#007AFF',
//         backgroundColor: '#E6F2FF',
//     },
//     switchContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 30,
//         paddingVertical: 10,
//     },
//     switch: {
//         width: 50,
//         height: 30,
//         borderRadius: 15,
//         justifyContent: 'center',
//         paddingHorizontal: 3,
//     },
//     switchOff: {
//         backgroundColor: '#ccc',
//     },
//     switchOn: {
//         backgroundColor: '#007AFF',
//     },
//     switchToggle: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         backgroundColor: 'white',
//     },
//     createButton: {
//         backgroundColor: '#007AFF',
//         padding: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     createButtonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default CreateAudioRoomScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@/context/UserProvider';
import { redirect } from '@/utils/navigationService';

const CreateAudioRoomScreen = () => {
  const { userAllDetails } = useUser();
  const navigation = useNavigation();

  const [roomTitle, setRoomTitle] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<number>(8);
  const [isRoomLocked, setIsRoomLocked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const seatOptions = [4, 8, 12, 16];
  const roomImages = [
    'https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1698162285308-c9a1a7e8b8d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  ];

  const handleCreateRoom = async () => {
    try {
      if (!roomTitle.trim()) {
        Alert.alert('Please enter a room title');
        return;
      }

      const roomData = {
        title: roomTitle,
        seats: selectedSeats,
        isLocked: isRoomLocked,
        hostId: String(userAllDetails.liveId),
        hostName: userAllDetails.name || 'dozolive',
        hostProfile: userAllDetails.profileImage || '',
        image: selectedImage || roomImages[0],
        tags: [], // Add tag input if needed
        createdAt: new Date().toISOString(),
        specialId: userAllDetails.specialId || '',
        hostLevel: userAllDetails.level || 0,
      };

      console.log('Creating room with data:', roomData);

      const response = await fetch('http://10.0.2.2:3010/api/live/createaudiolive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData),
      });

      const data = await response.json();
      if (response.ok) {
        redirect('audioscreen', { roomId: data.roomId });
      } else {
        Alert.alert(`Room creation failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
      Alert.alert('Failed to create room. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Audio Room</Text>

      <Text style={styles.label}>Room Title</Text>
      <TextInput
        style={styles.input}
        value={roomTitle}
        onChangeText={setRoomTitle}
        placeholder="Enter room title"
        maxLength={30}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Room Image</Text>
      <View style={styles.imageContainer}>
        {roomImages.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedImage(img)}
            style={[styles.imageOption, selectedImage === img && styles.selectedImage]}
          >
            <Image source={{ uri: img }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Number of Seats</Text>
      <View style={styles.seatContainer}>
        {seatOptions.map((seats) => (
          <TouchableOpacity
            key={seats}
            style={[styles.seatOption, selectedSeats === seats && styles.selectedSeat]}
            onPress={() => setSelectedSeats(seats)}
          >
            <Text style={styles.seatText}>{seats}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Lock Room (Requires Host Approval)</Text>
        <TouchableOpacity
          style={[styles.switch, isRoomLocked ? styles.switchOn : styles.switchOff]}
          onPress={() => setIsRoomLocked(!isRoomLocked)}
        >
          <View style={[styles.switchToggle, isRoomLocked ? styles.switchToggleOn : {}]} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.createButton, !roomTitle.trim() && styles.createButtonDisabled]}
        onPress={handleCreateRoom}
        disabled={!roomTitle.trim()}
      >
        <Text style={styles.createButtonText}>Create Room</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageOption: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImage: {
    borderColor: '#007AFF',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  seatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  seatOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    backgroundColor: '#f9f9f9',
  },
  selectedSeat: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F2FF',
  },
  seatText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 3,
    backgroundColor: '#ddd',
  },
  switchOff: {
    backgroundColor: '#ddd',
  },
  switchOn: {
    backgroundColor: '#007AFF',
  },
  switchToggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  switchToggleOn: {
    transform: [{ translateX: 20 }],
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonDisabled: {
    backgroundColor: '#aaa',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default CreateAudioRoomScreen;