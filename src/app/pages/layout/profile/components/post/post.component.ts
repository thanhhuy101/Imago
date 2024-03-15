import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { TuiDialogService } from '@taiga-ui/core';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { PostState } from '../../../../../../ngrx/post/post.state';
import { PostModel, PostResponse } from '../../../../../model/post.model';
import * as PostActions from '../../../../../../ngrx/post/post.actions';
import * as CommentActions from '../../../../../../ngrx/comment/comment.actions';
import * as NotifiActions from '../../../../../../ngrx/noti/noti.actions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';
import { CommentState } from '../../../../../../ngrx/comment/comment.state';
import { CommentModel } from '../../../../../model/comment.model';
import { ProfileModel } from '../../../../../model/profile.model';
import { IdToNamePipe } from '../../../../../shared/pipes/id-to-name.pipe';
import { IdToAvatarPipe } from '../../../../../shared/pipes/id-to-avatar.pipe';

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
  imports: [TaigaModule, ShareModule, RouterLink, IdToNamePipe, IdToAvatarPipe],
})
export class PostComponent implements OnInit, OnDestroy {
  loader: boolean = false;
  subscription: Subscription[] = [];

  token$ = this.store.select('auth', 'token');
  profile$ = this.store.select('profile', 'mine');
  profile: ProfileModel = <ProfileModel>{};

  queryParam$ = this.activatedRoute.queryParams;
  uid = '';

  postList$ = this.store.select('post', 'minePost');
  postListByUserId$ = this.store.select('post', 'postResponse');
  postList = <PostResponse>{};

  postDetail: PostModel = <PostModel>{};

  postDetail$ = this.store.select('post', 'postDetail');
  errorGetOneMessage$ = this.store.select('post', 'errorGetOneMessage');

  currentPage = 0;
  size = 10;

  // comment observable
  commentList$ = this.store.select('comment', 'comments');
  isGettingComments$ = this.store.select('comment', 'isGettingComments');
  getCommentsSuccess$ = this.store.select('comment', 'getCommentsSuccess');
  getCommentsError$ = this.store.select('comment', 'getCommentsError');

  isCommentSuccess$ = this.store.select('comment', 'createCommentSuccess');

  commentList: CommentModel[] = [];
  commentValue = '';
  comments: Comment[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store<{
      post: PostState;
      auth: AuthState;
      profile: ProfileState;
      comment: CommentState;
    }>,
  ) {
    combineLatest([this.token$, this.queryParam$, this.profile$]).subscribe(
      ([token, queryParam, profile]) => {
        if (token) {
          this.uid = queryParam['uid'];

          if (this.uid === profile.id) {
            this.store.dispatch(
              PostActions.getMine({
                page: this.currentPage + 1,
                size: this.size,
              }),
            );
          } else {
            this.store.dispatch(
              PostActions.getWithUserId({
                creatorId: this.uid,
                page: this.currentPage + 1,
                size: this.size,
              }),
            );
          }
        }
      },
    );
  }

  index = 0;

  ngOnInit(): void {
    this.subscription.push(
      this.postList$.subscribe((data) => {
        if (data.endPage > 0) {
          this.postList = data;
          console.log('postList', this.postList);
        }
      }),
      this.postListByUserId$.subscribe((data) => {
        if (data.endPage > 0) {
          this.postList = data;
          console.log('postListByUserId', this.postList);
        }
      }),

      this.isCommentSuccess$.subscribe((data) => {
        if (data) {
          this.store.dispatch(
            CommentActions.getComments({ postId: this.postDetail.id, page: 1 }),
          );
        }
      }),

      // this.commentList$.subscribe((comments) => {
      //   if (comments.length > 0) {
      //     let data = (comments as any).data;
      //     for (let i = 0; i < data.length; i++) {
      //       this.comments.push({
      //         authorId: data[i].authorId,
      //         content: data[i].content,
      //         createdAt: data[i].createdAt!,
      //       });
      //     }
      //   }
      // }),

      this.postDetail$.subscribe((data) => {
        if (data.id) {
          this.postDetail = data;
          this.open = true;
          this.comments = [];
          this.store.dispatch(
            CommentActions.getComments({ postId: data.id, page: 1 }),
          );
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PostActions.clearGetState());
  }

  open = false;

  showDialog(id: string): void {
    if (id) {
      this.store.dispatch(PostActions.getOne({ id: id }));

      // get comments of postId
      this.store.dispatch(CommentActions.getComments({ postId: id, page: 1 }));

      this.comments = [];

      this.commentList$.subscribe((comments) => {
        let data = (comments as any).data;
        if (data != undefined) {
          for (let i = 0; i < data.length; i++) {
            this.comments.push({
              authorId: data[i].authorId,
              content: data[i].content,
              createdAt: data[i].createdAt!,
            });
          }
        }
      });
    }
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

    // this.comments.push({
    //   authorId: initComment.authorId,
    //   content: initComment.content,
    //   createdAt: initComment.createdAt! as string,
    // });

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
