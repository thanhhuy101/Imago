import { createAction, props } from '@ngrx/store';
import { AuthCredentialModel } from '../../../app/model/auth.model';

export const storeToken = createAction(
  '[Auth] Store Token',
  props<{ token: string }>(),
);

export const clearMessages = createAction('[Auth] Clear Message');

export const clearState = createAction('[Auth] Clear State');

export const signInWithGG = createAction('[Auth] Sign In With Google');
export const signInWithGGSuccess = createAction(
  '[Auth] Sign In With Google Success',
);
export const signInWithGGFailure = createAction(
  '[Auth] Sign In With Google Failure',
  props<{ signInWithGGErrorMessage: string }>(),
);
