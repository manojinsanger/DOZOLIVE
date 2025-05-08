// import React, { useEffect, useState, useRef } from 'react';
// import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Camera, useCameraDevices, CameraDevice } from 'react-native-vision-camera';

// export default function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');

//   const devices = useCameraDevices();
//   const cameraRef = useRef<Camera>(null);

//   // Safely extract the device
//   const device: CameraDevice | undefined =
//     cameraPosition === 'front' ? devices.front : devices.back;

//   useEffect(() => {
//     const requestPermission = async () => {
//       let permissionGranted = false;

//       if (Platform.OS === 'android') {
//         const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
//         permissionGranted = result === PermissionsAndroid.RESULTS.GRANTED;
//       } else {
//         const status = await Camera.requestCameraPermission();
//         permissionGranted = status === 'granted'; // ✅ use "granted", not "authorized"
//       }

//       setHasPermission(permissionGranted);
//     };

//     requestPermission();
//   }, []);

//   const toggleCamera = () => {
//     setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
//   };

//   if (!device || !hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>Requesting camera access...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={cameraRef}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//       />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={toggleCamera}>
//           <Text style={styles.text}>Flip Camera</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   message: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: 'white',
//     marginTop: 20,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 50,
//     width: '100%',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#000000aa',
//     padding: 12,
//     borderRadius: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//   },
// });
