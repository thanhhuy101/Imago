import * as reportActions from './report.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReportService } from '../../app/service/report/report.service';
import { of } from 'rxjs';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Injectable()
export class ReportEffect {
  constructor(
    private action$: Actions,
    private reportService: ReportService,
  ) {}

  getReport$ = createEffect(() =>
    this.action$.pipe(
      ofType(reportActions.createReport),
      switchMap((action) => {
        return this.reportService
          .createReport(action.token, action.report)
          .pipe(
            map((report: any) => {
              return reportActions.createReportSuccess();
            }),
            catchError((error) => {
              return of(
                reportActions.createReportFailure({
                  createReportErrorMessage: error,
                }),
              );
            }),
          );
      }),
    ),
  );
}
