import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer2: React.FC<MainContainerProps> = ({ children }) => {
  const colors = {
    primary: "#007BFF",
    secondary: "#8000FF",
    accent: "#FF007F",
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background 1 */}
      <LinearGradient
        colors={[`${colors.primary}80`, `${colors.secondary}80`, '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.3, 1]}
        style={styles.gradient}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white"
        />
      </LinearGradient>

      {/* Gradient Background 2 */}
      <LinearGradient
        colors={[`${colors.accent}80`, `${colors.secondary}80`, '#FFFFFF']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.3, 1]}
        style={styles.gradient}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white"
        />
      </LinearGradient>

      {/* Soft Overlay Blur */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />

      {/* Foreground Content */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F0F8FF',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MainContainer2;
