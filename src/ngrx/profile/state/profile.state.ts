import { ProfileModel } from '../../../app/model/profile.model';

export interface ProfileState {
  token: string;

  //profile
  profile: ProfileModel;
  profileList: ProfileModel[];
  loading: boolean;
  error: string;
  //get all profile
  isGetAllProfilesSuccess: boolean;
  getAllProfilesErrorMessage: string;


  isGetProfileSuccess: boolean;
  getProfileErrorMessage: string;


  isCreateProfileSuccess: boolean;
  createProfileErrorMessage: string;

 
  isUpdateProfileSuccess: boolean;
  updateProfileErrorMessage: string;
}
