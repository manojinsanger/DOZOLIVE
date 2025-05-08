import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { getLives } from '@/services/agora';
import { useAuth } from '@/context/AuthProvider';
import LoadingScreen from '@/components/common/Loading';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import { scaleHeight, scaleWidth } from '@/constants/scaling';
import LightContentStatusBar from '@/components/statusbar/LightContentStatusBar';
import GoLiveButton from '@/components/homePage/GoLiveBtn';
import Header from '@/components/homePage/Header';
import LiveCardsList from '@/components/live/LiveCardList';
import DozoLoading from '@/components/newloadingscreens/DozoLoading';
import LottieView from 'lottie-react-native';
import GradientBgCard from '@/components/live/GradientBgCard';
import { redirect } from '@/utils/navigationService';
import Modal from 'react-native-modal';
import SearchUser from '@/components/homePage/SearchUser';
import { Easing } from 'react-native'; // Import Easing for smoother animations
import LoadingCard from '@/components/loading/LiveLoadingCard';
import NewLiveCardList from '@/components/live/NewLiveCardList';
import { useUser } from '@/context/UserProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const [lives, setLives] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { loading: isAuthLoading } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { refreshUser } = useUser();
  const scrollY = useSharedValue(0);

  useEffect(() => {
    console.log(isSearchVisible, 'isvisible')

  }, [isSearchVisible])
  // Handler for scroll event
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated style to reduce the width based on scrollY value
  const animatedContainerStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollY.value,
      [0, 100], // Scroll range
      [300, 100], // Container width range
      Extrapolation.CLAMP
    );

    return {
      width, // Apply dynamic width based on scroll position
    };
  });

  useEffect(() => {
    refreshUser()
  }, []);

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  return (
    <MainContainer>
      <SafeAreaView style={{ flex: 1 }}>

        <LightContentStatusBar />
        <View style={styles.container}>
          <Header appName="Dozo Live!" onSearchPress={() => setIsSearchVisible(!isSearchVisible)} />

          <TouchableOpacity onPress={() => redirect('joinStream')}>
            <Text>Join Live</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => redirect('audioscreen')}>
          <Text>Audio Live screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => redirect('preview')}>
          <Text>preview</Text>
        </TouchableOpacity> */}
          <Animated.ScrollView
            onScroll={onScroll}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: scaleHeight(60) }]}
          >
            {/* <LiveCardsList
            lives={lives}
            loading={loading}
            refreshing={refreshing}
            onRefresh={onRefresh}
          /> */}
            <NewLiveCardList />

            {/* <LoadingCard /> */}

          </Animated.ScrollView>
          <GoLiveButton animatedContainerStyle={animatedContainerStyle} />
        </View>
        <Modal
          isVisible={isSearchVisible}
          onBackdropPress={() => setIsSearchVisible(false)}
          onBackButtonPress={() => setIsSearchVisible(false)}
          style={styles.modal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={200}
          animationOutTiming={200}
          backdropTransitionOutTiming={0}
          backdropOpacity={0}
          propagateSwipe
        >
          <View style={styles.searchContainer}>
            <SearchUser onClose={() => setIsSearchVisible(!isSearchVisible)} />
          </View>
        </Modal>
      </SafeAreaView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: scaleHeight(110),
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  searchContainer: {
    backgroundColor: 'white',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,

    elevation: 3,
  },
});

export default HomeScreen;