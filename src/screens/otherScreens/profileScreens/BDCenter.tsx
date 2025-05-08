import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import customColors from '@/constants/styles';
import {
  scaleFont,
  scaleHeight,
  scaleWidth,
} from '@/constants/scaling';
import CustomHeader from '@/components/profile/CustomHeader';
import bean from '@/assets/images/bean.png';
import agency from '@/assets/images/businessman.png';
import agencydata from '@/assets/images/businessdata.png';
import agencyinvite from '@/assets/images/businessinvite.png';
import userIcon from '@/assets/images/icon/user-profile.png'
import { StatusBar } from 'react-native';
import TabSelector from '@/components/profile/TabSelector';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import { redirect } from '@/utils/navigationService';
import ThemedText from '@/components/ThemedText';


// import userIcon from '../../assets/images/businessman.png';
// import equalIcon from '../../assets/images/icon/equal.png';
// import inviteIcon from '../../assets/images/icon/invite.png';

// Define the type for the stats object
interface Stats {
  september: {
    allHostIncome: number;
    newEffectiveAgency: number;
  };
  thisWeek: {
    newAgencyCoinsReward: number;
  };
  lastWeek: {
    oldAgencyCoinsReward: number;
  };
  rewardRatio: string;
  commission: string;
  basicSalary: number;
  yourSalary: number;
}

const BDCenterScreen = () => {
  const userData = {
    id: '317648',
    daysWithUs: 0,
    notice: 'The data was intercepted at 23:59:59 yesterday!',
  };

  const stats: Stats = {
    september: { allHostIncome: 0, newEffectiveAgency: 0 },
    thisWeek: { newAgencyCoinsReward: 0 },
    lastWeek: { oldAgencyCoinsReward: 0 },
    rewardRatio: '0%',
    commission: '0.0',
    basicSalary: 0,
    yourSalary: 0,
  };

  const [activeTab, setActiveTab] = React.useState<string | null>(null);
  return (

    <MainContainer  >
        <StatusBar barStyle="light-content" backgroundColor='transparent' />
        <View style={styles.container}>
        <CustomHeader title="BD Center" textColor='white' />
        <ScrollView style={styles.scrollView}>


          {/* User Info Section */}
          <View style={styles.userInfo}>
            <View style={styles.userHeader}>
              <Image source={userIcon} style={styles.userIcon} />
              <View>
                <ThemedText style={styles.userName}>Ueco BD</ThemedText>
                <ThemedText style={styles.userId}>ID: {userData.id}</ThemedText>
              </View>
              <ThemedText style={styles.daysWithUs}>{userData.daysWithUs} days with us</ThemedText>
            </View>
            <ThemedText style={styles.notice}>{userData.notice}</ThemedText>
          </View>

          {/* Navigation Tabs */}
          <View style={styles.navTabs}>
            <TouchableOpacity style={styles.navTab} onPress={() => redirect('allagency')}>
              <Image source={agency} style={styles.navIcon} />
              <ThemedText style={styles.navText}>All Agency</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navTab} onPress={() => redirect('agencydata')}>
              <Image source={agencydata} style={styles.navIcon} />
              <ThemedText style={styles.navText}>Agency Data</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navTab} onPress={() => redirect('inviteagency')}>
              <Image source={agencyinvite} style={styles.navIcon} />
              <ThemedText style={styles.navText}>Invite Agency</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Monthly Stats */}
          <View style={styles.statsSection}>
            <TabSelector
              tabs={['September', 'August', 'July']}
              activeTab={activeTab}
              onTabPress={setActiveTab}
            />
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={styles.beandir}>
                  <Image source={bean} style={styles.beanIcon} />
                  <ThemedText style={stats.september.allHostIncome === 0 ? styles.statZero : styles.statText}>
                    {stats.september.allHostIncome}
                  </ThemedText>
                </View>
                <ThemedText>All Host Income</ThemedText>
                <ThemedText>(Bean)</ThemedText>
              </View>
              <View style={styles.statItem}>
                <View style={styles.beandir}>
                  <ThemedText style={stats.september.newEffectiveAgency === 0 ? styles.statZero : styles.statText}>
                    {stats.september.newEffectiveAgency}
                  </ThemedText>
                </View>
                <ThemedText>New Effective Agency</ThemedText>
              </View>
            </View>
          </View>

          {/* Weekly Stats */}
          <View style={styles.statsSection}>
            <TabSelector
              tabs={['This Week', 'Last Week']}
              activeTab={activeTab}
              onTabPress={setActiveTab}
            />
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={styles.beandir}>
                  <Image source={bean} style={styles.beanIcon} />
                  <ThemedText style={stats.thisWeek.newAgencyCoinsReward === 0 ? styles.statZero : styles.statText}>
                    {stats.thisWeek.newAgencyCoinsReward}
                  </ThemedText>
                </View>

                <ThemedText> New Agency</ThemedText>
                <ThemedText>Coins Reward</ThemedText>
              </View>
              <View style={styles.statItem}>
                <View style={styles.beandir}>
                  <Image source={bean} style={styles.beanIcon} />
                  <ThemedText style={stats.lastWeek.oldAgencyCoinsReward === 0 ? styles.statZero : styles.statText}>
                    {stats.lastWeek.oldAgencyCoinsReward} </ThemedText>
                </View>
                <ThemedText>Old Agency</ThemedText>
                <ThemedText> Coins Reward</ThemedText>

              </View>
            </View>
          </View>

          {/* Financial Stats */}
          {/* Financial Stats */}
          <View style={styles.financialStats}>
            <View style={styles.squareContainer}>
              {/* Top-Left: Reward Ratio */}
              <View style={[styles.statCorner, styles.topLeft]}>
                <ThemedText style={styles.statValue} numberOfLines={1}>
                  {stats.rewardRatio}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Reward Ratio</ThemedText>

              </View>

              {/* Top-Right: Commission (USD) */}
              <View style={[styles.statCorner, styles.topRight]}>
                <ThemedText style={styles.statValue} numberOfLines={1}>
                  {stats.commission}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Commission (USD)</ThemedText>

              </View>

              {/* Bottom-Left: Basic Salary (USD) */}
              <View style={[styles.statCorner, styles.bottomLeft]}>
                <ThemedText style={styles.statValue} numberOfLines={1}>
                  {stats.basicSalary}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Basic Salary (USD)</ThemedText>

              </View>

              {/* Bottom-Right: Your Salary (USD) */}
              <View style={[styles.statCorner, styles.bottomRight]}>
                <ThemedText style={styles.statValue} numberOfLines={1}>
                  {stats.yourSalary}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Your Salary (USD)</ThemedText>

              </View>

              {/* Dividers */}

              <View style={styles.verticalDivider} />
            </View>

          </View>
          <ThemedText style={styles.note} >
            * You need 6 more New Effective Agency to get basic salary of $30 !
          </ThemedText>
        </ScrollView>
    </View>
      </MainContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: customColors.backgroundLight,
    paddingTop: StatusBar.currentHeight,

  },
  scrollView: {
    flex: 1,
    paddingHorizontal: scaleHeight(16)
  },
  userInfo: {
    padding: scaleWidth(16),
    backgroundColor: '#fff',
    borderRadius: scaleWidth(8),
    marginBottom: scaleHeight(16),
    elevation: 2,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(8),
  },
  userIcon: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    marginRight: scaleWidth(12),
  },
  userName: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: customColors.textLightPrimary,
  },
  userId: {
    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
  },
  daysWithUs: {

    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
    marginLeft: scaleWidth(100),

  },
  notice: {
    fontSize: scaleFont(12),
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    padding: scaleWidth(8),
    borderRadius: scaleWidth(4),
  },
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scaleWidth(16),
    backgroundColor: '#fff',
    borderRadius: scaleWidth(8),
    marginBottom: scaleHeight(16),
    elevation: 2,
  },
  navTab: {
    alignItems: 'center',
  },
  navIcon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginBottom: scaleHeight(4),
  },
  navText: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
  },
  statsSection: {
    padding: scaleWidth(16),
    backgroundColor: '#fff',
    borderRadius: scaleWidth(8),
    marginBottom: scaleHeight(16),
    elevation: 2,
  },
  monthTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(8),
  },
  weekTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(8),
  },
  monthTab: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
    fontWeight: 'bold',
  },
  weekTab: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    margin: scaleWidth(16)

  },
  beandir: {
    flexDirection: 'row',
  },
  beanIcon: {
    width: scaleWidth(16),
    height: scaleHeight(20),
    marginRight: scaleWidth(4),
  },
  statText: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
  },
  statZero: {
    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
  },
  financialStats: {
    padding: scaleWidth(16),
    backgroundColor: '#fff',
    borderRadius: scaleWidth(8),

    elevation: 2,
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
    fontWeight: 'bold',
  },
  statPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(8),
  },
  statLabel: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
  },
  statValue: {
    fontSize: scaleFont(14),
    color: customColors.textLightPrimary,
    fontWeight: 'bold',
  },

  squareContainer: {
    position: 'relative',
    width: scaleWidth(300), // Square width (adjust as needed)
    height: scaleWidth(100), // Square height (same as width for square)
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  statCorner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaleWidth(8),
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 22,
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  verticalDivider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    backgroundColor: customColors.textLightTertiary, // Light divider color
    opacity: 0.5,
  },
  note: {
    fontSize: 17,
    margin: 10,
    fontWeight: 'bold'
  }

});

export default BDCenterScreen;