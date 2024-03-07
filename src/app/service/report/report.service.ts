import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/state/auth.state';
import { ReportModel } from '../../model/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {}

  createReport(token: string, report: ReportModel) {
    const headers = { Authorization: `${token}` };
    return this.httpClient.post('http://localhost:3000/v1/report', report, {
      headers: headers,
    });
  }
}
