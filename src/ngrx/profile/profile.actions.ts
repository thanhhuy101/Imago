import { createAction, props } from '@ngrx/store';
import { ProfileModel } from '../../app/model/profile.model';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export const createMine = createAction(
  '[Profile] Create Mine',
  props<{ mine: ProfileModel }>(),
);
export const createMineSuccess = createAction('[Profile] Create Mine Success');
export const createMineFailure = createAction(
  '[Profile] Create Mine Failure',
  props<{ createErrorMessage: HttpErrorResponseModel }>(),
);

export const updateMine = createAction(
  '[Profile] Update Mine',
  props<{ mine: ProfileModel }>(),
);
export const updateMineSuccess = createAction('[Profile] Update Mine Success');
export const updateMineFailure = createAction(
  '[Profile] Update Mine Failure',
  props<{ updateErrorMessage: HttpErrorResponseModel }>(),
);

export const getMine = createAction('[Profile] Get Mine');
export const getMineSuccess = createAction(
  '[Profile] Get Mine Success',
  props<{ mine: ProfileModel }>(),
);
export const getMineFailure = createAction(
  '[Profile] Get Mine Failure',
  props<{ getErrorMessage: HttpErrorResponseModel }>(),
);

export const getById = createAction(
  '[Profile] Get By Id',
  props<{ id: string }>(),
);
export const getByIdSuccess = createAction(
  '[Profile] Get By Id Success',
  props<{ profile: ProfileModel }>(),
);
export const getByIdFailure = createAction(
  '[Profile] Get By Id Failure',
  props<{ getErrorMessageById: HttpErrorResponseModel }>(),
);

export const search = createAction(
  '[Profile] Search',
  props<{ query: string }>(),
);
export const searchSuccess = createAction(
  '[Profile] Search Success',
  props<{ profileSearchResult: ProfileModel[] }>(),
);
export const searchFailure = createAction(
  '[Profile] Search Failure',
  props<{ searchErrorMessage: HttpErrorResponseModel }>(),
);

export const clearMessages = createAction('[Profile] Clear Message');
export const clearCreateState = createAction('[Profile] Clear Create State');

export const clearUpdateState = createAction('[Profile] Clear Update State');

export const clearGetState = createAction('[Profile] Clear Get State');

export const clearSearchState = createAction('[Profile] Clear Search State');
