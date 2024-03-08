import { createReducer, on } from '@ngrx/store';
import { ProfileModel } from '../../../app/model/profile.model';
import { ProfileState } from '../state/profile.state';
import * as ProfileActions from '../actions/profile.actions';

export const initialState: ProfileState = {
  token: '',
  profile: <ProfileModel>{},
  profileList: [],
  loading: false,
  error: '',
  isGetProfileSuccess: false,
  getProfileErrorMessage: '',
  isUpdateProfileSuccess: false,
  updateProfileErrorMessage: '',
  isCreateProfileSuccess: false,
  createProfileErrorMessage: '',
  isGetAllProfilesSuccess: false,
  getAllProfilesErrorMessage: '',
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
      isGetAllProfilesSuccess: true,
    };
  }),
  //getAllProfileFailure
  on(
    ProfileActions.getAllProfileFailure,
    (state, { getAllProfilesErrorMessage }) => {
      return {
        ...state,
        getAllProfilesErrorMessage: getAllProfilesErrorMessage,
        loading: false,
      };
    },
  ),
  // getProfile
  on(ProfileActions.getProfile, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  //get profile success
  on(ProfileActions.getProfileSuccess, (state, { profile }) => {
    return {
      ...state,
      profile: profile,
      loading: false,
      isGetProfileSuccess: true,
    };
  }),
  //get profile failure
  on(ProfileActions.getProfileFailure, (state, { getProfileErrorMessage }) => {
    return {
      ...state,
      getProfileErrorMessage: getProfileErrorMessage,
      loading: false,
    };
  }),
  //create profile
  on(ProfileActions.createProfile, (state, action) => {
    console.log(action.type);
    console.log(state);
    return {
      ...state,
      profile: action.profile,
      loading: true,
    };
  }),
  //createProfileSuccess
  on(ProfileActions.createProfileSuccess, (state, action) => {
    console.log(action.type);
    return <ProfileState>{
      ...state,
      profile: action.profile,
      loading: false,
      isCreateProfileSuccess: true,
    };
  }),
  //createProfileFailure
  on(
    ProfileActions.createProfileFailure,
    (state, { type, createProfileErrorMessage }) => {
      console.log(type);
      return <ProfileState>{
        ...state,
        error: createProfileErrorMessage,
        loading: false,
      };
    },
  ),
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
