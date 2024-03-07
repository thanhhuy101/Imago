import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component';
import { NotificationService } from '../../../service/notification/notification.service';
import { CanComponentDeactivate } from '../../../guard/can-deactive.guard';
import {Store} from "@ngrx/store";
import {AuthState} from "../../../../ngrx/auth/state/auth.state";
import {StorageState} from "../../../../ngrx/storage/state/storage.state";
import {PostState} from "../../../../ngrx/post/post.state";
import * as StorageActions from "../../../../ngrx/storage/actions/storage.actions";
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

  // add default image
  imageList: string[] = ['https://via.placeholder.com/450'];

  constructor(
    private notificationService: NotificationService,
    private store: Store<{
    auth: AuthState;
    storage: StorageState;
    post: PostState;
  }>
  )
  {}

  canDeactivate(): boolean {
    if (this.isContentChanged) {
      this.notificationService.errorNotification('Your content will be lost!');
      return false;
    }
    return true;
  }

  ngOnInit(): void {}

  handleImageListChange(imageList: string[]): void {
    this.imageList = [...imageList];
    this.isContentChanged = true;
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
