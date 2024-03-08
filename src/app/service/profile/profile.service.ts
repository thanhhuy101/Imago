import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { ProfileModel } from '../../model/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClientAuth) {}

  getAllProfiles() {
    return this.httpClient.get('profile/list');
  }
  getProfile() {
    return this.httpClient.get('profile/mine');
  }
  createProfile(profile: ProfileModel) {
    console.log(profile);
    return this.httpClient.post('profile/mine', profile);
  }
  updateProfile(profile: ProfileModel) {
    return this.httpClient.put('profile/mine', profile);
  }
}
