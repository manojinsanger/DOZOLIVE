import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const colors = {
    primary: '#007BFF',
    secondary: '#8000FF',
    accent: '#FF007F',
  };

  return (
    <View style={styles.container}>
      {/* Background Layer 1 */}
      <LinearGradient
        colors={[colors.primary, colors.secondary, '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.3, 0.4]}
        style={styles.gradient}
      >
        {/* <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={30}
          reducedTransparencyFallbackColor="white"
        /> */}
      </LinearGradient>

      {/* Background Layer 2 */}
      <LinearGradient
        colors={[`${colors.accent}FF`, `${colors.secondary}FF`, '#FFFFFF']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.3, 1]}
        style={styles.gradient}
      >
        {/* <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={30}
          reducedTransparencyFallbackColor="white"
        /> */}
      </LinearGradient>

      {/* Smooth Overlay Blur */}
      {/* <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      /> */}

      {/* Content Layer */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MainContainer;
