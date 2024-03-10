import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../../app/service/profile/profile.service';
import * as ProfileActions from '../actions/profile.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProfileModel } from '../../../app/model/profile.model';

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
  getProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.getProfile),
      switchMap(() => {
        return this.profileService.getProfile().pipe(
          map((profile) => {
            return ProfileActions.getProfileSuccess({ profile });
          }),
          catchError((error) =>
            of(
              ProfileActions.getProfileFailure({
                getProfileErrorMessage: error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  //create profile
  createProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.createProfile),
      switchMap(({ profile }) => {
        console.log(profile);
        return this.profileService.createProfile(profile).pipe(
          map((createProfile) => {
            console.log(createProfile);
            return ProfileActions.createProfileSuccess({
              profile: createProfile,
            });
          }),
          catchError((error) =>
            of(
              ProfileActions.createProfileFailure({
                createProfileErrorMessage: error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  //update profile
  updateProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.updateProfile),
      switchMap(({ profile }) => {
        return this.profileService.updateProfile(profile).pipe(
          map(() => {
            return ProfileActions.updateProfileSuccess();
          }),
          catchError((error) =>
            of(
              ProfileActions.updateProfileFailure({
                updateProfileErrorMessage: error,
              }),
            ),
          ),
        );
      }),
    ),
  );
}
