import { UserRole } from "./types";

  
  export interface User {
    isFollowing: boolean;
    id: number;
    liveId: number | null;
    name: string | null;
    email: string | null;
    profileImage: string | null;
    roles: UserRole[];
  }
  
  export interface FollowCounts {
    friends: number;
    followers: number;
    following: number;
  }
  
  export interface FollowResponse {
    followedUser: User;
  }
  
  export interface UnfollowResponse {
    unfollowedUser: User;
  }
  
  export interface FollowListResponse {
    total: number;
    totalPages: number;
    currentPage: number;
    users: User[];
  }
  
  export interface SearchUsersResponse {
    totalUsers: number;
    totalPages: number;
    currentPage: number;
    users: User[];
  }
  
  export interface NotificationDetails {
    id: number;
    message: string;
    createdAt: Date;
    forUser: User | null;
    fromUser: User | null;
  }
  
  export interface NotificationListResponse {
    total: number;
    totalPages: number;
    currentPage: number;
    notifications: NotificationDetails[];
  }
  
  export interface FollowResponse {
    success: boolean;
    message: string;
    data: {
      isFollowing: boolean;
    };
  };