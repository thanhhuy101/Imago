import { HttpErrorResponseModel } from '../../../app/model/http-error-response.model';
import { ProfileModel } from '../../../app/model/profile.model';

export interface ProfileState {
  profileList: ProfileModel[];
  profile: ProfileModel;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  updateIsLoading: boolean;
  updateIsSuccess: boolean;
  updateErrorMessage: string;
}
