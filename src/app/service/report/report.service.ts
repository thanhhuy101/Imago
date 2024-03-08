import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { ReportModel } from '../../model/report.model';
import { HttpClientAuth } from '../../util/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    private httpClient: HttpClientAuth,
    private store: Store<{ auth: AuthState }>,
  ) {}

  createReport(token: string, report: ReportModel) {
    const headers = { Authorization: `${token}` };
    return this.httpClient.post('http://localhost:3000/v1/report', report, {
      headers: headers,
    });
  }
}
