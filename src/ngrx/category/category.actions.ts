import { createAction, props } from '@ngrx/store';
import { CategoryModel } from '../../app/model/category.model';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export const getCategory = createAction('[Category] Get Category');
export const getCategorySuccess = createAction(
  '[Category] Get Category Success',
  props<{ category: CategoryModel }>(),
);
export const getCategoryFailure = createAction(
  '[Category] Get Category Failure',
  props<{ error: HttpErrorResponseModel }>(),
);

export const getCategoryList = createAction(
  '[Category] Get Category List',
  props<{ page: number }>(),
);
export const getCategoryListSuccess = createAction(
  '[Category] Get Category List Success',
  props<{ categoryList: CategoryModel[] }>(),
);
export const getCategoryListFailure = createAction(
  '[Category] Get Category List Failure',
  props<{ error: HttpErrorResponseModel }>(),
);
export const getAllCategoryList = createAction(
  '[Category] Get All Category List',
);
export const getAllSuccess = createAction(
  '[Category] Get All Success',
  props<{ categoriesAll: CategoryModel[] }>(),
);
export const getAllFailure = createAction(
  '[Category] Get All Failure',
  props<{ error: HttpErrorResponseModel }>(),
);

export const uploadUserCategory = createAction(
  '[Category] Upload User Category',
  props<{ category: CategoryModel }>(),
);
export const uploadUserCategorySuccess = createAction(
  '[Category] Upload User Category Success',
);
export const uploadUserCategoryFailure = createAction(
  '[Category] Upload User Category Failure',
  props<{ error: HttpErrorResponseModel }>(),
);

// clear state
export const clearState = createAction('[Category] Clear State');
export const clearError = createAction('[Category] Clear Error');
export const clearCategory = createAction('[Category] Clear Category');
export const clearCategoryList = createAction('[Category] Clear Category List');
export const clearAllCategoryList = createAction(
  '[Category] Clear All Category List',
);
export const clearUploadUserCategory = createAction(
  '[Category] Clear Upload User Category',
);
export const clearAll = createAction('[Category] Clear All');
export const clearAllSuccess = createAction('[Category] Clear All Success');
export const clearAllFailure = createAction('[Category] Clear All Failure');
export const clearUploadUserCategorySuccess = createAction(
  '[Category] Clear Upload User Category Success',
);
export const clearUploadUserCategoryFailure = createAction(
  '[Category] Clear Upload User Category Failure',
);
