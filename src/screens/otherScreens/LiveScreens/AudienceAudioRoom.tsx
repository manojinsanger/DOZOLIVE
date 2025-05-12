import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import ZegoExpressEngine, {
    ZegoScenario,
    ZegoRoomState,
} from 'zego-express-engine-reactnative';
import KeyCenter from '@/zegodata/KeyCenter';
import { useUser } from '@/context/UserProvider';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const AudienceAudioRoom = () => {
    const roomID = 'room_1234';
    const hostID = '49296184'; // Replace with real host ID
    const streamIDFromHost = `stream_${hostID}`;
    const engineRef = useRef<ZegoExpressEngine | null>(null);

    const [roomState, setRoomState] = useState<ZegoRoomState>('DISCONNECTED');
    const [streamList, setStreamList] = useState<any[]>([]);
    const [activeStream, setActiveStream] = useState<string | null>(null);
    const { userAllDetails } = useUser();

    // --- Permission Request ---
    const requestPermissions = async (): Promise<boolean> => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Microphone Permission',
                        message: 'App needs access to your microphone',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const result = await request(PERMISSIONS.IOS.MICROPHONE);
                return result === RESULTS.GRANTED;
            }
        } catch (err) {
            console.warn('Permission error:', err);
            return false;
        }
    };

    // --- Engine Initialization ---
    const initEngine = async () => {
        if (engineRef.current) return engineRef.current; // reuse existing
        try {
            const profile = {
                appID: KeyCenter.appID,
                appSign: KeyCenter.appSign,
                scenario: ZegoScenario.StandardChatroom,
            };
            const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
            engineRef.current = engine;

            await engine.setAudioConfig(
                {
                    bitrate: 48,
                    channel: 1,
                    codecID: 0,
                },
                undefined
            );

            await engine.muteSpeaker(false);
            setupEventHandlers(engine);
            return engine;
        } catch (err) {
            console.error('Engine initialization failed:', err);
            return null;
        }
    };

    // --- Setup Event Handlers ---
    const setupEventHandlers = (engine: ZegoExpressEngine) => {
        engine.on('roomStateUpdate', (roomID, state) => {
            console.log('Room State:', state);
            setRoomState(state);
        });

        engine.on('roomStreamUpdate', async (roomID, updateType, newStreams) => {
            console.log('Stream update:', updateType, newStreams, roomID);

            if (updateType === 0) {
                setStreamList(prev => [...prev, ...newStreams]);
                newStreams.forEach((stream: any) => {
                    console.log('Playing stream:', stream.streamID);
                    playStream(stream.streamID);
                });
            }

            if (updateType === 1) {
                setStreamList(prev => prev.filter(s => !newStreams.find(ns => ns.streamID === s.streamID)));
            }
        });

        engine.on('playerStateUpdate', (streamID, state, errorCode) => {
            console.log(`Player state: ${streamID}, ${state}, error: ${errorCode}`);
            if (state === 'PLAYING') {
                setActiveStream(streamID);
            }
        });
    };

    // --- Join Room ---
    const joinRoom = async () => {
        try {
            const engine = await initEngine();
            if (!engine) return;

            const userID = `viewer_${Math.random().toString(36).substr(2, 8)}`;
            const userName = `User_${Math.random().toString(36).substr(2, 4)}`;
            await engine.loginRoom(roomID, { userID, userName });
        } catch (err) {
            console.error('Join room error:', err);
        }
    };

    // --- Play Audio Stream ---
    const playStream = async (streamID: string) => {
        try {
            console.log('Attempting to play stream:', streamID);
            if (engineRef.current) {
                await engineRef.current.startPlayingStream(streamID);
            }
        } catch (err) {
            console.error('Error playing stream:', err);
        }
    };

    // --- Cleanup ---
    const cleanup = async () => {
        try {
            if (engineRef.current) {
                if (activeStream) {
                    await engineRef.current.stopPlayingStream(activeStream);
                }
                await engineRef.current.logoutRoom(roomID);
                await ZegoExpressEngine.destroyEngine();
                engineRef.current = null;
            }
        } catch (err) {
            console.warn('Cleanup error:', err);
        }
    };

    // --- Start Broadcasting (for testing) ---
    const startBroadcasting = async () => {
        try {
            const hasPermission = await requestPermissions();
            if (!hasPermission) {
                console.warn('Microphone permission denied');
                return;
            }

            const engine = await initEngine();
            if (!engine) throw new Error('Engine not initialized');

            await engine.startPublishingStream(`stream_${userAllDetails.liveId}`);
            console.log('Started broadcasting');
        } catch (err: any) {
            console.error('Broadcast failed:', err.message);
        }
    };

    useEffect(() => {
        requestPermissions().then(joinRoom);
        return () => {
            cleanup();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🎧 Listening to Room: {roomID}</Text>

            <View style={styles.statusContainer}>
                <Text>Room Status: {roomState}</Text>
                <Text>Active Stream: {activeStream || 'None'}</Text>
            </View>

            <Text style={styles.instruction}>
                {streamList.length > 0
                    ? '🔊 Currently playing host audio'
                    : '⏳ Waiting for host to start broadcasting...'}
            </Text>

            <TouchableOpacity onPress={startBroadcasting}>
                <Text style={styles.broadcastBtn}>Start Broadcasting (Test)</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    statusContainer: {
        marginBottom: 20,
    },
    instruction: {
        fontStyle: 'italic',
        color: '#666',
    },
    broadcastBtn: {
        color: 'blue',
        marginTop: 20,
    },
});

export default AudienceAudioRoom;

