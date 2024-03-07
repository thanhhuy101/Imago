import { createReducer, on } from '@ngrx/store';
import { ProfileModel } from '../../../app/model/profile.model';
import { ProfileState } from '../state/profile.state';
import * as ProfileActions from '../actions/profile.actions';

const initialState: ProfileState = {
  token: '',
  profile: <ProfileModel>{},
  isGettingProfile: false,
  isGetProfileSuccess: false,
  getProfileErrorMessage: '',
  isUpdatingProfile: false,
  isUpdateProfileSuccess: false,
  updateProfileErrorMessage: '',
  profileList: [],
  loading: false,
  error: '',
};

export const profileReducer = createReducer(
  initialState,
  //getAllProfile
  on(ProfileActions.getAllProfile, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  //getAllProfileSuccess
  on(ProfileActions.getAllProfileSuccess, (state, { profileList }) => {
    return {
      ...state,
      profileList: profileList,
      loading: false,
    };
  }),
  //getAllProfileFailure
  on(ProfileActions.getAllProfileFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      loading: false,
    };
  }),
  // getProfile
  on(ProfileActions.getProfile, (state) => {
    return {
      ...state,
      isGettingProfile: true,
    };
  }),
  // getProfileSuccess
  on(ProfileActions.getProfileSuccess, (state) => {
    return {
      ...state,
      isGettingProfile: false,
      isGetProfileSuccess: true,
    };
  }),
  // getProfileFailure
  on(ProfileActions.getProfileFailure, (state, { getProfileErrorMessage }) => {
    return {
      ...state,
      getProfileErrorMessage: getProfileErrorMessage,
      isGettingProfile: false,
      isGetProfileSuccess: false,
    };
  }),
  // updateProfile
  on(ProfileActions.updateProfile, (state) => {
    return {
      ...state,
      isUpdatingProfile: true,
    };
  }),
  // updateProfileSuccess
  on(ProfileActions.updateProfileSuccess, (state) => {
    return {
      ...state,
      isUpdatingProfile: false,
      isUpdateProfileSuccess: true,
    };
  }),
  // updateProfileFailure
  on(
    ProfileActions.updateProfileFailure,
    (state, { updateProfileErrorMessage }) => {
      return {
        ...state,
        updateProfileErrorMessage: updateProfileErrorMessage,
        isUpdatingProfile: false,
        isUpdateProfileSuccess: false,
      };
    },
  ),
);
