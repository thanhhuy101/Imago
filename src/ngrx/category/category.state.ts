import {HttpErrorResponseModel} from "../../app/model/http-error-response.model";

export interface CategoryState{
  // category
  isGettingCategory: boolean;
  getCategorySuccess: boolean;
  getCategoryError: HttpErrorResponseModel;

  //category list
  isGettingCategoryList: boolean;
  getCategoryListSuccess: boolean;
  getCategoryListError: HttpErrorResponseModel;
}
