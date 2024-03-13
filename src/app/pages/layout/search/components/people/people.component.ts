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

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterOutlet, TaigaModule, ShareModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  // users = [
  //   {
  //     uid: 1,
  //     name: 'Alex Born',
  //     bio: 'alex',
  //     description:
  //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  //     img: '',
  //     follower: ['John', 'Kim', 'Jan'],
  //     followed: true,
  //   },
  //   {
  //     uid: 2,
  //     name: 'John Doe',
  //     bio: 'John',
  //     description:
  //       ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  //     img: '',
  //     follower: ['Kim', 'Jan'],
  //     followed: false,
  //   },
  //   {
  //     uid: 3,
  //     name: 'John Doe',
  //     bio: 'John',
  //     img: '',
  //     follower: ['Kim', 'Jan'],
  //     followed: false,
  //   },
  // ];
  subscription: Subscription[] = [];
  followed = true;
  $profiles = this.store.select((state) => state.profile.profiles);
  $follow = this.store.select((state) => state.profile.isFollowing);
  $unfollow = this.store.select((state) => state.profile.isUnFollowing);
  profiles: ProfileModel[] = [];
  profile$ = this.store.select((state) => state.profile.profile);
  isFollowing: boolean = false;

  currentUser: ProfileModel = <ProfileModel>{};

  constructor(private store: Store<{ profile: ProfileState }>) {
    this.subscription.push(
      this.store
        .select((state) => state.profile.profileSearchResult)
        .subscribe((res) => {
          this.profiles = res;
        }),
    );
    this.$profiles.subscribe((value) => {
      this.profiles = value;
    });
    this.store.dispatch(ProfileActions.getList());

    this.profile$.subscribe((value) => {
      this.currentUser = value;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  // followUser(id: number) {
  //   for (let i = 0; i < this.users.length; i++) {
  //     if (this.users[i].uid === id) {
  //       this.users[i].followed = !this.users[i].followed;
  //     }
  //   }
  // }

  //create funciton to follow user
  followUser(otherId: string) {
    this.store.dispatch(
      ProfileActions.follow({ id: this.currentUser.id, otherId }),
    );

    this.currentUser.followers.forEach((follower) => {
      if (follower === otherId) {
        this.isFollowing = true;
      }
    });
  }

  //create function to unfollow user
  unFollowUser(otherId: string) {
    this.store.dispatch(
      ProfileActions.unFollow({ otherId, id: this.currentUser.id }),
    );
  }
}
