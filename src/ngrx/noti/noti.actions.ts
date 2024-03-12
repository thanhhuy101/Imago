import { createAction, props } from '@ngrx/store';
import {
  CommentNotiModel,
  FollowNotiModel,
  LikeNotiModel,
  NotiModel,
} from '../../app/model/noti.model';

export const createNotification = createAction(
  '[Noti] Create Notification',
  props<{ notification: NotiModel }>(),
);
export const createNotificationSuccess = createAction(
  '[Noti] Create Notification Success',
);
export const createNotificationFailure = createAction(
  '[Noti] Create Notification Failure',
  props<{ error: string }>(),
);

export const getNotifications = createAction(
  '[Noti] Get Notifications',
  props<{ uid: string }>(),
);
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
  props<{ uid: string }>(),
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
  props<{ uid: string }>(),
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
  props<{ uid: string }>(),
);
export const getCommentNotificationsSuccess = createAction(
  '[Noti] Get Comment Notifications Success',
  props<{ commentNotifications: CommentNotiModel[] }>(),
);
export const getCommentNotificationsFailure = createAction(
  '[Noti] Get Comment Notifications Failure',
  props<{ error: string }>(),
);
