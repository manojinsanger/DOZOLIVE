import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView, BlurViewProps } from '@react-native-community/blur';
import customColors from '../../../constants/styles';

interface LinnerGradientCardProps {
  children: React.ReactNode;
  customStyles?: object;
  blurAmount?: number;
  blurType?: BlurViewProps['blurType'];
}

const LinnerGradientCard3 = ({
  children,
  customStyles,
  blurAmount = 10,
  blurType = 'dark',
}: LinnerGradientCardProps) => {
  return (
    <LinearGradient
      colors={[customColors.primary, customColors.secondary, customColors.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.5, 1]}
      style={[styles.mainContainer, customStyles]}
    >
      <BlurView
        style={styles.blur}
        blurAmount={blurAmount}
        blurType={blurType}
        overlayColor="transparent"
      />
      {children}
    </LinearGradient>
  );
};

export default LinnerGradientCard3;

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});
