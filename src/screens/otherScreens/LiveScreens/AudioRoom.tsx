import { useUser } from '@/context/UserProvider';
import KeyCenter from '@/zegodata/KeyCenter';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import ZegoExpressEngine, { ZegoScenario, ZegoUpdateType } from 'zego-express-engine-reactnative';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AudioRoom = () => {
  const { userAllDetails } = useUser();
  const engineRef = useRef<ZegoExpressEngine | null>(null);
  const [roomState, setRoomState] = useState('disconnected');
  const [streamState, setStreamState] = useState('idle');
  const [soundLevel, setSoundLevel] = useState(0); // State for sound level
  const [streamList, setStreamList] = useState<any[]>([]);
  const roomID = `room_${1234}`;
  const userID = String(userAllDetails.liveId);
  const userName = String(userAllDetails.name);
  const streamID = `stream_${userID}`;

  const initEngine = async () => {
    try {
      const profile = {
        appID: KeyCenter.appID,
        appSign: KeyCenter.appSign,
        scenario: ZegoScenario.HighQualityChatroom,
      };

      const engine = await ZegoExpressEngine.createEngineWithProfile(profile);
      engineRef.current = engine;

      await engine.setAudioConfig({
        bitrate: 48,
        channel: 1,
        codecID: 0,
      }, undefined);

      await engine.muteMicrophone(false);
      await engine.muteSpeaker(false);

      // Start sound level monitoring
      engine.startSoundLevelMonitor();

      setupEventHandlers(engine);
      return engine;
    } catch (error) {
      console.error('Engine initialization failed:', error);
    }
  };

  const setupEventHandlers = (engine: ZegoExpressEngine) => {
    engine.on('roomStateUpdate', (roomID, state) => {
      console.log('Room state update:', state);
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

    engine.on('publisherStateUpdate', (streamID, state) => {
      console.log('Publisher state update:', state);
      setStreamState(state);
    });

    // Listen for captured sound level updates
    engine.on('remoteSoundLevelUpdate', (soundLevels) => {
      console.log('remoteSoundLevelUpdate sound level:', soundLevels);
      // setSoundLevel(soundLevel); // Update sound level state
    });
    engine.on('capturedSoundLevelUpdate', (soundLevel: number) => {
      // console.log('Captured sound level:', soundLevel);
      setSoundLevel(soundLevel); // Update sound level state
    });
  };

  const requestPermissions = async () => {
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
      console.warn(err);
      return false;
    }
  };

  const startBroadcasting = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        throw new Error('Microphone permission denied');
      }

      const engine = await initEngine();
      if (!engine) throw new Error('Engine not initialized');

      await engine.loginRoom(roomID, { userID, userName });
      await engine.startPublishingStream(streamID);
    } catch (error) {
      console.error('Broadcast failed:', error.message);
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

  const cleanup = async () => {
    if (engineRef.current) {
      const engine = engineRef.current;

      engine.off('roomStateUpdate');
      engine.off('publisherStateUpdate');
      engine.off('capturedSoundLevelUpdate'); // Remove sound level listener

      // try {
      //   await engine.stopPublishingStream(Number(streamID));
      // } catch (e) {
      //   console.warn('stopPublishingStream error:', e);
      // }

      try {
        await engine.logoutRoom(roomID);
      } catch (e) {
        console.warn('logoutRoom error:', e);
      }

      try {
        ZegoExpressEngine.instance().stopSoundLevelMonitor();
        ZegoExpressEngine.destroyEngine();
      } catch (e) {
        console.warn('cleanup error:', e);
      }

      engineRef.current = null;
    }
  };

  useEffect(() => {
    startBroadcasting();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎤 Host Room: {roomID}</Text>

      <View style={styles.statusContainer}>
        <Text>Room Status: {roomState}</Text>
        <Text>Stream Status: {streamState}</Text>
      </View>

      <View style={styles.soundMeter}>
        <View
          style={[
            styles.soundLevel,
            { width: `${soundLevel}%` }, // Dynamic width based on sound level
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 20,
  },
  soundMeter: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  soundLevel: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default AudioRoom;