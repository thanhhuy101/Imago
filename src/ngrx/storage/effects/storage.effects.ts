import { Injectable } from "@angular/core";
import * as StorageActions from '../actions/storage.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StorageService } from "../../../app/service/storage/storage.service";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { StorageModule } from "@angular/fire/storage";


@Injectable()
export class StorageEffects {
    constructor(private actions$: Actions, private storageService: StorageService) {}
 //how to when upload mutifile wait the first file uploadsucess and return the url of the file then upload the next file
 // wait the first file uploadsucess and return the url of the file then upload the next file
    upLoadFile$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(StorageActions.upLoadFile),
            switchMap((action) => {
                return this.storageService.uploadFile(action.file, action.fileName, action.idToken).pipe(
                    map((url) => {
                        return StorageActions.upLoadFileSuccess({ url });
                    }),
                    catchError((error: string) => {
                        return of(StorageActions.upLoadFileFailure({ upLoadFileErrorMessage: error }));
                    })
                )
            })
        )
    })

}