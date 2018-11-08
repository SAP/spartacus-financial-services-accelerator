import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthModuleConfig } from '../../auth-module.config';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable()
export class UserAuthenticationTokenService {
  constructor(private http: HttpClient, private config: AuthModuleConfig) {}

  loadToken(userId: string, password: string): Observable<any> {
    const url = this.getOAuthEndpoint();
    const params = new HttpParams()
      .set('client_id', this.config.authentication.client_id)
      .set('client_secret', this.config.authentication.client_secret)
      .set('grant_type', 'password') // authorization_code, client_credentials, password
      .set('username', userId)
      .set('password', password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  refreshToken(refreshToken: string) {
    const url = this.getOAuthEndpoint();
    const params = new HttpParams()
      .set(
        'client_id',
        encodeURIComponent(this.config.authentication.client_id)
      )
      .set(
        'client_secret',
        encodeURIComponent(this.config.authentication.client_secret)
      )
      .set('refresh_token', encodeURI(refreshToken))
      .set('grant_type', 'refresh_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  protected getOAuthEndpoint() {
    return (this.config.server.baseUrl || '') + OAUTH_ENDPOINT;
  }
}
