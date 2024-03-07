import {StorageState} from "../state/storage.state";
import {createReducer, on} from "@ngrx/store";
import * as StorageActions from "../actions/storage.actions";
export const initialState: StorageState = {
  storage: <Storage>{},
  isCreating: false,
  createErrorMessage: null,
};
export const storageReducer = createReducer(
  initialState,
  on(StorageActions.create, (state, action) => {
    console.log(action.type)
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      createErrorMessage: null,
    };
  }),
  on(StorageActions.createSuccess, (state, action) => {
    console.log(action.type)
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
    };
  }),
  on(StorageActions.createFailure, (state, {type, createErrorMessage}) => {
    console.log(type);
    console.log(createErrorMessage);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      createErrorMessage,
    };
  }),
  on(StorageActions.get, (state, action) => {
    console.log(action.type)
    return {
      ...state,
      isGetting: true,
      isGetSuccess: false,
      getErrorMessage: null,
    };
  }),
  on(StorageActions.getSuccess, (state, action) => {
    console.log(action.type)
    return {
      ...state,
      isGetting: false,
      isGetSuccess: true,
      getErrorMessage: null,
      storage: action.storage,
    };
  }),
  on(StorageActions.getFailure, (state, {getErrorMessage}) => {
    return {
      ...state,
      isGetting: false,
      isGetSuccess: false,
      getErrorMessage,
    };
  }),
);
