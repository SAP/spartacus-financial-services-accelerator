import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccEndpointsService } from '@spartacus/core';
import { FSSearchConfig } from '../../../core/my-account/services/inbox-data.service';
import { InboxAdapter } from '../../../core/my-account/connectors/inbox.adapter';

@Injectable()
export class OccInboxAdapter implements InboxAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getSiteMessagesForUserAndGroup(
    userId: string,
    messageGroup: string,
    searchConfig: FSSearchConfig
  ): Observable<any> {
    const url = this.occEndpointService.getUrl('siteMessages', {
      userId,
    });
    let params: HttpParams = new HttpParams();
    if (searchConfig.sortCode && searchConfig.sortOrder) {
      params = params
        .set('page', '0')
        .set('sortCode', searchConfig.sortCode)
        .set('sortOrder', searchConfig.sortOrder);
    }

    if (searchConfig.currentPage === 0 || searchConfig.currentPage) {
      params = params.set('currentPage', searchConfig.currentPage.toString());
    }

    if (messageGroup !== '') {
      params = params.set('messagegroup', messageGroup);
    }
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  setMessagesState(
    userId: string,
    messagesUidList: Array<string>,
    read: boolean
  ): Observable<any> {
    const url = this.occEndpointService.getUrl('updateMessages', {
      userId,
    });
    const params: HttpParams = new HttpParams()
      .set('messageCodes', messagesUidList.toString())
      .set('readStatus', read.toString())
      .set('fields', 'FULL');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .put<any>(url, params, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
