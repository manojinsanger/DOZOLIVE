import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from './postSlice';
import {
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
  getPosts as getPostsService,
  getPostById as getPostByIdService,
  likePost as likePostService,
  dislikePost as dislikePostService,
  removeLike as removeLikeService,
  removeDislike as removeDislikeService,
  addComment as addCommentService,
  getComments as getCommentsService,
  deleteComment as deleteCommentService,
} from './createPostServices';
import { SagaIterator } from '@redux-saga/core';

// Worker sagas
function* createPostSaga(action: any): SagaIterator {
  try {
    const post = yield call(createPostService, action.payload);
    yield put(createPostSuccess(post));
  } catch (error: any) {
    yield put(createPostFailure(error.message || 'Failed to create post'));
  }
}

function* updatePostSaga(action: any): SagaIterator {
  try {
    const { postId, postData } = action.payload;
    const post = yield call(updatePostService, postId, postData);
    yield put(updatePostSuccess(post));
  } catch (error: any) {
    yield put(updatePostFailure(error.message || 'Failed to update post'));
  }
}

function* deletePostSaga(action: any): SagaIterator {
  try {
    yield call(deletePostService, action.payload);
    yield put(deletePostSuccess(action.payload));
  } catch (error: any) {
    yield put(deletePostFailure(error.message || 'Failed to delete post'));
  }
}

function* getPostsSaga(action: any): SagaIterator {
  try {
    const { page, limit, tag, sort } = action.payload;
    const posts = yield call(getPostsService, page, limit, tag, sort);
    yield put(getPostsSuccess(posts));
  } catch (error: any) {
    yield put(getPostsFailure(error.message || 'Failed to fetch posts'));
  }
}

function* getPostByIdSaga(action: any): SagaIterator {
  try {
    const post = yield call(getPostByIdService, action.payload);
    yield put(getPostByIdSuccess(post));
  } catch (error: any) {
    yield put(getPostByIdFailure(error.message || 'Failed to fetch post'));
  }
}

function* likePostSaga(action: any): SagaIterator {
  try {
    yield call(likePostService, action.payload);
    yield put(likePostSuccess(action.payload));
  } catch (error: any) {
    yield put(likePostFailure(error.message || 'Failed to like post'));
  }
}

function* dislikePostSaga(action: any): SagaIterator {
  try {
    yield call(dislikePostService, action.payload);
    yield put(dislikePostSuccess(action.payload));
  } catch (error: any) {
    yield put(dislikePostFailure(error.message || 'Failed to dislike post'));
  }
}

function* removeLikeSaga(action: any): SagaIterator {
  try {
    yield call(removeLikeService, action.payload);
    yield put(removeLikeSuccess(action.payload));
  } catch (error: any) {
    yield put(removeLikeFailure(error.message || 'Failed to remove like'));
  }
}

function* removeDislikeSaga(action: any): SagaIterator {
  try {
    yield call(removeDislikeService, action.payload);
    yield put(removeDislikeSuccess(action.payload));
  } catch (error: any) {
    yield put(removeDislikeFailure(error.message || 'Failed to remove dislike'));
  }
}

function* addCommentSaga(action: any): SagaIterator {
  try {
    const { postId, content } = action.payload;
    const comment = yield call(addCommentService, postId, content);
    yield put(addCommentSuccess(comment));
  } catch (error: any) {
    yield put(addCommentFailure(error.message || 'Failed to add comment'));
  }
}

function* getCommentsSaga(action: any): SagaIterator {
  try {
    const { postId, page, limit } = action.payload;
    const comments = yield call(getCommentsService, postId, page, limit);
    yield put(getCommentsSuccess(comments));
  } catch (error: any) {
    yield put(getCommentsFailure(error.message || 'Failed to fetch comments'));
  }
}

function* deleteCommentSaga(action: any): SagaIterator {
  try {
    const { postId, commentId } = action.payload;
    yield call(deleteCommentService, postId, commentId);
    yield put(deleteCommentSuccess({ postId, commentId }));
  } catch (error: any) {
    yield put(deleteCommentFailure(error.message || 'Failed to delete comment'));
  }
}

// Watcher saga
export function* postSaga(): SagaIterator {
  yield takeLatest(createPost.type, createPostSaga);
  yield takeLatest(updatePost.type, updatePostSaga);
  yield takeLatest(deletePost.type, deletePostSaga);
  yield takeLatest(getPosts.type, getPostsSaga);
  yield takeLatest(getPostById.type, getPostByIdSaga);
  yield takeLatest(likePost.type, likePostSaga);
  yield takeLatest(dislikePost.type, dislikePostSaga);
  yield takeLatest(removeLike.type, removeLikeSaga);
  yield takeLatest(removeDislike.type, removeDislikeSaga);
  yield takeLatest(addComment.type, addCommentSaga);
  yield takeLatest(getComments.type, getCommentsSaga);
  yield takeLatest(deleteComment.type, deleteCommentSaga);
}