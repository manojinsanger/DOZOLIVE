import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import userIcon from '@/assets/images/icon/user-profile.png';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';

const AvatarBadge = () => {
  return (
    <View style={styles.avatarContainer}>
      <Image source={userIcon} style={styles.avatarImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.unverified}>Unverified</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    // position: 'absolute',
    // top: scaleHeight(70),
    // right: scaleWidth(16),
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatarImage: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    borderRadius: scaleWidth(25),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nameContainer: {
    marginLeft: scaleWidth(8),
  },
  name: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#000',
  },
  unverified: {
    fontSize: scaleFont(12),
    color: '#888',
  },
});

export default AvatarBadge;
