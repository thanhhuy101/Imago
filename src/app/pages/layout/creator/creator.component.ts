import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TaigaModule } from '../../../shared/taiga.module';
import { ShareModule } from '../../../shared/share.module';
import { ImagesCarouselComponent } from './components/images-carousel/images-carousel.component';
import { NotificationService } from '../../../service/notification/notification.service';
import { CanComponentDeactivate } from '../../../guard/can-deactive.guard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, on } from '@ngrx/store';
import { StorageState } from '../../../../ngrx/storage/storage.state';
import * as AuthActions from '../../../../ngrx/auth/auth.actions';
import * as PostActions from '../../../../ngrx/post/post.actions';
import * as StorageActions from '../../../../ngrx/storage/storage.actions';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { AuthCredentialModel } from '../../../model/auth.model';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { PostState } from '../../../../ngrx/post/post.state';
import { DateTime, PostModel } from '../../../model/post.model';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileModel } from '../../../model/profile.model';
import { ProfileState } from '../../../../ngrx/profile/profile.state';
import * as ProfileActions from '../../../../ngrx/profile/profile.actions';
import { DateToStringPipe } from "../../../shared/pipes/date-to-string.pipe";
import { TuiAvatarModule } from '@taiga-ui/kit';
@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [TaigaModule, ShareModule, ImagesCarouselComponent, DateToStringPipe, TuiAvatarModule],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.less',
  encapsulation: ViewEncapsulation.None,
})
export class CreatorComponent
  implements OnInit, CanComponentDeactivate, OnDestroy {
  isUploadImages = true;
  @Input() isDisabled = this.isUploadImages;
  name: string = 'Lulu';
  statusValue: string = '';
  //createAt . date.now
  createAt = Date.now();
  index = 0;
  itemsCount = 1;

  isContentChanged = false;
  profile: ProfileModel = <ProfileModel>{};
  linkOfImage: string[] = [];
  storageState$ = this.store.select('storage', 'url');
  isCreateSuccess$ = this.store.select('post', 'isCreateSuccess');
  createErrorMessage$ = this.store.select('post', 'createErrorMessage');
  firebaseData$ = this.store.select('auth', 'firebaseData');
  profile$ = this.store.select('profile', 'profile');
  imageList: string[] = ['https://via.placeholder.com/450'];
  subscription: Subscription[] = [];
  uid = '';

  constructor(
    private route: Router,
    private notificationService: NotificationService,

    private store: Store<{
      storage: StorageState;
      auth: AuthState;
      post: PostState;
      profile: ProfileState;
    }>,
  ) { }

  canDeactivate(): boolean {
    if (this.isContentChanged) {
      this.notificationService.errorNotification('Your content will be lost!');
      return false;
    }
    return true;
  }


  ngOnInit(): void {
    this.subscription.push(
      this.firebaseData$.subscribe((data) => {
        if (data) {
          this.uid = data.uid;
        }
      }),
      this.storageState$.subscribe((url) => {
        if (url) {
          url.forEach((url: string) => {
            this.linkOfImage.push(url);
            this.notificationService.successNotification(
              'Upload image success',
            );
          });
          console.log('linkOfImage', this.linkOfImage);
        }
      }),
      this.isCreateSuccess$.subscribe((isSuccess) => {
        if (isSuccess) {
          this.isContentChanged = false;
          this.notificationService.successNotification('Post successfully');
          this.store.dispatch(PostActions.clearCreateState());
          this.route.navigate(['/profile/post']).then();
        }
      }),
      this.createErrorMessage$.subscribe((error) => {
        if (error.status) {
          this.notificationService.errorNotification('Please input status!');
          this.store.dispatch(PostActions.clearCreateState());
        }
      }),
      this.profile$.subscribe((profile) => {
        if (profile) {
          this.profile = profile;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PostActions.clearMessages());
    this.store.dispatch(StorageActions.resetStorage());
  }

  handleImageListChange(imageList: string[]): void {
    this.imageList = [...imageList];
    this.isContentChanged = true;
    // console.log('imageList', this.imageList);
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

  extractHashtags(inputString: string): {
    hashtag: string[];
    remaining: string;
  } {
    // Tìm và tách các hashtag bằng biểu thức chính quy
    const hashtagRegex = /#(\w+)/g;
    const hashtags = [];
    let remainingWords = [];

    let match;
    let lastIndex = 0;

    while ((match = hashtagRegex.exec(inputString)) !== null) {
      // Lấy từng hashtag và từng từ còn lại của chuỗi
      const hashtag = match[1];
      const wordBeforeHashtag = inputString.substring(lastIndex, match.index);
      lastIndex = hashtagRegex.lastIndex;

      // Thêm từ còn lại vào mảng
      if (wordBeforeHashtag.trim() !== '') {
        remainingWords.push(wordBeforeHashtag.trim());
      }

      // Thêm hashtag vào mảng
      hashtags.push(hashtag);
    }

    // Lấy từ còn lại sau hashtag cuối cùng
    const remainingString = inputString.substring(lastIndex).trim();
    if (remainingString !== '') {
      remainingWords.push(remainingString);
    }

    // Trả về kết quả
    return { hashtag: hashtags, remaining: remainingWords.join(' ') };
  }

  publicPost(): void {
    let result = this.extractHashtags(this.statusValue);
    let newPost: PostModel = {
      content: result.remaining,
      photoUrl: this.linkOfImage,
      hashtag: result.hashtag,
      mention: [],
      reaction: [],
      share: [],
      cateId: [],
      comments: [],
      creatorId: this.uid,
      createdAt: <DateTime>{
        _seconds: Date.now(),
        _nanoseconds: new Date().getMilliseconds() * 1000000,
      },
      updatedAt: <DateTime>{},
      deletedAt: <DateTime>{},
      id: this.uid.slice(0, 10) + Date.now().toString(),
    };
    if (result.remaining == '') {
      this.notificationService.errorNotification('Content cannot be empty');
      return;
    }
    console.log('newPost', newPost);
    this.store.dispatch(PostActions.create({ post: newPost }));
  }

  onChangeValue(event: any): void {
    this.isDisabled = event;
  }
}
