import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileModel } from '../../../model/profile.model';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../../ngrx/profile/profile.state';
import * as ProfileActions from '../../../../ngrx/profile/profile.actions';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import {
  combineLatest,
  filter,
  finalize,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  timer,
} from 'rxjs';
import { StorageState } from '../../../../ngrx/storage/storage.state';
import * as StorageActions from '../../../../ngrx/storage/storage.actions';
import * as PostActions from '../../../../ngrx/post/post.actions';
import { TuiFileLike } from '@taiga-ui/kit';
import { NotificationService } from '../../../service/notification/notification.service';
import { PostState } from '../../../../ngrx/post/post.state';
import { IdToAvatarPipe } from '../../../shared/pipes/id-to-avatar.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  encapsulation: ViewEncapsulation.None,
  imports: [TaigaModule, ShareModule, RouterOutlet, RouterLink, IdToAvatarPipe],
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly names = ['Jason Statham', 'Jackie Chan'];
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

  loader = false;

  queryParams$ = this.activatedRoute.queryParams;

  token$ = this.store.select('auth', 'token');
  mine$ = this.store.select('profile', 'mine');
  isGetByIdSuccess$ = this.store.select('profile', 'isGetByIdSuccess');
  profile$ = this.store.select('profile', 'profile');
  isGetMineSuccess$ = this.store.select('profile', 'isGetMineSuccess');

  isUpdating$ = this.store.select('profile', 'isUpdating');
  isUpdateSuccess$ = this.store.select('profile', 'isUpdateSuccess');
  updateErrorMessages$ = this.store.select('profile', 'updateErrorMessage');

  isUploading$ = this.store.select('storage', 'isUploading');
  isUploadSuccess$ = this.store.select('storage', 'url');
  uploadError$ = this.store.select('storage', 'uploadError');

  files: File[] = [];
  uid: string = '';
  photoUrl: string = '';

  readonly imageControl = new FormControl();
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
  readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  readonly loadedFiles$ = this.imageControl.valueChanges.pipe(
    switchMap((file) => (file ? this.makeRequest(file) : of(null))),
  );

  uploadData = {
    file: <File>{},
    fileName: '',
  };

  updateForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    bio: new FormControl(''),
    photoUrl: new FormControl(''),
  });

  updateData: ProfileModel = {
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    bio: '',
    photoUrl: '',
    gender: '',
    email: '',
    phone: '',
    category: [],
    followers: [],
    following: [],
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService,
    private store: Store<{
      profile: ProfileState;
      auth: AuthState;
      storage: StorageState;
      post: PostState;
    }>,
  ) {
    if (this.route.url.includes('profile/share')) {
      this.activeItemIndex = 1;
    } else if (this.route.url.includes('profile/mention')) {
      this.activeItemIndex = 2;
    }
  }

  ngOnInit(): void {
    this.subscription.push(
      combineLatest([
        this.queryParams$,
        this.token$,
        this.mine$,
        this.profile$,
        this.isGetMineSuccess$,
        this.isGetByIdSuccess$,
      ])
        .pipe(
          filter(
            ([
              params,
              token,
              mine,
              profile,
              isGetMineSuccess,
              isGetByIdSuccess,
            ]) => Boolean(token && isGetMineSuccess),
          ),
        )
        .subscribe(([params, , mine, profile, , isGetByIdSuccess]) => {
          if (mine.id === params['uid']) {
            this.setProfileData(mine);
          } else if (isGetByIdSuccess) {
            this.setProfileData(profile);
          } else if (!profile.id) {
            this.store.dispatch(ProfileActions.getById({ id: params['uid'] }));
          }
        }),

      this.imageControl.valueChanges.subscribe((file) => {
        if (file) {
          this.store.dispatch(
            StorageActions.uploadFile({
              file: file,
              fileName: `${this.profile.id}/avatars/`,
            }),
          );
        }
      }),

      this.isUploading$.subscribe((value) => {
        if (value) {
          this.notificationService.infoNotification('Uploading...');
        }
      }),
      this.isUploadSuccess$.subscribe((value) => {
        if (value.length > 0) {
          this.notificationService.successNotification('Upload success');
          this.photoUrl = value[0];
          this.imageControl.setValue(null);
        }
      }),
      this.uploadError$.subscribe((value) => {
        if (value.status) {
          this.notificationService.errorNotification('Upload failed');
          this.imageControl.setValue(null);
        }
      }),

      this.isUpdating$.subscribe((value) => {
        this.loader = value;
      }),
      this.isUpdateSuccess$.subscribe((value) => {
        if (value) {
          this.loader = false;
          this.notificationService.successNotification('Update success');
          this.store.dispatch(ProfileActions.getById({ id: this.profile.id }));
          this.openDialog = false;
        }
      }),
      this.updateErrorMessages$.subscribe((value) => {
        if (value.status) {
          this.loader = false;
          this.notificationService.errorNotification(value.error.message);
        }
      }),
    );
  }

  setProfileData(profileData: ProfileModel) {
    this.profile = profileData;
    this.photoUrl = profileData.photoUrl;

    this.updateForm.setValue({
      userName: profileData.userName,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      bio: profileData.bio,
      photoUrl: profileData.photoUrl,
    });

    this.updateData = {
      ...profileData,
    };
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
    this.store.dispatch(ProfileActions.clearMessages());
    this.store.dispatch(StorageActions.resetStorage());
    this.store.dispatch(ProfileActions.clearUpdateState());
    this.store.dispatch(PostActions.clearGetState());
  }

  //Dialog for profile
  openDialog = false;

  toggleDialog(toggle: boolean) {
    this.openDialog = toggle;
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  removeFile(): void {
    this.imageControl.setValue(null);
    this.uploadData = {
      file: <File>{},
      fileName: 'users/' + this.profile.id + '/',
    };
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  saveChanges() {
    this.updateData = {
      ...this.updateData,
      userName: this.updateForm.get('userName')?.value,
      firstName: this.updateForm.get('firstName')?.value,
      lastName: this.updateForm.get('lastName')?.value,
      bio: this.updateForm.get('bio')?.value,
      photoUrl: this.photoUrl,
    };

    this.store.dispatch(
      ProfileActions.updateMine({
        mine: this.updateData,
      }),
    );
  }

  makeRequest(file: TuiFileLike): Observable<TuiFileLike | null> {
    this.loadingFiles$.next(file);
    return timer(1000).pipe(
      map(() => {
        //check if file size is greater than 1MB
        if (file.size) {
          if (file.size > 3145728) {
            this.rejectedFiles$.next(file);
          } else {
            return file;
          }
        }
        return null;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }
}
