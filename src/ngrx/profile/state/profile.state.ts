import { ProfileModel } from '../../../app/model/profile.model';

export interface ProfileState {
  token: string;

  //profile
  profile: ProfileModel;
  isGettingProfile: boolean;
  isGetProfileSuccess: boolean;
  getProfileErrorMessage: string;
  isUpdatingProfile: boolean;
  isUpdateProfileSuccess: boolean;
  updateProfileErrorMessage: string;
}
