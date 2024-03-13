import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { ProfileModel } from '../../model/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClientAuth) {}

  // getAll() {
  //   return this.httpClient.get('profile/list');
  // }

  getAll() {
    return this.httpClient.get('profile/listexceptmine');
  }

  getById(id: string) {
    return this.httpClient.get(`profile?id=${id}`);
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

  search(query: string) {
    return this.httpClient.get(`profile/search?query=${query}`);
  }
  
  follow(id: string, otherId: string) {
    console.log(id, otherId);
    return this.httpClient.put(
      `profile/follow?profileId=${id}&otherProfileId=${otherId}`,
      {},
    );
  }

  unFollow(id: string, otherId: string) {
    return this.httpClient.put(
      `profile/unfollow?profileId=${id}&otherProfileId=${otherId}`,
      {},
    );
  }
}
