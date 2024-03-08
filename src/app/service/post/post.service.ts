import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/state/auth.state';
import { HttpClientAuth } from '../../util/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private httpClient: HttpClientAuth,
    private store: Store<{ auth: AuthState }>,
  ) {}

  getAllPosts(token: string) {
    console.log('token', token);
    const headers = { Authorization: `${token}` };
    return this.httpClient.get('http://localhost:3000/v1/post/all', {
      headers: headers,
    });
  }
}
