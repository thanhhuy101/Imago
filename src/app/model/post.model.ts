import { CommentModel } from './comment.model';

export interface PostModel {
  id: string;
  creatorId: string;
  share: string[];
  photoUrl: string[];
  content: string;
  hashtag: string[];
  cateId: string[];
  reaction: string[];
  comments: CommentModel[];
  mention: string[];
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt: DateTime;
}

export interface DateTime {
  _seconds: number;
  _nanoseconds: number;
}

export interface PostResponse {
  data: PostModel[];
  endPage: number;
}
