import { StorageState } from './storage.state';
import * as StorageActions from './storage.actions';
import { StorageModel } from '../../app/model/storage.model';
import { createReducer, on } from '@ngrx/store';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export const initualState: StorageState = {
  storage: <StorageModel>{},
  isUploading: false,
  uploadError: <HttpErrorResponseModel>{},
  url: [],
};

export const storageReducer = createReducer(
  initualState,
  on(StorageActions.uploadFile, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      isUploading: true,
    };
  }),

  on(StorageActions.uploadFileSuccess, (state, { type, url }) => {
    console.log(type);
    return {
      ...state,
      isUploading: false,
      url: url,
    };
  }),

  on(StorageActions.resetStorage, (state) => {
    console.log('resetStorage');
    return {
      ...initualState,
    };
  }),
);
