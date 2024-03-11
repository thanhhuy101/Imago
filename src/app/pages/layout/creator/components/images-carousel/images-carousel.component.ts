import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { TuiValidationError } from '@taiga-ui/cdk';
import { NotificationService } from '../../../../../service/notification/notification.service';
import { StorageService } from '../../../../../service/storage/storage.service';
import { Store } from '@ngrx/store';
import { StorageState } from '../../../../../../ngrx/storage/storage.state';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';

import * as StorageActions from '../../../../../../ngrx/storage/storage.actions';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@firebase/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-images-carousel',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './images-carousel.component.html',
  styleUrl: './images-carousel.component.scss',
})
export class ImagesCarouselComponent implements OnInit {
  @Output() responseChangeEvent: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

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

  constructor(
    private notificationService: NotificationService,
    private store: Store<{
      storage: StorageState;
      auth: AuthState;
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
