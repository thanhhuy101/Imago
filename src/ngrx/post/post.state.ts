import { PostModel, PostResponse } from '../../app/model/post.model';

export interface PostState {
  postList: PostModel[];
  list: PostResponse;
  Post: PostModel;
  isGetMineSucces: boolean;
  isGetsucces: boolean;
  isSucces: boolean;
  isCreateFailure: boolean;
  loading: boolean;
  error: string;
}
