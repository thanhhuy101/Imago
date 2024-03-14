import { PostModel, PostResponse } from './../../app/model/post.model';
import * as PostActions from './post.actions';
import { createReducer, on } from '@ngrx/store';
import { PostState } from './post.state';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

const initialState: PostState = {
  isReaction: false,
  reactionSuccess: false,
  reactionErrorMessage: <HttpErrorResponseModel>{},

  postResponse: <PostResponse>{},
  postDetail: <PostModel>{},

  isCreating: false,
  isCreateSuccess: false,
  createErrorMessage: <HttpErrorResponseModel>{},

  isUpdating: false,
  isUpdateSuccess: false,
  updateErrorMessage: <HttpErrorResponseModel>{},

  isDeleting: false,
  isDeleteSuccess: false,
  deleteErrorMessage: <HttpErrorResponseModel>{},

  isGettingAll: false,
  errorGetAllMessage: <HttpErrorResponseModel>{},

  isGettingMine: false,
  errorGetMineMessage: <HttpErrorResponseModel>{},

  isGettingByShare: false,
  errorGetByShareMessage: <HttpErrorResponseModel>{},

  isGettingByMention: false,
  errorGetByMentionMessage: <HttpErrorResponseModel>{},

  isSearching: false,
  postSearchResult: [],
  errorSearchMessage: <HttpErrorResponseModel>{},
};

export const postReducer = createReducer(
  initialState,

  // Create
  on(PostActions.create, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
    };
  }),
  on(PostActions.createSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
    };
  }),
  on(PostActions.createFailure, (state, { createErrorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: false,
      createErrorMessage: createErrorMessage,
    };
  }),

  // Update
  on(PostActions.update, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: true,
    };
  }),
  on(PostActions.updateSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: true,
    };
  }),
  on(PostActions.updateFailure, (state, { updateErrorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: false,
      updateErrorMessage: updateErrorMessage,
    };
  }),

  // Delete
  on(PostActions.deletePost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isDeleting: true,
    };
  }),
  on(PostActions.deletePostSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isDeleting: false,
      isDeleteSuccess: true,
    };
  }),
  on(PostActions.deletePostFailure, (state, { deleteErrorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isDeleting: false,
      deleteErrorMessage: deleteErrorMessage,
    };
  }),

  // Get All
  on(PostActions.getAll, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingAll: true,
    };
  }),
  on(PostActions.getAllSuccess, (state, { postResponse, type }) => {
    console.log(type);
    return {
      ...state,
      isGettingAll: false,
      postResponse: postResponse,
    };
  }),
  on(PostActions.getAllFailure, (state, { errorGetAllMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isGettingAll: false,
      errorGetAllMessage: errorGetAllMessage,
    };
  }),

  // Get Mine
  on(PostActions.getMine, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingMine: true,
    };
  }),
  on(PostActions.getMineSuccess, (state, { postResponse, type }) => {
    console.log(type);
    return {
      ...state,
      isGettingMine: false,
      postResponse: postResponse,
    };
  }),
  on(PostActions.getMineFailure, (state, { errorGetMineMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isGettingMine: false,
      errorGetMineMessage: errorGetMineMessage,
    };
  }),

  // Get By Share
  on(PostActions.getByShare, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingByShare: true,
    };
  }),
  on(PostActions.getByShareSuccess, (state, { postResponse, type }) => {
    console.log(type);
    return {
      ...state,
      isGettingByShare: false,
      postResponse: postResponse,
    };
  }),
  on(
    PostActions.getByShareFailure,
    (state, { errorGetByShareMessage, type }) => {
      console.log(type);
      return {
        ...state,
        isGettingByShare: false,
        errorGetByShareMessage: errorGetByShareMessage,
      };
    },
  ),

  // Get By Mention
  on(PostActions.getByMention, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingByMention: true,
    };
  }),
  on(PostActions.getByMentionSuccess, (state, { postResponse, type }) => {
    console.log(type);
    return {
      ...state,
      isGettingByMention: false,
      postResponse: postResponse,
    };
  }),
  on(
    PostActions.getByMentionFailure,
    (state, { errorGetByMentionMessage, type }) => {
      console.log(type);
      return {
        ...state,
        isGettingByMention: false,
        errorGetByMentionMessage: errorGetByMentionMessage,
      };
    },
  ),

  // Clear
  on(PostActions.clearMessages, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      createErrorMessage: <HttpErrorResponseModel>{},
      updateErrorMessage: <HttpErrorResponseModel>{},
      deleteErrorMessage: <HttpErrorResponseModel>{},
      errorGetAllMessage: <HttpErrorResponseModel>{},
      errorGetMineMessage: <HttpErrorResponseModel>{},
      errorGetByShareMessage: <HttpErrorResponseModel>{},
      errorGetByMentionMessage: <HttpErrorResponseModel>{},
    };
  }),

  on(PostActions.clearCreateState, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreateSuccess: false,
      isCreating: false,
    };
  }),

  on(PostActions.clearUpdateState, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdateSuccess: false,
      isUpdating: false,
    };
  }),

  on(PostActions.clearDeleteState, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isDeleteSuccess: false,
      isDeleting: false,
    };
  }),

  on(PostActions.clearGetState, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      postResponse: <PostResponse>{},
      isGettingAll: false,
      isGettingMine: false,
      isGettingByShare: false,
      isGettingByMention: false,
    };
  }),

  //search
  on(PostActions.search, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSearching: true,
      postSearchResult: [],
    };
  }),
  on(PostActions.searchSuccess, (state, { postSearchResult, type }) => {
    console.log(type);
    return {
      ...state,
      isSearching: false,
      postSearchResult: postSearchResult,
    };
  }),
  on(PostActions.searchFailure, (state, { errorSearchMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isSearching: false,
      errorSearchMessage: errorSearchMessage,
    };
  }),

  on(PostActions.clearSearchState, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSearching: false,
      postSearchResult: [],
      errorSearchMessage: <HttpErrorResponseModel>{},
    };
  }),

  //reaction
  on(PostActions.reaction, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isReaction: true,
    };
  }),
  on(PostActions.reactionSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isReaction: false,
      reactionSuccess: true,
    };
  }),
  on(PostActions.reactionFailure, (state, { reactionErrorMessage, type }) => {
    console.log(type);
    return {
      ...state,
      isReaction: false,
      reactionErrorMessage: reactionErrorMessage,
    };
  }),
);
