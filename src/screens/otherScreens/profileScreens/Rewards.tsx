import CustomHeader from '@/components/profile/CustomHeader';
import { scaleFont, scaleHeight } from '@/constants/scaling';
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { redirect } from '@/utils/navigationService';
import RewardTabs from '@/components/profile/RewardTabs';
import PKMissionScreen from '@/components/profile/PKMission';
import LiveTask from '@/components/profile/LiveTask';
import ThemedText from '@/components/ThemedText';
import LinnerGradientCard from '@/components/common/gradientCards/LinnearGradientCard';
import customColors from '@/constants/styles';

const RewardScreen = () => {
  const [activeTab, setActiveTab] = useState('Live');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader
        title="Reward"
        rightHeader={
          <TouchableOpacity style={styles.helpButton}>
            <ThemedText style={styles.helpButtonText}>?</ThemedText>
          </TouchableOpacity>
        }
      />
      <TouchableOpacity
        onPress={() => redirect('newtaskscreen')}>
        <LinnerGradientCard customStyles={styles.banner}>
          <ThemedText
            style={{ fontSize: scaleFont(24), color: 'white', fontWeight: 'bold' }}>
            Host ke Tasks
          </ThemedText>
          <ThemedText
            style={{ fontSize: scaleFont(16), color: 'white', fontWeight: 'bold' }}>
            Aur jankari ke liya yaha click karein
          </ThemedText>
        </LinnerGradientCard>
      </TouchableOpacity>
      <RewardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        // contentContainerStyle={styles.scrollViewContentContainer}
        >
        {activeTab === 'Live' && <LiveTask />}
        {activeTab === 'PK Mission' && <PKMissionScreen />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
    paddingTop: StatusBar.currentHeight,
  },

  // Header styles
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 16,
  },
  // Banner styles
  banner: {
    marginTop:10,
    padding: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
    height: 100,
  },
  bannerTitle: {
    fontSize: scaleFont(24),
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: scaleFont(16),
    color: 'white',
  },

  // Tab container styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
  },
  tab: {
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  tabActive: {
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 3,
    backgroundColor: '#000',
  },
  tabText: {
    color: '#999',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Scroll view styles
  scrollView: {
    // flex: 1,
    marginHorizontal: 20,
    marginTop:10
  },
  scrollViewContentContainer: {
    borderWidth: 1,
    borderColor: '#9932cc',
    borderRadius: 10,
    // padding: 10,
    // backgroundColor: '#eeecf3',
    paddingHorizontal: 10,
    paddingBottom:scaleHeight(40)
  },
});

export default RewardScreen;
