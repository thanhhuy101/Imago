import { Injectable } from "@angular/core";
import * as StorageActions from '../actions/storage.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StorageService } from "../../../app/service/storage/storage.service";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';


@Injectable()
export class StorageEffects {
    constructor(private actions$: Actions, private storageService: StorageService) {}
   //upload array file
    uploadFile$ = createEffect(() => this.actions$.pipe(
        ofType(StorageActions.upLoadFile),
        switchMap((action) => {
            return this.storageService.uploadFile(action.file, action.fileName, action.idToken).pipe(
                map(() => StorageActions.upLoadFileSuccess()),
                catchError((error) => of(StorageActions.upLoadFileFailure({ upLoadFileErrorMessage: error.message })))
            )
        })
    ))
     
        


}