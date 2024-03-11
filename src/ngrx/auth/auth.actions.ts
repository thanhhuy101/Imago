import { createAction, props } from '@ngrx/store';
import {
  AuthCredentialModel,
  FirebaseDataModel,
} from '../../app/model/auth.model';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export const storeToken = createAction(
  '[Auth] Store Token',
  props<{ token: string }>(),
);

export const storeFirebaseData = createAction(
  '[Auth] Store Firebase Data',
  props<{ firebaseData: FirebaseDataModel }>(),
);

export const clearMessages = createAction('[Auth] Clear Message');

export const clearState = createAction('[Auth] Clear State');

export const signInWithGG = createAction('[Auth] Sign In With Google');
export const signInWithGGSuccess = createAction(
  '[Auth] Sign In With Google Success',
);
export const signInWithGGFailure = createAction(
  '[Auth] Sign In With Google Failure',
  props<{ signInWithGGErrorResponse: HttpErrorResponseModel }>(),
);

export const signOutWithGG = createAction('[Auth] Sign Out With Google');
export const signOutWithGGSuccess = createAction(
  '[Auth] Sign Out With Google Success',
);
export const signOutWithGGFailure = createAction(
  '[Auth] Sign Out With Google Failure',
  props<{ signOutWithGGErrorResponse: HttpErrorResponseModel }>(),
);

export const signUp = createAction('[Auth] Sign Up');
export const signUpSuccess = createAction('[Auth] Sign Up Success');
export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<{ signUpErrorResponse: HttpErrorResponseModel }>(),
);

export const getAuth = createAction('[Auth] Get Auth', props<{ id: string }>());
export const getAuthSuccess = createAction(
  '[Auth] Get Auth Success',
  props<{ authCredential: AuthCredentialModel }>(),
);
export const getAuthFailure = createAction(
  '[Auth] Get Auth Failure',
  props<{ getAuthErrorResponse: HttpErrorResponseModel }>(),
);
