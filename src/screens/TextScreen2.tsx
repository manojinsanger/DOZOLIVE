import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    findNodeHandle,
    TextInput,
    BackHandler,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ZegoExpressEngine, {
    ZegoTextureView,
    ZegoScenario,
    ZegoPublishChannel,
    ZegoViewMode,
} from 'zego-express-engine-reactnative';
import Entypo from 'react-native-vector-icons/Entypo';
import LinnerGradientCard2 from '@/components/common/gradientCards/LinnearGradientCard2';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { goBack } from '@/utils/navigationService';
import LiveSetupExitModal from '@/components/live/LiveSetupExitModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterButton from '@/components/live/FilterButton';
import TermsAndConditions from '@/components/live/TermsAndConditions';
import MainContainer3 from '@/components/common/mainContainers/MainContainer3';
import LiveOverlayOfLive from '@/components/live/LiveOverlayOfLive';

const appID = 1765360767;
const appSign = '7cc84f08e3c019dc4c2c7f47f53cc8d691e1870e50abf43b923585473bdc2190';
const userID = 'dsfsdfsd';

// Define live types
const liveTypes = [
    'Chatting',
    'Dancing',
    'Singing',
    'Music',
    'Comedy',
    'Talent',
    'Fitness',
    'Cooking',
    'Funny',
    'Stories',
    'Make Friends',
    'Art',
];

const LiveStreamingComponent = () => {
    const [previewStarted, setPreviewStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [selectedLiveType, setSelectedLiveType] = useState<string | null>("Chatting");
    const [streamType, setStreamType] = useState<any | null>("Live");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingPreview, setLoadingPreview] = useState(true);
    const [isLive, setIsLive] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const previewRef = useRef(null);

    useEffect(() => {
        // Handle hardware back button press
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setIsModalVisible(true);
            return true;
        });

        return () => {
            backHandler.remove();
            ZegoExpressEngine.destroyEngine();
        };
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                await ZegoExpressEngine.createEngineWithProfile({
                    appID,
                    appSign,
                    scenario: ZegoScenario.General,
                });
                if (Platform.OS === 'android') await requestPermissions();
                startPreviewWithDelay();
            } catch (err: any) {
                console.error('Zego init error:', err);
                setErrorMessage(err.message);
            }
        };
        init();
        return () => {
            ZegoExpressEngine.destroyEngine();
        };
    }, []);

    const requestPermissions = async () => {
        const permissions = [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ];
        const results = await PermissionsAndroid.requestMultiple(permissions);
        const allGranted = Object.values(results).every(status => status === 'granted');
        if (!allGranted) throw new Error('Camera or microphone permission denied');
    };

    const startPreviewWithDelay = () => {
        setTimeout(async () => {
            try {
                const instance = ZegoExpressEngine.instance();
                const reactTag = findNodeHandle(previewRef.current);
                if (!reactTag) throw new Error('Invalid preview ref');

                console.log('ReactTag:', reactTag);

                await instance.startPreview(
                    { reactTag, viewMode: ZegoViewMode.ScaleToFill, backgroundColor: 0 },
                    ZegoPublishChannel.Main
                );
                setPreviewStarted(true);
            } catch (err: any) {
                console.error('Preview error:', err);
                setErrorMessage(err.message);
            }
            setLoadingPreview(false);
        }, 10);
    };

    const toggleCamera = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            await instance.useFrontCamera(!isFrontCamera, ZegoPublishChannel.Main);
            setIsFrontCamera(!isFrontCamera);
        } catch (err) {
            console.error('Failed to toggle camera:', err);
        }
    };

    const toggleMic = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            await instance.muteMicrophone(isMicOn);
            setIsMicOn(!isMicOn);
        } catch (err) {
            console.error('Failed to toggle mic:', err);
        }
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (res: any) => {
            if (res.assets?.[0]?.uri) {
                setImageUri(res.assets[0].uri);
            }
        });
    };

    const selectLiveType = (type: string) => {
        setSelectedLiveType(type);
    };

    const handleBackPress = () => {
        setIsModalVisible(true);
    };

    const confirmExit = () => {
        setIsModalVisible(false);
        goBack();
    };

    const cancelExit = () => {
        setIsModalVisible(false);
    };

    const startLiveStream = async () => {
        try {
            const instance = ZegoExpressEngine.instance();
            const streamID = `stream_${userID}_${Date.now()}`;
            await instance.startPublishingStream(streamID, ZegoPublishChannel.Main, undefined);
            setIsLive(true);
        } catch (err: any) {
            console.error('Failed to start live stream:', err);
            setErrorMessage(err.message);
        }
    };

    const handleGoLive = () => {
        setCountdown(3);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === null) return null;
                if (prev <= 1) {
                    clearInterval(timer);
                    startLiveStream();
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <View style={styles.container}>
            {
                !isLive &&
                <View
                    style={{ zIndex: 200, position: 'absolute', top: 50, right: 10, left: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
                >
                    <TouchableOpacity
                        style={{}}
                        onPress={handleBackPress}
                    >
                        <Entypo name="cross" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            }

            <View style={styles.fullScreenContainer}>
                <MainContainer3 >
                    <ZegoTextureView
                        ref={previewRef}
                        style={{
                            flex: 1,
                            zIndex: 30,
                        }}
                    />
                </MainContainer3>
            </View>
            {
                !isCameraOn && <View style={styles.cameraOff}>
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: scaleWidth(20), paddingHorizontal: scaleWidth(30), borderRadius: scaleWidth(20), display: 'flex', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name={'camera-off'}
                            size={scaleWidth(30)}
                            color={customColors.primary}
                        />
                        <Text style={{ color: customColors.gray500, textAlign: 'center', fontSize: scaleFont(14) }}>
                            Your Camera Is Off Now!!!
                        </Text>
                    </View>
                </View>
            }
            {
                countdown !== null && (
                    <View style={styles.countdownContainer}>
                        <Text style={styles.countdownText}>{countdown}</Text>
                    </View>
                )
            }
            {
                !isLive &&
                <View style={styles.overlay}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        <View style={styles.contentMainContainer}>
                            <View style={styles.contentContainer}>
                                <TouchableOpacity onPress={pickImage}>
                                    <View style={styles.imagePicker}>
                                        {imageUri ? (
                                            <Image source={{ uri: imageUri }} style={styles.image} />
                                        ) : (
                                            <Image source={require('../assets/images/icon/addImage.png')} style={{ width: '50%', height: '50%' }} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        placeholder="Live Title"
                                        style={styles.input}
                                        value={title}
                                        onChangeText={setTitle}
                                        placeholderTextColor={customColors.white}
                                    />
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.liveTypeScroll}
                                        contentContainerStyle={styles.liveTypeContainer}
                                    >
                                        {liveTypes.map(type => (
                                            <TouchableOpacity
                                                key={type}
                                                style={[
                                                    styles.liveTypeButton,
                                                    selectedLiveType === type && styles.liveTypeButtonSelected,
                                                ]}
                                                onPress={() => selectLiveType(type)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.liveTypeText,
                                                        selectedLiveType === type && styles.liveTypeTextSelected,
                                                    ]}
                                                >
                                                    {type}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <FilterButton />
                        <TouchableOpacity onPress={handleGoLive} style={{ flex: 1 }}>
                            <LinnerGradientCard2 customStyles={styles.goLiveBtn}>
                                <Text style={styles.goLiveText}>Go Live</Text>
                            </LinnerGradientCard2>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 15,
                            gap: scaleWidth(20),
                        }}
                    >
                        {['Live', 'Audio'].map((type) => (
                            <TouchableOpacity key={type} onPress={() => setStreamType(type)}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            color: customColors.white,
                                            fontWeight: '600',
                                            fontSize: scaleFont(14),
                                        }}
                                    >
                                        {type}
                                    </Text>
                                    {streamType === type && (
                                        <View
                                            style={{
                                                height: 2,
                                                backgroundColor: customColors.white,
                                                width: '100%',
                                                marginTop: 4,
                                                borderRadius: 1,
                                            }}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ zIndex: 120, display: 'flex', alignItems: 'center' }}><TermsAndConditions /></View>
                </View>
            }
            {
                isLive &&
                <View style={styles.liveOverlay}>
                    <LiveOverlayOfLive
                        isFront={isFrontCamera}
                        onPress={toggleCamera}
                        handleBackPress={handleBackPress}
                        toggleMic={toggleMic}
                        isMicOn={isMicOn}
                    />
                </View>
            }
            <LiveSetupExitModal
                visible={isModalVisible}
                onConfirm={confirmExit}
                onCancel={cancelExit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullScreenContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
    },
    cameraOff: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 100,
        left: 10,
        right: 10,
        bottom: 20,
        zIndex: 50,
    },
    contentMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'rgba(0, 8, 44, 0.2)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    imagePicker: {
        width: scaleWidth(80),
        height: scaleHeight(80),
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    pickText: {
        color: customColors.gray600,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 12,
        borderRadius: 80,
        height: scaleHeight(38),
        paddingLeft: 20,
        color: customColors.white,
        fontSize: scaleFont(14),
        fontWeight: '500',
    },
    error: {
        color: '#f66',
        marginTop: 10,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    goLiveBtn: {
        width: '100%',
        padding: 10,
        borderRadius: 120,
        flex: 1,
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
    },
    goLiveText: {
        color: customColors.white,
        fontSize: scaleFont(20),
        fontWeight: '600',
    },
    liveTypeScroll: {},
    liveTypeContainer: {
        flexDirection: 'row',
        paddingRight: 10,
    },
    liveTypeButton: {
        borderColor: customColors.white,
        borderWidth: 1,
        borderRadius: 60,
        paddingHorizontal: 15,
        height: scaleHeight(30),
        marginRight: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveTypeButtonSelected: {
        backgroundColor: customColors.primary,
        borderColor: customColors.primary,
        borderWidth: 1,
    },
    liveTypeText: {
        color: customColors.white,
        fontSize: scaleFont(14),
    },
    liveTypeTextSelected: {
        color: customColors.white,
        fontWeight: '600',
    },
    liveOverlay: {
        position: 'absolute',
        top: 35,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
    },
    countdownContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 200,
        width: scaleWidth(100),
        height: scaleWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    countdownText: {
        color: customColors.white,
        fontSize: scaleFont(40),
        fontWeight: 'bold',
    },
});

export default LiveStreamingComponent;
