import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import customColors from '../../../constants/styles';

interface MainContainerProps {
    children: ReactNode;
}

const MainContainerP: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[customColors.accent, 'transparent']} // Fade to transparent
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                locations={[0, 0.3]}
                style={[styles.gradient, { width: '100%', height: '100%' }]}
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: customColors.white,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
});

export default MainContainerP;
