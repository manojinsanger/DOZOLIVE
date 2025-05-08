import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import customColors from '@/constants/styles';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import filtericon from '../../assets/images/icon/swap2.png';
import LiveDataDescriptionModal from '@/components/livedata/LiveDataDescriptionModal';
import bean from '../../assets/images/bean.png';
import detectiveIcon from '../../assets/images/icon/detective.png';
import FlagDropdown, { Country } from '@/components/profile/FlagDrop';
import ReceiveButton from '@/components/agent/ReceiveButton';

// New DateFilterComponent with single icon and toggling text
const DateFilterComponent = ({ activeTab, onTabPress }: { activeTab: any, onTabPress: any }) => (
  <View style={styles.dateFilterContainer}>
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
  </View>
);

const AllAgency = () => {
  const countries: Country[] = [
    { name: "India", flag: "https://flagcdn.com/w320/in.png" },
    { name: "United States", flag: "https://flagcdn.com/w320/us.png" },
    { name: "Japan", flag: "https://flagcdn.com/w320/jp.png" },
  ];
  const [activeTab, setActiveTab] = useState('Activity');
  const [filterTab, setFilterTab] = useState('Today');
  const [showModal, setShowModal] = useState(false);
  const [inviteSearchQuery, setInviteSearchQuery] = useState('');
  const [selected, setSelected] = useState<Country>(countries[0]);
  const [selectedTab, setSelectedTab] = useState<"Income" | "Amount">("Income");

  const today = new Date('2025-04-11');
  const yesterday = new Date('2025-04-10');

  // Updated activityData with hostNumber field
  const activityData = [
    { id: '1', name: 'ER HPT', points: '402,804', rank: 1, eventDate: '2025-04-10', hostNumber: '50' },
    { id: '2', name: '4hsV4', points: '368,529', rank: 2, eventDate: '2025-04-11', hostNumber: '60' },
    { id: '3', name: 'AnujCoinSeller', points: '479,807', rank: 3, eventDate: '2025-04-10', hostNumber: '55' },
    { id: '4', name: 'Eingham', points: '465,780', rank: 4, eventDate: '2025-04-11', hostNumber: '65' },
    { id: '5', name: 'Kehar', points: '411,681', rank: 5, eventDate: '2025-04-10', hostNumber: '70' },
    { id: '6', name: 'Mohit Sharma1804', points: '405,432', rank: 6, eventDate: '2025-04-11', hostNumber: '75' },
    { id: '7', name: 'j4kdg', points: '361,758', rank: 7, eventDate: '2025-04-10', hostNumber: '80' },
    { id: '8', name: 'inParty', points: '345,079', rank: 8, eventDate: '2025-04-11', hostNumber: '85' },
    { id: '9', name: 'Official CoinSell', points: '331,093', rank: 9, eventDate: '2025-04-10', hostNumber: '90' },
    { id: '10', name: 'Nikkki', points: '314,756', rank: 10, eventDate: '2025-04-11', hostNumber: '95' },
    { id: '11', name: 'CryptoKing', points: '298,451', rank: 11, eventDate: '2025-04-10', hostNumber: '100' },
    { id: '12', name: 'TradeMaster', points: '283,920', rank: 12, eventDate: '2025-04-11', hostNumber: '105' },
    { id: '13', name: 'SilverFox', points: '269,874', rank: 13, eventDate: '2025-04-10', hostNumber: '110' },
    { id: '14', name: 'GoldRush', points: '255,639', rank: 14, eventDate: '2025-04-11', hostNumber: '115' },
    { id: '15', name: 'BlueWave', points: '241,503', rank: 15, eventDate: '2025-04-10', hostNumber: '120' },
    { id: '16', name: 'RedDragon', points: '227,368', rank: 16, eventDate: '2025-04-11', hostNumber: '125' },
    { id: '17', name: 'GreenLeaf', points: '213,232', rank: 17, eventDate: '2025-04-10', hostNumber: '130' },
    { id: '18', name: 'PurpleHaze', points: '199,097', rank: 18, eventDate: '2025-04-11', hostNumber: '135' },
    { id: '19', name: 'YellowSun', points: '184,961', rank: 19, eventDate: '2025-04-10', hostNumber: '140' },
    { id: '20', name: 'BlackPanther', points: '170,826', rank: 20, eventDate: '2025-04-11', hostNumber: '145' },
    { id: '21', name: 'WhiteTiger', points: '156,690', rank: 21, eventDate: '2025-04-10', hostNumber: '150' },
    { id: '22', name: 'GrayWolf', points: '142,554', rank: 22, eventDate: '2025-04-11', hostNumber: '155' },
    { id: '23', name: 'OrangeBlaze', points: '128,419', rank: 23, eventDate: '2025-04-10', hostNumber: '160' },
    { id: '24', name: 'PinkFlame', points: '114,283', rank: 24, eventDate: '2025-04-11', hostNumber: '165' },
    { id: '25', name: 'BrownBear', points: '100,147', rank: 25, eventDate: '2025-04-10', hostNumber: '170' },
    { id: '26', name: 'CyanSky', points: '86,112', rank: 26, eventDate: '2025-04-11', hostNumber: '175' },
    { id: '27', name: 'IndigoNight', points: '71,976', rank: 27, eventDate: '2025-04-10', hostNumber: '180' },
    { id: '28', name: 'VioletMoon', points: '57,840', rank: 28, eventDate: '2025-04-11', hostNumber: '185' },
    { id: '29', name: 'TurquoiseSea', points: '43,704', rank: 29, eventDate: '2025-04-10', hostNumber: '190' },
    { id: '30', name: 'EmeraldForest', points: '29,568', rank: 30, eventDate: '2025-04-11', hostNumber: '195' },
  ].sort((a, b) => {
    return parseInt(b.points.replace(/,/g, '')) - parseInt(a.points.replace(/,/g, ''));
  });

  const filteredActivityData = activityData.filter((item) => {
    const itemDate = new Date(item.eventDate);
    if (filterTab === 'Today') return itemDate.toDateString() === today.toDateString();
    if (filterTab === 'Yesterday') return itemDate.toDateString() === yesterday.toDateString();
    return true;
  });

  const renderActivityItem = ({ item, index }: { item: any, index: any }) => {
    if (selectedTab === 'Amount') {
      return (
        <View style={styles.activityItem}>
          <Text style={styles.rank}>{index + 1}</Text>
          <Image
            source={detectiveIcon}
            style={styles.avatar}
            resizeMode="contain"
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{item.name}</Text>
          </View>
          <View>
            <View style={styles.hostContainer}>
              <View style={styles.hostBackground}>
                <Text style={styles.hostText}>HOST</Text>
              </View>
              <Text style={styles.hostNumber}>{item.hostNumber}</Text>
            </View>
            <View>
              <View style={styles.beantext}>
                <Image source={bean} style={styles.bean} />
                <Text style={styles.reward}>{item.points}</Text>
              </View>
            </View>
          </View>

        </View>
      );
    }

    return (
      <View style={styles.activityItem}>
        <Text style={styles.rank}>{index + 1}</Text>
        <Image
          source={detectiveIcon}
          style={styles.avatar}
          resizeMode="contain"
        />
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
  };

  const renderInviteItem = ({ item }: { item: any }) => (
    <View style={styles.agentItem}>
      <Text style={styles.agentName}>{item.name}</Text>
      <Text style={styles.agentStatus}>{item.status}</Text>
      <Text style={styles.agentDate}>{item.inviteDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {activeTab === 'Activity' && (
        <View style={styles.activityContainer}>
          <ScrollView>

            <View style={styles.rowFilterWrapper}>
              <FlagDropdown
                countries={countries}
                selected={selected}
                onSelect={(c: any) => setSelected(c)}
              />
              <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                {["Income", "Amount"].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setSelectedTab(tab as "Income" | "Amount")}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: selectedTab === tab ? customColors.white : customColors.white,
                      opacity:selectedTab===tab ? 1:0.5,
                      borderRadius: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      marginRight: 13,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: selectedTab === tab ? customColors.gray600 : customColors.gray600,
                      }}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
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
              <ReceiveButton />
            </View>
          </View>

        </View>
      )}

      {activeTab === 'Invite' && (
        <View style={styles.agentContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Invitations..."
            placeholderTextColor={customColors.gray900}
            value={inviteSearchQuery}
            onChangeText={setInviteSearchQuery}
          />
          <TouchableOpacity style={styles.inviteButton}>
            <Text style={styles.inviteButtonText}>Invite New Agent</Text>
          </TouchableOpacity>
        </View>
      )}

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
  );
};

export default AllAgency;

const styles = StyleSheet.create({
  bean: {
    width: scaleWidth(12),
    height: scaleHeight(15),
    marginLeft: scaleHeight(5),
    paddingTop: scaleHeight(2),
  },
  container: {
    flex: 1,
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
    borderTopLeftRadius: scaleWidth(0),
    borderTopRightRadius: scaleWidth(0),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 6,
    position: 'absolute',
    top: -20,
  },
  rowFilterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scaleWidth(12),
    marginVertical:scaleHeight(10),
  },
  headerTitle: {
    fontSize: scaleFont(15),
    color: customColors.white,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: scaleFont(14),
    marginRight: scaleWidth(4),
  },
  listContainer: {
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(60),
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
    justifyContent: 'center',
  },
  username: {
    fontSize: scaleFont(12),
    color: customColors.white,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hostBackground: {
    backgroundColor: customColors.gray800,
    borderWidth: 1,
    borderColor: customColors.white,
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
  },
  hostText: {
    fontSize: scaleFont(8),
    color: customColors.white,
    fontWeight: 'bold',
  },
  hostNumber: {
    fontSize: scaleFont(12),
    color: customColors.white,
    marginLeft: scaleWidth(8),
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
    marginLeft: scaleWidth(6)
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
    color: customColors.backgroundDark,
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
    paddingVertical: scaleHeight(8),
    justifyContent: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(8),
    backgroundColor: '#f0f0e0',
  },
  labelText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#333',
  },
  customFilterTabStyle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    padding: scaleWidth(8),
    marginBottom: scaleHeight(12),
  },
  customMainTabStyle: {
    borderRadius: scaleWidth(10),
    backgroundColor: 'Transparent',
    padding: scaleWidth(3),
    color: customColors.white,
  },
  dateFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dateFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: customColors.white,
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
  customTabTextStyle: {
    color: customColors.backgroundDark,
    fontSize: scaleFont(16),
  },
  customActiveTabTextStyle: {
    color: customColors.backgroundDark,
  },
  ruleIcon: {
    width: 18,
    height: scaleHeight(18),
    resizeMode: 'contain',
    marginLeft: scaleWidth(5),
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
  agentContainer: {
    padding: scaleWidth(16),
  },
  searchInput: {
    height: scaleHeight(50),
    backgroundColor: '#F7F7F7',
    borderRadius: scaleWidth(6),
    paddingHorizontal: scaleWidth(16),
    fontSize: scaleFont(14),
    color: '#333',
    marginBottom: scaleHeight(16),
  },
  agentList: {
    paddingBottom: scaleHeight(20),
  },
  agentItem: {
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  agentName: {
    fontSize: scaleFont(16),
    color: '#333',
    fontWeight: '600',
  },
  agentStatus: {
    fontSize: scaleFont(14),
    color: '#666',
  },
  agentDate: {
    fontSize: scaleFont(12),
    color: '#999',
  },
  inviteButton: {
    paddingVertical: scaleHeight(12),
    backgroundColor: '#E5CCFF',
    borderRadius: scaleWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(20),
  },
  inviteButtonText: {
    fontSize: scaleFont(16),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  button: {
    marginHorizontal: scaleWidth(48),
  },
});