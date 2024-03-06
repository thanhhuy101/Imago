import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

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
}
