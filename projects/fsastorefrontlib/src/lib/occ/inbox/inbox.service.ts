import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccConfig } from '@spartacus/core';

@Injectable()
export class OccInboxService {
  constructor(
    protected http: HttpClient,
    protected config: OccConfig
    ) {}

  protected getSiteMessagesEndpoint(userId: string, messageGroup: string) {
    const siteMessagesEndpoint = '/users/' + userId + '/notifications/sitemessages?messagegroup=' + messageGroup;
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      siteMessagesEndpoint
    );
  }

  public getSiteMessagesForUserAndGroup(userId: string, messageGroup: string): Observable<any> {
    const url = this.getSiteMessagesEndpoint(userId, messageGroup);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
