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
import { useUser } from '@/context/UserProvider';
import { UserRole } from '@/types/types';

interface ProfileData {
  gender: 'Male' | 'Female';
  age?: number;
}

// Gender Chip
const GenderProfile = ({ gender, age }: ProfileData) => {

  const isFemale = gender === 'Female';
  const genderIcon = isFemale ? femaleIcon : maleIcon;
  const genderColor = isFemale ? '#f1567d' : '#49ADF5';

  return (
    <View style={[styles.chip, styles.genderChip, { backgroundColor: genderColor }]}>
      <Image source={genderIcon} style={styles.icon} resizeMode="contain" />
      <ThemedText style={[styles.chipText, { paddingLeft: scaleWidth(4) }]}>
        {age || 0}
      </ThemedText>
    </View>
  );
};

// Profile Levels Display
const ProfileLevels = ({ data }: { data: ProfileData }) => {
  
  return (
    <View style={styles.infoRow}>
      {/* Gender & Age */}
      <GenderProfile gender={data.gender} age={data.age} />

      {/* Wealth Level */}
      <View style={styles.levelBadgeContainer}>
        <Image source={getWealthLevelBadget(1)} style={styles.levelBadge} resizeMode="contain" />
        <ThemedText style={styles.levelText}>1</ThemedText>
      </View>

      {/* Livestream Level */}
      <View style={[styles.levelBadgeContainer, { marginHorizontal: 4 }]}>
        <Image source={getLivestreamLevelBadget(10)} style={styles.livestreamIcon} resizeMode="contain" />
        <Image source={getLivestreamLevelBg(10)} style={styles.livestreamBg} />
        <Text style={[styles.levelText, { left: 20 }]}>10</Text>
      </View>

      {/* Coin Seller */}
      {
        data.roles.includes("SUPER_SELLER") ? (
          <View style={[styles.chip, styles.coinChip, {backgroundColor: customColors.blue700}]}>
            <Image source={CoinIcon} style={styles.icon} resizeMode="contain" />
            <ThemedText style={styles.chipText}>
              Super Seller
            </ThemedText>
          </View>
        ) : data.roles.includes("SELLER") ? (
          <View style={[styles.chip, styles.coinChip, {backgroundColor: customColors.Purple300}]}>
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
    gap: 6,
    marginTop: scaleHeight(8),
    // paddingHorizontal: scaleWidth(10),
  },

  // Common chip
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleWidth(4),
    paddingVertical: scaleHeight(3),
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
    paddingHorizontal: 8,
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
    height: scaleHeight(18),
    left: 0,
    zIndex: 5,
  },

  // Livestream icons
  livestreamIcon: {
    position: 'absolute',
    width: scaleWidth(15),
    height: scaleHeight(15),
    left: 0,
    zIndex: 5,
  },

  livestreamBg: {
    position: 'absolute',
    width: scaleWidth(44),
    height: scaleHeight(19), // this height is not taking please fix
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

export default ProfileLevels;
