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

  getMine$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getMine),
      mergeMap((action) => {
        return this.postService
          .getMine(action.token, action.page, action.size)
          .pipe(
            map((postList: any) => {
              return PostActions.getMineSuccess({ postList });
            }),
            catchError((error) => {
              return of(PostActions.getMineFailure({ message: error }));
            }),
          );
      }),
    ),
  );

  createPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.createPost),
      switchMap((action) => {
        return this.postService.createPost(action.post, action.token).pipe(
          map((post: any) => {
            return PostActions.createPostSuccess({ post });
          }),
          catchError((error) => {
            return of(PostActions.createPostFailure({ message: error }));
          }),
        );
      }),
    ),
  );
}
