import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { TaigaModule } from '../../../../../shared/taiga.module';
import { ShareModule } from '../../../../../shared/share.module';
import { TuiDialogService } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../../../ngrx/auth/auth.state';
import { PostState } from '../../../../../../ngrx/post/post.state';
import { PostResponse } from '../../../../../model/post.model';
import * as PostActions from '../../../../../../ngrx/post/post.actions';
import { RouterLink } from '@angular/router';

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

  postList$ = this.store.select('post', 'postResponse');
  postList = <PostResponse>{};

  currentPage = 0;
  size = 10;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store<{
      post: PostState;
      auth: AuthState;
    }>,
  ) {
    this.token$.subscribe((token) => {
      if (token) {
        this.store.dispatch(
          PostActions.getMine({ page: this.currentPage + 1, size: this.size }),
        );
      }
    });
  }

  index = 0;

  // isObjectEmpty(objectName: {}) {
  //   return Object.keys(objectName).length === 0;
  // }

  ngOnInit(): void {
    this.subscription.push(
      this.postList$.subscribe((data) => {
        if (data.endPage > 0) {
          this.postList = data;
          console.log('postList', this.postList);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PostActions.clearGetState());
  }
}
