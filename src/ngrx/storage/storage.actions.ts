import { createAction, props } from '@ngrx/store';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export const uploadFile = createAction(
  '[Storage] Upload File',
  props<{ file: File; fileName: string }>(),
);

export const uploadFileFailure = createAction(
  '[Storage] Upload File Failure',
  props<{ uploadFileErrorMessage: HttpErrorResponseModel }>(),
);

export const uploadFileSuccess = createAction(
  '[Storage] Upload File Success',
  props<{ url: string[] }>(),
);

export const resetStorage = createAction('[Storage] Clear States');
