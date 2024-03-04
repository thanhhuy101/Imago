import { AuthState } from '../state/auth.state';
import { AuthCredentialModel } from '../../../app/model/auth.model';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

const initialState: AuthState = {
  token: '',

  //google
  authCredential: <AuthCredentialModel>{},
  isSigningInWithGG: false,
  isSignInWithGGSuccess: false,
  signInWithGGErrorMessage: '',
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
    (state, { signInWithGGErrorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        signInWithGGErrorMessage: signInWithGGErrorMessage,
        isSigningInWithGG: false,
        isSignInWithGGSuccess: false,
      };
    },
  ),

  // storeToken
  on(AuthActions.storeToken, (state, { token }) => {
    return {
      ...state,
      token: token,
    };
  }),

  // clearMessages
  on(AuthActions.clearMessages, (state) => {
    return {
      ...state,
      signInWithGGErrorMessage: '',
    };
  }),

  // clearState
  on(AuthActions.clearState, (state) => {
    return {
      ...state,
      token: '',
      authCredential: <AuthCredentialModel>{},
      isSigningInWithGG: false,
      isSignInWithGGSuccess: false,
      signInWithGGErrorMessage: '',
    };
  }),
);
