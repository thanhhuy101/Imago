import {
  CommentModel,
  CommentResponseModel,
} from '../../app/model/comment.model';

export interface CommentState {
  // create comment
  isCreatingComment: boolean;
  createCommentSuccess: boolean;
  createCommentError: string;

  // get comments
  comments: CommentResponseModel[];
  isGettingComments: boolean;
  getCommentsSuccess: boolean;
  getCommentsError: string;
}
