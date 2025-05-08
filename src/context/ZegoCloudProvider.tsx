// import React, { createContext, useEffect, useState, useCallback } from 'react';
// import {
//     PermissionsAndroid,
//     Platform,
//     findNodeHandle,
// } from 'react-native';
// import ZegoExpressEngine, {
//     ZegoScenario,
//     ZegoPublishChannel,
//     ZegoViewMode,
// } from 'zego-express-engine-reactnative';

// const appID = 1765360767;
// const appSign = '7cc84f08e3c019dc4c2c7f47f53cc8d691e1870e50abf43b923585473bdc2190';

// interface ZegoContextType {
//     zegoInstance: ZegoExpressEngine | null;
//     initEngine: () => Promise<void>;
//     destroyEngine: () => Promise<void>;
//     requestPermissions: () => Promise<boolean>;
//     startPreview: (ref: any) => Promise<void>;
//     stopPreview: () => Promise<void>;
//     toggleCamera: (isFront: boolean) => Promise<void>;
//     toggleMic: (isMicOn: boolean) => Promise<void>;
//     startPublishingStream: (streamID: string) => Promise<void>;
//     error: string | null;
// }

// export const ZegoContext = createContext<ZegoContextType>({
//     zegoInstance: null,
//     initEngine: async () => {},
//     destroyEngine: async () => {},
//     requestPermissions: async () => false,
//     startPreview: async () => {},
//     stopPreview: async () => {},
//     toggleCamera: async () => {},
//     toggleMic: async () => {},
//     startPublishingStream: async () => {},
//     error: null,
// });

// export const ZegoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [zegoInstance, setZegoInstance] = useState<ZegoExpressEngine | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     const initEngine = useCallback(async () => {
//         try {
//             const instance = await ZegoExpressEngine.createEngineWithProfile({
//                 appID,
//                 appSign,
//                 scenario: ZegoScenario.General,
//             });
//             setZegoInstance(instance);
//             if (Platform.OS === 'android') {
//                 await requestPermissions();
//             }
//         } catch (err: any) {
//             console.error('Zego init error:', err);
//             setError(err.message);
//         }
//     }, []);

//     const destroyEngine = useCallback(async () => {
//         if (zegoInstance) {
//             await ZegoExpressEngine.destroyEngine();
//             setZegoInstance(null);
//         }
//     }, [zegoInstance]);

//     const requestPermissions = useCallback(async () => {
//         const permissions = [
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ];
//         const results = await PermissionsAndroid.requestMultiple(permissions);
//         const allGranted = Object.values(results).every(status => status === 'granted');
//         if (!allGranted) {
//             setError('Camera or microphone permission denied');
//             return false;
//         }
//         return true;
//     }, []);

//     const startPreview = useCallback(
//         async (ref: any) => {
//             if (!zegoInstance || !ref) return;
//             try {
//                 const reactTag = findNodeHandle(ref.current);
//                 if (!reactTag) throw new Error('Invalid preview ref');
//                 console.log('ReactTag:', reactTag);
//                 await zegoInstance.startPreview(
//                     { reactTag, viewMode: ZegoViewMode.ScaleToFill, backgroundColor: 0 },
//                     ZegoPublishChannel.Main
//                 );
//             } catch (err: any) {
//                 console.error('Preview error:', err);
//                 setError(err.message);
//             }
//         },
//         [zegoInstance]
//     );

//     const stopPreview = useCallback(async () => {
//         if (zegoInstance) {
//             await zegoInstance.stopPreview(ZegoPublishChannel.Main);
//         }
//     }, [zegoInstance]);

//     const toggleCamera = useCallback(
//         async (isFront: boolean) => {
//             if (zegoInstance) {
//                 try {
//                     await zegoInstance.useFrontCamera(isFront, ZegoPublishChannel.Main);
//                 } catch (err) {
//                     console.error('Failed to toggle camera:', err);
//                     setError('Failed to toggle camera');
//                 }
//             }
//         },
//         [zegoInstance]
//     );

//     const toggleMic = useCallback(
//         async (isMicOn: boolean) => {
//             if (zegoInstance) {
//                 try {
//                     await zegoInstance.muteMicrophone(isMicOn);
//                 } catch (err) {
//                     console.error('Failed to toggle mic:', err);
//                     setError('Failed to toggle mic');
//                 }
//             }
//         },
//         [zegoInstance]
//     );

//     const startPublishingStream = useCallback(
//         async (streamID: string) => {
//             if (zegoInstance) {
//                 try {
//                     await zegoInstance.startPublishingStream(
//                         streamID,
//                         ZegoPublishChannel.Main,
//                         undefined
//                     );
//                 } catch (err: any) {
//                     console.error('Failed to start live stream:', err);
//                     setError(err.message);
//                 }
//             }
//         },
//         [zegoInstance]
//     );

//     useEffect(() => {
//         initEngine();
//         return () => {
//             destroyEngine();
//         };
//     }, [initEngine, destroyEngine]);

//     return (
//         <ZegoContext.Provider
//             value={{
//                 zegoInstance,
//                 initEngine,
//                 destroyEngine,
//                 requestPermissions,
//                 startPreview,
//                 stopPreview,
//                 toggleCamera,
//                 toggleMic,
//                 startPublishingStream,
//                 error,
//             }}
//         >
//             {children}
//         </ZegoContext.Provider>
//     );
// };




// import React, { createContext, useEffect, useState, useCallback } from 'react';
// import {
//     PermissionsAndroid,
//     Platform,
//     findNodeHandle,
// } from 'react-native';
// import ZegoExpressEngine, {
//     ZegoScenario,
//     ZegoPublishChannel,
//     ZegoViewMode,
// } from 'zego-express-engine-reactnative';

// const appID = 1765360767;
// const appSign = '7cc84f08e3c019dc4c2c7f47f53cc8d691e1870e50abf43b923585473bdc2190';

// interface ZegoContextType {
//     zegoInstance: ZegoExpressEngine | null;
//     initEngine: () => Promise<void>;
//     destroyEngine: () => Promise<void>;
//     requestPermissions: () => Promise<boolean>;
//     startPreview: (ref: any) => Promise<void>;
//     stopPreview: () => Promise<void>;
//     toggleCamera: (isFront: boolean) => Promise<void>;
//     toggleMic: (isMicOn: boolean) => Promise<void>;
//     startPublishingStream: (streamID: string) => Promise<void>;
//     loginRoom: (roomID: string, userID: string, userName: string) => Promise<void>;
//     logoutRoom: (roomID: string) => Promise<void>;
//     error: string | null;
// }

// export const ZegoContext = createContext<ZegoContextType>({
//     zegoInstance: null,
//     initEngine: async () => { },
//     destroyEngine: async () => { },
//     requestPermissions: async () => false,
//     startPreview: async () => { },
//     stopPreview: async () => { },
//     toggleCamera: async () => { },
//     toggleMic: async () => { },
//     startPublishingStream: async () => { },
//     loginRoom: async () => { },
//     logoutRoom: async () => { },
//     error: null,
// });

// export const ZegoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [zegoInstance, setZegoInstance] = useState<ZegoExpressEngine | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     const initEngine = useCallback(async () => {
//         try {
//             const instance = await ZegoExpressEngine.createEngineWithProfile({
//                 appID,
//                 appSign,
//                 scenario: ZegoScenario.General,
//             });
//             setZegoInstance(instance);
//             if (Platform.OS === 'android') {
//                 await requestPermissions();
//             }
//         } catch (err: any) {
//             console.error('Zego init error:', err);
//             setError(err.message);
//         }
//     }, []);

//     const destroyEngine = useCallback(async () => {
//         if (zegoInstance) {
//             await ZegoExpressEngine.destroyEngine();
//             setZegoInstance(null);
//         }
//     }, [zegoInstance]);

//     const requestPermissions = useCallback(async () => {
//         const permissions = [
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ];
//         const results = await PermissionsAndroid.requestMultiple(permissions);
//         const allGranted = Object.values(results).every(status => status === 'granted');
//         if (!allGranted) {
//             setError('Camera or microphone permission denied');
//             return false;
//         }
//         return true;
//     }, []);

//     const startPreview = useCallback(
//         async (ref: any) => {
//             if (!zegoInstance || !ref) return;
//             try {
//                 const reactTag = findNodeHandle(ref.current);
//                 if (!reactTag) throw new Error('Invalid preview ref');
//                 console.log('ReactTag:', reactTag);
//                 await zegoInstance.startPreview(
//                     { reactTag, viewMode: ZegoViewMode.ScaleToFill, backgroundColor: 0 },
//                     ZegoPublishChannel.Main
//                 );
//             } catch (err: any) {
//                 console.error('Preview error:', err);
//                 setError(err.message);
//             }
//         },
//         [zegoInstance]
//     );

//     const stopPreview = useCallback(async () => {
//         if (zegoInstance) {
//             await zegoInstance.stopPreview(ZegoPublishChannel.Main);
//         }
//     }, [zegoInstance]);

//     const toggleCamera = useCallback(
//         async (isFront: boolean) => {
//             if (zegoInstance) {
//                 try {
//                     await zegoInstance.useFrontCamera(isFront, ZegoPublishChannel.Main);
//                 } catch (err) {
//                     console.error('Failed to toggle camera:', err);
//                     setError('Failed to toggle camera');
//                 }
//             }
//         },
//         [zegoInstance]
//     );

//     const toggleMic = useCallback(
//         async (isMicOn: boolean) => {
//             if (zegoInstance) {
//                 try {
//                     await zegoInstance.muteMicrophone(isMicOn);
//                 } catch (err) {
//                     console.error('Failed to toggle mic:', err);
//                     setError('Failed to toggle mic');
//                 }
//             }
//         },
//         [zegoInstance]
//     );

//     const startPublishingStream = useCallback(
//         async (streamID: string) => {
//             if (zegoInstance) {
//                 try {
//                     await zegoInstance.startPublishingStream(
//                         streamID,
//                         ZegoPublishChannel.Main,
//                         undefined
//                     );
//                 } catch (err: any) {
//                     console.error('Failed to start live stream:', err);
//                     setError(err.message);
//                 }
//             }
//         },
//         [zegoInstance]
//     );

//     const loginRoom = useCallback(
//         async (roomID: string, userID: string, userName: string) => {
//             if (!zegoInstance) {
//                 console.warn('Zego instance not ready for loginRoom');
//                 return;
//             }
//             try {
//                 const user = { userID, userName };
//                 // Pass an empty config object (undefined is also fine) as the third argument
//                 await zegoInstance.loginRoom(roomID, user, undefined);
//                 console.log(`Joined room: ${roomID}`);
//             } catch (err: any) {
//                 console.error('Failed to login to room:', err);
//                 setError(err.message);
//             }
//         },
//         [zegoInstance]
//     );


//     const logoutRoom = useCallback(
//         async (roomID: string) => {
//             if (!zegoInstance) {
//                 console.warn('Zego instance not ready for logoutRoom');
//                 return;
//             }
//             try {
//                 // Ensure you pass the correct roomID when logging out
//                 await zegoInstance.logoutRoom(roomID);
//                 console.log(`Logged out from room: ${roomID}`);
//             } catch (err: any) {
//                 console.error('Failed to logout from room:', err);
//                 setError(err.message);
//             }
//         },
//         [zegoInstance]
//     );


//     useEffect(() => {
//         initEngine();
//         return () => {
//             destroyEngine();
//         };
//     }, [initEngine, destroyEngine]);

//     return (
//         <ZegoContext.Provider
//             value={{
//                 zegoInstance,
//                 initEngine,
//                 destroyEngine,
//                 requestPermissions,
//                 startPreview,
//                 stopPreview,
//                 toggleCamera,
//                 toggleMic,
//                 startPublishingStream,
//                 loginRoom,
//                 logoutRoom,
//                 error,
//             }}
//         >
//             {children}
//         </ZegoContext.Provider>
//     );
// };
import React, { createContext, useEffect, useState, useCallback } from 'react';
import {
    PermissionsAndroid,
    Platform,
    findNodeHandle,
} from 'react-native';
import ZegoExpressEngine, {
    ZegoScenario,
    ZegoPublishChannel,
    ZegoViewMode,
    ZegoUser,
} from 'zego-express-engine-reactnative';

const appID = 1765360767;
const appSign = '7cc84f08e3c019dc4c2c7f47f53cc8d691e1870e50abf43b923585473bdc2190';

interface ZegoContextType {
    zegoInstance: ZegoExpressEngine | null;
    users: ZegoUser[]; // List of users in the room
    messages: any[]; // List of received messages
    initEngine: () => Promise<void>;
    destroyEngine: () => Promise<void>;
    requestPermissions: () => Promise<boolean>;
    startPreview: (ref: any) => Promise<void>;
    stopPreview: () => Promise<void>;
    toggleCamera: (isFront: boolean) => Promise<void>;
    toggleMic: (isMicOn: boolean) => Promise<void>;
    startPublishingStream: (streamID: string) => Promise<void>;
    loginRoom: (roomID: string, userID: string, userName: string) => Promise<void>;
    logoutRoom: (roomID: string) => Promise<void>;
    sendMessage: (message: string) => Promise<void>;
    error: string | null;
}

export const ZegoContext = createContext<ZegoContextType>({
    zegoInstance: null,
    users: [],
    messages: [],
    initEngine: async () => {},
    destroyEngine: async () => {},
    requestPermissions: async () => false,
    startPreview: async () => {},
    stopPreview: async () => {},
    toggleCamera: async () => {},
    toggleMic: async () => {},
    startPublishingStream: async () => {},
    loginRoom: async () => {},
    logoutRoom: async () => {},
    sendMessage: async () => {},
    error: null,
});

export const ZegoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [zegoInstance, setZegoInstance] = useState<ZegoExpressEngine | null>(null);
    const [users, setUsers] = useState<ZegoUser[]>([]); // Manage users in the room
    const [messages, setMessages] = useState<any[]>([]); // Manage received messages
    const [error, setError] = useState<string | null>(null);

    console.log(users?.length,'userslenghth')

    const initEngine = useCallback(async () => {
        try {
            const instance = await ZegoExpressEngine.createEngineWithProfile({
                appID,
                appSign,
                scenario: ZegoScenario.General,
            });
            setZegoInstance(instance);
            if (Platform.OS === 'android') {
                await requestPermissions();
            }

            // Subscribe to user join and leave events
            instance.on('roomUserUpdate', (roomID, userList) => {
                setUsers(userList); // Update the users list when users join/leave
            });

            // // Subscribe to message received event
            // instance.on('roomMessageReceived', (roomID, message) => {
            //     console.log('Received message:', message); // Debugging line
            //     setMessages((prevMessages) => [...prevMessages, message]); // Append new message
            // });
        } catch (err: any) {
            console.error('Zego init error:', err);
            setError(err.message);
        }
    }, []);

    const destroyEngine = useCallback(async () => {
        if (zegoInstance) {
            await ZegoExpressEngine.destroyEngine();
            setZegoInstance(null);
            setUsers([]);
            setMessages([]);
        }
    }, [zegoInstance]);

    const requestPermissions = useCallback(async () => {
        const permissions = [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ];
        const results = await PermissionsAndroid.requestMultiple(permissions);
        const allGranted = Object.values(results).every(status => status === 'granted');
        if (!allGranted) {
            setError('Camera or microphone permission denied');
            return false;
        }
        return true;
    }, []);

    const startPreview = useCallback(
        async (ref: any) => {
            if (!zegoInstance || !ref) return;
            try {
                const reactTag = findNodeHandle(ref.current);
                if (!reactTag) throw new Error('Invalid preview ref');
                console.log('ReactTag:', reactTag);
                await zegoInstance.startPreview(
                    { reactTag, viewMode: ZegoViewMode.ScaleToFill, backgroundColor: 0 },
                    ZegoPublishChannel.Main
                );
            } catch (err: any) {
                console.error('Preview error:', err);
                setError(err.message);
            }
        },
        [zegoInstance]
    );

    const stopPreview = useCallback(async () => {
        if (zegoInstance) {
            await zegoInstance.stopPreview(ZegoPublishChannel.Main);
        }
    }, [zegoInstance]);

    const toggleCamera = useCallback(
        async (isFront: boolean) => {
            if (zegoInstance) {
                try {
                    await zegoInstance.useFrontCamera(isFront, ZegoPublishChannel.Main);
                } catch (err) {
                    console.error('Failed to toggle camera:', err);
                    setError('Failed to toggle camera');
                }
            }
        },
        [zegoInstance]
    );

    const toggleMic = useCallback(
        async (isMicOn: boolean) => {
            if (zegoInstance) {
                try {
                    await zegoInstance.muteMicrophone(isMicOn);
                } catch (err) {
                    console.error('Failed to toggle mic:', err);
                    setError('Failed to toggle mic');
                }
            }
        },
        [zegoInstance]
    );

    const startPublishingStream = useCallback(
        async (streamID: string) => {
            if (zegoInstance) {
                try {
                    await zegoInstance.startPublishingStream(
                        streamID,
                        ZegoPublishChannel.Main,
                        undefined
                    );
                } catch (err: any) {
                    console.error('Failed to start live stream:', err);
                    setError(err.message);
                }
            }
        },
        [zegoInstance]
    );

    const loginRoom = useCallback(
        async (roomID: string, userID: string, userName: string) => {
            if (!zegoInstance) {
                console.warn('Zego instance not ready for loginRoom');
                return;
            }
            try {
                const user = { userID, userName };
                await zegoInstance.loginRoom(roomID, user, undefined);
                console.log(`Joined room: ${roomID}`);
            } catch (err: any) {
                console.error('Failed to login to room:', err);
                setError(err.message);
            }
        },
        [zegoInstance]
    );

    const logoutRoom = useCallback(
        async (roomID: string) => {
            if (!zegoInstance) {
                console.warn('Zego instance not ready for logoutRoom');
                return;
            }
            try {
                await zegoInstance.logoutRoom(roomID);
                console.log(`Logged out from room: ${roomID}`);
            } catch (err: any) {
                console.error('Failed to logout from room:', err);
                setError(err.message);
            }
        },
        [zegoInstance]
    );

    const sendMessage = useCallback(
        async (message: string) => {
            if (zegoInstance) {
                try {
                    const messageData = { text: message };
                    await zegoInstance.sendRoomMessage(messageData);
                    console.log('Message sent:', message);
                } catch (err: any) {
                    console.error('Failed to send message:', err);
                    setError(err.message);
                }
            }
        },
        [zegoInstance]
    );

    useEffect(() => {
        initEngine();
        return () => {
            destroyEngine();
        };
    }, [initEngine, destroyEngine]);

    return (
        <ZegoContext.Provider
            value={{
                zegoInstance,
                users,
                messages,
                initEngine,
                destroyEngine,
                requestPermissions,
                startPreview,
                stopPreview,
                toggleCamera,
                toggleMic,
                startPublishingStream,
                loginRoom,
                logoutRoom,
                sendMessage,
                error,
            }}
        >
            {children}
        </ZegoContext.Provider>
    );
};
