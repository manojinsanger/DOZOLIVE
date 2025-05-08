import React, { useRef, useEffect } from 'react';
import {
    TouchableWithoutFeedback,
    Animated,
    StyleSheet,
    ViewStyle,
    Image,
    View,
} from 'react-native';
import LinnerGradientCard from '../common/gradientCards/LinnearGradientCard';


const FilterButton = () => {

    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Pulse effect loop
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [scaleAnim]);

    // Handle press animation
    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1.1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => null);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress} >
            <View style={{ backgroundColor: 'rgba(0, 8, 44, 0.2)', borderRadius: 100 }}>

                <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
                    <Image
                        source={require('../../assets/images/icon/liveFilterBtn3.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default FilterButton;

const styles = StyleSheet.create({
    gradientWrapper: {
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    button: {
        padding: 8,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 32,
        height: 32,
    },
});
