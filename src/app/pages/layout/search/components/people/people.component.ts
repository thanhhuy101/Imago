import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { Store } from '@ngrx/store';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import * as ProfileActions from '../../../../../../ngrx/profile/profile.actions';
import { ProfileModel } from '../../../../../model/profile.model';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../../service/notification/notification.service';
import { NotiState } from '../../../../../../ngrx/noti/noti.state';
import * as NotificationActions from '../../../../../../ngrx/noti/noti.actions';

type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  followers: string[];
  followed: boolean;
  numberOfFollowers: number;
};

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterOutlet, TaigaModule, ShareModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  peoples: User[] = [];
  subscription: Subscription[] = [];
  loader = false;
  followed = true;
  $profiles = this.store.select((state) => state.profile.profiles);
  $follow = this.store.select((state) => state.profile.isFollowing);
  isFollowingSuccess$ = this.store.select(
    (state) => state.profile.isFollowSuccess,
  );
  isFollowingFailure$ = this.store.select(
    (state) => state.profile.followErrorMessage,
  );
  $unfollow = this.store.select((state) => state.profile.isUnFollowing);
  profiles: ProfileModel[] = [];
  profile$ = this.store.select((state) => state.profile.profile);

  currentUser: ProfileModel = <ProfileModel>{};

  constructor(
    private notificationService: NotificationService,
    private store: Store<{ profile: ProfileState; notification: NotiState }>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProfileActions.getList());
    this.subscription.push(
      this.store
        .select((state) => state.profile.profileSearchResult)
        .subscribe((res) => {
          this.profiles = res;
        }),
      this.$profiles.subscribe((value) => {
        if (value) {
          this.profiles = value;
          if (!this.peoples || !this.peoples.length) {
            // If this.peoples is not initialized, initialize it
            for (let i = 0; i < this.profiles.length; i++) {
              this.peoples.push({
                id: this.profiles[i].id,
                userName: this.profiles[i].userName,
                firstName: this.profiles[i].firstName,
                lastName: this.profiles[i].lastName,
                photoUrl: this.profiles[i].photoUrl,
                followers: this.profiles[i].followers,
                followed: this.profiles[i].followers.includes(
                  this.currentUser.id,
                ),
                numberOfFollowers: this.profiles[i].followers.length,
              });
            }
          } else {
            // If this.peoples is already initialized, update it
            for (let i = 0; i < this.profiles.length; i++) {
              const index = this.peoples.findIndex(
                (p) => p.id === this.profiles[i].id,
              );
              if (index !== -1) {
                this.peoples[index] = {
                  id: this.profiles[i].id,
                  userName: this.profiles[i].userName,
                  firstName: this.profiles[i].firstName,
                  lastName: this.profiles[i].lastName,
                  photoUrl: this.profiles[i].photoUrl,
                  followers: this.profiles[i].followers,
                  followed: this.profiles[i].followers.includes(
                    this.currentUser.id,
                  ),
                  numberOfFollowers: this.profiles[i].followers.length,
                };
              } else {
                this.peoples.push({
                  id: this.profiles[i].id,
                  userName: this.profiles[i].userName,
                  firstName: this.profiles[i].firstName,
                  lastName: this.profiles[i].lastName,
                  photoUrl: this.profiles[i].photoUrl,
                  followers: this.profiles[i].followers,
                  followed: this.profiles[i].followers.includes(
                    this.currentUser.id,
                  ),
                  numberOfFollowers: this.profiles[i].followers.length,
                });
              }
            }
          }
        }
      }),

      this.profile$.subscribe((value) => {
        this.currentUser = value;
      }),
      // this.isFollowingSuccess$.subscribe((success) => {
      //   if (success) {
      //     this.loader = false;
      //     //window.location.reload();
      //   }
      // }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    //this.store.dispatch(ProfileActions.clearGetState());
    this.store.dispatch(ProfileActions.clearUpdateState());
    this.store.dispatch(ProfileActions.clearMessages());
  }

  //create funciton to follow user
  followUser(user: any, otherId: string) {
    const profile = this.profiles.find((p) => p.id === otherId);
    if (profile) {
      this.notificationService.successNotification(
        `Follow ${profile.userName} successfully`,
      );
    }

    let newNotification = {
      id: '',
      uid: otherId,
      postId: new Date().toString(),
      createdAt: new Date().toString(),
      sender: this.currentUser.id,
      isFollow: true,
      isLike: false,
      isComment: false,
    };

    user.followed = !user.followed;
    user.numberOfFollowers++;

    this.store.dispatch(
      ProfileActions.follow({ id: this.currentUser.id, otherId: user.id }),
    );

    this.store.dispatch(
      NotificationActions.createNotification({ notification: newNotification }),
    );

    // ProfileActions.clearUpdateState();
  }

  //create function to unfollow user
  unFollowUser(user: any, otherId: string) {
    this.store.dispatch(
      ProfileActions.unFollow({ id: this.currentUser.id, otherId }),
    );

    const profile = this.profiles.find((p) => p.id === otherId);
    if (profile) {
      this.notificationService.successNotification(
        `Unfollow ${profile.userName} successfully`,
      );
    }

    user.followed = !user.followed;
    user.numberOfFollowers--;
  }
}
