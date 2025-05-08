import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ImageSourcePropType,
  Modal,
} from 'react-native';
import ranks from '@/assets/images/icon/ranks.png';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import Top1Crown from '@/assets/images/icon/crown1.png';
import Top2Crown from '@/assets/images/icon/crown2.png';
import Top3Crown from '@/assets/images/icon/crown3.png';
import Top1Medal from '@/assets/images/icon/rank1.webp';
import Top2Medal from '@/assets/images/icon/rank2.webp';
import Top3Medal from '@/assets/images/icon/rank3.webp';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import beanIcon from '@/assets/images/bean.png';
import { formatNumber } from '@/utils/helper';
import { goBack } from '@/utils/navigationService';
import CountrySelector, { Country } from '@/components/profile/SelectCountry';
import { scaleHeight, scaleWidth } from '@/constants/scaling';
import ThemedText from '@/components/ThemedText';
import SelectCountryButton from '@/components/profile/SelectCountryButton';

// Define type for user ranking data
type UserRank = {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  highlighted?: boolean;
  crown?: ImageSourcePropType;
  medal?: ImageSourcePropType;
  coins: number;
};

// Define types for the period options
type MainPeriod = 'Daily' | 'Weekly' | 'Monthly';
type SubPeriod = 'Current' | 'Alternative';
type UserType = 'Host' | 'Rich' | 'Game';

// Define the display text for each period/subperiod combination
const periodDisplayText = {
  Daily: {
    Current: 'Today',
    Alternative: 'Yesterday',
  },
  Weekly: {
    Current: 'This Week',
    Alternative: 'Last Week',
  },
  Monthly: {
    Current: 'This Month',
    Alternative: 'Last Month',
  },
};

const LeaderboardScreen: React.FC = () => {
  const [mainPeriod, setMainPeriod] = useState<MainPeriod>('Weekly');
  const [subPeriod, setSubPeriod] = useState<SubPeriod>('Current');
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Daily');
  const [activeUser, setActiveUser] = useState<UserType>('Host');
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: 'India',
    code: 'IN',
  });
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);


  // Current display text based on selected periods
  const currentDisplayText = periodDisplayText[mainPeriod][subPeriod];
  type UserRank = {
    id: string;
    rank: number;
    name: string;
    avatar: string;
    dailyPoints: number;
    weeklyPoints: number;
    monthlyPoints?: number; // Optional as requested
    highlighted?: boolean;
    crown?: ImageSourcePropType;
    medal?: ImageSourcePropType;
    coins: number;
  };

  // Update the ranking data with the previously prepared data
  const rankingData: UserRank[] = [
    {
      id: '10000001',
      rank: 1,
      name: 'Sophie Reynolds',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      dailyPoints: 300000,
      weeklyPoints: 500000,
      crown: Top1Crown,
      medal: Top1Medal,
      coins: 5000,
    },
    {
      id: '10000002',
      rank: 2,
      name: 'Finn Carter',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      dailyPoints: 200000,
      weeklyPoints: 300000,
      crown: Top2Crown,
      medal: Top2Medal,
      coins: 4000,
    },
    {
      id: '10000003',
      rank: 3,
      name: 'Iris Green',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      dailyPoints: 100000,
      weeklyPoints: 200000,
      crown: Top3Crown,
      medal: Top3Medal,
      coins: 4500,
    },
    {
      id: '10066569',
      rank: 4,
      name: 'Ava Ellis',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      dailyPoints: 60000,
      weeklyPoints: 100000,
      coins: 3000,
    },
    {
      id: '10066350',
      rank: 5,
      name: 'Leo Harrison',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      dailyPoints: 60000,
      weeklyPoints: 100000,
      coins: 2500,
    },
    {
      id: '10351500',
      rank: 6,
      name: 'Rowan Elijah',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      dailyPoints: 60000,
      weeklyPoints: 100000,
      coins: 2000,
    },
    {
      id: '10015269',
      rank: 7,
      name: 'Mia Sophia Bennett',
      avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
      dailyPoints: 60000,
      weeklyPoints: 100000,
      coins: 1500,
    },
    {
      id: '10164520',
      rank: 8,
      name: 'William Turner',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      dailyPoints: 60000,
      weeklyPoints: 100000,
      coins: 1000,
    },
    {
      id: '10066893',
      rank: 9,
      name: 'Ruby Claire',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      dailyPoints: 60000,
      weeklyPoints: 100000,
      coins: 800,
    },
    {
      id: '10258652',
      rank: 10,
      name: 'Silas Gabriel Ford',
      avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
      dailyPoints: 60000,
      weeklyPoints: 100000,
      coins: 700,
    },
    {
      id: '10032547',
      rank: 11,
      name: 'Nora Evelyn',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 650,
    },
    {
      id: '10098754',
      rank: 12,
      name: 'Oliver James',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 600,
    },
    {
      id: '10123456',
      rank: 13,
      name: 'Emma Charlotte',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 550,
    },
    {
      id: '10234567',
      rank: 14,
      name: 'Liam Noah',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 500,
    },
    {
      id: '10345678',
      rank: 15,
      name: 'Olivia Ava',
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 450,
    },
    {
      id: '10456789',
      rank: 16,
      name: 'Ethan Mason',
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 400,
    },
    {
      id: '10567890',
      rank: 17,
      name: 'Isabella Sophia',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 350,
    },
    {
      id: '10678901',
      rank: 18,
      name: 'Lucas Benjamin',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 300,
    },
    {
      id: '10789012',
      rank: 19,
      name: 'Amelia Harper',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 250,
    },
    {
      id: '10890123',
      rank: 20,
      name: 'Alexander Samuel',
      avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
      dailyPoints: 30000,
      weeklyPoints: 60000,
      coins: 200,
    },
  ];

  // Handle period selection
  const handlePeriodChange = (period: MainPeriod) => {
    setMainPeriod(period);
    // Reset subperiod to Current when changing main period
    setSubPeriod('Current');
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setSubPeriod(subPeriod === 'Alternative' ? 'Current' : 'Alternative');
  };

  // Toggle rules modal visibility
  const toggleRulesModal = () => {
    setRulesModalVisible(!rulesModalVisible);
  };

  // Render rules modal
  const renderRulesModal = () => {
    return (
      <Modal
        transparent={true}
        visible={rulesModalVisible}
        animationType="fade"
        onRequestClose={() => setRulesModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.rulesModalContainer}>
            <View style={styles.rulesHeader}>
              <ThemedText style={styles.rulesTitle}>Rules</ThemedText>
              <TouchableOpacity
                onPress={toggleRulesModal}
                style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.rulesList}>
              <View style={styles.ruleItem}>
                <ThemedText style={styles.ruleNumber}>1.</ThemedText>
                <ThemedText style={styles.ruleText}>
                  Ranked by regional agency revenue, the total revenue for all
                  days in the period will be counted.
                </ThemedText>
              </View>

              <View style={styles.ruleItem}>
                <ThemedText style={styles.ruleNumber}>2.</ThemedText>
                <ThemedText style={styles.ruleText}>
                  The ranking is based on the total revenue of the agent in the
                  period.
                </ThemedText>
              </View>

              <View style={styles.ruleItem}>
                <ThemedText style={styles.ruleNumber}>3.</ThemedText>
                <ThemedText style={styles.ruleText}>
                  Only income of the hosts in the ranking region will be counted
                  (Platform rewards excluded).
                </ThemedText>
              </View>

              <View style={styles.ruleItem}>
                <ThemedText style={styles.ruleNumber}>4.</ThemedText>
                <ThemedText style={styles.ruleText}>
                  Agents need to manually claim the rewards the day after the
                  end of the cycle. If the agent fails to claim the rewards on
                  time, the rewards will be automatically cancelled.
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Render the tab selector
  const renderTabs = () => {
    const tabs: MainPeriod[] = ['Daily', 'Weekly', 'Monthly'];

    return (
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, mainPeriod === tab && styles.activeTab]}
              onPress={() => {
                handlePeriodChange(tab);
                setActiveTab(tab);
              }}>
              <ThemedText
                style={[
                  styles.tabText,
                  mainPeriod === tab && styles.activeTabText,
                ]}>
                {tab}
              </ThemedText>
              {mainPeriod === tab && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderListItem = ({ item }: { item: UserRank }) => {
    // Get points based on the active tab
    const getPoints = () => {
      switch (activeTab) {
        case 'Daily':
          return item.dailyPoints;
        case 'Weekly':
          return item.weeklyPoints;
        case 'Monthly':
          return item.monthlyPoints || 0; // Use 0 if monthlyPoints is not available
        default:
          return item.dailyPoints;
      }
    };

    const pointsToDisplay = getPoints();

    return (
      <View
        style={[styles.listItem, item.highlighted && styles.highlightedItem]}>
        <View style={styles.rankNumber}>
          {item.medal ? (
            <Image style={styles.medal} source={item.medal} />
          ) : (
            <ThemedText style={styles.rankText}>{item.rank}</ThemedText>
          )}
        </View>

        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.crown && <Image source={item.crown} style={styles.crown} />}
        <View style={styles.userInfo}>
          <ThemedText style={styles.userName}>{item.name}</ThemedText>
          <View style={styles.listPointsContainer}>
            <Image
              source={beanIcon}
              style={styles.listCoinIcon}
              defaultSource={beanIcon}
            />
            <ThemedText style={styles.pointsText}>{formatNumber(item.coins)}</ThemedText>
          </View>
        </View>

        <View>
          {activeTab !== 'Monthly' && (
            <View style={styles.listPointsContainer}>
              <Image
                source={beanIcon}
                style={styles.listCoinIcon}
                defaultSource={beanIcon}
              />
              <ThemedText style={styles.pointsText}>
                {formatNumber(pointsToDisplay)}
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <MainContainer>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => goBack()}>
            <Feather name="arrow-left" size={24} color={`white`} />
          </TouchableOpacity>

          <View style={styles.headerTabs}>
            {['Host', 'Rich', 'Game'].map((label, index) => (
              <TouchableOpacity
                onPress={() => setActiveUser(label as UserType)}
                key={index}
                style={styles.headerTabItem}>
                <ThemedText
                  style={[
                    styles.headerTabText,
                    label === activeUser && styles.activeHeaderTabText,
                    { fontSize: 16, marginInline: 10 },
                  ]}>
                  {label}
                </ThemedText>
                {label === activeUser && (
                  <View style={[styles.activeTabIndicator]} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={toggleRulesModal}>
            <MaterialIcons name="help-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {renderRulesModal()}
        {renderTabs()}

        <CountrySelector
          onCountryChange={setSelectedCountry}
          selectedCountry={selectedCountry}
          isVisible={isCountryModalVisible}
          onClose={() => setCountryModalVisible(false)}
        />

        <View style={styles.selectCountry}>
          <View style={{ marginBottom: scaleHeight(10) }}>
            <SelectCountryButton color='#fff' onVisible={() => setCountryModalVisible(true)} name={selectedCountry.name} code={selectedCountry.code} />
          </View>
          <TouchableOpacity style={styles.options} onPress={toggleDropdown}>
            <MaterialIcons
              style={styles.optionIcon}
              name="swap-horiz"
              color="#fff"
            />
            <ThemedText style={styles.optionText}>
              {currentDisplayText === 'Daily' ? 'Today' : currentDisplayText}
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.ranks}>
            <Image source={ranks} style={styles.ranksImage} />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={rankingData}
              renderItem={renderListItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
      </SafeAreaView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 25,
  },
  selectCountry: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
  },
  headerTabItem: {
    alignItems: 'center',
  },
  headerTabText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  activeHeaderTabText: {
    color: 'white',
    fontWeight: '600',
  },
  tabUnderline: {
    marginTop: 2,
    height: 3,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 2,
  },
  ranks: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: 140,
    zIndex: 1,
    right: 10,
  },
  medal: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginRight: 10,
  },
  ranksImage: {
    width: '90%',
    height: 180,
    resizeMode: 'contain',
  },
  options: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 18,
    alignSelf: 'flex-end',

    marginRight: 10,
    marginBottom: 10,
    marginTop: -20,
  },
  optionIcon: {
    fontSize: 20,
    color: 'white',
  },
  optionText: {
    color: 'white',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -4,
    left: '25%',
    right: '25%',
    backgroundColor: 'white',
    height: 3,
    borderRadius: 1.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  crown: {
    width: 54,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
    left: 17,
    top: -22,
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingTop: 10,
    zIndex: 2,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  highlightedItem: {
    backgroundColor: 'rgba(73, 100, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
  rankNumber: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  userId: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  listPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  listCoinIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 5,
  },
  // Rules modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rulesModalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  rulesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rulesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  rulesList: {
    marginTop: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  ruleNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 6,
    width: 16,
  },
  ruleText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
});

export default LeaderboardScreen;