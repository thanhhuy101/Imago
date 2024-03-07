import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/state/auth.state';
import { PostModel } from '../../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {}

  getAllPosts(token: string) {
    console.log('token', token);
    const headers = { Authorization: `${token}` };
    return this.httpClient.get('http://localhost:3000/v1/post/all', {
      headers: headers,
    });
  }

  createPost(post: PostModel, token: string) {
    const headers = { Authorization: `${token}` };
    return this.httpClient.post('http://localhost:3000/v1/post', post, {
      headers: headers,
    });
  }

  getMine(token: string, page: number, size: number) {
    const headers = { Authorization: `${token}` };
    return this.httpClient.get(
      `http://localhost:3000/v1/post/mine?page=${page}&size=${size}`,
      {
        headers: headers,
      },
    );
  }
}
