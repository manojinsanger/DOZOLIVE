import { useState } from 'react';
import { followApi } from '@/services/followApi';
import {
  FollowResponse,
  UnfollowResponse,
  FollowListResponse,
  SearchUsersResponse,
  NotificationListResponse,
  FollowCounts,
} from '@/types/follow.types';

export const useFollow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Follow a user
  const followUser = async (userId: number): Promise<FollowResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await followApi.followUser(userId);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to follow user');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Unfollow a user
  const unfollowUser = async (userId: number): Promise<UnfollowResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await followApi.unfollowUser(userId);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unfollow user');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getFollowers = async (
    liveId: number | null = null,
    name: string | null = null,
    page: number = 1,
    limit: number = 15
  ): Promise<FollowListResponse | null> => {
    try {
      console.log("search", liveId, name)
      const response = await followApi.getFollowers(liveId, name, page, limit);
      return response;
    } catch (err) {
      console.error('Error fetching followers:', err);
      throw err instanceof Error ? err : new Error('Failed to get followers');
    }
  };

  // Get following list
  const getFollowing = async (
    liveId: number | null = null,
    name: string | null = null,
    page: number = 1,
    limit: number = 15
  ): Promise<FollowListResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      // console.log("search", liveId, name)
      const response = await followApi.getFollowing(liveId, name, page, limit);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get following users');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Search users
  const searchUsers = async (
    searchInput: string | null = null,
    page: number = 1,
    limit: number = 15
  ): Promise<SearchUsersResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await followApi.searchUsers(searchInput, page, limit);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search users');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  // Get friends list
  const getFriends = async (
    liveId: number | null = null,
    name: string | null = null,
    page: number = 1,
    limit: number = 15
  ): Promise<FollowListResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await followApi.getFriends(liveId, name, page, limit);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get friends');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const isFollowing = async (followingId: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await followApi.isFollowing(followingId);
      console.log('isFollowing response:', res);
      return res
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check follow status');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  // Get follow counts
  const getFollowCounts = async (
    userId?: number,
    liveId?: number
  ): Promise<FollowCounts | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await followApi.getFollowCounts(userId, liveId);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get follow counts');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get notifications
  const getNotifications = async (
    page: number = 1,
    limit: number = 15
  ): Promise<NotificationListResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await followApi.getNotifications(page, limit);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get notifications');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle follow status
  const toggleFollow = async (userId: number, currentlyFollowing: boolean): Promise<boolean> => {
    if (currentlyFollowing) {
      const result = await unfollowUser(userId);
      return result !== null;
    } else {
      const result = await followUser(userId);
      return result !== null;
    }
  };

  return {
    // State
    isLoading,
    error,
    
    // Basic follow actions
    followUser,
    unfollowUser,
    isFollowing,
    toggleFollow,
    
    // Lists and search
    getFollowers,
    getFollowing,
    getFriends,
    searchUsers,
    
    // Stats and notifications
    getFollowCounts,
    getNotifications,
  };
};