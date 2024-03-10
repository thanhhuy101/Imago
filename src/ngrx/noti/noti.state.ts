import {
  CommentNotiModel,
  FollowNotiModel,
  LikeNotiModel,
  NotiModel,
} from '../../app/model/noti.model';

export interface NotiState {
  // noti
  notifications: NotiModel[];
  isGettingNotifications: boolean;
  getNotificationsSuccess: boolean;
  getNotificationsError: string;

  //follow noti
  followNotifications: FollowNotiModel[];
  isGettingFollowNotifications: boolean;
  getFollowNotificationsSuccess: boolean;
  getFollowNotificationsError: string;

  //like noti
  likeNotifications: LikeNotiModel[];
  isGettingLikeNotifications: boolean;
  getLikeNotificationsSuccess: boolean;
  getLikeNotificationsError: string;

  //comment noti
  commentNotifications: CommentNotiModel[];
  isGettingCommentNotifications: boolean;
  getCommentNotificationsSuccess: boolean;
  getCommentNotificationsError: string;
}
