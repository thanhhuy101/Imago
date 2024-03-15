import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { TuiDialogService } from '@taiga-ui/core';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { PostState } from '../../../../../../ngrx/post/post.state';
import { PostResponse } from '../../../../../model/post.model';
import * as PostActions from '../../../../../../ngrx/post/post.actions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfileState } from '../../../../../../ngrx/profile/profile.state';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [TaigaModule, ShareModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit, OnDestroy {
  loader: boolean = false;
  subscription: Subscription[] = [];

  token$ = this.store.select('auth', 'token');
  profile$ = this.store.select('profile', 'profile');
  queryParam$ = this.activatedRoute.queryParams;
  uid = '';

  postList$ = this.store.select('post', 'minePost');
  postListByUserId$ = this.store.select('post', 'postResponse');
  postList = <PostResponse>{};

  currentPage = 0;
  size = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store<{
      post: PostState;
      auth: AuthState;
      profile: ProfileState;
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
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PostActions.clearGetState());
  }
}
