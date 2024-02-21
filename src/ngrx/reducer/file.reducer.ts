import { Action, createReducer, on } from '@ngrx/store';
import * as ImageActions from '../actions/file.actions';

export const initialState: { image: string } = { image: '' };

const _imageReducer = createReducer(
    initialState,
    on(ImageActions.setImage, (state, { image }) => ({ ...state, image }))
);

export function imageReducer(state: { image: string } | undefined, action: Action) {
    return _imageReducer(state, action);
}