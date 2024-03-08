import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../app/service/auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';
import { AuthCredentialModel } from '../../app/model/auth.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

  signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGG),
      switchMap(() => {
        return this.authService.signInWithGoogle();
      }),
      map(() => {
        return AuthActions.signInWithGGSuccess();
      }),
      catchError((error: HttpErrorResponseModel) => {
        return of(
          AuthActions.signInWithGGFailure({ signInWithGGErrorResponse: error }),
        );
      }),
    );
  });

  signOutWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOutWithGG),
      switchMap(() => {
        return this.authService.signOut();
      }),
      map(() => {
        return AuthActions.signOutWithGGSuccess();
      }),
      catchError((error: HttpErrorResponseModel) => {
        return of(
          AuthActions.signOutWithGGFailure({
            signOutWithGGErrorResponse: error,
          }),
        );
      }),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(() => {
        return this.authService.signUp();
      }),
      map(() => {
        return AuthActions.signUpSuccess();
      }),
      catchError((error: HttpErrorResponseModel) => {
        return of(AuthActions.signUpFailure({ signUpErrorResponse: error }));
      }),
    );
  });

  getAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getAuth),
      switchMap((action) => {
        return this.authService.getById(action.id);
      }),
      map((authCredential: AuthCredentialModel) => {
        return AuthActions.getAuthSuccess({ authCredential });
      }),
      catchError((error: HttpErrorResponseModel) => {
        return of(AuthActions.getAuthFailure({ getAuthErrorResponse: error }));
      }),
    );
  });
}
