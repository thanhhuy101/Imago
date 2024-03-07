import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../../app/service/profile/profile.service';
import * as ProfileActions from '../actions/profile.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ProfileEffect {
  constructor(
    private action$: Actions,
    private profileService: ProfileService,
  ) {}

  //get all profile
  getAllProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.getAllProfile),
      switchMap((action) => {
        return this.profileService.getAllProfiles(action.token).pipe(
          map((profileList: any) => {
            return ProfileActions.getAllProfileSuccess({ profileList });
          }),
          catchError((error) => {
            return of(
              ProfileActions.getAllProfileFailure({
                error,
              }),
            );
          }),
        );
      }),
    ),
  );

  //get profile
  getProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.getProfile),
      switchMap((action) => {
        return this.profileService.getProfile(action.token).pipe(
          map((profile: any) => {
            return ProfileActions.getProfileSuccess({ profile });
          }),
          catchError((error) => {
            return of(
              ProfileActions.getProfileFailure({
                getProfileErrorMessage: error,
              }),
            );
          }),
        );
      }),
    ),
  );

  //create profile
  createProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.createProfile),
      switchMap((action) => {
        return this.profileService.createProfile(action.token).pipe(
          map(() => {
            return ProfileActions.createProfileSuccess();
          }),
          catchError((error) => {
            return of(
              ProfileActions.createProfileFailure({
                createProfileErrorMessage: error,
              }),
            );
          }),
        );
      }),
    ),
  );

  //update profile
  updateProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.updateProfile),
      switchMap((action) => {
        return this.profileService.updateProfile(action.token).pipe(
          map(() => {
            return ProfileActions.updateProfileSuccess();
          }),
          catchError((error) => {
            return of(
              ProfileActions.updateProfileFailure({
                updateProfileErrorMessage: error,
              }),
            );
          }),
        );
      }),
    ),
  );
}
