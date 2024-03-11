import { StorageModel } from '../../app/model/storage.model';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export interface StorageState {
  url: string[];
  storage: StorageModel;
  isUploading: boolean;
  uploadError: HttpErrorResponseModel;
}
