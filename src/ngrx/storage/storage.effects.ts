import { Injectable } from '@angular/core';
import * as StorageActions from './storage.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StorageService } from '../../app/service/storage/storage.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

@Injectable()
export class StorageEffects {
  constructor(
    private actions$: Actions,
    private storageService: StorageService,
  ) {}

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StorageActions.uploadFile),
      mergeMap((action) =>
        this.storageService.uploadFile(action.file, action.fileName).pipe(
          map((url) => StorageActions.uploadFileSuccess({ url })),
          catchError((error: HttpErrorResponseModel) =>
            of(
              StorageActions.uploadFileFailure({
                uploadFileErrorMessage: error,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
