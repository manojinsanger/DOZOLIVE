import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import customColors from '../../../constants/styles';

interface MainContainerProps {
    children: ReactNode;
}

const MainContainerS: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[customColors.secondary, '#FFFFFF']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                locations={[0, 0.3]}
                style={[styles.gradient, { width: '100%', height: '100%' }]}
            >
                {Platform.OS !== 'android' ? (
                    <BlurView
                        style={styles.blur}
                        blurType="dark"
                        blurAmount={30}
                        reducedTransparencyFallbackColor="white"
                    />
                ) : null}
            </LinearGradient>

            {Platform.OS !== 'android' ? (
                <BlurView
                    style={styles.overlayBlur}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />
            ) : null}

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#F0F8FF',
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
    overlayBlur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

export default MainContainerS;
