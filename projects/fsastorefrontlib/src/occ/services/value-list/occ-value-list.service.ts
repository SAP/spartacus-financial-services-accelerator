import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OccValueListService{
  constructor(
    protected httpClient: HttpClient,
    protected occEndpointService: OccEndpointsService
  ) {}

  valueListsCache = new Map();

  httpRegex = /(http(s?)):\/\//;

  public getValuesFromAPI(
    fieldUrl: string,
    parentItemCode?: string
  ): Observable<any> {
    const url = parentItemCode
      ? this.getFullAPIUrl(fieldUrl) + '?parentListItemCode=' + parentItemCode
      : this.getFullAPIUrl(fieldUrl);

    const cacheValues = this.valueListsCache.get(url);
    if (cacheValues) {
      return of(cacheValues);
    }
    return this.httpClient.get<any>(url).pipe(
      map(values => {
        this.valueListsCache.set(url, values);
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
