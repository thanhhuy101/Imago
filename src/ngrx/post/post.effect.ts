import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { PostService } from '../../app/service/post/post.service';
import * as PostActions from './post.action';

@Injectable()
export class PostEffect {
  constructor(
    private action$: Actions,
    private postService: PostService,
  ) {}

  getAllPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getAllPost),
      switchMap((action) => {
        return this.postService.getAllPosts(action.token).pipe(
          map((postList: any) => {
            return PostActions.getAllPostSuccess({ postList });
          }),
          catchError((error) => {
            return of(
              PostActions.getAllPostFailure({ getAllPostErrorMessage: error }),
            );
          }),
        );
      }),
    ),
  );
}
