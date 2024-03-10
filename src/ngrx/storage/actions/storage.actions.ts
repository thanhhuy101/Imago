import { createAction, props } from '@ngrx/store';

export const upLoadFile = createAction(
  '[Storage] Upload File',
  props<{ file: File; fileName: string; idToken: string }>(),
);

export const upLoadFileFailure = createAction(
  '[Storage] Upload File Failure',
  props<{ upLoadFileErrorMessage: string }>(),
);

// create success it return the url of the file
export const upLoadFileSuccess = createAction(
  '[Storage] Upload File Success',
  props<{ url: any }>(),
);

export const resetStorage = createAction('[Profile] Clear States');
