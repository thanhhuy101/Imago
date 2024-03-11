import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { ProfileModel } from '../../model/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClientAuth) {}

  getAll() {
    return this.httpClient.get('profile/list');
  }

  getMine() {
    return this.httpClient.get('profile/mine');
  }

  createMine(profile: ProfileModel) {
    return this.httpClient.post('profile/mine', profile);
  }

  updateMine(profile: ProfileModel) {
    return this.httpClient.put('profile/mine', profile);
  }
}
