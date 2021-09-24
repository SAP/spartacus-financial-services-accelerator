import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { PolicyAdapter } from '../../../core/my-account/connectors/policy.adapter';
import { OccEndpointsService } from '@spartacus/core';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccPolicyAdapter implements PolicyAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getPolicies(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('policies', {
      urlParams: {
        userId,
      },
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPoliciesByCategory(
    userId: string,
    policyCategoryCode: string
  ): Observable<any> {
    const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const params: HttpParams = new HttpParams()
      .set('category', policyCategoryCode)
      .set('date', date)
      .set('fields', 'DEFAULT');
    const url = this.occEndpointService.buildUrl('policies', {
      urlParams: {
        userId,
      },
    });
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPremiumCalendar(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('premiumCalendar', {
      urlParams: {
        userId,
      },
    });
    const params = new HttpParams({ fromString: FULL_PARAMS });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getPolicy(
    userId: string,
    policyId: string,
    contractId: string
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('policy', {
      urlParams: {
        userId,
        policyId,
        contractId,
      },
    });
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
