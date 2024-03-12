import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { Store } from '@ngrx/store';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { Subscription } from 'rxjs';
import { ProfileModel } from '../../../../../model/profile.model';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [RouterOutlet, TaigaModule, ShareModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit {
  users: ProfileModel[] = [];

  // $profiles = this.store.select((state) => state.profiles.profileList);
  subscriptions: Subscription[] = [];
  constructor(private store: Store<{ profile: ProfileState }>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.profile.profileSearchResult)
        .subscribe((res) => {
          this.users = res;
        }),
    );
  }

  followUser(id: number) {
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].uid === id) {
    //     this.users[i].followed = !this.users[i].followed;
    //   }
    // }
  }
}
