
import React, { useEffect, useState, ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';


const { width } = Dimensions.get('window');
const statusBarHeight = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight || 24,
  default: 24,
});

const Icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  loading: '',
};

interface CustomToastProps {
  visible?: boolean;
  type?: 'info' | 'success' | 'error' | 'loading';
  message?: string;
  duration?: number;
  onComplete?: () => void;
  isLoading?: boolean;
  loadingResult?: boolean;
  position?: 'top' | 'bottom';
  customIcon?: ReactNode;
}

const CustomToast: React.FC<CustomToastProps> = ({
  visible = false,
  type = 'info',
  message = '',
  duration = 3000,
  onComplete,
  isLoading = false,
  loadingResult,
  position = 'top',
  customIcon,
}) => {
  const [toastType, setToastType] = useState(type);
  const [toastMessage, setToastMessage] = useState(message);
  const translateY = useSharedValue(-200);
  const backgroundWidth = useSharedValue(50);
  const opacity = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0.7);
  const iconRotate = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    width: backgroundWidth.value,
    opacity: opacity.value,
    justifyContent: backgroundWidth.value < 80 ? 'center' : 'flex-start',
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }, { rotate: `${iconRotate.value}deg` }],
  }));

  const animatedIconContainerStyle = useAnimatedStyle(() => ({
    marginRight: backgroundWidth.value < 80 ? 0 : 8,
  }));

  const animatedMessageStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  const hideToast = () => {
    messageOpacity.value = withTiming(0, {
      duration: 100,
      easing: Easing.out(Easing.cubic),
    });
    backgroundWidth.value = withDelay(
      100,
      withTiming(50, { duration: 150, easing: Easing.in(Easing.cubic) }),
    );
    iconScale.value = withDelay(
      100,
      withTiming(0.7, { duration: 150, easing: Easing.in(Easing.cubic) }),
    );
    iconRotate.value = withDelay(
      100,
      withTiming(-15, { duration: 150, easing: Easing.in(Easing.cubic) }),
    );
    translateY.value = withDelay(
      250,
      withTiming(-40, { duration: 150, easing: Easing.in(Easing.cubic) }),
    );
    opacity.value = withDelay(
      250,
      withTiming(0, { duration: 150, easing: Easing.out(Easing.cubic) }, () => {
        if (onComplete) runOnJS(onComplete)();
      }),
    );
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (visible) {
      setToastType(type);
      setToastMessage(message);

      backgroundWidth.value = 50;
      opacity.value = 0;
      messageOpacity.value = 0;
      iconScale.value = 0.7;
      iconRotate.value = 15;

      opacity.value = withTiming(1, {
        duration: 100,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withTiming(
        position === 'top' ? statusBarHeight + 10 : -30,
        {
          duration: 250,
          easing: Easing.out(Easing.back(1.1)),
        },
      );
      iconScale.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.back(1.2)),
      });
      iconRotate.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.cubic),
      });

      backgroundWidth.value = withDelay(
        200,
        withTiming(width * 0.9, {
          duration: 250,
          easing: Easing.out(Easing.cubic),
        }),
      );

      messageOpacity.value = withDelay(
        400,
        withTiming(1, {
          duration: 150,
          easing: Easing.out(Easing.cubic),
        }),
      );

      if (!isLoading && type !== 'loading') {
        timeoutId = setTimeout(hideToast, duration);
      }
    } else {
      hideToast();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [visible, type, message, position, duration, isLoading]);

  useEffect(() => {
    if (isLoading === false && loadingResult !== undefined) {
      setToastType(loadingResult ? 'success' : 'error');
      setToastMessage(loadingResult ? 'Success!' : 'Failed!');
      const timeoutId = setTimeout(hideToast, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, loadingResult]);

  const getBackgroundColor = () => {
    switch (toastType) {
      case 'success':
        return 'rgba(76, 175, 80, 0.8)';
      case 'error':
        return 'rgba(244, 67, 54, 0.8)';
      case 'info':
        return 'rgba(33, 150, 243, 0.8)';
      case 'loading':
        return 'rgba(255, 152, 0, 0.8)';
      default:
        return 'rgba(51, 51, 51, 0.8)';
    }
  };

  const getIconBackgroundColor = () => {
    switch (toastType) {
      case 'success':
        return '#388E3C';
      case 'error':
        return '#D32F2F';
      case 'info':
        return '#1976D2';
      case 'loading':
        return '#F57C00';
      default:
        return '#222';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animatedContainerStyle,
        { backgroundColor: getBackgroundColor() },
        position === 'top' ? styles.top : styles.bottom,
      ]}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor() },
          animatedIconContainerStyle,
          animatedIconStyle,
        ]}
      >
        {toastType === 'loading' ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : customIcon ? (
          customIcon
        ) : (
          <Text style={styles.icon}>{Icons[toastType]}</Text>
        )}
      </Animated.View>
      <Animated.Text style={[styles.message, animatedMessageStyle]}>
        {toastMessage}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    height: 50,
    zIndex: 9999,
    overflow: 'hidden',
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 30,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#FFFFFF',
    fontSize: width < 380 ? 12 : 14,
    fontWeight: '500',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

export default CustomToast;