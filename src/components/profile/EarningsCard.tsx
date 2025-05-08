// EarningsCard.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '@/constants/scaling';
import beanIcon from '@/assets/images/bean.png';
import {redirect} from '@/utils/navigationService';
import ThemedText from '../ThemedText';

const EarningsCard = () => {
  return (
    <View style={styles.earningsCard}>
      <View style={styles.earningsRow}>
        <View>
          <ThemedText style={styles.earningsLabel}>
            5/4-11/4 Earnings:
          </ThemedText>
          <View style={styles.pointsRow}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.pointsValue}>217</ThemedText>
          </View>
        </View>

        <View>
          <View style={styles.hourlyWageContainer}>
            <ThemedText style={styles.hourlyWageLabel}>Hourly wage</ThemedText>
            <View style={styles.newHostBadge}>
              <ThemedText style={styles.newHostText}>New Host</ThemedText>
            </View>
          </View>
          <View style={styles.pointsRow}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.pointsValue}>1,200/h</ThemedText>
          </View>
        </View>
      </View>

      <ThemedText style={styles.upgradeText}>Upgrade to</ThemedText>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.upgradeOptions}>
          <View style={styles.upgradeOption}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.upgradeValue}>2,500/h</ThemedText>
          </View>
          <View style={styles.upgradeOption}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.upgradeValue}>10,000/h</ThemedText>
          </View>
          <View style={styles.upgradeOption}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.upgradeValue}>30,000/h</ThemedText>
          </View>
          <View style={styles.upgradeOption}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.upgradeValue}>50,000/h</ThemedText>
          </View>
          <View style={styles.upgradeOption}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.upgradeValue}>80,000/h</ThemedText>
          </View>
          <View style={styles.upgradeOption}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.upgradeValue}>1,20,000/h</ThemedText>
          </View>
          <View style={styles.upgradeOption}>
            <Image source={beanIcon} style={styles.bean} />
            <ThemedText style={styles.upgradeValue}>1,50,000/h</ThemedText>
          </View>
        </View>
      </ScrollView>
      <View style={styles.levelUpgrades}></View>

      <View style={styles.levelUpRow}>
        <View style={styles.stillNeedContainer}>
          <ThemedText style={styles.stillNeedText}>Still need</ThemedText>
          <Image source={beanIcon} style={styles.bean} />
          <ThemedText style={styles.stillNeedValue}>4,000,000</ThemedText>
        </View>
        <TouchableOpacity onPress={() => redirect('newtaskscreen')}>
          <ThemedText style={styles.levelUpRulesText}>
            Level up rules {`${'>>'}`}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  earningsCard: {
    // backgroundColor: 'white',
    borderRadius: 8,
    padding: scaleWidth(16),
    marginBottom: scaleHeight(16),
    marginTop: 8,
    // marginHorizontal: 8,
  },
  bean: {
    width: scaleWidth(14),
    height: scaleHeight(14),
    resizeMode: 'contain',
    marginRight: scaleWidth(4),
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(16),
  },
  earningsLabel: {
    fontSize: scaleFont(12),
    color: '#666',
    marginBottom: scaleHeight(4),
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinkDot: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    borderRadius: scaleWidth(8),
    backgroundColor: '#f472b6',
    marginRight: scaleWidth(4),
  },
  pointsValue: {
    fontSize: scaleFont(14),
    fontWeight: '500',
  },
  hourlyWageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourlyWageLabel: {
    fontSize: scaleFont(12),
    color: '#666',
    marginRight: scaleWidth(8),
  },
  newHostBadge: {
    backgroundColor: '#f472b6',
    paddingHorizontal: scaleWidth(6),
    paddingVertical: scaleHeight(2),
    borderRadius: 4,
  },
  newHostText: {
    color: 'white',
    fontSize: scaleFont(12),
  },
  upgradeText: {
    fontSize: scaleFont(12),
    color: '#666',
    marginBottom: scaleHeight(8),
  },
  upgradeOptions: {
    flexDirection: 'row',
    marginBottom: scaleHeight(16),
  },
  upgradeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scaleWidth(16),
    backgroundColor: '#fdf2f8',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: 16,
  },
  upgradeValue: {
    color: '#f472b6',
    fontWeight: '500',
  },
  levelUpgrades: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(105, 95, 250, 0.15)',
    borderRadius: 20,
    marginBottom: 10,
  },
  levelUpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stillNeedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stillNeedText: {
    fontSize: scaleFont(12),
    color: '#666',
    marginRight: scaleWidth(8),
  },
  stillNeedValue: {
    fontWeight: '500',
  },
  levelUpRulesText: {
    color: '#3b82f6',
    fontSize: scaleFont(14),
  },
});

export default EarningsCard;
