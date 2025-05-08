import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

type RewardTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const RewardTabs: React.FC<RewardTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'Live' && styles.tabActive]}
        onPress={() => setActiveTab('Live')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'Live' && styles.tabTextActive,
          ]}>
          Live
        </Text>
        {activeTab === 'Live' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'PK Mission' && styles.tabActive]}
        onPress={() => setActiveTab('PK Mission')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'PK Mission' && styles.tabTextActive,
          ]}>
          PK Mission
        </Text>
        {activeTab === 'PK Mission' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'Activity' && styles.tabActive]}
        onPress={() => setActiveTab('Activity')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'Activity' && styles.tabTextActive,
          ]}>
          Activity
        </Text>
        {activeTab === 'Activity' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'Party' && styles.tabActive]}
        onPress={() => setActiveTab('Party')}>
        <Text
          style={[
            styles.tabText,
            activeTab === 'Party' && styles.tabTextActive,
          ]}>
          Party
        </Text>
        {activeTab === 'Party' && <View style={styles.tabIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

export default RewardTabs;

const styles = StyleSheet.create({

  // Tab container styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 5,
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
});