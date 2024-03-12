import {
  CommentNotiModel,
  FollowNotiModel,
  LikeNotiModel,
  NotiModel,
} from '../../app/model/noti.model';

export interface NotiState {
  // noti
  isGettingNotifications: boolean;
  getNotificationsSuccess: NotiModel[];
  getNotificationsError: string;

  //follow noti
  isGettingFollowNotifications: boolean;
  getFollowNotificationsSuccess: FollowNotiModel[];
  getFollowNotificationsError: string;

  //like noti
  isGettingLikeNotifications: boolean;
  getLikeNotificationsSuccess: LikeNotiModel[];
  getLikeNotificationsError: string;

  //comment noti
  isGettingCommentNotifications: boolean;
  getCommentNotificationsSuccess: CommentNotiModel[];
  getCommentNotificationsError: string;

  //create notification
  isCreatingNotification: boolean;
  createNotificationSuccess: boolean;
  createNotificationError: string;
}
