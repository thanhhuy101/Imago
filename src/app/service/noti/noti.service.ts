import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class NotiService {
  constructor(private httpClient: HttpClientAuth) {}

  getNotifications() {
    return this.httpClient.get('notifitication');
  }

  getFollowNotifications() {
    return this.httpClient.get('notification/follow');
  }

  getLikeNotifications() {
    return this.httpClient.get('notification/like');
  }

  getCommentNotifications() {
    return this.httpClient.get('notification/comment');
  }
}
