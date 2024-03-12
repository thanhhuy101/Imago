import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../app/service/profile/profile.service';
import * as ProfileActions from './profile.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProfileModel } from '../../app/model/profile.model';

@Injectable()
export class ProfileEffect {
  constructor(
    private action$: Actions,
    private profileService: ProfileService,
  ) {}

  createMine$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.createMine),
      switchMap((action) =>
        this.profileService.createMine(action.profile).pipe(
          map(() => ProfileActions.createMineSuccess()),
          catchError((error) =>
            of(ProfileActions.createMineFailure({ createErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  updateMine$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.updateMine),
      switchMap((action) =>
        this.profileService.updateMine(action.profile).pipe(
          map(() => ProfileActions.updateMineSuccess()),
          catchError((error) =>
            of(ProfileActions.updateMineFailure({ updateErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  getMine$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.getMine),
      switchMap(() =>
        this.profileService.getMine().pipe(
          map((profile: ProfileModel) =>
            ProfileActions.getMineSuccess({ profile }),
          ),
          catchError((error) =>
            of(ProfileActions.getMineFailure({ getErrorMessage: error })),
          ),
        ),
      ),
    ),
  );

  getById$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.getById),
      switchMap((action) =>
        this.profileService.getById(action.id).pipe(
          map((profile: ProfileModel) =>
            ProfileActions.getByIdSuccess({ profile }),
          ),
          catchError((error) =>
            of(ProfileActions.getByIdFailure({ getErrorMessageById: error })),
          ),
        ),
      ),
    ),
  );
}
