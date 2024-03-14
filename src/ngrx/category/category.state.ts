import {HttpErrorResponseModel} from "../../app/model/http-error-response.model";
import {CategoryModel} from "../../app/model/category.model";

export interface CategoryState{
  // category
  category: CategoryModel;
  isGettingCategory: boolean;
  getCategorySuccess: boolean;
  getCategoryError: HttpErrorResponseModel;

  //category list
  categories: CategoryModel[];
  isGettingCategoryList: boolean;
  getCategoryListSuccess: boolean;
  getCategoryListError: HttpErrorResponseModel;

  //all category list
  allCategories: CategoryModel[];
  isGettingAllCategoryList: boolean;
  getAllCategoryListSuccess: boolean;
  getAllCategoryListError: HttpErrorResponseModel;
}
