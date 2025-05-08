import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const HeartButton: React.FC<ButtonIconProps> = ({ onPress, Icon, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <LinearGradient
                colors={["#DD486E", "#FFA7BD"]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Icon width={24} height={24} fill="#fff" />
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default HeartButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        overflow: "hidden",
    },
    gradient: {
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});
