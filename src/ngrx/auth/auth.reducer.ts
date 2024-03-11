import { AuthState } from './auth.state';
import {
  AuthCredentialModel,
  FirebaseDataModel,
} from '../../app/model/auth.model';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

const initialState: AuthState = {
  token: '',
  firebaseData: <FirebaseDataModel>{},

  //google
  isSigningInWithGG: false,
  isSignInWithGGSuccess: false,
  signInWithGGErrorResponse: <HttpErrorResponseModel>{},

  isSigningOutWithGG: false,
  isSignOutWithGGSuccess: false,
  signOutWithGGErrorResponse: <HttpErrorResponseModel>{},

  //user
  authCredential: <AuthCredentialModel>{},
  isSignUp: false,
  isSignUpSuccess: false,
  signUpErrorResponse: <HttpErrorResponseModel>{},

  isGettingAuth: false,
  getAuthErrorResponse: <HttpErrorResponseModel>{},
};

export const authReducer = createReducer(
  initialState,

  // signInWithGG
  on(AuthActions.signInWithGG, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSigningInWithGG: true,
    };
  }),
  on(AuthActions.signInWithGGSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSigningInWithGG: false,
      isSignInWithGGSuccess: true,
    };
  }),
  on(
    AuthActions.signInWithGGFailure,
    (state, { signInWithGGErrorResponse, type }) => {
      console.log(type);
      return {
        ...state,
        signInWithGGErrorResponse: signInWithGGErrorResponse,
        isSigningInWithGG: false,
        isSignInWithGGSuccess: false,
      };
    },
  ),

  // signOutWithGG
  on(AuthActions.signOutWithGG, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSigningOutWithGG: true,
    };
  }),
  on(AuthActions.signOutWithGGSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSigningOutWithGG: false,
      isSignOutWithGGSuccess: true,
    };
  }),
  on(
    AuthActions.signOutWithGGFailure,
    (state, { signOutWithGGErrorResponse, type }) => {
      console.log(type);
      return {
        ...state,
        signOutWithGGErrorResponse: signOutWithGGErrorResponse,
        isSigningOutWithGG: false,
        isSignOutWithGGSuccess: false,
      };
    },
  ),

  // signUp
  on(AuthActions.signUp, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSignUp: true,
    };
  }),
  on(AuthActions.signUpSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isSignUp: false,
      isSignUpSuccess: true,
    };
  }),
  on(AuthActions.signUpFailure, (state, { signUpErrorResponse, type }) => {
    console.log(type);
    return {
      ...state,
      signUpErrorResponse: signUpErrorResponse,
      isSignUp: false,
      isSignUpSuccess: false,
    };
  }),

  // getAuth
  on(AuthActions.getAuth, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingAuth: true,
    };
  }),
  on(AuthActions.getAuthSuccess, (state, { authCredential, type }) => {
    console.log(type);
    return {
      ...state,
      authCredential: authCredential,
      isGettingAuth: false,
    };
  }),
  on(AuthActions.getAuthFailure, (state, { getAuthErrorResponse, type }) => {
    console.log(type);
    return {
      ...state,
      authCredential: <AuthCredentialModel>{},
      getAuthErrorResponse: getAuthErrorResponse,
      isGettingAuth: false,
    };
  }),

  // storeToken
  on(AuthActions.storeToken, (state, { token }) => {
    return {
      ...state,
      token: token,
    };
  }),

  // storeFirebaseData
  on(AuthActions.storeFirebaseData, (state, { firebaseData }) => {
    return {
      ...state,
      firebaseData: firebaseData,
    };
  }),

  // clearMessages
  on(AuthActions.clearMessages, (state) => {
    return {
      ...state,
      signInWithGGErrorResponse: <HttpErrorResponseModel>{},
      signUpErrorResponse: <HttpErrorResponseModel>{},
      getAuthErrorResponse: <HttpErrorResponseModel>{},
    };
  }),

  // clearState
  on(AuthActions.clearState, (state) => {
    return {
      ...state,
      token: '',

      isSigningInWithGG: false,
      isSignInWithGGSuccess: false,
      signInWithGGErrorResponse: <HttpErrorResponseModel>{},

      authCredential: <AuthCredentialModel>{},

      isSignUp: false,
      isSignUpSuccess: false,
      signUpErrorResponse: <HttpErrorResponseModel>{},

      isGettingAuth: false,
      getAuthErrorResponse: <HttpErrorResponseModel>{},
    };
  }),
);
