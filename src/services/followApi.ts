import { fetchToken } from '@/controllers/fetchToken';
import { axiosInstance } from '@/services/apiUrl';
import {
  FollowResponse,
  UnfollowResponse,
  FollowListResponse,
  SearchUsersResponse,
  NotificationListResponse,
  FollowCounts,
} from '@/types/follow.types';

// Add auth token globally
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await fetchToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const followApi = {
  // Follow a user
  followUser: async (userId: number): Promise<FollowResponse> => {
    const response = await axiosInstance.post('/follow/follow', { userId });
    return response.data.data;
  },

  // Unfollow a user
  unfollowUser: async (userId: number): Promise<UnfollowResponse> => {
    const response = await axiosInstance.post('/follow/unfollow', { userId });
    return response.data.data;
  },

  // Get list of followers
  getFollowers: async (
    liveId: number | null = null,
    name: string | null = null,
    page: number = 1,
    limit: number = 15
  ): Promise<FollowListResponse> => {
    const response = await axiosInstance.get('/follow/followers', {
      params: { liveId, name, page, limit },
    });
    return response.data.data;
  },

  // Get list of following
  getFollowing: async (
    liveId: number | null = null,
    name: string | null = null,
    page: number = 1,
    limit: number = 15
  ): Promise<FollowListResponse> => {
    const response = await axiosInstance.get('/follow/following', {
      params: { liveId, name, page, limit },
    });
    return response.data.data;
  },

  // Search users
  searchUsers: async (
    searchInput: string | null,
    page: number = 1,
    limit: number = 15
  ): Promise<SearchUsersResponse> => {
    const response = await axiosInstance.get('/follow/search', {
      params: { searchInput, page, limit },
    });
    return response.data.data;
  },

  // Get list of friends
  getFriends: async (
    liveId: number | null = null,
    name: string | null = null,
    page: number = 1,
    limit: number = 15
  ): Promise<FollowListResponse> => {
    const response = await axiosInstance.get('/follow/friends', {
      params: { liveId, name, page, limit },
    });
    return response.data.data;
  },

  // Check if user is following another user
  isFollowing: async (followingId: number): Promise<boolean> => {
    const response = await axiosInstance.get('/follow/is-following', {
      params: { followingId },
    });
    // console.log('Is following response:', response.data.data.isFollowing);
    return response.data.data.isFollowing;
  },

  // Get follow counts
  getFollowCounts: async (
    userId?: number,
    liveId?: number
  ): Promise<FollowCounts> => {
    const response = await axiosInstance.get('/follow/follow-count', {
      params: { userId, liveId },
    });
    return response.data.data;
  },

  // Get follow counts
  getNumberOfFollowers: async (
    userId?: number,
    liveId?: number
  ): Promise<FollowCounts> => {
    const response = await axiosInstance.get('/follow/followstats', );
    return response.data.data;
  },
  // Get notifications
  getNotifications: async (page: number = 1, limit: number = 15): Promise<NotificationListResponse> => {
    const response = await axiosInstance.get('/follow/notifications', { params: { page, limit } });
    return response.data.data;
  },
};