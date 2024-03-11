import { createReducer, on } from '@ngrx/store';
import { ProfileModel } from '../../../app/model/profile.model';
import { ProfileState } from '../state/profile.state';
import * as ProfileActions from '../actions/profile.actions';
import { HttpErrorResponseModel } from '../../../app/model/http-error-response.model';

export const initialState: ProfileState = {
  profile: <ProfileModel>{},
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  updateIsLoading: false,
  updateIsSuccess: false,
  updateErrorMessage: '',
  profileList: [],
};

export const profileReducer = createReducer(
  initialState,
  //storeAuthData
  on(ProfileActions.storeAuthData, (state, { id, email, type }) => {
    console.log(type);
    return {
      ...state,
      id: id,
      email: email,
    };
  }),
  //getAllProfile
  on(ProfileActions.getAllProfile, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  //getAllProfileSuccess
  on(ProfileActions.getAllProfileSuccess, (state, { profileList }) => {
    return {
      ...state,
      profileList: profileList,
      isLoading: false,
      isSuccess: true,
    };
  }),
  //getAllProfileFailure
  on(
    ProfileActions.getAllProfileFailure,
    (state, { getAllProfilesErrorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        errorMessage: getAllProfilesErrorMessage,
        isLoading: false,
      };
    },
  ),
  // getProfile
  on(ProfileActions.getProfile, (state) => {
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
    };
  }),
  //get profile success
  on(ProfileActions.getProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      isLoading: false,
      profile: profile,
      isSuccess: true,
    };
  }),
  //get profile failure
  on(
    ProfileActions.getProfileFailure,
    (state, { getProfileErrorMessage, type }) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMessage: getProfileErrorMessage,
      };
    },
  ),
  //create profile
  on(ProfileActions.createProfile, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
    };
  }),
  //createProfileSuccess
  on(ProfileActions.createProfileSuccess, (state, { profile, type }) => {
    console.log(type);
    return {
      ...state,
      profile: profile,
      isLoading: false,
    };
  }),
  //createProfileFailure
  on(
    ProfileActions.createProfileFailure,
    (state, { createProfileErrorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMessage: createProfileErrorMessage,
      };
    },
  ),
  // updateProfile
  on(ProfileActions.updateProfile, (state) => {
    return {
      ...state,
      updateIsLoading: true,
      updateIsSuccess: false,
    };
  }),
  // updateProfileSuccess
  on(ProfileActions.updateProfileSuccess, (state) => {
    return {
      ...state,
      updateIsLoading: false,
      updateIsSuccess: true,
    };
  }),
  // updateProfileFailure
  on(
    ProfileActions.updateProfileFailure,
    (state, { updateProfileErrorMessage }) => {
      return {
        ...state,
        updateIsLoading: false,
        updateIsSuccess: false,
        updateErrorMessage: updateProfileErrorMessage,
      };
    },
  ),
);
