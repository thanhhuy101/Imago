import { createAction, props } from '@ngrx/store';
import { PostModel } from '../../app/model/post.model';

export const getAllPost = createAction(
  '[Post] Get All Post',
  props<{ token: string }>(),
);

export const getAllPostSuccess = createAction(
  '[Post] Get All Post Success',
  props<{ postList: PostModel[] }>(),
);

export const getAllPostFailure = createAction(
  '[Post] Get All Post Failure',
  props<{ getAllPostErrorMessage: string }>(),
);
