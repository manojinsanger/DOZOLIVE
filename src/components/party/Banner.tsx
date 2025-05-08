
import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { BannerProps } from '../../types/types';
import { scaleFont, scaleHeight, scaleWidth } from '../../constants/scaling';
import ThemedText from '../ThemedText';
import { redirect } from '@/utils/navigationService';

const Banner: React.FC<BannerProps> = ({
  banners = [],
  height = scaleHeight(100),
  marginVertical = scaleHeight(10),
  marginHorizontal = scaleWidth(10),
  fontSize = scaleFont(22),
  color = 'white',
}) => {
  const { width } = Dimensions.get('window');
  const bannerWidth = width - scaleWidth(22);
  const carouselRef = useRef<ICarouselInstance>(null);


  // Auto-scroll every 10 seconds
  React.useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const currentIndex = carouselRef.current.getCurrentIndex();
        const nextIndex = (currentIndex + 1) % banners.length;
        carouselRef.current.scrollTo({ index: nextIndex });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  const handleBannerPress = (path: string) => {
    if (path) {
      // Assuming path is a URL; use Linking to open it
      Linking.openURL(path).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  const renderItem = ({ item }: any) => {
    const imageSource = item.path ? item.image : { uri: item.imageUrl };

    return (
      <View style={[styles.bannerContainer, { marginHorizontal }]}>
        {item.path ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => redirect(item.path)}
            style={{ width: bannerWidth, height: '100%' }}
          >
            <ImageBackground
              source={imageSource}
              style={[styles.banner, { width: bannerWidth }]}
              resizeMode="cover"
            >
              <View style={[styles.overlay, { height }]}>
                <ThemedText style={[styles.bannerText, { fontSize, color }]}>
                  {item.text}
                </ThemedText>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <ImageBackground
            source={imageSource}
            style={[styles.banner, { width: bannerWidth }]}
            resizeMode="cover"
          >
            <View style={[styles.overlay, { height }]}>
              <ThemedText style={[styles.bannerText, { fontSize, color }]}>
                {item.text}
              </ThemedText>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.carouselContainer, { height, marginVertical }]}>
      <Carousel
        ref={carouselRef}
        width={bannerWidth}
        height={height}
        data={banners}
        renderItem={renderItem}
        loop={true}
        autoPlay={false} // Controlled manually via useEffect
        scrollAnimationDuration={500}
        // panGestureHandlerProps={{
        //   activeOffsetX: [-10, 10],
        // }}
        // modeConfig={{
        //   snapDirection: 'left',
        //   stackInterval: 0,
        // }}
        style={{ width: width - scaleWidth(20) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: scaleHeight(100),
    alignItems: 'center',
  },
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(10),
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
  },
  bannerText: {
    fontSize: scaleFont(22),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: scaleWidth(1), height: scaleHeight(1) },
    textShadowRadius: scaleWidth(5),
  },
});

export default Banner;