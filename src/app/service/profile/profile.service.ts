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
  // getAllProfiles(idToken: string) {
  //   return this.httpClient.get(
  //     `${dev_environment.baseUrl}/${dev_environment.baseVersion}/profile/list`,
  //     {
  //       headers: new HttpHeaders({
  //         Authorization: `Bearer ${idToken}`,
  //       }),
  //     },
  //   );
  // }

  // getProfile(idToken: string) {
  //   return this.httpClient.get(
  //     `${dev_environment.baseUrl}/${dev_environment.baseVersion}/profile/mine`,
  //     {
  //       headers: new HttpHeaders({
  //         Authorization: `Bearer ${idToken}`,
  //       }),
  //     },
  //   );
  // }

  // createProfile(idToken: string) {
  //   return this.httpClient.post(
  //     `${dev_environment.baseUrl}/${dev_environment.baseVersion}/profile/mine`,
  //     {},
  //     {
  //       headers: new HttpHeaders({
  //         Authorization: `Bearer ${idToken}`,
  //       }),
  //     },
  //   );
  // }

  // updateProfile(idToken: string) {
  //   return this.httpClient.put(
  //     `${dev_environment.baseUrl}/${dev_environment.baseVersion}/profile/mine`,
  //     {
  //       headers: new HttpHeaders({
  //         Authorization: `Bearer ${idToken}`,
  //       }),
  //     },
  //   );
  // }
}
