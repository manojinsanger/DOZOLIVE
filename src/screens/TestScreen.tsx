import {scaleHeight, scaleWidth } from '@/constants/scaling';
import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  findNodeHandle,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoScenario,
} from 'zego-express-engine-reactnative';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import MainContainer from '@/components/common/mainContainers/MainContainer';

const appID = 1765360767;
const userID = 'dsfsdfsd';
const appSign =
  '7cc84f08e3c019dc4c2c7f47f53cc8d691e1870e50abf43b923585473bdc2190';

  const { width, height } = Dimensions.get('window');
const LiveStreamingComponent = () => {

  const [state, setState] = useState({
    isPreviewing: false,
    isLive: false,
    errorMessage: null,
    isInitialized: false,
    previewRefReady: false,
    playRefReady: false,
  });
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const previewRef = useRef(null);
  const playRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initializeEngine = async () => {
      try {
        console.log('Initializing Zego Engine...');
        const profile = { appID, appSign, scenario: ZegoScenario.General };
        await ZegoExpressEngine.createEngineWithProfile(profile);
        console.log('Engine created successfully');

        if (Platform.OS === 'android') {
          await requestPermissions();
        }

        startPreviewWithDelay();
        if (isMounted) {
          setState(prev => ({ ...prev, isInitialized: true }));
        }
      } catch (error:any) {
        console.error('Initialization Error:', error);
        if (isMounted) {
          setState(prev => ({
            ...prev,
            errorMessage: error.message || 'Initialization failed',
          }));
        }
      }
    };

    initializeEngine();

    return () => {
      isMounted = false;
      if (ZegoExpressEngine.instance()) {
        console.log('Destroying engine...');
        ZegoExpressEngine.destroyEngine();
      }
    };
  }, []);

  const requestPermissions = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      const results = await PermissionsAndroid.requestMultiple(permissions);
      console.log('Permission results:', results);
      const allGranted = Object.values(results).every(
        status => status === 'granted',
      );
      if (!allGranted) {
        throw new Error('Camera and/or microphone permissions not granted');
      }
      return results;
    } catch (err) {
      console.error('Permission request error:', err);
      throw err;
    }
  };

  const startPreviewWithDelay = () => {
    setTimeout(async () => {
      try {
        console.log('Starting preview...');
        const instance = ZegoExpressEngine.instance();
        if (!instance) throw new Error('Zego instance not initialized');

        if (!previewRef.current) {
          throw new Error('Preview view reference not ready');
        }

        const reactTag = findNodeHandle(previewRef.current);
        if (!reactTag) {
          throw new Error('Invalid reactTag for preview view');
        }

        await instance.startPreview({
          reactTag,
          viewMode: 0,
          backgroundColor: 0,
        });
        console.log('Preview started successfully');
        setState(prev => ({ ...prev, isPreviewing: true }));
      } catch (error) {
        console.error('Preview Error:', error);
        setState(prev => ({ ...prev, errorMessage: error.message }));
      }
    }, 500);
  };

  const onClickA = async () => {
    try {
      console.log('Starting streaming...');
      const instance = ZegoExpressEngine.instance();
      if (!instance) throw new Error('Zego instance not initialized');

      if (!previewRef.current || !playRef.current) {
        throw new Error('View references not ready');
      }

      const previewReactTag = findNodeHandle(previewRef.current);
      const playReactTag = findNodeHandle(playRef.current);
      if (!previewReactTag || !playReactTag) {
        throw new Error('Invalid reactTag for views');
      }

      instance.on(
        'roomStateUpdate',
        (roomID, state, errorCode, extendedData) => {
          console.log(
            `Room State: ${state}, RoomID: ${roomID}, Error: ${errorCode}`,
          );
        },
      );

      instance.on('publisherStateUpdate', (streamID, state, errorCode) => {
        console.log(`Publisher State: ${state}, StreamID: ${streamID}`);
      });

      instance.on('playerStateUpdate', (streamID, state, errorCode) => {
        console.log(`Player State: ${state}, StreamID: ${streamID}`);
      });

      await instance.loginRoom('9999', { userID, userName: 'zego' });
      await instance.startPublishingStream('333');
      await instance.startPlayingStream('333', {
        reactTag: playReactTag,
        viewMode: 0,
        backgroundColor: 0,
      });

      console.log('Streaming started successfully');
      setState(prev => ({ ...prev, isLive: true }));
    } catch (error) {
      console.error('Streaming Error:', error);
      setState(prev => ({
        ...prev,
        errorMessage: `Failed to start streaming: ${error.message}`,
      }));
    }
  };

  const {
    isPreviewing,
    isLive,
    errorMessage,
    isInitialized,
    previewRefReady,
    playRefReady,
  } = state;
  const isButtonEnabled =
    isPreviewing && isInitialized && previewRefReady && playRefReady;


    const pickImage = async () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 0.8,
        },
        (response:any) => {
          if (response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri || null);
          }
        },
      );
    };
    
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: any) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };




  return (
    <View style={styles.fullScreen}>
      {/* <StatusBar hidden />
      <ZegoTextureView
        ref={previewRef}
        style={{ width, height, position: 'absolute', top: 0, left: 0 }}
        onLayout={() =>
          setState(prev => ({ ...prev, previewRefReady: true }))
        }
      />

      <View>
        <Text>
          Add title
        </Text>
      </View> */}
      <View style={styles.fullScreen}>
        <MainContainer>
        <StatusBar hidden />
        <ZegoTextureView
          ref={previewRef}
          style={{ width, height, position: 'absolute', top: 0, left: 0 }}
          onLayout={() =>
            setState(prev => ({ ...prev, previewRefReady: true }))
          }
        />

        <View
          style={styles.overlay}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <Text style={styles.pickImageText}>Pick Image</Text>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Add Title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Add Description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <View style={styles.tagContainer}>
              <TextInput
                style={styles.tagInput}
                placeholder="Add tag"
                placeholderTextColor="#999"
                value={newTag}
                onChangeText={setNewTag}
                onSubmitEditing={addTag}
              />
              <TouchableOpacity onPress={addTag} style={styles.addTagButton}>
                <Text style={{ color: '#fff' }}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsWrapper}>
              {tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                  <TouchableOpacity onPress={() => removeTag(tag)}>
                    <Text style={styles.remove}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        </MainContainer>
        
      </View>

    </View>


    // <SafeAreaView>
    //   {/* <StatusBar barStyle="dark-content" /> */}
    //   <StatusBar hidden />
    //   <View style={styles.container}>
    //     <ZegoTextureView
    //       ref={previewRef}
    //       style={{width:width,height:height}}
    //       onLayout={() =>
    //         setState(prev => ({ ...prev, previewRefReady: true }))
    //       }
    //     />
    //   </View>
    //   {/* <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={styles.scrollView}>
    //     <Header />
    //     <View style={styles.body}>
    //       <View style={styles.sectionContainer}>
    //         <Button
    //           onPress={onClickA}
    //           title={isLive ? 'Live' : 'Click me to start streaming'}
    //           disabled={!isButtonEnabled}
    //         />
    //       </View>
    //       {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    //       <Text style={styles.sectionTitle}>Local Preview</Text>

    //       <Text style={styles.sectionTitle}>Remote Stream</Text>
    //       <View style={{height: 200}}>
    //         <ZegoTextureView
    //           ref={playRef}
    //           style={{height: 200}}
    //           onLayout={() => setState(prev => ({...prev, playRefReady: true}))}
    //         />
    //       </View>
    //     </View>
    //   </ScrollView> */}
    // </SafeAreaView>
    // <SafeAreaView>
    //   {/* <StatusBar barStyle="dark-content" /> */}
    //   <StatusBar hidden />
    //   <View style={styles.container}>
    //     <ZegoTextureView
    //       ref={previewRef}
    //       style={{width:width,height:height}}
    //       onLayout={() =>
    //         setState(prev => ({ ...prev, previewRefReady: true }))
    //       }
    //     />
    //   </View>
    //   {/* <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={styles.scrollView}>
    //     <Header />
    //     <View style={styles.body}>
    //       <View style={styles.sectionContainer}>
    //         <Button
    //           onPress={onClickA}
    //           title={isLive ? 'Live' : 'Click me to start streaming'}
    //           disabled={!isButtonEnabled}
    //         />
    //       </View>
    //       {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    //       <Text style={styles.sectionTitle}>Local Preview</Text>

    //       <Text style={styles.sectionTitle}>Remote Stream</Text>
    //       <View style={{height: 200}}>
    //         <ZegoTextureView
    //           ref={playRef}
    //           style={{height: 200}}
    //           onLayout={() => setState(prev => ({...prev, playRefReady: true}))}
    //         />
    //       </View>
    //     </View>
    //   </ScrollView> */}
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
  },
  fullScreen: {
    width: width,
    height:height,
  },
  overlay: {
    position: 'absolute',
    top: scaleHeight(80),
    left: scaleWidth(10),
    right:scaleWidth(10),
    // padding: 20,
  },
  content: {
    paddingBottom: 60,
  },
  imagePicker: {
    backgroundColor: '#444',
    height: scaleWidth(100),
    width:scaleWidth(100),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    opacity:0.5
  },
  pickImageText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addTagButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    marginLeft: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 11, 243, 0.2)',
  },
  tagText: {
    color: '#fff',
    marginRight: 6,
  },
  remove: {
    color: '#ff4444',
    fontSize: 18,
  },
});

export default LiveStreamingComponent;
