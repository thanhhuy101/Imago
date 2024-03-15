import { createReducer, on } from '@ngrx/store';
import { CommentState } from './comment.state';
import * as CommentActions from './comment.actions';

const initialState: CommentState = {
  // create comment
  isCreatingComment: false,
  createCommentSuccess: false,
  createCommentError: '',

  // get comments
  comments: [],
  isGettingComments: false,
  getCommentsSuccess: false,
  getCommentsError: '',
};

export const commentReducer = createReducer(
  initialState,

  // create comment
  on(CommentActions.createComment, (state) => {
    return {
      ...state,
      isCreatingComment: true,
      createCommentSuccess: false,
      createCommentError: '',
    };
  }),
  on(CommentActions.createCommentSuccess, (state) => {
    return {
      ...state,
      isCreatingComment: false,
      createCommentSuccess: true,
      createCommentError: '',
    };
  }),
  on(CommentActions.createCommentFailure, (state, { error }) => {
    return {
      ...state,
      isCreatingComment: false,
      createCommentSuccess: false,
      createCommentError: error,
    };
  }),

  // get comments
  on(CommentActions.getComments, (state) => {
    return {
      ...state,
      isGettingComments: true,
      getCommentsSuccess: false,
      getCommentsError: '',
    };
  }),
  on(CommentActions.getCommentsSuccess, (state, { comments }) => {
    return {
      ...state,
      isGettingComments: false,
      getCommentsSuccess: true,
      getCommentsError: '',
      comments,
    };
  }),
  on(CommentActions.getCommentsFailure, (state, { error }) => {
    return {
      ...state,
      isGettingComments: false,
      getCommentsSuccess: false,
      getCommentsError: error,
    };
  }),
);
