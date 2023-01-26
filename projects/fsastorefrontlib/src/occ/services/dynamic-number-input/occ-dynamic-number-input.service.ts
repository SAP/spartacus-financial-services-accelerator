import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OccDynamicNumberInputService {
  constructor(
    protected httpClient: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  dynamicNumberInputCache = new Map();

  httpRegex = /(http(s?)):\/\//;

  public getValuesFromAPI(
    fieldUrl: string
  ): Observable<any> {
    const url = this.getFullAPIUrl(fieldUrl);

    const cacheValues = this.dynamicNumberInputCache.get(url);
    if (cacheValues) {
      return of(cacheValues);
    }
    return this.httpClient.get<any>(url).pipe(
      map(values => {
        this.dynamicNumberInputCache.set(url, values);
        return values;
      })
    );
  }

  getFullAPIUrl(fieldUrl) {
    if (fieldUrl.match(this.httpRegex)) {
      return fieldUrl;
    }
    // The `getBaseEndpoint` method was removed. Use `buildUrl` method instead with configurable endpoint or the `getBaseUrl` method.
    return this.occEndpointService.getBaseUrl() + fieldUrl;
  }
}
