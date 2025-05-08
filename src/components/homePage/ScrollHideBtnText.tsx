import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function ScrollShrinkBox() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedBoxStyle = useAnimatedStyle(() => {
    const newWidth = interpolate(
      scrollY.value,
      [0, 100],
      [200, 100], // Width shrinks from 200 to 100
      Animated.Extrapolate.CLAMP
    );

    return {
      width: withTiming(newWidth, { duration: 300 }),
    };
  });

  const helloTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0], // Fade out
      Animated.Extrapolate.CLAMP
    );
    return {
      opacity: withTiming(opacity, { duration: 300 }),
    };
  });

  return (
    <ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollContainer}
    >
      <Animated.View style={[styles.box, animatedBoxStyle]}>
        <Animated.Text style={[styles.text, helloTextStyle]}>
          Hello Reanimated!
        </Animated.Text>
        <Text style={styles.manojText}>manoj</Text>
      </Animated.View>

      {/* Add some scrollable content */}
      <View style={{ height: 800 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  box: {
    height: 200,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    color: 'white',
    fontSize: 18,
    position: 'absolute',
  },
  manojText: {
    color: 'white',
    fontSize: 18,
    zIndex: 1,
  },
});
