import { PostModel, PostResponse } from './../../app/model/post.model';
import * as PostActions from './post.action';
import { createReducer, on } from '@ngrx/store';
import { PostState } from './post.state';

const initialState: PostState = {
  postList: [] as PostModel[],
  list: <PostResponse>{},
  Post: <PostModel>{},
  isSucces: false,
  isCreateFailure: false,
  isGetsucces: false,
  isGetMineSucces: false,
  loading: false,
  error: '',
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.getAllPost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      loading: true,
    };
  }),
  on(PostActions.getAllPostSuccess, (state, { postList, type }) => {
    console.log(type);
    return {
      ...state,
      postList: postList,
      loading: false,
    };
  }),
  on(
    PostActions.getAllPostFailure,
    (state, { getAllPostErrorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        error: getAllPostErrorMessage,
        loading: false,
      };
    },
  ),

  on(PostActions.createPost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      loading: true,
    };
  }),

  on(PostActions.createPostSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,

      loading: false,
      isSucces: true,
    };
  }),

  on(PostActions.createPostFailure, (state, { message, type }) => {
    console.log(type);
    return {
      ...state,
      error: message,
      isCreateFailure: true,
      loading: false,
      isSucces: false,
    };
  }),

  //get mine
  on(PostActions.getMine, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      list: <PostResponse>{},
      loading: true,
    };
  }),

  on(PostActions.getMineSuccess, (state, { list, type }) => {
    console.log(type);
    return {
      ...state,
      list: list,
      loading: false,
      isGetMineSucces: true,
    };
  }),

  on(PostActions.getMineFailure, (state, { message, type }) => {
    console.log(type);
    return {
      ...state,
      error: message,
      loading: false,
      isGetMineSucces: false,
    };
  }),

  //get by share
  on(PostActions.getByShareId, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      list: <PostResponse>{},
      loading: true,
    };
  }),

  on(PostActions.getByShareIdSuccess, (state, { list, type }) => {
    console.log(type);
    return {
      ...state,
      list: list,
      loading: false,
      isGetsucces: true,
    };
  }),

  on(PostActions.getByShareIdFailure, (state, { message, type }) => {
    console.log(type);
    return {
      ...state,
      error: message,
      loading: false,
      isGetsucces: false,
    };
  }),

  //get by mention
  on(PostActions.getByMentionId, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      list: <PostResponse>{},
      loading: true,
    };
  }),

  on(PostActions.getByMentionIdSuccess, (state, { list, type }) => {
    console.log(type);
    return {
      ...state,
      list: list,
      loading: false,
      isGetsucces: true,
    };
  }),

  on(PostActions.getByMentionIdFailure, (state, { message, type }) => {
    console.log(type);
    return {
      ...state,
      error: message,
      loading: false,
      isGetsucces: false,
    };
  }),
);
