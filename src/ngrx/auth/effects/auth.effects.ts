import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../app/service/auth/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';

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
      catchError((error) => {
        return of(
          AuthActions.signInWithGGFailure({ signInWithGGErrorMessage: error }),
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
      catchError((error) => {
        return of(
          AuthActions.signOutWithGGFailure({
            signOutWithGGErrorMessage: error,
          }),
        );
      }),
    );
  });
}
