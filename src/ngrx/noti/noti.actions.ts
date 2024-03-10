import { createAction, props } from '@ngrx/store';
import {
  CommentNotiModel,
  FollowNotiModel,
  LikeNotiModel,
  NotiModel,
} from '../../app/model/noti.model';

export const getNotifications = createAction('[Noti] Get Notifications');
export const getNotificationsSuccess = createAction(
  '[Noti] Get Notifications Success',
  props<{ notifications: NotiModel[] }>(),
);
export const getNotificationsFailure = createAction(
  '[Noti] Get Notifications Failure',
  props<{ error: string }>(),
);

export const getFollowNotifications = createAction(
  '[Noti] Get Follow Notifications',
);
export const getFollowNotificationsSuccess = createAction(
  '[Noti] Get Follow Notifications Success',
  props<{ followNotifications: FollowNotiModel[] }>(),
);
export const getFollowNotificationsFailure = createAction(
  '[Noti] Get Follow Notifications Failure',
  props<{ error: string }>(),
);

export const getLikeNotifications = createAction(
  '[Noti] Get Like Notifications',
);
export const getLikeNotificationsSuccess = createAction(
  '[Noti] Get Like Notifications Success',
  props<{ likeNotifications: LikeNotiModel[] }>(),
);
export const getLikeNotificationsFailure = createAction(
  '[Noti] Get Like Notifications Failure',
  props<{ error: string }>(),
);

export const getCommentNotifications = createAction(
  '[Noti] Get Comment Notifications',
);
export const getCommentNotificationsSuccess = createAction(
  '[Noti] Get Comment Notifications Success',
  props<{ commentNotifications: CommentNotiModel[] }>(),
);
export const getCommentNotificationsFailure = createAction(
  '[Noti] Get Comment Notifications Failure',
  props<{ error: string }>(),
);
