import { StorageState } from "../state/storage.state";
import * as StorageActions from '../actions/storage.actions';
import { StorageModel } from "../../../app/model/storage.model";
import { createReducer, on } from "@ngrx/store";


export const initualState: StorageState = {
    storage: <StorageModel>{},
    isUploading: false,
    uploadError: '',
    url: []
};

export const storageReducer = createReducer(
    initualState,
    on(StorageActions.upLoadFile, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isUploading: true
        }
    }),

    on(StorageActions.upLoadFileFailure, (state, {type, upLoadFileErrorMessage}) => {
        console.log(type)
        console.log(upLoadFileErrorMessage)
        return {
            ...state,
            isUploading: false,
            uploadError: upLoadFileErrorMessage
        }
    }),

    on(StorageActions.upLoadFileSuccess, (state, action) => {
        console.log(action.type)
        console.log(action.url)
        return {
            ...state,
            storage: action.url,
            url: action.url,
            isUploading: false,
            uploadError: ''
        }
    })

)