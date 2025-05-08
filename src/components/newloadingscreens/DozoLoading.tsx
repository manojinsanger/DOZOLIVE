import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';
import customColors from '@/constants/styles';
const DozoLoading = () => {
    return (
        <View>
            <View style={styles.gradientTextContainer}>
                <Svg height="80" width="300">
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0%" stopColor={customColors.primary} />
                            <Stop offset="100%" stopColor={customColors.secondary} />
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
        </View>
    )
}

export default DozoLoading

const styles = StyleSheet.create({
    gradientTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
})