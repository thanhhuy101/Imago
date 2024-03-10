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
import * as PostActions from '../../../../ngrx/post/post.action';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { AuthCredentialModel } from '../../../model/auth.model';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { PostState } from '../../../../ngrx/post/post.state';
import { PostModel } from '../../../model/post.model';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { Router } from '@angular/router';
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

  linkOfImage: string[] = [];
  storageState$ = this.store.select('storage', 'url');
  isCreateSuccess$ = this.store.select('post', 'isSucces');
  isCreateFailure$ = this.store.select('post', 'isCreateFailure');
  authState$ = this.store.select('auth', 'isSignInWithGGSuccess');
  auth: AuthCredentialModel = <AuthCredentialModel>{};
  // add default image
  imageList: string[] = ['https://via.placeholder.com/450'];

  constructor(
    private route: Router,
    private notificationService: NotificationService,
    private authFirebase: Auth,
    private store: Store<{
      storage: StorageState;
      auth: AuthState;
      post: PostState;
    }>,
  ) {
    onAuthStateChanged(this.authFirebase, async (user) => {
      if (user) {
        console.log('uid', user.uid);
        this.auth.uid = user.uid;
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
    this.storageState$.subscribe((url) => {
      if (url) {
        url.forEach((url: string) => {
          this.linkOfImage.push(url);
        });
        console.log('linkOfImage', this.linkOfImage);
      }
    });
    this.isCreateSuccess$.subscribe((isSuccess) => {
      if (isSuccess) {
        this.isContentChanged = false;
        this.notificationService.successNotification('Post successfully');
        setTimeout(() => {
          this.route.navigate(['/profile/post']);
        }, 3000);
      }
    });
    this.isCreateFailure$.subscribe((error) => {
      if (error) {
        console.log('error', error);
        this.notificationService.errorNotification('Post Fail');
      }
    });
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
    // Tách chuỗi thành mảng các từ
    const words = inputString.split(' ');

    // Lọc ra các từ chứa dấu #
    const hashtag = words.filter((word) => word.includes('#'));
    const remainingWords = words.filter((word) => !word.includes('#'));
    // Loại bỏ dấu # ở đầu từ và trả về kết quả
    const hashtagsWithoutHash = hashtag.map((hashtag) =>
      hashtag.replace('#', ''),
    );
    const remainingString = remainingWords.join(' ');

    return { hashtag: hashtagsWithoutHash, remaining: remainingString };
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
      creatorId: this.auth.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      id: this.auth.uid.slice(0, 10) + Date.now().toString(),
    };
    console.log('newPost', newPost);
    this.store.dispatch(PostActions.createPost({ post: newPost }));
  }
}
