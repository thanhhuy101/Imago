import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { HttpClientAuth } from '../../util/http-client-auth';
import { PostModel } from '../../model/post.model';

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

    return this.httpClient.get('post/all', {});
  }

  createPost(post: PostModel) {
    return this.httpClient.post('post', post);
  }

  getMine(page: number, size: number) {
    return this.httpClient.get(`post/mine?page=${page}&size=${size}`);
  }

  getByShareId(page: number, size: number) {
    return this.httpClient.get(`post/share?page=${page}&size=${size}`);
  }

  getByMentionId(page: number, size: number) {
    return this.httpClient.get(`post/mention/?page=${page}&size=${size}`);
  }
}
