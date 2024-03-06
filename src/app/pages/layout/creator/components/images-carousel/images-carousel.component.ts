import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { TuiValidationError } from '@taiga-ui/cdk';
import { NotificationService } from '../../../../../service/notification/notification.service';
import{ StorageService } from '../../../../../service/storage/storage.service';
import { Store } from '@ngrx/store';
import { StorageState } from '../../../../../../ngrx/storage/state/storage.state';
import { AuthState } from '../../../../../../ngrx/auth/state/auth.state';

import * as StorageActions from '../../../../../../ngrx/storage/actions/storage.actions';
import * as AuthActions from '../../../../../../ngrx/auth/actions/auth.actions';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from '@firebase/auth';
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

  control = new FormControl(new Array<File>(), [maxFilesLength(5)]);
  rejectedFiles: readonly TuiFileLike[] = [];

  imageList: string[] = ['https://via.placeholder.com/450'];
  tmpImageList: string[] = [];
  index = 0;
  itemsCount = 1;
  file: any;
  idTokenImage = '';
  uid = '';
  postId= '';

  constructor(
    private notificationService: NotificationService,
    private storageService: StorageService,
    private auth: Auth,
    private store: Store<{
      storage: StorageState;
      auth: AuthState;
    }>,
    ) {
      onAuthStateChanged(this.auth, async (user) => {
      
        if (user) {
          const idToken = await user.getIdToken();
          this.store.dispatch(
            AuthActions.storeToken({ token: idToken }),
          )
          this.uid = user.uid;
          this.idTokenImage = idToken;
          console.log('uid', user.uid);
          
        }
      });
      this.postId = Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
      ).toString();
      

    }
 formData = new FormData();
  //if array control have a value . append to formData and call api at service
 
 

  ngOnInit(): void {
    
    this.control.valueChanges.subscribe((response: File[] | null) => {
      if (response) {
        if (response.length > 5) {
          this.notificationService.errorNotification(
            'Error: maximum limit - 5 files for upload',
          );
          return;
        }
        response.forEach((file: File) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => {
            if (reader.result) {
              const blob = new Blob([reader.result], { type: 'image/png' });
              const url = URL.createObjectURL(blob);
              this.tmpImageList.push(url);
            
              this.file = file;
              console.log('file', this.file);
              this.store.dispatch(StorageActions.upLoadFile({ file: file, fileName: `${this.uid}/posts/${this.postId}`, idToken: this.idTokenImage }));
              if (this.tmpImageList.length === response.length) {
                this.imageList = this.tmpImageList;
                this.responseChangeEvent.emit(this.imageList);
                this.tmpImageList = [];
              }
            }
          };
        });
      }
    });
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

    this.responseChangeEvent.emit(this.imageList);
    if (this.imageList.length === 0) {
      this.imageList = ['https://via.placeholder.com/450'];
    }
    // get index of the last image
    if (index === this.imageList.length) {
      this.index = index;
    }
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
