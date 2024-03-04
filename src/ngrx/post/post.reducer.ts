import * as PostActions from './post.action';
import {PostModel} from "../../app/model/post.model";
import {createReducer, on} from "@ngrx/store";

const initialState = {
  postList: [] as PostModel[],
  loading: false,
  error: ''
}

export const postReducer = createReducer(
  initialState,
  on(PostActions.getAllPost, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(PostActions.getAllPostSuccess, (state, {postList}) => {
    return {
      ...state,
      postList: postList,
      loading: false
    }
  }),
  on(PostActions.getAllPostFailure, (state, {getAllPostErrorMessage}) => {
    return {
      ...state,
      error: getAllPostErrorMessage,
      loading: false
    }
  })
);
