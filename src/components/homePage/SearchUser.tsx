import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinnearGradientCard from '../common/gradientCards/LinnearGradientCard';
import defaultUser from '@/assets/images/icon/userProfile.png';
import { useFollow } from '@/hooks/useFollow';
import { User } from '@/types/follow.types';
import { redirect } from '@/utils/navigationService';
import customColors from '@/constants/styles';
import { copyToClipboard } from '@/utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useNoOfFollowers } from '@/context/FollowProvider';

type Props = {
    onClose?: () => void;
};

const SearchUser = ({ onClose }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { fetchFollowCounts } = useNoOfFollowers();

    const LIMIT = 15;

    // Animation value for fading in the FlatList
    const opacity = useSharedValue(0);

    // Use our custom follow hook
    const { searchUsers, toggleFollow, isLoading: apiLoading } = useFollow();

    // Load users when component mounts or search changes
    useEffect(() => {
        loadUsers(true);
    }, [searchQuery]);

    // Function to load users from API with minimum loading duration
    const loadUsers = async (refresh = false) => {
        if (refresh) {
            setInitialLoading(true);
            setPage(1);
            setHasMoreData(true);
            setError(null);
            opacity.value = 0; // Reset opacity for fade-in
        }

        if (!hasMoreData && !refresh) return;

        const newPage = refresh ? 1 : page;
        const trimmedQuery = searchQuery.trim(); // Trim whitespace
        if (!trimmedQuery && !refresh && page === 1) {
            setInitialLoading(false);
            setUsers([]);
            setHasMoreData(false);
            return;
        }

        setIsLoadingMore(!refresh); // Set loading more for pagination
        try {
            const minLoadingPromise = new Promise(resolve => setTimeout(resolve, 500));
            const result = await Promise.all([
                searchUsers(trimmedQuery || null, newPage, LIMIT),
                minLoadingPromise,
            ]);

            const usersResult = result[0];
            if (usersResult) {
                const formattedUsers = usersResult.users; // Assuming isFollowing is included
                if (refresh) {
                    setUsers(formattedUsers);
                } else {
                    setUsers(prev => [...prev, ...formattedUsers]);
                }

                setHasMoreData(formattedUsers.length === LIMIT);
                setPage(newPage + 1);
            } else {
                setError('No users found');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load users');
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
        if (!apiLoading && !isLoadingMore && hasMoreData) {
            loadUsers();
        }
    };

    // Handle follow/unfollow action
    const handleFollowUser = async (user: User) => {
        setLoadingUserId(user.id.toString());
        try {
            const success = await toggleFollow(user.id, user.isFollowing);
            if (success) {
                setUsers(prevUsers =>
                    prevUsers.map(u =>
                        u.id === user.id ? { ...u, isFollowing: !user.isFollowing } : u
                    )
                );
                fetchFollowCounts();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to toggle follow');
        } finally {
            setLoadingUserId(null);
        }
    };

    // Animated style for FlatList
    const animatedListStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    // Render each user item
    const renderUserItem = ({ item }: { item: User }) => {
        if (!item) return null;

        return (
            <View style={styles.userItem}>
                <TouchableOpacity
                    onPress={() => {
                        if (onClose) onClose();
                        redirect('publicprofilepage', { id: item.id, isUserFollowing: item.isFollowing });
                    }}
                    style={styles.userInfo}
                >
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
                                    color={customColors.gray500}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                {loadingUserId === item.id.toString() ? (
                    <ActivityIndicator
                        style={{ marginRight: scaleWidth(25) }}
                        size="small"
                        color={customColors.primary}
                    />
                ) : item.isFollowing ? (
                    <TouchableOpacity
                        style={styles.followingButton}
                        onPress={() => handleFollowUser(item)}
                        disabled={loadingUserId !== null}
                    >
                        <Text style={styles.followingButtonText}>Unfollow</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => handleFollowUser(item)}
                        disabled={loadingUserId !== null}
                    >
                        <LinnearGradientCard customStyles={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </LinnearGradientCard>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    // Empty data component
    const EmptyData = () => (
        <View style={styles.emptyContainer}>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <Text style={styles.emptyText}>No users found</Text>
            )}
        </View>
    );

    // Loading component
    const LoadingData = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator color="#22c55e" size="large" />
            <Text style={{ color: customColors.gray400 }}>Loading users...</Text>
        </View>
    );

    // Footer component (loading more)
    const renderFooter = () => {
        if (!isLoadingMore || users.length === 0) return null;

        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator color="#22c55e" size="small" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                    <Ionicons name="chevron-back" size={scaleFont(24)} color={customColors.gray500} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Users</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close" size={scaleFont(24)} color={customColors.gray500} />
                </TouchableOpacity>
            </View>

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
                        data={users}
                        renderItem={renderUserItem}
                        keyExtractor={item => item.liveId?.toString() || item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        ListEmptyComponent={<EmptyData />}
                        ListFooterComponent={renderFooter}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        refreshing={apiLoading && page === 1}
                        onRefresh={() => loadUsers(true)}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(12),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    copyButton: {
        marginLeft: scaleWidth(8),
        padding: scaleWidth(4),
    },
    backButton: {
        marginRight: scaleWidth(12),
    },
    closeButton: {
        marginLeft: scaleWidth(12),
    },
    headerTitle: {
        fontSize: scaleFont(18),
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
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
        color: '#333',
    },
    listContainer: {
        paddingHorizontal: scaleWidth(10),
        flexGrow: 1,
        paddingBottom: 80,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: scaleHeight(12),
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: scaleWidth(40),
        height: scaleWidth(40),
        borderRadius: scaleWidth(25),
    },
    userNameContainer: {
        marginLeft: scaleWidth(12),
        flex: 1,
    },
    userName: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: '#333',
    },
    userHandle: {
        fontSize: scaleFont(14),
        color: '#888',
        marginTop: scaleHeight(2),
    },
    followButton: {
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(8),
        borderRadius: scaleWidth(20),
    },
    followButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: scaleFont(14),
    },
    followingButton: {
        borderWidth: 1,
        borderColor: customColors.primary,
        borderRadius: scaleWidth(20),
        padding: scaleWidth(6),
    },
    followingButtonText: {
        color: customColors.primary,
        fontWeight: '600',
        fontSize: scaleFont(14),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scaleHeight(40),
    },
    emptyText: {
        fontSize: scaleFont(16),
        color: '#888',
    },
    errorText: {
        fontSize: scaleFont(16),
        color: customColors.error, // Ensure this color is defined in customColors
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

export default SearchUser;