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

  httpRegex = /(http(s?)):\/\//;

  public getValuesFromAPI(fieldUrl: string): Observable<any> {
    const url = this.getFullAPIUrl(fieldUrl);

    const cacheValues = this.velueListsCache.get(url);
    if (cacheValues) {
      return of(cacheValues);
    }
    return this.httpClient.get<any>(url).pipe(
      map(values => {
        this.velueListsCache.set(url, values);
        return values;
      })
    );
  }

  getFullAPIUrl(fieldUrl) {
    if (fieldUrl.match(this.httpRegex)) {
      return fieldUrl;
    }
    return this.occEndpointService.getBaseEndpoint() + fieldUrl;
  }
}
