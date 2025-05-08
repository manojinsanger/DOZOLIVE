import { scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
  Circle as SvgCircle, // Added for circles
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const cardWidth = Math.min(scaleWidth(220), width / 2 - scaleWidth(16));
const LiveLoadingCard = () => {
  // Shared values for existing animations
  const textGlowOpacity = useSharedValue(0.2);
  const textScale = useSharedValue(1);
  const shinePosition = useSharedValue(-100);


  useEffect(() => {
    // Existing animations (text glow, text scale, shine, dots)
    textGlowOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    

    textScale.value = withRepeat(
      withSequence(
        withTiming(1.00, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.90, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    shinePosition.value = -100;
    shinePosition.value = withRepeat(
      withSequence(
        withTiming(100, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(100, { duration: 200 }),
        withTiming(-100, { duration: 0 }),
        withTiming(-100, { duration: 3000 })
      ),
      -1,
      false
    );
  }, []);


  // Animated styles for existing elements
  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: textScale.value }],
    opacity: textGlowOpacity.value,
  }));

  const shineAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (width * 0.9) * (shinePosition.value / 100) }],
  }));

  
  return (
    <View style={styles.card}>

      {/* Shine effect overlay */}
      <Animated.View style={[styles.shineEffect, shineAnimatedStyle]} />

      {/* Animated text container */}
      <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
        <Svg height={scaleHeight(100)} width={scaleWidth(100)}>
          <Defs>
            <LinearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={customColors.accent} />
              <Stop offset="25%" stopColor={customColors.secondary} />
              <Stop offset="50%" stopColor={customColors.primary} />
              <Stop offset="75%" stopColor={customColors.accent} />
              <Stop offset="100%" stopColor={customColors.accent} />
            </LinearGradient>
          </Defs>
          <SvgText
            x="50%"
            y="50"
            fontSize="35"
            fontFamily="Pacifico-Regular"
            textAnchor="middle"
            fill="url(#textGradient)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
          >
            Dozo
          </SvgText>
          <SvgText
            x="50%"
            y="80"
            fontSize="35"
            fontFamily="Pacifico-Regular"
            textAnchor="middle"
            fill="url(#textGradient)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
          >
            Live
          </SvgText>
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: customColors.gray200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
    margin: scaleWidth(4),
    borderRadius: scaleWidth(10),
    borderWidth: scaleWidth(2),
    borderColor: '#fff',
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shineEffect: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transform: [{ skewX: '-90deg' }],
    zIndex: 10,
  },
});

export default LiveLoadingCard;
// import { scaleHeight, scaleWidth } from '@/constants/scaling';
// import customColors from '@/constants/styles';
// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
//   withSequence,
//   Easing,
// } from 'react-native-reanimated';
// import Svg, {
//   Defs,
//   LinearGradient,
//   Stop,
//   Text as SvgText,
// } from 'react-native-svg';

// const { width } = Dimensions.get('window');

// const cardWidth = Math.min(scaleWidth(220), width / 2 - scaleWidth(16));

// const LiveLoadingCard = () => {
//   // Shared values for animations
//   const textGlowOpacity = useSharedValue(0.4); // Start with lower opacity
//   const textScale = useSharedValue(1);
//   const shinePosition = useSharedValue(-100);

//   useEffect(() => {
//     // Text opacity animation (more pronounced)
//     textGlowOpacity.value = withRepeat(
//       withSequence(
//         withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
//         withTiming(0.4, { duration: 1200, easing: Easing.inOut(Easing.ease) }) // Lower min opacity
//       ),
//       -1,
//       true
//     );

//     // Text scale animation
//     textScale.value = withRepeat(
//       withSequence(
//         withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
//         withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
//       ),
//       -1,
//       true
//     );

//     // Shine animation
//     shinePosition.value = withRepeat(
//       withSequence(
//         withTiming(100, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
//         withTiming(100, { duration: 200 }),
//         withTiming(-100, { duration: 0 }),
//         withTiming(-100, { duration: 3000 })
//       ),
//       -1,
//       false
//     );
//   }, []);

//   // Animated styles
//   const textAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: textScale.value }],
//     opacity: textGlowOpacity.value,
//   }));

//   const shineAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: (cardWidth * 0.9) * (shinePosition.value / 100) }],
//   }));

//   return (
//     <View style={styles.card}>
//       {/* Shine effect overlay */}
//       <Animated.View style={[styles.shineEffect, shineAnimatedStyle]} />

//       {/* Animated text container */}
//       <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
//         <Svg height={scaleHeight(100)} width={scaleWidth(100)}>
//           <Defs>
//             <LinearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <Stop offset="0%" stopColor={customColors.accent} />
//               <Stop offset="25%" stopColor={customColors.secondary} />
//               <Stop offset="50%" stopColor={customColors.primary} />
//               <Stop offset="75%" stopColor={customColors.accent} />
//               <Stop offset="100%" stopColor={customColors.accent} />
//             </LinearGradient>
//           </Defs>
//           <SvgText
//             x="50%"
//             y="50"
//             fontSize="35"
//             fontFamily="Pacifico-Regular"
//             textAnchor="middle"
//             fill="url(#textGradient)"
//             stroke="rgba(255, 255, 255, 0.5)"
//             strokeWidth="1"
//           >
//             Dozo
//           </SvgText>
//           <SvgText
//             x="50%"
//             y="80"
//             fontSize="35"
//             fontFamily="Pacifico-Regular"
//             textAnchor="middle"
//             fill="url(#textGradient)"
//             stroke="rgba(255, 255, 255, 0.5)"
//             strokeWidth="1"
//           >
//             Live
//           </SvgText>
//         </Svg>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: cardWidth,
//     height: cardWidth,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: customColors.gray200,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     overflow: 'hidden',
//     position: 'relative',
//     margin: scaleWidth(4),
//     borderRadius: scaleWidth(10),
//     borderWidth: scaleWidth(2),
//     borderColor: '#fff',
//   },
//   textContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 20, // Ensure text is above shine
//   },
//   shineEffect: {
//     position: 'absolute',
//     width: '50%',
//     height: '100%',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     transform: [{ skewX: '-90deg' }],
//     zIndex: 10,
//   },
// });

// export default LiveLoadingCard;