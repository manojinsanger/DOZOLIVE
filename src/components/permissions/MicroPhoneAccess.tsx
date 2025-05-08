// import React, { useState, useEffect } from 'react';
// import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { PermissionResponse, useCameraPermissions } from 'expo-camera';
// import { Stack, useRouter } from 'expo-router';
// import CameraImage from '../../assets/images/permisssion/CameraAccess.png'
// import { Audio } from 'expo-av';


// interface CameraAccessProps {
//     requestPermission: () => Promise<PermissionResponse>;
// }
// const MicroPhoneAccess: React.FC<CameraAccessProps> = ({requestPermission}) => {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [permissionResponse, ] = Audio.usePermissions();
//     const router = useRouter();

//     useEffect(() => {
//         const checkPermission = async () => {
//             if (permissionResponse) {
//                 if (permissionResponse.granted) {
//                     setModalVisible(false);
//                 } else {
//                     setModalVisible(true);
//                 }
//             }
//         };
//         checkPermission();
//     }, [permissionResponse]);

//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => { }}
//         >

//             <View style={styles.overlay}>
//                 <View style={styles.modalContainer}>
//                     <Image source={CameraImage} style={{ width: 250, height: 250 }} />
//                     <Text style={styles.title}>Microphone Access (Required)</Text>
//                     <Text style={styles.message}>Please allow access to your Microphone to Host Live or Speak</Text>
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={styles.button} onPress={requestPermission}>
//                             <Text style={styles.buttonText}>Allow</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//                             <Text style={styles.backButtonText}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// export default MicroPhoneAccess;

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',

//     },
//     modalContainer: {
//         width: '80%',
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//         marginVertical: 10,
//     },
//     message: {
//         fontSize: 16,
//         color: '#666',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: '#F1567D',
//         textAlign: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 30,
//         borderRadius: 18,
//     },
//     backButton: {
//         paddingVertical: 10,
//         paddingHorizontal: 35,
//         borderRadius: 18,
//     },
//     backButtonText: {
//         color: '#868C98',
//         fontSize: 14,
//         fontWeight: '400',
//         lineHeight: 18,
//         textAlign: 'center',
//         wordWrap: 'break-word'
//     },
//     buttonText: {
//         color: '#fff',
//         textAlign: 'center',
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     camera: {
//         flex: 1,
//     },
//     buttonContainer: {
//         // flex: 1,
//         flexDirection: 'column',
//         gap: 10,
//         // backgroundColor: 'transparent',
//     },
//     text: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'white',
//     },
// });

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CameraImage from '../../assets/images/permisssion/CameraAccess.png';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { goBack } from '@/utils/navigationService';

const MicroPhoneAccess = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    let result;

    if (Platform.OS === 'android') {
      result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      if (!result) {
        setModalVisible(true);
      }
    } else {
      result = await check(PERMISSIONS.IOS.MICROPHONE);
      if (result !== RESULTS.GRANTED) {
        setModalVisible(true);
      }
    }
  };

  const requestPermission = async () => {
    try {
      let result;

      if (Platform.OS === 'android') {
        result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          setModalVisible(false);
        }
      } else {
        result = await request(PERMISSIONS.IOS.MICROPHONE);
        if (result === RESULTS.GRANTED) {
          setModalVisible(false);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image source={CameraImage} style={{ width: 250, height: 250 }} />
          <Text style={styles.title}>Microphone Access (Required)</Text>
          <Text style={styles.message}>
            Please allow access to your Microphone to Host Live or Speak
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={requestPermission}>
              <Text style={styles.buttonText}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() =>goBack()}>
              <Text style={styles.backButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MicroPhoneAccess;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F1567D',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 18,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 18,
  },
  backButtonText: {
    color: '#868C98',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
});
