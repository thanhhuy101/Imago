import { StorageModel } from "../../../app/model/storage.model";

export interface StorageState{
    storage: StorageModel;
    url: string;
    isUploading: boolean;
    uploadError: string;
}