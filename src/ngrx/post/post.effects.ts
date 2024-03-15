import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { PostService } from '../../app/service/post/post.service';
import * as PostActions from './post.actions';

@Injectable()
export class PostEffect {
  constructor(
    private action$: Actions,
    private postService: PostService,
  ) {}

  createPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.create),
      switchMap((action) =>
        this.postService.create(action.post).pipe(
          map(() => PostActions.createSuccess()),
          catchError((error) =>
            of(PostActions.createFailure({ createErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  updatePost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.update),
      switchMap((action) =>
        this.postService.update(action.post).pipe(
          map(() => PostActions.updateSuccess()),
          catchError((error) =>
            of(PostActions.updateFailure({ updateErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  deletePost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.deletePost),
      switchMap((action) =>
        this.postService.delete(action.id).pipe(
          map(() => PostActions.deletePostSuccess()),
          catchError((error) =>
            of(PostActions.deletePostFailure({ deleteErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  getAll$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getAll),
      switchMap((action) =>
        this.postService.getAll(action.page, action.size).pipe(
          map((postResponse) => PostActions.getAllSuccess({ postResponse })),
          catchError((error) =>
            of(PostActions.getAllFailure({ errorGetAllMessage: error })),
          ),
        ),
      ),
    ),
  );

  getOne$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getOne),
      switchMap((action) =>
        this.postService.getOne(action.id).pipe(
          map((postDetail) => PostActions.getOneSuccess({ postDetail })),
          catchError((error) =>
            of(PostActions.getOneFailure({ errorGetOneMessage: error })),
          ),
        ),
      ),
    ),
  );

  getWithUserId$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getWithUserId),
      switchMap((action) =>
        this.postService
          .getAllWithUserId(action.creatorId, action.page, action.size)
          .pipe(
            map((postResponse) =>
              PostActions.getWithUserIdSuccess({ postResponse }),
            ),
            catchError((error) =>
              of(
                PostActions.getWithUserIdFailure({
                  errorGetWithUserIdMessage: error,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  getMine$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getMine),
      switchMap((action) =>
        this.postService.getMine(action.page, action.size).pipe(
          map((minePost) => PostActions.getMineSuccess({ minePost })),
          catchError((error) =>
            of(PostActions.getMineFailure({ errorGetMineMessage: error })),
          ),
        ),
      ),
    ),
  );

  getByShare$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getByShare),
      switchMap((action) =>
        this.postService.getByShare(action.page, action.size).pipe(
          map((postResponse) =>
            PostActions.getByShareSuccess({ postResponse }),
          ),
          catchError((error) =>
            of(
              PostActions.getByShareFailure({ errorGetByShareMessage: error }),
            ),
          ),
        ),
      ),
    ),
  );

  getByMention$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.getByMention),
      switchMap((action) =>
        this.postService.getByMention(action.page, action.size).pipe(
          map((postResponse) =>
            PostActions.getByMentionSuccess({ postResponse }),
          ),
          catchError((error) =>
            of(
              PostActions.getByMentionFailure({
                errorGetByMentionMessage: error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  search$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.search),
      switchMap((action) =>
        this.postService.search(action.query).pipe(
          map((result) =>
            PostActions.searchSuccess({ postSearchResult: result.items }),
          ),
          catchError((error) =>
            of(PostActions.searchFailure({ errorSearchMessage: error })),
          ),
        ),
      ),
    ),
  );

  reaction$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.reaction),
      switchMap((action) =>
        this.postService.reaction(action.postId, action.senderId).pipe(
          map(() => PostActions.reactionSuccess()),
          catchError((error) =>
            of(PostActions.reactionFailure({ reactionErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  unReaction$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.unReaction),
      switchMap((action) =>
        this.postService.unReaction(action.postId, action.senderId).pipe(
          map(() => PostActions.unReactionSuccess()),
          catchError((error) =>
            of(
              PostActions.unReactionFailure({ unReactionErrorMessage: error }),
            ),
          ),
        ),
      ),
    ),
  );
}
