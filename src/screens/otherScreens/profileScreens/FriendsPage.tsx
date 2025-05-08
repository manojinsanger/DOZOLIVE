import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import defaultUser from '@/assets/images/icon/userProfile.png';
import { scaleFont, scaleHeight, scaleWidth } from '@/constants/scaling';
import customColors from '@/constants/styles';
import { copyToClipboard } from '@/utils/helper';
import { redirect } from '@/utils/navigationService';
import Animated, { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import CustomHeader from '@/components/profile/CustomHeader';
import { useFollow } from '@/hooks/useFollow';
import { User } from '@/types/follow.types';

type Props = {
  onClose?: () => void;
};

const FriendsPage = ({ onClose }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friendsData, setFriendsData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { getFriends, isLoading, } = useFollow();


  // Animation value for fading in the FlatList
  const opacity = useSharedValue(0);

  const LIMIT = 8; // Number of items to load per page

  // Load dummy following data when component mounts or search changes
  useEffect(() => {
    loadFriends(true);
  }, [searchQuery]);

  const loadFriends = async (refresh = false) => {
    if (refresh) {
      setInitialLoading(true);
      setPage(1);
      setHasMoreData(true);
      opacity.value = 0;
    }

    if (!hasMoreData && !refresh) return;

    const newPage = refresh ? 1 : page;
    const trimmedQuery = searchQuery.trim();

    setIsLoadingMore(!refresh);

    try {
      const res = await getFriends(null, trimmedQuery || null, newPage, LIMIT);
      const fetchedData = res?.users;
      if (refresh) {
        setFriendsData(fetchedData || []);
        setHasMoreData(fetchedData?.length === LIMIT);
        setPage(newPage + 1);
      }
    } catch (err) {
      console.log('Failed to load following users');
    } finally {
      setInitialLoading(false);
      setIsLoadingMore(false);
      if (refresh) {
        opacity.value = withTiming(1, {
          duration: 400,
          easing: Easing.out(Easing.ease),
        });
      }
    }
  };


  // Handle load more when scrolling to bottom
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMoreData) {
      loadFriends();
    }
  };

  // Navigate to user profile
  const navigateToUserProfile = (user: User) => {
    if (onClose) onClose();
    redirect('publicprofilepage', { id: user.id });
  };

  // Render each user item
  const renderUserItem = ({ item }: { item: User }) => {
    if (!item) return null;

    console.log("item: ", item)

    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => navigateToUserProfile(item)}
      >
        <View style={styles.userInfo}>
          {item?.profileImage ? (
            <Image source={{ uri: item.profileImage }} style={styles.avatar} />
          ) : (
            <Image source={defaultUser} style={styles.avatar} />
          )}
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{item.name || 'Unknown User'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.userHandle}>
                Id: {item.liveId || 'N/A'}
              </Text>
              <TouchableOpacity
                onPress={() => item?.liveId && copyToClipboard(item.liveId.toString())}
                style={styles.copyButton}
              >
                <MaterialCommunityIcons
                  name="content-copy"
                  size={scaleFont(14)}
                  color={customColors.gray700}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Empty data component
  const EmptyData = () => (
    <View style={styles.emptyContainer}>
      {searchQuery ? (
        <Text style={styles.emptyText}>No matching users found</Text>
      ) : (
        <Text style={styles.emptyText}>You're not following anyone yet</Text>
      )}
    </View>
  );

  // Loading component
  const LoadingData = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={customColors.primary} size="large" />
      <Text style={{ color: customColors.gray400, marginTop: scaleHeight(10) }}>Loading users...</Text>
    </View>
  );

  // Footer component (loading more)
  const renderFooter = () => {
    if (!isLoadingMore || friendsData.length === 0) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={customColors.primary} size="small" />
      </View>
    );
  };

  // Animation style for the list
  const animatedListStyle = {
    opacity: opacity
  };

  return (
    <View style={styles.container}>
      <CustomHeader title='Friends' />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={scaleFont(20)} color={customColors.gray600} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or ID"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholderTextColor={customColors.gray600}
          returnKeyType="search"
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={scaleFont(20)} color={customColors.gray600} />
          </TouchableOpacity>
        )}
      </View>

      {initialLoading ? (
        <LoadingData />
      ) : (
        <Animated.View style={[styles.listContainer, animatedListStyle]}>
          <FlatList
            data={friendsData}
            renderItem={renderUserItem}
            keyExtractor={item => item.liveId?.toString() || item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            ListEmptyComponent={<EmptyData />}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={initialLoading && page === 1}
            onRefresh={() => loadFriends(true)}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.white,
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray200,
  },
  backButton: {
    padding: scaleWidth(4),
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: customColors.textLightPrimary,
  },
  headerRight: {
    width: scaleWidth(32), // Balance the header
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: customColors.gray100,
    borderRadius: scaleWidth(10),
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(12),
    height: scaleHeight(44),
  },
  searchIcon: {
    marginRight: scaleWidth(8),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: scaleFont(16),
    color: customColors.textLightPrimary,
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(20),
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray200,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: scaleWidth(44),
    height: scaleWidth(44),
    borderRadius: scaleWidth(22),
  },
  userNameContainer: {
    marginLeft: scaleWidth(12),
    flex: 1,
  },
  userName: {
    fontSize: scaleFont(16),
    fontWeight: '500',
    color: customColors.textLightPrimary,
  },
  userHandle: {
    fontSize: scaleFont(14),
    color: customColors.textLightSecondary,
    marginTop: scaleHeight(2),
  },
  copyButton: {
    marginLeft: scaleWidth(8),
    padding: scaleWidth(4),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleHeight(40),
  },
  emptyText: {
    fontSize: scaleFont(16),
    color: customColors.textLightSecondary,
    textAlign: 'center',
  },
  errorText: {
    fontSize: scaleFont(16),
    color: customColors.error,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleHeight(40),
  },
  footerLoader: {
    paddingVertical: scaleHeight(16),
    alignItems: 'center',
  },
});

export default FriendsPage;