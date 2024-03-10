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

export const createPostSuccess = createAction('[Post] Create Post Success');

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

//get by share
export const getByShareId = createAction(
  '[Post] Get By Share Id',
  props<{ page: number; size: number }>(),
);

export const getByShareIdSuccess = createAction(
  '[Post] Get By Share Id Success',
  props<{ list: PostResponse }>(),
);

export const getByShareIdFailure = createAction(
  '[Post] Get By Share Id Failure',
  props<{ message: string }>(),
);

//get by mention
export const getByMentionId = createAction(
  '[Post] Get By Mention Id',
  props<{ page: number; size: number }>(),
);

export const getByMentionIdSuccess = createAction(
  '[Post] Get By Mention Id Success',
  props<{ list: PostResponse }>(),
);

export const getByMentionIdFailure = createAction(
  '[Post] Get By Mention Id Failure',
  props<{ message: string }>(),
);
