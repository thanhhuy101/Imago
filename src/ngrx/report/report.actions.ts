import { createAction, props } from '@ngrx/store';
import { ReportModel } from '../../app/model/report.model';

export const createReport = createAction(
  '[Report] Create Report',
  props<{ token: string; report: ReportModel }>(),
);

export const createReportSuccess = createAction(
  '[Report] Create Report Success',
);

export const createReportFailure = createAction(
  '[Report] Create Report Failure',
  props<{ createReportErrorMessage: string }>(),
);
