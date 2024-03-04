import { createAction, props } from '@ngrx/store';

export const getProfile = createAction('[Profile] Get Profile');
export const getProfileSuccess = createAction('[Profile] Get Profile Success');
export const getProfileFailure = createAction(
  '[Profile] Get Profile Failure',
  props<{ getProfileErrorMessage: string }>(),
);
export const updateProfile = createAction('[Profile] Update Profile');
export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
);
export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ updateProfileErrorMessage: string }>(),
);
