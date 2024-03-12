export interface NotiModel {
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isFollow: boolean;
  isLike: boolean;
  isComment: boolean;
}

export interface FollowNotiModel {
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isFollow: boolean;
}

export interface LikeNotiModel {
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isLike: boolean;
}

export interface CommentNotiModel {
  id: string;
  createdAt: string;
  uid: string;
  postId: string;
  sender: string;
  isComment: boolean;
}
