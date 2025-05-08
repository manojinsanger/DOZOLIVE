import { createSlice } from '@reduxjs/toolkit';
import { PostResponse, GetPostsResponse, CommentResponse, GetCommentsResponse } from './createPostServices';

// Initial state for the post
const initialState = {
  posts: [] as PostResponse[],
  currentPost: null as PostResponse | null,
  comments: [] as CommentResponse[],
  totalPosts: 0,
  totalComments: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  error: null as string | null,
};

// Create the slice for post
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess: (state, action: { payload: PostResponse }) => {
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
    },
    createPostFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePost: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action: { payload: PostResponse }) => {
      state.loading = false;
      state.posts = state.posts.map(post =>
        post.id === action.payload.id ? action.payload : post
      );
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
    },
    updatePostFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePost: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action: { payload: number }) => {
      state.loading = false;
      state.posts = state.posts.filter(post => post.id !== action.payload.toString());
      if (state.currentPost?.id === action.payload.toString()) {
        state.currentPost = null;
      }
    },
    deletePostFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPosts: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action: { payload: GetPostsResponse }) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
    getPostsFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPostById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPostByIdSuccess: (state, action: { payload: PostResponse }) => {
      state.loading = false;
      state.currentPost = action.payload;
    },
    getPostByIdFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    likePost: (state) => {
      state.loading = true;
      state.error = null;
    },
    likePostSuccess: (state, action: { payload: number }) => {
      state.loading = false;
      state.posts = state.posts.map(post =>
        post.id === action.payload.toString()
          ? { ...post, likeCount: (post.likeCount || 0) + 1, dislikeCount: (post.dislikeCount || 0) - (post.dislikeCount ? 1 : 0) }
          : post
      );
      if (state.currentPost?.id === action.payload.toString()) {
        state.currentPost = {
          ...state.currentPost,
          likeCount: (state.currentPost.likeCount || 0) + 1,
          dislikeCount: (state.currentPost.dislikeCount || 0) - (state.currentPost.dislikeCount ? 1 : 0),
        };
      }
    },
    likePostFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    dislikePost: (state) => {
      state.loading = true;
      state.error = null;
    },
    dislikePostSuccess: (state, action: { payload: number }) => {
      state.loading = false;
      state.posts = state.posts.map(post =>
        post.id === action.payload.toString()
          ? { ...post, dislikeCount: (post.dislikeCount || 0) + 1, likeCount: (post.likeCount || 0) - (post.likeCount ? 1 : 0) }
          : post
      );
      if (state.currentPost?.id === action.payload.toString()) {
        state.currentPost = {
          ...state.currentPost,
          dislikeCount: (state.currentPost.dislikeCount || 0) + 1,
          likeCount: (state.currentPost.likeCount || 0) - (state.currentPost.likeCount ? 1 : 0),
        };
      }
    },
    dislikePostFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeLike: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeLikeSuccess: (state, action: { payload: number }) => {
      state.loading = false;
      state.posts = state.posts.map(post =>
        post.id === action.payload.toString()
          ? { ...post, likeCount: (post.likeCount || 0) - 1 }
          : post
      );
      if (state.currentPost?.id === action.payload.toString()) {
        state.currentPost = {
          ...state.currentPost,
          likeCount: (state.currentPost.likeCount || 0) - 1,
        };
      }
    },
    removeLikeFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeDislike: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeDislikeSuccess: (state, action: { payload: number }) => {
      state.loading = false;
      state.posts = state.posts.map(post =>
        post.id === action.payload.toString()
          ? { ...post, dislikeCount: (post.dislikeCount || 0) - 1 }
          : post
      );
      if (state.currentPost?.id === action.payload.toString()) {
        state.currentPost = {
          ...state.currentPost,
          dislikeCount: (state.currentPost.dislikeCount || 0) - 1,
        };
      }
    },
    removeDislikeFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    addComment: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCommentSuccess: (state, action: { payload: CommentResponse }) => {
      state.loading = false;
      state.comments = [action.payload, ...state.comments];
      state.posts = state.posts.map(post =>
        post.id === action.payload.postId
          ? { ...post, commentCount: (post.commentCount || 0) + 1 }
          : post
      );
      if (state.currentPost?.id === action.payload.postId) {
        state.currentPost = {
          ...state.currentPost,
          commentCount: (state.currentPost.commentCount || 0) + 1,
        };
      }
    },
    addCommentFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    getComments: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCommentsSuccess: (state, action: { payload: GetCommentsResponse }) => {
      state.loading = false;
      state.comments = action.payload.comments;
      state.totalComments = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },
    getCommentsFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteComment: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCommentSuccess: (state, action: { payload: { postId: number; commentId: number } }) => {
      state.loading = false;
      state.comments = state.comments.filter(comment => comment.id !== action.payload.commentId.toString());
      state.posts = state.posts.map(post =>
        post.id === action.payload.postId.toString()
          ? { ...post, commentCount: (post.commentCount || 0) - 1 }
          : post
      );
      if (state.currentPost?.id === action.payload.postId.toString()) {
        state.currentPost = {
          ...state.currentPost,
          commentCount: (state.currentPost.commentCount || 0) - 1,
        };
      }
    },
    deleteCommentFailure: (state, action: { payload: string }) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions
export const {
  createPost,
  createPostSuccess,
  createPostFailure,
  updatePost,
  updatePostSuccess,
  updatePostFailure,
  deletePost,
  deletePostSuccess,
  deletePostFailure,
  getPosts,
  getPostsSuccess,
  getPostsFailure,
  getPostById,
  getPostByIdSuccess,
  getPostByIdFailure,
  likePost,
  likePostSuccess,
  likePostFailure,
  dislikePost,
  dislikePostSuccess,
  dislikePostFailure,
  removeLike,
  removeLikeSuccess,
  removeLikeFailure,
  removeDislike,
  removeDislikeSuccess,
  removeDislikeFailure,
  addComment,
  addCommentSuccess,
  addCommentFailure,
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
} = postSlice.actions;

// Export the reducer to be used in the store
export default postSlice.reducer;