import { PostModel, PostResponse } from '../../app/model/post.model';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export interface PostState {
  postResponse: PostResponse;
  postDetail: PostModel;

  isCreating: boolean;
  isCreateSuccess: boolean;
  createErrorMessage: HttpErrorResponseModel;

  isUpdating: boolean;
  isUpdateSuccess: boolean;
  updateErrorMessage: HttpErrorResponseModel;

  isDeleting: boolean;
  isDeleteSuccess: boolean;
  deleteErrorMessage: HttpErrorResponseModel;

  isGettingAll: boolean;
  errorGetAllMessage: HttpErrorResponseModel;

  isGettingMine: boolean;
  errorGetMineMessage: HttpErrorResponseModel;

  isGettingByShare: boolean;
  errorGetByShareMessage: HttpErrorResponseModel;

  isGettingByMention: boolean;
  errorGetByMentionMessage: HttpErrorResponseModel;

  isSearching: boolean;
  postSearchResult: PostModel[];
  errorSearchMessage: HttpErrorResponseModel;
}
