import { PostModel, PostResponse } from '../../app/model/post.model';

export interface PostState {
  postList: PostModel[];
  list: PostResponse;
  Post: PostModel;
  isGetMineSucces: boolean;
  isSucces: boolean;
  loading: boolean;
  error: string;
}
