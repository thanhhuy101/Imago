import {PostModel} from "../../app/model/post.model";

export interface PostState {
  postList: PostModel[];
  loading: boolean;
  error: string;
}

