import { Injectable } from '@angular/core';
import { OccEndpointsService, GeoPoint } from '@spartacus/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AgentAdapter } from '../../../core/agent/connectors/agent.adapter';

@Injectable()
export class OccAgentAdapter implements AgentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getAgentsByCategory(category: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('agents');
    const httpParams: HttpParams = new HttpParams()
      .set('categoryCode', category)
      .set('fields', 'DEFAULT');
    return this.http
      .get(url, { params: httpParams })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getAgentsByQuery(
    searchQuery: string,
    pageNumber: number,
    longitudeLatitude?: GeoPoint
  ): Observable<any> {
    const url = this.occEndpointService.buildUrl('agents');
    let params: HttpParams = new HttpParams()
      .set('page', pageNumber.toString())
      .set('fields', 'DEFAULT');

    if (longitudeLatitude) {
      params = params
        .set('longitude', String(longitudeLatitude.longitude))
        .set('latitude', String(longitudeLatitude.latitude))
        .set('radius', String('10000000'));
    }
    if (searchQuery) {
      params = params.set('queryParam', searchQuery);
    }
    return this.http
      .get<any>(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getAgentByID(id: string) {
    const url = this.occEndpointService.buildUrl('agent', {
      urlParams: {
        id,
      },
    });
    const params: HttpParams = new HttpParams().set('fields', 'DEFAULT');
    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
