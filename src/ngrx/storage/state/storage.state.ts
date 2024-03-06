import { StorageModel } from "../../../app/model/storage.model";

export interface StorageState{
    storage: StorageModel;
    isUploading: boolean;
    uploadError: string;
}