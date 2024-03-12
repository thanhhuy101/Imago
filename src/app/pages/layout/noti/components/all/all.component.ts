import { Component, OnDestroy, OnInit } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { ShareModule } from '../../../../../shared/share.module';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { Store } from '@ngrx/store';
import { NotiState } from '../../../../../../ngrx/noti/noti.state';
import { Subscription } from 'rxjs';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import * as NotificationActions from '../../../../../../ngrx/noti/noti.actions';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { NotiModel } from '../../../../../model/noti.model';
import { IdToNamePipe } from '../../../../../shared/pipes/id-to-name.pipe';
import {IdToAvatarPipe} from "../../../../../shared/pipes/id-to-avatar.pipe";

type Notification = {
  name: string;
  time: string;
  kind: string;
  icon: string;
};
@Component({
  selector: 'app-all',
  standalone: true,
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss',
  imports: [ShareModule, TaigaModule, IdToNamePipe, IdToAvatarPipe],
})
export class AllComponent implements OnInit, OnDestroy {
  aceHole =
    'https://qph.cf2.quoracdn.net/main-qimg-1c75fec28dcae94eadff9cd7899ae5f5-lq';

  notifications: Notification[] = [];

  subscriptions: Subscription[] = [];

  //notification
  // allNotifications: NotiModel[] = [];

  // observable
  token$ = this.store.select('auth', 'token');
  isGettingNotifications$ = this.store.select(
    'notification',
    'isGettingNotifications',
  );
  notifications$ = this.store.select('notification', 'getNotificationsSuccess');
  getNotificationsError$ = this.store.select(
    'notification',
    'getNotificationsError',
  );
  profile$ = this.store.select('profile', 'profile');

  constructor(
    private store: Store<{
      notification: NotiState;
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.profile$.subscribe((profile) => {
        if (profile.email) {
          this.store.dispatch(
            NotificationActions.getNotifications({
              uid: profile.id,
            }),
          );
        }
      }),

      this.isGettingNotifications$.subscribe((loading) => {
        if (loading) {
          // console.log('loading', loading);
        }
      }),

      this.notifications$.subscribe((notifications) => {
        if (notifications) {
          this.processNotifications(notifications);
          // console.log(notifications);
        }
      }),

      this.getNotificationsError$.subscribe((error) => {
        if (error) {
          console.log('error', error);
        }
      }),
    );
  }

  ngOnDestroy(): void {}

  viewNotification(index: any): void {
    // console.log('view notification', index);
  }

  processNotifications(notifications: NotiModel[]): void {
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

      if (notification.isFollow) {
        this.notifications.push({
          name: notification.sender,
          time: timeString,
          kind: 'followed on you',
          icon: 'tuiIconUserCheck',
        });
      }

      if (notification.isLike) {
        this.notifications.push({
          name: notification.sender,
          time: timeString,
          kind: 'liked your post',
          icon: 'tuiIconHeart',
        });
      }

      if (notification.isComment) {
        this.notifications.push({
          name: notification.sender,
          time: timeString,
          kind: 'commented on your post',
          icon: 'tuiIconMessageCircle',
        });
      }
    });
  }
}
