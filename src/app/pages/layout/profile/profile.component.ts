import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { StorageState } from '../../../../ngrx/storage/state/storage.state';
import * as StorageActions from '../../../../ngrx/storage/actions/storage.actions';
import { maxFilesLength } from '../creator/components/images-carousel/images-carousel.component';
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

  token: string = '';
  token$ = this.store.select('auth', 'token');
  profile$ = this.store.select((state) => state.profile.profile);
  isSuccess$ = this.store.select('profile', 'isSuccess');
  errorMessage$ = this.store.select('profile', 'errorMessage');
  updateIsSuccess$ = this.store.select('profile', 'updateIsSuccess');
  updateErrorMessage$ = this.store.select('profile', 'updateErrorMessage');

  files: File[] = [];
  rejectedFiles: readonly TuiFileLike[] = [];
  tmpImageList: string[] = [];
  imageList: string[] = ['https://via.placeholder.com/450'];
  idTokenImage = '';
  uid = '';
  storageState$ = this.store.select('storage', 'url');
  control = new FormControl(new Array<File>(), [maxFilesLength(1)]);

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private route: Router,
    private notificationService: NotificationService,
    private store: Store<{
      profile: ProfileState;
      auth: AuthState;
      storage: StorageState;
    }>,
  ) {
    let path = window.location.href.split('?')[0];
    console.log(path);
    if (path.includes('profile/share')) {
      this.activeItemIndex = 1;
    } else if (path.includes('profile/mention')) {
      this.activeItemIndex = 2;
    }
    this.token$.subscribe((value) => {
      if (value) {
        this.token = value;
      }
    });
    this.profile$.subscribe((value) => {
      if (value) {
        this.profile = value;
      }
    });
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((response: File[] | null) => {
      if (response) {
        this.files = response;
        if (response.length > 5) {
          this.notificationService.errorNotification(
            'Error: maximum limit - 5 files for upload',
          );
          this.files = [];
          return;
        }
        response.forEach((file: File) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => {
            if (reader.result) {
              const blob = new Blob([reader.result], { type: 'image/png' });
              const url = URL.createObjectURL(blob);
              this.tmpImageList.unshift(url);
              if (this.tmpImageList.length === response.length) {
                this.imageList = this.tmpImageList;
                // this.responseChangeEvent.emit(this.imageList);
                this.tmpImageList = [];
              }
            }
          };
        });
      }
    });
    this.subscription.push(
      this.token$.subscribe((token) => {
        if (token != '') {
          this.store.dispatch(ProfileActions.getProfile());
        }
      }),
      this.profile$.subscribe((profile) => {
        if (profile) {
          this.formupdate.patchValue({
            userName: profile.userName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            bio: profile.bio,
            photoUrl: profile.photoURL,
          });
        }
      }),
      this.storageState$.subscribe((url) => {
        if (url) {
          console.log(url);
          url.forEach((url: string) => {
            this.formupdate.patchValue({
              photoUrl: url,
            });
          });
        }
      }),

      this.updateIsSuccess$.subscribe((updateProfileSuccess) => {
        if (updateProfileSuccess) {
          console.log(updateProfileSuccess);
        }
      }),
      this.updateErrorMessage$.subscribe((updateErrorMessage) => {
        if (updateErrorMessage) {
          console.log(updateErrorMessage);
        }
      }),
    );
  }
  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
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
    //this.upLoadImage();
    this.openAddDialog = true;
  }

  closeDialog() {
    this.openAddDialog = true;
  }

  formupdate: FormGroup = new FormGroup({
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
    this.updateData = {
      userName: this.formupdate.value.userName ?? '',
      firstName: this.formupdate.value.firstName ?? '',
      lastName: this.formupdate.value.lastName ?? '',
      bio: this.formupdate.value.bio ?? '',
      photoURL: this.formupdate.value.photoUrl ?? '',
    };
    this.store.dispatch(
      ProfileActions.updateProfile({
        profile: this.formupdate.value,
      }),
    );
    this.openAddDialog = false;
  }

  upLoadImage() {
    this.files.forEach((file: File) => {
      this.store.dispatch(
        StorageActions.upLoadFile({
          file: file,
          fileName: `${this.uid}/avatar/`,
          idToken: this.idTokenImage,
        }),
      );
      this.files = [];
    });
  }
}
