import { createAction, props } from '@ngrx/store';

export const setImage = createAction('[Image] Set Image', props<{ image: string }>());
