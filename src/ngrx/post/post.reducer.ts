import * as PostActions from './post.action';
import { PostModel } from '../../app/model/post.model';
import { createReducer, on } from '@ngrx/store';

const initialState = {
  postList: [] as PostModel[],
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
);
