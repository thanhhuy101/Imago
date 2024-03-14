import { CommentModel } from '../../app/model/comment.model';

export interface CommentState {
  // create comment
  isCreatingComment: boolean;
  createCommentSuccess: boolean;
  createCommentError: string;

  // get comments
  comments: CommentModel[];
  isGettingComments: boolean;
  getCommentsSuccess: boolean;
  getCommentsError: string;
}
