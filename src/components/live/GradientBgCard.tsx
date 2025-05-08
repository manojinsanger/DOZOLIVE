import React, { useEffect } from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedGradient = () => {
  const { width, height } = useWindowDimensions();

  // Animation ke liye shared value
  const colorIndex = useSharedValue(0);

  // Colors array
  const startColors = ["blue", "yellow"];
  const endColors = ["yellow", "blue"];

  // Animated colors derive karna
  const gradientColors = useDerivedValue(() => {
    return [
      startColors[Math.floor(colorIndex.value) % startColors.length],
      endColors[Math.floor(colorIndex.value) % endColors.length],
    ];
  });

  // Animation loop
  useEffect(() => {
    colorIndex.value = withRepeat(
      withTiming(1, { duration: 800 }), // 2 seconds ka transition
      -1, // Infinite loop
      true // Reverse on each repeat
    );
  }, [colorIndex]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={gradientColors}
        />
      </Rect>
    </Canvas>
  );
};

export default AnimatedGradient;