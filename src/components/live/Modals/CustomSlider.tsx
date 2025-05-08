import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

type Props = {
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
};

const CustomSlider: React.FC<Props> = ({ onChange, min = 0, max = 100 }) => {
  const trackWidth = 300;
  const thumbSize = 32;

  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: any) => {
      const newX = ctx.startX + event.translationX;
      translateX.value = Math.min(Math.max(newX, 0), trackWidth - thumbSize);

      const rawValue = interpolate(
        translateX.value,
        [0, trackWidth - thumbSize],
        [min, max]
      );
      if (onChange) runOnJS(onChange)(Math.round(rawValue));
    },
  });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.track, { width: trackWidth }]} />
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    position: 'absolute',
  },
  thumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    position: 'absolute',
    top: -11, // center it on the track
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default CustomSlider;
