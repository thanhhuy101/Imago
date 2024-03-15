import { createAction, props } from '@ngrx/store';
import {
  CommentModel,
  CommentResponseModel,
} from '../../app/model/comment.model';

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ comment: CommentModel }>(),
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
);

export const createCommentFailure = createAction(
  '[Comment] Create Comment Failure',
  props<{ error: string }>(),
);

export const getComments = createAction(
  '[Comment] Get Comments',
  props<{ postId: string; page: number }>(),
);

export const getCommentsSuccess = createAction(
  '[Comment] Get Comments Success',
  props<{ comments: CommentResponseModel[] }>(),
);

export const getCommentsFailure = createAction(
  '[Comment] Get Comments Failure',
  props<{ error: string }>(),
);

export const clearState = createAction('[Comment] Clear State');
