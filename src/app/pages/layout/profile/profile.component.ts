import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { TuiAlertService } from '@taiga-ui/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileModel } from '../../../model/profile.model';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../../ngrx/profile/profile.state';
import * as ProfileActions from '../../../../ngrx/profile/profile.actions';
import * as PostActions from '../../../../ngrx/post/post.actions';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { Subscription } from 'rxjs';
import { StorageState } from '../../../../ngrx/storage/storage.state';
import * as StorageActions from '../../../../ngrx/storage/storage.actions';
import { TuiFileLike } from '@taiga-ui/kit';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
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

  subscription: Subscription[] = [];
  profile: ProfileModel = <ProfileModel>{};
  activeItemIndex = 0;

  profile$ = this.store.select('profile', 'profile');

  files: File[] = [];
  rejectedFiles: readonly TuiFileLike[] = [];
  uid: string = '';

  constructor(
    private route: Router,
    private notificationService: NotificationService,
    private store: Store<{
      profile: ProfileState;
      auth: AuthState;
      storage: StorageState;
    }>,
  ) {
    if (route.url.includes('profile/share')) {
      this.activeItemIndex = 1;
    } else if (route.url.includes('profile/mention')) {
      this.activeItemIndex = 2;
    }

    this.profile$.subscribe((value) => {
      if (value.email) {
        this.profile = value;
        console.log(this.profile);
      }
    });
  }

  ngOnInit(): void {}

  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  onChangePage(i: number) {
    this.route.navigate(['/profile' + this.items[i].router]).then();
  }

  //Dialog for profile
  openAddDialog = false;

  openDialog() {
    console.log('open');
    //this.upLoadImage();
    this.openAddDialog = true;
  }

  closeDialog() {
    this.openAddDialog = true;
  }

  updateForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    bio: new FormControl(''),
    photoUrl: new FormControl(''),
  });

  updateData = {
    bio: '',
    userName: '',
    firstName: '',
    lastName: '',
    photoURL: '',
  };

  submit() {
    // this.updateData = {
    //   userName: this.formupdate.value.userName ?? '',
    //   firstName: this.formupdate.value.firstName ?? '',
    //   lastName: this.formupdate.value.lastName ?? '',
    //   bio: this.formupdate.value.bio ?? '',
    //   photoURL: this.formupdate.value.photoUrl ?? '',
    // };
    // this.store.dispatch(
    //   ProfileActions.updateProfile({
    //     profile: this.formupdate.value,
    //   }),
    // );
    // this.openAddDialog = false;
  }

  upLoadImage() {
    this.files.forEach((file: File) => {
      this.store.dispatch(
        StorageActions.uploadFile({
          file: file,
          fileName: `${this.uid}/avatar/`,
        }),
      );
      this.files = [];
    });
  }
}
