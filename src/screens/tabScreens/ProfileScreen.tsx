import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  RefreshControl,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ThemedView } from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { StatsCard } from '@/components/profile/StatsCard';
import ButtonCard from '@/components/profile/ButtonCard';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import { redirect } from '@/utils/navigationService';
import { scaleFont, scaleWidth, scaleHeight } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { useSocket } from '@/context/SocketProvider';

// Import icons and assets
import RewardIcon from '../../assets/images/profile_icons/reward';
import RankIcon from '../../assets/images/profile_icons/rank';
import FunIslandIcon from '../../assets/images/profile_icons/fun_island';
import StoresIcon from '../../assets/images/profile_icons/store';
import InviteIcon from '../../assets/images/profile_icons/invite';
import HonorLevelIcon from '../../assets/images/profile_icons/honor_level';
import AuthIcon from '../../assets/images/profile_icons/auth';
import MyAgentIcon from '../../assets/images/profile_icons/my_agent';
import AgentIcon from '../../assets/images/profile_icons/agent.svg';
import AddHostIcon from '../../assets/images/profile_icons/add_host';
import TradingIcon from '../../assets/images/profile_icons/coins_trading';
import OfficialServiceIcon from '../../assets/images/profile_icons/official';
import PayRoleIcon from '../../assets/images/profile_icons/payroll';
import BGIcon from '../../assets/images/profile_icons/bd_icon';
import LiveDataIcon from '../../assets/images/profile_icons/live_data';
import BackpackIcon from '../../assets/images/profile_icons/backpack';
import HelpIcon from '../../assets/images/profile_icons/help';
import LevelIcon from '../../assets/images/profile_icons/level';
import AboutIcon from '../../assets/images/icon/AboutIcon';
import SettingIcon from '../../assets/images/profile_icons/setting';
import InstagramIcon from '@/assets/images/profile_icons/instagramIcon';
import Coins from '../../assets/images/icon/loyalty.png';
import Points from '../../assets/images/profile_assets/pointsIcon.png';
import bgAgent from '@/assets/images/agent_banner.png';
import { useAppDispatch, useAppSelector } from '@/store/useTypeDispatchSelector';
import { fetchCoinBeanWallet } from '@/store/features/wallet/walletSlice';
import { useUser } from '@/context/UserProvider';
import { UserRole } from '@/types/types';

interface MenuItem {
  id: number;
  label: string;
  icon: any;
  onPress: any;
}

const profile: MenuItem[] = [
  { id: 1, label: 'Rewards', icon: <RewardIcon width={24} height={24} />, onPress: 'rewards' },
  { id: 2, label: 'Ranks', icon: <RankIcon width={24} height={24} />, onPress: 'ranking' },
  { id: 3, label: 'Fun Island', icon: <FunIslandIcon width={24} height={24} />, onPress: 'store' },
  { id: 4, label: 'Stores', icon: <StoresIcon width={24} height={24} />, onPress: 'store' },
  { id: 5, label: 'Invite', icon: <InviteIcon width={24} height={24} />, onPress: 'invite' },
  { id: 6, label: 'Honor Level', icon: <HonorLevelIcon width={24} height={24} />, onPress: 'liveenedscreen' },
  { id: 8, label: 'Auth', icon: <AuthIcon width={24} height={24} />, onPress: '/user/store' },
];

const services: MenuItem[] = [
  { id: 1, label: 'Agent', icon: <AgentIcon width={24} height={24} />, onPress: 'agent' },
  { id: 2, label: 'Add Host', icon: <AddHostIcon width={24} height={24} />, onPress: 'addhostbutton' },
  { id: 3, label: 'Trading', icon: <TradingIcon width={24} height={24} />, onPress: 'trading' },
  // { id: 4, label: 'Services', icon: <OfficialServiceIcon width={24} height={24} />, onPress: 'store' },
  // { id: 6, label: 'BD Center', icon: <BGIcon width={24} height={24} />, onPress: 'bdcenter' },
  // { id: 7, label: 'Payroll', icon: <PayRoleIcon width={24} height={24} />, onPress: 'payroll' },
];

const actions: MenuItem[] = [
  { id: 1, label: 'My Agent', icon: <MyAgentIcon width={24} height={24} />, onPress: 'myagencywrapper' },
  { id: 2, label: 'Live Data', icon: <LiveDataIcon width={24} height={24} />, onPress: 'livedata' },
  { id: 3, label: 'BackPack', icon: <BackpackIcon width={24} height={24} />, onPress: '/user/store' },
  { id: 4, label: 'Help', icon: <HelpIcon width={24} height={24} />, onPress: 'helpscreen' },
  { id: 5, label: 'Level', icon: <LevelIcon width={24} height={24} />, onPress: 'level' },
  { id: 6, label: 'About Us', icon: <AboutIcon width={24} height={24} />, onPress: 'aboutus' },
  { id: 7, label: 'Setting', icon: <SettingIcon width={24} height={24} />, onPress: 'settingscreen' },
  { id: 8, label: 'Follow Us', icon: <InstagramIcon width={24} height={24} />, onPress: '/user/store' },
];

const ProfileScreen: React.FC = () => {
  const backgroundColor = customColors.white;
  const IconColor = customColors.white;

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { refreshUser, userAllDetails } = useUser();


  console.log(userAllDetails.roles)
  const { } = useSocket();


  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCoinBeanWallet())
  }, [])

  const { coinWalletBalance, BeansWalletBalance, loading: walletLoading, error: walletError } = useAppSelector((state) => state.wallet);

  const fetchProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('fbUser');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUser(null);
    } finally {
      console.log('Fetch profile complete');
      setLoading(false);
      setRefreshing(false);
    }
  };

  console.log(userAllDetails)

  useEffect(() => {
    fetchProfile();
    refreshUser()
  }, []);

  const onRefresh = () => {
    // console.log('Pull-to-refresh triggered');
    setRefreshing(true);
    dispatch(fetchCoinBeanWallet())
    fetchProfile();
    refreshUser()
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: customColors.white,
        }}>
        <LottieView
          source={require('@/assets/animations/loader.json')}
          autoPlay
          loop
          style={{
            width: scaleWidth(150),
            height: scaleHeight(150),
          }}
        />
      </View>
    );
  }

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>
          No profile data available.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <MainContainer>
      <ThemedView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => redirect('profilebyid', { id: user.id })}>
            <Feather
              name="user"
              size={scaleFont(24)}
              color={customColors.white}
            />
          </TouchableOpacity>
          <ThemedText style={styles.headerText}>{`ID: ${userAllDetails && userAllDetails?.specialId ? userAllDetails.specialId : userAllDetails?.liveId}`}</ThemedText>
          <TouchableOpacity onPress={() => redirect('profileedit')}>
            <Feather
              name="edit"
              size={scaleFont(24)}
              color={IconColor}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <ProfileHeader data={userAllDetails} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF0000']} // Hardcoded for visibility
              tintColor={'#FF0000'} // Hardcoded for visibility
            />
          }>
          <View style={styles.statsContainer}>
            <StatsCard
              name="Coins"
              onPress={() => redirect('coins')}
              value={coinWalletBalance}
              icon={Coins}
              iconWidth={scaleWidth(22)}
              iconHeight={scaleHeight(22)}
            />
            <StatsCard
              name="Beans"
              onPress={() => redirect('points')}
              iconHeight={scaleHeight(18)}
              iconWidth={scaleWidth(18)}
              value={BeansWalletBalance}
              icon={Points}
            />
          </View>

          <View style={[styles.buttonContainer, { backgroundColor }]}>
            {profile.map(({ id, label, icon, onPress }) => (
              <ButtonCard
                key={id}
                label={label}
                icon={icon}
                routePath={onPress}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.bannerBg}
            onPress={() => redirect('agentRecruiting')}>
            <ImageBackground source={bgAgent} style={[styles.banner]}>
              <View style={[styles.overlay]}>
                <ThemedText style={[styles.bannerText]}>
                  Agent Recruiting
                </ThemedText>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {
            services.filter((item, index) => {
              if ((userAllDetails.roles.includes("SELLER") || userAllDetails.roles.includes("SUPER_SELLER")) && item.label === 'Trading') {
                return true;
              }
              if (userAllDetails.roles.includes("AGENT") && (item.label === 'Add Host' || item.label === 'Agent')) {
                return true;
              }
              return false;
            }).length > 0 && (
              <View style={[styles.buttonContainer, { backgroundColor, marginTop: scaleHeight(0) }]}>
                {services
                  .filter((item, index) => {
                    if ((userAllDetails.roles.includes("SELLER") || userAllDetails.roles.includes("SUPER_SELLER")) && item.label === 'Trading') {
                      return true;
                    }
                    if (userAllDetails.roles.includes("AGENT") && (item.label === 'Add Host' || item.label === 'Agent')) {
                      return true;
                    }
                    return false;
                  })
                  .map(({ id, label, icon, onPress }) => (
                    <ButtonCard
                      key={id}
                      label={label}
                      icon={icon}
                      routePath={onPress}
                    />
                  ))}
              </View>
            )
          }
          {
            <View
              style={[
                styles.buttonContainer,
                { backgroundColor, marginTop: scaleHeight(10) },
              ]}>
              {actions.map(({ id, label, icon, onPress }) => (
                <ButtonCard
                  key={id}
                  label={label}
                  icon={icon}
                  routePath={onPress}
                />
              ))}
            </View>
          }
        </ScrollView>
      </ThemedView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: scaleWidth(12),
  },
  banner: {
    width: Dimensions.get('window').width - scaleWidth(22),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(10),
    overflow: 'hidden',
    backgroundColor: '#333',
    flex: 1,
  },
  bannerBg: {
    marginVertical: scaleHeight(10),
  },
  bannerText: {
    fontSize: scaleFont(32),
    paddingVertical: scaleHeight(12),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: scaleWidth(1), height: scaleHeight(1) },
    textShadowRadius: scaleWidth(5),
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(10),
  },
  headerText: {
    color: customColors.white,
    fontWeight: '500',
    fontSize: scaleFont(16),
  },
  scrollContentContainer: {
    paddingBottom: scaleHeight(80),
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    marginTop: scaleHeight(10),
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(7),
    shadowOffset: { width: 0, height: scaleHeight(4) },
    shadowOpacity: 0.1,
    shadowRadius: scaleWidth(6),
    elevation: 5,
  },
  errorText: {
    fontSize: scaleFont(18),
    textAlign: 'center',
    marginTop: scaleHeight(20),
  },
  icon: {
    color: customColors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleHeight(12),
  },
});

export default ProfileScreen;