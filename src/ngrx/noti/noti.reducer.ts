import { createReducer, on } from '@ngrx/store';
import * as NotiActions from './noti.actions';
import { NotiState } from './noti.state';

const initialState: NotiState = {
  // noti
  notifications: [],
  isGettingNotifications: false,
  getNotificationsSuccess: false,
  getNotificationsError: '',

  //follow noti
  followNotifications: [],
  isGettingFollowNotifications: false,
  getFollowNotificationsSuccess: false,
  getFollowNotificationsError: '',

  //like noti
  likeNotifications: [],
  isGettingLikeNotifications: false,
  getLikeNotificationsSuccess: false,
  getLikeNotificationsError: '',

  //comment noti
  commentNotifications: [],
  isGettingCommentNotifications: false,
  getCommentNotificationsSuccess: false,
  getCommentNotificationsError: '',
};

export const notiReducer = createReducer(
  initialState,

  // create notification
  on(NotiActions.createNotification, (state) => {
    return {
      ...state,
      isCreatingNotification: true,
      createNotificationSuccess: false,
      createNotificationError: '',
    };
  }),
  on(NotiActions.createNotificationSuccess, (state) => {
    return {
      ...state,
      isCreatingNotification: false,
      createNotificationSuccess: true,
      createNotificationError: '',
    };
  }),
  on(NotiActions.createNotificationFailure, (state, { error }) => {
    return {
      ...state,
      isCreatingNotification: false,
      createNotificationSuccess: false,
      createNotificationError: error,
    };
  }),

  // get notifications
  on(NotiActions.getNotifications, (state) => {
    return {
      ...state,
      isGettingNotifications: true,
      getNotificationsSuccess: false,
      getNotificationsError: '',
    };
  }),
  on(NotiActions.getNotificationsSuccess, (state, { notifications }) => {
    return {
      ...state,
      notifications: notifications,
      isGettingNotifications: false,
      getNotificationsSuccess: true,
      getNotificationsError: '',
    };
  }),
  on(NotiActions.getNotificationsFailure, (state, { error }) => {
    return {
      ...state,
      isGettingNotifications: false,
      getNotificationsSuccess: false,
      getNotificationsError: error,
    };
  }),

  // get follow notifications
  on(NotiActions.getFollowNotifications, (state) => {
    return {
      ...state,
      isGettingFollowNotifications: true,
      getFollowNotificationsSuccess: false,
      getFollowNotificationsError: '',
    };
  }),
  on(
    NotiActions.getFollowNotificationsSuccess,
    (state, { followNotifications }) => {
      return {
        ...state,
        followNotifications: followNotifications,
        isGettingFollowNotifications: false,
        getFollowNotificationsSuccess: true,
        getFollowNotificationsError: '',
      };
    },
  ),
  on(NotiActions.getFollowNotificationsFailure, (state, { error }) => {
    return {
      ...state,
      isGettingFollowNotifications: false,
      getFollowNotificationsSuccess: false,
      getFollowNotificationsError: error,
    };
  }),

  // get like notifications
  on(NotiActions.getLikeNotifications, (state) => {
    return {
      ...state,
      isGettingLikeNotifications: true,
      getLikeNotificationsSuccess: false,
      getLikeNotificationsError: '',
    };
  }),
  on(
    NotiActions.getLikeNotificationsSuccess,
    (state, { likeNotifications }) => {
      return {
        ...state,
        likeNotifications: likeNotifications,
        isGettingLikeNotifications: false,
        getLikeNotificationsSuccess: true,
        getLikeNotificationsError: '',
      };
    },
  ),
  on(NotiActions.getLikeNotificationsFailure, (state, { error }) => {
    return {
      ...state,
      isGettingLikeNotifications: false,
      getLikeNotificationsSuccess: false,
      getLikeNotificationsError: error,
    };
  }),
);
