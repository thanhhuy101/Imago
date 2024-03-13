import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { TuiValidationError } from '@taiga-ui/cdk';
import { NotificationService } from '../../../../../service/notification/notification.service';

import { Store } from '@ngrx/store';
import { StorageState } from '../../../../../../ngrx/storage/storage.state';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';

import * as StorageActions from '../../../../../../ngrx/storage/storage.actions';

import { Subscription } from 'rxjs';

import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { ProfileModel } from '../../../../../model/profile.model';

@Component({
  selector: 'app-images-carousel',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.scss',
})
export class ImagesCarouselComponent implements OnInit {
  @Input() isUploadImages = true;
  @Output() responseChangeEvent: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  @Output() uploadImagesEvent = new EventEmitter<boolean>();
  subscription: Subscription[] = [];

  control = new FormControl(new Array<File>(), [maxFilesLength(5)]);
  rejectedFiles: readonly TuiFileLike[] = [];

  imageList: string[] = ['https://via.placeholder.com/450'];
  tmpImageList: string[] = [];
  index = 0;
  itemsCount = 1;
  files: File[] = [];
  uid = '';
  postId = '';

  firebaseData$ = this.store.select('auth', 'firebaseData');

  profileState$ = this.store.select('profile', 'profile');
  profile: ProfileModel = <ProfileModel>{};

  constructor(
    private notificationService: NotificationService,
    private store: Store<{
      storage: StorageState;
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) {
    this.postId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now()),
    ).toString();
  }

  ngOnInit(): void {
    this.subscription.push(
      this.firebaseData$.subscribe((value) => {
        if (value) {
          this.uid = value.uid;
        }
      }),
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
          this.isUploadImages = response.length === 0;
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
                  this.responseChangeEvent.emit(this.imageList);
                  this.tmpImageList = [];
                }
              }
            };
          });
        }
      }),

      this.profileState$.subscribe((profile) => {
        if (profile) {
          this.profile = profile;
          console.log('profile', this.profile);
        }
      }),
    );
  }

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }

  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  deleteImage(index: number): void {
    this.imageList.splice(index, 1);

    // delete file from the list
    this.control.setValue(this.control.value!.filter((_, i) => i !== index));
    this.files.slice(index, 1);
    console.log('filesRemove', this.files);
    this.responseChangeEvent.emit(this.imageList);
    if (this.imageList.length === 0) {
      this.imageList = ['https://via.placeholder.com/450'];
    }
    // get index of the last image
    if (index === this.imageList.length) {
      this.index = index;
    }
    this.isUploadImages = true;
    this.uploadImagesEvent.emit(true);
  }

  upLoadImage() {
    this.files.forEach((file: File) => {
      this.store.dispatch(
        StorageActions.uploadFile({
          file: file,
          fileName: `${this.uid}/posts/${this.postId}`,
        }),
      );
      this.files = [];
    });
    this.uploadImagesEvent.emit(false);
  }

  onUploadImage(event: any) {
    // console.log('event', event);
 
  }
}

export function maxFilesLength(maxLength: number): ValidatorFn {
  return ({ value }: AbstractControl) =>
    value.length > maxLength
      ? {
          maxLength: new TuiValidationError(
            'Error: maximum limit - 5 files for upload',
          ),
        }
      : null;
}
