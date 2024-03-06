import * as ReportActions from './report.action';
import { createReducer, on } from '@ngrx/store';

const initialState = {
  loading: false,
  error: '',
};

export const reportReducer = createReducer(
  initialState,
  on(ReportActions.createReport, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      loading: true,
    };
  }),
  on(ReportActions.createReportSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      loading: false,
    };
  }),
  on(
    ReportActions.createReportFailure,
    (state, { createReportErrorMessage, type }) => {
      console.log(type);
      return {
        ...state,
        error: createReportErrorMessage,
        loading: false,
      };
    },
  ),
);
