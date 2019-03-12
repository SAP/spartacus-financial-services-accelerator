import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccConfig } from '@spartacus/core';
import { SearchConfig } from '../../my-account/assets/services/inbox-data.service';

@Injectable()
export class OccInboxService {
  constructor(
    protected http: HttpClient,
    protected config: OccConfig
    ) {}

  protected getSiteMessagesEndpoint(userId: string, messageGroup: string, searchConfig: SearchConfig) {
    let siteMessagesEndpoint = '/users/' + userId + '/notifications/sitemessages?fields=FULL';

    if (searchConfig.sortCode && searchConfig.sortOrder) {
      siteMessagesEndpoint += '&page=0&sortCode=' + searchConfig.sortCode + '&sortOrder=' + searchConfig.sortOrder;
    }
    if (  messageGroup !== '') {
      siteMessagesEndpoint += '&messagegroup=' + messageGroup;
    }
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      siteMessagesEndpoint
    );
  }

  public getSiteMessagesForUserAndGroup(userId: string, messageGroup: string, searchConfig: SearchConfig): Observable<any> {
    const url = this.getSiteMessagesEndpoint(userId, messageGroup, searchConfig);
    const params = new HttpParams();

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
  public setMessagesState(userId: string, messageGroup: string, searchConfig: SearchConfig): Observable<any> {
    return;

  }
}
