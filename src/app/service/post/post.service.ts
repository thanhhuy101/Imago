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

  getAll() {
    return this.httpClient.get('post/all?page=1?size=10');
  }

  create(post: PostModel) {
    return this.httpClient.post('post', post);
  }

  update(post: PostModel) {
    return this.httpClient.put(`post`, post);
  }

  delete(id: string) {
    return this.httpClient.delete(`post?id=${id}`);
  }

  getMine(page: number, size: number) {
    return this.httpClient.get(`post/mine?page=${page}&size=${size}`);
  }

  getByShare(page: number, size: number) {
    return this.httpClient.get(`post/share?page=${page}&size=${size}`);
  }

  getByMention(page: number, size: number) {
    return this.httpClient.get(`post/mention/?page=${page}&size=${size}`);
  }

  search(query: string) {
    return this.httpClient.get(`post/search?query=${query}`);
  }
}
