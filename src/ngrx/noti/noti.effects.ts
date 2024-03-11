import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotiService } from '../../app/service/noti/noti.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as NotiActions from './noti.actions';

@Injectable()
export class NotiEffect {
  constructor(
    private action$: Actions,
    private notiService: NotiService,
  ) {}

  getNotifications$ = createEffect(() => {
    return this.action$.pipe(
      ofType(NotiActions.getNotifications),
      switchMap(() => {
        return this.notiService.getNotifications().pipe(
          map((response) => {
            return NotiActions.getNotificationsSuccess({
              notifications: response,
            });
          }),
          catchError((error) => {
            return of(NotiActions.getNotificationsFailure({ error }));
          }),
        );
      }),
    );
  });

  getFollowNotifications$ = createEffect(() => {
    return this.action$.pipe(
      ofType(NotiActions.getFollowNotifications),
      switchMap(() => {
        return this.notiService.getFollowNotifications().pipe(
          map((response) => {
            return NotiActions.getFollowNotificationsSuccess({
              followNotifications: response,
            });
          }),
          catchError((error) => {
            return of(NotiActions.getFollowNotificationsFailure({ error }));
          }),
        );
      }),
    );
  });

  getLikeNotifications$ = createEffect(() => {
    return this.action$.pipe(
      ofType(NotiActions.getLikeNotifications),
      switchMap(() => {
        return this.notiService.getLikeNotifications().pipe(
          map((response) => {
            return NotiActions.getLikeNotificationsSuccess({
              likeNotifications: response,
            });
          }),
          catchError((error) => {
            return of(NotiActions.getLikeNotificationsFailure({ error }));
          }),
        );
      }),
    );
  });

  getCommentNotifications$ = createEffect(() => {
    return this.action$.pipe(
      ofType(NotiActions.getCommentNotifications),
      switchMap(() => {
        return this.notiService.getCommentNotifications().pipe(
          map((response) => {
            return NotiActions.getCommentNotificationsSuccess({
              commentNotifications: response,
            });
          }),
          catchError((error) => {
            return of(NotiActions.getCommentNotificationsFailure({ error }));
          }),
        );
      }),
    );
  });
}
