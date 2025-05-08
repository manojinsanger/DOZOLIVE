// CameraMicToggle.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinnerGradientCard from '../common/gradientCards/LinnearGradientCard';

interface CameraMicToggleProps {
    isMicOn: boolean;
    isCameraOn?: boolean;
    toggleMic: () => void;
    toggleCameraOnOff?: () => void;
    size?: number
}

const CameraMicToggleBtn: React.FC<CameraMicToggleProps> = ({
    isMicOn,
    isCameraOn,
    toggleMic,
    toggleCameraOnOff,
    size = 20

}) => {
    return (
        <View style={styles.container}>
            {/* Gradient card for camera toggle */}
            {/* <LinnerGradientCard customStyles={styles.cardContainer}>
                <TouchableOpacity onPress={toggleCameraOnOff} style={styles.iconBtn}>
                    <MaterialCommunityIcons
                        name={isCameraOn ? 'camera' : 'camera-off'}
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>
            </LinnerGradientCard> */}

            {/* Mic toggle button */}
            {/* <View style={styles.cardContainer}> */}
                <TouchableOpacity onPress={toggleMic} style={styles.iconBtn}>
                    <Icon name={isMicOn ? 'mic' : 'mic-off'} size={size} color="#fff" />
                </TouchableOpacity>
            {/* </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
    },
    iconBtn: {
        padding: 8,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

export default CameraMicToggleBtn;
