import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import ThemedText from '@/components/ThemedText';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';

// Assets
import CoinIcon from '@/assets/images/profile_assets/coin.png';
import femaleIcon from '@/assets/images/icon/femaleIcon.png';
import maleIcon from '@/assets/images/icon/manIcon.png';
import { formatRole, getLivestreamLevelBadget, getLivestreamLevelBg, getWealthLevelBadget } from '@/utils/helper';
import { ProfileData, UserRole } from '@/types/types';
import { useUser } from '@/context/UserProvider';
import GenderProfile from './GenderLevel';

interface Profile {
  gender: 'Male' | 'Female';
  age?: number;
  
}

// Gender Chip

// Profile Levels Display
const ProfileHeaderLevels = ({ data, customStyle }: { data: ProfileData, customStyle?: object }) => {


  return (
    <View style={[styles.infoRow, customStyle]}>
      {/* Gender & Age */}
      {/* <GenderProfile gender={data.gender} age={data.age} /> */}

      {/* Wealth Level */}
      <View style={styles.levelBadgeContainer}>
        <Image source={getWealthLevelBadget(1)} style={styles.levelBadge} resizeMode="contain" />
        <ThemedText style={styles.levelText}>{data.wealthLevel}</ThemedText>
      </View>

      {/* Livestream Level */}
      <View style={[styles.levelBadgeContainer, { marginHorizontal: 4 }]}>
        <Image source={getLivestreamLevelBadget(10)} style={styles.livestreamIcon} resizeMode="contain" />
        <Image source={getLivestreamLevelBg(10)} style={styles.livestreamBg} />
        <Text style={[styles.levelText, { left: 24 }]}>{data?.liveLevel}</Text>
      </View>
      {
        data.roles.includes("SUPER_SELLER") ? (
          <View style={[styles.chip, styles.coinChip]}>
            <Image source={CoinIcon} style={styles.icon} resizeMode="contain" />
            <ThemedText style={styles.chipText}>
              Super Seller
            </ThemedText>
          </View>
        ) : data.roles.includes("SELLER") ? (
          <View style={[styles.chip, styles.coinChip]}>
            <Image source={CoinIcon} style={styles.icon} resizeMode="contain" />
            <ThemedText style={styles.chipText}>
              Seller
            </ThemedText>
          </View>
        ) : null
      }



      {/* Official Badge */}
      {/* <View style={[styles.chip, styles.officialChip]}>
        <ThemedText style={styles.chipText}>Official</ThemedText>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 2,
    marginTop: scaleHeight(8),
    // paddingHorizontal: scaleWidth(10),
  },

  // Common chip
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleWidth(5),
    paddingVertical: scaleHeight(2),
    borderRadius: scaleWidth(15),
    marginBottom: scaleHeight(6),
  },

  chipText: {
    fontSize: scaleFont(10),
    fontWeight: '600',
    color: customColors.white,
  },

  genderChip: {
    minWidth: scaleWidth(35),
  },

  coinChip: {
    backgroundColor: '#f1567d',
    gap: 4
  },

  officialChip: {
    // paddingHorizontal: 5,
    backgroundColor: '#1966e3',
  },

  icon: {
    width: scaleWidth(10),
    height: scaleHeight(10),
  },

  levelBadgeContainer: {
    position: 'relative',
    width: scaleWidth(40),
    height: scaleHeight(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(6),
  },

  // Wealth level badge
  levelBadge: {
    position: 'absolute',
    width: scaleWidth(42),
    height: scaleHeight(15),
    left: 0,
    zIndex: 5,
  },

  // Livestream icons
  livestreamIcon: {
    position: 'absolute',
    width: scaleWidth(14),
    height: scaleHeight(14),
    left: 0,
    zIndex: 5,
  },

  livestreamBg: {
    position: 'absolute',
    width: scaleWidth(40),
    height: scaleHeight(16), // this height is not taking please fix
    left: scaleWidth(0),
    zIndex: 1,
    borderRadius: 16
    // resizeMode: 'contain'
  },

  levelText: {
    color: customColors.white,
    fontWeight: 'bold',
    fontSize: scaleFont(10),
    position: 'absolute',
    zIndex: 10,
    left: scaleWidth(22),
  },
});

export default ProfileHeaderLevels;
