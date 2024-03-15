import { Component } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { Store } from '@ngrx/store';
import { NotiState } from '../../../../../../ngrx/noti/noti.state';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';

import { Subscription } from 'rxjs';
import * as NotificationActions from '../../../../../../ngrx/noti/noti.actions';
import { LikeNotiModel } from '../../../../../model/noti.model';
import { IdToAvatarPipe } from '../../../../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../../../../shared/pipes/id-to-name.pipe';
type Like = {
  name: string;
  time: string;
  kind: string;
};
@Component({
  selector: 'app-like',
  standalone: true,
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss',
  imports: [TaigaModule, ShareModule, IdToAvatarPipe, IdToNamePipe],
})
export class LikeComponent {
  constructor(
    private store: Store<{
      notification: NotiState;
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) {}
  isLoading = false;
  likes: Like[] = [];
  subscriptions: Subscription[] = [];
  token$ = this.store.select('auth', 'token');
  isGettingLikeNotifications$ = this.store.select(
    'notification',
    'isGettingLikeNotifications',
  );
  likes$ = this.store.select('notification', 'getLikeNotificationsSuccess');
  getLikesError$ = this.store.select(
    'notification',
    'getLikeNotificationsError',
  );
  profile$ = this.store.select('profile', 'mine');

  ngOnInit(): void {
    this.subscriptions.push(
      this.profile$.subscribe((profile) => {
        if (profile.email) {
          this.store.dispatch(
            NotificationActions.getLikeNotifications({
              uid: profile.id,
            }),
          );
        }
      }),
      this.isGettingLikeNotifications$.subscribe((loading) => {
        if (loading) {
          setTimeout(() => {
            this.isLoading = true;
          }, 1000);
        }
      }),

      this.likes$.subscribe((likes) => {
        if (likes) {
          this.processFollowNotifications(likes);
        }
      }),

      this.getLikesError$.subscribe((error) => {
        if (error) {
          console.log('error', error);
        }
      }),
    );
  }

  processFollowNotifications(notifications: LikeNotiModel[]) {
    notifications.forEach((notification) => {
      // calculate time difference between now and the time the notification was created in hours
      // if > 24 hour then show the date instead
      // if < 0 hour then show the minutes instead

      const time = new Date(notification.createdAt).getTime();
      const now = new Date().getTime();
      const diff = now - time;

      // convert the time difference to a string to display on the UI
      let timeString = '';
      if (diff < 60000) {
        timeString = 'just now';
      } else if (diff < 3600000) {
        timeString = `${Math.floor(diff / 60000)} minutes ago`;
      } else if (diff < 86400000) {
        timeString = `${Math.floor(diff / 3600000)} hours ago`;
      } else if (diff < 604800000) {
        timeString = `${Math.floor(diff / 86400000)} days ago`;
      }

      if (notification.isLike) {
        this.likes.push({
          name: notification.sender,
          time: timeString,
          kind: 'followed on you',
        });
      }
    });
  }
}
