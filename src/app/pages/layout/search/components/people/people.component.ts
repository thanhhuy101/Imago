import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { Store } from '@ngrx/store';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import * as ProfileActions from '../../../../../../ngrx/profile/profile.actions';
import { ProfileModel } from '../../../../../model/profile.model';
import { AuthService } from '../../../../../service/auth/auth.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../../service/notification/notification.service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterOutlet, TaigaModule, ShareModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  users = [
    {
      id: 1,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      photoUrl: '',
      followers: [],
      following: [],
      phone: '',
      gender: '',
      category: [],
      followed: true,
    },
  ];
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
    private store: Store<{ profile: ProfileState }>,
  ) {
    this.store.dispatch(ProfileActions.getList());
    this.subscription.push(
      this.store
        .select((state) => state.profile.profileSearchResult)
        .subscribe((res) => {
          this.profiles = res;
        }),
      this.$profiles.subscribe((value) => {
        this.profiles = value;
      }),

      this.profile$.subscribe((value) => {
        this.currentUser = value;
      }),
    );
  }

  ngOnInit(): void {
    this.isFollowingSuccess$.subscribe((success) => {
      if (success) {
        this.loader = false;
        //window.location.reload();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  // followUser(otherId: string) {
  //   for (let i = 0; i < this.users.length; i++) {
  //     if (this.profiles[i].id === otherId) {
  //       this.users[i].followed = !this.users[i].followed;

  //     }
  //   }
  // }

  //create funciton to follow user
  followUser(otherId: string) {
    this.loader = true;
    this.store.dispatch(
      ProfileActions.follow({ id: this.currentUser.id, otherId }),
    );
    const profile = this.profiles.find((p) => p.id === otherId);
    if (profile) {
      this.notificationService.successNotification(
        `Follow ${profile.userName} successfully`,
      );
    }
  }

  //create function to unfollow user
  unFollowUser(otherId: string) {
    this.store.dispatch(
      ProfileActions.unFollow({ id: this.currentUser.id, otherId }),
    );
    const profile = this.profiles.find((p) => p.id === otherId);
    if (profile) {
      this.notificationService.successNotification(
        `Unfollowing ${profile.userName} successfully`,
      );
    }
    ProfileActions.clearUpdateState();
  }
}
