import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ShareModule } from '../../../shared/share.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiDataListDropdownManagerModule } from '@taiga-ui/kit';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostState } from '../../../../ngrx/post/post.state';
import { Store } from '@ngrx/store';
import * as PostActions from '../../../../ngrx/post/post.actions';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { ReportState } from '../../../../ngrx/report/report.state';
import { ReportModel } from '../../../model/report.model';
import * as ReportAction from '../../../../ngrx/report/report.actions';
import { Subscription } from 'rxjs';
import { ImagesCarouselComponent } from '../creator/components/images-carousel/images-carousel.component';
import { PostModel, PostResponse } from '../../../model/post.model';
import { IdToNamePipe } from '../../../shared/pipes/id-to-name.pipe';
import { IdToAvatarPipe } from '../../../shared/pipes/id-to-avatar.pipe';
import { ProfileState } from '../../../../ngrx/profile/profile.state';
import { ProfileModel } from '../../../model/profile.model';
import { CommentState } from '../../../../ngrx/comment/comment.state';
import { CommentModel } from '../../../model/comment.model';
import * as CommentActions from '../../../../ngrx/comment/comment.actions';
import { DateToStringPipe } from '../../../shared/pipes/date-to-string.pipe';
import { NotiState } from '../../../../ngrx/noti/noti.state';
import * as NotifiActions from '../../../../ngrx/noti/noti.actions';

type Comment = {
  authorId: string;
  content: string;
  createdAt: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    ShareModule,
    TaigaModule,
    TuiDataListDropdownManagerModule,
    ImagesCarouselComponent,
    IdToNamePipe,
    IdToAvatarPipe,
    DateToStringPipe,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  index = 0;
  token$ = this.store.select('auth', 'token');
  disabled = true;
  postList$ = this.store.select('post', 'postResponse');
  postList: PostModel[] = [];

  profileState$ = this.store.select('profile', 'profile');
  profile: ProfileModel = <ProfileModel>{};
  itemsCount = 0;
  selector: string = '.scroll-container';

  // comment observable
  commentList$ = this.store.select('comment', 'comments');
  isGettingComments$ = this.store.select('comment', 'isGettingComments');
  getCommentsSuccess$ = this.store.select('comment', 'getCommentsSuccess');
  getCommentsError$ = this.store.select('comment', 'getCommentsError');
  commentList: CommentModel[] = [];
  commentValue = '';
  comments: Comment[] = [];

  isLiked = false;

  currentPage = 1;
  size = 10;
  tempArr: PostModel[] = [];
  skeletonVisible = false;

  constructor(
    @Inject(TuiDialogService) private readonly dialogsReport: TuiDialogService,
    private readonly dialogsDetail: TuiDialogService,
    private store: Store<{
      post: PostState;
      auth: AuthState;
      report: ReportState;
      profile: ProfileState;
      comment: CommentState;
      notification: NotiState;
    }>,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.token$.subscribe((token) => {
        if (token) {
          this.store.dispatch(
            PostActions.getAll({ page: this.currentPage, size: this.size }),
          );
        }
      }),

      this.postList$.subscribe((data: PostResponse) => {
        if (data.endPage > 0) {
          this.tempArr = [...this.postList];

          this.postList = [...this.tempArr, ...data.data];
          this.itemsCount = data.endPage;
        }
      }),

      this.profileState$.subscribe((profile) => {
        this.profile = profile;
      }),

      this.commentList$.subscribe((comments) => {
        let data = (comments as any).data;
        for (let i = 0; i < data.length; i++) {
          this.comments.push({
            authorId: data[i].authorId,
            content: data[i].content,
            createdAt: data[i].createdAt!,
          });
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PostActions.clearGetState());
  }

  onScrollDown(ev: any) {
    console.log('scrolled down!!', ev);
    this.currentPage += 1;

    if (this.currentPage <= this.itemsCount) {
      this.store.dispatch(
        PostActions.getAll({ page: this.currentPage, size: this.size }),
      );
    }
  }

  like() {
    this.isLiked = !this.isLiked;
  }

  showDialogReport(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogsReport.open(content).subscribe();
  }

  showDialogDetail(
    content: PolymorpheusContent<TuiDialogContext>,
    item: any,
  ): void {
    this.dialogsDetail.open(content, { size: 'auto' }).subscribe();

    // clear comments
    this.comments = [];

    this.store.dispatch(
      CommentActions.getComments({ postId: item.id, page: 1 }),
    );
  }

  testForm = new FormGroup({
    testValue0: new FormControl(false),
    testValue1: new FormControl(false),
    testValue2: new FormControl(false),
    testValue3: new FormControl(false),
    testValue4: new FormControl(false),
    testValue5: new FormControl(false),
    testValue6: new FormControl(false),
    testValue7: new FormControl(false),
  });

  listReports = [
    'Hate speech',
    'Harassment',
    'Spam',
    'Fake news',
    'False information',
    'Violence',
    'Terrorism',
    'Nude',
  ];

  listChooses: string[] = [];

  checkBox(name: string) {
    this.listChooses.push(name);
    console.log(name);
  }

  testForm2 = new FormGroup({
    testValue1: new FormControl('', Validators.required),
  });

  submit(id: string) {
    let report: ReportModel = {
      type: 'post',
      reason: this.listChooses,
      typeId: id,
      content: this.testForm2.value.testValue1 as string,
      reporter: '',
    };
    this.listChooses = [];
    this.subscription.push(
      this.store.select('auth', 'token').subscribe((token) => {
        if (token != '') {
          this.store.dispatch(
            ReportAction.createReport({ token: token, report }),
          );
        }
      }),
    );

    this.testForm2.patchValue({ testValue1: '' });
    this.testForm = new FormGroup({
      testValue0: new FormControl(false),
      testValue1: new FormControl(false),
      testValue2: new FormControl(false),
      testValue3: new FormControl(false),
      testValue4: new FormControl(false),
      testValue5: new FormControl(false),
      testValue6: new FormControl(false),
      testValue7: new FormControl(false),
    });
  }
  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  sendComment(item: any, comment: string) {
    this.commentValue = '';

    let initComment: CommentModel = {
      id: new Date().getTime().toString(),
      content: comment,
      postId: item.id,
      authorId: this.profile.id,
      createdAt: new Date().toString(),
    };

    this.store.dispatch(CommentActions.createComment({ comment: initComment }));
    this.comments.push({
      authorId: initComment.authorId,
      content: initComment.content,
      createdAt: initComment.createdAt! as string,
    });

    // send notification
    let newNotification = {
      id: '',
      uid: item.creatorId,
      postId: item.id,
      createdAt: new Date().toString(),
      sender: this.profile.id,
      isFollow: false,
      isLike: false,
      isComment: true,
    };

    // console.log(newNotification);

    this.store.dispatch(
      NotifiActions.createNotification({ notification: newNotification }),
    );
  }
  //create function to like post
  likePost(item: any) {
    this.isLiked = !this.isLiked;
  }
}
