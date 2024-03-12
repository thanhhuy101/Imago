import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { Store } from '@ngrx/store';
import { NotiState } from '../../../../../../ngrx/noti/noti.state';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { Subscription } from 'rxjs';
import * as NotificationActions from '../../../../../../ngrx/noti/noti.actions';
import { FollowNotiModel } from '../../../../../model/noti.model';
type Follow = {
  name: string;
  time: string;
  kind: string;
  avatar?: string;
};
@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.scss',
})
export class FollowComponent {
  aceHole =
    'https://qph.cf2.quoracdn.net/main-qimg-1c75fec28dcae94eadff9cd7899ae5f5-lq';

  constructor(
    private store: Store<{
      notification: NotiState;
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) { }
  follows: Follow[] = [];
  subscriptions: Subscription[] = [];
  token$ = this.store.select('auth', 'token');
  isGettingFollowNotifications$ = this.store.select(
    'notification',
    'isGettingFollowNotifications',
  );
  follows$ = this.store.select('notification', 'getFollowNotificationsSuccess');
  getFollowsError$ = this.store.select(
    'notification',
    'getFollowNotificationsError',
  );
  profile$ = this.store.select('profile', 'profile');

  ngOnInit(): void {
    this.subscriptions.push(
      this.profile$.subscribe((profile) => {
        if (profile.email) {
          this.store.dispatch(
            NotificationActions.getFollowNotifications({
              uid: profile.id,
            }),
          );
        }
      }),
      this.isGettingFollowNotifications$.subscribe((loading) => {
        if (loading) {
          // console.log('loading', loading);
        }
      }),

      this.follows$.subscribe((follows) => {
        if (follows) {
          this.processFollowNotifications(follows);
        }
      }),

      this.getFollowsError$.subscribe((error) => {
        if (error) {
          console.log('error', error);
        }
      }),
    );
  }

  processFollowNotifications(notifications: FollowNotiModel[]) {
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
        this.follows.push({
          name: notification.sender,
          time: timeString,
          kind: 'followed on you',
        });
      }
    });
  }
}
