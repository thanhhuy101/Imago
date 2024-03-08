import {CategoryState} from "./category.state";
import {HttpErrorResponseModel} from "../../app/model/http-error-response.model";
import {createReducer, on} from "@ngrx/store";
import * as CategoryActions from "./category.actions";

const initialState: CategoryState = {
  isGettingCategory: false,
  getCategorySuccess: false,
  getCategoryError: <HttpErrorResponseModel>{},

  isGettingCategoryList: false,
  getCategoryListSuccess: false,
  getCategoryListError: <HttpErrorResponseModel>{},
}


export const categoryReducer = createReducer(
  initialState,

  // getCategory
  on(CategoryActions.getCategory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingCategory: true,
    };
  }),
  on(CategoryActions.getCategorySuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingCategory: false,
      getCategorySuccess: true,
    };
  }),
  on(
    CategoryActions.getCategoryFailure,
    (state, { error, type }) => {
      console.log(type);
      return {
        ...state,
        getCategoryError: error,
        isGettingCategory: false,
        getCategorySuccess: false,
      };
    },
  ),

  // getCategoryList
  on(CategoryActions.getCategoryList, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingCategoryList: true,
    };
  }),
  on(CategoryActions.getCategoryListSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingCategoryList: false,
      getCategoryListSuccess: true,
    };
  }),
  on(
    CategoryActions.getCategoryListFailure,
    (state, { error, type }) => {
      console.log(type);
      return {
        ...state,
        getCategoryListError: error,
        isGettingCategoryList: false,
        getCategoryListSuccess: false,
      };
    },
  ),
);
