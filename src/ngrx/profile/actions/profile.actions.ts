import { createAction, props } from '@ngrx/store';
import { ProfileModel } from '../../../app/model/profile.model';

export const getAllProfile = createAction(
  '[getAllProfile] Get All Profile',
  props<{ id: string }>(),
);
export const getAllProfileSuccess = createAction(
  '[getAllProfile] Get All Profile Success',
  props<{ profileList: ProfileModel[] }>(),
);
export const getAllProfileFailure = createAction(
  '[getAllProfile] Get All Profile Failure',
  props<{ getAllProfilesErrorMessage: string }>(),
);

export const getProfile = createAction(
  '[Profile] Get Profile',
  props<{ id: string }>(),
);
export const getProfileSuccess = createAction(
  '[Profile] Get Profile Success',
  props<{ profile: ProfileModel }>(),
);
export const getProfileFailure = createAction(
  '[Profile] Get Profile Failure',
  props<{ getProfileErrorMessage: string }>(),
);

export const createProfile = createAction(
  '[Profile] Create Profile',
  props<{ profile: ProfileModel }>(),
);
export const createProfileSuccess = createAction(
  '[Profile] Create Profile Success',
  props<{ profile: ProfileModel }>(),
);
export const createProfileFailure = createAction(
  '[Profile] Create Profile Failure',
  props<{ createProfileErrorMessage: string }>(),
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ profile: ProfileModel }>(),
);
export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
);
export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ updateProfileErrorMessage: string }>(),
);
