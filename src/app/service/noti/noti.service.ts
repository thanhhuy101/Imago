import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { NotiModel } from '../../model/noti.model';

@Injectable({
  providedIn: 'root',
})
export class NotiService {
  constructor(private httpClient: HttpClientAuth) {}

  createNotification(notification: NotiModel) {
    return this.httpClient.post('notification', notification);
  }

  getNotifications(uid: string) {
    return this.httpClient.get(`notifitication?uid=${uid}`);
  }

  getFollowNotifications(uid: string) {
    return this.httpClient.get(`notification/follow?uid=${uid}`);
  }

  getLikeNotifications(uid: string) {
    return this.httpClient.get(`notification/like?uid=${uid}`);
  }

  getCommentNotifications(uid: string) {
    return this.httpClient.get(`notification/comment?uid=${uid}`);
  }
}
