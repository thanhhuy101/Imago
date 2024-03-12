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

  createNotification$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotiActions.createNotification),
      switchMap(({ notification }) =>
        this.notiService.createNotification(notification).pipe(
          map(() => NotiActions.createNotificationSuccess()),
          catchError((error) =>
            of(NotiActions.createNotificationFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getNotifications$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotiActions.getNotifications),
      switchMap(({ uid }) =>
        this.notiService.getNotifications(uid).pipe(
          map((notifications) =>
            NotiActions.getNotificationsSuccess({ notifications }),
          ),
          catchError((error) =>
            of(NotiActions.getNotificationsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getFollowNotifications$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotiActions.getFollowNotifications),
      switchMap(({ uid }) =>
        this.notiService.getFollowNotifications(uid).pipe(
          map((followNotifications) =>
            NotiActions.getFollowNotificationsSuccess({ followNotifications }),
          ),
          catchError((error) =>
            of(NotiActions.getFollowNotificationsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getLikeNotifications$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotiActions.getLikeNotifications),
      switchMap(({ uid }) =>
        this.notiService.getLikeNotifications(uid).pipe(
          map((likeNotifications) =>
            NotiActions.getLikeNotificationsSuccess({ likeNotifications }),
          ),
          catchError((error) =>
            of(NotiActions.getLikeNotificationsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getCommentNotifications$ = createEffect(() =>
    this.action$.pipe(
      ofType(NotiActions.getCommentNotifications),
      switchMap(({ uid }) =>
        this.notiService.getCommentNotifications(uid).pipe(
          map((commentNotifications) =>
            NotiActions.getCommentNotificationsSuccess({
              commentNotifications,
            }),
          ),
          catchError((error) =>
            of(NotiActions.getCommentNotificationsFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
