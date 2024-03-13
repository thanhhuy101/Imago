export interface CommentModel {
  id: string;
  content: string;
  postId: string;
  authorId: string;
}

export interface CommentResponseModel {
  data: CommentModel[];
  endpage: number;
}
