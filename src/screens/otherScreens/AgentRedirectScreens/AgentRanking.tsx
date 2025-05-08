import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import FlagDropdown, { Country } from '@/components/profile/FlagDrop';
import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import AgentRankComponent from '@/components/agent/AgentRankComponent';
import BackButton from '@/components/profile/BackButton';
import UnderlinedTabSelector from '@/components/profile/UnderlinedTabSelector';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import filtericon from '@/assets/images/icon/swap2.png';
import rulesicon from '@/assets/images/icon/question.png';
import LiveDataDescriptionModal from '@/components/livedata/LiveDataDescriptionModal';
import bean from '@/assets/images/bean.png';
import detectiveIcon from '@/assets/images/icon/detective.png';
import ReceiveButton from '@/components/agent/ReceiveButton';
import LightContentStatusBar from '@/components/statusbar/LightContentStatusBar';

const AgentRanking = () => {
  const countries: Country[] = [
    { name: "India", flag: "https://flagcdn.com/w320/in.png" },
    { name: "United States", flag: "https://flagcdn.com/w320/us.png" },
    { name: "Japan", flag: "https://flagcdn.com/w320/jp.png" },
  ];
  const [activeTab, setActiveTab] = useState('Agent');
  const [filterTab, setFilterTab] = useState('Today');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Country>(countries[0]);

  const today = new Date('2025-04-11');
  const yesterday = new Date('2025-04-10');

  const activityData = [
    { id: '1', name: 'ER HPT', points: '402,804', rank: 1, eventDate: '2025-04-10' },
    { id: '2', name: '4hsV4', points: '368,529', rank: 2, eventDate: '2025-04-11' },
    { id: '3', name: 'AnujCoinSeller', points: '479,807', rank: 3, eventDate: '2025-04-10' },
    { id: '4', name: 'Eingham', points: '465,780', rank: 4, eventDate: '2025-04-11' },
    { id: '5', name: 'Kehar', points: '411,681', rank: 5, eventDate: '2025-04-10' },
    { id: '6', name: 'Mohit Sharma1804', points: '405,432', rank: 6, eventDate: '2025-04-11' },
    { id: '7', name: 'j4kdg', points: '361,758', rank: 7, eventDate: '2025-04-10' },
    { id: '8', name: 'inParty', points: '345,079', rank: 8, eventDate: '2025-04-11' },
    { id: '9', name: 'Official CoinSell', points: '331,093', rank: 9, eventDate: '2025-04-10' },
    { id: '10', name: 'Nikkki', points: '314,756', rank: 10, eventDate: '2025-04-11' },
    { id: '11', name: 'CryptoKing', points: '298,451', rank: 11, eventDate: '2025-04-10' },
    { id: '12', name: 'TradeMaster', points: '283,920', rank: 12, eventDate: '2025-04-11' },
    { id: '13', name: 'SilverFox', points: '269,874', rank: 13, eventDate: '2025-04-10' },
    { id: '14', name: 'GoldRush', points: '255,639', rank: 14, eventDate: '2025-04-11' },
    { id: '15', name: 'BlueWave', points: '241,503', rank: 15, eventDate: '2025-04-10' },
    { id: '16', name: 'RedDragon', points: '227,368', rank: 16, eventDate: '2025-04-11' },
    { id: '17', name: 'GreenLeaf', points: '213,232', rank: 17, eventDate: '2025-04-10' },
    { id: '18', name: 'PurpleHaze', points: '199,097', rank: 18, eventDate: '2025-04-11' },
    { id: '19', name: 'YellowSun', points: '184,961', rank: 19, eventDate: '2025-04-10' },
    { id: '20', name: 'BlackPanther', points: '170,826', rank: 20, eventDate: '2025-04-11' },
    { id: '21', name: 'WhiteTiger', points: '156,690', rank: 21, eventDate: '2025-04-10' },
    { id: '22', name: 'GrayWolf', points: '142,554', rank: 22, eventDate: '2025-04-11' },
    { id: '23', name: 'OrangeBlaze', points: '128,419', rank: 23, eventDate: '2025-04-10' },
    { id: '24', name: 'PinkFlame', points: '114,283', rank: 24, eventDate: '2025-04-11' },
    { id: '25', name: 'BrownBear', points: '100,147', rank: 25, eventDate: '2025-04-10' },
    { id: '26', name: 'CyanSky', points: '86,112', rank: 26, eventDate: '2025-04-11' },
    { id: '27', name: 'IndigoNight', points: '71,976', rank: 27, eventDate: '2025-04-10' },
    { id: '28', name: 'VioletMoon', points: '57,840', rank: 28, eventDate: '2025-04-11' },
    { id: '29', name: 'TurquoiseSea', points: '43,704', rank: 29, eventDate: '2025-04-10' },
    { id: '30', name: 'EmeraldForest', points: '29,568', rank: 30, eventDate: '2025-04-11' },
  ].sort((a, b) => {
    return parseInt(b.points.replace(/,/g, '')) - parseInt(a.points.replace(/,/g, ''));
  });

  const filteredActivityData = activityData.filter((item) => {
    const itemDate = new Date(item.eventDate);
    if (filterTab === 'Today') return itemDate.toDateString() === today.toDateString();
    if (filterTab === 'Yesterday') return itemDate.toDateString() === yesterday.toDateString();
    return true;
  });

  const renderActivityItem = ({ item, index }: { item: any, index: any }) => (
    <View style={styles.activityItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={detectiveIcon} style={styles.avatar} resizeMode="contain" />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.name}</Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>💰 {item.points}</Text>
        <View style={styles.beantext}>
          <Image source={bean} style={styles.bean} />
          <Text style={styles.reward}>{item.points}</Text>
        </View>
      </View>
    </View>
  );

  // Define DateFilterComponent after styles to avoid reference error
  const DateFilterComponent = ({ activeTab, onTabPress }: { activeTab: any, onTabPress: any }) => (
    <TouchableOpacity
      style={styles.dateFilterButton}
      onPress={() => onTabPress(activeTab === 'Today' ? 'Yesterday' : 'Today')}
    >
      <Image
        source={filtericon}
        style={styles.filterIcon}
        resizeMode="contain"
      />
      <Text style={[styles.dateFilterText, activeTab === 'Today' ? styles.dateFilterTextActive : null]}>
        {activeTab === 'Today' ? 'Today' : 'Yesterday'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <MainContainer>
      <View style={styles.container}>
       <LightContentStatusBar/>

        <View style={styles.tabRow}>
          <BackButton />
          <UnderlinedTabSelector
            tabs={['Agent', 'Activity']}
            activeTab={activeTab}
            onTabPress={setActiveTab}
            containerStyle={styles.customMainTabStyle}
            tabTextStyle={{ color: customColors.white }}
            activeTabTextStyle={styles.customActiveTabTextStyle}
          />
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image source={rulesicon} style={styles.ruleIcon} />
          </TouchableOpacity>
        </View>

        {activeTab === 'Activity' && (
          <View style={styles.activityContainer}>
            <ScrollView>
              {/* Country Dropdown + Date Filter Row */}
              <View style={styles.rowFilterWrapper}>
                <View>
                  <FlagDropdown
                    countries={countries}
                    selected={selected}
                    onSelect={(c:any) => setSelected(c)}
                  />
                </View>
                <DateFilterComponent
                  activeTab={filterTab}
                  onTabPress={setFilterTab}
                />
              </View>

              <View style={styles.border}>
                <View style={styles.activityHeader}>
                  <Text style={styles.headerTitle}>Ranking</Text>
                </View>
                <FlatList
                  data={filteredActivityData}
                  renderItem={renderActivityItem}
                  keyExtractor={(item) => item.id}
                  initialNumToRender={30}
                  contentContainerStyle={styles.listContainer}
                />
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <View style={styles.footerContent}>
                <View style={styles.footerTextContainer}>
                  <Text style={styles.footerText}>
                    Distance from rank: {filteredActivityData.length > 0 ? parseInt(filteredActivityData[0].points.replace(/,/g, '')) - 30285524 : 0}
                  </Text>
                  <Text style={styles.footerNote}>
                    You can only receive rewards for the next rank, if the
                  </Text>
                </View>
                <ReceiveButton/>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Agent' && <AgentRankComponent />}
        <LiveDataDescriptionModal visible={showModal} onClose={() => setShowModal(false)}>
          <Text>
            1. Ranked by regional agency revenue, the total revenue for all days in the period will be counted
          </Text>
          <Text>
            2. The ranking is based on the total revenue of the agent in the period
          </Text>
          <Text>
            3. Only income of the host in the ranking region will be counted (Platform rewards excluded).
          </Text>
          <Text>
            4. Agents need to manually claim the rewards the day after the end of the cycle. If the agent fails to claim the rewards on time, the reward will be automatically cancelled.
          </Text>
        </LiveDataDescriptionModal>
      </View>
    </MainContainer>
  );
};

export default AgentRanking;

const styles = StyleSheet.create({
  bean: {
    width: scaleWidth(12),
    height: scaleHeight(15),
    marginLeft: scaleHeight(5),
    paddingTop: scaleHeight(2),
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  activityContainer: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customColors.secondary,
    shadowColor: customColors.gray300,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    width: '60%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: customColors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 6,
    position: 'absolute',
    top: -20,
  },
  headerTitle: {
    fontSize: scaleFont(15),
    color: customColors.white,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: scaleHeight(60),
    paddingTop: scaleHeight(20),
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaleWidth(16),
    borderBottomColor: '#e0e0e0',
  },
  rank: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    width: scaleWidth(40),
    color: customColors.white,
  },
  avatar: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    borderWidth: scaleWidth(1),
    borderRadius: scaleWidth(50),
  },
  userInfo: {
    flex: 1,
    paddingLeft: scaleWidth(10),
  },
  username: {
    fontSize: scaleFont(12),
    color: customColors.white,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: scaleFont(14),
    color: customColors.white,
    fontWeight: '900',
    textAlign: 'right',
  },
  reward: {
    fontSize: scaleFont(14),
    color: customColors.white,
    fontWeight: '900',
    textAlign: 'right',
    marginLeft: scaleWidth(6),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: scaleWidth(16),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerTextContainer: {
    flex: 1,
  },
  footerText: {
    fontSize: scaleFont(14),
    color: '#333',
  },
  footerNote: {
    fontSize: scaleFont(12),
    color: '#666',
    marginTop: scaleHeight(4),
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(35),
    justifyContent: 'center',
  },
  customMainTabStyle: {
    borderRadius: scaleWidth(10),
    backgroundColor: 'Transparent',
    padding: scaleWidth(3),
    color: customColors.white,
  },
  customActiveTabTextStyle: {
    color: customColors.white,
  },
  ruleIcon: {
    width: 18,
    height: scaleHeight(18),
    marginLeft: scaleWidth(5),
    marginBottom: scaleHeight(6),
    tintColor: customColors.white,
  },
  border: {
    marginHorizontal: scaleWidth(10),
    borderWidth: scaleWidth(1),
    borderColor: customColors.white,
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(30),
    borderRadius: scaleWidth(20),
  },
  beantext: {
    marginTop: scaleHeight(3),
    fontWeight: '900',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowFilterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scaleWidth(12),
    marginVertical: scaleHeight(10),
  },
  dateFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  dateFilterText: {
    fontSize: scaleFont(14),
    color: customColors.gray200,
    marginLeft: scaleWidth(6),
    fontWeight: '700',
  },
  dateFilterTextActive: {
    color: customColors.gray200,
    fontWeight: '700',
  },
});