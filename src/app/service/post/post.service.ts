import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { PostModel } from '../../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClientAuth) {}

  getAll(page: number, size: number) {
    return this.httpClient.get(`post/all?page=${page}&size=${size}`);
  }

  getAllWithUserId(creatorId: string, page: number, size: number) {
    return this.httpClient.get(
      `post/user?creatorId=${creatorId}&page=${page}&size=${size}`,
    );
  }

  getOne(id: string) {
    return this.httpClient.get(`post?id=${id}`);
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
