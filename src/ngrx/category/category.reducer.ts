import { CategoryState } from './category.state';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';
import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { CategoryModel } from '../../app/model/category.model';

const initialState: CategoryState = {
  category: {} as CategoryModel,
  isGettingCategory: false,
  getCategorySuccess: false,
  getCategoryError: <HttpErrorResponseModel>{},

  categories: [] as CategoryModel[],
  isGettingCategoryList: false,
  getCategoryListSuccess: false,
  getCategoryListError: <HttpErrorResponseModel>{},

  allCategories: [] as CategoryModel[],
  isGettingAllCategoryList: false,
  getAllCategoryListSuccess: false,
  getAllCategoryListError: <HttpErrorResponseModel>{},
};

export const categoryReducer = createReducer(
  initialState,

  // get category
  on(CategoryActions.getCategory, (state) => {
    return {
      ...state,
      isGettingCategory: true,
      getCategorySuccess: false,
      getCategoryError: <HttpErrorResponseModel>{},
    };
  }),
  on(CategoryActions.getCategorySuccess, (state, { category }) => {
    return {
      ...state,
      category: category,
      isGettingCategory: false,
      getCategorySuccess: true,
      getCategoryError: <HttpErrorResponseModel>{},
    };
  }),
  on(CategoryActions.getCategoryFailure, (state, { error }) => {
    return {
      ...state,
      isGettingCategory: false,
      getCategorySuccess: false,
      getCategoryError: error,
    };
  }),

  // get category list
  on(CategoryActions.getCategoryList, (state, { type }) => {
    return {
      ...state,
      isGettingCategoryList: true,
      getCategoryListSuccess: false,
      getCategoryListError: <HttpErrorResponseModel>{},
    };
  }),
  on(
    CategoryActions.getCategoryListSuccess,
    (state, { type, categoryList }) => {
      return {
        ...state,
        categories: categoryList,
        isGettingCategoryList: false,
        getCategoryListSuccess: true,
        getCategoryListError: <HttpErrorResponseModel>{},
      };
    },
  ),
  on(CategoryActions.getCategoryListFailure, (state, { type, error }) => {
    console.log(type);
    return {
      ...state,
      isGettingCategoryList: false,
      getCategoryListSuccess: false,
      getCategoryListError: error,
    };
  }),

  //getallcategories
  on(CategoryActions.getAllCategoryList, (state) => {
    return {
      ...state,
      isGettingAllCategoryList: true,
      getAllCategoryListSuccess: false,
      getAllCategoryListError: <HttpErrorResponseModel>{},
    };
  }),

  on(CategoryActions.getAllSuccess, (state, { categoriesAll }) => {
    return {
      ...state,
      allCategories: categoriesAll,
      isGettingAllCategoryList: false,
      getAllCategoryListSuccess: true,
      getAllCategoryListError: <HttpErrorResponseModel>{},
    };
  }),

  on(CategoryActions.getAllFailure, (state, { error }) => {
    return {
      ...state,
      isGettingAllCategoryList: false,
      getAllCategoryListSuccess: false,
      getAllCategoryListError: error,
    };
  }),

  // upload user category
  on(CategoryActions.uploadUserCategory, (state) => {
    return {
      ...state,
    };
  }),
  on(CategoryActions.uploadUserCategorySuccess, (state) => {
    return {
      ...state,
    };
  }),
  on(CategoryActions.uploadUserCategoryFailure, (state, { error }) => {
    return {
      ...state,
    };
  }),

  // clear state
  on(CategoryActions.clearState, (state) => {
    return {
      ...state,
      category: {} as CategoryModel,
      isGettingCategory: false,
      getCategorySuccess: false,
      getCategoryError: <HttpErrorResponseModel>{},

      categories: [] as CategoryModel[],
      isGettingCategoryList: false,
      getCategoryListSuccess: false,
      getCategoryListError: <HttpErrorResponseModel>{},

      allCategories: [] as CategoryModel[],
      isGettingAllCategoryList: false,
      getAllCategoryListSuccess: false,
      getAllCategoryListError: <HttpErrorResponseModel>{},
    };
  }),

  on(CategoryActions.clearError, (state) => {
    return {
      ...state,
      getCategoryError: <HttpErrorResponseModel>{},
      getCategoryListError: <HttpErrorResponseModel>{},
      getAllCategoryListError: <HttpErrorResponseModel>{},
    };
  }),
  on(CategoryActions.clearCategory, (state) => {
    return {
      ...state,
      category: {} as CategoryModel,
    };
  }),

  on(CategoryActions.clearCategoryList, (state) => {
    return {
      ...state,
      categories: [] as CategoryModel[],
    };
  }),

  on(CategoryActions.clearAllCategoryList, (state) => {
    return {
      ...state,
      allCategories: [] as CategoryModel[],
    };
  }),

  on(CategoryActions.clearUploadUserCategory, (state) => {
    return {
      ...state,
    };
  }),

  on(CategoryActions.clearAll, (state) => {
    return {
      ...state,
      category: {} as CategoryModel,
      isGettingCategory: false,
      getCategorySuccess: false,
      getCategoryError: <HttpErrorResponseModel>{},

      categories: [] as CategoryModel[],
      isGettingCategoryList: false,
      getCategoryListSuccess: false,
      getCategoryListError: <HttpErrorResponseModel>{},

      allCategories: [] as CategoryModel[],
      isGettingAllCategoryList: false,
      getAllCategoryListSuccess: false,
      getAllCategoryListError: <HttpErrorResponseModel>{},
    };
  }),
);
