import { Component, Inject } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PostState } from '../../../../../../ngrx/post/post.state';
import { ReportState } from '../../../../../../ngrx/report/report.state';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { PostModel } from '../../../../../model/post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportModel } from '../../../../../model/report.model';
import { IdToAvatarPipe } from "../../../../../shared/pipes/id-to-avatar.pipe";
import { IdToNamePipe } from "../../../../../shared/pipes/id-to-name.pipe";
import { CommentModel } from '../../../../../model/comment.model';
import { CommentState } from '../../../../../../ngrx/comment/comment.state';
import { NotiState } from '../../../../../../ngrx/noti/noti.state';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { ProfileModel } from '../../../../../model/profile.model';
import * as CommentActions from '../../../../../../ngrx/comment/comment.actions';
import * as NotifiActions from '../../../../../../ngrx/noti/noti.actions';
type Comment = {
  authorId: string;
  content: string;
  createdAt: string;
};

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    imports: [TaigaModule, ShareModule, IdToAvatarPipe, IdToNamePipe]
})
export class PostComponent {
  subscription: Subscription[] = [];
  postSearchResult$ = this.store.select((state) => state.post.postSearchResult);
  list: PostModel[] = [];
  commentValue = '';

  //profile
  profileState$ = this.store.select('profile', 'mine');
  profile: ProfileModel = <ProfileModel>{};

  //comment 
  commentList$ = this.store.select('comment', 'comments');
  isGettingComments$ = this.store.select('comment', 'isGettingComments');
  getCommentsSuccess$ = this.store.select('comment', 'getCommentsSuccess');
  getCommentsError$ = this.store.select('comment', 'getCommentsError');
  commentList: CommentModel[] = [];
  skeletonVisible = false;
  comments: Comment[] = [];
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
itemsCount = 0;
disabled=true;
  index = 0;

  ngOnInit(): void {
    this.subscription.push(
      this.postSearchResult$.subscribe((res) => {
        this.list = res;
        console.log('search list',this.list);
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
      this.profileState$.subscribe((profile) => {
        this.profile = profile;
      }),

    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.list = [];
  }


  isLiked = false;

  like() {
    this.isLiked = !this.isLiked;
  }

  showDialogReport(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogsReport.open(content).subscribe();
  }

  showDialogDetail(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogsDetail.open(content, { size: 'auto' }).subscribe();
  }
  open = false;
  selectedItem: PostModel | null = null;

  openUpdate = false;

  showDialog(i: number): void {
    this.selectedItem = this.list[i];
    this.open = true;
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
}
