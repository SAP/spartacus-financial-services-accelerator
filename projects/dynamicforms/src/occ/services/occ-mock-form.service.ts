import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Injectable()
export class OccMockFormService {
  constructor(
    protected httpClient: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  velueListsCache = new Map();

  public getValuesFromAPI(apiUrl: string): Observable<any> {
    const cacheValues = this.velueListsCache.get(apiUrl);
    if (cacheValues) {
      return of(cacheValues);
    }
    return this.httpClient.get<any>(apiUrl).pipe(
      map(values => {
        this.velueListsCache.set(apiUrl, values);
        return values;
      })
    );
  }
}
