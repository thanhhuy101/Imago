import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommentService } from '../../app/service/comment/comment.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as CommentActions from './comment.actions';

@Injectable()
export class CommentEffect {
  constructor(
    private action$: Actions,
    private commentService: CommentService,
  ) {}

  createComment$ = createEffect(() => {
    return this.action$.pipe(
      ofType(CommentActions.createComment),
      switchMap((action) => {
        return this.commentService.createComment(action.comment).pipe(
          map(() => {
            return CommentActions.createCommentSuccess();
          }),
          catchError((error) => {
            return of(CommentActions.createCommentFailure({ error }));
          }),
        );
      }),
    );
  });

  getComments$ = createEffect(() => {
    return this.action$.pipe(
      ofType(CommentActions.getComments),
      switchMap((action) => {
        return this.commentService.getComments(action.postId, action.page).pipe(
          map((comments) => {
            return CommentActions.getCommentsSuccess({ comments });
          }),
          catchError((error) => {
            return of(CommentActions.getCommentsFailure({ error }));
          }),
        );
      }),
    );
  });
}
