import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import customColors from '../../../constants/styles';

interface MainContainerProps {
    children: ReactNode;
}

const MainContainerA: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[customColors.accent, '#FFFFFF']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                locations={[0, 0.3]}
                style={[styles.gradient, { width: '100%', height: '100%' }]}
            >
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={30}
                    reducedTransparencyFallbackColor="white"
                />
            </LinearGradient>

            {/* Overlay to smooth out the mesh effect */}
            <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#F0F8FF', // Light background for contrast
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
});

export default MainContainerA;
