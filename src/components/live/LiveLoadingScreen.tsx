import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';

// Animated LinearGradient
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function LiveLoadingScreen() {
    const offset = useSharedValue(0);

    React.useEffect(() => {
        // Animate gradient Y-axis flow smoothly
        offset.value = withRepeat(
            withTiming(1, {
                duration: 4000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, []);

  
    return (
        <View style={styles.gradientTextContainer}>
            <Svg height="80" width="300">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset="0%" stopColor="#FF85A6" />
                        <Stop offset="100%" stopColor="#E32753" />
                    </LinearGradient>
                </Defs>
                <SvgText
                    x="50%"
                    y="50%"
                    dy="20"
                    fontSize="55"
                    fontFamily="Pacifico"
                    textAnchor="middle"
                    fill="url(#grad)"
                >
                    <Text> <TSpan fontFamily="Pacifico-Regular" textAnchor="middle" fill="url(#grad)" >Dozo! Live</TSpan></Text>
                </SvgText>
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        marginTop: 100,
    },
    gradientTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
});
