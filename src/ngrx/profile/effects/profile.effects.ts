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
  // getAllProfile$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(ProfileActions.getAllProfile),
  //     switchMap(() => {
  //       return this.profileService.getAllProfiles().pipe(
  //         map((profileList: any) => {
  //           return ProfileActions.getAllProfileSuccess({ profileList });
  //         }),
  //         catchError((error) => {
  //           return of(
  //             ProfileActions.getAllProfileFailure({
  //               getAllProfilesErrorMessage: error,
  //             }),
  //           );
  //         }),
  //       );
  //     }),
  //   ),
  // );

  //get profile
  // getProfile$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(ProfileActions.getProfile),
  //     switchMap(() => {
  //       return this.profileService.getProfile().pipe(
  //         map((profile: any) => {
  //           return ProfileActions.getProfileSuccess({ profile });
  //         }),
  //         catchError((error) => {
  //           return of(
  //             ProfileActions.getProfileFailure({
  //               getProfileErrorMessage: error,
  //             }),
  //           );
  //         }),
  //       );
  //     }),
  //   ),
  // );

  //create profile
  createProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.createProfile),
      switchMap((action) => {
        console.log(action.profile);
        return this.profileService.createProfile(action.profile).pipe(
          map((profile) => {
            console.log(profile);
            return ProfileActions.createProfileSuccess({ profile: profile });
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
        return this.profileService.updateProfile(action.profile).pipe(
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
