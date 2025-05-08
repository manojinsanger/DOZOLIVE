import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  RefreshControl,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
import profileimage from'@/assets/images/blank_state/user.png'
import {
  getPosts,
  likePost,
  dislikePost,
  removeLike,
  removeDislike,
  deletePost,
  getPostById,
} from '@/store/features/Post_related/createPostServices';
import { PostResponse } from '@/store/features/Post_related/createPostServices';
import CustomHeader from '@/components/profile/CustomHeader';
import { ThemedView } from '@/components/ThemedView';
import MainContainer from '@/components/common/mainContainers/MainContainer';
import CreatePostButton from '@/components/posts_related/CreatePostButton';
import { useUser } from '@/context/UserProvider';
import { redirect } from '@/utils/navigationService';

import { SafeAreaView } from "react-native-safe-area-context";


const ExploreScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sort, setSort] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});
  const [selectedPost, setSelectedPost] = useState<PostResponse | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { userAllDetails } = useUser();
  const userId = userAllDetails.id;

  const fetchInitialPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPosts(1, 10, undefined, sort);
      setPosts(response.posts);
      setTotalPages(response.totalPages);
      setPage(1);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  }, [sort]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchInitialPosts();
    setRefreshing(false);
  }, [fetchInitialPosts]);

  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  const handleLoadMore = async () => {
    if (page < totalPages && !loading) {
      setLoading(true);
      try {
        const response = await getPosts(page + 1, 10, undefined, sort);
        setPosts(prev => [...prev, ...response.posts]);
        setPage(prev => prev + 1);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to load more posts');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLike = async (postId: string) => {
    if (!userId) {
      Alert.alert('Error', 'Please log in to like posts');
      return;
    }
    setActionLoading(prev => ({ ...prev, [postId]: true }));
    try {
      const post = posts.find(p => p.id === postId);
      if (post?.userHasLiked) {
        await removeLike(parseInt(postId));
      } else {
        await likePost(parseInt(postId));
      }
      // Fetch updated post data
      const updatedPost = await getPostById(parseInt(postId));
      setPosts(prev => prev.map(p => (p.id === postId ? updatedPost : p)));
    } catch (error: any) {
      if (error.message.includes('You already liked this post')) {
        // If already liked, try removing the like
        try {
          await removeLike(parseInt(postId));
          const updatedPost = await getPostById(parseInt(postId));
          setPosts(prev => prev.map(p => (p.id === postId ? updatedPost : p)));
        } catch (removeError: any) {
          Alert.alert('Error', removeError.message || 'Failed to process like');
        }
      } else {
        Alert.alert('Error', error.message || 'Failed to process like');
      }
    } finally {
      setActionLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleDislike = async (postId: string) => {
    if (!userId) {
      Alert.alert('Error', 'Please log in to dislike posts');
      return;
    }
    setActionLoading(prev => ({ ...prev, [postId]: true }));
    try {
      const post = posts.find(p => p.id === postId);
      if (post?.userHasDisliked) {
        await removeDislike(parseInt(postId));
      } else {
        await dislikePost(parseInt(postId));
      }
      // Fetch updated post data
      const updatedPost = await getPostById(parseInt(postId));
      setPosts(prev => prev.map(p => (p.id === postId ? updatedPost : p)));
    } catch (error: any) {
      if (error.message.includes('You already disliked this post')) {
        // If already disliked, try removing the dislike
        try {
          await removeDislike(parseInt(postId));
          const updatedPost = await getPostById(parseInt(postId));
          setPosts(prev => prev.map(p => (p.id === postId ? updatedPost : p)));
        } catch (removeError: any) {
          Alert.alert('Error', removeError.message || 'Failed to process dislike');
        }
      } else {
        Alert.alert('Error', error.message || 'Failed to process dislike');
      }
    } finally {
      setActionLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleDelete = async (postId: string) => {
    if (!userId) {
      Alert.alert('Error', 'Please log in to delete posts');
      return;
    }
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(parseInt(postId));
              setPosts(posts.filter(post => post.id !== postId));
              Alert.alert('Success', 'Post deleted successfully');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete post');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (post: PostResponse) => {
    redirect('UpdatePost', { post });
  };

  const openImageModal = (post: PostResponse, index: number = 0) => {
    setSelectedPost(post);
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const renderPost = ({ item }: { item: PostResponse }) => (
    

    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image
          source={
            item.author.profileImage && item.author.profileImage !== 'profileimage'
              ? { uri: item.author.profileImage }
              : profileimage
          }
          style={styles.avatar}
        />
        <View>
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.createdAt}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
        {item.author.id === userId && (
          <View style={styles.postActions}>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionIcon}>
              <Feather name="edit" size={20} color={customColors.gray700} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionIcon}>
              <Ionicons name="trash-outline" size={20} color={customColors.gray700} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.description}>{item.description}</Text>
      {item.files.length > 0 && (
        <FlatList
          data={item.files}
          horizontal
          renderItem={({ item: uri, index }) => (
            <TouchableOpacity onPress={() => openImageModal(item, index)}>
              <Image
                source={{ uri: `https://dozoapi.com${uri}` }}
                style={styles.postImage}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(uri, index) => `${uri}-${index}`}
          showsHorizontalScrollIndicator={false}
          style={styles.imageList}
        />
      )}
      <View style={styles.tagsContainer}>
        {item.tags.map(tag => (
          <Text key={tag} style={styles.tag}>#{tag}</Text>
        ))}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
          disabled={actionLoading[item.id]}
        >
          {actionLoading[item.id] ? (
            <ActivityIndicator size="small" color="#22c55e" />
          ) : (
            <Ionicons
              name={item.userHasLiked ? 'thumbs-up' : 'thumbs-up-outline'}
              size={20}
              color={item.userHasLiked ? '#22c55e' : customColors.gray600}
            />
          )}
          <Text style={[
            styles.actionText,
            item.userHasLiked && styles.likedText
          ]}>
            {item.likeCount || 0}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDislike(item.id)}
          disabled={actionLoading[item.id]}
        >
          {actionLoading[item.id] ? (
            <ActivityIndicator size="small" color={customColors.error} />
          ) : (
            <Ionicons
              name={item.userHasDisliked ? 'thumbs-down' : 'thumbs-down-outline'}
              size={20}
              color={item.userHasDisliked ? customColors.error : customColors.gray600}
            />
          )}
          <Text style={[
            styles.actionText,
            item.userHasDisliked && styles.dislikedText
          ]}>
            {item.dislikeCount || 0}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => redirect('PostDetail', { postId: item.id })}
        >
          <Ionicons name="chatbubble-outline" size={20} color={customColors.gray600} />
          <Text style={styles.actionText}>{item.commentCount || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );

  return (
      <MainContainer>
    <SafeAreaView style={{ marginBottom: scaleHeight(10) ,flex:1}}>
      <CustomHeader title="Explore" textColor='white' />
        <View style={styles.sortContainer}>
          <TouchableOpacity
            onPress={() => setSort('newest')}
            style={[styles.sortButton, sort === 'newest' && styles.sortButtonActive]}
          >
            <Text style={[styles.sortButtonText, sort === 'newest' && styles.sortButtonTextActive]}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSort('oldest')}
            style={[styles.sortButton, sort === 'oldest' && styles.sortButtonActive]}
          >
            <Text style={[styles.sortButtonText, sort === 'oldest' && styles.sortButtonTextActive]}>Oldest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSort('popular')}
            style={[styles.sortButton, sort === 'popular' && styles.sortButtonActive]}
          >
            <Text style={[styles.sortButtonText, sort === 'popular' && styles.sortButtonTextActive]}>Popular</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#22c55e" /> : null}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.createButtonContainer}>
          <CreatePostButton onPress={() => redirect('CreatePost')} />
        </View>
        {/* Image Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          {selectedPost && (
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                  accessibilityLabel="Close image modal"
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <Carousel
                width={scaleWidth(375)}
                height={scaleHeight(500)}
                data={selectedPost.files}
                defaultIndex={selectedImageIndex}
                renderItem={({ item: uri }) => (
                  <Image
                    source={{ uri: `https://dozoapi.com${uri}` }}
                    style={styles.carouselImage}
                    resizeMode="contain"
                  />
                )}
              />
            </View>
          )}
        </Modal>
  
    </SafeAreaView>
      </MainContainer>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scaleHeight(5),
    backgroundColor: customColors.gray100,
    marginHorizontal: scaleWidth(15),
    marginVertical: scaleHeight(8),
    borderRadius: 20,
  },
  sortButton: {
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(8),
    borderRadius: 15,
  },
  sortButtonActive: {
    backgroundColor: '#22c55e',
  },
  sortButtonText: {
    fontSize: scaleFont(14),
    color: customColors.gray600,
  },
  sortButtonTextActive: {
    color: customColors.white,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: scaleHeight(80),
  },
  postContainer: {
    backgroundColor: customColors.white,
    padding: scaleWidth(8),
    marginVertical: scaleHeight(8),
    marginHorizontal: scaleWidth(15),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },
  avatar: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    marginRight: scaleWidth(10),
  },
  authorName: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#333',
  },
  createdAt: {
    fontSize: scaleFont(12),
    color: customColors.gray600,
  },
  postActions: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  actionIcon: {
    marginLeft: scaleWidth(10),
  },
  description: {
    fontSize: scaleFont(14),
    color: '#333',
    marginBottom: scaleHeight(10),
    lineHeight: scaleHeight(20),
  },
  imageList: {
    marginBottom: scaleHeight(10),
  },
  postImage: {
    width: scaleWidth(150),
    height: scaleHeight(150),
    borderRadius: 8,
    marginRight: scaleWidth(10),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: scaleHeight(10),
  },
  tag: {
    fontSize: scaleFont(12),
    color: '#22c55e',
    marginRight: scaleWidth(8),
    backgroundColor: '#dcfce7',
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(4),
    borderRadius: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: customColors.gray200,
    paddingTop: scaleHeight(10),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(5),
    borderRadius: 15,
  },
  actionText: {
    fontSize: scaleFont(14),
    color: customColors.gray600,
    marginLeft: scaleWidth(5),
  },
  likedText: {
    color: '#22c55e',
    fontWeight: '600',
  },
  dislikedText: {
    color: customColors.error,
    fontWeight: '600',
  },
  createButtonContainer: {
    position: 'absolute',
    bottom: scaleHeight(20),
    right: scaleWidth(20),
    zIndex: 1000,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    position: 'absolute',
    top: scaleHeight(40),
    left: scaleWidth(20),
    zIndex: 1,
  },
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: scaleWidth(10),
  },
  carouselImage: {
    width: scaleWidth(375),
    height: scaleHeight(500),
  },
});

export default ExploreScreen;