import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

interface MainContainerProps {
    children: ReactNode;
}

const MainContainer3: React.FC<MainContainerProps> = ({ children }) => {
    const colors = {
        primary: "#007BFF",
        secondary: "#8000FF",
        accent: "#FF007F",
    };

    return (
        <View style={styles.container}>
            {/* Top half gradient with dark blur */}
            <LinearGradient
                colors={[`${colors.primary}`, `${colors.secondary}`]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={[styles.gradient, { height: '70%' }]}
            >
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={30}
                    reducedTransparencyFallbackColor="white"
                />
            </LinearGradient>

            {/* Full screen accent gradient with dark blur */}
            <LinearGradient
                colors={[`${colors.accent}`, `${colors.secondary}`,]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, { height: '100%' }]}
            >
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                />
            </LinearGradient>

        

            {/* Children content */}
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
        width: '100%',
    },
});

export default MainContainer3;
