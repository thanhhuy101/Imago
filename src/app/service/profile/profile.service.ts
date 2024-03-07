import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProfileModel } from '../../model/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  getAllProfiles(idToken: string) {
    return this.httpClient.get(environment.local_url + `profile/list`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`,
      }),
    });
  }

  getProfile(idToken: string) {
    return this.httpClient.get<ProfileModel>(
      environment.local_url + `profile/mine`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      },
    );
  }

  createProfile(idToken: string) {
    return this.httpClient.post(
      environment.local_url + `profile/mine`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`,
        }),
      },
    );
  }

  updateProfile(idToken: string) {
    return this.httpClient.put(environment.local_url + `profile/mine`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${idToken}`,
      }),
    });
  }
}
