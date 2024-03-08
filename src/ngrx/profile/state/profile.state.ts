import { HttpErrorResponseModel } from '../../../app/model/http-error-response.model';
import { ProfileModel } from '../../../app/model/profile.model';

export interface ProfileState {
  token: string;

  //profile
  profile: ProfileModel;
  profileList: ProfileModel[];
  loading: boolean;

  //get all profile
  isGetAllProfilesSuccess: boolean;
  getAllProfilesErrorMessage: HttpErrorResponseModel;

  isGetProfileSuccess: boolean;
  getProfileErrorMessage: HttpErrorResponseModel;

  isCreateProfileSuccess: boolean;
  createProfileErrorMessage: HttpErrorResponseModel;

  isUpdateProfileSuccess: boolean;
  updateProfileErrorMessage: HttpErrorResponseModel;
}
