import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { OccEndpointsService } from '@spartacus/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MyDashboardAdapter } from '../../../core/my-dashboard/connectors/my-ashboard.adapter';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccMyDashboardAdapter implements MyDashboardAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getOBOConsents(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsents', {
      urlParams: {
        userId,
      },
    });

    const params = new HttpParams({ fromString: FULL_PARAMS });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getOBOCustomerList(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('oboConsentCustomers', {
      urlParams: {
        userId,
      },
    });
    const params = new HttpParams({ fromString: FULL_PARAMS });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
