import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { ConsentAdapter } from '../../../core/my-account/connectors/consent.adapter';
import { OBOConsentList } from '../../occ-models/occ.models';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccConsentAdapter implements ConsentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  getConsents(userId: string): Observable<any> {
    const url = this.occEndpointService.buildUrl('consents', {
      urlParams: {
        userId,
      },
    });
    return this.http
      .get<OBOConsentList>(url)
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
