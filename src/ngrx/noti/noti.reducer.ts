import { createReducer, on } from '@ngrx/store';
import * as NotiActions from './noti.actions';
import { NotiState } from './noti.state';
import {
  CommentNotiModel,
  FollowNotiModel,
  LikeNotiModel,
  NotiModel,
} from '../../app/model/noti.model';

const initialState: NotiState = {
  // noti
  isGettingNotifications: false,
  getNotificationsSuccess: [] as NotiModel[],
  getNotificationsError: '',

  // follow noti
  isGettingFollowNotifications: false,
  getFollowNotificationsSuccess: [] as FollowNotiModel[],
  getFollowNotificationsError: '',

  // like noti
  isGettingLikeNotifications: false,
  getLikeNotificationsSuccess: [] as LikeNotiModel[],
  getLikeNotificationsError: '',

  // comment noti
  isGettingCommentNotifications: false,
  getCommentNotificationsSuccess: [] as CommentNotiModel[],
  getCommentNotificationsError: '',

  // create notification
  isCreatingNotification: false,
  createNotificationSuccess: false,
  createNotificationError: '',
};

export const notiReducer = createReducer(
  initialState,

  // get notifications
  on(NotiActions.getNotifications, (state) => ({
    ...state,
    isGettingNotifications: true,
    getNotificationsSuccess: [],
    getNotificationsError: '',
  })),
  on(NotiActions.getNotificationsSuccess, (state, { notifications }) => ({
    ...state,
    isGettingNotifications: false,
    getNotificationsSuccess: notifications,
  })),
  on(NotiActions.getNotificationsFailure, (state, { error }) => ({
    ...state,
    isGettingNotifications: false,
    getNotificationsError: error,
  })),

  // get follow notifications
  on(NotiActions.getFollowNotifications, (state) => ({
    ...state,
    isGettingFollowNotifications: true,
    getFollowNotificationsSuccess: [],
    getFollowNotificationsError: '',
  })),
  on(
    NotiActions.getFollowNotificationsSuccess,
    (state, { followNotifications }) => ({
      ...state,
      isGettingFollowNotifications: false,
      getFollowNotificationsSuccess: followNotifications,
    }),
  ),
  on(NotiActions.getFollowNotificationsFailure, (state, { error }) => ({
    ...state,
    isGettingFollowNotifications: false,
    getFollowNotificationsError: error,
  })),

  // get like notifications
  on(NotiActions.getLikeNotifications, (state) => ({
    ...state,
    isGettingLikeNotifications: true,
    getLikeNotificationsSuccess: [],
    getLikeNotificationsError: '',
  })),
  on(
    NotiActions.getLikeNotificationsSuccess,
    (state, { likeNotifications }) => ({
      ...state,
      isGettingLikeNotifications: false,
      getLikeNotificationsSuccess: likeNotifications,
    }),
  ),
  on(NotiActions.getLikeNotificationsFailure, (state, { error }) => ({
    ...state,
    isGettingLikeNotifications: false,
    getLikeNotificationsError: error,
  })),

  // get comment notifications
  on(NotiActions.getCommentNotifications, (state) => ({
    ...state,
    isGettingCommentNotifications: true,
    getCommentNotificationsSuccess: [],
    getCommentNotificationsError: '',
  })),
  on(
    NotiActions.getCommentNotificationsSuccess,
    (state, { commentNotifications }) => ({
      ...state,
      isGettingCommentNotifications: false,
      getCommentNotificationsSuccess: commentNotifications,
    }),
  ),
  on(NotiActions.getCommentNotificationsFailure, (state, { error }) => ({
    ...state,
    isGettingCommentNotifications: false,
    getCommentNotificationsError: error,
  })),

  // create notification
  on(NotiActions.createNotification, (state) => ({
    ...state,
    isCreatingNotification: true,
    createNotificationSuccess: false,
    createNotificationError: '',
  })),
  on(NotiActions.createNotificationSuccess, (state) => ({
    ...state,
    isCreatingNotification: false,
    createNotificationSuccess: true,
  })),
  on(NotiActions.createNotificationFailure, (state, { error }) => ({
    ...state,
    isCreatingNotification: false,
    createNotificationError: error,
  })),
);
