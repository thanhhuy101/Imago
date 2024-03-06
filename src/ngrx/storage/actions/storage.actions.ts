import { createAction, props } from "@ngrx/store";


export const upLoadFile = createAction(
    '[Storage] Upload File',
    props<{ file: File, fileName:string, idToken:string }>(),
    );

export const upLoadFileFailure = createAction(
    '[Storage] Upload File Failure',
    props<{ upLoadFileErrorMessage: string }>(),
);

export const upLoadFileSuccess = createAction(
    '[Storage] Upload File Success',
);