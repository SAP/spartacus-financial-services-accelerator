import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';

@Injectable()
export class OccMockFormService {
  constructor(
    protected httpClient: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  getValuesFromAPI(apiUrl: string): Observable<any> {
    return this.httpClient.get(apiUrl);
  }
}
