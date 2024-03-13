import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';
import { ProfileModel } from '../../app/model/profile.model';

export interface ProfileState {
  mine: ProfileModel;
  profile: ProfileModel;
  isCreating: boolean;
  isCreateSuccess: boolean;
  createErrorMessage: HttpErrorResponseModel;

  isUpdating: boolean;
  isUpdateSuccess: boolean;
  updateErrorMessage: HttpErrorResponseModel;

  isGetting: boolean;
  getErrorMessage: HttpErrorResponseModel;

  isGettingById: boolean;
  getErrorMessageById: HttpErrorResponseModel;

  profileSearchResult: ProfileModel[];
  isSearching: boolean;
  searchErrorMessage: HttpErrorResponseModel;
}
