export enum NotificationType {
    LIKE = 'LIKE',
    DISLIKE = 'DISLIKE',
    COMMENT = 'COMMENT',
    POST = 'POST',
  }
  
  export interface PostState {
    posts: PostResponse[];
    currentPost: PostResponse | null;
    comments: CommentResponse[];
    totalPosts: number;
    totalComments: number;
    page: number;
    limit: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
  }
  
  export interface PostResponse {
    id: string;
    description: string;
    tags: string[];
    files: string[];
    author: {
      id: string;
      name: string;
      profileImage: string | null;
    };
    likeCount?: number;
    dislikeCount?: number;
    commentCount?: number;
    createdAt: string;
  }
  
  export interface CreatePostData {
    description?: string;
    tags?: string;
    files?: string[];
  }
  
  export interface UpdatePostData {
    description?: string;
    tags?: string;
    files?: string[];
  }
  
  export interface CommentResponse {
    id: string;
    content: string;
    userId: string;
    postId: string;
    user: {
      id: string;
      name: string;
      profileImage: string | null;
    };
    createdAt: string;
  }
  
  export interface GetPostsResponse {
    posts: PostResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  export interface GetCommentsResponse {
    comments: CommentResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }