import { createReducer, on } from '@ngrx/store';
import { ProfileModel } from '../../app/model/profile.model';
import { ProfileState } from './profile.state';
import * as ProfileActions from './profile.actions';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export const initialState: ProfileState = {
  mine: <ProfileModel>{},
  profile: <ProfileModel>{},
  isCreating: false,
  isCreateSuccess: false,
  createErrorMessage: <HttpErrorResponseModel>{},

  isUpdating: false,
  isUpdateSuccess: false,
  updateErrorMessage: <HttpErrorResponseModel>{},

  isGetting: false,
  getErrorMessage: <HttpErrorResponseModel>{},

  isGettingById: false,
  getErrorMessageById: <HttpErrorResponseModel>{},

  profileSearchResult: [],
  isSearching: false,
  searchErrorMessage: <HttpErrorResponseModel>{},
};

export const profileReducer = createReducer(
  initialState,

  // createMine
  on(ProfileActions.createMine, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
    };
  }),
  on(ProfileActions.createMineSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
    };
  }),
  on(
    ProfileActions.createMineFailure,
    (state, { createErrorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        createErrorMessage: createErrorMessage,
        isCreating: false,
        isCreateSuccess: false,
      };
    },
  ),

  // updateMine
  on(ProfileActions.updateMine, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: true,
    };
  }),
  on(ProfileActions.updateMineSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: true,
    };
  }),
  on(
    ProfileActions.updateMineFailure,
    (state, { updateErrorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        updateErrorMessage: updateErrorMessage,
        isUpdating: false,
        isUpdateSuccess: false,
      };
    },
  ),

  // getMine
  on(ProfileActions.getMine, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGetting: true,
    };
  }),
  on(ProfileActions.getMineSuccess, (state, { mine, type }) => {
    console.log(type);
    return {
      ...state,
      mine: mine,
      isGetting: false,
    };
  }),
  on(ProfileActions.getMineFailure, (state, { getErrorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      getErrorMessage: getErrorMessage,
      isGetting: false,
    };
  }),

  // getById
  on(ProfileActions.getById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGetting: true,
    };
  }),
  on(ProfileActions.getByIdSuccess, (state, { profile, type }) => {
    console.log(type);
    return {
      ...state,
      profile: profile,
      isGetting: false,
    };
  }),
  on(ProfileActions.getByIdFailure, (state, { getErrorMessageById, type }) => {
    console.log(type);
    return {
      ...state,
      getErrorMessageById: getErrorMessageById,
      isGetting: false,
    };
  }),

  // clearMessages
  on(ProfileActions.clearMessages, (state) => {
    return {
      ...state,
      createErrorMessage: <HttpErrorResponseModel>{},
      updateErrorMessage: <HttpErrorResponseModel>{},
      getErrorMessage: <HttpErrorResponseModel>{},
      getErrorMessageById: <HttpErrorResponseModel>{},
    };
  }),

  // clearCreateState
  on(ProfileActions.clearCreateState, (state) => {
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
    };
  }),

  // clearUpdateState
  on(ProfileActions.clearUpdateState, (state) => {
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: false,
    };
  }),

  // clearGetState
  on(ProfileActions.clearGetState, (state) => {
    return {
      ...state,
      isGetting: false,
      isGettingById: false,
      profile: <ProfileModel>{},
    };
  }),

  //search
  on(ProfileActions.search, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSearching: true,
      profileSearchResult: [],
      searchErrorMessage: <HttpErrorResponseModel>{},
    };
  }),
  on(ProfileActions.searchSuccess, (state, { profileSearchResult, type }) => {
    console.log(type);
    return {
      ...state,
      profileSearchResult: profileSearchResult,
      isSearching: false,
    };
  }),
  on(ProfileActions.searchFailure, (state, { searchErrorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      searchErrorMessage: searchErrorMessage,
      isSearching: false,
    };
  }),
  on(ProfileActions.clearSearchState, (state) => {
    return {
      ...state,
      profileSearchResult: [],
      isSearching: false,
      searchErrorMessage: <HttpErrorResponseModel>{},
    };
  }),
);
