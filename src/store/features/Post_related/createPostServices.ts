import FormData from 'form-data';
import { fetchToken } from '@/controllers/fetchToken';
import { axiosInstance } from '@/services/apiUrl';

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

export enum NotificationType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  COMMENT = 'COMMENT',
  POST = 'POST',
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
  userHasLiked?: boolean;
  userHasDisliked?: boolean;
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

export const createPost = async (postData: CreatePostData): Promise<PostResponse> => {
  try {
    const formData = new FormData();
    if (postData.description) {
      formData.append('description', postData.description);
    }
    if (postData.tags) {
      formData.append('tags', postData.tags);
    }
    if (postData.files && postData.files.length > 0) {
      postData.files.forEach((uri, index) => {
        formData.append('files', {
          uri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        } as any);
      });
    }

    const response = await axiosInstance.post('post/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data) {
      throw new Error('Failed to create post');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to create post:', error);
    throw new Error(error.response?.data?.error || 'Failed to create post');
  }
};

export const updatePost = async (postId: number, postData: UpdatePostData): Promise<PostResponse> => {
  try {
    const formData = new FormData();
    if (postData.description) {
      formData.append('description', postData.description);
    }
    if (postData.tags) {
      formData.append('tags', postData.tags);
    }
    if (postData.files && postData.files.length > 0) {
      postData.files.forEach((uri, index) => {
        formData.append('files', {
          uri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        } as any);
      });
    }

    const response = await axiosInstance.put(`post/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.data) {
      throw new Error('Failed to update post');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to update post:', error);
    throw new Error(error.response?.data?.error || 'Failed to update post');
  }
};

export const deletePost = async (postId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`post/posts/${postId}`);
    if (!response.data) {
      throw new Error('Failed to delete post');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to delete post:', error);
    throw new Error(error.response?.data?.error || 'Failed to delete post');
  }
};

export const getPosts = async (page: number = 1, limit: number = 10, tag?: string, sort: string = 'newest'): Promise<GetPostsResponse> => {
  try {
    const response = await axiosInstance.get('post/posts', {
      params: { page, limit, tag, sort },
    });
    if (!response.data) {
      throw new Error('Failed to fetch posts');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch posts:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch posts');
  }
};

export const getPostById = async (postId: number): Promise<PostResponse> => {
  try {
    const response = await axiosInstance.get(`post/posts/${postId}`);
    if (!response.data) {
      throw new Error('Failed to fetch post');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch post:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch post');
  }
};

export const likePost = async (postId: number): Promise<void> => {
  try {
    const response = await axiosInstance.post(`post/posts/${postId}/like`);
    if (!response.data) {
      throw new Error('Failed to like post');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to like post:', error);
    throw new Error(error.response?.data?.error || 'Failed to like post');
  }
};

export const dislikePost = async (postId: number): Promise<void> => {
  try {
    const response = await axiosInstance.post(`post/posts/${postId}/dislike`);
    if (!response.data) {
      throw new Error('Failed to dislike post');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to dislike post:', error);
    throw new Error(error.response?.data?.error || 'Failed to dislike post');
  }
};

export const removeLike = async (postId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`post/posts/${postId}/like`);
    if (!response.data) {
      throw new Error('Failed to remove like');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to remove like:', error);
    throw new Error(error.response?.data?.error || 'Failed to remove like');
  }
};

export const removeDislike = async (postId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`post/posts/${postId}/dislike`);
    if (!response.data) {
      throw new Error('Failed to remove dislike');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to remove dislike:', error);
    throw new Error(error.response?.data?.error || 'Failed to remove dislike');
  }
};

export const addComment = async (postId: number, content: string): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.post(`post/posts/${postId}/comments`, { content });
    if (!response.data) {
      throw new Error('Failed to add comment');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to add comment:', error);
    throw new Error(error.response?.data?.error || 'Failed to add comment');
  }
};

export const getComments = async (postId: number, page: number = 1, limit: number = 10): Promise<GetCommentsResponse> => {
  try {
    const response = await axiosInstance.get(`post/posts/${postId}/comments`, {
      params: { page, limit },
    });
    if (!response.data) {
      throw new Error('Failed to fetch comments');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch comments:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch comments');
  }
};

export const deleteComment = async (postId: number, commentId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`post/posts/${postId}/comments/${commentId}`);
    if (!response.data) {
      throw new Error('Failed to delete comment');
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to delete comment:', error);
    throw new Error(error.response?.data?.error || 'Failed to delete comment');
  }
};