import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccEndpointsService } from '@spartacus/core';
import { FSSearchConfig } from '../../../core/my-account/services/inbox-data.service';

const FULL_PARAMS = '&fields=FULL';

@Injectable()
export class OccInboxService {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  protected getSiteMessagesEndpoint(
    userId: string,
    messageGroup: string,
    searchConfig?: FSSearchConfig
  ) {
    let siteMessagesEndpoint =
      '/users/' + userId + '/notifications/fssitemessages?fields=FULL';
    if (searchConfig.sortCode && searchConfig.sortOrder) {
      siteMessagesEndpoint +=
        '&page=0&sortCode=' +
        searchConfig.sortCode +
        '&sortOrder=' +
        searchConfig.sortOrder;
    }
    if (messageGroup !== '') {
      siteMessagesEndpoint += '&messagegroup=' + messageGroup;
    }
    return this.occEndpointService.getBaseEndpoint() + siteMessagesEndpoint;
  }
  
  protected getReadUnreadEndpoint(userId: string) {
    const readUnreadEndpoint =
      '/users/' + userId + '/notifications/fssitemessages/read-unread';
    return this.occEndpointService.getBaseEndpoint() + readUnreadEndpoint;
  }

  public getSiteMessagesForUserAndGroup(
    userId: string,
    messageGroup: string,
    searchConfig: FSSearchConfig
  ): Observable<any> {
    const url = this.getSiteMessagesEndpoint(
      userId,
      messageGroup,
      searchConfig
    );
    const params = new HttpParams();
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public setMessagesState(
    userId: string,
    messagesUidList: Array<string>,
    read: boolean
  ): Observable<any> {
    const url = this.getReadUnreadEndpoint(userId);
    const params = new HttpParams({
      fromString:
        'messageCodes=' + messagesUidList + '&readStatus=' + read + FULL_PARAMS,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .put<any>(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
