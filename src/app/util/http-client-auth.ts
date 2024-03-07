import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/state/auth.state';
import { Observable } from 'rxjs';
import { dev_environment } from '../../environments/environment.development';

@Injectable()
export class HttpClientAuth {
  token: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {
    this.store.select('auth', 'token').subscribe((token) => {
      if (token) {
        this.token = token;
      }
    });
  }

  private transformRequest(url: string, options: any) {
    let newUrl = '';

    newUrl = `${dev_environment.baseUrl}/${dev_environment.baseVersion}/${url}`;

    return {
      url: newUrl,
      options: {
        headers: new HttpHeaders({
          Authorization: `${this.token}`,
        }),
        ...options,
      },
    };
  }

  get(url: string, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.get(newUrl, newOptions);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.post(newUrl, body, newOptions);
  }

  put(url: string, body: any, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.put(newUrl, body, newOptions);
  }

  delete(url: string, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.delete(newUrl, newOptions);
  }
}
