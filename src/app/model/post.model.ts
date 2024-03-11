import { CommentModel } from './comment.model';

export interface PostModel {
  // isLiked: boolean;
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// export interface Post{

// }
export interface PostResponse {
  data: PostModel[];
  endPage: number;
}
