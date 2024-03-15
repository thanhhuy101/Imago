import { Component } from '@angular/core';
import { ShareModule } from '../../../../../shared/share.module';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { TuiAvatarModule, TuiBadgedContentComponent } from '@taiga-ui/kit';
import { Store } from '@ngrx/store';
import { NotiState } from '../../../../../../ngrx/noti/noti.state';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { Subscription } from 'rxjs';
import * as NotificationActions from '../../../../../../ngrx/noti/noti.actions';
import { CommentModel } from '../../../../../model/comment.model';
import { CommentNotiModel } from '../../../../../model/noti.model';
import { IdToAvatarPipe } from '../../../../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../../../../shared/pipes/id-to-name.pipe';
type Comment = {
  name: string;
  time: string;
  kind: string;
};
@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  imports: [ShareModule, TaigaModule, IdToAvatarPipe, IdToNamePipe],
})
export class CommentComponent {
  constructor(
    private store: Store<{
      notification: NotiState;
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) {}
  comments: Comment[] = [];
  subscriptions: Subscription[] = [];
  isLoading = false;
  isGettingCommentNotifications$ = this.store.select(
    'notification',
    'isGettingCommentNotifications',
  );
  comments$ = this.store.select(
    'notification',
    'getCommentNotificationsSuccess',
  );
  getCommentsError$ = this.store.select(
    'notification',
    'getCommentNotificationsError',
  );
  profile$ = this.store.select('profile', 'mine');

  ngOnInit(): void {
    this.subscriptions.push(
      this.profile$.subscribe((profile) => {
        if (profile.email) {
          this.store.dispatch(
            NotificationActions.getCommentNotifications({
              uid: profile.id,
            }),
          );
        }
      }),
      this.isGettingCommentNotifications$.subscribe((loading) => {
        if (loading) {
          setTimeout(() => {
            this.isLoading = true;
          }, 1000);
        }
      }),
      this.comments$.subscribe((notifications) => {
        this.processCommentNotifications(notifications);
      }),
      this.getCommentsError$.subscribe((error) => {
        if (error) {
          console.error(error);
        }
      }),
    );
  }

  processCommentNotifications(notifications: CommentNotiModel[]) {
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

      this.comments.push({
        name: notification.sender,
        time: timeString,
        kind: 'commented on your post',
      });
    });
  }
}
