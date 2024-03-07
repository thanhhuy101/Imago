import { PostModel } from '../../app/model/post.model';

export interface PostState {
  postList: PostModel[];
  Post: PostModel;
  isGetMineSucces: boolean;
  isSucces: boolean;
  loading: boolean;
  error: string;
}
