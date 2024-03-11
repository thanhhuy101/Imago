import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { Store } from '@ngrx/store';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterOutlet, TaigaModule, ShareModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit {
  users = [
    {
      uid: 1,
      name: 'Alex Born',
      bio: 'alex',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      img: '',
      follower: ['John', 'Kim', 'Jan'],
      followed: true,
    },
    {
      uid: 2,
      name: 'John Doe',
      bio: 'John',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      img: '',
      follower: ['Kim', 'Jan'],
      followed: false,
    },
    {
      uid: 3,
      name: 'John Doe',
      bio: 'John',
      img: '',
      follower: ['Kim', 'Jan'],
      followed: false,
    },
  ];

  // $profiles = this.store.select((state) => state.profiles.profileList);

  constructor(private store: Store<{ profiles: ProfileState }>) {}

  ngOnInit(): void {}

  followUser(id: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        this.users[i].followed = !this.users[i].followed;
      }
    }
  }
}
