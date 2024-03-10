import { Component, Inject, OnInit } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { TuiAlertService } from '@taiga-ui/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileModel } from '../../../model/profile.model';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../../ngrx/profile/state/profile.state';
import * as ProfileActions from '../../../../ngrx/profile/actions/profile.actions';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  readonly items = [
    {
      text: 'Post',
      router: '/post',
    },
    {
      text: 'Share',
      router: '/share',
    },
    {
      text: 'Mention',
      router: '/mention',
    },
  ];

  activeItemIndex = 0;
  profile: ProfileModel = <ProfileModel>{};
  subscriptions: Subscription[] = [];
  public myEditForm!: FormGroup;
  profile$ = this.store.select('profile', 'profile');

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private route: Router,
    private store: Store<{
      profile: ProfileState;
      auth: AuthState;
    }>,
  ) {
    let path = window.location.href.split('?')[0];
    console.log(path);
    if (path.includes('profile/share')) {
      this.activeItemIndex = 1;
    } else if (path.includes('profile/mention')) {
      this.activeItemIndex = 2;
    }

    this.profile$.subscribe((value) => {
      if (value) {
        this.profile = value;
      }
    });
  }

  ngOnInit(): void {
    this.myEditForm = new FormGroup({
      userName: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      bio: new FormControl(''),
      photoUrl: new FormControl(''),
    });
  }

  onActiveItemChange(index: number) {
    this.onChangePage(index);
  }

  onChangePage(i: number) {
    console.log(this.items[i].router);
    this.route.navigate(['/profile' + this.items[i].router]);
  }

  //Dialog for profile
  openAddDialog = false;
  openDialog() {
    console.log('open');
    this.openAddDialog = true;
  }

  closeDialog() {
    this.openAddDialog = true;
  }

  submit(profile: ProfileModel) {
    if (!profile.userName) {
      profile.userName = this.profile.userName;
    }
    if (!profile.firstName) {
      profile.firstName = this.profile.firstName;
    }
    if (!profile.lastName) {
      profile.lastName = this.profile.lastName;
    }
    if (!profile.bio) {
      profile.bio = this.profile.bio;
    }
    this.profile$.subscribe((value) => {
      if (value) {
        this.store.dispatch(
          ProfileActions.updateProfile({
            profile: this.myEditForm.value,
          }),
        );
      }
    });
    this.openAddDialog = false;
  }
}
