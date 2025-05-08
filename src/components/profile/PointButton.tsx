import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface PointButtonProps {
    backgroundColor?: string;
    text: string;
    textColor?: string;
    onPress: () => void;
    borderColor?: string;
}

const PointButton: React.FC<PointButtonProps> = ({ 
    backgroundColor = 'white', 
    text, 
    textColor = '#5C6BC0', 
    onPress,
    borderColor='#5C6BC0',
}) => (
    <TouchableOpacity 
        style={[styles.button, { backgroundColor, borderColor }]} 
        onPress={onPress}
    >
        <Text style={[styles.buttonText, { color: textColor }]}>
            {text}
        </Text>
    </TouchableOpacity>
);

export default PointButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 24,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});
