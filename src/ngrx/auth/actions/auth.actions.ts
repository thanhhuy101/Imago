import { createAction, props } from '@ngrx/store';

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

export const signOutWithGG = createAction('[Auth] Sign Out With Google');
export const signOutWithGGSuccess = createAction(
  '[Auth] Sign Out With Google Success',
);
export const signOutWithGGFailure = createAction(
  '[Auth] Sign Out With Google Failure',
  props<{ signOutWithGGErrorMessage: string }>(),
);
