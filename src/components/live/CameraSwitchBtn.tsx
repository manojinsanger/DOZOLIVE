import React, { useRef } from 'react';
import {
    TouchableWithoutFeedback,
    Animated,
    StyleSheet,
    ViewStyle,
    Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinnerGradientCard from '../common/gradientCards/LinnearGradientCard';

type Props = {
    isFront: boolean;
    onPress: () => void;
    style?: ViewStyle;
};

const CameraSwitchButton = ({ isFront, onPress, style }: Props) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }),
        ]).start(() => onPress());
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View style={[styles.button, { transform: [{ rotate }] }]}>
                <Icon name="camera-switch" size={26} color="#fff" />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default CameraSwitchButton;

const styles = StyleSheet.create({
    gradientWrapper: {
        borderRadius: 50,
    },
    button: {
        padding: 12,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 8, 44, 0.2)'
    },
});
