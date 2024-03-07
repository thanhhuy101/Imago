import { Injectable } from "@angular/core";
import * as StorageActions from '../actions/storage.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StorageService } from "../../../app/service/storage/storage.service";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { StorageModule } from "@angular/fire/storage";


@Injectable()
export class StorageEffects {
    constructor(private actions$: Actions, private storageService: StorageService) {}
   //upload array file if upload success return the url of the file how i can subscribe to this effect
    uploadFile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StorageActions.upLoadFile),
            switchMap((action) => {
                return this.storageService.uploadFile(action.file,action.fileName,action.idToken).pipe(
                    map((url) => {
                        console.log('url', url)
                        //get the url of the file after upload success
                        return StorageActions.upLoadFileSuccess({url})
                    }),
                    catchError((error) => {
                        return of(StorageActions.upLoadFileFailure({upLoadFileErrorMessage: error.message}))
                    })
                )
            })
        )
    })
     
        


}