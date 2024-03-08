import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component';
import { NotificationService } from '../../../service/notification/notification.service';
import { CanComponentDeactivate } from '../../../guard/can-deactive.guard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, on } from '@ngrx/store';
import { StorageState } from '../../../../ngrx/storage/state/storage.state';
import * as AuthActions from '../../../../ngrx/auth/auth.actions';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { AuthCredentialModel } from '../../../model/auth.model';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [TaigaModule, ShareModule, ImagesCarouselComponent],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.less',
  encapsulation: ViewEncapsulation.None,
})
export class CreatorComponent implements OnInit, CanComponentDeactivate {
  name: string = 'Lulu';
  statusValue: string = '';

  index = 0;
  itemsCount = 1;

  isContentChanged = false;



  authState$ = this.store.select('auth', 'isSignInWithGGSuccess');
  auth: AuthCredentialModel = <AuthCredentialModel>{};
  // add default image
  imageList: string[] = ['https://via.placeholder.com/450'];

  constructor(
    private notificationService: NotificationService,
    private authFirebase: Auth,
    private store: Store<{
      storage: StorageState;
      auth: AuthState;
    }>,
  ) {
    onAuthStateChanged(this.authFirebase, async (user) => {
      if (user) {
        console.log('uid', user.uid);
      }
    });
  }


  canDeactivate(): boolean {
    if (this.isContentChanged) {
      this.notificationService.errorNotification('Your content will be lost!');
      return false;
    }
    return true;
  }

  ngOnInit(): void {

  }

  handleImageListChange(imageList: string[]): void {
    this.imageList = [...imageList];
    this.isContentChanged = true;
    console.log('imageList', this.imageList);
    if (this.imageList.length === 0) {
      this.imageList = ['https://via.placeholder.com/450'];
      this.isContentChanged = false;
    }
    this.index = this.imageList.length - 1;
  }

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }

  clearStatus(): void {
    this.statusValue = '';
  }
}
