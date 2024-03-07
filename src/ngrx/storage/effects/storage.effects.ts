import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {StorageService} from "../../../app/service/storage/storage.service";
import {catchError, map, of, switchMap} from "rxjs";
import * as StorageActions from "../actions/storage.actions";
@Injectable()
export class StorageEffects {
  constructor(
    private actions$: Actions,
    private storageService: StorageService,
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StorageActions.create),
      switchMap((action) => {
        return this.storageService.create(
          action.file,
          action.fileName,
          action.idToken,
        );
      }),
      map(() => {
        return StorageActions.createSuccess()
      }),
      catchError((error) => {
        return of(StorageActions.createFailure({ createErrorMessage: error.message }));
      })
    )
  );
}
