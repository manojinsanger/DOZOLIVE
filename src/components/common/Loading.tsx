import customColors from '@/constants/styles';
import { scaleFont, scaleHeight } from '../../constants/scaling';
import LottieView from 'lottie-react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface LoadingScreenProps {
    size?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ size = 150 }) => {
    return (
        <View style={[{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:customColors.white }, styles.loadingContainer]}>
            <LottieView source={require("../../assets/animations/loader.json")} autoPlay loop style={{ width: size, height: size }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: scaleHeight(10),
        fontSize: scaleFont(18),
        color: '#666',
    },
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
});

export default LoadingScreen;
