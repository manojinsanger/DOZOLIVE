import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import customColors from '../../../constants/styles';

interface LinnerGradientCardProps {
    children: React.ReactNode;
    customStyles: object;
    startColor?: string;
    endColor?: string;
}

const LinnerGradientCardCC = ({
    children,
    customStyles,
    startColor = customColors.primary,
    endColor = customColors.secondary,
}: LinnerGradientCardProps) => {
    return (
        <LinearGradient
            colors={[startColor, endColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.mainContainer, customStyles]}
        >
            {children}
        </LinearGradient>
    );
};

export default LinnerGradientCardCC;

const styles = StyleSheet.create({
    mainContainer: {
        // padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
});