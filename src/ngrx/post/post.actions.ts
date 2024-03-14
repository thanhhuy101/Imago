import { createAction, props } from '@ngrx/store';
import { PostModel, PostResponse } from '../../app/model/post.model';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export const create = createAction(
  '[Post] Create',
  props<{ post: PostModel }>(),
);
export const createSuccess = createAction('[Post] Create Success');
export const createFailure = createAction(
  '[Post] Create Failure',
  props<{ createErrorMessage: HttpErrorResponseModel }>(),
);

export const update = createAction(
  '[Post] Update',
  props<{ post: PostModel }>(),
);
export const updateSuccess = createAction('[Post] Update Success');
export const updateFailure = createAction(
  '[Post] Update Failure',
  props<{ updateErrorMessage: HttpErrorResponseModel }>(),
);

export const deletePost = createAction(
  '[Post] Delete',
  props<{ id: string }>(),
);
export const deletePostSuccess = createAction('[Post] Delete Success');
export const deletePostFailure = createAction(
  '[Post] Delete Failure',
  props<{ deleteErrorMessage: HttpErrorResponseModel }>(),
);

export const getAll = createAction(
  '[Post] Get All',
  props<{ page: number; size: number }>(),
);
export const getAllSuccess = createAction(
  '[Post] Get All Success',
  props<{ postResponse: PostResponse }>(),
);
export const getAllFailure = createAction(
  '[Post] Get All Failure',
  props<{ errorGetAllMessage: HttpErrorResponseModel }>(),
);

export const getMine = createAction(
  '[Post] Get Mine',
  props<{ page: number; size: number }>(),
);
export const getMineSuccess = createAction(
  '[Post] Get Mine Success',
  props<{ postResponse: PostResponse }>(),
);
export const getMineFailure = createAction(
  '[Post] Get Mine Failure',
  props<{ errorGetMineMessage: HttpErrorResponseModel }>(),
);

export const getByShare = createAction(
  '[Post] Get By Share',
  props<{ page: number; size: number }>(),
);
export const getByShareSuccess = createAction(
  '[Post] Get By Share Success',
  props<{ postResponse: PostResponse }>(),
);
export const getByShareFailure = createAction(
  '[Post] Get By Share Failure',
  props<{ errorGetByShareMessage: HttpErrorResponseModel }>(),
);

export const getByMention = createAction(
  '[Post] Get By Mention',
  props<{ page: number; size: number }>(),
);
export const getByMentionSuccess = createAction(
  '[Post] Get By Mention Success',
  props<{ postResponse: PostResponse }>(),
);
export const getByMentionFailure = createAction(
  '[Post] Get By Mention Failure',
  props<{ errorGetByMentionMessage: HttpErrorResponseModel }>(),
);

export const search = createAction('[Post] Search', props<{ query: string }>());
export const searchSuccess = createAction(
  '[Post] Search Success',
  props<{ postSearchResult: PostModel[] }>(),
);
export const searchFailure = createAction(
  '[Post] Search Failure',
  props<{ errorSearchMessage: HttpErrorResponseModel }>(),
);

export const reaction = createAction(
  '[Post] Reaction',
  props<{ postId: string; senderId: string }>(),
);
export const reactionSuccess = createAction('[Post] Reaction Success');
export const reactionFailure = createAction(
  '[Post] Reaction Failure',
  props<{ reactionErrorMessage: HttpErrorResponseModel }>(),
);

//unreaction
export const unReaction = createAction(
  '[Post] UnReaction',
  props<{ postId: string; senderId: string }>(),
);
export const unReactionSuccess = createAction('[Post] UnReaction Success');
export const unReactionFailure = createAction(
  '[Post] UnReaction Failure',
  props<{ reactionErrorMessage: HttpErrorResponseModel }>(),
);

export const clearMessages = createAction('[Post] Clear Message');
export const clearCreateState = createAction('[Post] Clear Create State');
export const clearUpdateState = createAction('[Post] Clear Update State');
export const clearGetState = createAction('[Post] Clear Get State');
export const clearDeleteState = createAction('[Post] Clear Delete State');
export const clearSearchState = createAction('[Post] Clear Search State');
