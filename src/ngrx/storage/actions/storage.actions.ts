import {createAction, props} from "@ngrx/store";
export const create = createAction(
  '[Storage] Create',
  props<{ file: File; fileName: string; idToken: string }>(),
);
export const createSuccess = createAction(
  '[Storage] Create Success',
);
export const createFailure = createAction(
  '[Storage] Create Failure',
  props<{ createErrorMessage: string }>(),
);


