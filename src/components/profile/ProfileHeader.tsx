import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import ThemedText from '@/components/ThemedText';
import {ProfileData} from '@/types/types';
import StatItem from './StatItem';
import ProfileLevels from './profileLevels';
import {scaleFont, scaleHeight, scaleWidth} from '@/constants/scaling';
import customColors from '@/constants/styles';
import UserProfile from '@/assets/images/icon/userProfile.png';
import {redirect} from '@/utils/navigationService';
import { useNoOfFollowers } from '@/context/FollowProvider';

const ProfileHeader: React.FC<{data: ProfileData}> = ({data}) => {
  const [hasError, setHasError] = useState(false);
  const {follower, following, friends} = useNoOfFollowers();

  if (hasError) {
    return (
      <View style={styles.headerContainer}>
        <ThemedText style={styles.errorText}>
          There was an error loading the profile data.
        </ThemedText>
      </View>
    );
  }

  console.log(data,"data")

  return (
    <View style={styles.headerContainer}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        {data.profileImage ? (
          <Image
            source={{uri: data.profileImage}}
            style={styles.profileImage}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={UserProfile}
            style={styles.profileImage}
            resizeMode="cover"
          />
        )}
      </View>
      <ThemedText style={styles.nameText}>{data.name}</ThemedText>
      <ProfileLevels data={data} />

      <View style={styles.statsRow}>
        <TouchableOpacity onPress={() => redirect('friendspage')}>
          <StatItem label="Friends" value={friends} color={customColors.white}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => redirect('followingpage')}>
          <StatItem label="Followings" value={following} color={customColors.white}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => redirect('followerspage')}>
          <StatItem label="followers" value={follower} color={customColors.white}/>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => redirect('visitorspage')}>
          <StatItem label="Visitors" value={0} color={customColors.white}/>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    width: '100%',
  },
  profileImageContainer: {
    marginTop: scaleHeight(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    borderRadius: scaleWidth(45),
    borderWidth: scaleWidth(2),
    borderColor: customColors.white,
  },
  nameText: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    color: customColors.white,
    marginTop: scaleHeight(8),
    textAlign: 'center',
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(5),
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(10),
    borderRadius: scaleWidth(5),
  },
  idText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: customColors.white,
  },
  copyButton: {
    fontSize: scaleFont(16),
    marginLeft: scaleWidth(8),
    color: customColors.white,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: scaleHeight(10),
    paddingVertical: scaleHeight(8),
  },
  errorText: {
    fontSize: scaleFont(16),
    color: customColors.accent || 'red',
    textAlign: 'center',
    marginVertical: scaleHeight(20),
  },
});

export default ProfileHeader;