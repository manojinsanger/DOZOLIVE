import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  StatusBar,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { scaleWidth, scaleHeight, scaleFont } from '@/constants/scaling';
import customColors from '@/constants/styles';
import profileimage from'@/assets/images/blank_state/user.png'
import {
  getPostById,
  addComment,
  getComments,
  deleteComment,
  likePost,
  dislikePost,
  removeLike,
  removeDislike,
} from '@/store/features/Post_related/createPostServices';
import { PostResponse, CommentResponse } from '@/store/features/Post_related/postTypes';
import { useUser } from '@/context/UserProvider';

interface ExtendedPostResponse extends PostResponse {
  userLiked: boolean;
  userDisliked: boolean;
}

const PostDetailScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const [post, setPost] = useState<ExtendedPostResponse | null>(null);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [actionLoading, setActionLoading] = useState(false); // Added for like/dislike loading state
  const { userAllDetails } = useUser();
  const userId = userAllDetails.id;

  // Safely access postId
  const postId = route?.params?.postId;

  const fetchPost = useCallback(async () => {
    if (!postId) {
      Alert.alert('Error', 'Invalid post ID');
      navigation.goBack();
      return;
    }
    setLoading(true);
    try {
      console.log('Fetching post for postId:', postId);
      const response = await getPostById(parseInt(postId, 10));
      setPost({
        ...response,
        userLiked: response.userHasLiked || false,
        userDisliked: response.userHasDisliked || false,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  }, [postId, navigation]);

  const fetchComments = useCallback(async (newPage: number = 1) => {
    if (!postId) return;
    setCommentLoading(true);
    try {
      console.log('Fetching comments for postId:', postId, 'page:', newPage);
      const response = await getComments(parseInt(postId, 10), newPage, 10);
      setComments(prevComments => (
        newPage === 1 ? response.comments : [...prevComments, ...response.comments]
      ));
      setTotalPages(response.totalPages);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch comments');
    } finally {
      setCommentLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  const handleAddComment = async () => {
    if (!commentContent.trim()) {
      Alert.alert('Error', 'Comment content is required');
      return;
    }
    if (commentContent.length > 1000) {
      Alert.alert('Error', 'Comment must be less than 1000 characters');
      return;
    }
    if (!postId) {
      Alert.alert('Error', 'Invalid post ID');
      return;
    }
    setCommentLoading(true);
    try {
      const comment = await addComment(parseInt(postId, 10), commentContent);
      setComments(prev => [comment, ...prev]);
      setCommentContent('');
      setPost(prev => prev ? { ...prev, commentCount: (prev.commentCount || 0) + 1 } : prev);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!userId) {
      Alert.alert('Error', 'Please log in to delete comments');
      return;
    }
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteComment(parseInt(postId, 10), parseInt(commentId, 10));
              setComments(prev => prev.filter(comment => comment.id !== commentId));
              setPost(prev => prev ? { ...prev, commentCount: (prev.commentCount || 0) - 1 } : prev);
              Alert.alert('Success', 'Comment deleted successfully');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete comment');
            }
          },
        },
      ]
    );
  };

  const handleLike = async () => {
    if (!post || !postId || !userId) {
      Alert.alert('Error', 'Please log in to like posts');
      return;
    }
    setActionLoading(true);
    try {
      if (post.userLiked) {
        await removeLike(parseInt(postId, 10));
      } else {
        await likePost(parseInt(postId, 10));
      }
      // Fetch updated post data
      const updatedPost = await getPostById(parseInt(postId, 10));
      setPost({
        ...updatedPost,
        userLiked: updatedPost.userHasLiked || false,
        userDisliked: updatedPost.userHasDisliked || false,
      });
    } catch (error: any) {
      if (error.message.includes('You already liked this post')) {
        // If already liked, try removing the like
        try {
          await removeLike(parseInt(postId, 10));
          const updatedPost = await getPostById(parseInt(postId, 10));
          setPost({
            ...updatedPost,
            userLiked: updatedPost.userHasLiked || false,
            userDisliked: updatedPost.userHasDisliked || false,
          });
        } catch (removeError: any) {
          Alert.alert('Error', removeError.message || 'Failed to process like');
        }
      } else {
        Alert.alert('Error', error.message || 'Failed to process like');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDislike = async () => {
    if (!post || !userId || !postId) {
      Alert.alert('Error', 'Please log in to dislike posts');
      return;
    }
    setActionLoading(true);
    try {
      if (post.userDisliked) {
        await removeDislike(parseInt(postId, 10));
      } else {
        await dislikePost(parseInt(postId, 10));
      }
      // Fetch updated post data
      const updatedPost = await getPostById(parseInt(postId, 10));
      setPost({
        ...updatedPost,
        userLiked: updatedPost.userHasLiked || false,
        userDisliked: updatedPost.userHasDisliked || false,
      });
    } catch (error: any) {
      if (error.message.includes('You already disliked this post')) {
        // If already disliked, try removing the dislike
        try {
          await removeDislike(parseInt(postId, 10));
          const updatedPost = await getPostById(parseInt(postId, 10));
          setPost({
            ...updatedPost,
            userLiked: updatedPost.userHasLiked || false,
            userDisliked: updatedPost.userHasDisliked || false,
          });
        } catch (removeError: any) {
          Alert.alert('Error', removeError.message || 'Failed to process dislike');
        }
      } else {
        Alert.alert('Error', error.message || 'Failed to process dislike');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const renderComment = ({ item }: { item: CommentResponse }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Image
          source={
            item.user.profileImage && item.user.profileImage !== 'profileimage'
              ? { uri: item.user.profileImage }
              : profileimage
          }
          style={styles.commentAvatar}
        />
        <View>
          <Text style={styles.commentAuthor}>{item.user.name}</Text>
          <Text style={styles.commentDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text style={styles.commentContent}>{item.content}</Text>
      {item.userId === userId && (
        <TouchableOpacity
          style={styles.deleteCommentButton}
          onPress={() => handleDeleteComment(item.id)}
          accessibilityLabel="Delete comment"
          accessibilityHint="Removes your comment from this post"
        >
          <Ionicons name="trash-outline" size={scaleFont(18)} color={customColors.error} />
        </TouchableOpacity>
      )}
    </View>
  );

  if (!postId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Invalid post ID</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading || !post) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={customColors.gray600} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <Image
            source={
              post.author.profileImage && post.author.profileImage !== 'profileimage'
                ? { uri: post.author.profileImage }
                : profileimage
            }
            style={styles.avatar}
          />
          <View>
            <Text style={styles.authorName}>{post.author.name}</Text>
            <Text style={styles.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
        <Text style={styles.description}>{post.description}</Text>
        {post.files.length > 0 && (
          <FlatList
            data={post.files}
            horizontal
            renderItem={({ item: uri, index }) => (
              <TouchableOpacity onPress={() => openImageModal(index)}>
                <Image source={{ uri: `https://dozoapi.com${uri}` }} style={styles.postImage} />
              </TouchableOpacity>
            )}
            keyExtractor={(uri, index) => `${uri}-${index}`}
            style={styles.imageList}
          />
        )}
        <View style={styles.tags}>
          {post.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}
            disabled={actionLoading}
            accessibilityLabel={post.userLiked ? "Remove like" : "Like post"}
            accessibilityHint={post.userLiked ? "Removes your like from this post" : "Likes this post"}
          >
            {actionLoading ? (
              <ActivityIndicator size="small" color="#22c55e" />
            ) : (
              <Ionicons
                name={post.userLiked ? "thumbs-up" : "thumbs-up-outline"}
                size={scaleFont(20)}
                color={post.userLiked ? '#22c55e' : customColors.gray600}
              />
            )}
            <Text style={[styles.actionText, post.userLiked && styles.likedText]}>
              {post.likeCount || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDislike}
            disabled={actionLoading}
            accessibilityLabel={post.userDisliked ? "Remove dislike" : "Dislike post"}
            accessibilityHint={post.userDisliked ? "Removes your dislike from this post" : "Dislikes this post"}
          >
            {actionLoading ? (
              <ActivityIndicator size="small" color={customColors.error} />
            ) : (
              <Ionicons
                name={post.userDisliked ? "thumbs-down" : "thumbs-down-outline"}
                size={scaleFont(20)}
                color={post.userDisliked ? customColors.error : customColors.gray600}
              />
            )}
            <Text style={[styles.actionText, post.userDisliked && styles.dislikedText]}>
              {post.dislikeCount || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {}}
            accessibilityLabel="View comments"
            accessibilityHint="Shows the comments for this post"
          >
            <Ionicons name="chatbubble-outline" size={scaleFont(20)} color={customColors.gray600} />
            <Text style={styles.actionText}>{post.commentCount || 0}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>Comments</Text>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            value={commentContent}
            onChangeText={setCommentContent}
            placeholder="Add a comment..."
            placeholderTextColor={customColors.gray600}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[styles.commentSubmitButton, commentLoading && styles.submitButtonDisabled]}
            onPress={handleAddComment}
            disabled={commentLoading}
            accessibilityLabel="Submit comment"
            accessibilityHint="Posts your comment to this post"
          >
            {commentLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send" size={scaleFont(20)} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={item => item.id}
          onEndReached={() => {
            if (page < totalPages && !commentLoading) {
              setPage(prev => prev + 1);
              fetchComments(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={commentLoading ? <ActivityIndicator size="small" color={customColors.gray600} /> : null}
        />
      </View>
      {/* Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        {post && (
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
              data={post.files}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: scaleHeight(50),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: scaleFont(16),
    color: customColors.error,
    marginBottom: scaleHeight(20),
  },
  backButton: {
    backgroundColor: '#22c55e',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: scaleWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(8),
  },
  avatar: {
    width: scaleWidth(40),
    height: scaleHeight(40),
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
  description: {
    fontSize: scaleFont(14),
    color: '#333',
    marginBottom: scaleHeight(8),
  },
  imageList: {
    marginBottom: scaleHeight(8),
  },
  postImage: {
    width: scaleWidth(120),
    height: scaleHeight(120),
    borderRadius: scaleWidth(5),
    marginRight: scaleWidth(10),
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: scaleHeight(8),
  },
  tag: {
    fontSize: scaleFont(12),
    color: '#22c55e',
    marginRight: scaleWidth(8),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(8),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: scaleFont(14),
    color: customColors.gray600,
    marginLeft: scaleWidth(4),
  },
  likedText: {
    color: '#22c55e',
    fontWeight: '600',
  },
  dislikedText: {
    color: customColors.error,
    fontWeight: '600',
  },
  commentSection: {
    flex: 1,
    padding: scaleWidth(16),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: scaleHeight(12),
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(12),
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: customColors.gray200,
    borderRadius: scaleWidth(10),
    padding: scaleHeight(8),
    fontSize: scaleFont(14),
    color: '#333',
  },
  commentSubmitButton: {
    backgroundColor: '#22c55e',
    padding: scaleWidth(10),
    borderRadius: scaleWidth(10),
    marginLeft: scaleWidth(8),
  },
  submitButtonDisabled: {
    backgroundColor: customColors.gray500,
  },
  commentContainer: {
    padding: scaleWidth(12),
    borderBottomWidth: 1,
    borderBottomColor: customColors.gray200,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(4),
  },
  commentAvatar: {
    width: scaleWidth(30),
    height: scaleHeight(30),
    borderRadius: scaleWidth(15),
    marginRight: scaleWidth(8),
  },
  commentAuthor: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#333',
  },
  commentDate: {
    fontSize: scaleFont(12),
    color: customColors.gray600,
  },
  commentContent: {
    fontSize: scaleFont(14),
    color: '#333',
  },
  deleteCommentButton: {
    position: 'absolute',
    top: scaleHeight(12),
    right: scaleWidth(12),
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

export default PostDetailScreen;