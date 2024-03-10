import { createAction, props } from '@ngrx/store';
import { PostModel, PostResponse } from '../../app/model/post.model';

export const getAllPost = createAction(
  '[Post] Get All Post',
  props<{ token: string }>(),
);

export const getAllPostSuccess = createAction(
  '[Post] Get All Post Success',
  props<{ list: PostResponse }>(),
);

export const getAllPostFailure = createAction(
  '[Post] Get All Post Failure',
  props<{ getAllPostErrorMessage: string }>(),
);

//create post
export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: PostModel }>(),
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ post: PostModel }>(),
);

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ message: string }>(),
);

//get mine
export const getMine = createAction(
  '[Post] Get Mine',
  props<{ page: number; size: number }>(),
);

export const getMineSuccess = createAction(
  '[Post] Get Mine Success',
  props<{ list: PostResponse }>(),
);

export const getMineFailure = createAction(
  '[Post] Get Mine Failure',
  props<{ message: string }>(),
);
