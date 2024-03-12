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
